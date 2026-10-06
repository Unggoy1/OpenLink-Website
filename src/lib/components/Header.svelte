<script lang="ts">
	import Logo from './Logo.svelte';
	import Icon from './Icon.svelte';
	import { NAV_LINKS } from '#lib/site.ts';

	const desktopLinks = NAV_LINKS.filter((link) => link.desktop);
	const mobileLinks = NAV_LINKS.filter((link) => link.mobileIcon);

	let active = $state('top');

	// Highlight the section in view, like Unggoy's .is-active sidebar link.
	$effect(() => {
		const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(
			(el): el is HTMLElement => el !== null
		);

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) active = entry.target.id;
				}
			},
			{ rootMargin: '-40% 0px -55% 0px' }
		);

		sections.forEach((section) => observer.observe(section));
		return () => observer.disconnect();
	});
</script>

<header class="header">
	<div class="header-inner">
		<a href="#top" class="brand" aria-label="OpenLink home">
			<!-- Same rendered height as Unggoy's sidebar logo (~48px) -->
			<Logo height={48} />
		</a>

		<nav class="top-menu" aria-label="Primary">
			{#each desktopLinks as link (link.id)}
				<a
					href="#{link.id}"
					class="top-link"
					class:is-active={active === link.id}
					aria-current={active === link.id ? 'location' : undefined}
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<a href="#downloads" class="btn small download">
			<Icon name="download" />
			Download
		</a>
	</div>
</header>

<!-- Unggoy's mobile bottom navigation -->
<nav class="bottom-nav" aria-label="Sections">
	{#each mobileLinks as link (link.id)}
		<a
			href="#{link.id}"
			class="bottom-nav-link"
			class:is-active={active === link.id}
			aria-current={active === link.id ? 'location' : undefined}
		>
			{#if link.mobileIcon}
				<Icon name={link.mobileIcon} size={22} />
			{/if}
			<span>{link.short ?? link.label}</span>
		</a>
	{/each}
</nav>

<style>
	.header {
		position: sticky;
		top: 0;
		z-index: 100;
		background-color: var(--sidebar-bg);
		border-bottom: 1px solid var(--outline);
	}

	.header-inner {
		display: flex;
		align-items: center;
		gap: 24px;
		max-width: var(--page-width);
		height: var(--header-height);
		margin: 0 auto;
		padding: 0 24px;
	}

	.brand {
		flex-shrink: 0;
		padding-right: 8px;
	}

	/* Unggoy .side-menu a, laid out horizontally */
	.top-menu {
		display: flex;
		align-items: center;
		gap: 4px;
		flex: 1;
		min-width: 0;
	}

	.top-link {
		display: flex;
		align-items: center;
		height: 44px;
		padding: 0 16px;
		border-radius: 12px;
		color: var(--body-color);
		font-size: 15px;
		line-height: 20px;
		white-space: nowrap;
		transition: all 0.3s ease-in-out;
	}

	.top-link:hover,
	.top-link.is-active {
		color: var(--button-color);
		background-color: var(--button-bg);
		font-weight: 700;
	}

	.download {
		flex-shrink: 0;
		margin-left: auto;
	}

	@media screen and (max-width: 1040px) {
		.header-inner {
			gap: 16px;
		}

		.brand :global(img) {
			width: auto;
			height: 40px;
		}

		.top-link {
			padding: 0 9px;
			font-size: 14px;
		}

		/* Not enough room for every link and the button; Downloads is in the menu. */
		.download {
			display: none;
		}
	}

	.bottom-nav {
		display: none;
	}

	@media screen and (max-width: 860px) {
		.header-inner {
			height: 68px;
			padding: 0 16px;
		}

		.top-menu {
			display: none;
		}

		.brand :global(img) {
			width: auto;
			height: 40px;
		}

		.bottom-nav {
			display: flex;
			justify-content: space-around;
			align-items: center;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			min-height: calc(60px + env(safe-area-inset-bottom));
			padding-bottom: env(safe-area-inset-bottom);
			background-color: var(--navbar-bg);
			box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
			border-top: 1px solid var(--outline);
			z-index: 1000;
		}

		.bottom-nav-link {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 6px 12px;
			border-radius: 12px;
			color: var(--navbar-color);
			transition: all 0.3s ease-in-out;
		}

		.bottom-nav-link :global(svg) {
			width: 22px;
			height: 22px;
			margin-bottom: 4px;
		}

		.bottom-nav-link span {
			font-size: 12px;
			line-height: 1;
			font-weight: 500;
		}

		.bottom-nav-link:hover,
		.bottom-nav-link.is-active {
			color: var(--button-color);
			background-color: var(--button-bg);
		}
	}

	@media screen and (max-width: 380px) {
		.bottom-nav-link {
			padding: 6px 8px;
		}
	}
</style>
