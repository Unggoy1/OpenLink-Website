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
			text: 'Steam running and signed in. Close Halo if you started it from Steam.'
		},
		{
			title: 'Unzip OpenLink Launcher into its own folder',
			text: 'Get it from <a href="#downloads" class="text-link">Downloads</a>. <strong>Not into your Halo Infinite folder</strong>: files in the game folder can cause problems with anti-cheat. Desktop or Documents is fine.'
		},
		{
			title: 'Run openlink-launcher.exe',
			text: 'It finds Halo in your Steam library, starts it and adds OpenLink. Its window closes by itself, or stays open and says what went wrong. <code>openlink-launcher.exe -create-shortcut</code> adds a Desktop shortcut.'
		},
		{
			title: 'Join from the in-game browser',
			text: 'Go to <strong>Play → Custom Game → OpenLink Servers</strong>, pick a server and press <strong>Join</strong>.'
		},
		{
			title: 'Vote, play, leave',
			text: 'Vote for the next match in the lobby: click a choice, press <strong>Alt+1</strong>–<strong>4</strong>, or hold <strong>View</strong> and press the D-pad. <strong>Back</strong> in the lobby asks before you leave the server.'
		}
	];

	const notes: Step[] = [
		{
			title: 'No port forwarding',
			text: 'Only hosts need to open a port.'
		},
		{
			title: 'Normal Halo is unaffected',
			text: 'Start Halo from Steam as usual for matchmaking: anti-cheat runs normally. With the launcher, official matchmaking is unavailable and the game shows OFFLINE.'
		},
		{
			title: 'Stays up to date',
			text: 'When a newer launcher is out, it offers the download page when it starts.'
		},
		{
			title: 'Hosting on the same PC?',
			text: 'Works as is: the launcher notices a server on your PC and adjusts by itself.'
		}
	];
</script>

<Panel id="play" title="How to play">
	{#snippet intro()}
		No port forwarding and no setup: Halo Infinite on Steam and OpenLink Launcher.
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
