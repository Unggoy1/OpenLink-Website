<script lang="ts">
	import type { PageProps } from './$types';
	import HostSetup from '#lib/sections/HostSetup.svelte';
	import HostFeatures from '#lib/sections/HostFeatures.svelte';
	import HostReference from '#lib/sections/HostReference.svelte';
	import HostDirectory from '#lib/sections/HostDirectory.svelte';
	import { SITE_NAME } from '#lib/site.ts';

	let { data }: PageProps = $props();

	const server = $derived(data.downloads.programs.find((p) => p.id === 'server'));
	const directory = $derived(data.downloads.programs.find((p) => p.id === 'directory'));
</script>

<svelte:head>
	<title>Host a server · {SITE_NAME}</title>
</svelte:head>

<HostSetup {server} />
<HostFeatures />
<HostReference />
<HostDirectory {directory} />
