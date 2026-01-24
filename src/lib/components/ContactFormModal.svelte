<script lang="ts">
	import ContactForm from '$lib/components/ContactForm.svelte';

	interface CheckboxOption {
		id: string;
		label: string;
	}

	interface Props {
		endpoint?: string;
		sendTo?: string | string[];
		isOpen?: boolean;
		onClose?: () => void;
		checkboxes?: CheckboxOption[];
	}

	let { endpoint, sendTo, isOpen = $bindable(false), onClose, checkboxes }: Props = $props();

	let autoCloseTimeout: ReturnType<typeof setTimeout> | null = null;
	let resetKey = $state(0);
	let wasOpen = $state(false);

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

	function closeModal() {
		if (autoCloseTimeout) {
			clearTimeout(autoCloseTimeout);
			autoCloseTimeout = null;
		}
		isOpen = false;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
		if (onClose) {
			onClose();
		}
	}

	function handleFormSuccess() {
		if (autoCloseTimeout) {
			clearTimeout(autoCloseTimeout);
		}
		autoCloseTimeout = setTimeout(() => {
			if (isOpen) {
				closeModal();
			}
		}, 3500);
	}

	$effect(() => {
		if (isOpen && typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
			wasOpen = true;
		} else if (!isOpen && typeof document !== 'undefined') {
			document.body.style.overflow = '';
			if (autoCloseTimeout) {
				clearTimeout(autoCloseTimeout);
				autoCloseTimeout = null;
			}
			// Reset form after modal close animation completes (0.5s transition)
			if (wasOpen) {
				setTimeout(() => {
					resetKey++;
					wasOpen = false;
				}, 500);
			}
		}
	});
</script>

<div
	class="modalBackdrop"
	class:open={isOpen}
	onclick={handleBackdropClick}
	onkeydown={handleKeydown}
	role="dialog"
	aria-modal="true"
	aria-labelledby="contact-modal-title"
	tabindex="-1"
>
	<div class="modalContent" class:open={isOpen}>
		<button class="modalClose" onclick={closeModal} aria-label="Close modal">×</button>
		<h2 id="contact-modal-title" class="modalTitle">Contact Us</h2>
		<ContactForm {endpoint} {sendTo} {checkboxes} {resetKey} onSuccess={handleFormSuccess} />
	</div>
</div>

<style>
	.modalBackdrop {
		position: fixed;
		inset: 0;
		background: color-mix(in oklch, var(--backgroundColor) 85%, black 15%);
		z-index: 1000;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.5s ease;
		display: grid;
		place-items: center;
	}

	.modalBackdrop.open {
		opacity: 1;
		pointer-events: auto;
	}

	.modalContent {
		width: calc(100% - 2rem);
		max-width: 600px;
		background: color-mix(in oklch, var(--backgroundColor) 96%, black 4%);
		border-radius: 20px;
		padding: clamp(2rem, 4vw, 3rem);
		max-height: 85vh;
		overflow-y: auto;
		transform: translateY(100vh);
		transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 -26px 42px color-mix(in oklch, black 50%, transparent);
		position: relative;
		@media (max-width: 600px) {
			width: calc(100% - 1rem);
			padding: 1rem;
		}
	}

	.modalContent.open {
		transform: translateY(0);
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
		color: var(--contrastColor);
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: background 0.2s ease;
		z-index: 1;
	}

	.modalClose:hover {
		background: color-mix(in oklch, var(--backgroundColor) 80%, black 20%);
	}

	.modalTitle {
		margin: 0 0 1.5rem 0;
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		text-transform: none;
		letter-spacing: 0.02em;
		color: var(--contrastColor);
		padding-right: 2rem;
	}
</style>
