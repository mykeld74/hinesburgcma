<script lang="ts">
	// @portabletext/svelte v3 passes the image block under 'portableText' prop
	// The block includes all fields from the GROQ query including computed fields
	type ImageBlock = {
		// Direct props from the image block
		asset?: {
			_id?: string;
			url?: string;
			metadata?: {
				dimensions?: {
					width?: number;
					height?: number;
					aspectRatio?: number;
				};
			};
		};
		alt?: string;
		imageUrl?: string; // Computed field from GROQ query
		imageAlt?: string; // Computed field from GROQ query
		_type?: string;
		_key?: string;
		// Some versions might nest under value
		value?: {
			asset?: { url?: string };
			alt?: string;
			imageUrl?: string;
			imageAlt?: string;
		};
		[key: string]: unknown;
	};

	let props = $props() as {
		portableText?: ImageBlock;
	} & ImageBlock;

	// @portabletext/svelte v3 passes the image block under 'portableText' prop
	// Get the actual image block data
	const imageBlock: ImageBlock = props.portableText || props;

	// Get image URL - prefer computed imageUrl from GROQ, fallback to asset.url
	// Handle both direct props and nested value prop
	const imageUrl = imageBlock.imageUrl || imageBlock.value?.imageUrl;
	const assetUrl = imageBlock.asset?.url || imageBlock.value?.asset?.url;
	const finalImageUrl = imageUrl || assetUrl;

	// Get alt text - prefer computed imageAlt from GROQ, fallback to alt
	const imageAlt = imageBlock.imageAlt || imageBlock.value?.imageAlt;
	const alt = imageBlock.alt || imageBlock.value?.alt;
	const finalAlt = imageAlt || alt || '';
</script>

{#if finalImageUrl}
	<figure class="portableImage">
		<img src={finalImageUrl} alt={finalAlt} loading="lazy" />
	</figure>
{/if}

<style>
	.portableImage {
		margin: 1.5rem 0;
		border-radius: 12px;
		overflow: hidden;
	}

	.portableImage img {
		width: 100%;
		height: auto;
		display: block;
	}
</style>
