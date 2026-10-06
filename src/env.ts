import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	GITHUB_TOKEN: {
		description:
			'Optional read-only GitHub token used to look up the latest release. Required while the repo is private; once it is public it only raises the API rate limit.',
		// Blank or unset becomes undefined.
		schema: (value: string | undefined) => value?.trim() || undefined
	}
});
