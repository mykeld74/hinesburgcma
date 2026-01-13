import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { fetchCalendarEvents } from '$lib/utils/calendar';

export const GET: RequestHandler = async ({ url }) => {
	try {
		const startDate = url.searchParams.get('startDate');
		const endDate = url.searchParams.get('endDate');

		if (!startDate || !endDate) {
			return json({ error: 'startDate and endDate are required' }, { status: 400 });
		}

		// Use includeFields only - fetchEventDetails makes slow sequential API calls
		const processedEvents = await fetchCalendarEvents(startDate, endDate, {
			includeFields: true
		});

		const formattedEvents = processedEvents.flatMap(({ event, instances }) => {
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
						startDate: new Date(startsAt).toISOString(),
						endDate: endsAt ? new Date(endsAt).toISOString() : null,
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

		formattedEvents.sort(
			(a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
		);

		return json({ events: formattedEvents });
	} catch (error) {
		return json(
			{ error: error instanceof Error ? error.message : 'Unknown error' },
			{ status: 500 }
		);
	}
};
