<script lang="ts">
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';
	import Logo from '#lib/components/Logo.svelte';
	import { SITE_TITLE } from '#lib/site.ts';

	let { form }: PageProps = $props();
	let submitting = $state(false);
</script>

<svelte:head>
	<title>{SITE_TITLE}</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<!-- Unggoy welcome-banner gradient with a modal-style dialog on top -->
<main class="unlock">
	<div class="dialog">
		<Logo height={44} />

		<div class="dialog-text">
			<h1>Private testing build</h1>
			<p>Community dedicated servers for Halo Infinite. Enter the password to continue.</p>
		</div>

		<form
			method="POST"
			use:enhance={() => {
				submitting = true;
				return async ({ update }) => {
					await update();
					submitting = false;
				};
			}}
		>
			<label for="password" class="sr-only">Password</label>
			<div class="field" class:error={form?.incorrect}>
				<input
					id="password"
					name="password"
					type="password"
					placeholder="Password"
					autocomplete="current-password"
					required
					aria-invalid={form?.incorrect ? 'true' : undefined}
					aria-describedby={form?.incorrect ? 'password-error' : undefined}
				/>
			</div>
			{#if form?.incorrect}
				<p id="password-error" class="error-text" role="alert">That password isn’t right.</p>
			{/if}

			<button type="submit" class="btn light" disabled={submitting}>
				{submitting ? 'Checking…' : 'Enter'}
			</button>
		</form>

		<p class="note">Ask in the testers’ chat if you need the password.</p>
	</div>

	<p class="disclaimer">
		Unofficial fan project. Not affiliated with or endorsed by Microsoft, Xbox or Halo Studios.
	</p>
</main>

<style>
	.unlock {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
		padding: 32px 16px;
		background: linear-gradient(135deg, var(--theme-bg) 0%, var(--button-bg) 100%);
	}

	/* Unggoy .dialog-container */
	.dialog {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		width: 100%;
		max-width: 420px;
		padding: 32px 28px 24px;
		border-radius: 1rem;
		background-color: var(--container-bg);
		color: var(--container-color);
		text-align: center;
		box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
	}

	h1 {
		font-size: 24px;
		font-weight: 700;
		line-height: 1.2;
	}

	.dialog-text p {
		margin-top: 8px;
		font-size: 15px;
		opacity: 0.8;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 12px;
		width: 100%;
		text-align: left;
	}

	/* Unggoy .search-bar input */
	.field {
		display: flex;
		align-items: center;
		gap: 10px;
		height: 48px;
		padding: 0 16px;
		border-radius: 8px;
		border: 2px solid transparent;
		background-color: var(--top-container-bg);
		color: var(--sidebar-color);
		transition: all 0.2s ease-in-out;
	}

	.field:focus-within {
		border-color: var(--button-color);
	}

	.field.error {
		border-color: #ff4444;
	}

	input {
		flex: 1;
		min-width: 0;
		height: 100%;
		border: none;
		outline: none;
		background: transparent;
		color: var(--container-color);
		font-family: var(--body-font);
		font-size: 16px;
		font-weight: 400;
	}

	input::placeholder {
		color: #dee3e5bf;
	}

	.error-text {
		font-size: 14px;
		color: #ff7b7b;
	}

	button {
		width: 100%;
	}

	button:disabled {
		opacity: 0.7;
		cursor: progress;
	}

	.note {
		font-size: 13px;
		color: var(--sidebar-color);
	}

	.disclaimer {
		max-width: 420px;
		text-align: center;
		font-size: 12px;
		font-weight: 400;
		color: var(--sidebar-color);
		opacity: 0.8;
	}
</style>
