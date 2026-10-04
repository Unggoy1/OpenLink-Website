import type { IconName } from '#lib/components/Icon.svelte';

export const SITE_NAME = 'OpenLink';
export const SITE_URL = 'https://openlink.unggoy.xyz';
export const SITE_TITLE = 'OpenLink by Unggoy: community dedicated servers for Halo Infinite';
export const SITE_DESCRIPTION =
	'Run your own Halo Infinite server, list it in a community directory, and let players anywhere join it. Uses the game’s own LAN server mode; nothing in the game is modified.';

/** Public directory API. Not a page: only shown where hosts or players need the address. */
export const DIRECTORY_URL = 'https://openlink-dir.unggoy.xyz';

export const REPO_URL = 'https://github.com/Unggoy1/OpenLink';
/** Flip to true once the repository is public; GitHub links then appear across the page. */
export const REPO_PUBLIC = false;
export const HOSTING_GUIDE_URL = `${REPO_URL}/blob/main/docs/HOSTING.md`;
export const RELEASES_URL = `${REPO_URL}/releases/latest`;

export const UNGGOY_URL = 'https://unggoy.xyz';
export const DISCORD_URL = 'https://discord.gg/xnwFA4z2HA';

export interface NavLink {
	id: string;
	label: string;
	/** Shown in the top bar on desktop. */
	desktop?: boolean;
	/** Shown in the mobile bottom bar (Unggoy's bottom-nav), which needs an icon. */
	mobileIcon?: IconName;
	/** Shorter label for the bottom bar. */
	short?: string;
}

export const NAV_LINKS: NavLink[] = [
	{ id: 'top', label: 'Home', mobileIcon: 'home' },
	{ id: 'features', label: 'Features', desktop: true },
	{ id: 'how-it-works', label: 'How it works', desktop: true },
	{ id: 'play', label: 'Play', desktop: true, mobileIcon: 'gamepad' },
	{ id: 'host', label: 'Host', desktop: true, mobileIcon: 'server' },
	{ id: 'downloads', label: 'Downloads', desktop: true, mobileIcon: 'download', short: 'Download' },
	{ id: 'faq', label: 'FAQ', desktop: true, mobileIcon: 'question' }
];
