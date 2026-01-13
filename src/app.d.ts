// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module 'imask' {
	export interface MaskedInputOptions {
		mask: string | RegExp | Array<string | RegExp>;
		[key: string]: any;
	}

	export default function IMask(element: HTMLElement, options: MaskedInputOptions): any;
}

export {};
