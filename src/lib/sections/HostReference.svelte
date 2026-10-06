<script lang="ts">
	import Panel from '#lib/components/Panel.svelte';
	import { HOST_CONTROL_URL, HOSTING_GUIDE_URL, REPO_PUBLIC, UNGGOY_URL } from '#lib/site.ts';

	const files = [
		{
			name: 'openlink-server.exe',
			text: 'Starts and supervises the game’s LAN server, lists it, passes players through, and runs the playlist and voting.'
		},
		{
			name: 'openlink-control.dll',
			text: 'Server-side control, loaded only into your own server process.'
		},
		{ name: 'openlink-loader.exe', text: 'Loads the DLL into the server OpenLink Server starts.' },
		{
			name: 'openlink-server.example.json',
			text: 'Example config with a playlist, voting and a server-owned lobby.'
		},
		{ name: 'playlist.example.json', text: 'Example playlist.' },
		{ name: 'README.txt', text: 'Setup steps.' }
	];

	const caveats = [
		{
			title: 'It modifies your own server process',
			text: 'To control maps and modes, the DLL is loaded into the server you host. Never into players’ games, never near anti-cheat. You run it at your own risk with respect to the game’s terms of service.'
		},
		{
			title: 'One game build at a time',
			text: 'Each release supports one Halo Infinite build. After a Halo update, OpenLink Server refuses to start (and says why in its log) until an update for the new build is out.'
		},
		{
			title: 'Opening a port is your call',
			text: 'Hosting exposes a port on your network to the internet. OpenLink is provided as is, without warranty.'
		},
		{
			title: 'Players stay unmodified',
			text: 'Their games aren’t touched, and Microsoft sign-in stays in the game.'
		}
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

<Panel id="reference" title="Before you host">
	<div class="cards">
		<article class="details">
			<h3 class="details-header">Good to know</h3>
			{#each caveats as caveat (caveat.title)}
				<div class="details-row">
					<div>
						{caveat.title}
						<small>{caveat.text}</small>
					</div>
				</div>
			{/each}
		</article>

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
	</div>

	<h3 class="sub" id="playlist">Playlist format</h3>
	<p class="sub-intro">
		Maps and modes are published content, official or community-made, picked by asset and version
		ID.
		<a href={UNGGOY_URL} class="text-link" target="_blank" rel="noopener">unggoy.xyz</a> will export
		playlists in this format.
	</p>
	<div class="format">
		<pre><code>{playlistExample}</code></pre>
		<ul>
			<li><code>id</code>: unique per entry; letters, digits and dashes, up to 80 characters.</li>
			<li><code>name</code>: shown to players when voting (up to 80 bytes; longer is cut).</li>
			<li>
				<code>map</code> / <code>mode</code>: asset and version IDs as shown in the content browser,
				as lowercase UUIDs. Pin a version.
			</li>
			<li><code>enabled</code>: optional, default <code>true</code>.</li>
			<li>
				<code>selection</code>: <code>"shuffle_bag"</code> (default) or <code>"sequential"</code>,
				for rotation without voting.
			</li>
			<li>No thumbnail field: the app finds each map’s image from its IDs.</li>
		</ul>
	</div>

	<p class="guide">
		{#if REPO_PUBLIC}
			Every setting is in <code>README.txt</code>, the
			<a href={HOSTING_GUIDE_URL} class="text-link" target="_blank" rel="noopener">full hosting guide</a
			>
			and the
			<a href={HOST_CONTROL_URL} class="text-link" target="_blank" rel="noopener"
				>playlist and voting reference</a
			>.
		{:else}
			Every setting is in <code>README.txt</code> in the zip. The full hosting guide goes public with
			the source.
		{/if}
	</p>
</Panel>

<style>
	.cards {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
		align-items: start;
	}

	.cards .details-header {
		padding-top: 20px;
		font-size: 20px;
		font-weight: 700;
	}

	.sub {
		margin-top: 28px;
		font-size: 20px;
		font-weight: 700;
	}

	.sub-intro,
	.guide {
		font-size: 14px;
		font-weight: 400;
		opacity: 0.85;
	}

	.sub-intro {
		margin: 2px 0 14px;
	}

	.format {
		padding: 16px 18px 18px;
		border-radius: 12px;
		background-color: var(--top-container-bg);
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

	@media (max-width: 900px) {
		.cards {
			grid-template-columns: 1fr;
		}
	}
</style>
