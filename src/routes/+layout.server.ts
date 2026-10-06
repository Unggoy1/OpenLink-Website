import type { LayoutServerLoad } from './$types';
import { getDownloads } from '#lib/server/downloads.ts';

export const load: LayoutServerLoad = async ({ setHeaders }) => {
	// Let Vercel's CDN cache pages for a few minutes, so GitHub is asked for the
	// latest release rarely and a GitHub outage keeps serving the last good page.
	setHeaders({ 'cache-control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=3600' });
	return { downloads: await getDownloads() };
};
