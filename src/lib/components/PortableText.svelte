<script lang="ts">
	import { PortableText as PortableTextRenderer } from '@portabletext/svelte';
	import type { PortableTextBlock } from '@portabletext/types';
	import PortableTextImage from './PortableTextImage.svelte';

	let { content }: { content: PortableTextBlock[] | null | undefined } = $props();

	// Custom components for rendering images and other block types
	const components = {
		types: {
			image: PortableTextImage
		}
	};
</script>

{#if content && Array.isArray(content) && content.length > 0}
	<div class="portableText">
		<PortableTextRenderer value={content} {components} />
	</div>
{/if}

<style>
</style>
