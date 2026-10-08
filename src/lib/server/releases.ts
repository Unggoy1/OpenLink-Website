// Reads the published releases of the OpenLink repo from the GitHub API.
//
// The programs share one version series, but a release carries only the
// programs that changed (a server-only fix has no app files), so callers look
// for the newest release that has each program's file rather than the newest
// release overall.
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

export interface PublishedRelease {
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
// tag with a dash (v0.8.0-alpha.1) as one, so list releases instead. A page of
// 50 reaches past a long run of releases that skip a program.
const API_URL = `https://api.github.com/repos/${REPO_SLUG}/releases?per_page=50`;
const FRESH_MS = 5 * 60 * 1000;
const TIMEOUT_MS = 5000;

let cache: { releases: PublishedRelease[] | null; etag?: string; checkedAt: number } | undefined;
let pending: Promise<PublishedRelease[] | null> | undefined;

function toPublished(releases: GitHubRelease[]): PublishedRelease[] {
	return releases
		.filter((r) => !r.draft)
		.map((r) => ({
			version: r.tag_name,
			url: r.html_url,
			publishedAt: r.published_at ?? undefined,
			prerelease: r.prerelease,
			assets: Object.fromEntries(
				r.assets.map((a) => [a.name, { url: a.browser_download_url, size: a.size }])
			)
		}));
}

async function refresh(): Promise<PublishedRelease[] | null> {
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
			return cache.releases;
		}
		if (!res.ok) throw new Error(`GitHub answered ${res.status} ${res.statusText}`);

		const releases = toPublished((await res.json()) as GitHubRelease[]);
		cache = { releases, etag: res.headers.get('etag') ?? undefined, checkedAt: Date.now() };
		return releases;
	} catch (error) {
		console.error('Could not read the OpenLink releases:', error);
		// Keep serving the last good answer; try again after the next interval.
		if (cache) cache.checkedAt = Date.now();
		return cache?.releases ?? null;
	}
}

/** Published releases, newest first; null when GitHub couldn't be reached and nothing was cached. */
export async function getReleases(): Promise<PublishedRelease[] | null> {
	if (cache && Date.now() - cache.checkedAt < FRESH_MS) return cache.releases;
	pending ??= refresh().finally(() => (pending = undefined));
	return pending;
}
