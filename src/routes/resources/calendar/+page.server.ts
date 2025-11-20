import { PLANNING_CENTER_APPLICATION_ID, PLANNING_CENTER_SECRET } from '$env/static/private';
import type { PageServerLoad } from './$types';

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
		[key: string]: unknown; // Allow other properties
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

interface CachedData {
	events: Array<{
		id: string;
		title: string;
		description: string;
		startDate: Date;
		endDate: Date | null;
		allDay: boolean;
		location: string;
		kind: string;
		publicUrl: string | null;
		imageUrl: string | null;
	}>;
	timestamp: number;
	dateRange: {
		start: string;
		end: string;
	};
}

// Cache configuration
let cachedData: CachedData | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes - serve fresh data
const STALE_DURATION = 60 * 60 * 1000; // 1 hour - serve stale data while revalidating
let isRevalidating = false; // Prevent multiple simultaneous revalidations

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

async function makeAuthenticatedRequest(url: string): Promise<Response> {
	return fetch(url, {
		headers: {
			Authorization: authHeader,
			Accept: 'application/json',
			'X-API-Version': '2022-07-07'
		}
	});
}

async function fetchAllEventInstances(
	startDate: string,
	endDate: string
): Promise<{ instances: EventInstance[]; events: Map<string, EventData> }> {
	const instances: EventInstance[] = [];
	const eventsMap = new Map<string, EventData>();

	// Format dates as ISO strings for the API
	const startDateISO = `${startDate}T00:00:00Z`;
	const endDateISO = `${endDate}T23:59:59Z`;

	let url: string | undefined =
		`https://api.planningcenteronline.com/calendar/v2/event_instances?per_page=100&where[starts_at][gte]=${encodeURIComponent(startDateISO)}&where[starts_at][lte]=${encodeURIComponent(endDateISO)}&order=starts_at&include=event`;
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
				const errorText = await response.text();
				console.error(`API error (${response.status}): ${errorText.substring(0, 200)}`);
				break;
			}

			const data: PlanningCenterResponse = await response.json();

			// Add instances to our collection
			instances.push(...(data.data || []));

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
		} catch (error) {
			console.error(`Error fetching page ${pageCount}:`, error);
			break;
		}
	}

	return { instances, events: eventsMap };
}

async function fetchCalendarEvents(startDate: string, endDate: string) {
	try {
		// Fetch all event instances directly using the event_instances endpoint
		const { instances, events: eventsMap } = await fetchAllEventInstances(startDate, endDate);

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
			const event = eventsMap.get(eventId);
			if (event) {
				processedEvents.push({
					event,
					instances: eventInstances
				});
			}
		}

		return processedEvents;
	} catch (error) {
		console.error('Error fetching calendar events:', error);
		throw error;
	}
}

// Background revalidation function for stale-while-revalidate
async function revalidateCache(startDate: string, endDate: string): Promise<void> {
	try {
		const events = await fetchCalendarEvents(startDate, endDate);

		// Format events for display - flatten instances into individual events
		const formattedEvents = events.flatMap(({ event, instances }) => {
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
						startDate: new Date(startsAt),
						endDate: endsAt ? new Date(endsAt) : null,
						allDay: instance.attributes?.all_day || event.attributes.all_day || false,
						location: instance.attributes?.location || event.attributes.location || '',
						kind: event.attributes.kind || '',
						publicUrl: event.attributes.public_url || null,
						imageUrl: event.attributes.image_url || null
					};
				})
				.filter((e) => e !== null);
		});

		// Sort by start date
		formattedEvents.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

		// Update cache with fresh data
		cachedData = {
			events: formattedEvents,
			timestamp: Date.now(),
			dateRange: {
				start: startDate,
				end: endDate
			}
		};
	} catch (error) {
		console.error('Error revalidating cache:', error);
	}
}

export const load: PageServerLoad = async ({ url, setHeaders }) => {
	try {
		// Get date range from URL params if provided, otherwise use default (3 months)
		const startDateParam = url.searchParams.get('startDate');
		const endDateParam = url.searchParams.get('endDate');

		const now = new Date();
		// Default date range: current month and next 2 months (3 months total)
		const startDate =
			startDateParam || new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
		const endDate =
			endDateParam ||
			new Date(now.getFullYear(), now.getMonth() + 3, 0).toISOString().split('T')[0];

		const currentTime = Date.now();
		const cacheAge = cachedData ? currentTime - cachedData.timestamp : Infinity;
		const isSameDateRange =
			cachedData?.dateRange.start === startDate && cachedData?.dateRange.end === endDate;

		// Check if cache is fresh (within CACHE_DURATION)
		if (cachedData && isSameDateRange && cacheAge < CACHE_DURATION) {
			// Set HTTP cache headers for browser/CDN caching
			setHeaders({
				'Cache-Control': `public, max-age=${Math.floor(CACHE_DURATION / 1000)}, stale-while-revalidate=${Math.floor(STALE_DURATION / 1000)}`
			});

			return {
				events: cachedData.events,
				cached: true,
				cacheStatus: 'fresh'
			};
		}

		// Check if cache is stale but usable (within STALE_DURATION) - Stale-While-Revalidate
		if (cachedData && isSameDateRange && cacheAge < STALE_DURATION) {
			// Trigger background revalidation (non-blocking)
			if (!isRevalidating) {
				isRevalidating = true;
				revalidateCache(startDate, endDate).finally(() => {
					isRevalidating = false;
				});
			}

			// Set HTTP cache headers - tell browser this is stale but acceptable
			setHeaders({
				'Cache-Control': `public, max-age=0, stale-while-revalidate=${Math.floor(STALE_DURATION / 1000)}`
			});

			return {
				events: cachedData.events,
				cached: true,
				cacheStatus: 'stale-revalidating'
			};
		}

		// Set HTTP cache headers for fresh fetch
		setHeaders({
			'Cache-Control': `public, max-age=${Math.floor(CACHE_DURATION / 1000)}, stale-while-revalidate=${Math.floor(STALE_DURATION / 1000)}`
		});

		// Fetch fresh data
		const events = await fetchCalendarEvents(startDate, endDate);

		// Format events for display - flatten instances into individual events
		const formattedEvents = events.flatMap(({ event, instances }) => {
			if (instances.length === 0) {
				return [];
			}

			return instances
				.map((instance) => {
					// Handle different possible property names for start time
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
						startDate: new Date(startsAt),
						endDate: endsAt ? new Date(endsAt) : null,
						allDay: instance.attributes?.all_day || event.attributes.all_day || false,
						location: instance.attributes?.location || event.attributes.location || '',
						kind: event.attributes.kind || '',
						publicUrl: event.attributes.public_url || null,
						imageUrl: event.attributes.image_url || null
					};
				})
				.filter((e) => e !== null); // Remove any null entries
		});

		// Sort by start date
		formattedEvents.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

		// Cache the results
		cachedData = {
			events: formattedEvents,
			timestamp: currentTime,
			dateRange: {
				start: startDate,
				end: endDate
			}
		};

		return {
			events: formattedEvents,
			cached: false
		};
	} catch (error) {
		return {
			events: [],
			error: error instanceof Error ? error.message : 'Unknown error'
		};
	}
};
