<script lang="ts">
	const details = [
		{
			title: 'On-Site Parking',
			description:
				'Arrive via Pond Road and follow signage to the main lot behind the church building.'
		},
		{
			title: 'CVU Overflow',
			description:
				'When the main lot is full, park at the Champlain Valley Union High School athletic fields across the street.'
		},
		{
			title: 'Shuttle & Crossing',
			description:
				'Team members assist with crossing Pond Road safely. On high-volume Sundays, a shuttle runs every 10 minutes.'
		},
		{
			title: 'Accessible Parking',
			description:
				'Reserved ADA-accessible spots are available near the main entrance. Let our team know if you need assistance.'
		}
	];

	const tips = [
		'Arrive 15 minutes early to allow time for parking and check-in.',
		'Dress for the weather—VT seasons can shift quickly.',
		'Follow the direction of our parking volunteers for a smooth flow.',
		'Families with young kids may find the south entrance most convenient.',
		'Consider carpooling with friends or neighbors when possible.'
	];
</script>

<svelte:head>
	<title>CVU Parking - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="On busy Sundays, we partner with Champlain Valley Union High School to provide additional parking. Learn about on-site parking, CVU overflow, shuttle service, and accessible parking options."
	/>
</svelte:head>

<section class="pageHero">
	<h1>CVU Parking</h1>
	<p>
		On busy Sundays, we partner with Champlain Valley Union High School to provide additional parking.
		Here is everything you need to know.
	</p>
	<div class="pageHeroActions">
		<a href="https://goo.gl/maps/jD4GvYhCkDRnQ6A1A">Open in Maps</a>
		<a href="mailto:info@hinesburgcma.org">Contact the Office</a>
	</div>
</section>

<section class="pageSection">
	<h2>Parking Overview</h2>
	<div class="cardGridSimple">
		{#each details as detail}
			<article>
				<h3>{detail.title}</h3>
				<p>{detail.description}</p>
			</article>
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2>Helpful Tips</h2>
	<ul>
		{#each tips as tip}
			<li>{tip}</li>
		{/each}
	</ul>
</section>

<section class="pageSection">
	<h2>Need Assistance?</h2>
	<p>
		If you have mobility needs or questions before you arrive, please reach out so we can support you.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Email the Team</a>
		<a href="tel:+18024822132">Call (802) 482-2132</a>
	</div>
</section>

