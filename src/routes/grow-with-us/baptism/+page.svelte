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
	<h1>Baptism</h1>
	<p>
		We love celebrating life change. If you are ready to take the next step of baptism, we would be
		honored to walk with you.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Sign Up for Baptism</a>
		<a href="/resources/sermons-media/">Watch Baptism Stories</a>
	</div>
</section>

<section class="pageSection">
	<h2>Biblical Foundations</h2>
	<div class="cardGridSimple">
		{#each foundations as foundation}
			<article>
				<h3>{foundation.title}</h3>
				<p>{foundation.description}</p>
			</article>
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2>Steps Toward Baptism</h2>
	<ol>
		{#each steps as step}
			<li>{step}</li>
		{/each}
	</ol>
</section>

<section class="pageSection">
	<h2>We Are Here for You</h2>
	<p>
		Reach out and we will help you discern your next step, answer questions, and prepare you for an
		upcoming baptism gathering.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Email a Pastor</a>
		<a href="/visit-us/your-next-steps/">Attend Next Steps</a>
	</div>
</section>

