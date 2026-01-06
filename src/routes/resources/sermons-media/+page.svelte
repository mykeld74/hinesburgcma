<script lang="ts">
	const channels = [
		{
			title: 'Watch Online',
			description: 'Stream Sunday gatherings and on-demand teaching on YouTube and Church Center.',
			link: 'https://www.youtube.com/@HinesburgCAC'
		},
		{
			title: 'Podcast',
			description: 'Subscribe to weekly sermon audio wherever you listen to podcasts.',
			link: 'https://podcasts.apple.com/'
		},
		{
			title: 'Discussion Guides',
			description: 'Download guides to help your group or family dig deeper throughout the week.',
			link: '/grow-with-us/groups/'
		}
	];

	const series = [
		{
			title: 'Following Jesus Daily',
			description: 'Practices that ground us in the life of Jesus in every season.',
			tags: 'discipleship, formation'
		},
		{
			title: 'Hope in the Psalms',
			description: 'Exploring the prayers and songs that shape our worship and trust in God.',
			tags: 'worship, Old Testament'
		},
		{
			title: 'Be the Church',
			description: 'A call to live on mission together in our neighborhoods and networks.',
			tags: 'mission, community'
		}
	];
</script>

<svelte:head>
	<title>Sermons & Media - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="Access current and past teaching, worship gatherings, and resources that help you grow throughout the week. Watch sermons online, listen to podcasts, and download discussion guides."
	/>
</svelte:head>

<section class="pageHero">
	<h1 class="pageHeroChild pageHeroTitle">Sermons & Media</h1>
	<p class="pageHeroChild pageHeroText">
		Access current and past teaching, worship gatherings, and resources that help you grow
		throughout the week.
	</p>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Latest Series</h2>
	<div class="cardGridSimple">
		{#each series as item}
			<article>
				<h3 class="cardGridSimpleChild cardGridSimpleTitle">{item.title}</h3>
				<p class="cardGridSimpleChild">{item.description}</p>
				<small class="cardGridSimpleChild">{item.tags}</small>
			</article>
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Stay Connected</h2>
	<div class="cardGridSimple">
		{#each channels as channel}
			<article>
				<h3 class="cardGridSimpleChild cardGridSimpleTitle">{channel.title}</h3>
				<p class="cardGridSimpleChild">{channel.description}</p>
				<a href={channel.link} class="cardGridSimpleChild">Go to {channel.title}</a>
			</article>
		{/each}
	</div>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Share Your Story</h2>
	<p class="pageSectionText">
		God is at work in our church. Tell us how he is moving in your life so we can celebrate and
		share hope with others.
	</p>
	<div class="pageHeroActions">
		<a href="mailto:info@hinesburgcma.org">Share a Story</a>
		<a href="/grow-with-us/serve/">Join the Creative Team</a>
	</div>
</section>
