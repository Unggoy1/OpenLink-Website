<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import Panel from '#lib/components/Panel.svelte';
	import { DIRECTORY_URL, REPO_PUBLIC, REPO_URL } from '#lib/site.ts';

	const repoLabel = REPO_URL.replace('https://', '');
</script>

<Panel id="source" title="Source">
	<div class="cards">
		<article class="details">
			<h3 class="details-header">
				Source code
				{#if !REPO_PUBLIC}
					<span class="tag light">Private during testing</span>
				{/if}
			</h3>
			<div class="body">
				<p>
					Small, open-source tools written in Go using only the standard library. Releases are built
					by CI and include checksums.
				</p>
				{#if REPO_PUBLIC}
					<a href={REPO_URL} class="btn small" target="_blank" rel="noopener">
						{repoLabel}
					</a>
				{:else}
					<p>The source goes public at <code>{repoLabel}</code> after early testing.</p>
				{/if}
			</div>
		</article>

		<article class="details">
			<h3 class="details-header">
				Run your own directory
			</h3>
			<div class="body">
				<p>
					<code>hi-directory</code> is a small HTTP service that holds the server list. Hosts
					register and send heartbeats; players list servers. Most people never need it: we run the
					public one at <code>{new URL(DIRECTORY_URL).host}</code>.
				</p>
				<a href="#downloads" class="btn small">
					<Icon name="download" />
					Get hi-directory
				</a>
			</div>
		</article>
	</div>
</Panel>

<style>
	.cards {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
		align-items: start;
	}

	.details-header {
		flex-wrap: wrap;
	}

	.tag {
		padding: 4px 10px;
		font-size: 13px;
	}

	.body {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 12px;
		padding: 14px 0 12px;
	}

	.body p {
		font-size: 15px;
		font-weight: 400;
		opacity: 0.9;
	}

	.body code {
		white-space: normal;
		overflow-wrap: anywhere;
	}

	@media (max-width: 900px) {
		.cards {
			grid-template-columns: 1fr;
		}
	}
</style>
