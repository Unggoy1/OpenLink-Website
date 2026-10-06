<script lang="ts">
	import Icon, { type IconName } from './Icon.svelte';
	import { DIRECTORY_URL } from '#lib/site.ts';

	interface Node {
		role: string;
		name: string;
		detail: string;
		icon: IconName;
		address?: string;
	}

	const host: Node = {
		role: 'Host',
		name: 'OpenLink Server',
		detail: 'Runs the game’s LAN server and sends its beacon to the directory.',
		icon: 'server'
	};
	const directory: Node = {
		role: 'Directory',
		name: 'Public server list',
		detail: 'Holds the list of servers. Carries no game traffic.',
		icon: 'list',
		address: new URL(DIRECTORY_URL).host
	};
	const player: Node = {
		role: 'Player',
		name: 'OpenLink app',
		detail: 'Replays the server’s beacon on your PC, so the game sees a LAN game.',
		icon: 'monitor'
	};
</script>

{#snippet node(n: Node)}
	<div class="node">
		<Icon name={n.icon} size={32} />
		<span class="role">{n.role}</span>
		<p class="name">{n.name}</p>
		<p class="detail">{n.detail}</p>
		{#if n.address}
			<code class="address">{n.address}</code>
		{/if}
	</div>
{/snippet}

{#snippet connector(label: string)}
	<div class="connector" aria-hidden="true">
		<span class="connector-label">{label}</span>
		<span class="line"></span>
	</div>
{/snippet}

<figure class="diagram">
	<div class="row">
		{@render node(host)}
		{@render connector('Beacon + heartbeat')}
		{@render node(directory)}
		{@render connector('Server list')}
		{@render node(player)}
	</div>

	<div class="traffic" aria-hidden="true">
		<span class="tag light traffic-label">
			Game traffic: UDP 1343, direct between player and host
		</span>
	</div>

	<figcaption class="traffic-note">
		<span>
			<strong>Game traffic goes directly between player and host</strong> on UDP 1343. The directory
			only shares the server list and never sees a game packet.
		</span>
	</figcaption>
</figure>

<style>
	.diagram {
		margin: 0;
	}

	.row {
		display: grid;
		grid-template-columns: 1fr 130px 1fr 130px 1fr;
		align-items: stretch;
	}

	/* Unggoy .feature-item glass tile */
	.node {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 20px;
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: 12px;
	}

	.node :global(svg) {
		color: var(--button-color);
		margin-bottom: 12px;
	}

	.role {
		font-size: 13px;
		color: var(--sidebar-color);
	}

	.name {
		margin-top: 2px;
		font-size: 18px;
		font-weight: 700;
	}

	.detail {
		margin-top: 6px;
		font-size: 14px;
		font-weight: 400;
		line-height: 1.4;
		opacity: 0.8;
	}

	.address {
		margin-top: 12px;
		white-space: normal;
		overflow-wrap: anywhere;
	}

	.connector {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 0 8px;
	}

	.connector-label {
		font-size: 12px;
		text-align: center;
		color: var(--sidebar-color);
	}

	.line {
		position: relative;
		width: 100%;
		height: 2px;
		background: repeating-linear-gradient(90deg, var(--button-color) 0 8px, transparent 8px 14px);
		background-size: 14px 2px;
		opacity: 0.6;
		animation: flow 0.9s linear infinite;
	}

	.line::after {
		content: '';
		position: absolute;
		right: -2px;
		top: 50%;
		transform: translateY(-50%);
		border-left: 8px solid var(--button-color);
		border-top: 5px solid transparent;
		border-bottom: 5px solid transparent;
	}

	@keyframes flow {
		to {
			background-position: 14px 0;
		}
	}

	/* Bracket joining host and player under the row */
	.traffic {
		position: relative;
		height: 44px;
		margin: 0 calc((100% - 260px) / 6) 40px;
		border: 2px dashed rgba(206, 231, 238, 0.4);
		border-top: none;
		border-radius: 0 0 12px 12px;
	}

	.traffic-label {
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translate(-50%, 50%);
	}

	.traffic-note {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		margin-top: 16px;
		padding: 16px;
		border-radius: 12px;
		background-color: var(--button-bg);
		color: var(--container-color);
		font-size: 15px;
	}

	.traffic-note :global(svg) {
		flex-shrink: 0;
		margin-top: 2px;
		color: var(--button-color);
	}

	/* On wide screens the bracket shows this visually; keep it for screen readers. */
	@media (min-width: 901px) {
		.traffic-note {
			position: absolute;
			width: 1px;
			height: 1px;
			padding: 0;
			overflow: hidden;
			clip: rect(0, 0, 0, 0);
			white-space: nowrap;
		}
	}

	@media (max-width: 1100px) {
		.traffic-label {
			white-space: normal;
			text-align: center;
			width: max-content;
			max-width: 90%;
		}
	}

	@media (max-width: 900px) {
		.row {
			grid-template-columns: 1fr;
		}

		.connector {
			flex-direction: row-reverse;
			justify-content: center;
			height: 56px;
			gap: 14px;
		}

		.connector::before {
			content: '';
			flex: 1;
		}

		.connector-label {
			flex: 1;
			text-align: left;
		}

		.line {
			width: 2px;
			height: 100%;
			background: repeating-linear-gradient(180deg, var(--button-color) 0 8px, transparent 8px 14px);
			background-size: 2px 14px;
			animation-name: flow-down;
		}

		.line::after {
			right: 50%;
			top: auto;
			bottom: -2px;
			transform: translateX(50%);
			border-top: 8px solid var(--button-color);
			border-left: 5px solid transparent;
			border-right: 5px solid transparent;
			border-bottom: none;
		}

		.traffic {
			display: none;
		}
	}

	@keyframes flow-down {
		to {
			background-position: 0 14px;
		}
	}
</style>
