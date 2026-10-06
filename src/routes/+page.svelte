<script lang="ts">
	import type { PageProps } from './$types';
	import Hero from '#lib/sections/Hero.svelte';
	import Downloads from '#lib/sections/Downloads.svelte';
	import Play from '#lib/sections/Play.svelte';
	import App from '#lib/sections/App.svelte';
	import Safety from '#lib/sections/Safety.svelte';
	import HostTeaser from '#lib/sections/HostTeaser.svelte';
	import Faq from '#lib/sections/Faq.svelte';
	import { SITE_TITLE } from '#lib/site.ts';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{SITE_TITLE}</title>
</svelte:head>

<Hero />
<Safety />
<Downloads downloads={data.downloads} />
<Play />
<App />
<HostTeaser />
<Faq />
