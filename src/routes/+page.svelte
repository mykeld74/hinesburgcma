<script lang="ts">
	import { useGsap } from '$lib/actions/gsap';
	import type { Gsap } from '$lib/animations/gsap';
	import Icon from '$lib/components/Icon.svelte';
	import PortableText from '$lib/components/PortableText.svelte';
	import SanityModal from '$lib/components/SanityModal.svelte';
	import type { PortableTextBlock } from '@portabletext/types';

	let { data } = $props();

	const banner =
		data.bannerContent && data.bannerContent.length > 0 ? (data.bannerContent[0] as Banner) : null;
	const modal =
		data.modalContent && data.modalContent.length > 0 ? (data.modalContent[0] as Modal) : null;

	type Banner = {
		_id: string;
		_type: string;
		title?: string;
		content?: PortableTextBlock[];
		enabled?: boolean;
		startDate?: string;
		endDate?: string;
		_updatedAt?: string;
		_createdAt?: string;
	};

	type ContentBlock = {
		_type: string;
		_key: string;
		content?: PortableTextBlock[];
		imageUrl?: string;
		[key: string]: unknown;
	};

	type Modal = {
		_id: string;
		_type: string;
		title?: string;
		content?: PortableTextBlock[];
		imageUrl?: string;
		contentBlocks?: ContentBlock[];
		enabled?: boolean;
		startDate?: string;
		endDate?: string;
		_updatedAt?: string;
		_createdAt?: string;
		[key: string]: unknown;
	};

	type CardLink = {
		title: string;
		description: string;
		href: string;
		icon?:
			| 'church'
			| 'group'
			| 'youtube'
			| 'church1'
			| 'church2'
			| 'church3'
			| 'group1'
			| 'group2'
			| 'group3'
			| 'youtube1'
			| 'youtube2'
			| 'youtube3'
			| 'youtube4';
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
				'Programming for <a href="/ministry-areas/kids/">kids</a> and <a href="/ministry-areas/students/">teens</a> before or during the service!  Check out the links for specifics.',
			href: '/ministry-areas/kids/'
		},
		{
			title: 'Still Have Questions?',
			description:
				'Our <a href="/visit-us/plan-your-visit/">Plan Your Visit</a> guide walks through what to expect before, during, and after your Sunday experience.',
			href: '/visit-us/plan-your-visit/'
		}
	];

	const pathwayCards: CardLink[] = [
		{
			title: 'Find Out What We Believe',
			icon: 'church',
			description: '',
			href: '/about-us/our-beliefs/'
		},
		{
			title: 'What Are Small Groups?',
			icon: 'group2',
			description: '',
			href: '/grow-with-us/groups/'
		},
		{
			title: 'Watch Us on YouTube',
			icon: 'youtube3',
			description: '',
			href: 'https://www.youtube.com/@HinesburgCAC'
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
		content="Community Alliance Church in Hinesburg, Vermont. A multi-generational church family practicing the way of Jesus together. Join us Sundays at 10:30am at 190 Pond Road. Find hope, community, and purpose."
	/>
</svelte:head>

<header class="hero">
	<div class="heroContent">
		<span class="eyebrow">Get to Know CAC</span>
		<h1 use:useGsap={{ init: cardsIn }}>
			A CHURCH FOR <span class="highlight">REAL</span>  LIFE...
		</h1>
		<p>
			Helping <span class="highlight">real</span> people find <span class="highlight">real</span>
			faith by serving our <span class="highlight">real</span> neighbors, sending hope to the world,
			and discovering the <span class="highlight">real</span> Jesus.
		</p>
		<div class="heroActions">
			<a class="primaryCta" href="/visit-us/plan-your-visit/">Plan Your Visit</a>
			<a class="secondaryCta" href="https://www.youtube.com/@HinesburgCAC/streams" target="_blank">
				Watch On YouTube
			</a>
		</div>
	</div>
</header>

{#if banner && banner.content}
	<section class="sanityBanner" aria-labelledby="banner-{banner._id}">
		<div class="bannerContent">
			<div class="bannerText">
				<PortableText content={banner.content} />
			</div>
		</div>
	</section>
{/if}

<div class="expectationsContainer">
	<section class="expectations" aria-labelledby="expectations-heading">
		<div class="sectionSurface">
			<div class="sectionHeader sectionSurfaceChild">
				<h2 id="expectations-heading" class="sectionSurfaceChild">What to Expect</h2>
				<p class="sectionHeaderText sectionSurfaceChild">
					Whether it is your first Sunday or a return visit, you can feel at home at Community
					Alliance Church - Hinesburg.
				</p>
			</div>
			<div class="cardGrid">
				{#each expectationCards as card, index}
					<article
						use:useGsap={{ init: (gsap: Gsap, node: HTMLElement) => cardsIn(gsap, node, index) }}
					>
						<h3>{card.title}</h3>
						<p>{@html card.description}</p>
					</article>
				{/each}
			</div>
		</div>
	</section>
</div>

<div class="pathwaysContainer">
	<section class="pathways" aria-labelledby="pathways-heading">
		<div class="sectionSurface">
			<div class="sectionHeader sectionSurfaceChild">
				<h2 id="pathways-heading" class="sectionSurfaceChild">Get to Know CAC</h2>
			</div>
			<div class="cardGrid pathways">
				{#each pathwayCards as card, index}
					<a href={card.href} class="pathwayLink">
						<article
							use:useGsap={{ init: (gsap: Gsap, node: HTMLElement) => cardsIn(gsap, node, index) }}
						>
							{#if card.icon}
								<div class="iconWrapper">
									<Icon name={card.icon} size={48} />
								</div>
							{/if}
							<h3>{card.title}</h3>
							<p>{card.description}</p>
							<p class="exploreLink">Explore</p>
						</article>
					</a>
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
				Miss a weekend or want to revisit a teaching? Visit our YouTube channel to watch all our
				services.
			</p>
			<div class="heroActions">
				<a class="secondaryCta" href="https://www.youtube.com/@HinesburgCAC">YouTube Channel</a>
			</div>
		</div>
	</div>
	<div class="imageContainer"></div>
</section>
<section class="appBanner" aria-labelledby="app-heading">
	<div>
		<h2 id="app-heading">Get the CAC App</h2>
		<p>Stay up to date on events, sign-ups, sermons, and so much more!</p>
	</div>
	<div class="appButtons">
		<a class="appButton" href="https://apps.apple.com/us/app/church-center-app/id1357742931">
			<div class="appButtonIcon">
				<img
					src="https://res.cloudinary.com/de6fzsubp/image/upload/v1767027341/appleLogo"
					alt="Apple Logo"
				/>
			</div>
			<div class="appButtonText">
				<p class="appButtonText1 appleStore">Download on the</p>
				<p class="appButtonText2">App Store</p>
			</div>
		</a>
		<a class="appButton" href="https://play.google.com/store/search?q=church+center&c=apps">
			<div class="appButtonIcon">
				<img
					src="https://res.cloudinary.com/de6fzsubp/image/upload/v1767027341/playStore"
					alt="Google Logo"
				/>
			</div>
			<div class="appButtonText">
				<p class="appButtonText1 googlePlay">Get it on</p>
				<p class="appButtonText2">Google Play</p>
			</div>
		</a>
	</div>
</section>

<div class="churchCenterLinkWrapper">
	<a href="https://communityalliancechurch.churchcenter.com/home" target="_blank">
		<p class="churchCenterLinkTitle">CAC App Login</p>
		<div class="churchCenterLinkArrow">
			<svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M399.521 250.13C400.172 257.729 397.589 265.554 391.774 271.37L316.012 347.131C305.552 357.591 288.592 357.591 278.131 347.131C267.671 336.67 267.671 319.711 278.131 309.25L310.596 276.786L116.071 276.786C101.278 276.786 89.2853 264.793 89.2853 250C89.2853 235.207 101.278 223.214 116.071 223.214L310.333 223.214L278.131 191.013C267.671 180.552 267.671 163.592 278.131 153.132C288.592 142.671 305.551 142.671 316.012 153.132L391.773 228.893C397.588 234.708 400.17 242.531 399.521 250.13Z"
					class="churchCenterLinkArrowPath"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M0 250C0 111.929 111.929 0 250 0C388.071 0 500 111.929 500 250C500 388.071 388.071 500 250 500C111.929 500 0 388.071 0 250ZM12 250C12 118.556 118.556 12 250 12C381.444 12 488 118.556 488 250C488 381.444 381.444 488 250 488C118.556 488 12 381.444 12 250Z"
					class="churchCenterLinkArrowPath"
				/>
			</svg>
		</div>
	</a>
</div>

{#if modal}
	<SanityModal {modal} />
{/if}

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

		.heroContent {
			position: relative;
			max-width: 980px;
			display: grid;
			gap: clamp(1rem, 2vw, 1.6rem);
			color: #fff;

			h1 {
				font-size: clamp(2.25rem, 1.8vw + 1.8rem, 3.2rem);
				margin: 0;
				line-height: 1.1;
				text-transform: uppercase;
				letter-spacing: 0.1em;
			}

			p {
				margin: clamp(0.75rem, 1.2vw, 1rem) 0 clamp(1.25rem, 2vw, 1.75rem);
				max-width: 48ch;
				font-size: clamp(1.05rem, 0.5vw + 1rem, 1.2rem);
			}

			.eyebrow {
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
	.pathways {
		position: relative;
		max-width: 1100px;
		margin: 0 auto clamp(3rem, 6vw, 5rem);
		z-index: 5;
	}
	.expectationsContainer {
		padding: 0;
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
		color: #fff;

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

	.pathwayLink {
		transition: scale 0.3s ease-in-out;
		text-decoration: none;
		&:hover {
			scale: 1.02;
			text-decoration: none;
		}
	}

	.cardGrid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: clamp(1rem, 3vw, 2rem);

		&.pathways {
			grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		}

		article {
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

			> * {
				position: relative;
				z-index: 1;
			}

			.iconWrapper {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 0.5rem;
				color: var(--accentColor);
			}

			h3 {
				margin: 0;
				font-size: clamp(1.2rem, 0.4vw + 1.1rem, 1.35rem);
				text-transform: uppercase;
				letter-spacing: 0.1em;
				color: color-mix(in oklab, var(--contrastColor) 85%, transparent);
			}

			p {
				margin: 0;
				color: color-mix(in oklab, var(--contrastColor) 85%, transparent);
				&.exploreLink {
					color: var(--accentColor);
				}
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
		padding: 0;
		background: linear-gradient(
			160deg,
			color-mix(in oklab, var(--surfaceColor) 82%, transparent),
			color-mix(in oklab, var(--surfaceStrong) 70%, transparent)
		);
		border-radius: 28px;
		border: 1px solid color-mix(in oklab, var(--primaryColor) 35%, transparent);
		box-shadow: 0 28px 60px color-mix(in oklab, black 55%, transparent);
		overflow: clip;
		.imageContainer {
			height: 100%;
			aspect-ratio: 1/1;
			background: url('https://res.cloudinary.com/de6fzsubp/image/upload/v1762883178/servicefromtheback')
				no-repeat center center / cover;
		}
	}
	.mediaContent {
		padding: clamp(2rem, 6vw, 4rem) clamp(1.5rem, 5vw, 3rem);
	}

	.events {
		.sectionHeader {
			align-items: center;
			grid-template-columns: minmax(0, 1fr) auto;
			gap: clamp(1rem, 3vw, 2rem);
		}

		.eventCard {
			/* background-color: color-mix(in oklab, var(--surfaceColor) 88%, black 12%); */
			border-radius: 18px;
			border: 1px solid color-mix(in oklab, var(--primaryColor) 30%, transparent);
			padding: clamp(1.25rem, 3vw, 1.75rem);
			display: grid;
			gap: 0.5rem;
			margin-bottom: clamp(1rem, 2vw, 1.5rem);
			box-shadow: 0 18px 40px color-mix(in oklab, black 48%, transparent);

			.eventDate {
				text-transform: uppercase;
				letter-spacing: 0.12em;
				font-size: 0.95rem;
				font-weight: 700;
				color: var(--accentColor);
			}
		}
	}

	.appBanner {
		max-width: 900px;
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

		p {
			text-transform: none;
			letter-spacing: normal;
			font-size: 0.95rem;

			&.appButtonText1 {
				font-size: 0.85rem;
				margin: 0;
			}
			&.appleStore {
				text-transform: uppercase;
				font-size: 0.75rem;
			}
			&.googlePlay {
				font-size: 0.9rem;
			}
			&.appButtonText2 {
				font-weight: 700;
				font-size: 1.6rem;
				margin: 0;
				line-height: 1;
			}
		}
		@media (max-width: 900px) {
			border-radius: 0;
		}
	}

	.appButtons {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		justify-content: center;
		align-items: center;
	}
	.appButton {
		display: grid;
		grid-template-columns: fit-content(32px) 1fr;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		border-radius: 999px;
		background-color: #fff;
		width: 215px;
		transition: translate 0.3s ease-in-out;
		&:hover {
			text-decoration: none;
			translate: 0 -2px;
		}
	}
	.appButtonIcon {
		width: 32px;
		aspect-ratio: 1/1;
		display: grid;
		place-items: center;
	}
	.appButtonText {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr;
		color: #000;
	}

	.bannerContent {
		display: grid;
		gap: 1rem;
	}
	.highlight {
		color: var(--accentColor);
		font-weight: 700;
	}
</style>
