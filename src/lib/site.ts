import type { IconName } from '#lib/components/Icon.svelte';

export const SITE_NAME = 'OpenLink';
export const SITE_URL = 'https://openlink.unggoy.xyz';
export const SITE_TITLE = 'OpenLink by Unggoy: community dedicated servers for Halo Infinite';
export const SITE_DESCRIPTION =
	'Run your own Halo Infinite server, list it in a community directory, and let players anywhere join it. Uses the game’s own LAN server mode; players’ games are never modified.';

/** Public directory API. Not a page: only shown where hosts or players need the address. */
export const DIRECTORY_URL = 'https://openlink-dir.unggoy.xyz';

export const REPO_SLUG = 'Unggoy1/OpenLink';
export const REPO_URL = `https://github.com/${REPO_SLUG}`;
/** Flip to true once the repository is public; GitHub links then appear across the site. */
export const REPO_PUBLIC = true;
export const HOSTING_GUIDE_URL = `${REPO_URL}/blob/main/docs/HOSTING.md`;
export const HOST_CONTROL_URL = `${REPO_URL}/blob/main/docs/HOST-CONTROL.md`;
// Not /releases/latest: GitHub skips pre-releases there.
export const RELEASES_URL = `${REPO_URL}/releases`;

export const UNGGOY_URL = 'https://unggoy.xyz';
export const DISCORD_URL = 'https://discord.gg/xnwFA4z2HA';

export interface NavLink {
	href: string;
	label: string;
	/** Shown in the top bar on desktop. */
	desktop?: boolean;
	/** Shown in the mobile bottom bar (Unggoy's bottom-nav), which needs an icon. */
	mobileIcon?: IconName;
	/** Shorter label for the bottom bar. */
	short?: string;
}

/** Links to "/#id" highlight while that home-page section is in view; others while on that page. */
export const NAV_LINKS: NavLink[] = [
	{ href: '/#downloads', label: 'Downloads', desktop: true, mobileIcon: 'download', short: 'Download' },
	{ href: '/#play', label: 'Play', desktop: true, mobileIcon: 'gamepad' },
	{ href: '/#faq', label: 'FAQ', desktop: true, mobileIcon: 'question' },
	{ href: '/host', label: 'Host a server', desktop: true, mobileIcon: 'server', short: 'Host' },
	{ href: '/about', label: 'How it works', desktop: true, mobileIcon: 'list', short: 'About' }
];
