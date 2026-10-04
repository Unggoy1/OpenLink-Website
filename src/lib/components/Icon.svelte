<script lang="ts" module>
	// Font Awesome Free 6 glyphs, the same set Unggoy's icon components use.
	// https://fontawesome.com/license/free
	import {
		faCheck,
		faChevronDown,
		faCircleQuestion,
		faCopy,
		faDesktop,
		faDownload,
		faGamepad,
		faHouse,
		faList,
		faMap,
		faServer
	} from '@fortawesome/free-solid-svg-icons';
	import { faDiscord, faGithub, faLinux, faWindows } from '@fortawesome/free-brands-svg-icons';
	import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

	const icons = {
		check: faCheck,
		chevron: faChevronDown,
		question: faCircleQuestion,
		copy: faCopy,
		monitor: faDesktop,
		download: faDownload,
		gamepad: faGamepad,
		home: faHouse,
		list: faList,
		map: faMap,
		server: faServer,
		discord: faDiscord,
		github: faGithub,
		linux: faLinux,
		windows: faWindows
	} satisfies Record<string, IconDefinition>;

	export type IconName = keyof typeof icons;
</script>

<script lang="ts">
	interface Props {
		name: IconName;
		size?: number;
		class?: string;
	}

	let { name, size = 20, class: className }: Props = $props();

	const glyph = $derived(icons[name].icon);
</script>

<svg
	class={className}
	width={size}
	height={size}
	viewBox="0 0 {glyph[0]} {glyph[1]}"
	fill="currentColor"
	aria-hidden="true"
>
	<path d={Array.isArray(glyph[4]) ? glyph[4].join(' ') : glyph[4]} />
</svg>
