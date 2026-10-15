<script lang="ts">
	import Icon, { type IconName } from '#lib/components/Icon.svelte';

	const points: { icon: IconName; title: string; text: string }[] = [
		{
			icon: 'list',
			title: 'In-game server browser',
			text: 'Find community servers under Play → Custom Game, with what they are playing and how many players are on, and join in one press.'
		},
		{
			icon: 'gamepad',
			title: 'Vote for the next match',
			text: 'Pick the next map and mode right in the lobby, with mouse, keyboard or controller.'
		},
		{
			icon: 'server',
			title: 'Dedicated community servers',
			text: 'Hosts run their own playlists. The server runs the lobby, so matches keep going as players come and go.'
		}
	];
</script>

<section class="safety" id="features" aria-label="OpenLink features">
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
