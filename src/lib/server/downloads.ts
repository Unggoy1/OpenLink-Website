// Download links for the private testing phase.
//
// URLs, the build version and the checksums link come from environment
// variables (see src/env.ts and .env.example), so they never land in git.
// Set them in Vercel and redeploy to publish a new build. A file whose
// variable is unset shows as "Not available yet".
//
// Once the repo is public, these can come from the latest GitHub release instead.

import {
	DOWNLOAD_APP_LINUX,
	DOWNLOAD_APP_WINDOWS,
	DOWNLOAD_CHECKSUMS_URL,
	DOWNLOAD_DIRECTORY_LINUX,
	DOWNLOAD_DIRECTORY_WINDOWS,
	DOWNLOAD_HOSTAGENT_WINDOWS,
	RELEASE_VERSION
} from '$app/env/private';
import type { Program, Release } from '#lib/types.ts';

export const release: Release = {
	version: RELEASE_VERSION,
	checksumsUrl: DOWNLOAD_CHECKSUMS_URL
};

export const programs: Program[] = [
	{
		id: 'app',
		name: 'OpenLink app',
		audience: 'Players · Windows, Linux',
		summary:
			'The way to play. Lists community servers, joins them, keeps the game connected while you play, and is where you vote for the next match. Update it when a new version ships.',
		files: [
			{
				platform: 'windows',
				label: 'Windows x64',
				filename: 'OpenLink-windows-amd64.exe',
				url: DOWNLOAD_APP_WINDOWS
			},
			{
				platform: 'linux',
				label: 'Linux x64',
				filename: 'OpenLink-linux-amd64',
				url: DOWNLOAD_APP_LINUX
			}
		]
	},
	{
		id: 'hostagent',
		name: 'Host package',
		audience: 'Server hosts · Windows',
		summary:
			'hi-hostagent and its helpers in one zip. Runs and supervises the game’s LAN server, lists it in the directory, proxies players, and runs your playlist and voting.',
		files: [
			{
				platform: 'windows',
				label: 'Windows x64',
				filename: 'OpenLink-host-windows-amd64.zip',
				url: DOWNLOAD_HOSTAGENT_WINDOWS
			}
		]
	},
	{
		id: 'directory',
		name: 'hi-directory',
		audience: 'Directory operators',
		summary:
			'The small HTTP service that holds the server list. Most people never need it; we already run the public one.',
		advanced: true,
		files: [
			{
				platform: 'windows',
				label: 'Windows x64',
				filename: 'hi-directory-windows-amd64.exe',
				url: DOWNLOAD_DIRECTORY_WINDOWS
			},
			{
				platform: 'linux',
				label: 'Linux x64',
				filename: 'hi-directory-linux-amd64',
				url: DOWNLOAD_DIRECTORY_LINUX
			}
		]
	}
];
