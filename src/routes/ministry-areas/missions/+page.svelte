<script lang="ts">
	const focuses = [
		{
			title: 'Global Partners',
			description:
				'We support C&MA workers around the world through prayer, financial partnership, and trips.'
		},
		{
			title: 'Local Initiatives',
			description:
				'Serve with local partners to meet practical needs, provide meals, and share the hope of Christ.'
		},
		{
			title: 'Short-Term Teams',
			description:
				'Experience cross-cultural ministry and encourage missionaries through annual trips.'
		},
		{
			title: 'Generosity',
			description:
				'Fuel the work of the gospel by giving to the Great Commission Fund and designated projects.'
		}
	];

	const steps = [
		'Pray regularly for our missionaries and the communities they serve.',
		'Participate in Serve Sundays and local outreach projects.',
		'Join a missions interest meeting to explore upcoming trips.',
		'Give faithfully to the Great Commission Fund.',
		'Share stories of God’s work with your family, friends, and small group.'
	];
</script>

<section class="pageHero">
	<h1>Missions</h1>
	<p>
		Hinesburg CMA is committed to making Jesus known locally and globally through prayer, serving,
		and radical generosity.
	</p>
	<div class="pageHeroActions">
		<a href="/resources/giving/">Give to Missions</a>
		<a href="mailto:info@hinesburgcma.org">Join a Team</a>
	</div>
</section>

<section class="pageSection">
	<h2>Mission Focus Areas</h2>
	<div class="cardGridSimple">
		{#each focuses as focus}
			<article>
				<h3>{focus.title}</h3>
				<p>{focus.description}</p>
			</article>
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2>How to Engage</h2>
	<ul>
		{#each steps as step}
			<li>{step}</li>
		{/each}
	</ul>
</section>

<section class="pageSection">
	<h2>Upcoming Opportunities</h2>
	<p>
		Stay informed about serve projects and global trips through the calendar and weekly emails.
	</p>
	<div class="pageHeroActions">
		<a href="/resources/calendar/">Calendar</a>
		<a href="/resources/sermons-media/">Stories & Updates</a>
	</div>
</section>

