<script lang="ts">
	const beliefs = [
		{
			title: 'God',
			description:
				'We worship the triune God—Father, Son, and Holy Spirit—who is sovereign, holy, and loving.'
		},
		{
			title: 'Scripture',
			description:
				'The Bible is the inspired Word of God, authoritative for faith and life.'
		},
		{
			title: 'Humanity',
			description:
				'We are created in God’s image yet fallen and in need of redemption found only in Jesus.'
		},
		{
			title: 'Jesus Christ',
			description:
				'Jesus is fully God and fully man, whose life, death, and resurrection bring salvation.'
		},
		{
			title: 'Salvation',
			description:
				'Salvation is by grace through faith in Christ alone, leading to new life and transformation.'
		},
		{
			title: 'The Church',
			description:
				'The Church is the body of Christ, empowered by the Spirit to fulfill God’s mission.'
		},
		{
			title: 'Holy Spirit',
			description:
				'The Spirit indwells believers, equipping us with spiritual gifts for ministry and witness.'
		},
		{
			title: 'Hope',
			description:
				'We anticipate the return of Jesus, the resurrection of the dead, and the restoration of all things.'
		}
	];
</script>

<section class="pageHero">
	<h1>Our Beliefs</h1>
	<p>
		As part of the Christian & Missionary Alliance, we hold to historic Christian orthodoxy centered
		on Jesus and rooted in Scripture.
	</p>
	<div class="pageHeroActions">
		<a href="https://www.cmalliance.org/who-we-are/what-we-believe/">C&MA Statement of Faith</a>
		<a href="/grow-with-us/groups/">Study with a Group</a>
	</div>
</section>

<section class="pageSection">
	<h2>Core Doctrines</h2>
	<div class="cardGridSimple">
		{#each beliefs as belief}
			<article>
				<h3>{belief.title}</h3>
				<p>{belief.description}</p>
			</article>
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2>Following Jesus Together</h2>
	<p>
		Our theology invites us to live as a missional people—worshiping God, pursuing holiness, caring
		for one another, and sharing the gospel near and far. Explore more through our classes, groups,
		and membership pathway.
	</p>
</section>

