<script lang="ts">
	// Full OpenLink logo (mark + wordmark). Source image is 3500×833.
	interface Props {
		/** Rendered height in px; width follows the aspect ratio. */
		height?: number;
		class?: string;
	}

	let { height = 36, class: className }: Props = $props();
</script>

<img
	src="/images/logo-full.png"
	alt="OpenLink"
	class={className}
	width={Math.round((height * 3500) / 833)}
	{height}
/>

<style>
	img {
		display: block;
		max-width: 100%;
		height: auto;
	}
</style>
