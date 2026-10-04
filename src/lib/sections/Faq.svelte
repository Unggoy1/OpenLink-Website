<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import Panel from '#lib/components/Panel.svelte';

	// Answers are static, trusted copy and may contain inline <code>.
	const faqs = [
		{
			q: 'Is this safe for my account?',
			a: 'You sign in to the game normally, and OpenLink never handles your Xbox or Microsoft credentials. It doesn’t modify the game and doesn’t interact with anti-cheat; it only uses the game’s own LAN server mode. It is still an unofficial tool, so play at your own discretion.'
		},
		{
			q: 'Do I need to port forward to play?',
			a: 'No. Only hosts need to forward UDP 1343. Players just run the OpenLink app and join.'
		},
		{
			q: 'Why can’t I join a server?',
			a: 'Usually one of two reasons. The server is on a different game version (it is still listed but can’t be joined), or the server is currently unreachable. The app warns you if a server stops advertising or the directory can’t be reached.'
		},
		{
			q: 'Which version of the game do I need?',
			a: 'Halo Infinite on Steam, at the same version as the server. Every game update means hosts and players need to update together.'
		},
		{
			q: 'Does it work on Linux?',
			a: 'Yes, for players. Use the Linux build of the OpenLink app, or the <code>hi-connector</code> command-line client, while the game runs under Steam/Proton. Hosting currently needs Windows.'
		},
		{
			q: 'Who picks the map and mode?',
			a: 'For now, the first player to join controls the lobby and picks the map and mode. Server-side playlist rotation is planned.'
		}
	];
</script>

<Panel id="faq" title="FAQ">
	<div class="list">
		{#each faqs as item (item.q)}
			<details>
				<summary>
					<span>{item.q}</span>
					<Icon name="chevron" size={16} class="chev" />
				</summary>
				<p>{@html item.a}</p>
			</details>
		{/each}
	</div>
</Panel>

<style>
	.list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	details {
		border-radius: 12px;
		background-color: var(--top-container-bg);
	}

	summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 16px 18px;
		border-radius: 12px;
		cursor: pointer;
		list-style: none;
		font-size: 16px;
		font-weight: 600;
		transition: all 0.2s ease-in-out;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary:hover {
		background-color: var(--button-bg);
		color: var(--button-color);
	}

	summary :global(.chev) {
		flex-shrink: 0;
		color: var(--sidebar-color);
		transition: transform 0.2s ease-in-out;
	}

	details[open] summary {
		color: var(--button-color);
	}

	details[open] summary :global(.chev) {
		transform: rotate(180deg);
		color: var(--button-color);
	}

	details p {
		padding: 0 18px 18px;
		max-width: 80ch;
		font-size: 15px;
		font-weight: 400;
		opacity: 0.9;
	}
</style>
