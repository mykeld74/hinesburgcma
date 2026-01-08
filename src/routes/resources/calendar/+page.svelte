<script lang="ts">
	import { onMount } from 'svelte';
	import FeaturedEventsCarousel from '$lib/components/FeaturedEventsCarousel.svelte';

	type CalendarEvent = {
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
		publicUrl: string | null;
		imageUrl: string | null;
		featured: boolean | null;
	};

	let { data } = $props();
	// Convert date strings back to Date objects (they get serialized as strings from server)
	let allEvents = $state(
		(data?.events || []).map((event) => ({
			...event,
			startDate: typeof event.startDate === 'string' ? new Date(event.startDate) : event.startDate,
			endDate:
				event.endDate && typeof event.endDate === 'string' ? new Date(event.endDate) : event.endDate
		}))
	);

	// Track which months have been loaded (format: "YYYY-MM")
	let loadedMonths = $state<Set<string>>(new Set());

	// Initialize loaded months from initial data (current month + next 2 months)
	$effect(() => {
		const now = new Date();
		const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
		const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
		const twoMonthsAhead = new Date(now.getFullYear(), now.getMonth() + 2, 1);

		loadedMonths.add(
			`${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`
		);
		loadedMonths.add(
			`${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, '0')}`
		);
		loadedMonths.add(
			`${twoMonthsAhead.getFullYear()}-${String(twoMonthsAhead.getMonth() + 1).padStart(2, '0')}`
		);
	});

	const error = $derived(data?.error);

	// Featured events: computed on server, convert date strings to Date objects
	const featuredEvents = $derived(
		(data?.featuredEvents || []).map((event) => ({
			...event,
			startDate: typeof event.startDate === 'string' ? new Date(event.startDate) : event.startDate,
			endDate:
				event.endDate && typeof event.endDate === 'string' ? new Date(event.endDate) : event.endDate
		}))
	);

	let selectedFilter = $state<string | null>(null);

	const filters = [
		'All Events',
		'All-Church Gatherings',
		'Kids & Students',
		'Groups & Classes',
		'Serve & Outreach',
		'Prayer & Care'
	];

	const filteredEvents = $derived(() => {
		if (!selectedFilter || selectedFilter === 'All Events') {
			return allEvents;
		}
		// Filter by event kind or description keywords
		return allEvents.filter((event: CalendarEvent) => {
			const lowerKind = event.kind?.toLowerCase() || '';
			const lowerTitle = event.title.toLowerCase();
			const lowerDesc = event.description.toLowerCase();

			if (selectedFilter === 'Kids & Students') {
				return (
					lowerKind.includes('kids') ||
					lowerKind.includes('student') ||
					lowerKind.includes('children') ||
					lowerTitle.includes('kids') ||
					lowerTitle.includes('student') ||
					lowerDesc.includes('kids') ||
					lowerDesc.includes('student')
				);
			}
			if (selectedFilter === 'Groups & Classes') {
				return (
					lowerKind.includes('group') ||
					lowerKind.includes('class') ||
					lowerTitle.includes('group') ||
					lowerTitle.includes('class')
				);
			}
			if (selectedFilter === 'Serve & Outreach') {
				return (
					lowerKind.includes('serve') ||
					lowerKind.includes('outreach') ||
					lowerTitle.includes('serve') ||
					lowerTitle.includes('outreach')
				);
			}
			if (selectedFilter === 'Prayer & Care') {
				return (
					lowerKind.includes('prayer') ||
					lowerKind.includes('care') ||
					lowerTitle.includes('prayer') ||
					lowerTitle.includes('care')
				);
			}
			if (selectedFilter === 'All-Church Gatherings') {
				return (
					lowerKind.includes('worship') ||
					lowerKind.includes('service') ||
					lowerKind.includes('gathering') ||
					lowerTitle.includes('worship') ||
					lowerTitle.includes('service') ||
					lowerTitle.includes('sunday') ||
					lowerDesc.includes('worship') ||
					lowerDesc.includes('service')
				);
			}
			return true;
		});
	});

	function formatDate(date: Date): string {
		return new Intl.DateTimeFormat('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			timeZone: 'America/New_York'
		}).format(date);
	}

	function formatTime(date: Date): string {
		return new Intl.DateTimeFormat('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
			timeZone: 'America/New_York'
		}).format(date);
	}

	function formatDateRange(startDate: Date, endDate: Date | null): string {
		if (!endDate) {
			return formatDate(startDate);
		}
		const start = formatDate(startDate);
		const end = formatDate(endDate);
		if (start === end) {
			return start;
		}
		return `${start} - ${end}`;
	}

	// Calendar grid functions
	let currentMonth = $state(new Date());
	let selectedDate = $state<Date | null>(null);
	let selectedDateEvents = $state<CalendarEvent[]>([]);

	function getDaysInMonth(date: Date): number {
		return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	}

	function getFirstDayOfMonth(date: Date): number {
		return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	}

	function getCalendarDays(): Array<Date | null> {
		const days: Array<Date | null> = [];
		const firstDay = getFirstDayOfMonth(currentMonth);
		const daysInMonth = getDaysInMonth(currentMonth);

		// Add empty cells for days before the first day of the month
		for (let i = 0; i < firstDay; i++) {
			days.push(null);
		}

		// Add all days of the month
		for (let day = 1; day <= daysInMonth; day++) {
			days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
		}

		return days;
	}

	/**
	 * Get EST date components from a Date object
	 */
	function getESTDateComponents(date: Date) {
		const formatter = new Intl.DateTimeFormat('en-US', {
			timeZone: 'America/New_York',
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		});

		const parts = formatter.formatToParts(date);
		const getPart = (type: string) => {
			const part = parts.find((p) => p.type === type);
			return part ? parseInt(part.value, 10) : 0;
		};

		return {
			year: getPart('year'),
			month: getPart('month') - 1, // JavaScript months are 0-indexed
			day: getPart('day')
		};
	}

	/**
	 * Compare if two dates fall on the same EST calendar day
	 */
	function isSameESTDate(date1: Date, date2: Date): boolean {
		const d1 = getESTDateComponents(date1);
		const d2 = getESTDateComponents(date2);
		return d1.year === d2.year && d1.month === d2.month && d1.day === d2.day;
	}

	function getEventsForDate(date: Date | null): CalendarEvent[] {
		if (!date) return [];
		const key = getDateKey(date);
		return eventsByDateKeyCache.get(key) || [];
	}

	function hasEvents(date: Date | null): boolean {
		if (!date) return false;
		return getEventsForDate(date).length > 0;
	}

	function selectDate(date: Date) {
		selectedDate = date;
		selectedDateEvents = getEventsForDate(date);
	}

	function formatMonthYear(date: Date): string {
		return new Intl.DateTimeFormat('en-US', {
			month: 'long',
			year: 'numeric'
		}).format(date);
	}

	function formatDay(date: Date): string {
		return date.getDate().toString();
	}

	function isToday(date: Date | null): boolean {
		if (!date) return false;
		const today = new Date();
		return (
			date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear()
		);
	}

	async function fetchEventsForMonth(year: number, month: number) {
		const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;

		// Skip if already loaded
		if (loadedMonths.has(monthKey)) {
			return;
		}

		try {
			// Calculate first and last day of the month in EST
			const firstDay = new Date(year, month, 1);
			const lastDay = new Date(year, month + 1, 0);

			// Format dates as YYYY-MM-DD
			const startDate = firstDay.toISOString().split('T')[0];
			const endDate = lastDay.toISOString().split('T')[0];

			const response = await fetch(
				`/resources/calendar/events?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`
			);

			if (!response.ok) {
				return;
			}

			const result = await response.json();
			if (result.events && Array.isArray(result.events)) {
				// Convert date strings to Date objects
				const newEvents = result.events.map((event: any) => ({
					...event,
					startDate:
						typeof event.startDate === 'string' ? new Date(event.startDate) : event.startDate,
					endDate:
						event.endDate && typeof event.endDate === 'string'
							? new Date(event.endDate)
							: event.endDate,
					visibleInChurchCenter: event.visibleInChurchCenter ?? null,
					eventId: event.eventId
				}));

				// Merge with existing events, avoiding duplicates
				const existingIds = new Set(allEvents.map((e) => e.id));
				const uniqueNewEvents = newEvents.filter((e: CalendarEvent) => !existingIds.has(e.id));

				allEvents = [...allEvents, ...uniqueNewEvents].sort(
					(a, b) => a.startDate.getTime() - b.startDate.getTime()
				);

				// Mark month as loaded
				loadedMonths.add(monthKey);
			}
		} catch (err) {
			// Silently handle errors
		}
	}

	// Fetch remaining months in the background after page loads
	async function fetchRemainingMonths() {
		const now = new Date();
		const monthsToFetch: Array<{ year: number; month: number }> = [];

		// Add previous month (one month before current)
		const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
		monthsToFetch.push({ year: previousMonth.getFullYear(), month: previousMonth.getMonth() });

		// Add future months (3 months ahead to 2 years ahead)
		for (let i = 3; i <= 24; i++) {
			const futureMonth = new Date(now.getFullYear(), now.getMonth() + i, 1);
			monthsToFetch.push({ year: futureMonth.getFullYear(), month: futureMonth.getMonth() });
		}

		// Fetch months in batches with delays to avoid overwhelming the API
		for (const { year, month } of monthsToFetch) {
			await fetchEventsForMonth(year, month);
			// Small delay between requests
			await new Promise((resolve) => setTimeout(resolve, 300));
		}
	}

	// Start fetching remaining months after page loads
	$effect(() => {
		// Wait a bit for the page to render, then start background fetching
		const timeoutId = setTimeout(() => {
			fetchRemainingMonths();
		}, 1000);

		return () => clearTimeout(timeoutId);
	});

	function previousMonth() {
		currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
	}

	function nextMonth() {
		currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
	}

	function goToToday() {
		currentMonth = new Date();
	}

	const calendarDays = $derived(getCalendarDays());
	const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	// Simple function to get date key string (YYYY-MM-DD format in EST)
	function getDateKey(date: Date): string {
		const formatter = new Intl.DateTimeFormat('en-US', {
			timeZone: 'America/New_York',
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		});
		const parts = formatter.formatToParts(date);
		const year = parts.find((p) => p.type === 'year')?.value || '';
		const month = parts.find((p) => p.type === 'month')?.value || '';
		const day = parts.find((p) => p.type === 'day')?.value || '';
		return `${year}-${month}-${day}`;
	}

	// Build a Map of date keys to events - cache it and only rebuild when events change
	let eventsByDateKeyCache = $state<Map<string, CalendarEvent[]>>(new Map());
	let eventsCacheKey = $state<string>('');

	// Rebuild cache only when events actually change
	$effect(() => {
		const events = filteredEvents();
		const eventsKey = `${events.length}-${events[0]?.id || ''}-${events[events.length - 1]?.id || ''}`;

		// Only rebuild if events actually changed
		if (eventsKey !== eventsCacheKey) {
			const dateMap = new Map<string, CalendarEvent[]>();

			for (const event of events) {
				if (!event.startDate || isNaN(event.startDate.getTime())) continue;

				const startKey = getDateKey(event.startDate);

				// Add event to start date
				if (!dateMap.has(startKey)) {
					dateMap.set(startKey, []);
				}
				dateMap.get(startKey)!.push(event);

				// Add all dates in range if it's a multi-day event
				if (event.endDate && !isNaN(event.endDate.getTime())) {
					const endKey = getDateKey(event.endDate);

					// Only process if different dates
					if (startKey !== endKey) {
						// Parse dates for comparison (month is 1-12 from string)
						const [startYear, startMonthStr, startDay] = startKey.split('-').map(Number);
						const [endYear, endMonthStr, endDay] = endKey.split('-').map(Number);

						const startValue = startYear * 10000 + startMonthStr * 100 + startDay;
						const endValue = endYear * 10000 + endMonthStr * 100 + endDay;
						const daysDiff = endValue - startValue;

						// Limit to reasonable range (max 90 days)
						if (daysDiff > 0 && daysDiff <= 90) {
							let currentYear = startYear;
							let currentMonth = startMonthStr; // 1-12 format
							let currentDay = startDay;
							let iterations = 0;

							while (
								currentYear * 10000 + currentMonth * 100 + currentDay <= endValue &&
								iterations < 90
							) {
								const key = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}`;

								if (key !== startKey) {
									if (!dateMap.has(key)) {
										dateMap.set(key, []);
									}
									dateMap.get(key)!.push(event);
								}

								currentDay++;
								iterations++;
								// Get days in month (month is 1-12, so subtract 1 for Date constructor)
								const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
								if (currentDay > daysInMonth) {
									currentDay = 1;
									currentMonth++;
									if (currentMonth > 12) {
										currentMonth = 1;
										currentYear++;
									}
								}
							}
						}
					}
				}
			}

			eventsByDateKeyCache = dateMap;
			eventsCacheKey = eventsKey;
		}
	});

	// Build a Set of date keys that have events for fast lookup
	const eventDateKeys = $derived(() => {
		return new Set(eventsByDateKeyCache.keys());
	});

	// Fast lookup function using Set
	function dayHasEvents(date: Date | null): boolean {
		if (!date) return false;
		const key = getDateKey(date);
		return eventDateKeys().has(key);
	}
</script>

<svelte:head>
	<title>Calendar - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="Stay up to date with everything happening at Community Alliance Church - Hinesburg. Filter by ministry, add events to your calendar, and share with friends. View all-church gatherings, kids & students events, groups, and more."
	/>
</svelte:head>

<section class="pageHero">
	<div class="pageHeroContent">
		<h1 class="pageHeroChild pageHeroTitle">Calendar</h1>
		<p class="pageHeroChild pageHeroText">
			Stay up to date with everything happening at Community Alliance Church - Hinesburg. Filter by
			ministry, add events to your calendar, and share with friends.
		</p>
	</div>
</section>

{#if error}
	<section class="pageSection">
		<div class="errorMessage">
			<h2 class="pageSectionTitle">Calendar Integration Temporarily Unavailable</h2>
			<p class="pageSectionText">
				We're working on connecting our calendar to the website. In the meantime, you can access our
				full calendar through the links below.
			</p>
			<div class="errorActions">
				<a href="https://hinesburgcma.churchcenter.com/calendar" class="errorLink">
					View Calendar on Church Center →
				</a>
				<a href="https://hinesburgcma.churchcenter.com/calendar/subscribe" class="errorLink">
					Subscribe to Calendar (ICS) →
				</a>
			</div>
			{#if error.includes('FLAMINGO') || error.includes('approval')}
				<p class="errorNote">
					<strong>Note:</strong> This is a temporary technical issue that requires Planning Center approval.
					Our team has been notified and is working to resolve it.
				</p>
			{/if}
		</div>
	</section>
{/if}

<FeaturedEventsCarousel events={featuredEvents} />

{#if allEvents.length > 0}
	<section class="pageSection">
		<div class="calendarHeader">
			<h2 class="pageSectionTitle">Calendar</h2>
			<div class="calendarNavigation">
				<button type="button" class="calendarNavButton" onclick={previousMonth}>←</button>
				<button type="button" class="calendarNavButton" onclick={goToToday}>Today</button>
				<button type="button" class="calendarNavButton" onclick={nextMonth}>→</button>
			</div>
		</div>
		<div class="calendarMonthHeader">
			<h3>{formatMonthYear(currentMonth)}</h3>
		</div>
		<div class="filterButtons">
			{#each filters as filter}
				<button
					type="button"
					class="filterButton"
					class:active={selectedFilter === filter || (!selectedFilter && filter === 'All Events')}
					onclick={() => {
						selectedFilter = filter === 'All Events' ? null : filter;
					}}
				>
					{filter}
				</button>
			{/each}
		</div>
		<div class="calendarLayout">
			<div class="calendarGrid">
				<div class="calendarWeekHeader">
					{#each weekDays as day}
						<div class="calendarWeekDay">{day}</div>
					{/each}
				</div>
				<div class="calendarDays">
					{#each calendarDays as day}
						<button
							type="button"
							class="calendarDay"
							class:empty={!day}
							class:today={day && isToday(day)}
							class:hasEvents={day && dayHasEvents(day)}
							class:selected={day && selectedDate && isSameESTDate(day, selectedDate)}
							disabled={!day || !dayHasEvents(day)}
							onclick={() => {
								if (day && dayHasEvents(day)) {
									selectDate(day);
								}
							}}
						>
							{#if day}
								<div class="calendarDayNumber" class:hasEvents={day && dayHasEvents(day)}>
									{formatDay(day)}
								</div>
							{/if}
						</button>
					{/each}
				</div>
			</div>
			<div class="eventsPanel">
				{#if selectedDate}
					<div class="eventsPanelHeader">
						<h3>{formatDate(selectedDate)}</h3>
					</div>
					<div class="eventsPanelContent">
						{#if selectedDateEvents.length > 0}
							<div class="eventList">
								{#each selectedDateEvents as event}
									<article class="eventCard">
										<h4 class="eventTitle">
											<a href="/events/{event.eventId}">
												{event.title}
											</a>
										</h4>
										{#if !event.allDay}
											<div class="eventTime">
												<time datetime={event.startDate.toISOString()}>
													{formatTime(event.startDate)}
													{#if event.endDate}
														{' - '}
														{formatTime(event.endDate)}
													{/if}
												</time>
											</div>
										{:else}
											<div class="eventTime">All Day</div>
										{/if}
										{#if event.location}
											<div class="eventLocation">
												<strong>Location:</strong>
												{event.location}
											</div>
										{/if}
										{#if event.description}
											<div class="eventDescription">{@html event.description}</div>
										{/if}
										{#if event.kind}
											<div class="eventKind">
												<span class="kindTag">{event.kind}</span>
											</div>
										{/if}
									</article>
								{/each}
							</div>
						{:else}
							<p class="noEvents">No events scheduled for this date.</p>
						{/if}
					</div>
				{:else}
					<div class="eventsPanelEmpty">
						<p>Click on a date with events to view details.</p>
					</div>
				{/if}
			</div>
		</div>
	</section>
{:else if !error}
	<section class="pageSection">
		<p class="pageSectionText">No upcoming events at this time. Check back soon!</p>
	</section>
{/if}

<section class="pageSection">
	<h2 class="pageSectionTitle">Event Categories</h2>
	<ul class="pageSectionList">
		{#each filters.slice(1) as filter}
			<li class="pageSectionListItem">{filter}</li>
		{/each}
	</ul>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Need Help?</h2>
	<p class="pageSectionText">
		Our team can help you register for events, volunteer opportunities, and retreats.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Email the Office</a>
		<a href="tel:+18024822132">Call (802) 482-2132</a>
	</div>
</section>

<style>
	.calendarHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
		gap: 1rem;

		h2 {
			margin: 0;
		}
	}

	.calendarNavigation {
		display: flex;
		gap: 0.5rem;
	}

	.calendarNavButton {
		padding: 0.5rem 1rem;
		border: 1px solid color-mix(in oklab, var(--contrastColor) 25%, transparent);
		background: color-mix(in oklab, var(--surfaceColor) 88%, black 12%);
		color: color-mix(in oklab, var(--contrastColor) 94%, white 6%);
		border-radius: 8px;
		font-size: 0.9rem;
		font-weight: 600;
		cursor: pointer;
		transition:
			background-color 0.2s ease,
			border-color 0.2s ease;

		&:hover {
			background: color-mix(in oklab, var(--surfaceColor) 92%, black 8%);
			border-color: color-mix(in oklab, var(--primaryColor) 35%, transparent);
		}
	}

	.calendarMonthHeader {
		margin-bottom: 1.5rem;

		h3 {
			margin: 0;
			font-size: 1.5rem;
			color: var(--contrastColor);
		}
	}

	.filterButtons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-bottom: 2rem;
	}

	.filterButton {
		padding: 0.5rem 1rem;
		border: 1px solid color-mix(in oklab, var(--contrastColor) 25%, transparent);
		background: color-mix(in oklab, var(--surfaceColor) 88%, black 12%);
		color: color-mix(in oklab, var(--contrastColor) 94%, white 6%);
		border-radius: 999px;
		font-size: 0.85rem;
		font-weight: 600;
		cursor: pointer;
		transition:
			background-color 0.2s ease,
			border-color 0.2s ease,
			color 0.2s ease;

		&:hover {
			background: color-mix(in oklab, var(--surfaceColor) 92%, black 8%);
			border-color: color-mix(in oklab, var(--primaryColor) 35%, transparent);
		}

		&.active {
			background: var(--primaryColor);
			border-color: var(--primaryColor);
			color: var(--contrastColor);
		}
	}

	.errorMessage {
		padding: 2rem;
		background: color-mix(in oklab, var(--accentColor) 15%, transparent);
		border: 1px solid color-mix(in oklab, var(--accentColor) 30%, transparent);
		border-radius: 12px;
		color: var(--contrastColor);
		text-align: center;

		h2 {
			margin: 0 0 1rem;
			color: var(--contrastColor);
			font-size: 1.5rem;
		}

		p {
			margin: 0.75rem 0;
			line-height: 1.6;
		}

		.errorActions {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			margin: 1.5rem 0;
			align-items: center;

			@media (min-width: 640px) {
				flex-direction: row;
				justify-content: center;
			}
		}

		.errorLink {
			display: inline-block;
			padding: 0.75rem 1.5rem;
			background: var(--primaryColor);
			color: var(--contrastColor);
			text-decoration: none;
			border-radius: 8px;
			font-weight: 600;
			transition:
				background-color 0.2s ease,
				transform 0.2s ease;

			&:hover {
				background: color-mix(in oklab, var(--primaryColor) 90%, black);
				transform: translateY(-2px);
			}
		}

		.errorNote {
			margin-top: 1.5rem;
			padding-top: 1.5rem;
			border-top: 1px solid color-mix(in oklab, var(--accentColor) 30%, transparent);
			font-size: 0.9rem;
			color: color-mix(in oklab, var(--contrastColor) 80%, transparent);
		}
	}

	.calendarLayout {
		display: grid;
		grid-template-columns: 1.5fr 1fr;
		gap: 2rem;
		align-items: start;

		@media (max-width: 1024px) {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}

	.calendarGrid {
		background: color-mix(in oklab, var(--surfaceColor) 88%, transparent);
		border-radius: 12px;
		border: 1px solid color-mix(in oklab, var(--primaryColor) 20%, transparent);
		overflow: hidden;
	}

	.calendarWeekHeader {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		background: color-mix(in oklab, var(--primaryColor) 10%, transparent);
		border-bottom: 2px solid color-mix(in oklab, var(--primaryColor) 20%, transparent);
	}

	.calendarWeekDay {
		padding: 0.75rem;
		text-align: center;
		font-weight: 700;
		font-size: 0.85rem;
		color: var(--primaryColor);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.calendarDays {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 1px;
		background: color-mix(in oklab, var(--primaryColor) 10%, transparent);
	}

	.calendarDay {
		min-height: 100px;
		background: color-mix(in oklab, var(--surfaceColor) 95%, transparent);
		padding: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		border: 2px solid transparent;
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			border-color 0.15s ease;
		text-align: left;
		will-change: background-color, border-color;

		&:disabled {
			cursor: default;
		}

		&:not(:disabled):hover {
			background: color-mix(in oklab, var(--surfaceColor) 98%, transparent);
		}

		&.empty {
			background: color-mix(in oklab, var(--surfaceColor) 85%, transparent);
			cursor: default;
		}

		&.today {
			background: color-mix(in oklab, var(--primaryColor) 8%, transparent);
			border-color: var(--primaryColor);
		}

		&.hasEvents {
			background: color-mix(in oklab, var(--primaryColor) 5%, transparent);
			border-color: color-mix(in oklab, var(--primaryColor) 30%, transparent);

			&:not(:disabled):hover {
				background: color-mix(in oklab, var(--primaryColor) 10%, transparent);
				border-color: var(--primaryColor);
			}
		}

		&.selected {
			background: color-mix(in oklab, var(--primaryColor) 15%, transparent);
			border-color: var(--primaryColor);
			border-width: 3px;
		}

		@media (max-width: 768px) {
			min-height: 80px;
			padding: 0.25rem;
		}

		@media (max-width: 480px) {
			min-height: 60px;
			padding: 0.2rem;
		}
	}

	.calendarDayNumber {
		font-weight: 700;
		font-size: 0.9rem;
		color: color-mix(in oklab, var(--contrastColor) 90%, transparent);
		margin-bottom: 0.25rem;
		width: 28px;

		border-radius: 999px;
		aspect-ratio: 1/1;
		display: grid;
		place-items: center;

		&.hasEvents {
			color: var(--primaryColor);
			font-weight: 800;
			background: var(--accentColor);
		}
	}

	.eventsPanel {
		background: color-mix(in oklab, var(--surfaceColor) 88%, transparent);
		border-radius: 12px;
		border: 1px solid color-mix(in oklab, var(--primaryColor) 20%, transparent);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		min-height: 500px;
		max-height: 800px;

		@media (max-width: 1024px) {
			min-height: auto;
			max-height: none;
		}
	}

	.eventsPanelHeader {
		padding: 1.5rem;
		border-bottom: 1px solid color-mix(in oklab, var(--primaryColor) 20%, transparent);
		background: color-mix(in oklab, var(--primaryColor) 5%, transparent);

		h3 {
			margin: 0;
			font-size: 1.5rem;
			color: var(--contrastColor);
		}
	}

	.eventsPanelContent {
		flex: 1;
		overflow-y: auto;
		padding: 1.5rem;
	}

	.eventsPanelEmpty {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		color: color-mix(in oklab, var(--contrastColor) 60%, transparent);
		text-align: center;
	}

	.eventList {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.eventCard {
		background: color-mix(in oklab, var(--surfaceColor) 95%, transparent);
		border-bottom: 1px solid color-mix(in oklab, var(--accentColor) 85%, transparent);

		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;

		&:hover {
			border-color: color-mix(in oklab, var(--primaryColor) 30%, transparent);
			box-shadow: 0 2px 8px color-mix(in oklab, var(--primaryColor) 10%, transparent);
		}
	}

	.eventTitle {
		margin: 0 0 0.75rem;
		font-size: 1.1rem;
		color: var(--contrastColor);

		a {
			color: var(--primaryColor);
			text-decoration: none;
			transition: color 0.2s ease;

			&:hover {
				color: color-mix(in oklab, var(--primaryColor) 80%, black);
				text-decoration: underline;
			}
		}
	}

	.eventTime {
		margin-bottom: 0.75rem;
		font-size: 0.95rem;
		color: color-mix(in oklab, var(--contrastColor) 80%, transparent);
		font-weight: 600;
	}

	.eventLocation {
		margin-bottom: 0.75rem;
		font-size: 0.9rem;
		color: color-mix(in oklab, var(--contrastColor) 85%, transparent);

		strong {
			color: var(--contrastColor);
		}
	}

	.eventDescription {
		margin-bottom: 0.75rem;
		font-size: 0.9rem;
		line-height: 1.6;
		color: color-mix(in oklab, var(--contrastColor) 90%, transparent);
	}

	.eventKind {
		margin-top: 0.75rem;
	}

	.kindTag {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		background: color-mix(in oklab, var(--primaryColor) 15%, transparent);
		color: var(--primaryColor);
		border-radius: 999px;
		font-size: 0.8rem;
		font-weight: 600;
	}

	.noEvents {
		text-align: center;
		color: color-mix(in oklab, var(--contrastColor) 70%, transparent);
		padding: 2rem 0;
	}

	/* Optimize button clicks - remove pointer events delay */
	.calendarDay:not(:disabled) {
		touch-action: manipulation;
		-webkit-tap-highlight-color: transparent;
	}
</style>
