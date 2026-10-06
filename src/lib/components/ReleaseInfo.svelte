<script lang="ts">
	import { REPO_PUBLIC, RELEASES_URL } from '#lib/site.ts';
	import type { Release } from '#lib/types.ts';

	interface Props {
		release: Release | null;
	}

	let { release }: Props = $props();

	// UTC so the server-rendered and hydrated dates always match.
	const dateFormat = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' });
	const published = $derived(release?.publishedAt && dateFormat.format(new Date(release.publishedAt)));
</script>

<div class="release">
	{#if release}
		<a href={release.url} class="tag light" target="_blank" rel="noopener">
			Latest build {release.version}{#if published}&ensp;·&ensp;{published}{/if}
		</a>
		{#if release.prerelease}
			<span class="tag">Pre-release</span>
		{/if}
		{#if release.checksumsUrl}
			<a href={release.checksumsUrl} class="tag" rel="noopener">SHA-256 checksums</a>
		{/if}
	{:else}
		<span class="tag">Couldn’t load the latest release from GitHub</span>
	{/if}
	{#if REPO_PUBLIC}
		<a href={RELEASES_URL} class="tag" target="_blank" rel="noopener">All releases on GitHub</a>
	{/if}
</div>

<style>
	.release {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-bottom: 16px;
	}

	/* Same as .btn:hover, also for the light "Latest build" tag. */
	a.tag:hover {
		background-color: var(--button-bg-hover);
		color: var(--button-color-hover);
	}
</style>
