<script lang="ts">
	import Icon, { type IconName } from '#lib/components/Icon.svelte';

	const points: { icon: IconName; title: string; text: string }[] = [
		{
			icon: 'gamepad',
			title: 'Players’ games are untouched',
			text: 'The game’s own LAN server mode. No modded files, no memory editing, nothing near anti-cheat.'
		},
		{
			icon: 'check',
			title: 'You sign in normally',
			text: 'OpenLink never sees your Xbox or Microsoft credentials. No accounts, no sign-in data.'
		},
		{
			icon: 'server',
			title: 'Traffic passes straight through',
			text: 'Game traffic is encrypted by the game and forwarded unchanged. OpenLink never reads it.'
		}
	];
</script>

<section class="safety" id="safety" aria-label="Safe by design">
	{#each points as point (point.title)}
		<div class="point">
			<Icon name={point.icon} size={22} class="point-icon" />
			<div>
				<h3>{point.title}</h3>
				<p>{point.text}</p>
			</div>
		</div>
	{/each}
</section>

<style>
	.safety {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
		margin-bottom: 16px;
	}

	/* Unggoy .feature-item glass tile */
	.point {
		display: flex;
		gap: 14px;
		padding: 18px;
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: 12px;
	}

	.point :global(.point-icon) {
		flex-shrink: 0;
		margin-top: 2px;
		color: var(--button-color);
	}

	h3 {
		font-size: 16px;
		font-weight: 600;
	}

	p {
		margin-top: 4px;
		font-size: 14px;
		font-weight: 400;
		opacity: 0.8;
	}

	@media (max-width: 900px) {
		.safety {
			grid-template-columns: 1fr;
		}
	}
</style>
