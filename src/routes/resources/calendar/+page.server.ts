import type { PageServerLoad } from './$types';
import { fetchCalendarEvents } from '$lib/utils/calendar';

interface CachedData {
	events: Array<{
		id: string;
		eventId: string;
		title: string;
		description: string;
		startDate: Date;
		endDate: Date | null;
		allDay: boolean;
		location: string;
		kind: string;
		eventType: string | null;
		visibleInChurchCenter: boolean | null;
		featured: boolean | null;
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

// Helper function to compute featured events from a list of events
function computeFeaturedEvents(events: CachedData['events']): CachedData['events'] {
	const today = new Date();
	today.setHours(0, 0, 0, 0); // Start of today

	// First filter by date (upcoming events)
	const upcomingEvents = events.filter((event) => {
		const eventDate = new Date(event.startDate);
		eventDate.setHours(0, 0, 0, 0);
		return eventDate >= today;
	});

	// Filter by featured (must be true)
	const featuredEvents = upcomingEvents.filter((event) => event.featured === true);

	return featuredEvents.slice(0, 6); // Limit to 6 featured events
}

// Background revalidation function for stale-while-revalidate
async function revalidateCache(startDate: string, endDate: string): Promise<void> {
	try {
		const events = await fetchCalendarEvents(startDate, endDate, {
			includeFields: true,
			fetchEventDetails: true
		});

		// Format events for display - flatten instances into individual events
		const formattedEvents = events.flatMap(({ event, instances }) => {
			if (instances.length === 0) {
				return [];
			}

			// Only include events where visible_in_church_center is true
			if (event.attributes.visible_in_church_center !== true) {
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
						eventId: event.id,
						title: event.attributes.name,
						description: event.attributes.description || '',
						startDate: new Date(startsAt),
						endDate: endsAt ? new Date(endsAt) : null,
						allDay: instance.attributes?.all_day || event.attributes.all_day || false,
						location: instance.attributes?.location || event.attributes.location || '',
						kind: event.attributes.kind || '',
						eventType: event.attributes.event_type || null,
						visibleInChurchCenter: event.attributes.visible_in_church_center ?? null,
						featured: event.attributes.featured ?? null,
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
	} catch {
		// Silently fail revalidation
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

			// Compute featured events from cached data
			const featuredEvents = computeFeaturedEvents(cachedData.events);

			return {
				events: cachedData.events,
				featuredEvents,
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

			// Compute featured events from cached data
			const featuredEvents = computeFeaturedEvents(cachedData.events);

			return {
				events: cachedData.events,
				featuredEvents,
				cached: true,
				cacheStatus: 'stale-revalidating'
			};
		}

		// Set HTTP cache headers for fresh fetch
		setHeaders({
			'Cache-Control': `public, max-age=${Math.floor(CACHE_DURATION / 1000)}, stale-while-revalidate=${Math.floor(STALE_DURATION / 1000)}`
		});

		// Fetch fresh data
		const events = await fetchCalendarEvents(startDate, endDate, {
			includeFields: true,
			fetchEventDetails: true
		});

		// Format events for display - flatten instances into individual events
		const formattedEvents = events.flatMap(({ event, instances }) => {
			if (instances.length === 0) {
				return [];
			}

			// Only include events where visible_in_church_center is true
			if (event.attributes.visible_in_church_center !== true) {
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
						eventId: event.id,
						title: event.attributes.name,
						description: event.attributes.description || '',
						startDate: new Date(startsAt),
						endDate: endsAt ? new Date(endsAt) : null,
						allDay: instance.attributes?.all_day || event.attributes.all_day || false,
						location: instance.attributes?.location || event.attributes.location || '',
						kind: event.attributes.kind || '',
						eventType: event.attributes.event_type || null,
						visibleInChurchCenter: event.attributes.visible_in_church_center ?? null,
						featured: event.attributes.featured ?? null,
						publicUrl: event.attributes.public_url || null,
						imageUrl: event.attributes.image_url || null
					};
				})
				.filter((e) => e !== null); // Remove any null entries
		});

		// Sort by start date
		formattedEvents.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

		// Compute featured events: upcoming events starting from today (first 6)
		// Filter by visible_in_church_center === true
		const featuredEvents = computeFeaturedEvents(formattedEvents);

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
			featuredEvents,
			cached: false
		};
	} catch (error) {
		return {
			events: [],
			featuredEvents: [],
			error: error instanceof Error ? error.message : 'Unknown error'
		};
	}
};
