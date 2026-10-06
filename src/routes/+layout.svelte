<script lang="ts">
	import '#lib/styles/app.css';
	import type { LayoutProps } from './$types';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '#lib/site.ts';

	let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
	<meta name="description" content={SITE_DESCRIPTION} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:title" content={SITE_TITLE} />
	<meta property="og:description" content={SITE_DESCRIPTION} />
	<meta property="og:url" content={SITE_URL} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={SITE_TITLE} />
	<meta name="twitter:description" content={SITE_DESCRIPTION} />
</svelte:head>

<a href="#main" class="skip-link">Skip to content</a>
<Header />

<main id="main" class="main-container">
	{@render children()}
</main>

<Footer release={data.downloads.release} />

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
