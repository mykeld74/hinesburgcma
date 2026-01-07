<script>
	let { source, altTag, width = 'auto', class: className = '' } = $props();

	let src = `https://res.cloudinary.com/de6fzsubp/image/upload/f_auto,q_auto,w_${width}/v1767719546/${source}`;
</script>

<img {src} alt={altTag} class="{source} {className}" loading="lazy" />

<style>
	img {
		width: 100%;
	}
	.leaderImage,
	.modalLeaderImage {
		border-radius: 10px;
	}
</style>
