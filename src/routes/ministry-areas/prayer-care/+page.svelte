<script lang="ts">
	const teams = [
		{
			title: 'Prayer Team',
			description:
				'Faithful intercessors pray weekly for the needs of our church and community.'
		},
		{
			title: 'Care Network',
			description:
				'Volunteers deliver meals, provide transportation, and support families in crisis.'
		},
		{
			title: 'Counseling Referrals',
			description:
				'We partner with trusted Christian counselors and offer guidance in finding additional support.'
		},
		{
			title: 'Benevolence',
			description:
				'Financial and practical assistance is available for individuals navigating hardship.'
		}
	];

	const steps = [
		'Submit a prayer request online or on Sunday.',
		'Reach out if you need care support or would like to serve.',
		'Meet with a pastor for guidance, encouragement, and prayer.',
		'Explore recommended counseling resources tailored to your needs.'
	];
</script>

<svelte:head>
	<title>Prayer & Care - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="You are not alone. Our pastors, prayer team, and care network walk beside you with compassion, prayer, and practical help. Submit prayer requests and access care resources."
	/>
</svelte:head>

<section class="pageHero">
	<h1>Prayer & Care</h1>
	<p>
		You are not alone. Our pastors, prayer team, and care network walk beside you with compassion,
		prayer, and practical help.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Submit a Prayer Need</a>
		<a href="tel:+18024822132">Call the Office</a>
	</div>
</section>

<section class="pageSection">
	<h2>How We Support You</h2>
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
	<h2>Take a Step</h2>
	<ul>
		{#each steps as step}
			<li>{step}</li>
		{/each}
	</ul>
</section>

<section class="pageSection">
	<h2>Need Immediate Assistance?</h2>
	<p>
		If you are facing an urgent crisis, please dial 911. For non-emergency pastoral care, contact the
		office and we will connect you with a pastor quickly.
	</p>
</section>

