<script lang="ts">
	import Icon from './Icon.svelte';
</script>

<aside class="server-notice" aria-label="Before you host">
	<Icon name="warning" size={18} class="server-notice-icon" />
	<p>
		<strong>Hosting opens your PC to the internet.</strong> OpenLink Server is early beta software
		that accepts connections from anyone, so only forward the one port it needs.
	</p>
</aside>

<style>
	.server-notice {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		padding: 10px 12px;
		border-radius: 12px;
		background-color: var(--warning-bg);
		border: 1px solid var(--warning-border);
		color: var(--warning-color);
	}

	.server-notice :global(.server-notice-icon) {
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
