<script lang="ts">
	import Image from '$lib/components/Image.svelte';
</script>

<svelte:head>
	<title>Missions - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="Missions Is: All of Jesus for All of the World. Community Alliance Church supports M2535 Ministry in the Dominican Republic and partners with the Christian and Missionary Alliance to make Jesus known globally."
	/>
</svelte:head>

<section class="pageHero">
	<div class="pageHeroContent">
		<h1 class="pageHeroChild pageHeroTitle">Missions</h1>
		<p class="pageHeroChild pageHeroText">Missions Is: All of Jesus for All of the World</p>
	</div>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Why Missions?</h2>
	<p class="pageSectionText">
		Why does Community Alliance Church engage in missions work? As stated by our denomination:
	</p>
	<p class="pageSectionText">
		<em
			>Because we have experienced His love, His hope and His mercy first-hand, we are compelled to
			make Him known to all people, in every segment of society.</em
		>
	</p>
	<p class="pageSectionText">
		As part of the Christian and Missionary Alliance Church, we are called to care for suffering and
		overlooked people, partnering with over 2,000 U.S. churches and more than 700 international
		workers, serving in 70 countries.
	</p>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">M2535 Ministry in the Dominican Republic</h2>

	<p class="pageSectionText">
		CAC is blessed to help support the M2535 Ministry in the Dominican Republic (DR), along with its
		leaders, Rick and Tammie Romano and their family. Our church family regularly prays for the
		Romano's work in the DR, and our DR Missions team stays in regular contact with them so that we
		know how to be praying. We love to welcome the Romanos when they visit Vermont to share what God
		has been doing in their ministry. We also send a team of volunteers to the DR once a year to
		serve in the M2535 community, typically during US students' spring break from school.
	</p>
	<p class="pageSectionText">
		To learn more about missions at CAC, contact <a href="mailto:kellyfournier0@gmail.com">
			Kelly Fornier</a
		>. You can also learn more about M2535 Ministry on their
		<a href="https://m2535.org" target="_blank" rel="noopener noreferrer">website</a>.
	</p>
</section>

<section class="pageSection m2535Section">
	<h2 class="pageSectionTitle">M2535 Missional Community</h2>
	<div class="pageSectionContent">
		<div class="pageSectionContentChild">
			<p class="pageSectionText">
				The mission of M2535 is to live out the teachings of Christ in community:
			</p>
			<p class="pageSectionText">
				<em
					>At the core of our DNA is Matthew 25:35 & 36: "For I was hungry and you gave me something
					to eat, I was thirsty and you gave me something to drink, I was a stranger and you invited
					me in, I needed clothes and you clothed me, I was sick and you looked after me, I was in
					prison and you came to visit me."</em
				>
			</p>
		</div>
		<div class="pageSectionContentImage">
			<a href="https://m2535.org" target="_blank" rel="noopener noreferrer">
				<Image
					source="dominican-republic"
					altTag="M2535 Ministry in the Dominican Republic"
					width="500"
				/>
			</a>
		</div>
	</div>
</section>

<style>
	.pageSectionContent {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 1rem;
	}
	.pageSectionContentChild {
		grid-column: 1;
	}
	.pageSectionContentImage {
		grid-column: 2;
	}
	.m2535Section {
		background: color-mix(in oklch, var(--surfaceColor) 88%, black 12%);
		border-radius: 20px;
		padding: 1rem;
	}
</style>
