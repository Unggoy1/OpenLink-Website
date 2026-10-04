// A deliberately simple shared-password gate for the private testing phase.
// It keeps casual visitors out; it is not meant to protect anything sensitive.
import { createHash, timingSafeEqual } from 'node:crypto';
import type { Cookies } from '@sveltejs/kit';
import { SITE_PASSWORD } from '$app/env/private';

export const ACCESS_COOKIE = 'openlink_access';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/** With no password configured the whole site is public. */
export const gateEnabled = Boolean(SITE_PASSWORD);

// The cookie holds a hash of the password, so changing SITE_PASSWORD signs everyone out.
const hash = (value: string) => createHash('sha256').update(`openlink:${value}`).digest();
const expected = SITE_PASSWORD ? hash(SITE_PASSWORD) : undefined;

function matches(candidate: Buffer) {
	return expected !== undefined && timingSafeEqual(candidate, expected);
}

export function checkPassword(password: string) {
	return matches(hash(password));
}

export function hasAccess(cookies: Cookies) {
	if (!gateEnabled) return true;
	const token = cookies.get(ACCESS_COOKIE);
	if (!token || !/^[0-9a-f]{64}$/.test(token)) return false;
	return matches(Buffer.from(token, 'hex'));
}

export function grantAccess(cookies: Cookies) {
	if (!expected) return;
	cookies.set(ACCESS_COOKIE, expected.toString('hex'), {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		maxAge: MAX_AGE
	});
}

/** Only allow redirects back to a path on this site. */
export function safeNext(next: string | null): string {
	if (!next || !next.startsWith('/') || next.startsWith('//') || next.startsWith('/\\')) return '/';
	return next;
}
