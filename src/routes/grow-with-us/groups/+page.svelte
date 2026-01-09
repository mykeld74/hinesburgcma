<script lang="ts">
</script>

<svelte:head>
	<title>Groups - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="Join a Community Group at CAC. Groups for men, women, students, couples, and young adults meet regularly to study the Bible, pray together, serve, and build authentic friendships. Find your group today."
	/>
</svelte:head>

<section class="pageHero">
	<div class="pageHeroContent">
		<h1 class="pageHeroChild pageHeroTitle">A Place For Everyone.</h1>
	</div>
	<div class="pageHeroActions">
		<a
			href="https://communityalliancechurch.churchcenter.com/groups"
			target="_blank"
			rel="noopener noreferrer">Join A Group Here</a
		>
	</div>
</section>

<section class="pageSection">
	<p class="pageSectionText">
		Life is not meant to be lived alone. In fact, God <em>hates</em> loneliness. You were created to
		experience life with other people, and that's why Community Groups within the church are vital for
		all of us. Community Groups (CGs) gather on a regular basis to hang out, serve together, study the
		Bible and most definitely to pray together. CGs come in all shapes and sizes: for men, women, students,
		married couples or young adults; with kids, without kids, about kids; focused on serving, focused
		on worship... the list goes on! CGs take place in different towns, on different days, at church and
		out of the church. So no matter where you are in your life, there's a CG waiting to welcome you.
	</p>
	<p class="pageSectionText">
		Ready to find community and be part of a family? Head over to our CAC App or Website, where you
		can learn more about all of our <a
			href="https://communityalliancechurch.churchcenter.com/groups"
			target="_blank"
			rel="noopener noreferrer">Current Community Groups</a
		>.
	</p>
</section>

<style>
	.pageHero {
		background: url('https://res.cloudinary.com/de6fzsubp/image/upload/v1767730209/groups.jpg')
			no-repeat center 35% / cover;
		height: 40vh;
		place-content: center;
		place-items: center;
		text-align: center;
		color: #fff;
		&::before {
			content: '';
			position: absolute;
			inset: 0;
			background: rgba(0, 0, 0, 0.5);
		}
	}

	.pageHeroActions {
		a {
			color: #fff;
			background: color-mix(in oklch, var(--primaryColor) 55%, transparent);
		}
	}
</style>
