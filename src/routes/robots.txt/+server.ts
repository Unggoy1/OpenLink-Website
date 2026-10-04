import { gateEnabled } from '#lib/server/gate.ts';

export function GET() {
	const body = gateEnabled ? 'User-agent: *\nDisallow: /\n' : 'User-agent: *\nAllow: /\n';
	return new Response(body, { headers: { 'content-type': 'text/plain' } });
}
