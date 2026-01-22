<script lang="ts">
	import ContactFormModal from '$lib/components/ContactFormModal.svelte';

	const teams = [
		{
			title: 'Prayer Team',
			description: 'Faithful intercessors pray weekly for the needs of our church and community.'
		},
		{
			title: 'Care Network',
			description:
				'Volunteers deliver meals, provide transportation, and support families in crisis.'
		},
		{
			title: 'Counseling Referrals',
			description:
				'We partner with trusted Christian counselors and offer guidance in finding additional support.'
		},
		{
			title: 'Benevolence',
			description:
				'Financial and practical assistance is available for individuals navigating hardship.'
		}
	];

	const steps = [
		'Submit a prayer request online or on Sunday.',
		'Reach out if you need care support or would like to serve.',
		'Meet with a pastor for guidance, encouragement, and prayer.'
	];

	const checkboxes = [
		{
			id: 'prayer-request',
			label: 'Prayer Request'
		},
		{
			id: 'care',
			label: 'Care Support'
		},
		{
			id: 'meet-with-pastor',
			label: 'Meeting with a Pastor'
		}
	];

	let openModalIndex = $state<number | null>(null);
	let isModalOpen = $state(false);

	function openModal(index: number) {
		openModalIndex = index;
		isModalOpen = true;
	}

	function closeModal() {
		openModalIndex = null;
		isModalOpen = false;
	}
</script>

<svelte:head>
	<title>Prayer & Care - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="Prayer & Care at Community Alliance Church. Submit prayer requests, access our care network for meals and transportation, get counseling referrals, or receive benevolence support. You are not alone."
	/>
</svelte:head>

<section class="pageHero">
	<div class="pageHeroContent">
		<h1 class="pageHeroChild pageHeroTitle">Prayer & Care</h1>
		<p class="pageHeroChild pageHeroText">
			You are not alone. Our pastors, prayer team, and care network walk beside you with compassion,
			prayer, and practical help.
		</p>
	</div>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">How We Support You</h2>
	<div class="cardGridSimple">
		{#each teams as team}
			<article>
				<h3 class="cardGridSimpleChild cardGridSimpleTitle">{team.title}</h3>
				<p class="cardGridSimpleChild">{team.description}</p>
			</article>
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Take a Step</h2>
	<ul class="pageSectionList">
		{#each steps as step, index}
			<li class="pageSectionListItem">
				<button class="pageSectionListItemButton" onclick={() => openModal(index)}>
					{step}
				</button>
			</li>
		{/each}
	</ul>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Need Immediate Assistance?</h2>
	<p class="pageSectionText">
		If you are facing an urgent crisis, please dial 911. For non-emergency pastoral care, contact
		the office and we will connect you with a pastor quickly.
	</p>
</section>

<ContactFormModal
	bind:isOpen={isModalOpen}
	onClose={closeModal}
	sendTo="info@hinesburgcma.org"
	{checkboxes}
/>

<style>
	.pageSectionListItemButton {
		width: 100%;
		text-align: left;
		background: transparent;
		border: none;
		padding: 0;
		margin: 0;
		font: inherit;
		color: inherit;
		cursor: pointer;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		font-weight: 600;
		transition: opacity 0.2s ease;

		&:hover {
			opacity: 0.8;
		}

		&:focus-visible {
			outline: 2px solid var(--accentColor);
			outline-offset: 2px;
			border-radius: 4px;
		}
	}
</style>
