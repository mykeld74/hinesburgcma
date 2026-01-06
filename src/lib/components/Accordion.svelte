<script lang="ts">
	type AccordionProps = {
		title: string;
		open?: boolean;
		children: import('svelte').Snippet;
	};

	const props = $props<AccordionProps>();
	let isOpen = $state(props.open ?? false);

	function toggle() {
		isOpen = !isOpen;
	}
</script>

<div class="accordion">
	<button
		type="button"
		class="accordionButton"
		onclick={toggle}
		aria-expanded={isOpen}
		aria-controls="accordion-content-{props.title}"
	>
		<span class="accordionTitle">{props.title}</span>
		<span class="accordionIcon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
	</button>
	<div
		id="accordion-content-{props.title}"
		class="accordionContent"
		class:open={isOpen}
		role="region"
		aria-labelledby="accordion-button-{props.title}"
	>
		<div class="accordionInner">
			{@render props.children()}
		</div>
	</div>
</div>

<style>
	.accordion {
		border: 1px solid color-mix(in oklch, var(--primaryColor) 40%, transparent);
		border-radius: 18px;
		background: color-mix(in oklch, var(--surfaceColor) 88%, black 12%);
		box-shadow:
			inset 0 0 0 1px color-mix(in oklch, var(--contrastColor) 6%, transparent),
			0 16px 24px color-mix(in oklch, black 35%, transparent);
		overflow: hidden;
	}

	.accordionButton {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: clamp(1rem, 2.5vw, 1.4rem) clamp(1.25rem, 3vw, 1.75rem);
		background: transparent;
		border: none;
		cursor: pointer;
		text-align: left;
		color: var(--contrastColor);
		font-family: 'Raleway', sans-serif;
		font-weight: 700;
		font-size: clamp(1.1rem, 0.5vw + 1rem, 1.35rem);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		transition: background-color 0.2s ease;

		&:hover {
			background: color-mix(in oklch, var(--primaryColor) 15%, transparent);
		}

		&:focus-visible {
			outline: 2px solid var(--accentColor);
			outline-offset: -2px;
		}
	}

	.accordionTitle {
		flex: 1;
	}

	.accordionIcon {
		font-size: 1.5em;
		font-weight: 300;
		line-height: 1;
		margin-left: 1rem;
		transition: transform 0.3s ease;
	}

	.accordionContent {
		max-height: 0;
		overflow: hidden;
		transition: max-height 0.5s ease;
	}

	.accordionContent.open {
		max-height: 1000px;
		transition: max-height 0.5s ease;
	}

	.accordionInner {
		padding: 0 clamp(1.25rem, 3vw, 1.75rem) clamp(1.25rem, 3vw, 1.75rem);
		color: color-mix(in oklch, var(--contrastColor) 85%, transparent);
		line-height: 1.75;

		:global(p) {
			margin: 1rem 0 1rem;

			&:last-child {
				margin-bottom: 0;
			}
		}

		:global(ul) {
			margin: 0 0 1rem;
			padding-left: 1.5rem;

			&:last-child {
				margin-bottom: 0;
			}
		}

		:global(li) {
			margin-bottom: 0.5rem;

			&:last-child {
				margin-bottom: 0;
			}
		}

		:global(strong) {
			font-weight: 700;
		}

		:global(em) {
			font-style: italic;
		}

		:global(a) {
			color: var(--accentColor);
			text-decoration: none;

			&:hover {
				text-decoration: underline;
			}
		}
	}
</style>
