# OpenLink site

Landing page for OpenLink, served at `openlink.unggoy.xyz`. Built with SvelteKit 3 and Svelte 5, using Bun for tooling, and deployed to Vercel.

The visual design follows [unggoy-frontend](https://github.com/Unggoy1): the same CSS tokens, Inter, Font Awesome 6 icons, welcome banner, sidebar-style nav pills, mobile bottom nav, `.assets-container` panels, "details" cards, tags and chips.

## Develop

```bash
bun install
bun run dev
bun run check
```

## Password gate

The whole site sits behind one shared password while the project is private.

- Set `SITE_PASSWORD` in the Vercel project's environment variables. For local dev, put it in `.env.local`, which is gitignored.
- Visitors get a 30-day cookie. Changing the password signs everyone out.
- **Going public:** delete `SITE_PASSWORD`. The gate turns off and `robots.txt` allows indexing again.

The gate is meant to keep casual visitors out, not to protect secrets. The logic lives in `src/hooks.server.ts` and `src/lib/server/gate.ts`.

## Downloads

Edit `src/lib/server/downloads.ts`: set `release.version`, fill in each file's `url` (and `checksumsUrl` if there is one), then redeploy. A file with an empty `url` shows as "Not available yet". This module is server-only, so the links only reach people past the password.

## When the repo goes public

Set `REPO_PUBLIC = true` in `src/lib/site.ts`. GitHub links then appear in the footer, Source, Downloads and the hosting guide. You can also point the download URLs at GitHub Releases.

## Branding

`static/images/logo-full.png` (mark + wordmark) is used everywhere through `src/lib/components/Logo.svelte`. The favicons (`static/favicon.png`, `favicon.ico`, `apple-touch-icon.png`) are the mark cropped from that image onto a `#334a50` tile. Replace them once there is a standalone mark.
