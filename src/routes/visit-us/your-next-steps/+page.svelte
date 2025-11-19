<script lang="ts">
	const environments = [
		{
			title: 'Next Steps Gathering',
			description:
				'Meet our pastors, hear the CAC story, and discover pathways to connect. Offered monthly with childcare.'
		},
		{
			title: 'Serve Tour',
			description:
				'Shadow a ministry team, learn what serving looks like, and discover where your gifts fit best.'
		},
		{
			title: 'Group Launch',
			description:
				'Join others beginning small groups. We help you find a community that fits your schedule and season.'
		}
	];

	const rhythms = [
		'Worship with us on Sundays to stay rooted in the story of Jesus.',
		'Engage in a small group for friendship, discipleship, and prayer.',
		'Serve on a team that helps people encounter Jesus each week.',
		'Practice generosity through faithful giving and missional living.',
		'Invite others to experience the hope of Christ with you.'
	];
</script>

<svelte:head>
	<title>Your Next Steps - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="Whether you have visited once or call CAC home, we have designed clear pathways to help you grow in faith, relationships, and mission. Discover your next step."
	/>
</svelte:head>

<section class="pageHero">
	<h1>Your Next Steps</h1>
	<p>
		Whether you have visited once or call CAC home, we have designed clear pathways to help you grow
		in faith, relationships, and mission.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Connect with a Pastor</a>
		<a href="/grow-with-us/serve/">Explore Serving</a>
	</div>
</section>

<section class="pageSection">
  
	<h2>Start Here</h2>
	<p>
		We regularly host environments that introduce you to our heartbeat and help you find purposeful
		community.
	</p>
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
	<h2>Living the CAC Rhythms</h2>
	<ul>
		{#each rhythms as rhythm}
			<li>{rhythm}</li>
		{/each}
	</ul>
</section>

<section class="pageSection">
	<h2>We Are With You</h2>
	<p>
		Our team wants to personally guide you into these rhythms. If you are uncertain about your next
		step, start a conversation and we will help you discern the best fit.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Email Our Team</a>
		<a href="tel:+18024822132">Call (802) 482-2132</a>
	</div>
</section>

