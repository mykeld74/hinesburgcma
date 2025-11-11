# Hinesburg CMA Web Experience

SvelteKit-powered redesign of [Hinesburg CMA](https://hinesburgcma.org/), mirroring the bold, high-contrast storytelling of Real Life Church Sacramento while honoring the church’s existing color system and brand language.

## Features

- **Svelte 5 runes syntax** with GSAP integration for section reveals and micro-interactions.
- **Responsive navigation** with desktop hover “mega” dropdowns, mobile drawer, and light/dark theme toggle (state saved in `localStorage`).
- **Homepage hero revamp** featuring location callouts, service badge, and app promo modeled after RLCS aesthetics.
- **Route scaffolding** for all ministries, next steps, and resources with shared `sectionSurface` styling to keep content consistent.
- **Cloudinary-ready media slots** for hero and section imagery, including a drone shot background in the hero.
- **Light mode** support via CSS custom properties and body class toggles.

## Local Development

Install dependencies with your preferred package manager (pnpm recommended):

```sh
pnpm install
```

Start the dev server at `http://localhost:5173`:

```sh
pnpm dev
```

For a production build and preview:

```sh
pnpm build
pnpm preview
```

## Project Structure Highlights

- `src/routes/+layout.svelte` – injects global styles, fonts, navigation, and footer with theme management.
- `src/lib/components/Navigation.svelte` – anchor-position dropdown navigation and theme toggle.
- `src/lib/css/styles.css` – global tokens (`--primaryColor`, etc.), shared section utilities, and light-mode overrides.
- `src/routes/+page.svelte` – homepage content sections (hero, service strip, events, community highlights, next-gen).
- `src/routes/*` – content pages for Visit Us, About Us, Ministry Areas, Grow With Us, and Resources.

## Tooling & Conventions

- SvelteKit + Vite
- TypeScript enabled (`lang="ts"`)
- Prettier/ESLint (tab indentation, single quotes, 100-char width)
- pnpm workspace
- Cloudinary-ready image URLs
- No Tailwind (custom CSS + CSS variables)

## Deployment

Add the appropriate SvelteKit adapter for your hosting target (e.g., Vercel, Netlify, Cloudflare workers). Then follow your provider’s deployment flow using the production build output from `pnpm build`. For static asset caching of Cloudinary images, ensure proper cache headers or transformations on the CDN.
