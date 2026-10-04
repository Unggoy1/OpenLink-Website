// Download links for the private testing phase, served from the file server.
// Only people past the password gate receive this data.
//
// To publish a build: set `version`, fill in each `url`, and redeploy.
// A file with an empty `url` shows as "Not available yet".
// Once the repo is public these can point at GitHub Releases instead.

import type { Program, Release } from '#lib/types.ts';

export const release: Release = {
	version: 'v0.1.0',
	checksumsUrl: ''
};

export const programs: Program[] = [
	{
		id: 'app',
		name: 'OpenLink app',
		audience: 'Players · Windows',
		summary:
			'Desktop server browser. Lists community servers with a Join button and a status bar that goes contacting → ready → playing. Keep it open while you play.',
		files: [
			{
				platform: 'windows',
				label: 'Windows x64',
				filename: 'OpenLink-windows-amd64.exe',
				url: ''
			}
		]
	},
	{
		id: 'connector',
		name: 'hi-connector',
		audience: 'Players · command line',
		summary:
			'The same join logic as the app, on the command line. This is the option for Linux players running the game under Steam/Proton.',
		files: [
			{
				platform: 'windows',
				label: 'Windows x64',
				filename: 'hi-connector-windows-amd64.exe',
				url: ''
			},
			{
				platform: 'linux',
				label: 'Linux x64',
				filename: 'hi-connector-linux-amd64',
				url: ''
			}
		]
	},
	{
		id: 'hostagent',
		name: 'hi-hostagent',
		audience: 'Server hosts · Windows',
		summary:
			'Starts the game’s LAN server, restarts it if it exits, sends the beacon and heartbeats to the directory, and checks your port is reachable.',
		files: [
			{
				platform: 'windows',
				label: 'Windows x64',
				filename: 'hi-hostagent-windows-amd64.exe',
				url: ''
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
				url: ''
			},
			{
				platform: 'linux',
				label: 'Linux x64',
				filename: 'hi-directory-linux-amd64',
				url: ''
			}
		]
	}
];
