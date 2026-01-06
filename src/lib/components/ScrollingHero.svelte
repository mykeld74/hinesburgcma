<script lang="ts">
	let { currentPage = 'kids' } = $props();
	import { onMount } from 'svelte';
	import {
		Kids1,
		Kids2,
		Kids3,
		Kids4,
		Kids5,
		Men1,
		Men2,
		Men3,
		Men4,
		Men5,
		Students1,
		Students2,
		Students3,
		Students4,
		Students5,
		Women1,
		Women2,
		Women3,
		Women4,
		Women5
	} from '$lib/assets';
	import Image from '$lib/components/Image.svelte';

	let pages = $state<string[]>([]);
	let logo = $state('');
	if (currentPage === 'kids') {
		pages = [Kids1, Kids2, Kids3, Kids4, Kids5];
		logo = 'logoKids';
	} else if (currentPage === 'students') {
		pages = [Students1, Students2, Students3, Students4, Students5];
		logo = 'logoStudents';
	} else if (currentPage === 'wow') {
		pages = [Women1, Women2, Women3, Women4, Women5];
		logo = 'WoW_Logo2025';
	} else if (currentPage === 'men') {
		pages = [Men1, Men2, Men3, Men4, Men5];
		logo = 'wmLogo';
	}

	let scrollers: Element[] = [];

	function addAnimation() {
		scrollers.forEach((scroller) => {
			scroller.setAttribute('data-animated', 'true');
			const scrollerInner = document.querySelector('.innerScroller');
			const scrollerInnerContent = Array.from(scrollerInner?.children || []);

			scrollerInnerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true);
				duplicatedItem.setAttribute('aria-hidden', 'true');
				scrollerInner?.appendChild(duplicatedItem);
			});
		});
	}

	onMount(() => {
		scrollers = Array.from(document.querySelectorAll('.scrollerContainer'));
		if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			addAnimation();
		}
	});
</script>

<div class="scrollerHero">
	<div class={`scrollerLogoContainer ${currentPage}`}>
		<Image source={logo} altTag="Banner Logo" />
	</div>
	<div class="scrollerContainer" data-animationSpeed="slow">
		<ul class="pages innerScroller">
			{#each pages as page}
				<li class="imgContainer">
					<img src={page} alt="Page {page}" />
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.scrollerHero {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		grid-template-areas: 'hero';
		place-items: center;
	}
	.scrollerContainer {
		width: 100%;
		overflow: hidden;
		padding-bottom: 1rem;
		grid-area: hero;
		height: 33vh;
	}
	.scrollerLogoContainer {
		grid-area: hero;
		width: clamp(150px, 30vw, 280px);

		z-index: 1;

		&.students {
			width: clamp(250px, 60vw, 650px);
			background: rgba(255, 255, 255, 0.75);
			padding: 1.45rem 2.5rem 0.5rem;
			border-radius: 300vw;
		}
		&.men {
			width: clamp(250px, 90vw, 800px);
			background: rgba(255, 255, 255, 0.75);
			padding: 1rem 2rem;
			border-radius: 300vw;
		}
	}

	.innerScroller {
		width: fit-content;
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		padding: 0;
		margin: 0;
		gap: var(--innerScrollGap);
		height: 100%;
	}
	:global(.scrollerContainer[data-animated]) {
		width: 100%;
		overflow: hidden;
		mask: linear-gradient(90deg, transparent, #fff 15%, #fff 85%, transparent);
		.innerScroller {
			flex-wrap: nowrap;
			animation: scroll var(--animationDuration, 10s) linear infinite;
		}
	}

	:global([data-animationSpeed='fast']) {
		--animationDuration: 20s;
	}
	:global([data-animationSpeed='slow']) {
		--animationDuration: 90s;
	}
	.imgContainer {
		width: max-content;
		flex-shrink: 0;
		img {
			box-shadow: 3px 3px 12px oklch(20% 0 0);
			height: 100%;
			width: auto;
		}
	}

	@keyframes scroll {
		to {
			transform: translateX(-50%);
		}
	}
</style>
