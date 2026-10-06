<script lang="ts">
	import type { PageProps } from './$types';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Hero from '#lib/sections/Hero.svelte';
	import Features from '#lib/sections/Features.svelte';
	import App from '#lib/sections/App.svelte';
	import HowItWorks from '#lib/sections/HowItWorks.svelte';
	import Play from '#lib/sections/Play.svelte';
	import Host from '#lib/sections/Host.svelte';
	import Downloads from '#lib/sections/Downloads.svelte';
	import Status from '#lib/sections/Status.svelte';
	import Faq from '#lib/sections/Faq.svelte';
	import Source from '#lib/sections/Source.svelte';
	import { SITE_TITLE } from '#lib/site.ts';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{SITE_TITLE}</title>
</svelte:head>

<a href="#main" class="skip-link">Skip to content</a>
<Header />

<main id="main" class="main-container">
	<Hero />
	<Features />
	<App />
	<HowItWorks />
	<Play />
	<Host />
	<Downloads programs={data.programs} release={data.release} />
	<Status />
	<Faq />
	<Source />
</main>

<Footer version={data.release.version} />

<style>
	.skip-link {
		position: absolute;
		left: 16px;
		top: -48px;
		z-index: 200;
		padding: 10px 16px;
		border-radius: 8px;
		background: var(--button-color);
		color: var(--button-bg);
		font-weight: 600;
	}

	.skip-link:focus {
		top: 12px;
	}
</style>
