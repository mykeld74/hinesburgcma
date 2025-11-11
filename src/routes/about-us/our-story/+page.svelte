<script lang="ts">
	const milestones = [
		{
			year: '1978',
			description:
				'Hinesburg CMA launched with a vision to reach families in the Champlain Valley.'
		},
		{
			year: '1995',
			description:
				'Expanded our campus to make room for growing generational ministry opportunities.'
		},
		{
			year: '2010',
			description:
				'Commissioned our first global mission partners and deepened local community partnerships.'
		},
		{
			year: 'Today',
			description:
				'Continuing to follow Jesus together by discipling every generation and sharing hope.'
		}
	];

	const values = [
		{
			title: 'Centered on Jesus',
			description:
				'Everything we do flows from the life, death, and resurrection of Jesus Christ.'
		},
		{
			title: 'Rooted in Scripture',
			description:
				'The Bible shapes our beliefs, our discipleship, and our mission in the world.'
		},
		{
			title: 'Welcoming Community',
			description:
				'We create space for every story to belong and experience the transforming love of God.'
		},
		{
			title: 'Sent People',
			description:
				'We join the Spirit in bringing hope to our neighborhoods and the nations.'
		}
	];
</script>

<section class="pageHero">
	<h1>Our Story</h1>
	<p>
		We are a multi-generational church committed to practicing the way of Jesus together in
		Hinesburg and beyond.
	</p>
</section>

<section class="pageSection">
	<h2>Where We Have Been</h2>
	<ul>
		{#each milestones as milestone}
			<li>
				<strong>{milestone.year}</strong> — {milestone.description}
			</li>
		{/each}
	</ul>
</section>

<section class="pageSection">
	<h2>Who We Are Becoming</h2>
	<div class="cardGridSimple">
		{#each values as value}
			<article>
				<h3>{value.title}</h3>
				<p>{value.description}</p>
			</article>
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2>Be Part of the Story</h2>
	<p>
		We would love to meet you, learn your story, and walk with you as we follow Jesus together.
	</p>
	<div class="pageHeroActions">
		<a href="/visit-us/plan-your-visit/">Plan Your Visit</a>
		<a href="/grow-with-us/serve/">Serve with Us</a>
	</div>
</section>

