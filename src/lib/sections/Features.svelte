<script lang="ts">
	import Panel from '#lib/components/Panel.svelte';

	interface Row {
		title: string;
		text: string;
	}

	const groups: { title: string; rows: Row[] }[] = [
		{
			title: 'Safe by design',
			rows: [
				{
					title: 'Players’ games are untouched',
					text: 'The game’s own LAN server mode. No modded game files, no memory editing, no anti-cheat interaction.'
				},
				{
					title: 'Players sign in normally',
					text: 'OpenLink never handles Xbox or Microsoft credentials. No accounts, no sign-in data.'
				},
				{
					title: 'Packets left untouched',
					text: 'Encrypted by the game and forwarded unchanged. Never read or altered.'
				}
			]
		},
		{
			title: 'For players',
			rows: [
				{
					title: 'One-click Join',
					text: 'The OpenLink app: a desktop server browser for Windows and Linux.'
				},
				{
					title: 'Vote for the next match',
					text: 'Pick from up to 4 maps and modes, with thumbnails and live counts.'
				},
				{
					title: 'Linux via Steam/Proton',
					text: 'The Linux build of the app runs alongside the game under Proton.'
				},
				{
					title: 'No port forwarding',
					text: 'Only hosts need to open a port.'
				},
				{
					title: 'Version checking',
					text: 'Servers on a different game version are shown but can’t be joined.'
				}
			]
		},
		{
			title: 'For hosts',
			rows: [
				{
					title: 'Hands-off server',
					text: 'Starts and supervises the server and keeps the listing fresh.'
				},
				{
					title: 'Playlists and voting',
					text: 'The server picks every map and mode from your playlist, or lets players vote.'
				},
				{
					title: 'Server-owned lobby',
					text: 'No lobby leader. Matches start on their own and end on their limits.'
				},
				{
					title: 'Proxy mode (default)',
					text: 'Player counts, ping and reachability checks.'
				},
				{
					title: 'Moderation commands',
					text: 'status, kick and ban, with per-player rate limits.'
				}
			]
		}
	];
</script>

<Panel id="features" title="Features">
	{#snippet intro()}
		OpenLink carries the game’s own LAN discovery and game traffic across the internet. It is a set
		of small open-source tools.
	{/snippet}

	<div class="groups">
		{#each groups as group (group.title)}
			<article class="details">
				<h3 class="details-header">{group.title}</h3>
				{#each group.rows as row (row.title)}
					<div class="details-row">
						<div>
							{row.title}
							<small>{row.text}</small>
						</div>
					</div>
				{/each}
			</article>
		{/each}
	</div>
</Panel>

<style>
	.groups {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
		align-items: start;
	}

	@media (max-width: 1000px) {
		.groups {
			grid-template-columns: 1fr;
		}
	}
</style>
