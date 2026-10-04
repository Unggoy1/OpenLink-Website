<script lang="ts">
	import CodeBlock from '#lib/components/CodeBlock.svelte';
	import Panel from '#lib/components/Panel.svelte';

	const tabs = [
		{ id: 'app', label: 'OpenLink app' },
		{ id: 'cli', label: 'hi-connector (command line)' }
	] as const;

	let tab = $state<(typeof tabs)[number]['id']>('app');
</script>

<Panel id="play" title="How to play">
	{#snippet intro()}
		No port forwarding and no config files. You need the Steam version of the game, on the same
		version as the server.
	{/snippet}

	<div class="chips" role="tablist" aria-label="Client">
		{#each tabs as t (t.id)}
			<button
				class="chip"
				class:active={tab === t.id}
				role="tab"
				aria-selected={tab === t.id}
				aria-controls="play-steps"
				onclick={() => (tab = t.id)}
			>
				{t.label}
			</button>
		{/each}
	</div>

	<div class="layout">
		<div id="play-steps" role="tabpanel">
		<ol class="steps">
			{#if tab === 'app'}
				<li>
					<span class="num">1</span>
					<div>
						<h3>Install Halo Infinite on Steam</h3>
						<p>You need the same game version as the server.</p>
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
						<p>Closing it disconnects you.</p>
					</div>
				</li>
			{:else}
				<li>
					<span class="num">1</span>
					<div>
						<h3>Run Halo Infinite through Steam/Proton</h3>
						<p>You need the same game version as the server.</p>
					</div>
				</li>
				<li>
					<span class="num">2</span>
					<div>
						<h3>Download hi-connector</h3>
						<p>
							Get the Linux (or Windows) build from <a href="#downloads" class="text-link"
								>Downloads</a
							>.
						</p>
					</div>
				</li>
				<li>
					<span class="num">3</span>
					<div class="grow">
						<h3>List servers, then join one</h3>
						<p>It prints a status line every 5 seconds.</p>
						<div class="codes">
							<CodeBlock code="hi-connector list" />
							<CodeBlock code={'hi-connector join "My Server"'} />
						</div>
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
						<h3>Keep hi-connector running while you play</h3>
						<p>Stopping it disconnects you.</p>
					</div>
				</li>
			{/if}
		</ol>
		</div>

		<aside class="details">
			<h3 class="details-header">Good to know</h3>
			<div class="details-row">
				<div>
					One PC, one role
					<small>Don’t run a LAN server on the same PC you’re playing on.</small>
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
	.chips {
		margin-bottom: 16px;
	}

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

	.grow {
		flex: 1;
		min-width: 0;
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

	.codes {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: 12px;
	}

	@media (max-width: 900px) {
		.layout {
			grid-template-columns: 1fr;
		}
	}
</style>
