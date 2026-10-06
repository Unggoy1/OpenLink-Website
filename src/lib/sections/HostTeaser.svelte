<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import Panel from '#lib/components/Panel.svelte';

	const highlights = [
		{ title: 'Hands-off', text: 'Starts, restarts and lists your server for you.' },
		{ title: 'Your playlist', text: 'The server picks every map and mode, or players vote.' },
		{ title: 'No lobby leader', text: 'Matches start on their own and end on their limits.' },
		{ title: 'Moderation', text: 'Player list, kick and ban, rate limits.' }
	];
</script>

<Panel id="hosting" title="Host a server">
	{#snippet intro()}
		Got a Windows PC with Halo Infinite and a router where you can forward a port? OpenLink Server
		runs the game’s LAN server for you and puts it in the public server list.
	{/snippet}

	<div class="highlights">
		{#each highlights as item (item.title)}
			<div class="highlight">
				<h3>{item.title}</h3>
				<p>{item.text}</p>
			</div>
		{/each}
	</div>

	<div class="ctas">
		<a href="/host" class="btn light">
			<Icon name="server" />
			Read the hosting guide
		</a>
		<a href="#downloads" class="btn">
			<Icon name="download" />
			Download OpenLink Server
		</a>
	</div>
</Panel>

<style>
	.highlights {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 10px;
	}

	.highlight {
		padding: 14px 16px;
		border-radius: 12px;
		background-color: var(--top-container-bg);
	}

	h3 {
		font-size: 15px;
		font-weight: 600;
	}

	p {
		margin-top: 4px;
		font-size: 14px;
		font-weight: 400;
		opacity: 0.8;
	}

	.ctas {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 16px;
	}

	@media (max-width: 1000px) {
		.highlights {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 520px) {
		.highlights {
			grid-template-columns: 1fr;
		}
	}
</style>
