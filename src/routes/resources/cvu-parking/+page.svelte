<script lang="ts">
	import Image from '$lib/components/Image.svelte';
</script>

<svelte:head>
	<title>CVU Parking - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="CVU student parking at Community Alliance Church. 30 parking passes per school year after CVU's Junior Parking Lottery in May. $50 fee supports the Hinesburg Food Shelf."
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
			CAC Student Parking Pass registration will be live beginning at 12:00am on Tuesday, May 19,
			2026, and will close two days later, at 11:59pm on Thursday, May 21, 2026.
		</p>
		<p>
			<a
				href="https://communityalliancechurch.churchcenter.com/registrations/events/3625551"
				target="_blank"
				rel="noopener noreferrer"
				>This is the link for the 2026-2027 school year registration form</a
			>. You can view it now, but it will only be active during the times noted above.
		</p>
	</div>
</section>

<section class="pageSection">
	<Image source="CVU" altTag="CAC Student Parking Pass Process" width="1000" />
	<h2 class="pageSectionTitle">The CAC Student Parking Pass Process</h2>
	<div class="pageSectionText">
		<ol class="passProcessList">
			<li>There are 30 parking passes available each school year to students.</li>
			<li>
				Parking passes are reserved by students in the spring preceding the school year for which
				the passes will be valid. Our registration form is live for two days in May, immediately
				after the results from CVU's Junior Parking Lottery are released. During this time, any
				rising junior or sophomore interested in securing a CAC parking space may register. Once the
				registration is closed, CAC staff will review all entries and inform students via email,
				within one week, whether a pass is available to them in the fall.
			</li>
			<li>
				Preference for passes is as listed below, and in the order in which registrations are
				received:
				<ol class="prioritySublist" type="a">
					<li>
						First priority: students who will be juniors at CVU during the year the pass will be
						valid and have a driver's license at the time of registration.
					</li>
					<li>
						Second priority: students who will be juniors at CVU during the year the pass will be
						valid and anticipate having a driver's license by August 31 of that school year.
					</li>
					<li>
						Third priority: students who will be sophomores at CVU during the year the pass will be
						valid and have a driver's license at the time of registration OR anticipate having it by
						August 31 of that school year.
					</li>
				</ol>
			</li>
			<li>
				For students able to secure a pass at CAC, an email will be sent in mid-August with
				instructions about when and where students can pick up a parking pass sticker, provide
				payment, and review and sign the CAC Student Parking Contract.
			</li>
			<li>
				The cost of a parking pass at the church is $50 per year. This fee is used to support the
				work of the Hinesburg Community Resource Center's Food Shelf.
			</li>
			<li>
				Any student not able to secure a parking pass in the spring for the following school year
				will be placed on a waiting list, which will be maintained and drawn from over the school
				year, should a pass become available.
			</li>
		</ol>
	</div>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Additional Important Information</h2>
	<div class="pageSectionText">
		<p>
			We do not reserve parking passes or maintain a waiting list for years beyond the current
			school year. You may email us any time during the current school year to have your name placed
			on the list. Please be advised that the waiting list is typically 15-25 students long at any
			time, and juniors with a driver's license will continue to receive priority, regardless of
			when they are added to the list.
		</p>
		<p>
			CAC parking passes are NON-TRANSFERABLE. CAC student passholders may not give or loan out
			passes to other students or family members at any time, regardless of need or prior payment
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

	.passProcessList {
		display: grid;
		gap: 1rem;
		padding-left: 1.25rem;
		margin: 0;
	}

	.prioritySublist {
		margin: 0.75rem 0 0;
		padding-left: 1.25rem;
		display: grid;
		gap: 0.5rem;
		list-style-type: lower-alpha;
	}
</style>
