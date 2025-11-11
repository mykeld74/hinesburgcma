<script lang="ts">
	const resources = [
		{
			title: 'Church Center App',
			description:
				'Manage giving, check in your family, join groups, and register for events.',
			link: 'https://apps.apple.com/us/app/church-center-app/id1357742931'
		},
		{
			title: 'RightNow Media',
			description:
				'Stream Bible studies, kids programming, and discipleship content for every age.',
			link: 'https://www.rightnowmedia.org/'
		},
		{
			title: 'C&MA Resources',
			description:
				'Explore articles, videos, and updates from the Christian & Missionary Alliance.',
			link: 'https://www.cmalliance.org/'
		},
		{
			title: 'Bible Reading Plans',
			description:
				'Dive into Scripture with curated plans and studies for individuals and families.',
			link: 'https://www.bible.com/reading-plans'
		}
	];
</script>

<section class="pageHero">
	<h1>External Resources</h1>
	<p>
		Take next steps all week long with trusted resources that support spiritual growth, family
		discipleship, and mission.
	</p>
</section>

<section class="pageSection">
	<h2>Recommended Tools</h2>
	<div class="cardGridSimple">
		{#each resources as resource}
			<article>
				<h3>{resource.title}</h3>
				<p>{resource.description}</p>
				<a href={resource.link}>Visit {resource.title}</a>
			</article>
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2>Need More Ideas?</h2>
	<p>
		Let us know what you are looking for—studies, devotionals, parenting resources, or mission
		opportunities—and we will share next steps curated for you.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Contact the Team</a>
		<a href="/resources/sermons-media/">Watch Recent Teaching</a>
	</div>
</section>

