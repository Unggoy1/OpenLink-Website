<script lang="ts">
	import DownloadButton from '#lib/components/DownloadButton.svelte';
	import Panel from '#lib/components/Panel.svelte';
	import { DIRECTORY_URL } from '#lib/site.ts';
	import type { Program } from '#lib/types.ts';

	interface Props {
		directory: Program | undefined;
	}

	let { directory }: Props = $props();
</script>

<Panel id="directory" title="Run your own directory">
	{#snippet intro()}
		OpenLink Directory is the small HTTP service that holds the server list: hosts register and
		send heartbeats, players list servers. Most hosts never need it; we run the public one at
		<code>{new URL(DIRECTORY_URL).host}</code>.
	{/snippet}

	{#if directory}
		<div class="files">
			{#each directory.files as file (file.filename)}
				<DownloadButton {file} />
			{/each}
		</div>
	{/if}
</Panel>

<style>
	.files {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 10px;
	}

	@media (max-width: 760px) {
		.files {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
