<script lang="ts">
	import Image from '$lib/components/Image.svelte';
</script>

<svelte:head>
	<title>Our Beliefs - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="As part of the Christian & Missionary Alliance, we hold to historic Christian orthodoxy centered on Jesus and rooted in Scripture. Explore our core doctrines and statement of faith."
	/>
</svelte:head>

<section class="pageHero">
	<h1 class="pageHeroChild pageHeroTitle">Our Beliefs</h1>
	<ul class="beliefPrinciples">
		<li>
			<strong>In Essential beliefs</strong> – We have UNITY.
			<span class="scriptureRef">John 17:23</span>
		</li>
		<li>
			<strong>In Non-Essential beliefs</strong> – We have LIBERTY.
			<span class="scriptureRef">Romans 14:1</span>
		</li>
		<li>
			<strong>In ALL our beliefs</strong> – We show CHARITY.
			<span class="scriptureRef">John 13:35</span>
		</li>
	</ul>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">The Essentials We Believe:</h2>
	<div class="cardGridSimple">
		<article>
			<h3 class="cardGridSimpleChild cardGridSimpleTitle">God</h3>
			<p class="cardGridSimpleChild">
				There is one God who always does what is good, right, and perfect. The presupposition is
				that He has always existed. In other words, He is the "uncaused cause." He exists in three
				persons: the Father, the Son, and the Holy Spirit. This is what Christian Theologians call
				the Trinity: one being, yet three persons, co-eternal, co-equal. "Hear, O Israel! The LORD
				is our God, the LORD is one." <span class="scriptureRef">Deut. 6:4</span>
			</p>
		</article>

		<article>
			<h3 class="cardGridSimpleChild cardGridSimpleTitle">God The Father</h3>
			<p class="cardGridSimpleChild">
				He is the author and creator of heaven and earth, of all that is seen and unseen.
			</p>
		</article>

		<article>
			<h3 class="cardGridSimpleChild cardGridSimpleTitle">God The Son</h3>
			<p class="cardGridSimpleChild">
				Jesus is the Christ (Messiah), God incarnate. He came in human form to sacrifice Himself,
				once for all, that we might not perish but have eternal life. <span class="scriptureRef"
					>John 1:1-14</span
				>. As we seek to know Jesus personally, He will reveal Himself as our Savior, Sanctifier,
				Healer, and Coming King.
			</p>
		</article>

		<article>
			<h3 class="cardGridSimpleChild cardGridSimpleTitle">God The Holy Spirit</h3>
			<p class="cardGridSimpleChild">
				He is righteousness and peace. The Holy Spirit is a divine person, sent to dwell, guide,
				teach, and empower the believer. He convicts the world of sin, righteousness, and judgment. <span
					class="scriptureRef">John 16:8-11</span
				>
			</p>
		</article>

		<article>
			<h3 class="cardGridSimpleChild cardGridSimpleTitle">The Bible</h3>
			<p class="cardGridSimpleChild">
				The Bible is the divine progressive revelation of God Himself restoring His creation by
				redeeming and rescuing it in and through the work of Jesus Christ on our behalf. It is the
				inerrant word of God, written by men under the inspiration of the Holy Spirit. It is the
				single authority of the Christian faith.
			</p>
		</article>
	</div>
</section>

<section class="pageSection blockSection">
	<div class="blockSectionContent">
		<h2 class="pageSectionTitle">Our Denomination</h2>
		<p class="pageSectionText">
			Community Alliance Church is part of <a href="https://cmalliance.org/" target="_blank">
				The Christian & Missionary Alliance Church.
			</a>
		</p>
		<div class="cmaLogoContainer">
			<a href="https://cmalliance.org/" target="_blank"
				><Image
					source="cmaLogo"
					altTag="Christian & Missionary Alliance Church Logo"
					width="500"
				/></a
			>
		</div>
	</div>
</section>

<style>
	.beliefPrinciples {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 1.5rem;
	}

	.beliefPrinciples li {
		font-size: 1.25rem;
		line-height: 1.6;
	}

	.scriptureRef {
		color: var(--accentColor);
		font-style: italic;
	}
	.cmaLogoContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 90%;
		margin: 3rem auto;
		max-width: 400px;
	}
</style>
