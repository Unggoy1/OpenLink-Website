import { defineEnvVars } from '@sveltejs/kit/env';

/** Optional value: blank or unset becomes undefined. */
const optional = (value: string | undefined) => value?.trim() || undefined;

/**
 * Optional http(s) URL. A malformed value fails the build/start, so a typo in
 * Vercel's settings is caught at deploy time instead of shipping a broken link.
 */
const optionalUrl = (name: string) => (value: string | undefined) => {
	const url = optional(value);
	if (url === undefined) return undefined;
	let parsed: URL;
	try {
		parsed = new URL(url);
	} catch {
		throw new Error(`${name} must be a full URL (got "${url}")`);
	}
	if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
		throw new Error(`${name} must be an http(s) URL (got "${url}")`);
	}
	return url;
};

/** Defines an optional download-link variable for one file. */
const download = (name: string, description: string) => ({
	description: `${description} Leave unset to show "Not available yet".`,
	schema: optionalUrl(name)
});

export const variables = defineEnvVars({
	SITE_PASSWORD: {
		description:
			'Shared password for the private testing phase. Leave unset or empty to turn the password gate off.',
		schema: optional
	},

	// Private testing phase: download links come from env vars so they never land in git.
	RELEASE_VERSION: {
		description: 'Build shown on the Downloads section and in the footer, e.g. "v0.1.0".',
		schema: optional
	},
	DOWNLOAD_CHECKSUMS_URL: {
		description: 'Link to the SHA-256 checksums file for this build.',
		schema: optionalUrl('DOWNLOAD_CHECKSUMS_URL')
	},
	DOWNLOAD_APP_WINDOWS: download(
		'DOWNLOAD_APP_WINDOWS',
		'OpenLink desktop app for Windows (OpenLink-windows-amd64.exe).'
	),
	DOWNLOAD_CONNECTOR_WINDOWS: download(
		'DOWNLOAD_CONNECTOR_WINDOWS',
		'hi-connector for Windows (hi-connector-windows-amd64.exe).'
	),
	DOWNLOAD_CONNECTOR_LINUX: download(
		'DOWNLOAD_CONNECTOR_LINUX',
		'hi-connector for Linux (hi-connector-linux-amd64).'
	),
	DOWNLOAD_HOSTAGENT_WINDOWS: download(
		'DOWNLOAD_HOSTAGENT_WINDOWS',
		'hi-hostagent for Windows (hi-hostagent-windows-amd64.exe).'
	),
	DOWNLOAD_DIRECTORY_WINDOWS: download(
		'DOWNLOAD_DIRECTORY_WINDOWS',
		'hi-directory for Windows (hi-directory-windows-amd64.exe).'
	),
	DOWNLOAD_DIRECTORY_LINUX: download(
		'DOWNLOAD_DIRECTORY_LINUX',
		'hi-directory for Linux (hi-directory-linux-amd64).'
	)
});
