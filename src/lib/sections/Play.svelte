<script lang="ts">
	import Panel from '#lib/components/Panel.svelte';

	interface Step {
		title: string;
		text: string;
	}

	// Trusted static copy; may contain inline HTML.
	const steps: Step[] = [
		{
			title: 'Install Halo Infinite on Steam',
			text: 'On the same game version as the server.'
		},
		{
			title: 'Download and open the OpenLink app',
			text: 'Get it from <a href="#downloads" class="text-link">Downloads</a>. It tells you when a newer version is out.'
		},
		{
			title: 'Click Join on a server',
			text: 'The status bar goes contacting → ready → playing.'
		},
		{
			title: 'Pick the server in Halo Infinite',
			text: 'Go to <strong>Custom Game → Create Match → Server</strong> and pick it by name.'
		},
		{
			title: 'Keep OpenLink open while you play',
			text: 'Closing it disconnects you. On servers with voting, it chimes when a vote opens; alt-tab to it to pick the next match.'
		}
	];

	const notes: Step[] = [
		{
			title: 'No port forwarding',
			text: 'Only hosts need to open a port.'
		},
		{
			title: 'Versions must match',
			text: 'Servers on another game version are listed but can’t be joined.'
		},
		{
			title: 'Keep the app updated',
			text: 'Update when a new version ships; the app tells you.'
		},
		{
			title: 'Not showing up in game?',
			text: 'Switch the app to <strong>LAN broadcast</strong> in Settings. It does this by itself when the server runs on your own PC.'
		}
	];
</script>

<Panel id="play" title="How to play">
	{#snippet intro()}
		No port forwarding and no config files: just the Steam version of the game and the OpenLink app.
	{/snippet}

	<div class="layout">
		<ol class="steps">
			{#each steps as step, i (step.title)}
				<li>
					<span class="num">{i + 1}</span>
					<div>
						<h3>{step.title}</h3>
						<p>{@html step.text}</p>
					</div>
				</li>
			{/each}
		</ol>

		<aside class="details">
			<h3 class="details-header">Good to know</h3>
			{#each notes as note (note.title)}
				<div class="details-row">
					<div>
						{note.title}
						<small>{@html note.text}</small>
					</div>
				</div>
			{/each}
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

	.layout :global(strong) {
		font-weight: 600;
	}

	@media (max-width: 900px) {
		.layout {
			grid-template-columns: 1fr;
		}
	}
</style>
