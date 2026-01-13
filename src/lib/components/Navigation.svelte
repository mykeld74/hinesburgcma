<script lang="ts">
	import { fly } from 'svelte/transition';
	import { tick } from 'svelte';
	import logo from '$lib/assets/logo.webp';
	import logoDark from '$lib/assets/logoDark.webp';

	type NavItem = {
		label: string;
		href: string;
		description?: string;
		target?: string;
	};

	type NavGroup = {
		label: string;
		items: NavItem[];
	};

	const navGroups: NavGroup[] = [
		{
			label: 'Visit Us',
			items: [
				{ label: 'Plan Your Visit', href: '/visit-us/plan-your-visit/' },
				{ label: 'Your Next Steps', href: '/visit-us/your-next-steps/' }
			]
		},
		{
			label: 'About Us',
			items: [
				{ label: 'Our Story', href: '/about-us/our-story/' },
				{ label: 'Our Beliefs', href: '/about-us/our-beliefs/' },
				{ label: 'Our Leadership', href: '/about-us/our-leadership/' },
				{ label: 'Our Campus', href: '/about-us/our-campus/' },
				{ label: 'Contact Us', href: '/about-us/contact-us/' }
			]
		},
		{
			label: 'Ministry Areas',
			items: [
				{ label: 'Kids', href: '/ministry-areas/kids/' },
				{ label: 'Students', href: '/ministry-areas/students/' },
				{ label: 'Young Adults', href: '/ministry-areas/young-adults/' },
				{ label: 'Adults', href: '/ministry-areas/adults/' },
				{ label: 'Missions', href: '/ministry-areas/missions/' },
				{ label: 'Prayer & Care', href: '/ministry-areas/prayer-care/' }
			]
		},
		{
			label: 'Grow With Us',
			items: [
				{ label: 'Follow', href: '/grow-with-us/follow/' },
				{ label: 'Baptism', href: '/grow-with-us/baptism/' },
				{ label: 'Share', href: '/grow-with-us/share/' },
				{ label: 'Groups', href: '/grow-with-us/groups/' },
				{ label: 'Serve', href: '/grow-with-us/serve/' },
				{ label: 'Membership', href: '/grow-with-us/membership/' }
			]
		},
		{
			label: 'Resources',
			items: [
				{ label: 'Calendar', href: '/resources/calendar/' },
				{ label: 'Giving', href: '/resources/giving/' },
				{ label: 'CVU Parking', href: '/resources/cvu-parking/' },
				{ label: 'External Resources', href: '/resources/external-resources/' },
				{
					label: 'CAC App Login',
					href: 'https://communityalliancechurch.churchcenter.com/',
					target: '_blank'
				}
			]
		}
	];

	let isDrawerOpen = $state(false);
	let activeGroup = $state<NavGroup | null>(null);
	let dropdownPosition = $state({ left: 0, width: 0 });
	let navElement: HTMLElement | undefined;
	let hideTimeout: ReturnType<typeof setTimeout> | null = null;
	let innerWidth = $state(typeof window !== 'undefined' ? window.innerWidth : 1110);
	const isMobile = $derived(innerWidth < 1110);

	type NavigationProps = {
		theme?: 'light' | 'dark';
		onToggleTheme?: () => void;
	};

	const props = $props();
	let theme = $state<'light' | 'dark'>('dark');
	let onToggleTheme: (() => void) | undefined;
	let themeToggleLabel = $state('Switch to light mode');

	$effect(() => {
		const { theme: incomingTheme, onToggleTheme: incomingToggle } = props as NavigationProps;
		theme = incomingTheme ?? 'dark';
		onToggleTheme = incomingToggle;
		themeToggleLabel = theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
	});

	function toggleDrawer() {
		isDrawerOpen = !isDrawerOpen;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = isDrawerOpen ? 'hidden' : '';
		}
	}

	function closeDrawer() {
		isDrawerOpen = false;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}

	function checkIsMobile() {
		if (innerWidth < 1110) {
			// Mobile view
		} else {
			// Desktop view - ensure drawer is closed
			if (isDrawerOpen) {
				closeDrawer();
			}
		}
	}

	function cancelHide() {
		if (hideTimeout) {
			clearTimeout(hideTimeout);
			hideTimeout = null;
		}
	}

	let isDropdownVisible = $state(false);
	let shouldRenderDropdown = $state(false);

	$effect(() => {
		if (activeGroup) {
			shouldRenderDropdown = true;
			isDropdownVisible = false;
			// Small delay to ensure initial state is rendered before transition
			tick().then(() => {
				setTimeout(() => {
					isDropdownVisible = true;
				}, 10);
			});
		} else {
			// Start exit animation
			isDropdownVisible = false;
			// Remove from DOM after animation completes
			setTimeout(() => {
				shouldRenderDropdown = false;
			}, 200);
		}
	});

	function showGroup(group: NavGroup, trigger: HTMLElement) {
		cancelHide();
		const navRect = navElement?.getBoundingClientRect();
		if (!navRect) return;
		const triggerRect = trigger.getBoundingClientRect();
		dropdownPosition = {
			left: triggerRect.left - navRect.left + triggerRect.width / 2,
			width: triggerRect.width
		};
		activeGroup = group;
	}

	function handlePointerLeave(event: PointerEvent) {
		if (!activeGroup) return;

		const relatedTarget = event.relatedTarget as HTMLElement | null;

		// Don't close if pointer is moving to dropdown or another nav button
		if (relatedTarget) {
			const isMovingToDropdown = relatedTarget.closest('.dropdownPanel');
			const isMovingToNavButton = relatedTarget.closest('.desktopGroups button');

			if (isMovingToDropdown || isMovingToNavButton) {
				cancelHide();
				return;
			}
		}

		// Schedule close with 200ms delay
		scheduleHide();
	}

	function scheduleHide() {
		cancelHide();
		hideTimeout = setTimeout(() => {
			hideTimeout = null;
			if (activeGroup) {
				activeGroup = null;
			}
		}, 200);
	}

	function closeDropdown() {
		cancelHide();
		activeGroup = null;
	}

	function handleDropdownLinkClick() {
		closeDropdown();
	}

	function handleDesktopKeydown(event: KeyboardEvent, group: NavGroup) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			showGroup(group, event.currentTarget as HTMLElement);
		} else if (event.key === 'Escape') {
			event.preventDefault();
			closeDropdown();
		}
	}

	function dropdownStyle() {
		const { left } = dropdownPosition;
		return `--anchor-left:${left}px`;
	}

	function toggleThemeMode() {
		onToggleTheme?.();
	}

	const logoImg = $derived(theme === 'dark' ? logo : logoDark);

	$effect(() => {
		if (typeof document !== 'undefined' && isDrawerOpen) {
			document.body.style.overflow = 'hidden';
		} else if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	});

	// Close dropdown when clicking outside
	$effect(() => {
		if (!activeGroup) return;

		function handleClickOutside(event: MouseEvent) {
			const target = event.target as HTMLElement;
			if (!target) return;

			// Check if click is outside both nav and dropdown
			const clickedNav = navElement?.contains(target);
			const clickedDropdown = target.closest('.dropdownPanel');
			const clickedNavButton = target.closest('.desktopGroups button');

			// Don't close if clicking on nav buttons (they should open their own dropdowns)
			if (clickedNavButton) {
				return;
			}

			// Close if clicking outside both nav and dropdown
			if (!clickedNav && !clickedDropdown) {
				closeDropdown();
			}
		}

		document.addEventListener('mousedown', handleClickOutside, true);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside, true);
		};
	});
</script>

<svelte:window bind:innerWidth onresize={checkIsMobile} />

<nav
	class="siteNav"
	bind:this={navElement}
	onpointerenter={cancelHide}
	onpointerleave={(e) => handlePointerLeave(e)}
>
	<div class="navInner">
		<a class="brand" href="/" aria-label="Community Alliance Church - Hinesburg home">
			<img src={logoImg} alt="Community Alliance Church - Hinesburg logo" />
		</a>

		<ul class="desktopGroups" aria-label="Primary sections">
			{#each navGroups as group}
				<li>
					<button
						type="button"
						aria-expanded={activeGroup?.label === group.label}
						onmouseenter={(event) => showGroup(group, event.currentTarget as HTMLElement)}
						onfocus={(event) => showGroup(group, event.currentTarget as HTMLElement)}
						onclick={(event) => showGroup(group, event.currentTarget as HTMLElement)}
						onkeydown={(event) => handleDesktopKeydown(event, group)}
					>
						{group.label}
					</button>
				</li>
			{/each}
		</ul>
		<button
			class="themeToggle"
			type="button"
			aria-label={themeToggleLabel}
			onclick={toggleThemeMode}
		>
			<span class="themeIcon" aria-hidden="true">{theme === 'light' ? '☾' : '☀︎'}</span>
			<span class="themeText">{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
		</button>

		<button
			class="menuToggle"
			type="button"
			aria-controls="mobile-navigation"
			aria-expanded={isDrawerOpen}
			aria-label="Toggle mobile menu"
			onclick={toggleDrawer}
		>
			<div class="hamburger" class:active={isDrawerOpen}>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</button>
	</div>
	{#if isDrawerOpen}
		<div
			class="mobileNavOverlay"
			role="button"
			tabindex="0"
			aria-label="Close mobile menu"
			onclick={closeDrawer}
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					closeDrawer();
				}
			}}
		>
			<div
				class="navDrawer"
				id="mobile-navigation"
				role="dialog"
				aria-modal="true"
				tabindex="0"
				transition:fly={{ x: 400, duration: 300 }}
				onclick={(e) => e.stopPropagation()}
				onkeydown={(e) => {
					if (e.key === 'Escape') {
						closeDrawer();
					}
					e.stopPropagation();
				}}
			>
				<div class="mobileNavHeader">
					<a href="/" onclick={closeDrawer}>
						<img src={logoImg} alt="Community Alliance Church - Hinesburg logo" />
					</a>
				</div>
				<div class="drawerContent">
					{#each navGroups as group}
						<div class="mobileNavSection">
							<h3 class="mobileNavLabel">{group.label}</h3>
							<ul class="mobileNavLinks">
								{#each group.items as item}
									<li>
										<a
											href={item.href}
											target={item.target}
											data-sveltekit-preload-data={item.href === '/resources/calendar/'
												? ''
												: undefined}
											onclick={closeDrawer}
										>
											{item.label}
										</a>
									</li>
								{/each}
							</ul>
						</div>
					{/each}
					<div class="drawerFooter">
						<button
							type="button"
							onclick={() => {
								toggleThemeMode();
								closeDrawer();
							}}
						>
							Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
	{#if shouldRenderDropdown}
		<div
			class="dropdownPanel"
			class:active={isDropdownVisible}
			style={dropdownStyle()}
			onpointerenter={cancelHide}
			onpointerleave={(e) => handlePointerLeave(e)}
		>
			<div class="dropdownContent" aria-label={activeGroup?.label}>
				<ul>
					{#each activeGroup?.items ?? [] as item}
						<li>
							<a
								href={item.href}
								target={item.target}
								data-sveltekit-preload-data={item.href === '/resources/calendar/' ? '' : undefined}
								onclick={handleDropdownLinkClick}
							>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}
</nav>

<style>
	.siteNav {
		position: sticky;
		top: 0;
		z-index: 15;
		backdrop-filter: blur(18px);
		background: linear-gradient(
			180deg,
			color-mix(in oklab, var(--surfaceStrong) 88%, transparent) 0%,
			color-mix(in oklab, var(--surfaceStrong) 78%, transparent) 100%
		);
		border-bottom: 1px solid color-mix(in oklab, var(--primaryColor) 28%, transparent);
		box-shadow: 0 22px 48px color-mix(in oklab, black 55%, transparent);

		.navInner {
			display: grid;
			grid-template-columns: auto 1fr auto;
			align-items: center;
			gap: clamp(0.75rem, 2vw, 1.5rem);

			margin: 0 auto;
			padding: clamp(0.75rem, 1vw + 0.5rem, 1.25rem) clamp(1rem, 4vw, 2rem);
			position: relative;
			z-index: 2;
		}

		.brand {
			display: inline-flex;
			align-items: center;
			gap: 0.75rem;
			font-weight: 700;
			color: var(--contrastColor);
			text-transform: uppercase;
			letter-spacing: 0.12em;

			img {
				width: clamp(140px, 18vw, 160px);
				object-fit: contain;
			}
		}

		.desktopGroups {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			gap: clamp(0.75rem, 2vw, 1.25rem);
			list-style: none;
			margin: 0;
			padding: 0;
			justify-self: end;

			button {
				display: inline-flex;
				align-items: center;
				position: relative;
				gap: 0.5rem;
				padding: 0.55rem 0.75rem;
				border: none;
				background: transparent;
				color: color-mix(in oklab, var(--contrastColor) 96%, white 4%);
				text-transform: uppercase;
				letter-spacing: 0.16em;
				font-size: 0.95rem;
				font-weight: 600;
				cursor: pointer;
				transition: color 0.15s ease;

				&::after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: -0.35rem;
					width: 0;
					height: 2px;
					background: var(--accentColor);
					border-radius: 4px;
					transform: translateX(-50%);
					transition: width 0.2s ease;
				}

				&:hover,
				&:focus-visible,
				&[aria-expanded='true'] {
					color: var(--accentColor);

					&::after {
						width: 32px;
					}
				}
			}
		}

		.themeToggle {
			display: inline-flex;
			align-items: center;
			gap: 0.45rem;
			padding: 0.55rem 0.9rem;
			border-radius: 999px;
			border: 1px solid color-mix(in oklab, var(--contrastColor) 25%, transparent);
			background: color-mix(in oklab, var(--surfaceColor) 88%, black 12%);
			color: color-mix(in oklab, var(--contrastColor) 94%, white 6%);
			font-size: 0.68rem;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.16em;
			cursor: pointer;
			transition:
				transform 0.2s ease,
				box-shadow 0.2s ease,
				background-color 0.2s ease;

			&:hover,
			&:focus-visible {
				transform: translateY(-2px);
				box-shadow: 0 12px 22px color-mix(in oklab, black 45%, transparent);
			}

			.themeIcon {
				font-size: 0.95rem;
			}

			.themeText {
				white-space: nowrap;
			}
		}

		.menuToggle {
			display: none;
			position: fixed;
			top: 1rem;
			right: 1.5rem;
			z-index: 1000;
			background: none;
			border: none;
			cursor: pointer;
			padding: 0.5rem;

			.hamburger {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				width: 24px;
				height: 18px;

				span {
					display: block;
					width: 100%;
					height: 2px;
					background-color: var(--contrastColor);
					transition: all 0.3s ease-in-out;
				}

				&.active span:nth-child(1) {
					transform: translateY(8px) rotate(45deg);
				}

				&.active span:nth-child(2) {
					opacity: 0;
				}

				&.active span:nth-child(3) {
					transform: translateY(-8px) rotate(-45deg);
				}
			}
		}

		@media (max-width: 960px) {
			.navInner {
				grid-template-columns: auto auto;
				grid-template-rows: auto auto;
				gap: 0.75rem;
			}

			.desktopGroups {
				display: none;
			}

			.themeToggle {
				display: none;
			}

			.menuToggle {
				display: inline-flex;
				justify-self: end;
			}
		}

		.dropdownPanel {
			position: absolute;
			top: calc(100% + 12px);
			left: 0;
			width: fit-content;
			max-width: 100%;
			padding: 0;
			display: flex;
			justify-content: center;
			pointer-events: auto;
			z-index: 1;
			opacity: 0;
			transform: translateX(calc(var(--anchor-left) - 50%)) scale(0.6);
			transform-origin: center top;
			transition:
				opacity 0.2s ease,
				transform 0.2s ease;

			&.active {
				opacity: 1;
				transform: translateX(calc(var(--anchor-left) - 50%)) scale(1);
			}

			.dropdownContent {
				background: linear-gradient(
					150deg,
					color-mix(in oklab, var(--surfaceColor) 96%, transparent),
					color-mix(in oklab, var(--surfaceStrong) 80%, transparent)
				);
				border-radius: 28px;
				border: 1px solid color-mix(in oklab, var(--primaryColor) 28%, transparent);
				box-shadow: 0 28px 60px color-mix(in oklab, black 55%, transparent);
				min-width: clamp(260px, 32vw, 480px);
				padding: clamp(1.75rem, 3vw, 2.25rem);
				display: grid;
				gap: clamp(1rem, 2vw, 1.5rem);
				margin-top: 0;

				ul {
					list-style: none;
					margin: 0;
					padding: 0;
					display: grid;
					gap: 0.55rem;

					a {
						display: inline-flex;
						align-items: center;
						justify-content: space-between;
						padding: 0.6rem 0;
						color: color-mix(in oklab, var(--contrastColor) 92%, white 8%);
						font-weight: 600;
						text-transform: uppercase;
						letter-spacing: 0.14em;
						font-size: 0.95rem;
						border-bottom: 1px solid color-mix(in oklab, var(--contrastColor) 12%, transparent);
						transition:
							color 0.15s ease,
							letter-spacing 0.15s ease;

						&:hover {
							color: var(--accentColor);
							letter-spacing: 0.18em;
						}
					}
				}
			}

			@media (max-width: 960px) {
				display: none;
			}
		}
	}

	.mobileNavOverlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999;
	}

	.navDrawer {
		position: fixed;
		top: 0;
		right: 0;
		width: 100%;
		height: 100vh;
		background-color: color-mix(in oklab, var(--backgroundColor) 96%, black 4%);
		padding: 1rem 1rem 10rem 2rem;
		overflow-y: auto;
		z-index: 1000;
	}

	.mobileNavHeader {
		max-width: 100px;
		margin: 0 auto;
		margin-bottom: 2rem;

		img {
			width: 100%;
			height: auto;
			object-fit: contain;
		}
	}

	.drawerContent {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.mobileNavSection {
		border-bottom: 1px solid color-mix(in oklab, var(--contrastColor) 12%, transparent);
		padding-bottom: 1rem;
	}

	.mobileNavLabel {
		font-size: 1.4rem;
		font-weight: 700;
		margin-bottom: 1rem;
		color: var(--contrastColor);
		text-decoration: underline;
	}

	.mobileNavLinks {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 0.75rem;

		li {
			margin-bottom: 0;
		}

		a {
			color: var(--contrastColor);

			text-decoration: none;
			font-size: 1.2em;
			display: block;
			padding: 0;
			transition: color 0.3s ease;

			&:hover {
				color: var(--accentColor);
			}
		}
	}

	.drawerFooter {
		margin-top: 1.5rem;

		button {
			width: 100%;
			padding: 0.8rem 1rem;
			border-radius: 999px;
			border: 1px solid color-mix(in oklab, var(--primaryColor) 35%, transparent);
			background: color-mix(in oklab, var(--surfaceColor) 92%, black 8%);
			color: color-mix(in oklab, var(--contrastColor) 90%, white 10%);
			font-size: 0.74rem;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.16em;
			cursor: pointer;
		}
	}

	:global(body.light-mode) .siteNav {
		background: linear-gradient(
			180deg,
			color-mix(in oklab, var(--surfaceColor) 96%, white 4%) 0%,
			color-mix(in oklab, var(--surfaceColor) 88%, white 12%) 100%
		);
		border-bottom: 1px solid color-mix(in oklab, var(--primaryColor) 22%, white 10%);
		box-shadow: 0 18px 32px color-mix(in oklab, black 20%, transparent);
	}

	:global(body.light-mode) .siteNav .themeToggle {
		background: color-mix(in oklab, white 85%, var(--surfaceColor) 15%);
		color: color-mix(in oklab, var(--contrastColor) 75%, black 8%);
		border-color: color-mix(in oklab, var(--contrastColor) 12%, transparent);
	}
</style>
