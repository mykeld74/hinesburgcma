<script lang="ts">
	const environments = [
		{
			title: 'Nursery',
			description:
				'Caring volunteers provide a safe, nurturing space for infants and toddlers during services.'
		},
		{
			title: 'Preschool',
			description:
				'Interactive Bible stories, songs, and crafts help preschoolers discover God’s love.'
		},
		{
			title: 'Elementary',
			description:
				'Large group worship and small group discussion help kids apply Scripture to everyday life.'
		}
	];

	const values = [
		'All volunteers are background checked and trained in our safety policies.',
		'Secure check-in and pick-up processes keep every child protected.',
		'Parents receive take-home resources to continue discipleship during the week.',
		'Kids participate in age-appropriate service projects throughout the year.'
	];
</script>

<section class="pageHero">
	<h1>Kids Ministry</h1>
  
	<p>
		We partner with families to help kids meet, know, and follow Jesus through joyful gatherings and
		discipleship all week long.
	</p>
	<div class="pageHeroActions">
		<a href="/visit-us/plan-your-visit/">Check In on Sunday</a>
		<a href="mailto:info@hinesburgcma.org">Contact Kids Team</a>
	</div>
</section>

<section class="pageSection">
	<h2>Weekend Environments</h2>
	<div class="cardGridSimple">
		{#each environments as environment}
			<article>
				<h3>{environment.title}</h3>
				<p>{environment.description}</p>
			</article>
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2>Partnering with Parents</h2>
	<ul>
		{#each values as item}
			<li>{item}</li>
		{/each}
	</ul>
</section>

<section class="pageSection">
	<h2>Upcoming Kids Events</h2>
	<p>
		Stay tuned for family experiences, seasonal events, and parent workshops on our church calendar.
	</p>
	<div class="pageHeroActions">
		<a href="/resources/calendar/">View Calendar</a>
		<a href="/resources/giving/">Support Kids Ministry</a>
	</div>
</section>

