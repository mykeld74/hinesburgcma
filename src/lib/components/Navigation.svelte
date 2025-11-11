<script lang="ts">
	import logo from '$lib/assets/logo.webp';

	type NavItem = {
		label: string;
		href: string;
		description?: string;
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
				{ label: 'Serve', href: '/grow-with-us/serve/' },
				{ label: 'Baptism', href: '/grow-with-us/baptism/' },
				{ label: 'Groups', href: '/grow-with-us/groups/' },
				{ label: 'Membership', href: '/grow-with-us/membership/' }
			]
		},
		{
			label: 'Resources',
			items: [
				{ label: 'Sermons & Media', href: '/resources/sermons-media/' },
				{ label: 'Calendar', href: '/resources/calendar/' },
				{ label: 'Giving', href: '/resources/giving/' },
				{ label: 'CVU Parking', href: '/resources/cvu-parking/' },
				{ label: 'External Resources', href: '/resources/external-resources/' }
			]
		}
	];

	let isDrawerOpen = $state(false);
	let activeGroup = $state<NavGroup | null>(null);
	let dropdownPosition = $state({ left: 0, width: 0 });
	let navElement: HTMLElement | undefined;
	let hideTimeout: ReturnType<typeof setTimeout> | null = null;

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
	}

	function closeDrawer() {
		isDrawerOpen = false;
	}

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

	function scheduleHide() {
		cancelHide();
		hideTimeout = setTimeout(() => {
			activeGroup = null;
		}, 120);
	}

	function cancelHide() {
		if (!hideTimeout) return;
		clearTimeout(hideTimeout);
		hideTimeout = null;
	}

	function handleDesktopKeydown(event: KeyboardEvent, group: NavGroup) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			showGroup(group, event.currentTarget as HTMLElement);
		} else if (event.key === 'Escape') {
			event.preventDefault();
			activeGroup = null;
		}
	}

	function dropdownStyle() {
		const { left } = dropdownPosition;
		return `--anchor-left:${left}px`;
	}

	function toggleThemeMode() {
		onToggleTheme?.();
	}
</script>

<nav
	class="siteNav"
	bind:this={navElement}
	onpointerenter={cancelHide}
	onpointerleave={scheduleHide}
>
	<div class="navInner">
		<a class="brand" href="/" aria-label="Hinesburg CMA home">
			<img src={logo} alt="Hinesburg CMA logo" />
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
			onclick={toggleDrawer}
		>
			<span class="menuToggleLabel">Menu</span>
			<span class="menuToggleIcon" aria-hidden="true"></span>
		</button>
	</div>
	<div class:drawerOpen={isDrawerOpen} class="navDrawer" id="mobile-navigation">
		<div class="drawerContent">
			{#each navGroups as group}
				<section>
					<h2>{group.label}</h2>
					<ul>
						{#each group.items as item}
							<li>
								<a href={item.href} onclick={closeDrawer}>{item.label}</a>
							</li>
						{/each}
					</ul>
				</section>
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
	<div class="navBackdrop" aria-hidden="true" hidden={!isDrawerOpen} onclick={closeDrawer}></div>
	{#if activeGroup}
		<div
			class="dropdownPanel"
			style={dropdownStyle()}
			onpointerenter={cancelHide}
			onpointerleave={scheduleHide}
		>
			<div class="dropdownContent" aria-label={activeGroup?.label}>
				<ul>
					{#each activeGroup?.items ?? [] as item}
						<li>
							<a href={item.href}>{item.label}</a>
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

		& .navInner {
			display: grid;
			grid-template-columns: auto 1fr auto;
			align-items: center;
			gap: clamp(0.75rem, 2vw, 1.5rem);

			margin: 0 auto;
			padding: clamp(0.75rem, 1vw + 0.5rem, 1.25rem) clamp(1rem, 4vw, 2rem);
			position: relative;
			z-index: 2;
		}

		& .brand {
			display: inline-flex;
			align-items: center;
			gap: 0.75rem;
			font-weight: 700;
			color: var(--contrastColor);
			text-transform: uppercase;
			letter-spacing: 0.12em;

			& img {
				width: clamp(140px, 18vw, 160px);
				object-fit: contain;
				filter: drop-shadow(0 8px 12px color-mix(in oklab, black 65%, transparent));
			}
		}

		& .desktopGroups {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			gap: clamp(0.75rem, 2vw, 1.25rem);
			list-style: none;
			margin: 0;
			padding: 0;
			justify-self: end;

			& button {
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

		& .themeToggle {
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

			& .themeIcon {
				font-size: 0.95rem;
			}

			& .themeText {
				white-space: nowrap;
			}
		}

		& .menuToggle {
			display: none;
			align-items: center;
			gap: 0.5rem;
			padding: 0.5rem 0.75rem;
			border-radius: 999px;
			border: 1px solid color-mix(in oklab, var(--primaryColor) 35%, transparent);
			background: transparent;
			color: var(--contrastColor);
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.14em;
			font-size: 0.85rem;

			& .menuToggleIcon {
				position: relative;
				width: 18px;
				height: 14px;

				&,
				&::before,
				&::after {
					display: block;
					content: '';
					background-color: var(--contrastColor);
					border-radius: 2px;
					height: 2px;
					width: 18px;
				}

				&::before {
					position: absolute;
					top: 0;
				}

				&::after {
					position: absolute;
					bottom: 0;
				}
			}
		}

		& .navDrawer {
			position: fixed;
			inset: 0 0 0 auto;
			width: min(320px, 100%);
			height: 100%;
			transform: translateX(100%);
			transition: transform 0.3s ease;
			background-color: color-mix(in oklab, var(--backgroundColor) 96%, black 4%);
			z-index: 12;
			overflow-y: auto;

			&.drawerOpen {
				transform: translateX(0);
			}

			& .drawerContent {
				display: grid;
				padding: clamp(1.5rem, 4vw, 2rem);
				gap: 1.25rem;

				& h2 {
					font-size: 0.85rem;
					margin: 0 0 0.75rem;
					color: color-mix(in oklab, var(--contrastColor) 75%, transparent);
				}

				& ul {
					list-style: none;
					margin: 0;
					padding: 0;
					display: grid;
					gap: 0.4rem;
				}

				& a {
					color: var(--contrastColor);
					font-weight: 600;
					text-transform: uppercase;
					letter-spacing: 0.12em;
					font-size: 0.74rem;
				}
			}

			& .drawerFooter {
				margin-top: 1.5rem;

				& button {
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
				}
			}
		}

		& .navBackdrop {
			position: fixed;
			inset: 0;
			background-color: color-mix(in oklab, black 45%, transparent);
			z-index: 11;
		}

		@media (max-width: 960px) {
			& .navInner {
				grid-template-columns: auto auto;
				grid-template-rows: auto auto;
				gap: 0.75rem;
			}

			& .desktopGroups {
				display: none;
			}

			& .themeToggle {
				display: none;
			}

			& .menuToggle {
				display: inline-flex;
				justify-self: end;
			}
		}

		& .dropdownPanel {
			position: absolute;
			top: calc(100% + 12px);
			left: 0;
			width: 100%;
			padding: 0 clamp(1rem, 4vw, 1.5rem);
			display: flex;
			justify-content: center;
			pointer-events: auto;
			z-index: 1;
			transform: translateX(calc(var(--anchor-left) - 50%));

			& .dropdownContent {
				background: linear-gradient(
					150deg,
					color-mix(in oklab, var(--surfaceColor) 88%, transparent),
					color-mix(in oklab, var(--surfaceStrong) 70%, transparent)
				);
				border-radius: 28px;
				border: 1px solid color-mix(in oklab, var(--primaryColor) 28%, transparent);
				box-shadow: 0 28px 60px color-mix(in oklab, black 55%, transparent);
				min-width: clamp(260px, 32vw, 480px);
				padding: clamp(1.75rem, 3vw, 2.25rem);
				display: grid;
				gap: clamp(1rem, 2vw, 1.5rem);

				& ul {
					list-style: none;
					margin: 0;
					padding: 0;
					display: grid;
					gap: 0.55rem;

					& a {
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
