// Reads the newest published release of the OpenLink repo from the GitHub API.
//
// The result is kept in memory for a few minutes per server instance, and
// re-checked with the ETag so unchanged answers don't count against GitHub's
// rate limit. If GitHub can't be reached, the last good answer is reused; with
// none, the page falls back to a link to the releases page.

import { GITHUB_TOKEN } from '$app/env/private';
import { REPO_SLUG } from '#lib/site.ts';

export interface ReleaseAsset {
	url: string;
	size: number;
}

export interface LatestRelease {
	version: string;
	/** The release page on GitHub. */
	url: string;
	publishedAt?: string;
	prerelease: boolean;
	/** Assets by file name. */
	assets: Record<string, ReleaseAsset>;
}

interface GitHubRelease {
	tag_name: string;
	html_url: string;
	published_at: string | null;
	draft: boolean;
	prerelease: boolean;
	assets: { name: string; browser_download_url: string; size: number }[];
}

// /releases/latest skips pre-releases, and the release workflow marks every
// tag with a dash (v0.8.0-alpha.1) as one, so list releases and take the newest.
const API_URL = `https://api.github.com/repos/${REPO_SLUG}/releases?per_page=10`;
const FRESH_MS = 5 * 60 * 1000;
const TIMEOUT_MS = 5000;

let cache: { release: LatestRelease | null; etag?: string; checkedAt: number } | undefined;
let pending: Promise<LatestRelease | null> | undefined;

function toLatest(releases: GitHubRelease[]): LatestRelease | null {
	const newest = releases.find((r) => !r.draft);
	if (!newest) return null;
	return {
		version: newest.tag_name,
		url: newest.html_url,
		publishedAt: newest.published_at ?? undefined,
		prerelease: newest.prerelease,
		assets: Object.fromEntries(
			newest.assets.map((a) => [a.name, { url: a.browser_download_url, size: a.size }])
		)
	};
}

async function refresh(): Promise<LatestRelease | null> {
	const headers: Record<string, string> = {
		accept: 'application/vnd.github+json',
		'x-github-api-version': '2022-11-28',
		'user-agent': 'openlink-site'
	};
	if (GITHUB_TOKEN) headers.authorization = `Bearer ${GITHUB_TOKEN}`;
	if (cache?.etag) headers['if-none-match'] = cache.etag;

	try {
		const res = await fetch(API_URL, { headers, signal: AbortSignal.timeout(TIMEOUT_MS) });
		if (res.status === 304 && cache) {
			cache.checkedAt = Date.now();
			return cache.release;
		}
		if (!res.ok) throw new Error(`GitHub answered ${res.status} ${res.statusText}`);

		const release = toLatest((await res.json()) as GitHubRelease[]);
		cache = { release, etag: res.headers.get('etag') ?? undefined, checkedAt: Date.now() };
		return release;
	} catch (error) {
		console.error('Could not read the latest OpenLink release:', error);
		// Keep serving the last good answer; try again after the next interval.
		if (cache) cache.checkedAt = Date.now();
		return cache?.release ?? null;
	}
}

export async function getLatestRelease(): Promise<LatestRelease | null> {
	if (cache && Date.now() - cache.checkedAt < FRESH_MS) return cache.release;
	pending ??= refresh().finally(() => (pending = undefined));
	return pending;
}
