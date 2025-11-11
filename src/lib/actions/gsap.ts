// Svelte action to run GSAP code on an element safely in the browser
import type { Action } from 'svelte/action'
import type { GSAP } from 'gsap'
import { getGsap } from '$lib/animations/gsap'

export type GsapActionParams = { init: (gsap: GSAP, node: HTMLElement) => void | (() => void) }

export const useGsap: Action<HTMLElement, GsapActionParams> = (node, params) => {
	let cleanup: void | (() => void)

	async function run() {
		if (!params || typeof window === 'undefined') return
		const gsap = await getGsap()
		cleanup = params.init(gsap, node)
	}

	run()

	return {
		update(next) {
			params = next
			if (cleanup) cleanup()
			run()
		},
		destroy() {
			if (cleanup) cleanup()
		}
	}
}


