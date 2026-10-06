# OpenLink site

Website for OpenLink, served at `openlink.unggoy.xyz`. Built with SvelteKit 3 and Svelte 5, using Bun for tooling, and deployed to Vercel.

The visual design follows [unggoy-frontend](https://github.com/Unggoy1): the same CSS tokens, Inter, Font Awesome 6 icons, welcome banner, nav pills, mobile bottom nav, `.assets-container` panels, "details" cards, tags and chips.

## Develop

```bash
bun install
bun run dev
bun run check
```

## Pages

| Route | Content | Sections |
|---|---|---|
| `/` | For players: downloads, how to play, the app and voting, FAQ | `src/routes/+page.svelte` |
| `/host` | Hosting guide: setup steps, options, admin commands, caveats, playlist format | `src/routes/host/+page.svelte` |
| `/about` | How it works, status, source, running your own directory | `src/routes/about/+page.svelte` |

Sections live in `src/lib/sections/`; nav links are `NAV_LINKS` in `src/lib/site.ts`.

## Downloads

Download links, file sizes and the build version come from the newest published release of [Unggoy1/OpenLink](https://github.com/Unggoy1/OpenLink/releases), pre-releases included. Publishing a release is all it takes; the site picks it up within a few minutes.

- Buttons are matched to release files by name (`src/lib/server/downloads.ts`), so they must match the names the release workflow publishes. A file missing from the release shows "Not available yet".
- `src/lib/server/releases.ts` asks the GitHub API and keeps the answer in memory for 5 minutes, re-checking with an ETag. Pages also send `s-maxage=300, stale-while-revalidate=3600`, so Vercel's CDN serves most visits without asking GitHub at all.
- If GitHub can't be reached, the last good answer is reused; with none, the page says it couldn't load the release and links to the releases page.

### `GITHUB_TOKEN` (optional, recommended)

Without a token, GitHub allows 60 API requests an hour per IP address, and Vercel shares outgoing addresses between projects. Set `GITHUB_TOKEN` in Vercel (**Settings → Environment Variables**) to a fine-grained token with read-only access to public repositories; no extra permissions are needed. Locally, put it in `.env.local` (see `.env.example`).

## Branding

`static/images/logo-full.png` (mark + wordmark) is used everywhere through `src/lib/components/Logo.svelte`. The favicons (`static/favicon.png`, `favicon.ico`, `apple-touch-icon.png`) are the mark cropped from that image onto a `#334a50` tile. Replace them once there is a standalone mark.
