<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import Panel from '#lib/components/Panel.svelte';
	import type { DownloadFile, Program, Release } from '#lib/types.ts';
	import { REPO_PUBLIC, RELEASES_URL } from '#lib/site.ts';

	interface Props {
		programs: Program[];
		release: Release;
	}

	let { programs, release }: Props = $props();

	const main = $derived(programs.filter((p) => !p.advanced));
	const advanced = $derived(programs.filter((p) => p.advanced));
</script>

{#snippet fileButton(file: DownloadFile, light: boolean)}
	{#if file.url}
		<a href={file.url} class="btn file" class:light download={file.filename} rel="noopener">
			<Icon name={file.platform} />
			<span class="file-text">
				<span>{file.label}</span>
				<span class="file-name">{file.filename}</span>
			</span>
			<Icon name="download" />
		</a>
	{:else}
		<span class="btn file" aria-disabled="true">
			<Icon name={file.platform} />
			<span class="file-text">
				<span>{file.label}</span>
				<span class="file-name">Not available yet</span>
			</span>
		</span>
	{/if}
{/snippet}

<Panel id="downloads" title="Downloads">
	{#snippet intro()}
		Players need the OpenLink app (or <code>hi-connector</code> on Linux). Hosts need
		<code>hi-hostagent</code>. Everyone needs the same build as the server they’re joining.
	{/snippet}

	<div class="release">
		{#if release.version}
			<span class="tag light">Build {release.version}</span>
		{/if}
		{#if release.checksumsUrl}
			<a href={release.checksumsUrl} class="tag" rel="noopener">SHA-256 checksums</a>
		{/if}
		{#if REPO_PUBLIC}
			<a href={RELEASES_URL} class="tag" target="_blank" rel="noopener"
				>All releases on GitHub</a
			>
		{/if}
	</div>

	<div class="programs">
		{#each main as program, i (program.id)}
			<article class="details program">
				<div class="details-header">
					<div>
						<h3>{program.name}</h3>
						<p class="audience">{program.audience}</p>
					</div>
				</div>
				<p class="summary">{program.summary}</p>
				<div class="files">
					{#each program.files as file (file.filename)}
						{@render fileButton(file, i === 0)}
					{/each}
				</div>
			</article>
		{/each}
	</div>

	{#each advanced as program (program.id)}
		<div class="advanced">
			<div class="advanced-text">
				<h3>{program.name} <span class="audience">· Run your own directory</span></h3>
				<p class="summary">{program.summary}</p>
			</div>
			<div class="files row">
				{#each program.files as file (file.filename)}
					{@render fileButton(file, false)}
				{/each}
			</div>
		</div>
	{/each}
</Panel>

<style>
	.release {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-bottom: 16px;
	}

	a.tag:hover {
		background-color: var(--button-bg-hover);
	}

	.programs {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}

	.program {
		display: flex;
		flex-direction: column;
		padding-bottom: 16px;
	}

	h3 {
		font-size: 20px;
		font-weight: 700;
	}

	.audience {
		font-size: 14px;
		font-weight: 500;
		color: var(--sidebar-color);
	}

	.summary {
		margin-top: 12px;
		font-size: 14px;
		font-weight: 400;
		opacity: 0.85;
	}

	.files {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: auto;
		padding-top: 16px;
	}

	.file {
		justify-content: flex-start;
		height: auto;
		min-height: 52px;
		padding: 8px 16px;
		text-align: left;
	}

	.file-text {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-width: 0;
		line-height: 1.3;
	}

	.file-name {
		font-family: var(--code-font);
		font-size: 11.5px;
		font-weight: 400;
		opacity: 0.8;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.advanced {
		display: flex;
		align-items: center;
		gap: 16px 32px;
		margin-top: 16px;
		padding: 16px;
		border-radius: 12px;
		border: 2px solid var(--outline);
	}

	.advanced-text {
		flex: 1;
	}

	.advanced h3 {
		font-size: 16px;
	}

	.advanced .summary {
		margin-top: 4px;
	}

	.files.row {
		flex-direction: row;
		flex-wrap: wrap;
		margin: 0;
		padding: 0;
	}

	.files.row .file {
		min-width: 220px;
	}

	@media (max-width: 1000px) {
		.programs {
			grid-template-columns: 1fr;
		}

		.advanced {
			flex-direction: column;
			align-items: stretch;
		}

		.files.row .file {
			flex: 1;
		}
	}
</style>
