<script lang="ts">
	import Icon from './Icon.svelte';

	interface Props {
		code: string;
		label?: string;
	}

	let { code, label }: Props = $props();
	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	async function copy() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			clearTimeout(timer);
			timer = setTimeout(() => (copied = false), 1600);
		} catch {
			// Clipboard can be blocked (e.g. insecure context); the text is still selectable.
		}
	}
</script>

<div class="code-block">
	<div class="text">
		{#if label}
			<span class="label">{label}</span>
		{/if}
		<!-- Wrap between arguments, never inside one (e.g. after the hyphen in -simulate) -->
		<pre>{#each code.split(' ') as token, i (i)}{#if i > 0}{' '}{/if}<span class="token"
					>{token}</span
				>{/each}</pre>
	</div>
	<button class="copy" onclick={copy} aria-label={copied ? 'Copied' : 'Copy command'}>
		<Icon name={copied ? 'check' : 'copy'} size={14} />
	</button>
</div>

<style>
	.code-block {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px 10px 10px 16px;
		border-radius: 8px;
		background-color: var(--theme-bg);
	}

	.text {
		flex: 1;
		min-width: 0;
	}

	.label {
		display: block;
		margin-bottom: 2px;
		font-size: 12px;
		color: var(--sidebar-color);
	}

	pre {
		margin: 0;
		white-space: pre-wrap;
		overflow-wrap: anywhere;
		font-family: var(--code-font);
		font-size: 13.5px;
		line-height: 1.6;
		color: var(--button-color);
	}

	/* Kept whole unless a single token is wider than the line (long URLs on phones) */
	.token {
		display: inline-block;
		max-width: 100%;
		overflow-wrap: anywhere;
	}

	/* Round icon button, like Unggoy's .playlist-button */
	.copy {
		flex-shrink: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 34px;
		height: 34px;
		border-radius: 100px;
		background-color: var(--button-bg);
		color: var(--button-color);
	}

	.copy:hover {
		background-color: var(--button-bg-hover);
		color: var(--button-color-hover);
	}
</style>
