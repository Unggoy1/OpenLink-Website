<script lang="ts">
	import type { PageProps } from './$types';
	import HowItWorks from '#lib/sections/HowItWorks.svelte';
	import Status from '#lib/sections/Status.svelte';
	import Source from '#lib/sections/Source.svelte';
	import { SITE_NAME } from '#lib/site.ts';

	let { data }: PageProps = $props();

	const directory = $derived(data.downloads.programs.find((p) => p.id === 'directory'));
</script>

<svelte:head>
	<title>How it works · {SITE_NAME}</title>
</svelte:head>

<HowItWorks />
<Status />
<Source {directory} />
