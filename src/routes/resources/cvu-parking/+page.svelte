<script lang="ts">
	const statusMessage = {
		current: 'At this time, parking is FULL for the 2024-2025 school year.',
		nextYear: {
			date: 'May 19th at 4pm',
			link: 'CVU Parking 2025-2026 - Community Alliance Church'
		}
	};
</script>

<svelte:head>
	<title>CVU Parking - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="CVU student parking at Community Alliance Church. Reserve a parking spot in our front lot for the school year. 35 spots available for CVU juniors. $50 fee supports the Hinesburg Food Shelf. Registration opens in spring."
	/>
</svelte:head>

<section class="pageHero">
	<div class="pageHeroContent">
		<h1 class="pageHeroChild pageHeroTitle">CVU Parking</h1>
		<p class="pageHeroChild pageHeroText">
			CAC is grateful to support Champlain Valley Union High School by offering parking spaces in
			our front parking lot, for juniors (11th grade) attending CVU. When we can, we also love to
			come out with our coffee cart to bless our students with coffee during cold months, and with
			cold refreshments near the end of the year!
		</p>
	</div>
</section>

<section class="pageSection alertSection">
	<div class="pageSectionText">
		<p><strong>{statusMessage.current}</strong></p>
		<p>
			<strong
				>Parking will open for the 2025-2026 school year on {statusMessage.nextYear.date}:</strong
			>
			<a
				href="https://communityalliancechurch.churchcenter.com/registrations/events/2897978"
				target="_blank"
				rel="noopener noreferrer">{statusMessage.nextYear.link}</a
			>
		</p>
	</div>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Parking Pass Information</h2>
	<div class="pageSectionText">
		<p>
			Passes are available for 35 parking spots and typically are reserved during the spring
			<em>preceding</em> the school year for which the pass will be valid. Passes are issued on a first-come,
			first-served basis, and are good for the duration of the school year. Physical passes are distributed
			to students at the start of the fall school semester, so there's no chance of losing them over
			the summer. The fee for reserving a spot is $50. This fee is used to support the work of the Hinesburg
			Community Resource Center's Food Shelf.
		</p>
	</div>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Shared Parking Lot</h2>
	<div class="pageSectionText">
		<p>
			Our parking lot is shared with church staff, the Community Garden members and First Roots
			Hinesburg. In addition, the children attending Wild Roots, the childcare center next to CAC,
			frequently are seen heading out for adventures through our parking lot. Please remember to use
			caution when parking here.
		</p>
	</div>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Contact</h2>
	<p class="pageSectionText">
		If you are interested in learning more about parking at CAC, please contact Connor Durochia.
	</p>
	<div class="pageHeroActions">
		<a
			href="https://communityalliancechurch.churchcenter.com/registrations/events/2897978"
			target="_blank"
			rel="noopener noreferrer">Register Here</a
		>
	</div>
</section>

<style>
	.alertSection {
		background: color-mix(in oklch, var(--primaryColor) 10%, transparent);
		border: 1px solid color-mix(in oklch, var(--primaryColor) 40%, transparent);
		border-radius: 18px;
		padding: 1rem;
		margin-bottom: 1rem;
	}
</style>
