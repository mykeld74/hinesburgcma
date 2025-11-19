<script lang="ts">
	import { useGsap } from '$lib/actions/gsap';
	import type { Gsap } from '$lib/animations/gsap';

	type CardLink = {
		title: string;
		description: string;
		href: string;
	};

	const expectationCards: CardLink[] = [
		{
			title: "We're in Hinesburg",
			description:
				'We meet at 190 Pond Road in Hinesburg, directly across from the CVU athletic fields with plenty of parking.',
			href: '/about-us/our-campus/'
		},
		{
			title: 'Worship at 10:30am',
			description:
				'Arrive a few minutes early, grab a coffee, and make some friends before the service begins.',
			href: '/visit-us/plan-your-visit/'
		},
		{
			title: 'For Kids & Teens',
			description:
				'Age-specific programming for kids and students is available before and during the gathering.',
			href: '/ministry-areas/kids/'
		},
		{
			title: 'Still Have Questions?',
			description:
				'Our Plan Your Visit guide walks through what to expect before, during, and after your Sunday experience.',
			href: '/visit-us/plan-your-visit/'
		}
	];

	const pathwayCards: CardLink[] = [
		{
			title: 'Serve on a Team',
			description: 'Discover your gifts and join a team that helps people meet Jesus every week.',
			href: '/grow-with-us/serve/'
		},
		{
			title: 'Explore Baptism',
			description:
				'Attend our baptism conversation to learn more about following Jesus in this next step of faith.',
			href: '/grow-with-us/baptism/'
		},
		{
			title: 'Join a Group',
			description:
				'Build meaningful relationships through semester-based small groups for every season of life.',
			href: '/grow-with-us/groups/'
		}
	];

	function cardsIn(gsap: Gsap, node: HTMLElement, index = 0) {
		gsap.set(node, { y: 20, opacity: 0 });
		const tween = gsap.to(node, {
			delay: 0.12 * index,
			y: 0,
			opacity: 1,
			duration: 0.6,
			ease: 'power2.out'
		});
		return () => tween.kill();
	}
</script>

<svelte:head>
	<title
		>Community Alliance Church - Hinesburg - Find Hope, Community, and Purpose in Hinesburg</title
	>
	<meta
		name="description"
		content="We are a church family practicing the way of Jesus together—growing in faith, serving our neighbors, and sending hope to the world. Join us Sundays at 10:30am in Hinesburg, Vermont."
	/>
</svelte:head>

<header class="hero">
	<div class="heroContent">
		<span class="eyebrow">Get to Know CAC</span>
		<h1 use:useGsap={{ init: cardsIn }}>Find hope, community, and purpose in Hinesburg.</h1>
		<p>
			We are a church family practicing the way of Jesus together—growing in faith, serving our
			neighbors, and sending hope to the world.
		</p>
		<div class="heroActions">
			<a class="primaryCta" href="/visit-us/plan-your-visit/">Plan Your Visit</a>
			<a class="secondaryCta" href="/resources/sermons-media/">Watch or Listen</a>
		</div>
	</div>
</header>

<div class="expectationsContainer">
	<section class="expectations" aria-labelledby="expectations-heading">
		<div class="sectionSurface">
			<div class="sectionHeader">
				<h2 id="expectations-heading">What to Expect</h2>
				<p>
					Whether it is your first Sunday or a return visit, here is how you can feel at home at
					Community Alliance Church - Hinesburg.
				</p>
			</div>
			<div class="cardGrid">
				{#each expectationCards as card, index}
					<article
						use:useGsap={{ init: (gsap: Gsap, node: HTMLElement) => cardsIn(gsap, node, index) }}
					>
						<h3>{card.title}</h3>
						<p>{card.description}</p>
						<a href={card.href}>Learn More</a>
					</article>
				{/each}
			</div>
		</div>
	</section>
</div>

<div class="pathwaysContainer">
	<section class="pathways" aria-labelledby="pathways-heading">
		<div class="sectionSurface">
			<div class="sectionHeader">
				<h2 id="pathways-heading">Take Your Next Step</h2>
				<p>
					Grow deeper in faith and community through rhythms that help you know Jesus and make him
					known.
				</p>
			</div>
			<div class="cardGrid">
				{#each pathwayCards as card, index}
					<article
						use:useGsap={{ init: (gsap: Gsap, node: HTMLElement) => cardsIn(gsap, node, index) }}
					>
						<h3>{card.title}</h3>
						<p>{card.description}</p>
						<a href={card.href}>Explore</a>
					</article>
				{/each}
			</div>
		</div>
	</section>
</div>

<section class="mediaSpotlight" aria-labelledby="media-heading">
	<div class="mediaContent">
		<div>
			<span class="eyebrow">Latest Message</span>
			<h2 id="media-heading">Catch Up on Sunday</h2>
			<p>
				Miss a weekend or want to revisit a teaching? Access the full archive of sermons, worship
				sets, and discussion guides.
			</p>
			<div class="heroActions">
				<a class="primaryCta" href="/resources/sermons-media/">Watch Sermons</a>
				<a class="secondaryCta" href="https://www.youtube.com/@HinesburgCAC">YouTube Channel</a>
			</div>
		</div>
	</div>
	<figure>
		<img
			src="https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_840/church-worship.jpg"
			alt="Worship gathering at Community Alliance Church - Hinesburg"
			loading="lazy"
		/>
	</figure>
</section>

<section class="events" aria-labelledby="events-heading">
	<div class="sectionSurface">
		<div class="sectionHeader">
			<h2 id="events-heading">Coming Up at CAC</h2>
			<p>
				Stay connected with upcoming gatherings, serving opportunities, and community events for
				every age.
			</p>
			<a class="secondaryCta" href="/resources/calendar/">View Calendar</a>
		</div>
		<div class="eventCard">
			<span class="eventDate">Sundays</span>
			<h3>Worship Gathering</h3>
			<p>
				10:30am | In person at Community Alliance Church - Hinesburg and streaming on demand every
				Monday morning.
			</p>
			<a href="/visit-us/plan-your-visit/">Plan Your Visit</a>
		</div>
		<div class="eventCard">
			<span class="eventDate">Monthly</span>
			<h3>Next Steps Gathering</h3>
			<p>Discover your place at CAC, meet our pastors, and hear how to connect with others.</p>
			<a href="/grow-with-us/your-next-steps/">Your Next Steps</a>
		</div>
		<div class="eventCard">
			<span class="eventDate">Seasonal</span>
			<h3>Meals & Mission Nights</h3>
			<p>Serve our neighbors through shared meals, care packages, and community partnerships.</p>
			<a href="/ministry-areas/missions/">Learn More</a>
		</div>
	</div>
</section>

<section class="appBanner" aria-labelledby="app-heading">
	<div>
		<h2 id="app-heading">Get the CAC App</h2>
		<p>
			Stay in the loop with events, groups, and giving with the Church Center app. Watch sermons,
			check in your kids, and sign up for your next step.
		</p>
	</div>
	<a class="primaryCta" href="https://apps.apple.com/us/app/church-center-app/id1357742931">
		Download Church Center
	</a>
</section>

<section class="contactSection" aria-labelledby="contact-heading">
	<div class="sectionSurface">
		<div class="sectionHeader">
			<h2 id="contact-heading">We Would Love to Hear from You</h2>
			<p>Reach out to our team with any questions you have before your first visit.</p>
		</div>
		<address>
			<div>190 Pond Road, Hinesburg, VT 05461</div>
			<div><a href="tel:+18024822132">(802) 482-2132</a></div>
			<div><a href="mailto:info@hinesburgcma.org">info@hinesburgcma.org</a></div>
		</address>
	</div>
</section>

<style>
	.hero {
		display: grid;
		gap: clamp(1.5rem, 3vw, 3rem);
		align-items: center;
		justify-content: center;
		padding: clamp(2rem, 6vw, 5rem) clamp(1.5rem, 5vw, 3.5rem);
		margin: 0 auto;
		position: relative;
		overflow: hidden;
		background: url('https://res.cloudinary.com/de6fzsubp/image/upload/v1762883178/DroneViewFrontChurch.jpg')
			no-repeat center center / cover;
		&::before {
			content: '';
			position: absolute;
			inset: 0;
			background: rgba(0, 0, 0, 0.55);
		}
		box-shadow:
			0 24px 80px color-mix(in oklab, black 55%, transparent),
			0 0 0 1px color-mix(in oklab, var(--primaryColor) 12%, transparent);

		& .heroContent {
			position: relative;
			max-width: 980px;
			display: grid;
			gap: clamp(1rem, 2vw, 1.6rem);
			color: #fff;
			& h1 {
				font-size: clamp(2.25rem, 1.8vw + 1.8rem, 3.2rem);
				margin: 0;
				line-height: 1.1;
				text-transform: uppercase;
				letter-spacing: 0.1em;
			}

			& p {
				margin: clamp(0.75rem, 1.2vw, 1rem) 0 clamp(1.25rem, 2vw, 1.75rem);
				max-width: 48ch;
				font-size: clamp(1.05rem, 0.5vw + 1rem, 1.2rem);
			}

			& .eyebrow {
				font-weight: 700;
				text-transform: uppercase;
				letter-spacing: 0.12em;
				color: var(--accentColor);
				font-size: 0.85rem;
				display: inline-flex;
				align-items: center;
				gap: 0.5rem;

				&::after {
					content: '';
					display: inline-block;
					width: 48px;
					height: 1px;
					background: color-mix(in oklab, var(--accentColor) 70%, transparent);
					opacity: 0.8;
				}
			}
		}
	}

	.expectations,
	.pathways,
	.events,
	.contactSection {
		position: relative;
		max-width: 1100px;
		margin: 0 auto clamp(3rem, 6vw, 5rem);
		z-index: 5;
	}
	.expectationsContainer {
		padding: 0 clamp(1.5rem, 5vw, 3rem);
	}
	.pathwaysContainer {
		position: relative;
		background: url('https://res.cloudinary.com/de6fzsubp/image/upload/v1762883178/lobbyshot1')
			no-repeat fixed center center / cover;
		padding: clamp(2rem, 6vw, 5rem) clamp(1.5rem, 5vw, 3rem);
		--clip-top-left: 5%;
		--clip-bottom-left: 95%;
		--clip-bottom-right: 90%;
		clip-path: polygon(
			0 var(--clip-top-left),
			100% 0,
			100% var(--clip-bottom-right),
			0 var(--clip-bottom-left)
		);
		z-index: 0;

		@media (max-width: 768px) {
			--clip-top-left: 2%;
			--clip-bottom-left: 98%;
			--clip-bottom-right: 92%;
		}

		@media (max-width: 480px) {
			--clip-top-left: 1%;
			--clip-bottom-left: 99%;
			--clip-bottom-right: 94%;
		}
		&::before {
			content: '';
			position: absolute;
			inset: 0;
			background: rgba(0, 0, 0, 0.5);
		}
	}

	.cardGrid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: clamp(1rem, 3vw, 2rem);

		& article {
			background-color: color-mix(in oklab, var(--backgroundColor) 92%, black 8%);
			border: 1px solid color-mix(in oklab, var(--primaryColor) 35%, transparent);
			border-radius: 20px;
			padding: clamp(1.25rem, 3vw, 1.8rem);
			display: grid;
			gap: 0.75rem;
			box-shadow: 0 20px 36px color-mix(in oklab, black 50%, transparent);
			position: relative;

			&::before {
				content: '';
				position: absolute;
				inset: 0;
				border-radius: inherit;
				background: linear-gradient(
					150deg,
					color-mix(in oklab, var(--primaryColor) 25%, transparent),
					color-mix(in oklab, var(--backgroundColor) 95%, transparent)
				);
				opacity: 0.35;
			}

			& > * {
				position: relative;
				z-index: 1;
			}

			& h3 {
				margin: 0;
				font-size: clamp(1.2rem, 0.4vw + 1.1rem, 1.35rem);
				text-transform: uppercase;
				letter-spacing: 0.1em;
			}

			& p {
				margin: 0;
				color: color-mix(in oklab, var(--contrastColor) 85%, transparent);
			}

			& a {
				font-weight: 700;
				color: var(--accentColor);
			}
		}
	}

	.mediaSpotlight {
		display: grid;
		gap: clamp(1.5rem, 3vw, 3rem);
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		align-items: center;
		max-width: 1100px;
		margin: 0 auto clamp(3rem, 6vw, 5rem);
		padding: clamp(2rem, 6vw, 4rem) clamp(1.5rem, 5vw, 3rem);
		background: linear-gradient(
			160deg,
			color-mix(in oklab, var(--surfaceColor) 82%, transparent),
			color-mix(in oklab, var(--surfaceStrong) 70%, transparent)
		);
		border-radius: 28px;
		border: 1px solid color-mix(in oklab, var(--primaryColor) 35%, transparent);
		box-shadow: 0 28px 60px color-mix(in oklab, black 55%, transparent);

		& figure {
			margin: 0;
			border-radius: 24px;
			overflow: hidden;

			& img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
	}

	.events {
		& .sectionHeader {
			align-items: center;
			grid-template-columns: minmax(0, 1fr) auto;
			gap: clamp(1rem, 3vw, 2rem);
		}

		& .eventCard {
			background-color: color-mix(in oklab, var(--surfaceColor) 88%, black 12%);
			border-radius: 18px;
			border: 1px solid color-mix(in oklab, var(--primaryColor) 30%, transparent);
			padding: clamp(1.25rem, 3vw, 1.75rem);
			display: grid;
			gap: 0.5rem;
			margin-bottom: clamp(1rem, 2vw, 1.5rem);
			box-shadow: 0 18px 40px color-mix(in oklab, black 48%, transparent);

			& .eventDate {
				text-transform: uppercase;
				letter-spacing: 0.12em;
				font-size: 0.75rem;
				color: var(--accentColor);
			}
		}
	}

	.appBanner {
		max-width: 1100px;
		margin: 0 auto clamp(3rem, 6vw, 5rem);
		padding: clamp(1.75rem, 4vw, 2.5rem);
		background: linear-gradient(
			135deg,
			color-mix(in oklab, var(--primaryColor) 45%, transparent),
			color-mix(in oklab, var(--accentColor) 25%, transparent)
		);
		border-radius: 32px;
		display: grid;
		gap: 1rem;
		align-items: center;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		text-transform: uppercase;
		letter-spacing: 0.12em;
		box-shadow: 0 28px 60px color-mix(in oklab, black 55%, transparent);

		& p {
			text-transform: none;
			letter-spacing: normal;
			font-size: 0.95rem;
			color: color-mix(in oklab, var(--contrastColor) 90%, white 10%);
		}
	}

	.contactSection {
		& address {
			display: grid;
			gap: 0.5rem;
			font-style: normal;
			font-size: 0.95rem;
			letter-spacing: 0.08em;
			text-transform: uppercase;
		}
	}

	@media (max-width: 680px) {
		.events {
			& .sectionHeader {
				grid-template-columns: 1fr;
			}
		}
	}
</style>
