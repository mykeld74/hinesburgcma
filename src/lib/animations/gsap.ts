// SSR-safe GSAP loader and helpers
// NOTE: Always call these from the browser (e.g. inside $effect or onMount)
import type { GSAP } from 'gsap'

let gsapPromise: Promise<GSAP> | null = null

export async function getGsap(): Promise<GSAP> {
	if (typeof window === 'undefined') {
		throw new Error('GSAP can only be used in the browser')
	}
	if (!gsapPromise) {
		gsapPromise = import('gsap').then((m) => m.gsap)
	}
	return gsapPromise
}

export async function loadGsapWithPlugins(
	pluginNames: Array<'ScrollTrigger' | 'Draggable' | 'ScrollToPlugin' | 'Observer'>
): Promise<GSAP> {
	const gsap = await getGsap()
	const pluginsToLoad = await Promise.all(
		pluginNames.map(async (name) => {
			switch (name) {
				case 'ScrollTrigger':
					return (await import('gsap/ScrollTrigger')).ScrollTrigger
				case 'Draggable':
					return (await import('gsap/Draggable')).Draggable
				case 'ScrollToPlugin':
					return (await import('gsap/ScrollToPlugin')).ScrollToPlugin
				case 'Observer':
					return (await import('gsap/Observer')).Observer
			}
		})
	)
	gsap.registerPlugin(...pluginsToLoad)
	return gsap
}

export async function createTimeline(options?: Parameters<GSAP['timeline']>[0]) {
	const gsap = await getGsap()
	return gsap.timeline(options)
}

export type Gsap = Awaited<ReturnType<typeof getGsap>>


