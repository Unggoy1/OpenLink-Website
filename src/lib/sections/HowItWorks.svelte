<script lang="ts">
	import HowItWorksDiagram from '#lib/components/HowItWorksDiagram.svelte';
	import Panel from '#lib/components/Panel.svelte';
</script>

<Panel id="how-it-works" title="How it works">
	{#snippet intro()}
		Halo Infinite has a LAN server mode. A LAN server announces itself on the local network with a
		small “beacon”, and the game connects to it on UDP port 1343. OpenLink carries both across the
		internet.
	{/snippet}

	<HowItWorksDiagram />

	<ol class="steps">
		<li>
			<span class="num">1</span>
			<div>
				<h3>Host</h3>
				<p>
					OpenLink Server runs the game’s LAN server and sends its beacon to the directory,
					with a heartbeat to keep the listing fresh.
				</p>
			</div>
		</li>
		<li>
			<span class="num">2</span>
			<div>
				<h3>Directory</h3>
				<p>
					A public list of servers. Listings expire 45 seconds after the last heartbeat, and
					reachability is checked about once a minute.
				</p>
			</div>
		</li>
		<li>
			<span class="num">3</span>
			<div>
				<h3>Player</h3>
				<p>
					The OpenLink app replays the server’s beacon on your PC and forwards game traffic to the
					host. To the game, it’s an ordinary LAN game.
				</p>
			</div>
		</li>
	</ol>
</Panel>

<style>
	.steps {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
		margin: 16px 0 0;
		padding: 0;
		list-style: none;
	}

	.steps li {
		display: flex;
		gap: 14px;
		padding: 16px;
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

	h3 {
		font-size: 16px;
		font-weight: 700;
		padding-top: 5px;
	}

	p {
		margin-top: 6px;
		font-size: 14px;
		font-weight: 400;
		line-height: 1.5;
		opacity: 0.85;
	}

	@media (max-width: 900px) {
		.steps {
			grid-template-columns: 1fr;
		}
	}
</style>
