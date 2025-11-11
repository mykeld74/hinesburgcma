<script lang="ts">
	const waysToGive = [
		{
			title: 'Online Giving',
			description:
				'Secure online giving through Church Center with one-time or recurring options.'
		},
		{
			title: 'In Person',
			description:
				'Give during Sunday gatherings via offering boxes located in the worship center.'
		},
		{
			title: 'Mail',
			description:
				'Send gifts to Hinesburg CMA, 190 Pond Road, Hinesburg VT 05461. Please note fund designation.'
		},
		{
			title: 'Non-Cash Gifts',
			description:
				'Contact us about gifts of stock, assets, or employer-matched donations.'
		}
	];

	const funds = [
		'General Fund — fuels ministry, staff, and operations.',
		'Great Commission Fund — supports C&MA missionaries around the world.',
		'Benevolence — provides direct care for individuals and families in crisis.',
		'Special Projects — invests in strategic initiatives and facility improvements.'
	];
</script>

<section class="pageHero">
	<h1>Giving</h1>
	<p>
		Your generosity accelerates the mission of Jesus in Hinesburg and beyond. Thank you for giving
		cheerfully and faithfully.
	</p>
	<div class="pageHeroActions">
		<a href="https://hinesburgcma.churchcenter.com/giving">Give Online</a>
		<a href="mailto:info@hinesburgcma.org">Ask a Question</a>
	</div>
</section>

<section class="pageSection">
	<h2>Ways to Give</h2>
	<div class="cardGridSimple">
		{#each waysToGive as way}
			<article>
				<h3>{way.title}</h3>
				<p>{way.description}</p>
			</article>
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2>Giving Funds</h2>
	<ul>
		{#each funds as fund}
			<li>{fund}</li>
		{/each}
	</ul>
</section>

<section class="pageSection">
	<h2>Contribution Questions</h2>
	<p>
		Our finance team is ready to assist with statements, recurring gifts, and special giving options.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Email Finance Team</a>
		<a href="tel:+18024822132">Call (802) 482-2132</a>
	</div>
</section>

