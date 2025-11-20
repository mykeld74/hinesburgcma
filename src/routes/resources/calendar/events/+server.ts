import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PLANNING_CENTER_APPLICATION_ID, PLANNING_CENTER_SECRET } from '$env/static/private';

interface EventInstance {
	id: string;
	type: string;
	attributes: {
		starts_at?: string;
		start_time?: string;
		start?: string;
		ends_at?: string;
		end_time?: string;
		end?: string;
		location?: string;
		all_day?: boolean;
		[key: string]: unknown;
	};
	relationships?: {
		event?: {
			data?: {
				id: string;
				type: string;
			};
		};
	};
}

interface EventData {
	id: string;
	type: string;
	attributes: {
		name: string;
		description?: string;
		created_at: string;
		updated_at: string;
		starts_at?: string;
		ends_at?: string;
		all_day?: boolean;
		location?: string;
		kind?: string;
		public_url?: string;
		image_url?: string;
		[key: string]: unknown;
	};
}

interface PlanningCenterResponse {
	data: EventInstance[];
	included?: EventData[];
	links?: {
		next?: string;
		prev?: string;
		first?: string;
		last?: string;
	};
}

async function makeAuthenticatedRequest(url: string): Promise<Response> {
	const isPAT = PLANNING_CENTER_SECRET.startsWith('pco_pat_');

	// Try Bearer token first
	let response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${PLANNING_CENTER_SECRET}`,
			Accept: 'application/json',
			'X-API-Version': '2022-07-07'
		}
	});

	// If Bearer fails with 401 and we're using a PAT, try Basic Auth
	if (!response.ok && isPAT && response.status === 401) {
		const errorText = await response.text();
		if (errorText.includes('HTTP Basic') || errorText.includes('Access denied')) {
			const basicAuth = Buffer.from(
				`${PLANNING_CENTER_APPLICATION_ID}:${PLANNING_CENTER_SECRET}`
			).toString('base64');
			response = await fetch(url, {
				headers: {
					Authorization: `Basic ${basicAuth}`,
					Accept: 'application/json',
					'X-API-Version': '2022-07-07'
				}
			});
		}
	}

	return response;
}

async function fetchAllEventInstances(
	startDate: string,
	endDate: string
): Promise<{ instances: EventInstance[]; events: Map<string, EventData> }> {
	const instances: EventInstance[] = [];
	const eventsMap = new Map<string, EventData>();

	const startDateISO = `${startDate}T00:00:00Z`;
	const endDateISO = `${endDate}T23:59:59Z`;

	let url: string | undefined =
		`https://api.planningcenteronline.com/calendar/v2/event_instances?per_page=100&where[starts_at][gte]=${encodeURIComponent(startDateISO)}&where[starts_at][lte]=${encodeURIComponent(endDateISO)}&order=starts_at&include=event`;
	let pageCount = 0;
	const maxPages = 100;

	while (url && pageCount < maxPages) {
		pageCount++;

		try {
			const response = await makeAuthenticatedRequest(url);

			if (response.status === 429) {
				await new Promise((resolve) => setTimeout(resolve, 2000));
				const retryResponse = await makeAuthenticatedRequest(url);
				if (!retryResponse.ok) {
					break;
				}
				const retryData: PlanningCenterResponse = await retryResponse.json();
				instances.push(...(retryData.data || []));
				if (retryData.included) {
					retryData.included.forEach((event) => {
						if (event.type === 'Event') {
							eventsMap.set(event.id, event);
						}
					});
				}
				url = retryData.links?.next;
				continue;
			}

			if (!response.ok) {
				break;
			}

			const data: PlanningCenterResponse = await response.json();

			const startDateObj = new Date(startDateISO);
			const endDateObj = new Date(endDateISO);
			const filteredInstances = (data.data || []).filter((instance) => {
				const startsAt =
					instance.attributes?.starts_at ||
					instance.attributes?.start_time ||
					instance.attributes?.start;
				if (!startsAt) return false;
				const instanceDate = new Date(startsAt);
				return instanceDate >= startDateObj && instanceDate <= endDateObj;
			});

			instances.push(...filteredInstances);

			if (data.included) {
				data.included.forEach((item) => {
					if (item.type === 'Event') {
						eventsMap.set(item.id, item);
					}
				});
			}

			url = data.links?.next;
			if (url) {
				await new Promise((resolve) => setTimeout(resolve, 200));
			}
		} catch (error) {
			console.error(`Error fetching page ${pageCount}:`, error);
			break;
		}
	}

	return { instances, events: eventsMap };
}

export const GET: RequestHandler = async ({ url }) => {
	try {
		const startDate = url.searchParams.get('startDate');
		const endDate = url.searchParams.get('endDate');

		if (!startDate || !endDate) {
			return json({ error: 'startDate and endDate are required' }, { status: 400 });
		}

		const { instances, events: eventsMap } = await fetchAllEventInstances(startDate, endDate);

		const instancesByEventId = new Map<string, EventInstance[]>();
		for (const instance of instances) {
			const eventId = instance.relationships?.event?.data?.id;
			if (eventId) {
				if (!instancesByEventId.has(eventId)) {
					instancesByEventId.set(eventId, []);
				}
				instancesByEventId.get(eventId)!.push(instance);
			}
		}

		const processedEvents: Array<{
			event: EventData;
			instances: EventInstance[];
		}> = [];

		for (const [eventId, eventInstances] of instancesByEventId.entries()) {
			const event = eventsMap.get(eventId);
			if (event) {
				processedEvents.push({
					event,
					instances: eventInstances
				});
			}
		}

		const formattedEvents = processedEvents.flatMap(({ event, instances }) => {
			if (instances.length === 0) {
				return [];
			}

			return instances
				.map((instance) => {
					const startsAt =
						instance.attributes?.starts_at ||
						instance.attributes?.start_time ||
						instance.attributes?.start;

					if (!startsAt) {
						return null;
					}

					const endsAt =
						instance.attributes?.ends_at ||
						instance.attributes?.end_time ||
						instance.attributes?.end;

					return {
						id: `${event.id}-${instance.id}`,
						title: event.attributes.name,
						description: event.attributes.description || '',
						startDate: new Date(startsAt).toISOString(),
						endDate: endsAt ? new Date(endsAt).toISOString() : null,
						allDay: instance.attributes?.all_day || event.attributes.all_day || false,
						location: instance.attributes?.location || event.attributes.location || '',
						kind: event.attributes.kind || '',
						publicUrl: event.attributes.public_url || null,
						imageUrl: event.attributes.image_url || null
					};
				})
				.filter((e) => e !== null);
		});

		formattedEvents.sort((a, b) => 
			new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
		);

		return json({ events: formattedEvents });
	} catch (error) {
		console.error('Error fetching events:', error);
		return json(
			{ error: error instanceof Error ? error.message : 'Unknown error' },
			{ status: 500 }
		);
	}
};

