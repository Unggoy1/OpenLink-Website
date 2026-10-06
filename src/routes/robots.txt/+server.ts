export function GET() {
	return new Response('User-agent: *\nAllow: /\n', { headers: { 'content-type': 'text/plain' } });
}
