<script lang="ts">
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import '$lib/css/reset.css';
	import '$lib/css/styles.css';
	import favicon from '$lib/assets/favicon.svg';
	import iconSprite from '$lib/assets/icons-sprite.svg?raw';
	import Footer from '$lib/components/Footer.svelte';
	import Navigation from '$lib/components/Navigation.svelte';

	let { children, data } = $props();

	const pathname = $derived($page.url.pathname);
	const isHome = $derived(pathname === '/');

	const pageClass = $derived(pathname ? pathname.substring(pathname.lastIndexOf('/') + 1) : '');

	const prefersLight =
		typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: light)').matches;

	const storedTheme =
		typeof window !== 'undefined'
			? (window.localStorage.getItem('theme') as 'light' | 'dark' | null)
			: null;

	let theme = $state<'light' | 'dark'>(storedTheme ?? (prefersLight ? 'light' : 'dark'));

	$effect(() => {
		if (typeof document === 'undefined') return;

		document.body.classList.toggle('light-mode', theme === 'light');
		document.body.classList.toggle('dark-mode', theme === 'dark');

		if (typeof window !== 'undefined') {
			window.localStorage.setItem('theme', theme);
		}
	});

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
		rel="stylesheet"
	/>
	{@html iconSprite}
</svelte:head>

<Navigation {theme} onToggleTheme={toggleTheme} />
<div class="pageTransitionWrapper">
	{#key pathname}
		<main class:isHome class={pageClass}>
			{@render children()}
		</main>
	{/key}
</div>
<Footer />
