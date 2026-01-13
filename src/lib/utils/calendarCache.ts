type CalendarEvent = {
	id: string;
	eventId: string;
	title: string;
	description: string;
	startDate: string | Date;
	endDate: string | Date | null;
	allDay: boolean;
	location: string;
	kind: string;
	eventType: string | null;
	visibleInChurchCenter: boolean | null;
	featured: boolean | null;
	publicUrl: string | null;
	imageUrl: string | null;
};

interface CachedCalendarData {
	events: CalendarEvent[];
	featuredEvents: CalendarEvent[];
	timestamp: number;
	dateRange: {
		start: string;
		end: string;
	};
}

const CACHE_KEY = 'calendar_cache';
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes

export function getCachedCalendarData(dateRange?: {
	start: string;
	end: string;
}): CachedCalendarData | null {
	if (typeof window === 'undefined') return null;

	try {
		const cached = localStorage.getItem(CACHE_KEY);
		if (!cached) return null;

		const data: CachedCalendarData = JSON.parse(cached);
		const cacheAge = Date.now() - data.timestamp;

		// Check if cache is expired
		if (cacheAge > CACHE_DURATION) {
			return null;
		}

		// If date range is provided, check if it matches
		if (dateRange) {
			if (data.dateRange.start !== dateRange.start || data.dateRange.end !== dateRange.end) {
				return null;
			}
		}

		return data;
	} catch {
		return null;
	}
}

export function setCachedCalendarData(data: CachedCalendarData): void {
	if (typeof window === 'undefined') return;

	try {
		localStorage.setItem(CACHE_KEY, JSON.stringify(data));
	} catch {
		// Silently fail if storage is full or unavailable
	}
}

export function clearCalendarCache(): void {
	if (typeof window === 'undefined') return;

	try {
		localStorage.removeItem(CACHE_KEY);
	} catch {
		// Silently fail
	}
}
