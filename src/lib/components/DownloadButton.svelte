<script lang="ts">
	import Icon from './Icon.svelte';
	import type { DownloadFile } from '#lib/types.ts';

	interface Props {
		file: DownloadFile;
	}

	let { file }: Props = $props();

	function formatSize(bytes: number) {
		const mb = bytes / (1024 * 1024);
		return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
	}
</script>

{#if file.url}
	<a href={file.url} class="btn file" rel="noopener">
		<Icon name={file.platform} />
		<span class="file-text">
			<span>{file.label}</span>
			<span class="file-name">
				{file.filename}{#if file.size}&ensp;·&ensp;{formatSize(file.size)}{/if}
			</span>
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

<style>
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
		white-space: nowrap;
	}
</style>
