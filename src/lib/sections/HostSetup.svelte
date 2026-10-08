<script lang="ts">
	import CodeBlock from '#lib/components/CodeBlock.svelte';
	import DownloadButton from '#lib/components/DownloadButton.svelte';
	import Panel from '#lib/components/Panel.svelte';
	import ReleaseInfo from '#lib/components/ReleaseInfo.svelte';
	import ServerNotice from '#lib/components/ServerNotice.svelte';
	import { DIRECTORY_URL } from '#lib/site.ts';
	import type { Program } from '#lib/types.ts';

	interface Props {
		server: Program | undefined;
	}

	let { server }: Props = $props();

	const requirements = [
		'Windows PC',
		'Halo Infinite on Steam',
		'Same game version as your players',
		'Public IPv4 address',
		'A router where you can forward UDP 1343'
	];
</script>

<Panel id="setup" title="Host a server">
	{#snippet intro()}
		OpenLink Server runs Halo Infinite’s LAN server for you, restarts it if it stops, lists it in the
		public server list and passes players through to it. Every match comes from your playlist, or
		players vote.
	{/snippet}

	<div class="tags" aria-label="Requirements">
		{#each requirements as req (req)}
			<span class="tag">{req}</span>
		{/each}
	</div>

	<ol class="steps">
		<li>
			<span class="num">1</span>
			<div class="grow">
				<h3>Download and unzip OpenLink Server</h3>
				<p>Unzip everything into one folder and keep the files together.</p>
				<ServerNotice />
				<ReleaseInfo release={server?.release ?? null} />
				{#if server}
					<div class="files">
						{#each server.files as file (file.filename)}
							<DownloadButton {file} />
						{/each}
					</div>
				{/if}
			</div>
		</li>

		<li>
			<span class="num">2</span>
			<div class="grow">
				<h3>Forward the game port</h3>
				<p>
					On your router, forward <strong>UDP 1343</strong> to this PC, and only that port. If
					Windows asks whether to let OpenLink Server through the firewall, allow it. Your router’s
					manual or support site covers how to forward a port.
				</p>
				<p>
					Or let OpenLink Server ask your router to do it with
					<a href="#auto_port_forward" class="text-link">automatic port forwarding</a>.
				</p>
			</div>
		</li>

		<li>
			<span class="num">3</span>
			<div class="grow">
				<h3>Check that players can reach you</h3>
				<p>
					Within about a minute the log says whether the directory reached your server from the
					internet. Stop it with Ctrl+C once it passes.
				</p>
				<CodeBlock
					code={`openlink-server -simulate -directory ${DIRECTORY_URL} -name "My Server"`}
				/>
			</div>
		</li>

		<li>
			<span class="num">4</span>
			<div class="grow">
				<h3>Set up your config and playlist</h3>
				<div class="codes">
					<CodeBlock code="copy openlink-server.example.json openlink-server.json" />
					<CodeBlock code="copy playlist.example.json playlist.json" />
				</div>
				<p>
					In <code>openlink-server.json</code>, fill in your server’s <code>name</code>,
					<code>description</code> and <code>region</code>. In <code>playlist.json</code>, list the
					maps and modes to play (see the <a href="#playlist" class="text-link">playlist format</a
					>). Every server runs from a playlist. Give an entry <code>teams</code> if its mode is
					made for more than two teams. Team balance is on by default; change it with
					<a href="#team_balance" class="text-link"><code>team_balance</code></a>.
				</p>
			</div>
		</li>

		<li>
			<span class="num">5</span>
			<div class="grow">
				<h3>Run it</h3>
				<p>
					From a normal terminal in that folder. It checks your playlist, starts the game server in
					its own window and lists it. Leave both windows open; the log says
					<em>your server is now in the server list</em>.
				</p>
				<div class="codes">
					<CodeBlock code="openlink-server check-playlist" />
					<CodeBlock code="openlink-server" />
				</div>
			</div>
		</li>
	</ol>
</Panel>

<style>
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-bottom: 16px;
	}

	.tag {
		white-space: normal;
	}

	.steps {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.steps li {
		display: flex;
		gap: 14px;
		padding: 14px 16px;
		border-radius: 12px;
		background-color: var(--top-container-bg);
		min-width: 0;
	}

	.num {
		flex-shrink: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 100px;
		background-color: var(--button-bg);
		color: var(--button-color);
		font-weight: 700;
	}

	.grow {
		display: flex;
		flex-direction: column;
		gap: 10px;
		flex: 1;
		min-width: 0;
	}

	h3 {
		font-size: 16px;
		font-weight: 600;
		padding-top: 5px;
	}

	p {
		font-size: 14px;
		font-weight: 400;
		opacity: 0.85;
	}

	strong {
		font-weight: 600;
	}

	.codes,
	.files {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.files {
		max-width: 420px;
	}

	/* ReleaseInfo's own bottom margin is for standalone use. */
	.grow :global(.release) {
		margin-bottom: 0;
	}
</style>
