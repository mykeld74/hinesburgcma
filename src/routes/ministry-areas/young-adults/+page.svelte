<script lang="ts">
	const rhythms = [
		{
			title: 'Community Nights',
			description:
				'Bi-weekly gatherings for 18–30 year olds featuring worship, teaching, and meaningful conversation.'
		},
		{
			title: 'House Groups',
			description:
				'Smaller groups that meet in homes across the area to build deeper relationships and discuss Scripture.'
		},
		{
			title: 'Serving Together',
			description:
				'Young adults lead across our church—from worship and tech to kids, students, and missions.'
		}
	];

	const distinctives = [
		'Authentic community and honest dialogue about life and faith.',
		'Mentoring relationships with pastors and seasoned leaders.',
		'Local outreach and mission partnerships that make a difference.',
		'Retreats and conferences that fuel growth and calling.'
	];
</script>

<svelte:head>
	<title>Young Adults - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="College students and young professionals gather to pursue Jesus, develop friendships, and step into their God-given purpose. Community nights, house groups, and serving opportunities."
	/>
</svelte:head>

<section class="pageHero">
	<h1>Young Adults</h1>
	<p>
		College students and young professionals gather to pursue Jesus, develop friendships, and step
		into their God-given purpose.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Join the Group</a>
		<a href="/resources/calendar/">Upcoming Gatherings</a>
	</div>
</section>

<section class="pageSection">
	<h2>Rhythms We Practice</h2>
	<div class="cardGridSimple">
		{#each rhythms as rhythm}
			<article>
				<h3>{rhythm.title}</h3>
				<p>{rhythm.description}</p>
			</article>
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2>What Makes This Community Unique</h2>
	<ul>
		{#each distinctives as item}
			<li>{item}</li>
		{/each}
	</ul>
</section>

<section class="pageSection">
	<h2>Connect Today</h2>
	<p>
		We would love to help you find your place. Reach out and we will follow up with details about
		upcoming gatherings and serving opportunities.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Email the Team</a>
		<a href="/grow-with-us/groups/">Find a Group</a>
	</div>
</section>

