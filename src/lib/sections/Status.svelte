<script lang="ts">
	import Panel from '#lib/components/Panel.svelte';

	interface Group {
		title: string;
		items: string[];
	}

	const groups: Group[] = [
		{
			title: 'Tested',
			items: [
				'Remote players on Windows and Linux/Proton found a hosted server and played several full matches in a row.',
				'That was one test with a small group, and the host was exposed through a tunnel rather than a router port forward.'
			]
		},
		{
			title: 'Not yet tested',
			items: [
				'A host using a direct router port forward',
				'Proxy mode, bans and several servers on one PC with the real game',
				'Many players at once',
				'Long uptime'
			]
		},
		{
			title: 'Limitations',
			items: [
				'Every game update requires hosts and players to update together.',
				'Map and mode control supports one game build at a time. After a Halo update, it waits for an OpenLink update.',
				'Servers with voting need the latest OpenLink app.'
			]
		},
		{
			title: 'Planned',
			items: ['Export server playlists from community maps on Unggoy']
		}
	];
</script>

<Panel id="status" title="Status">
	{#snippet intro()}
		<span class="tag light">Early / beta</span>
		OpenLink works, but it has only been tested lightly. Here is exactly where it stands.
	{/snippet}

	<div class="groups">
		{#each groups as group (group.title)}
			<article class="details">
				<h3 class="details-header">{group.title}</h3>
				{#each group.items as item (item)}
					<p class="details-row">{item}</p>
				{/each}
			</article>
		{/each}
	</div>
</Panel>

<style>
	.tag {
		padding: 4px 10px;
		margin-right: 6px;
		font-size: 13px;
	}

	.groups {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
		align-items: start;
	}

	.details-row {
		font-size: 14px;
		font-weight: 400;
		opacity: 0.9;
	}

	@media (max-width: 1100px) {
		.groups {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 640px) {
		.groups {
			grid-template-columns: 1fr;
		}
	}
</style>
