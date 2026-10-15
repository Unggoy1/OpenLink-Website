<script lang="ts">
	import Panel from '#lib/components/Panel.svelte';

	interface Shot {
		id: string;
		title: string;
		text: string;
		/** 960x540 thumbnail in static/images/. */
		src: string;
		/** Full-resolution crop shown when the thumbnail is clicked. */
		full: string;
		width: number;
		height: number;
		alt: string;
	}

	// 16:9 crops of 3440x1440 in-game screenshots.
	const shots: Shot[] = [
		{
			id: 'browser',
			title: 'In-game server browser',
			text: 'Play → Custom Game → OpenLink Servers: community servers with what they are playing and how many players are on.',
			src: '/images/ingame-browser.webp',
			full: '/images/ingame-browser-full.webp',
			width: 1789,
			height: 1006,
			alt: 'OpenLink Servers in Halo Infinite: six community servers with map art, the mode or match they are on, and player counts.'
		},
		{
			id: 'details',
			title: 'Server details',
			text: 'Select a server for its description, map and mode, and player count, then Join Game.',
			src: '/images/ingame-details.webp',
			full: '/images/ingame-details-full.webp',
			width: 1899,
			height: 1068,
			alt: 'Details of the server Infection Night by Unggoy.xyz: Plunderland, Arena:Infection, 11 of 16 players, its description and Join Game.'
		},
		{
			id: 'vote',
			title: 'Vote for the next match',
			text: 'A vote panel takes the place of the lobby’s greyed-out host options. Click a choice, press Alt+1–4, or use View + D-pad.',
			src: '/images/ingame-vote.webp',
			full: '/images/ingame-vote-full.webp',
			width: 2560,
			height: 1440,
			alt: 'A server lobby in Halo Infinite with the vote panel: four map and mode choices with thumbnails, vote counts and Alt+1 to Alt+4 hints, 27 seconds left.'
		}
	];

	let dialog: HTMLDialogElement | undefined = $state();
	let current: Shot | null = $state(null);

	function show(shot: Shot) {
		current = shot;
		dialog?.showModal();
	}

	function close() {
		dialog?.close();
	}

	// A click on the dimmed area around the image (the dialog itself) closes it.
	function backdropClick(event: MouseEvent) {
		if (event.target === dialog) close();
	}
</script>

<Panel id="screenshots" title="Screenshots">
	<div class="grid">
		{#each shots as shot (shot.id)}
			<figure class="shot">
				<button
					type="button"
					class="thumb"
					onclick={() => show(shot)}
					aria-label="View larger: {shot.title}"
				>
					<img src={shot.src} alt={shot.alt} width="960" height="540" loading="lazy" decoding="async" />
				</button>
				<figcaption>
					<strong>{shot.title}</strong>
					{shot.text}
				</figcaption>
			</figure>
		{/each}
	</div>
</Panel>

<!-- Esc closes a modal dialog natively; the click handler only adds closing from the backdrop. -->
<dialog
	bind:this={dialog}
	class="lightbox"
	aria-label={current?.title}
	onclick={backdropClick}
	onclose={() => (current = null)}
>
	{#if current}
		<figure>
			<img src={current.full} alt={current.alt} width={current.width} height={current.height} />
			<figcaption>
				<strong>{current.title}</strong>
				{current.text}
			</figcaption>
		</figure>
		<button type="button" class="close btn small" onclick={close}>Close</button>
	{/if}
</dialog>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 16px;
	}

	.shot {
		display: flex;
		flex-direction: column;
		margin: 0;
	}

	.thumb {
		display: block;
		padding: 0;
		border: 1px solid var(--glass-border);
		border-radius: 12px;
		background: none;
		overflow: hidden;
		cursor: zoom-in;
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
		transition: transform 0.2s ease-in-out, border-color 0.2s ease-in-out;
	}

	.thumb:hover,
	.thumb:focus-visible {
		transform: translateY(-2px);
		border-color: var(--button-color);
	}

	.thumb img {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 16 / 9;
	}

	figcaption {
		margin-top: 12px;
		font-size: 14px;
		font-weight: 400;
		color: var(--sidebar-color);
	}

	figcaption strong {
		display: block;
		margin-bottom: 2px;
		font-size: 15px;
		font-weight: 600;
		color: var(--container-color);
	}

	.lightbox {
		width: min(1400px, 94vw);
		max-height: 94vh;
		padding: 16px;
		border: 1px solid var(--glass-border);
		border-radius: 16px;
		background: var(--container-bg);
		color: var(--container-color);
	}

	.lightbox::backdrop {
		background: rgba(0, 0, 0, 0.8);
	}

	.lightbox figure {
		margin: 0;
	}

	.lightbox img {
		display: block;
		width: 100%;
		height: auto;
		max-height: calc(94vh - 120px);
		object-fit: contain;
		border-radius: 10px;
	}

	.close {
		position: absolute;
		top: 24px;
		right: 24px;
	}

	@media (max-width: 900px) {
		.grid {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
