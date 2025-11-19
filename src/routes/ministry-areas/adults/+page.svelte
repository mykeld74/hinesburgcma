<script lang="ts">
	const environments = [
		{
			title: 'Men & Women',
			description:
				'Gatherings and studies that address specific needs, fostering discipleship and community.'
		},
		{
			title: 'Mixed Groups',
			description:
				'Semester-based small groups that meet in homes or on campus for discussion, prayer, and care.'
		},
		{
			title: 'Classes & Workshops',
			description:
				'Short-term environments focused on spiritual practices, theology, parenting, and more.'
		},
		{
			title: 'Care Communities',
			description:
				'Supportive groups walking alongside each other through grief, recovery, and life transitions.'
		}
	];

	const commitments = [
		'Every adult has a place to belong, grow, and contribute.',
		'We equip leaders to shepherd healthy group environments.',
		'Groups multiply to create space for new people regularly.',
		'Serving and mission are integrated into every ministry rhythm.'
	];
</script>

<svelte:head>
	<title>Adults Ministry - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="Adults of every age find spaces to connect deeply, pursue Jesus, and live out their calling in our church and community. Small groups, classes, and care communities."
	/>
</svelte:head>

<section class="pageHero">
	<h1>Adults</h1>
	<p>
		Adults of every age find spaces to connect deeply, pursue Jesus, and live out their calling in our
		church and community.
	</p>
	<div class="pageHeroActions">
		<a href="/grow-with-us/groups/">Find a Group</a>
		<a href="/grow-with-us/serve/">Join a Team</a>
	</div>
</section>

<section class="pageSection">
	<h2>Ways to Engage</h2>
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
	<h2>Our Commitment</h2>
	<ul>
		{#each commitments as item}
			<li>{item}</li>
		{/each}
	</ul>
</section>

<section class="pageSection">
	<h2>Let Us Help You Start</h2>
	<p>
		If you are unsure where to begin, connect with our team. We will help you find the right group or
		serving opportunity for your season.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Contact Discipleship Team</a>
		<a href="/visit-us/your-next-steps/">Attend Next Steps</a>
	</div>
</section>

