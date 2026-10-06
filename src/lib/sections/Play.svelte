<script lang="ts">
	import Panel from '#lib/components/Panel.svelte';
</script>

<Panel id="play" title="How to play">
	{#snippet intro()}
		No port forwarding and no config files. You need the Steam version of the game, on the same
		version as the server, and the OpenLink app.
	{/snippet}

	<div class="layout">
		<ol class="steps">
			<li>
				<span class="num">1</span>
				<div>
					<h3>Install Halo Infinite on Steam</h3>
					<p>You need the same game version as the server. On Linux, run it through Steam/Proton.</p>
				</div>
			</li>
			<li>
				<span class="num">2</span>
				<div>
					<h3>Download and open the OpenLink app</h3>
					<p>
						Get it from <a href="#downloads" class="text-link">Downloads</a>. Enter your settings
						once; the app tells you when a newer release is out.
					</p>
				</div>
			</li>
			<li>
				<span class="num">3</span>
				<div>
					<h3>Click Join on a server</h3>
					<p>The status bar goes contacting → ready → playing.</p>
				</div>
			</li>
			<li>
				<span class="num">4</span>
				<div>
					<h3>Pick the host’s PC in Halo Infinite</h3>
					<p>Go to <strong>Custom Games → Server</strong> and pick the host’s PC name.</p>
				</div>
			</li>
			<li>
				<span class="num">5</span>
				<div>
					<h3>Keep OpenLink open while you play</h3>
					<p>
						Closing it disconnects you. On servers with voting, it chimes when a vote opens; alt-tab
						to it to pick the next match.
					</p>
				</div>
			</li>
		</ol>

		<aside class="details">
			<h3 class="details-header">Good to know</h3>
			<div class="details-row">
				<div>
					Keep the app updated
					<small>Update when a new version ships. Servers with voting need the latest app.</small>
				</div>
			</div>
			<div class="details-row">
				<div>
					Hosting on the same PC?
					<small
						>Set the app to <strong>LAN broadcast</strong> in Settings, or the game won’t see your server.</small
					>
				</div>
			</div>
			<div class="details-row">
				<div>
					No port forwarding
					<small>Only hosts need to open a port.</small>
				</div>
			</div>
			<div class="details-row">
				<div>
					Versions must match
					<small>Servers on another game version are listed but can’t be joined.</small>
				</div>
			</div>
		</aside>
	</div>
</Panel>

<style>
	.layout {
		display: grid;
		grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
		gap: 16px;
		align-items: start;
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

	.steps h3 {
		font-size: 16px;
		font-weight: 600;
		padding-top: 5px;
	}

	p {
		margin-top: 4px;
		font-size: 14px;
		font-weight: 400;
		opacity: 0.85;
	}

	strong {
		font-weight: 600;
	}

	@media (max-width: 900px) {
		.layout {
			grid-template-columns: 1fr;
		}
	}
</style>
