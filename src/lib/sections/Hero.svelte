<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';
	import Logo from '#lib/components/Logo.svelte';
</script>

<!-- Unggoy's homepage .welcome-banner, without the background image -->
<section class="welcome-banner" id="top" aria-labelledby="hero-title">
	<div class="welcome-content">
		<h1 class="welcome-title" id="hero-title">
			<Logo height={120} class="hero-logo" />
		</h1>
		<p class="welcome-tagline">Dedicated servers for Halo Infinite</p>
		<p class="welcome-description">
			Run your own Halo Infinite server, list it in a community directory, and let players anywhere
			join it with one click. Built on the game’s own LAN server mode; players’ games are never
			modified.
		</p>
		<div class="ctas">
			<a href="#downloads" class="btn light">
				<Icon name="download" />
				Download OpenLink
			</a>
			<a href="/host" class="btn">
				<Icon name="server" />
				Host a server
			</a>
		</div>
	</div>
</section>

<style>
	.welcome-banner {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 24px 0 16px;
		border-radius: 20px;
		background: linear-gradient(135deg, var(--container-bg) 0%, var(--button-bg) 100%);
	}

	.welcome-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 760px;
		padding: 80px 40px;
		text-align: center;
	}

	.welcome-title {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.welcome-title :global(.hero-logo) {
		width: auto;
		height: clamp(64px, 12vw, 120px);
	}

	.welcome-tagline {
		margin-top: 12px;
		font-size: clamp(18px, 2.6vw, 24px);
		font-weight: 500;
		color: var(--container-color);
		opacity: 0.9;
	}

	.welcome-description {
		max-width: 600px;
		margin-top: 20px;
		font-size: 17px;
		font-weight: 400;
		color: var(--container-color);
		opacity: 0.8;
	}

	.ctas {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 12px;
		margin-top: 32px;
	}

	@media screen and (max-width: 769px) {
		.welcome-banner {
			margin-top: 16px;
		}

		.welcome-content {
			padding: 48px 20px;
		}

		.welcome-description {
			font-size: 16px;
		}
	}
</style>
