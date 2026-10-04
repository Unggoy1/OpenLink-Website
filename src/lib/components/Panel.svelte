<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		id: string;
		title: string;
		intro?: Snippet;
		children: Snippet;
	}

	let { id, title, intro, children }: Props = $props();
</script>

<!-- Unggoy's .assets-container with a .small-header title -->
<section class="panel" {id} aria-labelledby="{id}-title">
	<h2 class="small-header" id="{id}-title">
		{title}
	</h2>
	{#if intro}
		<p class="panel-intro">{@render intro()}</p>
	{/if}
	{@render children()}
</section>
