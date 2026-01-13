<script lang="ts">
	let { data } = $props();

	function hasDescriptionContent(description: string | undefined | null): boolean {
		if (!description) return false;
		// Remove HTML tags and whitespace to check if there's actual content
		const textContent = description.replace(/<[^>]*>/g, '').trim();
		return textContent.length > 0;
	}

	const showDescription = $derived(hasDescriptionContent(data.event.description));

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

	function formatDateTime(startDate: Date, endDate: Date | null): string {
		const dateStr = formatDate(startDate);
		if (endDate) {
			return `${dateStr}, ${formatTime(startDate)} - ${formatTime(endDate)}`;
		}
		return `${dateStr}, ${formatTime(startDate)}`;
	}

	function isMultiDay(startDate: Date, endDate: Date | null): boolean {
		if (!endDate) return false;
		const start = new Date(startDate);
		start.setHours(0, 0, 0, 0);
		const end = new Date(endDate);
		end.setHours(0, 0, 0, 0);
		return start.getTime() !== end.getTime();
	}
</script>

<svelte:head>
	<title>{data.event.name} - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content={data.event.description || `Event details for ${data.event.name}`}
	/>
</svelte:head>

<section class="pageHero">
	<div class="pageHeroContent">
		<h1 class="pageHeroChild pageHeroTitle">{data.event.name}</h1>
		{#if data.event.kind}
			<p class="pageHeroChild pageHeroText">{data.event.kind}</p>
		{/if}
	</div>
</section>

<section class="pageSection">
	{#if data.event.imageUrl}
		<div class="eventImage">
			<img src={data.event.imageUrl} alt={data.event.name} loading="eager" />
		</div>
	{/if}

	{#if data.instance}
		<div class="eventInstance">
			<h2 class="pageSectionTitle">Event Time</h2>
			<div class="eventInstanceItem">
				{#if isMultiDay(data.instance.startsAt, data.instance.endsAt)}
					<div class="multiDayEvent">
						<div class="eventDateRange">
							<div class="eventDateItem">
								<strong>From:</strong>
								<time datetime={data.instance.startsAt.toISOString()}>
									{#if data.instance.allDay}
										{formatDate(data.instance.startsAt)}
										<span class="allDayLabel"> (All Day)</span>
									{:else}
										{formatDate(data.instance.startsAt)}, {formatTime(data.instance.startsAt)}
									{/if}
								</time>
							</div>
							<div class="eventDateItem">
								<strong>To:</strong>
								<time datetime={data.instance.endsAt?.toISOString()}>
									{#if data.instance.allDay}
										{formatDate(data.instance.endsAt!)}
										<span class="allDayLabel"> (All Day)</span>
									{:else}
										{formatDate(data.instance.endsAt!)}, {formatTime(data.instance.endsAt!)}
									{/if}
								</time>
							</div>
						</div>
					</div>
				{:else}
					<time datetime={data.instance.startsAt.toISOString()}>
						{#if data.instance.allDay}
							{formatDate(data.instance.startsAt)}
							{#if data.instance.endsAt && data.instance.endsAt.getTime() !== data.instance.startsAt.getTime()}
								{' - '}
								{formatDate(data.instance.endsAt)}
							{/if}
							<span class="allDayLabel"> (All Day)</span>
						{:else}
							{formatDateTime(data.instance.startsAt, data.instance.endsAt)}
						{/if}
					</time>
				{/if}
				{#if data.instance.location}
					<div class="eventInstanceLocation">
						<strong>Location:</strong>
						{data.instance.location}
					</div>
				{/if}
			</div>
		</div>
	{/if}

	{#if showDescription}
		<div class="eventDescription">
			<div class="eventDescriptionContainer">
				<h2 class="pageSectionTitle">About This Event</h2>
				<div class="eventDescriptionContent">{@html data.event.description}</div>
			</div>
		</div>
	{/if}

	{#if data.event.registrationUrl || data.event.publicUrl}
		<div class="eventActions">
			{#if data.event.registrationUrl}
				<a
					href={data.event.registrationUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="eventLink eventLinkPrimary"
				>
					Register for Event →
				</a>
			{/if}
			{#if data.event.publicUrl}
				<a href={data.event.publicUrl} target="_blank" rel="noopener noreferrer" class="eventLink">
					View on Church Center →
				</a>
			{/if}
		</div>
	{/if}
</section>

<style>
	.eventImage {
		margin-bottom: 2rem;
		border-radius: 12px;
		overflow: hidden;

		img {
			width: 100%;
			height: auto;
			display: block;
		}
	}

	.eventInstance {
		margin-bottom: 2rem;
	}

	.eventInstanceItem {
		padding: 1.5rem;
		background: color-mix(in oklab, var(--surfaceColor) 88%, transparent);
		border-radius: 8px;
		border: 1px solid color-mix(in oklab, var(--primaryColor) 20%, transparent);

		time {
			display: block;
			font-size: 1.1rem;
			font-weight: 600;
			color: var(--contrastColor);
			margin-bottom: 0.5rem;
		}

		.allDayLabel {
			font-weight: 400;
			color: color-mix(in oklab, var(--contrastColor) 70%, transparent);
		}
	}

	.multiDayEvent {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.eventDateRange {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.eventDateItem {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;

		strong {
			font-size: 0.9rem;
			color: color-mix(in oklab, var(--contrastColor) 80%, transparent);
			text-transform: uppercase;
			letter-spacing: 0.05em;
		}

		time {
			font-size: 1.1rem;
			font-weight: 600;
			color: var(--contrastColor);
		}
	}

	.eventInstanceLocation {
		font-size: 0.95rem;
		color: color-mix(in oklab, var(--contrastColor) 85%, transparent);
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid color-mix(in oklab, var(--primaryColor) 15%, transparent);

		strong {
			color: var(--contrastColor);
		}
	}

	.eventDescription {
		margin-bottom: 2rem;
	}

	.eventDescriptionContent {
		font-size: 1rem;
		line-height: 1.7;
		color: var(--contrastColor);

		:global(p) {
			margin: 1rem 0;
		}

		:global(ul),
		:global(ol) {
			margin: 1rem 0;
			padding-left: 2rem;
		}

		:global(li) {
			margin: 0.5rem 0;
		}

		:global(a) {
			color: var(--primaryColor);
			text-decoration: none;

			&:hover {
				text-decoration: underline;
			}
		}
	}

	.eventActions {
		margin-top: 2rem;
		padding-top: 2rem;
		border-top: 1px solid color-mix(in oklab, var(--primaryColor) 20%, transparent);
		display: flex;
		flex-direction: column;
		gap: 1rem;

		@media (min-width: 640px) {
			flex-direction: row;
			gap: 1rem;
		}
	}

	.eventLink {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		background: color-mix(in oklab, var(--surfaceColor) 88%, transparent);
		color: var(--contrastColor);
		text-decoration: none;
		border-radius: 8px;
		font-weight: 600;
		border: 2px solid color-mix(in oklab, var(--primaryColor) 30%, transparent);
		transition:
			background-color 0.2s ease,
			border-color 0.2s ease,
			transform 0.2s ease;
		text-align: center;

		&:hover {
			background: color-mix(in oklab, var(--surfaceColor) 92%, transparent);
			border-color: var(--primaryColor);
			transform: translateY(-2px);
		}
	}

	.eventLinkPrimary {
		background: var(--primaryColor);
		border-color: var(--primaryColor);
		color: #fff;

		&:hover {
			background: color-mix(in oklab, var(--primaryColor) 90%, black);
			border-color: color-mix(in oklab, var(--primaryColor) 90%, black);
		}
	}
</style>
