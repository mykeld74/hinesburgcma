<script lang="ts">
	const foundations = [
		{
			title: 'Why Baptism?',
			description:
				'Baptism is a public declaration of faith in Jesus, symbolizing the cleansing of sin and new life in Christ.'
		},
		{
			title: 'Who Should Be Baptized?',
			description:
				'Anyone who has trusted Jesus as Savior and Lord and desires to follow him in obedience.'
		},
		{
			title: 'How We Baptize',
			description:
				'We baptize by immersion during Sunday gatherings and celebrate each story God is writing.'
		}
	];

	const steps = [
		'Attend a baptism conversation to explore the meaning and process together.',
		'Share your story with a pastor or group leader.',
		'Invite family and friends to celebrate with you.',
		'Be baptized during an upcoming Sunday gathering.',
		'Continue growing through a group or serving team.'
	];
</script>

<svelte:head>
	<title>Baptism - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="We love celebrating life change. If you are ready to take the next step of baptism, we would be honored to walk with you. Learn about biblical foundations and the baptism process."
	/>
</svelte:head>

<section class="pageHero">
	<h1 class="pageHeroChild pageHeroTitle">Baptism</h1>
	<p class="pageHeroChild pageHeroText">
		We love celebrating life change. If you are ready to take the next step of baptism, we would be
		honored to walk with you.
	</p>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Biblical Foundations</h2>
	<div class="cardGridSimple">
		{#each foundations as foundation}
			<article>
				<h3 class="cardGridSimpleChild cardGridSimpleTitle">{foundation.title}</h3>
				<p class="cardGridSimpleChild">{foundation.description}</p>
			</article>
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Steps Toward Baptism</h2>
	<ol class="pageSectionList">
		{#each steps as step}
			<li class="pageSectionListItem">{step}</li>
		{/each}
	</ol>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">We Are Here for You</h2>
	<p class="pageSectionText">
		Reach out and we will help you discern your next step, answer questions, and prepare you for an
		upcoming baptism gathering.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Email a Pastor</a>
		<a href="/visit-us/your-next-steps/">Attend Next Steps</a>
	</div>
</section>

