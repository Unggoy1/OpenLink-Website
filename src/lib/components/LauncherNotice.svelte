<script lang="ts">
	import Icon from './Icon.svelte';
</script>

<aside class="launcher-notice" aria-label="Before you play">
	<Icon name="warning" size={18} class="launcher-notice-icon" />
	<p>
		<strong>Unzip it into its own folder, not into your Halo Infinite folder.</strong> Files in the
		game folder can cause problems with anti-cheat. The launcher starts Halo without anti-cheat and
		changes it in memory only, at your own risk with respect to the game’s terms.
	</p>
</aside>

<style>
	.launcher-notice {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		padding: 10px 12px;
		border-radius: 12px;
		background-color: var(--warning-bg);
		border: 1px solid var(--warning-border);
		color: var(--warning-color);
	}

	.launcher-notice :global(.launcher-notice-icon) {
		flex-shrink: 0;
		margin-top: 2px;
	}

	p {
		font-size: 13px;
		font-weight: 400;
		line-height: 1.45;
	}

	strong {
		font-weight: 600;
	}
</style>
