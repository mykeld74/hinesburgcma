<script lang="ts">
	import ContactFormModal from '$lib/components/ContactFormModal.svelte';

	let modalOpen = $state(false);
	const sendTo = ['streetmachine19@comcast.net', 'equusvmt@yahoo.com'];
</script>

<svelte:head>
	<title>Young Adults - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="Young Adults at Community Alliance Church. Making friends as a young adult can be hard—we get it! Join us for meals, Scripture study, barbecues, and events. Build real community with real people in the Bristol/Hinesburg area."
	/>
</svelte:head>

<section class="pageHero">
	<div class="pageHeroContent">
		<h1 class="pageHeroChild pageHeroTitle">Young Adults</h1>
		<p class="pageHeroChild pageHeroText">
			Making friends as a young adult can be hard (for real, we know!)
		</p>
	</div>
</section>

<section class="pageSection">
	<p class="pageSectionText">
		<em>Young Adults</em> can feel like a catch-all group because it can contain anyone out of high
		school, married or single, and ages upwards of 35. It's a tough time when most of the guard
		rails of life fall away and it's time to navigate life on your own. The young adults at CAC
		gather in order to encourage one another in whatever we're facing in life and to foster
		community around us. The group is composed of younger members of our church, who are typically
		in the Bristol, VT area. We usually meet at one of our homes to share a meal, read Scripture and
		pray for one another. We also gather for events such as barbecues and nights out, to which we
		can invite our friends and have fun together. Our desire is to be <em>real</em> people in a
		<em>real</em> world. You're invited to join a group of friends who will laugh, cry, play, grieve
		and "live life" with one another, in a true community.
	</p>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Connect Today</h2>
	<p class="pageSectionText">
		Feel free to reach out to Jeff and Kristin Hammond with any questions you may have or to find
		out how to get involved.
	</p>
	<button class="contactButton" onclick={() => (modalOpen = true)}>Contact Us</button>
</section>

<ContactFormModal bind:isOpen={modalOpen} {sendTo} />

<style>
	.contactButton {
		display: inline-flex;
		align-items: center;
		width: fit-content;
		justify-content: center;
		padding: 0.7rem 1.6rem;
		border-radius: 999px;
		font-weight: 700;
		color: #fff;
		background-color: color-mix(in oklch, var(--primaryColor) 65%, transparent);
		border: 1px solid color-mix(in oklch, var(--primaryColor) 80%, transparent);
		cursor: pointer;
		font-size: 1rem;
		margin-top: 1rem;
		transition:
			background-color 0.2s ease,
			transform 0.2s ease;

		&:hover {
			background-color: color-mix(in oklch, var(--primaryColor) 75%, transparent);
			transform: translateY(-2px);
		}
	}
</style>
