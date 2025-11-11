<script lang="ts">
	const spaces = [
		{
			title: 'Worship Center',
			description:
				'Gather with our church family on Sundays for worship, teaching, and prayer.'
		},
		{
			title: 'Kids Wing',
			description:
				'Safe, secure environments designed for age-specific discipleship from birth through 5th grade.'
		},
		{
			title: 'Student Lounge',
			description:
				'A flexible hangout and teaching space for middle and high school gatherings.'
		},
		{
			title: 'Commons',
			description:
				'A central space for hospitality, coffee, and connecting before and after gatherings.'
		}
	];

	const accessibility = [
		'Accessible parking spots are located near the main entrance doors.',
		'Automatic doors and ramp access serve the entire facility.',
		'All restrooms include accessible stalls and changing stations.',
		'Hearing assist devices are available at the Welcome Desk.',
		'Allergen-friendly snacks are provided in kids spaces each week.'
	];
</script>

<section class="pageHero">
	<h1>Our Campus</h1>
	<p>
		We gather at 190 Pond Road in Hinesburg, directly across from CVU. Our campus is designed to
		serve every generation with safe, welcoming spaces.
	</p>
	<div class="pageHeroActions">
		<a href="https://goo.gl/maps/jD4GvYhCkDRnQ6A1A">Get Directions</a>
		<a href="/resources/cvu-parking/">Parking Details</a>
	</div>
</section>

<section class="pageSection">
	<h2>Explore the Building</h2>
	<div class="cardGridSimple">
		{#each spaces as space}
			<article>
				<h3>{space.title}</h3>
				<p>{space.description}</p>
			</article>
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2>Accessibility & Safety</h2>
	<ul>
		{#each accessibility as item}
			<li>{item}</li>
		{/each}
	</ul>
</section>

<section class="pageSection">
	<h2>Need a Tour?</h2>
	<p>
		We would love to show you around before Sunday. Reach out to schedule a walk-through with a
		member of our team.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Schedule a Tour</a>
		<a href="tel:+18024822132">Call (802) 482-2132</a>
	</div>
</section>

