<script lang="ts">
	import '#lib/styles/app.css';
	import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '#lib/site.ts';

	let { children } = $props();
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

{@render children()}
