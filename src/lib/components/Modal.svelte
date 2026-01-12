<script lang="ts">
	import Image from '$lib/components/Image.svelte';

	type Leader = {
		name: string;
		role: string | string[];
		description: string | string[];
		email?: string;
		image?: string;
	};

	type ModalProps = {
		leader: Leader | null;
		isOpen: boolean;
		onClose: () => void;
	};

	const { leader, isOpen, onClose }: ModalProps = $props();

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			onClose();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && isOpen) {
			onClose();
		}
	}
</script>

{#if leader}
	<div
		class="modalBackdrop"
		class:open={isOpen}
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
		tabindex="-1"
	>
		<div class="modalContent" class:open={isOpen}>
			<button class="modalClose" onclick={onClose} aria-label="Close modal">×</button>
			{#if leader.image}
				<div class="leaderModalHeader">
					<h2 id="modal-title" class="modalTitle">{leader.name}</h2>
					<div class="modalCardImage">
						<Image
							source={leader.image}
							altTag={leader.name}
							class="modalLeaderImage"
						/>
					</div>
				</div>
			{:else}
				<h2 id="modal-title" class="modalTitle">{leader.name}</h2>
			{/if}
			{#if Array.isArray(leader.role)}
				{#each leader.role as role (role)}
					<strong class="modalRole">{role}</strong>
				{/each}
			{:else}
				<strong class="modalRole">{leader.role}</strong>
			{/if}

			<div class="modalDescription">
				{#if Array.isArray(leader.description) && leader.description.length > 0}
					{#each leader.description as paragraph (paragraph)}
						<p>{paragraph}</p>
					{/each}
				{:else if !Array.isArray(leader.description)}
					<p>{leader.description}</p>
				{/if}
			</div>
			{#if leader.email}
				<a href="mailto:{leader.email}" class="modalEmail">Email {leader.name}</a>
			{/if}
		</div>
	</div>
{/if}

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
		width: calc(100% - 4rem);
		max-width: 900px;
		background: color-mix(in oklch, var(--backgroundColor) 96%, black 4%);
		border-radius: 20px;
		padding: clamp(2rem, 4vw, 3rem);
		max-height: 85vh;
		overflow-y: auto;
		transform: translateY(100vh);
		transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 -26px 42px color-mix(in oklch, black 50%, transparent);
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
	}

	.modalClose:hover {
		background: color-mix(in oklch, var(--backgroundColor) 80%, black 20%);
	}

	.modalTitle {
		margin: 0 0 0.5rem 0;
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		text-transform: none;
		letter-spacing: 0.02em;
	}

	.modalRole {
		display: block;
		margin-bottom: 1.5rem;
		font-size: clamp(1rem, 2vw, 1.25rem);
		color: var(--accentColor);
	}

	.modalDescription {
		margin-bottom: 2rem;
		line-height: 1.75;
	}

	.modalDescription p {
		margin: 0 0 1rem 0;
	}

	.modalDescription p:last-child {
		margin-bottom: 0;
	}

	.modalEmail {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		background: var(--accentColor);
		color: var(--backgroundColor);
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		transition:
			background 0.2s ease,
			transform 0.2s ease;
	}

	.modalEmail:hover {
		background: color-mix(in oklch, var(--accentColor) 90%, black 10%);
		transform: translateY(-2px);
	}

	.leaderModalHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.modalCardImage {
		max-width: 200px;
		aspect-ratio: 1/1;
		width: 100%;
	}
</style>
