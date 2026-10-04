export type Platform = 'windows' | 'linux';

export interface DownloadFile {
	platform: Platform;
	label: string;
	filename: string;
	url: string;
}

export interface Program {
	id: string;
	name: string;
	audience: string;
	summary: string;
	files: DownloadFile[];
	/** Shown smaller, under "Run your own directory". */
	advanced?: boolean;
}

export interface Release {
	version: string;
	/** Link to a checksums file for this release, if there is one. */
	checksumsUrl: string;
}
