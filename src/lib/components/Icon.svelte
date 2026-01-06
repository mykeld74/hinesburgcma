<script lang="ts">
	interface Props {
		name:
			| 'church'
			| 'group'
			| 'youtube'
			| 'facebook'
			| 'instagram'
			| 'church1'
			| 'church2'
			| 'church3'
			| 'group1'
			| 'group2'
			| 'group3'
			| 'youtube1'
			| 'youtube2'
			| 'youtube3'
			| 'youtube4'
			| 'facebook1'
			| 'facebook2'
			| 'facebook3'
			| 'facebook4'
			| 'instagram1'
			| 'instagram2'
			| 'instagram3'
			| 'instagram4';
		size?: number | string;
		class?: string;
	}

	let { name, size = 24, class: className = '' }: Props = $props();

	const iconMap: Record<string, string> = {
		church: 'church1',
		group: 'group1',
		youtube: 'youtube1',
		facebook: 'facebook1',
		instagram: 'instagram1'
	};

	const iconId = $derived(iconMap[name] || name);
</script>

<svg class={className} width={size} height={size} aria-hidden="true" focusable="false">
	<use href={`#${iconId}`} />
</svg>
