<script lang="ts">
	const filters = [
		'All-Church Gatherings',
		'Kids & Students',
		'Groups & Classes',
		'Serve & Outreach',
		'Prayer & Care'
	];
</script>

<section class="pageHero">
	<h1>Calendar</h1>
	<p>
		Stay up to date with everything happening at Hinesburg CMA. Filter by ministry, add events to
		your calendar, and share with friends.
	</p>
	<div class="pageHeroActions">
		<a href="https://hinesburgcma.churchcenter.com/calendar">Open Church Center</a>
		<a href="https://hinesburgcma.churchcenter.com/calendar/subscribe">Subscribe via ICS</a>
	</div>
</section>

<section class="pageSection">
	<h2>Event Categories</h2>
	<ul>
		{#each filters as filter}
			<li>{filter}</li>
		{/each}
	</ul>
</section>

<section class="pageSection">
	<h2>Need Help?</h2>
	<p>
		Our team can help you register for events, volunteer opportunities, and retreats.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Email the Office</a>
		<a href="tel:+18024822132">Call (802) 482-2132</a>
	</div>
</section>

