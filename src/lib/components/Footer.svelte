<script lang="ts">
	import Logo from './Logo.svelte';
	import Icon from './Icon.svelte';
	import { DISCORD_URL, REPO_PUBLIC, REPO_URL, UNGGOY_URL } from '#lib/site.ts';
	import type { Program } from '#lib/types.ts';

	interface Props {
		programs: Program[];
	}

	let { programs }: Props = $props();

	// The app and the server are versioned separately; show both.
	const versions = $derived(
		[
			{ id: 'app', label: 'App' },
			{ id: 'server', label: 'Server' }
		].flatMap(({ id, label }) => {
			const release = programs.find((p) => p.id === id)?.release;
			return release ? [{ label, release }] : [];
		})
	);
</script>

<!-- Laid out like Unggoy's .sidebar-footer: social icons, then small text links -->
<footer class="footer">
	<div class="footer-inner">
		<div class="footer-brand">
			<Logo height={30} />
			<a href={UNGGOY_URL} class="unggoy-link" target="_blank" rel="noopener">
				Browse maps on Unggoy
			</a>
		</div>

		<div class="footer-meta">
			<div class="footer-socials">
				<a href={DISCORD_URL} target="_blank" rel="noopener" aria-label="Discord">
					<Icon name="discord" size={24} class="social-icon" />
				</a>
				{#if REPO_PUBLIC}
					<a href={REPO_URL} target="_blank" rel="noopener" aria-label="GitHub">
						<Icon name="github" size={24} class="social-icon" />
					</a>
				{/if}
				<a href={UNGGOY_URL} target="_blank" rel="noopener" aria-label="Unggoy">
					<Icon name="map" size={24} class="social-icon" />
				</a>
			</div>
			<div class="footer-links">
				{#each versions as v (v.label)}
					<a href={v.release.url} class="footer-link" target="_blank" rel="noopener"
						>{v.label} {v.release.version}</a
					>
				{/each}
				<a href="/host" class="footer-link">Host a server</a>
				<a href="/about#status" class="footer-link">Status</a>
				<a href="/about#source" class="footer-link">Source</a>
				<a href={UNGGOY_URL} class="footer-link" target="_blank" rel="noopener">unggoy.xyz</a>
			</div>
		</div>
	</div>

	<p class="disclaimer">
		Unofficial fan project. Not affiliated with or endorsed by Microsoft, Xbox or Halo Studios. Halo
		is a trademark of Microsoft.
	</p>
</footer>

<style>
	.footer {
		max-width: var(--page-width);
		margin: 0 auto;
		padding: 24px 24px 32px;
	}

	.footer-inner {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 24px;
		padding: 24px;
		border-radius: 20px;
		background-color: var(--sidebar-bg);
	}

	.footer-brand {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.unggoy-link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 14px;
		color: var(--sidebar-color);
	}

	.unggoy-link:hover {
		color: var(--button-color);
	}

	.footer-meta {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.footer-socials {
		display: flex;
		gap: 16px;
		margin-bottom: 8px;
	}

	.footer-socials :global(.social-icon) {
		color: var(--body-color);
		transition: color 0.3s ease;
	}

	.footer-socials a:hover :global(.social-icon) {
		color: var(--button-color-hover);
	}

	.footer-links {
		display: flex;
		gap: 16px;
	}

	.footer-link {
		color: var(--body-color);
		font-size: 12px;
		transition: color 0.3s ease;
	}

	a.footer-link:hover {
		color: var(--button-color);
	}

	.disclaimer {
		margin-top: 16px;
		padding: 0 8px;
		font-size: 12px;
		font-weight: 400;
		color: var(--sidebar-color);
		opacity: 0.8;
	}

	/* Room for the mobile bottom nav */
	@media (max-width: 860px) {
		.footer {
			padding: 16px 16px calc(90px + env(safe-area-inset-bottom));
		}
	}

	@media (max-width: 640px) {

		.footer-inner {
			flex-direction: column;
		}

		.footer-meta {
			align-items: flex-start;
		}
	}
</style>
