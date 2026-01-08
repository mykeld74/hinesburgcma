import { PLANNING_CENTER_APPLICATION_ID, PLANNING_CENTER_SECRET } from '$env/static/private';

export interface EventInstance {
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

export interface EventData {
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
		event_type?: string;
		public_url?: string;
		image_url?: string;
		public?: boolean;
		visibility?: string;
		visible_in_church_center?: boolean;
		featured?: boolean;
		[key: string]: unknown;
	};
}

export interface PlanningCenterResponse {
	data: EventInstance[];
	included?: EventData[];
	links?: {
		next?: string;
		prev?: string;
		first?: string;
		last?: string;
	};
}

// Auth configuration - determine once at startup
let authHeader: string;

function initializeAuth() {
	const isPAT = PLANNING_CENTER_SECRET.startsWith('pco_pat_');
	if (isPAT) {
		// Use Basic Auth for Personal Access Tokens
		const basicAuth = Buffer.from(
			`${PLANNING_CENTER_APPLICATION_ID}:${PLANNING_CENTER_SECRET}`
		).toString('base64');
		authHeader = `Basic ${basicAuth}`;
	} else {
		// Use Bearer token for OAuth tokens
		authHeader = `Bearer ${PLANNING_CENTER_SECRET}`;
	}
}

// Initialize auth on module load
initializeAuth();

export async function makeAuthenticatedRequest(url: string): Promise<Response> {
	return fetch(url, {
		headers: {
			Authorization: authHeader,
			Accept: 'application/json',
			'X-API-Version': '2022-07-07'
		}
	});
}

export async function fetchAllEventInstances(
	startDate: string,
	endDate: string,
	options?: { includeFields?: boolean }
): Promise<{ instances: EventInstance[]; events: Map<string, EventData> }> {
	const instances: EventInstance[] = [];
	const eventsMap = new Map<string, EventData>();

	// Format dates as ISO strings for the API
	const startDateISO = `${startDate}T00:00:00Z`;
	const endDateISO = `${endDate}T23:59:59Z`;

	let url: string;
	if (options?.includeFields) {
		// Request specific fields to get all available information
		const eventInstanceFields = [
			'starts_at',
			'ends_at',
			'start_time',
			'end_time',
			'start',
			'end',
			'location',
			'all_day',
			'created_at',
			'updated_at'
		].join(',');

		const eventFields = [
			'name',
			'description',
			'kind',
			'event_type',
			'public_url',
			'image_url',
			'public',
			'visibility',
			'visible_in_church_center',
			'featured',
			'starts_at',
			'ends_at',
			'all_day',
			'location',
			'created_at',
			'updated_at'
		].join(',');

		url = `https://api.planningcenteronline.com/calendar/v2/event_instances?per_page=100&where[starts_at][gte]=${encodeURIComponent(startDateISO)}&where[starts_at][lte]=${encodeURIComponent(endDateISO)}&order=starts_at&include=event&fields[event_instances]=${eventInstanceFields}&fields[events]=${eventFields}`;
	} else {
		url = `https://api.planningcenteronline.com/calendar/v2/event_instances?per_page=100&where[starts_at][gte]=${encodeURIComponent(startDateISO)}&where[starts_at][lte]=${encodeURIComponent(endDateISO)}&order=starts_at&include=event`;
	}

	let pageCount = 0;
	const maxPages = 100; // Safety limit to prevent infinite loops

	while (url && pageCount < maxPages) {
		pageCount++;

		try {
			const response = await makeAuthenticatedRequest(url);

			// Handle rate limiting with proper retry logic
			if (response.status === 429) {
				const retryAfter = response.headers.get('Retry-After');
				const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 2000;
				await new Promise((resolve) => setTimeout(resolve, waitTime));

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

			// Filter instances by date if not using fields (for events/+server.ts)
			if (!options?.includeFields) {
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
			} else {
				instances.push(...(data.data || []));
			}

			// Store included event data
			if (data.included) {
				data.included.forEach((item) => {
					if (item.type === 'Event') {
						eventsMap.set(item.id, item);
					}
				});
			}

			// Check for next page
			url = data.links?.next;
			if (url && !options?.includeFields) {
				await new Promise((resolve) => setTimeout(resolve, 200));
			}
		} catch {
			break;
		}
	}

	return { instances, events: eventsMap };
}

// Function to fetch additional event details including visibility
export async function fetchEventDetails(eventId: string): Promise<EventData | null> {
	try {
		// Fetch event with all available fields including visibility
		const url = `https://api.planningcenteronline.com/calendar/v2/events/${eventId}?fields[events]=all`;
		const response = await makeAuthenticatedRequest(url);

		if (!response.ok) {
			return null;
		}

		const data = await response.json();
		return data.data as EventData;
	} catch {
		return null;
	}
}

export async function fetchCalendarEvents(
	startDate: string,
	endDate: string,
	options?: { includeFields?: boolean; fetchEventDetails?: boolean }
): Promise<Array<{ event: EventData; instances: EventInstance[] }>> {
	// Fetch all event instances directly using the event_instances endpoint
	const { instances, events: eventsMap } = await fetchAllEventInstances(startDate, endDate, {
		includeFields: options?.includeFields
	});

	// Build a map of event instances grouped by event ID for easier lookup
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

	// Process instances into events
	const processedEvents: Array<{
		event: EventData;
		instances: EventInstance[];
	}> = [];

	for (const [eventId, eventInstances] of instancesByEventId.entries()) {
		let event = eventsMap.get(eventId);

		// If visibility or visible_in_church_center is not present and fetchEventDetails is enabled, fetch full event details
		if (
			options?.fetchEventDetails &&
			event &&
			(!event.attributes.visibility || event.attributes.visible_in_church_center === undefined)
		) {
			const fullEvent = await fetchEventDetails(eventId);
			if (fullEvent) {
				event = fullEvent;
				eventsMap.set(eventId, fullEvent);
			}
		}

		if (event) {
			// Filter out "Non-CAC Event" events
			const eventName = event.attributes.name?.toLowerCase() || '';
			const eventKind = event.attributes.kind?.toLowerCase() || '';
			if (eventName.includes('non-cac event') || eventKind.includes('non-cac event')) {
				continue;
			}
			// Only include events where visible_in_church_center is true
			if (event.attributes.visible_in_church_center !== true) {
				continue;
			}
			// Include all other events
			processedEvents.push({
				event,
				instances: eventInstances
			});
		}
	}

	return processedEvents;
}
