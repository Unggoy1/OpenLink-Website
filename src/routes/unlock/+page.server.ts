import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { checkPassword, gateEnabled, grantAccess, hasAccess, safeNext } from '#lib/server/gate.ts';

export const load: PageServerLoad = ({ cookies, url }) => {
	if (!gateEnabled || hasAccess(cookies)) {
		redirect(303, safeNext(url.searchParams.get('next')));
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies, url }) => {
		const form = await request.formData();
		const password = String(form.get('password') ?? '');

		if (!checkPassword(password)) {
			return fail(401, { incorrect: true });
		}

		grantAccess(cookies);
		redirect(303, safeNext(url.searchParams.get('next')));
	}
};
