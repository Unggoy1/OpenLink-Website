export type Platform = 'windows' | 'linux';

export interface DownloadFile {
	platform: Platform;
	label: string;
	filename: string;
	/** Unset when the latest release doesn't include this file. */
	url?: string;
	/** Bytes. */
	size?: number;
}

export type ProgramId = 'app' | 'server' | 'directory';

export interface Program {
	id: ProgramId;
	name: string;
	audience: string;
	summary: string;
	files: DownloadFile[];
}

export interface Release {
	version: string;
	/** The release page on GitHub. */
	url: string;
	publishedAt?: string;
	prerelease: boolean;
	/** Link to the SHA256SUMS file, if the release has one. */
	checksumsUrl?: string;
}

export interface Downloads {
	/** Null when GitHub couldn't be reached and nothing was cached. */
	release: Release | null;
	programs: Program[];
}
