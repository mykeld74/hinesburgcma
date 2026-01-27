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
			Community Alliance Church (CAC) is grateful to support Champlain Valley Union High School by
			setting aside a limited number of parking spaces on our campus for CVU students. You may even
			see us handing out hot cocoa and treats to the students on Friday mornings!
		</p>
	</div>
</section>

<section class="pageSection alertSection">
	<div class="pageSectionText">
		<p>
			<strong>At this time, parking passes are SOLD OUT for the 2025-2026 school year. </strong>
		</p>
		<p>
			Registration for the 2026-2027 school year will open after results from the CVU Junior Parking
			Lottery have been announced in mid-May 2026. Students who will be juniors in 2026-2027 and
			were unable to secure a spot in J Lot will be given preference at the church lot. Check back
			here in May for a live registration link!
		</p>
	</div>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Parking Pass Information</h2>
	<div class="pageSectionText">
		<p>
			Parking passes are available for up to 30 spaces each school year in the CAC parking lot. The
			fee for reserving a spot is $50. This fee is used to support the work of the Hinesburg
			Community Resource Center's Food Shelf. Parking passes typically are reserved in the spring
			preceding the school year for which the pass will be valid. Preference is given to students
			who will be juniors at CVU during the year the pass will be valid. Arrangements are made with
			student passholders to pick up the physical pass from the church, usually the week before
			school begins in the fall.
		</p>
		<p>
			A waiting list is maintained for the current school year, should a pass/space become
			available. You may email us any time during the current school year to have your name placed
			on the list. Please be advised that the waiting list is typically 15-25 students long and CVU
			juniors will be given priority. We do not reserve parking spaces for years beyond the current
			school year.
		</p>
		<p>
			CAC parking passes are NON-TRANSFERRABLE. CAC passholders may not give or loan passes out to
			other students or family members at any time, regardless of current need or prior payment
			made. Any transfer of a CAC parking pass without direct consent of CAC will render the pass
			inactive for that school year and the student(s) with the pass will no longer be authorized to
			park at CAC.
		</p>
		<p>
			If you no longer need your CAC parking pass, please contact Amanda Wheeler for instructions on
			how to return it. Your returned pass will be assigned to the next student on our waiting list
			and we will issue you a prorated refund on your payment.
		</p>
		<p>
			Students are only eligible for a parking pass at CAC if they do not hold an active CVU parking
			pass. Please be aware that we do monitor our parking lot for compliance weekly. We also
			collaborate with CVU on parking matters, which includes sharing of passholder information
			(name, car, plate number, pass numbers). This increases our ability to maintain a safe,
			equitable parking situation for students on both campuses.
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
		If you are interested in learning more about parking at CAC, please email <a
			href="mailto:awheeler@hinesburgcma.org">Amanda Wheeler</a
		>.
	</p>
	<!-- <div class="pageHeroActions">
		<a
			href="https://communityalliancechurch.churchcenter.com/registrations/events/2897978"
			target="_blank"
			rel="noopener noreferrer">Register Here</a
		>
	</div> -->
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
