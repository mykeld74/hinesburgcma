<script lang="ts">
	const teams = [
		{
			title: 'Hospitality',
			description:
				'Create a warm welcome in the lobby, at the Welcome Desk, and through Sunday refreshments.'
		},
		{
			title: 'Kids & Students',
			description:
				'Invest in the next generation through teaching, small groups, and support roles.'
		},
		{
			title: 'Worship & Production',
			description:
				'Lead our church in worship through music, audio, video, lighting, and creative arts.'
		},
		{
			title: 'Prayer & Care',
			description:
				'Encourage others through prayer, visitation, counseling support, and meal deliveries.'
		},
		{
			title: 'Facilities & Operations',
			description:
				'Serve behind the scenes with weekday projects, campus upkeep, and administrative needs.'
		}
	];

	const process = [
		'Attend the Serve Tour or connect with a ministry leader.',
		'Complete a brief volunteer application and background check when required.',
		'Shadow the team to learn rhythms and expectations.',
		'Step into your role with ongoing coaching and community.'
	];
</script>

<svelte:head>
	<title>Serve - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="Serving is one of the best ways to grow in discipleship, build relationships, and help others meet Jesus at CAC. Find your team and start serving today."
	/>
</svelte:head>

<section class="pageHero">
	<h1>Serve</h1>
	<p>
		Serving is one of the best ways to grow in discipleship, build relationships, and help others meet
		Jesus at CAC.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Start Serving</a>
		<a href="/resources/calendar/">Serve Tour Dates</a>
	</div>
</section>

<section class="pageSection">
	<h2>Find Your Team</h2>
	<div class="cardGridSimple">
		{#each teams as team}
			<article>
				<h3>{team.title}</h3>
				<p>{team.description}</p>
			</article>
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2>How Serving Works</h2>
	<ul>
		{#each process as step}
			<li>{step}</li>
		{/each}
	</ul>
</section>

<section class="pageSection">
	<h2>Ready to Jump In?</h2>
	<p>
		Share your interests and availability. Our team will help you find the right spot and equip you
		with everything you need.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Connect with Serving Team</a>
		<a href="/visit-us/your-next-steps/">Attend Next Steps</a>
	</div>
</section>

