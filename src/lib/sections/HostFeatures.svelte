<script lang="ts">
	import CodeBlock from '#lib/components/CodeBlock.svelte';
	import Panel from '#lib/components/Panel.svelte';

	interface Option {
		key: string;
		title: string;
		text: string;
		wide?: boolean; // spans two grid columns
	}

	// Optional settings in openlink-server.json.
	const options: Option[] = [
		{
			key: 'vote',
			title: 'Playlist voting',
			text: 'Players vote in the OpenLink app between up to 4 random playlist entries (never the one just played), when the first player joins and after every match. Set the vote length (default 30 s), the number of choices and the start delay (default 5 s).'
		},
		{
			key: 'auto_start',
			title: 'Automatic start',
			text: 'Without voting, the server starts each match by itself once enough players have been in the lobby for a while (by default one player for 10 s). Both are configurable.'
		},
		{
			key: 'team_balance',
			title: 'Team balance',
			wide: true,
			text: 'On by default ("even"). Before every team match the server evens out the teams, moving as few players as it can, so friends on one team stay together. "shuffle" deals random teams each match; "off" leaves players’ picks alone. Players can still switch teams mid-match. In free-for-all modes everyone always gets their own team.'
		},
		{
			key: 'auto_port_forward',
			title: 'Automatic port forwarding',
			text: 'Off unless you turn it on. Asks your router (UPnP, then NAT-PMP) to forward the port while the server runs, and removes it on exit. Many people keep UPnP off; forwarding by hand works just as well.'
		}
	];

	const commands = [
		{ code: 'openlink-server status', label: 'Server state, players, reachability, playlist and vote' },
		{ code: 'openlink-server kick 203.0.113.7', label: 'Disconnect a player and keep them out for 10 minutes' },
		{ code: 'openlink-server ban 203.0.113.7', label: 'Permanent ban; add minutes for a temporary one' },
		{ code: 'openlink-server diagnostics', label: 'A report to attach when you ask for help' },
		{ code: 'openlink-server autostart enable', label: 'Start OpenLink Server when you log on' }
	];
</script>

<Panel id="features" title="What you can turn on">
	{#snippet intro()}
		All optional, set in <code>openlink-server.json</code>. Always on: the server owns the lobby (no
		player becomes lobby leader, so nobody gets lobby options, map or mode menus, Play or End Game),
		player counts and ping in the server list, reachability checks, kick and ban, and per-player rate
		limits.
	{/snippet}

	<div class="options">
		{#each options as option (option.key)}
			<article class="option" class:wide={option.wide} id={option.key}>
				<code class="key">{option.key}</code>
				<h3>{option.title}</h3>
				<p>{option.text}</p>
			</article>
		{/each}
	</div>

	<h3 class="sub" id="admin">Running your server</h3>
	<p class="sub-intro">In a second terminal while OpenLink Server runs.</p>
	<div class="commands">
		{#each commands as command (command.code)}
			<CodeBlock code={command.code} label={command.label} />
		{/each}
	</div>
</Panel>

<style>
	.options {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-auto-flow: dense;
		gap: 10px;
	}

	.option.wide {
		grid-column: 1 / -1;
	}

	/* Unggoy .feature-item glass tile */
	.option {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 8px;
		padding: 16px;
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: 12px;
	}

	.key {
		color: var(--button-color);
	}

	h3 {
		margin: 0;
		font-size: 16px;
		font-weight: 700;
	}

	p {
		font-size: 14px;
		font-weight: 400;
		opacity: 0.85;
	}

	.sub {
		margin-top: 28px;
		font-size: 20px;
	}

	.sub-intro {
		margin: 2px 0 14px;
	}

	.commands {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
	}

	@media (max-width: 1100px) {
		.options {
			grid-template-columns: 1fr 1fr;
		}

		.option.wide {
			grid-column: auto;
		}
	}

	@media (max-width: 900px) {
		.commands {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 640px) {
		.options {
			grid-template-columns: 1fr;
		}
	}
</style>
