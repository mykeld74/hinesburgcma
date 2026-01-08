import type { PageServerLoad } from './$types';
import { fetchEventDetails, makeAuthenticatedRequest } from '$lib/utils/calendar';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const eventId = params.slug;

	if (!eventId) {
		throw error(404, 'Event not found');
	}

	try {
		// Fetch event details from Planning Center
		const event = await fetchEventDetails(eventId);

		if (!event) {
			throw error(404, 'Event not found');
		}

		// Only show events that are visible in church center
		if (event.attributes.visible_in_church_center !== true) {
			throw error(404, 'Event not found');
		}

		// Fetch event instances for this event - only get future instances
		// Get today's date in ISO format for the API filter
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const todayISO = today.toISOString();

		const instancesUrl = `https://api.planningcenteronline.com/calendar/v2/events/${eventId}/event_instances?per_page=100&order=starts_at&where[starts_at][gte]=${encodeURIComponent(todayISO)}`;
		const instancesResponse = await makeAuthenticatedRequest(instancesUrl);

		type EventInstance = {
			id: string;
			startsAt: Date;
			endsAt: Date | null;
			allDay: boolean;
			location: string;
		};

		let nextInstance: EventInstance | null = null;

		if (instancesResponse.ok) {
			const instancesData = await instancesResponse.json();

			const allInstances: EventInstance[] = (instancesData.data || []).map(
				(instance: {
					id: string;
					attributes?: {
						starts_at?: string;
						start_time?: string;
						start?: string;
						ends_at?: string;
						end_time?: string;
						end?: string;
						all_day?: boolean;
						location?: string;
					};
				}) => {
					const startsAt =
						instance.attributes?.starts_at ||
						instance.attributes?.start_time ||
						instance.attributes?.start;
					const endsAt =
						instance.attributes?.ends_at ||
						instance.attributes?.end_time ||
						instance.attributes?.end;

					return {
						id: instance.id,
						startsAt: startsAt ? new Date(startsAt) : new Date(),
						endsAt: endsAt ? new Date(endsAt) : null,
						allDay: instance.attributes?.all_day || false,
						location: instance.attributes?.location || ''
					};
				}
			);

			// Sort instances by start date (should already be sorted by API, but ensure it)
			allInstances.sort(
				(a: EventInstance, b: EventInstance) => a.startsAt.getTime() - b.startsAt.getTime()
			);

			// Get the first instance (which should be the next one since we filtered for future dates)
			// Double-check it's not in the past (timezone safety)
			const now = new Date();
			nextInstance =
				allInstances.find((instance: EventInstance) => {
					return instance.startsAt >= now;
				}) ||
				allInstances[0] ||
				null;
		}

		// Check for registration URL - Planning Center may have registration_url or registration_link
		const eventAttrs = event.attributes as {
			registration_url?: string;
			registration_link?: string;
			[key: string]: unknown;
		};
		const registrationUrl = eventAttrs.registration_url || eventAttrs.registration_link || null;

		return {
			event: {
				id: event.id,
				name: event.attributes.name,
				description: event.attributes.description || '',
				kind: event.attributes.kind || '',
				eventType: event.attributes.event_type || null,
				publicUrl: event.attributes.public_url || null,
				imageUrl: event.attributes.image_url || null,
				featured: event.attributes.featured ?? null,
				registrationUrl
			},
			instance: nextInstance
		};
	} catch (err) {
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		throw error(500, 'Failed to load event');
	}
};
