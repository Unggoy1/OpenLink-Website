import type { Handle } from '@sveltejs/kit/hooks';
import { gateEnabled, hasAccess } from '#lib/server/gate.ts';

// Paths reachable without the password. Static files (fonts, favicon, images)
// never reach this hook, so the unlock page can still use them.
const OPEN_PATHS = new Set(['/unlock', '/robots.txt']);

export const handle: Handle = async ({ event, resolve }) => {
	if (!gateEnabled) return resolve(event);

	const { pathname, search } = event.url;
	if (!OPEN_PATHS.has(pathname) && !hasAccess(event.cookies)) {
		const next = encodeURIComponent(pathname + search);
		return new Response(null, {
			status: 303,
			headers: { location: `/unlock?next=${next}` }
		});
	}

	const response = await resolve(event);
	// Keep the private build out of search engines.
	response.headers.set('x-robots-tag', 'noindex, nofollow');
	return response;
};
