<script lang="ts">
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
		publicUrl: string | null;
		imageUrl: string | null;
	};

	let { event, loading = 'lazy' }: { event: CalendarEvent; loading?: 'lazy' | 'eager' } = $props();

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
</script>

<a href="/events/{event.eventId}" class="featuredEventCard">
	{#if event.imageUrl}
		<div class="featuredEventImage">
			<img src={event.imageUrl} alt={event.title} {loading} />
		</div>
	{/if}
	<div class="featuredEventContent">
		<div class="featuredEventHeader">
			<h3 class="featuredEventTitle">
				{event.title}
			</h3>
			<div class="featuredEventDate">
				{formatDate(event.startDate)}
				{#if !event.allDay}
					<br />{' '}at{' '}
					{formatTime(event.startDate)}
				{/if}
			</div>
		</div>
		<!-- {#if event.location}
			<div class="featuredEventLocation">
				{event.location}
			</div>
		{/if}
		{#if event.description}
			<div class="featuredEventDescription">{@html event.description}</div>
		{/if}
		{#if event.kind}
			<div class="featuredEventKind">
				<span class="kindTag">{event.kind}</span>
			</div>
		{/if} -->
	</div>
</a>

<style>
	.featuredEventCard {
		flex: 0 0 calc(33.333% - 0.667rem);
		min-width: 0;
		max-width: 100%;
		background: color-mix(in oklab, var(--surfaceColor) 88%, transparent);
		border: 1px solid color-mix(in oklab, var(--primaryColor) 25%, transparent);
		border-radius: 12px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		text-decoration: none;
		color: inherit;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease,
			border-color 0.2s ease;

		&:hover {
			transform: translateY(-2px);
			box-shadow: 0 8px 24px color-mix(in oklab, var(--primaryColor) 15%, transparent);
			border-color: color-mix(in oklab, var(--primaryColor) 40%, transparent);
		}

		@media (max-width: 1024px) {
			flex: 0 0 calc(50% - 0.5rem);
		}

		@media (max-width: 640px) {
			flex: 0 0 100%;
			width: 100%;
			max-width: 100%;
		}
	}

	.featuredEventImage {
		width: 100%;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		background: color-mix(in oklab, var(--backgroundColor) 95%, transparent);
		flex-shrink: 0;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
		}
	}

	.featuredEventContent {
		padding: 1.5rem;
		display: grid;
		gap: 0.75rem;
		flex: 1;
		min-height: 0;
	}

	.featuredEventHeader {
		display: grid;
		gap: 0.5rem;
	}

	.featuredEventTitle {
		margin: 0;
		font-size: 1.25rem;
		color: var(--contrastColor);
		line-height: 1.3;
	}

	.featuredEventDate {
		font-size: 0.95rem;
		color: var(--accentColor);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.featuredEventLocation {
		font-size: 0.9rem;
		color: color-mix(in oklab, var(--contrastColor) 85%, transparent);
		padding-top: 0.5rem;
		border-top: 1px solid color-mix(in oklab, var(--primaryColor) 15%, transparent);
	}

	.featuredEventDescription {
		font-size: 0.9rem;
		line-height: 1.6;
		color: color-mix(in oklab, var(--contrastColor) 90%, transparent);

		/* Limit description to 3 lines with ellipsis */
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.featuredEventKind {
		margin-top: 0.5rem;
		padding-top: 0.75rem;
		border-top: 1px solid color-mix(in oklab, var(--primaryColor) 15%, transparent);
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

	@media (max-width: 768px) {
		.featuredEventContent {
			padding: 1.25rem;
		}
	}
</style>
