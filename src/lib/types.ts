export type Platform = 'windows' | 'linux';

export interface DownloadFile {
	platform: Platform;
	label: string;
	filename: string;
	/** Unset when the program's release doesn't include this file. */
	url?: string;
	/** Bytes. */
	size?: number;
}

export type ProgramId = 'launcher' | 'server' | 'directory';

export interface Program {
	id: ProgramId;
	name: string;
	audience: string;
	summary: string;
	/**
	 * The newest release that carries this program; its files come from it.
	 * Programs are versioned separately: a server-only release has no launcher files.
	 * Null when GitHub couldn't be reached and nothing was cached.
	 */
	release: Release | null;
	/** GitHub answered, but no release carries this program yet (release is null). */
	unreleased: boolean;
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
	programs: Program[];
}
