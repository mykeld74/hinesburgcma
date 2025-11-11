<script lang="ts">
	const essentials = [
		{
			title: 'Shared Story',
			description:
				'Discover the heart, history, and mission of Hinesburg CMA as part of the Christian & Missionary Alliance.'
		},
		{
			title: 'Shared Beliefs',
			description:
				'Explore our doctrinal convictions and what it means to follow Jesus together.'
		},
		{
			title: 'Shared Practices',
			description:
				'Learn how we worship, grow, serve, give, and live on mission as one church family.'
		},
		{
			title: 'Shared Commitment',
			description:
				'Membership is a covenant to participate, give, pray, and serve with the body of Christ here.'
		}
	];

	const steps = [
		'Attend the Membership Class offered twice a year.',
		'Complete the membership application and interview.',
		'Sign the membership covenant and be affirmed by our elders.',
		'Celebrate during a Sunday gathering as we welcome new members.'
	];
</script>

<section class="pageHero">
	<h1>Membership</h1>
	<p>
		Membership is more than status—it is a commitment to be rooted, growing, and sent as part of the
		body of Christ at CAC.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Start Membership Process</a>
		<a href="/grow-with-us/serve/">Find a Place to Serve</a>
	</div>
</section>

<section class="pageSection">
	<h2>Membership Essentials</h2>
	<div class="cardGridSimple">
		{#each essentials as essential}
			<article>
				<h3>{essential.title}</h3>
				<p>{essential.description}</p>
			</article>
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2>Steps to Membership</h2>
	<ol>
		{#each steps as step}
			<li>{step}</li>
		{/each}
	</ol>
</section>

<section class="pageSection">
	<h2>Stay Connected</h2>
	<p>
		Connect with our team for upcoming class dates or to discuss any questions you have before you
		begin.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Contact a Pastor</a>
		<a href="/visit-us/your-next-steps/">Attend Next Steps</a>
	</div>
</section>

