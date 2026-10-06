<script lang="ts">
	import Panel from '#lib/components/Panel.svelte';

	interface Row {
		title: string;
		text: string;
	}

	// The server browser itself, shown under the screenshot.
	const basics: Row[] = [
		{
			title: 'One-click Join',
			text: 'A status bar that goes contacting → ready → playing.'
		},
		{
			title: 'Find your server',
			text: 'Filter by region, favourites and game version.'
		},
		{
			title: 'Ping and player counts',
			text: 'See how full a server is and how far away, before you join.'
		},
		{
			title: 'Stays up to date',
			text: 'Tells you when a newer version is out.'
		}
	];

	const rows: Row[] = [
		{
			title: 'Up to 4 choices',
			text: 'Map thumbnails, live vote counts and a countdown (30 seconds by default).'
		},
		{
			title: 'Change your mind',
			text: 'Click a card to vote, and switch until the countdown ends. Most votes wins; a tie or no votes is settled at random.'
		},
		{
			title: 'You’ll know when to vote',
			text: 'A short chime, a Windows notification and a flashing taskbar button. Alt-tab to the app, pick, and get back in.'
		},
		{
			title: 'The next match, by name',
			text: 'Once the vote closes, the app shows what’s next. The match starts a few seconds later.'
		},
		{
			title: 'One player, one vote',
			text: 'Only players connected to the server can vote. No accounts, no sign-in.'
		}
	];
</script>

<Panel id="app" title="The OpenLink app">
	{#snippet intro()}
		A desktop server browser for Windows. It lists community servers, joins them, keeps the
		game connected while you play, and on servers with voting, lets you pick the next match.
	{/snippet}

	<div class="layout">
		<div>
			<figure class="shot">
				<img
					src="/images/app-vote.webp"
					alt="The OpenLink app after a vote. Next match: Fiesta Slayer on Interference, starting in 2 s. Four map cards with thumbnails and vote counts; the winner, with 2 votes, is outlined in green."
					width="1600"
					height="593"
					loading="lazy"
					decoding="async"
				/>
				<figcaption>
					The vote panel after a vote closes. Map thumbnails are the official Halo Infinite
					thumbnails from Halo Waypoint’s public image host; the app loads nothing else.
				</figcaption>
			</figure>
			<div class="basics">
				{#each basics as row (row.title)}
					<div class="basic">
						<h4>{row.title}</h4>
						<p>{row.text}</p>
					</div>
				{/each}
			</div>
		</div>

		<article class="details">
			<h3 class="details-header">Vote for the next match</h3>
			{#each rows as row (row.title)}
				<div class="details-row">
					<div>
						{row.title}
						<small>{row.text}</small>
					</div>
				</div>
			{/each}
		</article>
	</div>
</Panel>

<style>
	.layout {
		display: grid;
		grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
		gap: 16px;
		align-items: start;
	}

	.shot {
		margin: 0;
	}

	.shot img {
		width: 100%;
		height: auto;
		border-radius: 12px;
		border: 1px solid var(--glass-border);
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
	}

	figcaption {
		margin-top: 12px;
		font-size: 13px;
		font-weight: 400;
		color: var(--sidebar-color);
		opacity: 0.9;
	}

	.basics {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		margin-top: 16px;
	}

	/* Unggoy .feature-item glass tile */
	.basic {
		padding: 14px 16px;
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: 12px;
	}

	h4 {
		margin: 0;
		font-size: 15px;
		font-weight: 600;
	}

	.basic p {
		margin-top: 4px;
		font-size: 14px;
		font-weight: 400;
		opacity: 0.8;
	}

	@media (max-width: 900px) {
		.layout {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 520px) {
		.basics {
			grid-template-columns: 1fr;
		}
	}
</style>
