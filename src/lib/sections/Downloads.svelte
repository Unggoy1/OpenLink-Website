<script lang="ts">
	import DownloadButton from '#lib/components/DownloadButton.svelte';
	import Panel from '#lib/components/Panel.svelte';
	import ReleaseInfo from '#lib/components/ReleaseInfo.svelte';
	import ServerNotice from '#lib/components/ServerNotice.svelte';
	import type { Downloads, ProgramId } from '#lib/types.ts';

	interface Props {
		downloads: Downloads;
	}

	let { downloads }: Props = $props();

	const guides: Partial<Record<ProgramId, { href: string; label: string }>> = {
		app: { href: '#play', label: 'How to play' },
		server: { href: '/host', label: 'Hosting guide' }
	};

	const shown = $derived(downloads.programs.filter((p) => p.id in guides));
</script>

<Panel id="downloads" title="Downloads">
	{#snippet intro()}
		Players need the OpenLink app. Hosts need OpenLink Server. Everyone needs the same Halo Infinite
		version as the server they join.
	{/snippet}

	<ReleaseInfo release={downloads.release} />

	<div class="programs">
		{#each shown as program (program.id)}
			{@const guide = guides[program.id]}
			<article class="details program">
				<div class="details-header">
					<div>
						<h3>{program.name}</h3>
						<p class="audience">{program.audience}</p>
					</div>
				</div>
				<p class="summary">{program.summary}</p>
				{#if program.id === 'server'}
					<div class="notice">
						<ServerNotice />
					</div>
				{/if}
				<div class="files">
					{#each program.files as file (file.filename)}
						<DownloadButton {file} />
					{/each}
				</div>
				{#if guide}
					<a href={guide.href} class="text-link guide">{guide.label} →</a>
				{/if}
			</article>
		{/each}
	</div>

	<p class="more">
		Want to run your own server list? <a href="/about#directory" class="text-link"
			>OpenLink Directory</a
		> is on the About page.
	</p>
</Panel>

<style>
	.programs {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
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

	.notice {
		margin-top: 12px;
	}

	.files {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: auto;
		padding-top: 16px;
	}

	.guide {
		align-self: flex-start;
		margin-top: 14px;
		font-size: 14px;
	}

	.more {
		margin-top: 16px;
		font-size: 14px;
		font-weight: 400;
		opacity: 0.85;
	}

	@media (max-width: 1000px) {
		.programs {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
