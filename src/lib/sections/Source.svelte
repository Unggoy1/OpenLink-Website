<script lang="ts">
	import DownloadButton from '#lib/components/DownloadButton.svelte';
	import Panel from '#lib/components/Panel.svelte';
	import { DIRECTORY_URL, REPO_PUBLIC, REPO_URL } from '#lib/site.ts';
	import type { Program } from '#lib/types.ts';

	interface Props {
		directory: Program | undefined;
	}

	let { directory }: Props = $props();

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
					OpenLink is open source under the GNU AGPL v3. Releases are built by GitHub Actions and
					include SHA-256 checksums.
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

		<article class="details" id="directory">
			<h3 class="details-header">Run your own directory</h3>
			<div class="body">
				<p>
					OpenLink Directory is a small HTTP service that holds the server list. Hosts register and
					send heartbeats; players list servers. Most people never need it: we run the public one at
					<code>{new URL(DIRECTORY_URL).host}</code>.
				</p>
				{#if directory}
					<div class="files">
						{#each directory.files as file (file.filename)}
							<DownloadButton {file} />
						{/each}
					</div>
				{/if}
			</div>
		</article>
	</div>
</Panel>

<style>
	.cards {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
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

	.files {
		display: flex;
		flex-direction: column;
		gap: 8px;
		align-self: stretch;
	}

	.body code {
		white-space: normal;
		overflow-wrap: anywhere;
	}

	@media (max-width: 900px) {
		.cards {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
