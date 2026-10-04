<script lang="ts">
	import CodeBlock from '#lib/components/CodeBlock.svelte';
	import Panel from '#lib/components/Panel.svelte';
	import { DIRECTORY_URL, HOSTING_GUIDE_URL, REPO_PUBLIC } from '#lib/site.ts';

	const requirements = [
		'Windows PC',
		'Halo Infinite (Steam)',
		'Public IPv4 address',
		'UDP 1343 forwarded'
	];
</script>

<Panel id="host" title="How to host">
	{#snippet intro()}
		<code>hi-hostagent</code> runs the game’s LAN server for you, restarts it if it exits, and keeps
		your listing in the directory fresh.
	{/snippet}

	<div class="tags" aria-label="Requirements">
		{#each requirements as req (req)}
			<span class="tag">{req}</span>
		{/each}
	</div>

	<ol class="steps">
		<li>
			<span class="num">1</span>
			<div class="grow">
				<h3>Open the port</h3>
				<p>
					Forward <strong>UDP 1343</strong> to the server PC and allow <code>hi-hostagent.exe</code>
					through Windows Firewall.
				</p>
			</div>
		</li>
		<li>
			<span class="num">2</span>
			<div class="grow">
				<h3>Check reachability</h3>
				<p>Run a simulated listing to confirm players will be able to reach you.</p>
				<CodeBlock code={`hi-hostagent -simulate -directory ${DIRECTORY_URL} -name "My Server"`} />
			</div>
		</li>
		<li>
			<span class="num">3</span>
			<div class="grow">
				<h3>Save your settings once</h3>
				<p>Writes a config file so you don’t need the flags again.</p>
				<CodeBlock
					code={`hi-hostagent -directory ${DIRECTORY_URL} -name "My Server" -region us-west init-config`}
				/>
			</div>
		</li>
		<li>
			<span class="num">4</span>
			<div class="grow">
				<h3>Run it</h3>
				<p>Optionally have it start automatically when you log on.</p>
				<div class="codes">
					<CodeBlock code="hi-hostagent" />
					<CodeBlock code="hi-hostagent autostart enable" label="Optional" />
				</div>
			</div>
		</li>
	</ol>

	<p class="guide">
		<span>
			{#if REPO_PUBLIC}
				Proxy mode, <code>status</code>, <code>kick</code> and <code>ban</code> are covered in the
				<a href={HOSTING_GUIDE_URL} class="text-link" target="_blank" rel="noopener"
					>full hosting guide</a
				>.
			{:else}
				The full hosting guide (proxy mode, <code>status</code>, <code>kick</code>,
				<code>ban</code>) is <code>docs/HOSTING.md</code> in the repo, which goes public with the source.
			{/if}
		</span>
	</p>
</Panel>

<style>
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-bottom: 16px;
	}

	.steps {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.steps li {
		display: flex;
		gap: 14px;
		padding: 14px 16px;
		border-radius: 12px;
		background-color: var(--top-container-bg);
		min-width: 0;
	}

	.num {
		flex-shrink: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 100px;
		background-color: var(--button-bg);
		color: var(--button-color);
		font-weight: 700;
	}

	.grow {
		display: flex;
		flex-direction: column;
		gap: 10px;
		flex: 1;
		min-width: 0;
	}

	h3 {
		font-size: 16px;
		font-weight: 600;
		padding-top: 5px;
	}

	p {
		margin-top: -6px;
		font-size: 14px;
		font-weight: 400;
		opacity: 0.85;
	}

	strong {
		font-weight: 600;
	}

	.codes {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.guide {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		margin-top: 16px;
		font-size: 14px;
		font-weight: 400;
		opacity: 0.85;
	}

	.guide :global(svg) {
		flex-shrink: 0;
		margin-top: 2px;
		color: var(--button-color);
	}

	@media (max-width: 900px) {
		.steps {
			grid-template-columns: 1fr;
		}
	}
</style>
