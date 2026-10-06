<script lang="ts">
	import Icon from './Icon.svelte';
</script>

<div class="dev-banner-wrap">
	<aside class="dev-banner" aria-label="Development status">
		<Icon name="warning" size={26} class="dev-banner-icon" />
		<p>
			<strong>This project is in very early development.</strong>
			Expect lots of things to be broken or buggy.
			<a href="/about#status" class="status-link">See what’s been tested</a>
		</p>
	</aside>
</div>

<style>
	.dev-banner-wrap {
		max-width: var(--page-width);
		margin: 0 auto;
		padding: 24px 24px 0;
	}

	.dev-banner {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 18px 22px;
		border-radius: 20px;
		background-color: var(--warning-bg);
		border: 1px solid var(--warning-border);
		color: var(--warning-color);
	}

	.dev-banner :global(.dev-banner-icon) {
		flex-shrink: 0;
	}

	p {
		font-size: 16px;
		font-weight: 400;
		line-height: 1.5;
	}

	strong {
		font-weight: 700;
	}

	.status-link {
		margin-left: 4px;
		color: inherit;
		font-weight: 600;
		text-decoration: underline;
		text-underline-offset: 3px;
		white-space: nowrap;
	}

	.status-link:hover {
		opacity: 0.8;
	}

	@media screen and (max-width: 769px) {
		.dev-banner-wrap {
			padding: 16px 16px 0;
		}

		.dev-banner {
			align-items: flex-start;
			padding: 14px 16px;
		}

		p {
			font-size: 15px;
		}
	}
</style>
