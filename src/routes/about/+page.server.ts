import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// The "How it works" page was retired: the source link is in the header and footer, the directory on the Host page.
export const load: PageServerLoad = () => {
	redirect(308, '/host#directory');
};
