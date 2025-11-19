<script lang="ts">
	type Leader = {
		name: string;
		role: string;
		description: string;
		email?: string;
	};

	const pastors: Leader[] = [
		{
			name: 'Lead Pastor',
			role: 'Vision & Teaching',
			description:
				'Guides the mission and teaching ministries of CAC alongside our elders and leadership teams.'
		},
		{
			name: 'Associate Pastor',
			role: 'Discipleship & Groups',
			description:
				'Equips adults to grow together through groups, classes, and serving environments.'
		}
	];

	const directors: Leader[] = [
		{
			name: 'Kids Ministry Director',
			role: 'Birth–5th Grade',
			description:
				'Leads our next generation team and partners with parents to help kids know and follow Jesus.'
		},
		{
			name: 'Student Ministry Director',
			role: 'Middle & High School',
			description:
				'Invests in students through weekly gatherings, mentoring, retreats, and serving opportunities.'
		},
		{
			name: 'Worship Director',
			role: 'Worship & Creative',
			description:
				'Oversees Sunday gatherings, creative arts, and the teams who lead our church in worship.'
		},
		{
			name: 'Operations Director',
			role: 'Care & Administration',
			description:
				'Coordinates care, communications, facilities, and finances so our mission thrives.'
		}
	];
</script>

<svelte:head>
	<title>Our Leadership - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="We are guided by a team of pastors, staff, elders, and ministry leaders who serve together to help our church follow Jesus on mission. Meet our pastoral team and ministry directors."
	/>
</svelte:head>

<section class="pageHero">
	<h1>Our Leadership</h1>
	<p>
		We are guided by a team of pastors, staff, elders, and ministry leaders who serve together to help
		our church follow Jesus on mission.
	</p>
</section>

<section class="pageSection">
	<h2>Pastoral Team</h2>
	<div class="cardGridSimple">
		{#each pastors as leader}
			<article>
				<h3>{leader.name}</h3>
				<strong>{leader.role}</strong>
				<p>{leader.description}</p>
			</article>
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2>Ministry Directors</h2>
	<div class="cardGridSimple">
		{#each directors as leader}
			<article>
				<h3>{leader.name}</h3>
				<strong>{leader.role}</strong>
				<p>{leader.description}</p>
			</article>
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2>Contact Our Team</h2>
	<p>
		Reach out to the office and we will connect you with the right leader to answer questions, pray,
		or help you take a next step.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Email the Office</a>
		<a href="/about-us/contact-us/">Contact Form</a>
	</div>
</section>

