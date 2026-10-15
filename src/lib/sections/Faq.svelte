<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import Panel from '#lib/components/Panel.svelte';

	// Answers are static, trusted copy and may contain inline HTML.
	const faqs = [
		{
			q: 'Is this safe for my account?',
			a: 'You sign in to the game normally, and OpenLink never handles your Xbox or Microsoft credentials. OpenLink Launcher starts Halo without anti-cheat and changes it in memory only: it never changes game files or anti-cheat files, services or settings. It is still an unofficial tool that modifies the running game, so play at your own discretion and at your own risk with respect to the game’s terms.'
		},
		{
			q: 'Where do I put the launcher?',
			a: 'In a folder of its own, for example on your Desktop or in Documents. <strong>Not in your Halo Infinite folder</strong>: extra files in the game folder can cause problems with anti-cheat. Keep <code>openlink-launcher.exe</code> and <code>openlink-launcher.dll</code> together.'
		},
		{
			q: 'Does it affect Halo when I play normally?',
			a: 'No. Close the launcher’s game when you are done and start Halo Infinite from Steam as usual: anti-cheat runs and matchmaking works as before. While Halo runs through the launcher, official matchmaking is unavailable and the game shows OFFLINE; that is expected.'
		},
		{
			q: 'Do I need to port forward to play?',
			a: 'No. Only hosts forward a port. Players just run OpenLink Launcher and join.'
		},
		{
			q: 'Why can’t I join a server?',
			a: 'Usually it is full or not accepting players right now, or it is unreachable; the browser says why instead of joining. A server that needs a newer launcher shows <strong>Update OpenLink Launcher</strong>.'
		},
		{
			q: 'Which version of the game do I need?',
			a: 'Halo Infinite on Steam (its final PC version). The launcher checks the game before it starts it.'
		},
		{
			q: 'Do I need to update the launcher when servers update?',
			a: 'Usually not. OpenLink Launcher and OpenLink Server have their own versions, and most server updates don’t need a new launcher. When a newer launcher is out, it offers its download page when it starts.'
		},
		{
			q: 'Who picks the map and mode?',
			a: 'The server, from its playlist; never a player. On servers with voting, a vote panel appears in the lobby when you join and after every match: click a choice, press Alt+1–4, or hold View and press the D-pad. Most votes wins; a tie, or no votes, is settled at random.'
		},
		{
			q: 'How do I leave a server?',
			a: 'Press <strong>Back</strong> in the server’s lobby. A <strong>Leave Server?</strong> dialog asks first; Okay leaves the server and takes you back to Custom Game, Cancel keeps you in.'
		},
		{
			q: 'The lobby shows a different map. Which is right?',
			a: 'Before anyone votes, the lobby shows the game’s default map. Once you vote, its map picture follows your choice, then the winning map, which is what is played.'
		},
		{
			q: 'Does it work on Linux?',
			a: 'No. OpenLink Launcher is Windows only. Hosting needs Windows too.'
		},
		{
			q: 'Can I host and play on the same PC?',
			a: 'Yes. The launcher notices a server running on your PC and adjusts how it connects by itself.'
		},
		{
			q: 'Does hosting modify the game?',
			a: 'On the host’s side, OpenLink Server loads a small DLL into the host’s own server process to control maps, modes and the lobby. Hosts run it at their own risk with respect to the game’s terms of service. More in the <a href="/host" class="text-link">hosting guide</a>.'
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
