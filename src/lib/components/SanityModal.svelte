<script lang="ts">
	import { onMount } from 'svelte';
	import PortableText from '$lib/components/PortableText.svelte';
	import type { PortableTextBlock } from '@portabletext/types';

	type ImageAsset = {
		_id: string;
		url?: string;
		metadata?: {
			dimensions?: {
				width?: number;
				height?: number;
				aspectRatio?: number;
			};
		};
	};

	type ContentBlock = {
		_type: string;
		_key: string;
		content?: PortableTextBlock[];
		image?: {
			asset?: ImageAsset;
		};
		imageUrl?: string;
		[key: string]: unknown;
	};

	type ModalContent = {
		_id: string;
		_type: string;
		title?: string;
		content?: PortableTextBlock[];
		image?: {
			asset?: ImageAsset;
		};
		imageUrl?: string;
		contentBlocks?: ContentBlock[];
		enabled?: boolean;
		_updatedAt?: string;
		_createdAt?: string;
		[key: string]: unknown;
	};

	let { modal }: { modal: ModalContent | null | undefined } = $props();

	let isOpen = $state(false);
	let hasBeenDismissed = $state(false);

	onMount(() => {
		if (
			modal &&
			(modal.content || modal.imageUrl || modal.contentBlocks) &&
			modal.enabled !== false
		) {
			// Check if this modal has been dismissed before (stored in sessionStorage)
			const dismissedKey = `modal-dismissed-${modal._id}`;
			const dismissed =
				typeof window !== 'undefined' && window.sessionStorage.getItem(dismissedKey);
			hasBeenDismissed = !!dismissed;

			// Show modal if it hasn't been dismissed
			if (!hasBeenDismissed) {
				// Small delay to ensure page is loaded
				setTimeout(() => {
					isOpen = true;
					// Prevent body scroll when modal is open
					if (typeof document !== 'undefined') {
						document.body.style.overflow = 'hidden';
					}
				}, 300);
			}
		}
	});

	function closeModal() {
		isOpen = false;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}

		// Store dismissal in sessionStorage
		if (modal && typeof window !== 'undefined') {
			const dismissedKey = `modal-dismissed-${modal._id}`;
			window.sessionStorage.setItem(dismissedKey, 'true');
			hasBeenDismissed = true;
		}
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && isOpen) {
			closeModal();
		}
	}
</script>

{#if modal && (modal.content || modal.imageUrl || modal.contentBlocks) && modal.enabled !== false && !hasBeenDismissed}
	<div
		class="modalBackdrop"
		class:open={isOpen}
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		aria-labelledby={modal.title ? 'modal-title' : undefined}
		tabindex="-1"
	>
		<div class="modalContent" class:open={isOpen}>
			<button class="modalClose" onclick={closeModal} aria-label="Close modal">×</button>
			{#if modal.title}
				<h2 id="modal-title" class="modalTitle">{modal.title}</h2>
			{/if}
			{#if modal.imageUrl}
				<div class="modalImage">
					<img src={modal.imageUrl} alt={modal.title || 'Modal image'} />
				</div>
			{/if}
			{#if modal.content && Array.isArray(modal.content)}
				<div class="modalText">
					<PortableText content={modal.content} />
				</div>
			{/if}
			{#if modal.contentBlocks && modal.contentBlocks.length > 0}
				<div class="modalContentBlocks">
					{#each modal.contentBlocks as block, index (block._key || block._id || `block-${index}`)}
						<div class="contentBlock" class:hasImage={!!block.imageUrl}>
							{#if block.imageUrl}
								<div class="blockImage">
									<img src={block.imageUrl} alt={block._key || `Content block ${index + 1}`} />
								</div>
							{/if}
							{#if block.content && Array.isArray(block.content) && block.content.length > 0}
								<div class="blockText">
									<PortableText content={block.content} />
								</div>
							{/if}
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.modalBackdrop {
		position: fixed;
		inset: 0;
		background: color-mix(in oklch, var(--backgroundColor) 85%, transparent 15%);
		backdrop-filter: blur(4px);
		z-index: 1000;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.3s ease;
		display: grid;
		place-items: center;
		padding: clamp(1rem, 4vw, 2rem);
	}

	.modalBackdrop.open {
		opacity: 1;
		pointer-events: auto;
	}

	.modalContent {
		position: relative;
		width: calc(100% - 2rem);
		max-width: 1100px;
		background: color-mix(in oklch, var(--backgroundColor) 96%, black 4%);
		border-radius: 20px;
		padding: clamp(2rem, 4vw, 3rem);
		max-height: 85vh;
		overflow-y: auto;
		transform: translateY(20px) scale(0.95);
		opacity: 0;
		transition:
			transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
			opacity 0.3s ease;
		box-shadow: 0 26px 42px color-mix(in oklch, black 50%, transparent);
		border: 1px solid color-mix(in oklab, var(--primaryColor) 25%, transparent);
	}

	.modalContent.open {
		transform: translateY(0) scale(1);
		opacity: 1;
	}

	.modalClose {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: transparent;
		border: none;
		font-size: 2rem;
		line-height: 1;
		cursor: pointer;
		color: color-mix(in oklab, var(--contrastColor) 80%, transparent);
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition:
			background 0.2s ease,
			color 0.2s ease,
			transform 0.2s ease;
		font-weight: 300;
	}

	.modalClose:hover {
		background: color-mix(in oklch, var(--backgroundColor) 80%, black 20%);
		color: var(--contrastColor);
		transform: scale(1.1);
	}

	.modalTitle {
		margin: 0 0 1.5rem 0;
		font-size: clamp(1.5rem, 3vw, 2rem);
		text-transform: none;
		letter-spacing: 0.02em;
		color: var(--contrastColor);
		padding-right: 2rem;
	}

	.modalText {
		color: color-mix(in oklab, var(--contrastColor) 90%, transparent);
		font-size: clamp(1rem, 1.2vw, 1.1rem);
		line-height: 1.7;
	}

	.modalText :global(p) {
		margin: 1rem 0;
	}

	.modalText :global(p:first-child) {
		margin-top: 0;
	}

	.modalText :global(p:last-child) {
		margin-bottom: 0;
	}

	.modalText :global(a) {
		color: var(--accentColor);
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}

	.modalText :global(strong) {
		font-weight: 700;
		color: var(--contrastColor);
	}

	.modalText :global(ul),
	.modalText :global(ol) {
		margin: 1rem 0;
		padding-left: 2rem;
	}

	.modalText :global(li) {
		margin: 0.5rem 0;
	}

	.modalImage {
		margin: 0 0 1.5rem 0;
		border-radius: 12px;
		overflow: hidden;
	}

	.modalImage img {
		width: 100%;
		height: auto;
		display: block;
	}

	.modalContentBlocks {
		display: grid;
		gap: 2rem;
		margin-top: 1.5rem;
	}

	.contentBlock {
		display: grid;
		gap: 1.5rem;
	}

	.contentBlock.hasImage {
		grid-template-columns: 1fr;
	}

	.blockImage {
		border-radius: 12px;
		overflow: hidden;
	}

	.blockImage img {
		width: 100%;
		height: auto;
		display: block;
	}

	.blockText {
		color: color-mix(in oklab, var(--contrastColor) 90%, transparent);
		font-size: clamp(1rem, 1.2vw, 1.1rem);
		line-height: 1.7;
	}

	.blockText :global(p) {
		margin: 1rem 0;
	}

	.blockText :global(p:first-child) {
		margin-top: 0;
	}

	.blockText :global(p:last-child) {
		margin-bottom: 0;
	}

	.blockText :global(a) {
		color: var(--accentColor);
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}

	.blockText :global(strong) {
		font-weight: 700;
		color: var(--contrastColor);
	}

	.blockText :global(ul),
	.blockText :global(ol) {
		margin: 1rem 0;
		padding-left: 2rem;
	}

	.blockText :global(li) {
		margin: 0.5rem 0;
	}
</style>
