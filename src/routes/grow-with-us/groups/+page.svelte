<script lang="ts">
	const groupTypes = [
		{
			title: 'Community Groups',
			description:
				'Meet weekly in homes or on campus for conversation, prayer, and shared meals.'
		},
		{
			title: 'Discipleship Groups',
			description:
				'Smaller circles of 3–5 people pursuing deeper accountability and spiritual practices.'
		},
		{
			title: 'Short-Term Studies',
			description:
				'Focused studies lasting 6–8 weeks around Scripture, spiritual formation, or specific topics.'
		},
		{
			title: 'Affinity Groups',
			description:
				'Groups built around life stage or shared interest, including young adults, parents, and more.'
		}
	];

	const process = [
		'Review available groups during our fall and spring semesters.',
		'Attend Group Launch to meet leaders and choose the right fit.',
		'Commit to the group rhythm and participate consistently.',
		'Serve together and live on mission beyond weekly gatherings.'
	];
</script>

<svelte:head>
	<title>Groups - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="We grow best in community. Groups are where discipleship, friendship, and mission collide in the life of CAC. Find community groups, discipleship groups, and short-term studies."
	/>
</svelte:head>

<section class="pageHero">
	<h1 class="pageHeroChild pageHeroTitle">Groups</h1>
	<p class="pageHeroChild pageHeroText">
		We grow best in community. Groups are where discipleship, friendship, and mission collide in the
		life of CAC.
	</p>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Types of Groups</h2>
	<div class="cardGridSimple">
		{#each groupTypes as group}
			<article>
				<h3 class="cardGridSimpleChild cardGridSimpleTitle">{group.title}</h3>
				<p class="cardGridSimpleChild">{group.description}</p>
			</article>
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">How to Join</h2>
	<ol class="pageSectionList">
		{#each process as step}
			<li class="pageSectionListItem">{step}</li>
		{/each}
	</ol>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Lead a Group</h2>
	<p class="pageSectionText">
		We are always equipping new leaders. Reach out if you sense God calling you to disciple others
		through community.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Start the Conversation</a>
		<a href="/grow-with-us/serve/">Serve as a Leader</a>
	</div>
</section>

