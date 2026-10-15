<script lang="ts">
	import type { PageProps } from './$types';
	import Hero from '#lib/sections/Hero.svelte';
	import Downloads from '#lib/sections/Downloads.svelte';
	import Play from '#lib/sections/Play.svelte';
	import Screenshots from '#lib/sections/Screenshots.svelte';
	import Features from '#lib/sections/Features.svelte';
	import HostTeaser from '#lib/sections/HostTeaser.svelte';
	import Faq from '#lib/sections/Faq.svelte';
	import { SITE_TITLE } from '#lib/site.ts';

	let { data }: PageProps = $props();

</script>

<svelte:head>
	<title>{SITE_TITLE}</title>
</svelte:head>

<Hero />
<Features />
<Screenshots />
<Downloads downloads={data.downloads} />
<Play />
<HostTeaser />
<Faq />
