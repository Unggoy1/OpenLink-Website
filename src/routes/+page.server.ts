import type { PageServerLoad } from './$types';
import { programs, release } from '#lib/server/downloads.ts';

export const load: PageServerLoad = () => {
	return { programs, release };
};
