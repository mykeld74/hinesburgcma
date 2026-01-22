<script lang="ts">
	const resources = [
		{
			title: 'Spiritual Loneliness',
			url: 'https://knowgod.com/en/kgp/0'
		},
		{
			title: 'Dealing with Fear',
			url: 'https://knowgod.com/en/poweroverfear/0'
		},
		{
			title: 'Dealing with Shame',
			url: 'https://knowgod.com/en/honorrestored/0'
		},
		{
			title: 'Financial Freedom',
			url: 'https://www.ramseysolutions.com/'
		},
		{
			title: 'Relational Wellness',
			url: 'https://www.ramseysolutions.com/john-delony'
		},
		{
			title: 'Parenting Tips',
			url: 'https://www.focusonthefamily.com/parenting/'
		},
		{
			title: 'Marriage Tips',
			url: 'https://www.focusonthefamily.com/healthy-marriage/'
		},
		{
			title: 'Christian Counseling',
			url: 'https://www.journeytruenorth.org/book-online'
		},
		{
			title: 'On-line Recovery',
			url: 'https://celebraterecovery.com/weekly-online-recovery-meetings/'
		},
		{
			title: 'Residential Recovery',
			url: 'https://tcnewengland.org'
		}
	];
</script>

<svelte:head>
	<title>Pathways To Victory - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="Jesus came to give you victory over the darkness! Find resources and pathways to help you deal with fears, insecurities, anxiety, financial issues, relationship issues, and spiritual issues."
	/>
</svelte:head>

<section class="pageHero">
	<div class="pageHeroContent">
		<h1 class="pageHeroChild pageHeroTitle">Pathways To Victory</h1>
		<p class="pageHeroChild pageHeroText">Jesus came to give you victory over the darkness!</p>
	</div>
</section>

<section class="pageSection blockSection">
	<div class="blockSectionContent">
		<p class="pageSectionText">
			But this life is also filled with battles, difficulties and overwhelming circumstances. What
			we really need is a pathway forward. How do I deal with my fears, insecurities, anxiety and
			the darkness that steals my joy? Whether it's financial issues, relationship issues, or
			spiritual issues, Jesus really can show you the way!
		</p>
		<p class="pageSectionText">
			Jesus said, <em
				>"The thief comes to steal, kill and destroy, but I came to give you real life - life
				eternal..."</em
			> John 10:10.
		</p>
	</div>
</section>

<section class="pageSection blockSection">
	<div class="blockSectionContent">
		<h2 class="pageSectionTitle">
			Whether it's at your own pace or working with others, you will find topics and resources right
			here to help you take the next step.
		</h2>
	</div>
</section>

<section class="pageSection">
	<div class="cardGridSimple">
		{#each resources as resource}
			<article>
				<h3 class="cardGridSimpleChild cardGridSimpleTitle">{resource.title}</h3>
				<a
					href={resource.url}
					target="_blank"
					rel="noopener noreferrer"
					class="cardGridSimpleChild cardGridSimpleLink"
				>
					Get Help Here
				</a>
			</article>
		{/each}
	</div>
</section>

<section class="pageSection blockSection">
	<div class="blockSectionContent">
		<div class="pageHeroActions">
			<a
				href="https://communityalliancechurch.churchcenter.com/people/forms/294327"
				target="_blank"
				rel="noopener noreferrer"
			>
				Prayer Request
			</a>
			<a
				href="https://communityalliancechurch.churchcenter.com/people/forms/316565"
				target="_blank"
				rel="noopener noreferrer"
			>
				Need To Talk?
			</a>
		</div>
	</div>
</section>
