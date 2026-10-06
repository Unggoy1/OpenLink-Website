<script lang="ts">
	import CodeBlock from '#lib/components/CodeBlock.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import Panel from '#lib/components/Panel.svelte';
	import { HOSTING_GUIDE_URL, REPO_PUBLIC } from '#lib/site.ts';

	const requirements = [
		'Windows PC',
		'Halo Infinite (Steam)',
		'Same game build as your players',
		'Public IPv4 with UDP 1343 forwarded, or a UDP tunnel'
	];

	interface Option {
		key: string;
		title: string;
		text: string;
	}

	// All optional, set in hostagent.json.
	const options: Option[] = [
		{
			key: 'playlist',
			title: 'Server-chosen maps and modes',
			text: 'The server, not a player, decides every match from a playlist of published maps and modes, including Forge and UGC content. Rotation shuffles through the list.'
		},
		{
			key: 'vote',
			title: 'Playlist voting',
			text: 'Players vote in the OpenLink app between up to 4 random playlist entries (never the one just played), when the first player joins and after every match. Set the vote length (default 30 s), number of choices (1–4) and start delay (default 5 s).'
		},
		{
			key: 'server_owned',
			title: 'Server-owned lobby',
			text: 'No player becomes lobby leader, and players can’t start or end matches: Play and the pause menu’s End Game do nothing. Matches end on their own time and score limits.'
		},
		{
			key: 'auto_start',
			title: 'Automatic start',
			text: 'Without voting, the server starts the match by itself once enough players are in the lobby. The player count and delay are configurable.'
		}
	];

	const files = [
		{
			name: 'hi-hostagent.exe',
			text: 'Starts and supervises the LAN dedicated server, lists it in the directory, proxies players, and runs the playlist and voting.'
		},
		{
			name: 'hi-hostctl.dll',
			text: 'Server-side control, loaded only into your own server process.'
		},
		{ name: 'hostctl-loader.exe', text: 'Loads the DLL into the server the agent starts.' },
		{
			name: 'hostagent.example.json',
			text: 'Example config with a playlist, voting and a server-owned lobby.'
		},
		{ name: 'playlist.example.json', text: 'Example playlist.' },
		{ name: 'README.txt', text: 'Setup steps.' }
	];

	const playlistExample = `{
  "schema_version": 1,
  "selection": "shuffle_bag",
  "entries": [
    {
      "id": "interference-fiesta",
      "name": "Fiesta Slayer on Interference",
      "map":  {"asset_id": "70f884d7-6869-469d-b4d2-4219627e2d83", "version_id": "cc791b4b-054a-4653-9034-5dc13c809c54"},
      "mode": {"asset_id": "aca7bbf8-7a18-4aae-8785-1bd3f58275fd", "version_id": "3685f6b2-2860-4e98-9d13-513087edb465"}
    }
  ]
}`;
</script>

<Panel id="host" title="How to host">
	{#snippet intro()}
		The host package runs Halo Infinite’s LAN dedicated server for you, lists it in the directory,
		proxies players, and can pick every match from your playlist or let players vote.
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
				<h3>Unzip the host package</h3>
				<p>
					Get <code>OpenLink-host-windows-amd64.zip</code> from
					<a href="#downloads" class="text-link">Downloads</a> and unzip everything into one folder.
				</p>
			</div>
		</li>
		<li>
			<span class="num">2</span>
			<div class="grow">
				<h3>Copy the example files</h3>
				<div class="codes">
					<CodeBlock code="copy hostagent.example.json hostagent.json" />
					<CodeBlock code="copy playlist.example.json playlist.json" />
				</div>
			</div>
		</li>
		<li>
			<span class="num">3</span>
			<div class="grow">
				<h3>Fill in your settings</h3>
				<p>
					In <code>hostagent.json</code>: your server name, directory key, and public address and
					port (forward <strong>UDP 1343</strong>, or use a tunnel). In <code>playlist.json</code>:
					the map and mode pairs to play.
				</p>
			</div>
		</li>
		<li>
			<span class="num">4</span>
			<div class="grow">
				<h3>Run it</h3>
				<p>From a normal terminal in that folder. Check on it at any time with <code>status</code>.</p>
				<div class="codes">
					<CodeBlock code="hi-hostagent.exe" />
					<CodeBlock code="hi-hostagent status" label="Server, players, playlist and vote state" />
				</div>
			</div>
		</li>
	</ol>

	<h3 class="sub">What you can turn on</h3>
	<p class="sub-intro">All optional, set in <code>hostagent.json</code>.</p>
	<div class="options">
		{#each options as option (option.key)}
			<article class="option">
				<code class="key">{option.key}</code>
				<h4>{option.title}</h4>
				<p>{option.text}</p>
			</article>
		{/each}
	</div>
	<p class="always">
		Always on: proxy mode with player counts and ping, a reachability check, kick and ban, and
		per-player rate limits.
	</p>

	<div class="cards">
		<article class="details">
			<h3 class="details-header">In the zip</h3>
			{#each files as file (file.name)}
				<div class="details-row">
					<div>
						<code>{file.name}</code>
						<small>{file.text}</small>
					</div>
				</div>
			{/each}
		</article>

		<article class="details">
			<h3 class="details-header">Before you host</h3>
			<div class="details-row">
				<div>
					It modifies your own server process
					<small
						>To control maps and modes, the DLL is loaded into the server you host. Never into
						players’ games, never near anti-cheat. You run it at your own risk with respect to the
						game’s terms of service.</small
					>
				</div>
			</div>
			<div class="details-row">
				<div>
					One game build at a time
					<small
						>After a Halo update, hosting with map and mode control waits for an OpenLink update.</small
					>
				</div>
			</div>
			<div class="details-row">
				<div>
					Players stay unmodified
					<small>Their games aren’t touched, and Microsoft sign-in stays in the game.</small>
				</div>
			</div>
			<div class="details-row">
				<div>
					Playing on the same PC?
					<small
						>Set the OpenLink app to <strong>LAN broadcast</strong> in Settings. Your server occupies
						the LAN discovery port, so otherwise the game won’t see it.</small
					>
				</div>
			</div>
		</article>
	</div>

	<details class="format">
		<summary>
			<span>Playlist format</span>
			<Icon name="chevron" size={16} class="chev" />
		</summary>
		<div class="format-body">
			<pre><code>{playlistExample}</code></pre>
			<ul>
				<li><code>id</code>: unique per entry; letters, digits and dashes, up to 80 characters.</li>
				<li><code>name</code>: shown to players when voting (up to 80 bytes; longer is cut).</li>
				<li>
					<code>map</code> / <code>mode</code>: asset and version IDs as shown in the content browser,
					as lowercase UUIDs. Pin a version.
				</li>
				<li>
					<code>mode_kind</code>: <code>"custom"</code> (default, a UGC game variant). Engine modes
					aren’t supported, and at least one entry must be custom.
				</li>
				<li><code>enabled</code>: optional, default <code>true</code>.</li>
				<li>
					<code>selection</code>: <code>"shuffle_bag"</code> (default) or <code>"sequential"</code>,
					for rotation without voting.
				</li>
				<li>
					No thumbnail field: the app finds each map’s image from its asset and version IDs.
				</li>
			</ul>
		</div>
	</details>

	<p class="guide">
		<span>
			{#if REPO_PUBLIC}
				Every option is covered in <code>README.txt</code> and the
				<a href={HOSTING_GUIDE_URL} class="text-link" target="_blank" rel="noopener"
					>full hosting guide</a
				>.
			{:else}
				Every option is covered in <code>README.txt</code> in the zip. The full hosting guide is
				<code>docs/HOSTING.md</code> in the repo, which goes public with the source.
			{/if}
		</span>
	</p>
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
		display: grid;
		grid-template-columns: 1fr 1fr;
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

	.steps p {
		margin-top: -6px;
	}

	p {
		font-size: 14px;
		font-weight: 400;
		opacity: 0.85;
	}

	strong {
		font-weight: 600;
	}

	.codes {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.sub {
		margin-top: 28px;
		font-size: 20px;
		font-weight: 700;
	}

	.sub-intro {
		margin: 2px 0 14px;
	}

	.options {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 10px;
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

	h4 {
		margin: 0;
		font-size: 16px;
		font-weight: 700;
	}

	.always {
		margin-top: 12px;
	}

	.cards {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
		align-items: start;
		margin-top: 24px;
	}

	.cards .details-header {
		padding-top: 20px;
		font-size: 20px;
		font-weight: 700;
	}

	.format {
		margin-top: 16px;
		border-radius: 12px;
		background-color: var(--top-container-bg);
	}

	.format summary {
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

	.format summary::-webkit-details-marker {
		display: none;
	}

	.format summary:hover {
		background-color: var(--button-bg);
		color: var(--button-color);
	}

	.format summary :global(.chev) {
		flex-shrink: 0;
		color: var(--sidebar-color);
		transition: transform 0.2s ease-in-out;
	}

	.format[open] summary :global(.chev) {
		transform: rotate(180deg);
		color: var(--button-color);
	}

	.format-body {
		padding: 0 18px 18px;
	}

	pre {
		margin: 0;
		padding: 14px 16px;
		border-radius: 8px;
		background-color: var(--theme-bg);
		overflow-x: auto;
	}

	pre code {
		padding: 0;
		background: none;
		font-size: 13px;
		line-height: 1.6;
		color: var(--button-color);
		white-space: pre;
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin: 14px 0 0;
		padding-left: 20px;
		font-size: 14px;
		font-weight: 400;
		opacity: 0.9;
	}

	.guide {
		margin-top: 16px;
	}

	@media (max-width: 1100px) {
		.options {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 900px) {
		.steps,
		.cards {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 640px) {
		.options {
			grid-template-columns: 1fr;
		}
	}
</style>
