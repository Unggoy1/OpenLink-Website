import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	SITE_PASSWORD: {
		description:
			'Shared password for the private testing phase. Leave unset or empty to turn the password gate off.',
		schema: (value) => value?.trim() || undefined
	}
});
