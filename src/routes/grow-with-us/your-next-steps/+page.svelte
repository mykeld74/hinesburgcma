<script lang="ts">
	const pathways = [
		{
			title: 'Attend Next Steps Gathering',
			description:
				'Share your story, meet leaders, and discover how to grow deeper at CAC.'
		},
		{
			title: 'Join a Group',
			description:
				'Find community through a small group where you can be known, encouraged, and challenged.'
		},
		{
			title: 'Serve on a Team',
			description:
				'Use your gifts to make a difference on Sundays and throughout the week.'
		},
		{
			title: 'Practice Generosity',
			description:
				'Fuel the mission of the church through faithful, regular giving and Spirit-led generosity.'
		}
	];

	const tools = [
		'Weekly email newsletter with events, stories, and next steps.',
		'Church Center app for groups, giving, event registrations, and check-in.',
		'Pastoral team available for prayer, questions, and spiritual guidance.',
		'Serving teams that help you discover purpose and community.'
	];
</script>

<svelte:head>
	<title>Your Next Steps - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="You belong here. These pathways will help you build relationships, grow in faith, and live on mission with our church family. Attend Next Steps, join a group, or serve on a team."
	/>
</svelte:head>

<section class="pageHero">
	<h1>Your Next Steps</h1>
	<p>
		You belong here. These pathways will help you build relationships, grow in faith, and live on
		mission with our church family.
	</p>
	<div class="pageHeroActions">
		<a href="/visit-us/plan-your-visit/">Plan a Visit</a>
		<a href="mailto:info@hinesburgcma.org">Talk with a Pastor</a>
	</div>
</section>

<section class="pageSection">
	<h2>Take a Step Forward</h2>
	<div class="cardGridSimple">
		{#each pathways as pathway}
			<article>
				<h3>{pathway.title}</h3>
				<p>{pathway.description}</p>
			</article>
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2>Helpful Tools</h2>
	<ul>
		{#each tools as tool}
			<li>{tool}</li>
		{/each}
	</ul>
</section>

<section class="pageSection">
	<h2>We Are Here to Help</h2>
	<p>
		Reach out and let us know where you would like support. Our team would love to guide you.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Email Our Team</a>
		<a href="/grow-with-us/serve/">Serve with Us</a>
	</div>
</section>

