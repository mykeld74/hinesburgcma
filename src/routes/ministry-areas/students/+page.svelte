<script lang="ts">
	const rhythms = [
		{
			title: 'Sunday Nights',
			description:
				'Middle and high school students gather for worship, teaching, and small groups.'
		},
		{
			title: 'Midweek Hangouts',
			description:
				'Grade-based meetups foster friendships, mentoring, and prayer throughout the year.'
		},
		{
			title: 'Retreats & Trips',
			description:
				'Seasonal retreats and mission trips help students grow in faith and servant leadership.'
		}
	];

	const commitments = [
		'Safe adult leaders invested in the next generation.',
		'Opportunities for students to serve on Sundays and across ministries.',
		'Bible-centered teaching that addresses real-life questions.',
		'Partnership with parents through regular communication and events.'
	];
</script>

<section class="pageHero">
	<h1>Student Ministry</h1>
	<p>
		Students in grades 6–12 find community, grow as disciples, and discover their calling to live on
		mission with Jesus.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Join the Email List</a>
		<a href="/resources/calendar/">Upcoming Events</a>
	</div>
</section>

<section class="pageSection">
	<h2>Weekly Rhythms</h2>
	<div class="cardGridSimple">
		{#each rhythms as rhythm}
			<article>
				<h3>{rhythm.title}</h3>
				<p>{rhythm.description}</p>
			</article>
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2>Our Commitment to Families</h2>
	<ul>
		{#each commitments as item}
			<li>{item}</li>
		{/each}
	</ul>
</section>

<section class="pageSection">
	<h2>Get Connected</h2>
	<p>
		New students are welcome any week. Reach out and our team will help you start well.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Contact Student Team</a>
		<a href="/grow-with-us/serve/">Serve with Students</a>
	</div>
</section>

