<script lang="ts">
	const essentials = [
		{
			title: 'Shared Story',
			description:
				'Discover the heart, history, and mission of Community Alliance Church - Hinesburg as part of the Christian & Missionary Alliance.'
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

<svelte:head>
	<title>Membership - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="Membership is more than status—it is a commitment to be rooted, growing, and sent as part of the body of Christ at CAC. Learn about membership essentials and the process."
	/>
</svelte:head>

<section class="pageHero">
	<h1 class="pageHeroChild pageHeroTitle">Membership</h1>
	<p class="pageHeroChild pageHeroText">
		Membership is more than status—it is a commitment to be rooted, growing, and sent as part of the
		body of Christ at CAC.
	</p>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Membership Essentials</h2>
	<div class="cardGridSimple">
		{#each essentials as essential}
			<article>
				<h3 class="cardGridSimpleChild cardGridSimpleTitle">{essential.title}</h3>
				<p class="cardGridSimpleChild">{essential.description}</p>
			</article>
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Steps to Membership</h2>
	<ol class="pageSectionList">
		{#each steps as step}
			<li class="pageSectionListItem">{step}</li>
		{/each}
	</ol>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Stay Connected</h2>
	<p class="pageSectionText">
		Connect with our team for upcoming class dates or to discuss any questions you have before you
		begin.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Contact a Pastor</a>
		<a href="/visit-us/your-next-steps/">Attend Next Steps</a>
	</div>
</section>

