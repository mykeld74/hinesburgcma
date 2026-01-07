<script lang="ts">
	type Leader = {
		name: string;
		role: string | string[];
		description: string | string[];
		email?: string;
		image?: string;
	};

	type LeaderCardProps = {
		leader: Leader;
		openModal: (leader: Leader) => void;
	};

	const { leader, openModal }: LeaderCardProps = $props();
	import Image from '$lib/components/Image.svelte';
</script>

<div
	class="leaderCard"
	role="button"
	tabindex="0"
	aria-label={`${leader.name} - ${leader.role}. Click to view details.`}
	onclick={() => openModal(leader)}
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openModal(leader);
		}
	}}
>
	{#if leader.image}
		<div class="leaderCardImage">
			<Image source={leader.image} altTag={leader.name} class="leaderImage" />
		</div>
	{/if}
	<h3 class="leaderCardTitle">{leader.name}</h3>
	{#if Array.isArray(leader.role)}
		{#each leader.role as role}
			<strong class="leaderCardRole">{role}</strong>
		{/each}
	{:else}
		<strong class="leaderCardRole">{leader.role}</strong>
	{/if}
</div>

<style>
	.leaderCard {
		display: grid;
		grid-template-rows: auto 1fr;
		gap: 0.6rem;
		padding: clamp(1.1rem, 2vw, 1.5rem);
		border-radius: 20px;
		box-shadow: 0 26px 42px color-mix(in oklch, black 50%, transparent);
		position: relative;
		align-items: self-start;
		cursor: pointer;
	}

	.leaderCard::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: linear-gradient(145deg, var(--accentColor), var(--primaryColor));
		pointer-events: none;
		z-index: 0;
	}

	.leaderCard::after {
		content: '';
		position: absolute;
		inset: 5px;
		border-radius: calc(20px - 5px);
		background: color-mix(in oklch, var(--backgroundColor) 90%, black 10%);
		pointer-events: none;
		z-index: 1;
	}

	.leaderCard:hover {
		transform: translateY(-2px);
		transition: transform 0.2s ease;
	}

	.leaderCard h3,
	.leaderCard strong,
	.leaderCardImage {
		position: relative;
		z-index: 2;
	}
	.leaderCardTitle {
		font-size: clamp(0.95rem, 0.5vw + 1.5rem, 1.75rem);
		text-transform: none;
		letter-spacing: 0;
		font-weight: 700;
		margin: 0;
		color: var(--contrastColor);
		position: relative;
		text-decoration: underline;
		z-index: 2;
	}
	.leaderCardImage {
		width: calc(100% - 8rem);
		max-width: 200px;
		aspect-ratio: 1/1;
		margin: 0 auto 10px;
		overflow: hidden;
		border-radius: 10px;
	}
	.leaderCardRole {
		color: var(--accentColor);
	}
</style>
