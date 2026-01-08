<script lang="ts">
	import FeaturedEventCard from '$lib/components/FeaturedEventCard.svelte';

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

	let { events }: { events: CalendarEvent[] } = $props();

	// Carousel state
	let currentIndex = $state(0);
	let carouselTrack: HTMLElement | null = $state(null);
	let cardsToShow = $state(3); // Default to 3, will update based on viewport

	function getCardsToShow(): number {
		if (typeof window === 'undefined') return 3;
		const width = window.innerWidth;
		if (width <= 640) return 1;
		if (width <= 1024) return 2;
		return 3;
	}

	function goToSlide(index: number) {
		if (!events.length) return;
		const maxIndex = Math.max(0, events.length - cardsToShow);
		currentIndex = Math.max(0, Math.min(index, maxIndex));
		updateCarouselPosition();
	}

	function nextSlide() {
		if (!events.length) return;
		cardsToShow = getCardsToShow();
		const maxIndex = Math.max(0, events.length - cardsToShow);

		if (currentIndex < maxIndex) {
			currentIndex = currentIndex + 1;
			updateCarouselPosition();
		}
	}

	function prevSlide() {
		if (!events.length) return;
		cardsToShow = getCardsToShow();

		if (currentIndex > 0) {
			currentIndex = currentIndex - 1;
			updateCarouselPosition();
		}
	}

	function updateCarouselPosition() {
		if (!carouselTrack || typeof window === 'undefined' || events.length === 0) return;

		// Get the first card to calculate width
		// The FeaturedEventCard component renders as an anchor tag with class featuredEventCard
		const firstCard = carouselTrack.querySelector('.featuredEventCard') as HTMLElement;
		if (!firstCard || firstCard.offsetWidth === 0) {
			// Retry after a short delay if card isn't ready
			setTimeout(() => updateCarouselPosition(), 50);
			return;
		}

		const cardWidth = firstCard.offsetWidth;
		const computedStyle = window.getComputedStyle(carouselTrack);
		const gapValue = computedStyle.gap || '0px';
		// On mobile (≤640px), gap is 0, otherwise use the computed gap
		const isMobile = window.innerWidth <= 640;
		const gap = isMobile ? 0 : parseFloat(gapValue) || 16;

		// Calculate move distance - each index represents one card width + gap
		const moveDistance = currentIndex * (cardWidth + gap);

		// Use CSS transform
		carouselTrack.style.transform = `translateX(-${moveDistance}px)`;
	}

	// Reset index when events change
	$effect(() => {
		if (events.length > 0) {
			cardsToShow = getCardsToShow();
			const maxIndex = Math.max(0, events.length - cardsToShow);
			if (currentIndex > maxIndex) {
				currentIndex = maxIndex;
			}
		} else {
			currentIndex = 0;
		}
	});

	// Initialize carousel position when track is ready
	$effect(() => {
		if (carouselTrack && typeof window !== 'undefined' && events.length > 0) {
			// Wait for next tick to ensure cards are rendered
			setTimeout(() => {
				if (!carouselTrack) return;
				updateCarouselPosition();
			}, 0);
		}
	});

	// Update position on window resize to handle responsive breakpoints
	$effect(() => {
		if (typeof window === 'undefined') return;

		let resizeTimeout: ReturnType<typeof setTimeout>;
		const handleResize = () => {
			// Debounce resize events for better performance
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				const newCardsToShow = getCardsToShow();
				cardsToShow = newCardsToShow;

				// Ensure currentIndex is still valid after resize
				const maxIndex = Math.max(0, events.length - newCardsToShow);
				if (currentIndex > maxIndex) {
					currentIndex = maxIndex;
				}
				updateCarouselPosition();
			}, 150);
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

{#if events.length > 0}
	<section class="pageSection">
		<h2 class="pageSectionTitle">Featured Events</h2>
		<div class="carouselWrapper">
			<div class="carouselContainer">
				<button
					type="button"
					class="carouselButton carouselButtonPrev"
					onclick={prevSlide}
					aria-label="Previous events"
					disabled={currentIndex === 0 || events.length <= getCardsToShow()}
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M15 18L9 12L15 6"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<div class="carouselViewport">
					<div class="carouselTrack" bind:this={carouselTrack}>
						{#each events as event, index}
							<FeaturedEventCard {event} loading={index === 0 ? 'eager' : 'lazy'} />
						{/each}
					</div>
				</div>
				<button
					type="button"
					class="carouselButton carouselButtonNext"
					onclick={nextSlide}
					aria-label="Next events"
					disabled={currentIndex >= Math.max(0, events.length - getCardsToShow()) ||
						events.length <= getCardsToShow()}
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M9 18L15 12L9 6"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			</div>
			<!-- {#if events.length > getCardsToShow()}
				{@const cardsVisible = getCardsToShow()}
				{@const totalPages = Math.ceil(events.length / cardsVisible)}
				<div class="carouselIndicators">
					{#each Array(totalPages) as _, pageIndex}
						{@const startIndex = pageIndex * cardsVisible}
						{@const isActive =
							currentIndex >= startIndex && currentIndex < startIndex + cardsVisible}
						<button
							type="button"
							class="carouselIndicator"
							class:active={isActive}
							onclick={() => goToSlide(startIndex)}
							aria-label="Go to page {pageIndex + 1}"
						>
							<span class="sr-only">Page {pageIndex + 1}</span>
						</button>
					{/each}
				</div>
			{/if} -->
		</div>
	</section>
{/if}

<style>
	.carouselWrapper {
		margin-top: 1.5rem;
		position: relative;
		max-width: 1020px;
	}

	.carouselContainer {
		position: relative;
		display: flex;
		align-items: center;
		gap: 1rem;
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
	}

	.carouselViewport {
		overflow: hidden;
		flex: 1;
		min-width: 0;
		border-radius: 12px;
		position: relative;
	}

	.carouselTrack {
		display: flex;
		gap: 1rem;
		will-change: transform;
		transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
		min-width: 0;
	}

	.carouselButton {
		flex-shrink: 0;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		border: 2px solid color-mix(in oklab, var(--primaryColor) 30%, transparent);
		background: color-mix(in oklab, var(--surfaceColor) 95%, transparent);
		color: var(--primaryColor);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			background-color 0.2s ease,
			border-color 0.2s ease,
			transform 0.2s ease;
		z-index: 2;

		&:hover:not(:disabled) {
			background: var(--primaryColor);
			color: var(--contrastColor);
			border-color: var(--primaryColor);
			transform: scale(1.05);
		}

		&:active:not(:disabled) {
			transform: scale(0.95);
		}

		&:disabled {
			opacity: 0.3;
			cursor: not-allowed;
		}

		svg {
			width: 24px;
			height: 24px;
		}

		@media (max-width: 768px) {
			width: 40px;
			height: 40px;

			svg {
				width: 20px;
				height: 20px;
			}
		}

		@media (max-width: 640px) {
			width: 36px;
			height: 36px;

			svg {
				width: 18px;
				height: 18px;
			}
		}
	}

	.carouselIndicators {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		margin-top: 1.5rem;
	}

	.carouselIndicator {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: 2px solid color-mix(in oklab, var(--primaryColor) 40%, transparent);
		background: transparent;
		cursor: pointer;
		padding: 0;
		transition:
			background-color 0.2s ease,
			border-color 0.2s ease,
			transform 0.2s ease;
		position: relative;

		.sr-only {
			position: absolute;
			width: 1px;
			height: 1px;
			padding: 0;
			margin: -1px;
			overflow: hidden;
			clip: rect(0, 0, 0, 0);
			white-space: nowrap;
			border-width: 0;
		}

		&:hover {
			transform: scale(1.2);
			border-color: var(--primaryColor);
		}

		&.active {
			background: var(--primaryColor);
			border-color: var(--primaryColor);
			transform: scale(1.2);
		}
	}

	@media (max-width: 768px) {
		.carouselContainer {
			gap: 0.5rem;
		}
	}

	@media (max-width: 640px) {
		.carouselContainer {
			gap: 0.5rem;
		}

		.carouselViewport {
			border-radius: 8px;
			flex: 1;
			min-width: 0;
		}

		.carouselTrack {
			gap: 0;
		}

		.carouselWrapper {
			width: 100%;
			max-width: 100%;
			overflow-x: hidden;
		}
	}
</style>
