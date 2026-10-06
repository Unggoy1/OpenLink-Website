<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import Panel from '#lib/components/Panel.svelte';

	// Answers are static, trusted copy and may contain inline HTML.
	const faqs = [
		{
			q: 'Is this safe for my account?',
			a: 'You sign in to the game normally, and OpenLink never handles your Xbox or Microsoft credentials. Players’ games are never modified and OpenLink doesn’t interact with anti-cheat; it only uses the game’s own LAN server mode. It is still an unofficial tool, so play at your own discretion.'
		},
		{
			q: 'Do I need to port forward to play?',
			a: 'No. Only hosts forward a port. Players just run the OpenLink app and join.'
		},
		{
			q: 'Why can’t I join a server?',
			a: 'Usually the server is on a different game version (it is still listed but can’t be joined), or it is currently unreachable. The app warns you if a server stops answering or the directory can’t be reached. If you joined but the server isn’t in the game’s list, switch the app to <strong>LAN broadcast</strong> in Settings.'
		},
		{
			q: 'Which version of the game do I need?',
			a: 'Halo Infinite on Steam, at the same version as the server. After a game update, hosts and players update together.'
		},
		{
			q: 'Who picks the map and mode?',
			a: 'The server, from its playlist; never a player. On servers with voting, a vote opens in the OpenLink app when you join and after every match: click a card to vote, and the most votes wins (a tie, or no votes, is settled at random).'
		},
		{
			q: 'I’m in the game. How do I know a vote has started?',
			a: 'The app plays a short chime (you can turn it off in Settings), shows a Windows notification and flashes its taskbar button. Windows may hold the notification back while the game is focused, but the chime still plays. Alt-tab to the app to vote.'
		},
		{
			q: 'The lobby shows a different map than the app. Which is right?',
			a: 'The app. The game’s own lobby screen can show another map name until the match loads.'
		},
		{
			q: 'Does it work on Linux?',
			a: 'There is a Linux build of the OpenLink app for playing under Steam/Proton, but it hasn’t been tested yet. Hosting needs Windows.'
		},
		{
			q: 'Can I host and play on the same PC?',
			a: 'Yes. The app switches to <strong>LAN broadcast</strong> by itself when the server runs on your PC, because the server occupies the LAN discovery port. If the game doesn’t see your server, check that setting.'
		},
		{
			q: 'Does hosting modify the game?',
			a: 'Only on the host’s side. To control maps and modes, OpenLink Server loads a small DLL into the host’s own server process. It never touches players’ games or anti-cheat. Hosts run it at their own risk with respect to the game’s terms of service. More in the <a href="/host" class="text-link">hosting guide</a>.'
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
