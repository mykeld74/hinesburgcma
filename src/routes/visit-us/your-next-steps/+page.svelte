<script lang="ts">
	const upcomingEvent = {
		title: 'Thursday Morning Ladies Group',
		date: 'January 8, 2026',
		time: '9:00am'
	};
</script>

<svelte:head>
	<title>Your Next Steps - Community Alliance Church - Hinesburg</title>
	<meta
		name="description"
		content="Deepening your faith and your relationships requires action. Discover volunteer opportunities, join a group, and take your next steps at Community Alliance Church."
	/>
</svelte:head>

<section class="pageHero">
	<h1 class="pageHeroChild pageHeroTitle">Your Next Steps</h1>
	<p class="pageHeroChild pageHeroText">
		<strong>What will YOUR NEXT STEPS be?</strong>
	</p>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Deepening your faith and your relationships requires action.</h2>
	<p class="pageSectionText">
		In other words, taking some <em>next steps.</em>
	</p>
	<p class="pageSectionText">
		If you've been attending Community Alliance for a while and are ready to go beyond just
		attending on Sunday mornings, take a look at some ways you can begin making deeper connections
		here. Real connections are what draw us closer together and closer to God.
	</p>
</section>

<section class="pageSection blockSection">
	<div class="blockSectionContent">
		<h2 class="pageSectionTitle">Volunteer Opportunities</h2>
		<p class="pageSectionText">
			You were created on purpose, with purpose, by a God who thinks your life is way too important
			to miss out on the joy and fulfillment that comes through volunteering in the life of the
			church. (We also call that "serving.") Our desire is to help you discover and develop your
			life's purpose by offering you opportunities to serve and connect. We cannot reach the world
			for Jesus without our committed volunteer teams. We look forward to helping you discover how
			you can play a part in God's kingdom!
		</p>
		<div class="pageHeroActions">
			<a href="/grow-with-us/serve/">Find an Opportunity</a>
		</div>
	</div>
</section>

<section class="pageSection blockSection">
	<div class="blockSectionContent">
		<h2 class="pageSectionTitle">Join a Group</h2>
		<p class="pageSectionText">
			Life is not meant to be lived alone. In fact, God <em>hates</em> loneliness. You were created to
			experience life with other people, and that's why groups are vital for community. Groups gather
			on a regular basis to hang out, serve together, study the Bible and most definitely to pray together.
			Groups come in all shapes and sizes: for men, women, students, married couples or young adults.
			With kids, without kids, about kids, and so on. Groups take place in different towns and on different
			days. So no matter where you are in your life, there's a group waiting to welcome you.
		</p>
		<p class="pageSectionText">
			Ready to find community and be part of a family? Use our group finder link below and take your
			next step to becoming truly known and valued.
		</p>
		<div class="pageHeroActions">
			<a href="/grow-with-us/groups/">Find a Group</a>
		</div>
	</div>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">What's Coming Up?</h2>
	<div class="upcomingEvent">
		<h3 class="upcomingEventTitle">{upcomingEvent.title}</h3>
		<p class="upcomingEventDate">
			{upcomingEvent.date} | {upcomingEvent.time}
		</p>
	</div>
	<div class="pageHeroActions">
		<a href="/resources/calendar/">View Full Calendar</a>
	</div>
</section>

<section class="pageSection">
	<h2 class="pageSectionTitle">Still not sure about your next step?</h2>
	<p class="pageSectionText">
		<strong
			>Take a minute to complete this Connection Card and someone from our staff will reach out to
			you with a few ideas!</strong
		>
	</p>
	<p class="pageSectionText">
		<strong>We can't wait to connect with you and join you in your next steps!</strong>
	</p>
	<div class="pageHeroActions">
		<a href="/about-us/contact-us/">Contact Us</a>
	</div>
</section>

<style>
	.pageHero {
		background: url('https://res.cloudinary.com/de6fzsubp/image/upload/v1767717331/communityDinner.jpg')
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
	.pageHeroText {
		color: #fff;
	}

	.upcomingEvent {
		padding: clamp(1.25rem, 3vw, 1.8rem);
		background: color-mix(in oklch, var(--surfaceColor) 88%, black 12%);
		border: 1px solid color-mix(in oklch, var(--primaryColor) 40%, transparent);
		border-radius: 20px;
		box-shadow:
			inset 0 0 0 1px color-mix(in oklch, var(--contrastColor) 6%, transparent),
			0 16px 24px color-mix(in oklch, black 35%, transparent);
		margin-bottom: 1.5rem;
	}

	.upcomingEventTitle {
		margin: 0 0 0.5rem 0;
		font-size: clamp(1.2rem, 0.4vw + 1.1rem, 1.35rem);
		color: color-mix(in oklch, var(--contrastColor) 85%, transparent);
	}

	.upcomingEventDate {
		margin: 0;
		color: color-mix(in oklch, var(--contrastColor) 75%, transparent);
		font-weight: 600;
	}
</style>
