// The programs offered for download and the release file each button links to.
//
// Each program's files come from the newest release on GitHub that carries
// its main (first) file (see releases.ts), matched by the file names the
// release workflow publishes. A release carries only the programs that
// changed, so the app and the server can show different versions. A file
// missing from that release shows as "Not available yet".

import type { Downloads, Program } from '#lib/types.ts';
import { getReleases } from './releases.ts';

type ProgramDef = Omit<Program, 'files' | 'release'> & {
	files: Omit<Program['files'][number], 'url' | 'size'>[];
};

const PROGRAMS: ProgramDef[] = [
	{
		id: 'app',
		name: 'OpenLink',
		audience: 'Players · Windows',
		summary:
			'The desktop app players use. It lists community servers, joins them with one click, keeps the game connected while you play, and is where you vote for the next match.',
		files: [
			{ platform: 'windows', label: 'Windows x64', filename: 'OpenLink-windows-amd64.exe' },
			{
				platform: 'linux',
				label: 'Linux x64 (experimental)',
				filename: 'OpenLink-linux-amd64'
			}
		]
	},
	{
		id: 'server',
		name: 'OpenLink Server',
		audience: 'Hosts · Windows',
		summary:
			'Everything a host needs in one zip. Runs and supervises the game’s LAN server, lists it in the directory, passes players through to it, and runs your playlist and voting.',
		files: [
			{ platform: 'windows', label: 'Windows x64', filename: 'OpenLink-Server-windows-amd64.zip' }
		]
	},
	{
		id: 'directory',
		name: 'OpenLink Directory',
		audience: 'Directory operators',
		summary:
			'The small HTTP service that holds the server list. Most people never need it; we run the public one.',
		files: [
			{
				platform: 'windows',
				label: 'Windows x64',
				filename: 'openlink-directory-windows-amd64.exe'
			},
			{ platform: 'linux', label: 'Linux x64', filename: 'openlink-directory-linux-amd64' }
		]
	}
];

const CHECKSUMS_FILE = 'SHA256SUMS';

export async function getDownloads(): Promise<Downloads> {
	const releases = (await getReleases()) ?? [];

	return {
		programs: PROGRAMS.map((program) => {
			const main = program.files[0].filename;
			const found = releases.find((r) => main in r.assets);
			const asset = (name: string) => found?.assets[name];
			return {
				...program,
				release: found
					? {
							version: found.version,
							url: found.url,
							publishedAt: found.publishedAt,
							prerelease: found.prerelease,
							checksumsUrl: asset(CHECKSUMS_FILE)?.url
						}
					: null,
				files: program.files.map((file) => ({
					...file,
					url: asset(file.filename)?.url,
					size: asset(file.filename)?.size
				}))
			};
		})
	};
}
