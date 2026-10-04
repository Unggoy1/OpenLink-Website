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

During private testing, every download link comes from an environment variable, so no file URLs are ever committed. Set them in Vercel (**Settings → Environment Variables**), then redeploy. Locally, put them in `.env.local`.

| Variable | File |
|---|---|
| `RELEASE_VERSION` | Build label shown on the page, e.g. `v0.1.0` |
| `DOWNLOAD_CHECKSUMS_URL` | SHA-256 checksums file |
| `DOWNLOAD_APP_WINDOWS` | `OpenLink-windows-amd64.exe` |
| `DOWNLOAD_CONNECTOR_WINDOWS` | `hi-connector-windows-amd64.exe` |
| `DOWNLOAD_CONNECTOR_LINUX` | `hi-connector-linux-amd64` |
| `DOWNLOAD_HOSTAGENT_WINDOWS` | `hi-hostagent-windows-amd64.exe` |
| `DOWNLOAD_DIRECTORY_WINDOWS` | `hi-directory-windows-amd64.exe` |
| `DOWNLOAD_DIRECTORY_LINUX` | `hi-directory-linux-amd64` |

- Any download left unset shows "Not available yet".
- A malformed URL fails the build on purpose, so a typo can't ship; the previous deployment stays live.
- Links are read on the server only, so they reach visitors only after they pass the password gate.

The program descriptions and filenames live in `src/lib/server/downloads.ts`, and the variables are defined in `src/env.ts`.

## When the repo goes public

Set `REPO_PUBLIC = true` in `src/lib/site.ts`. GitHub links then appear in the footer, Source, Downloads and the hosting guide. The next step is to read download links from the latest GitHub release instead of env vars.

## Branding

`static/images/logo-full.png` (mark + wordmark) is used everywhere through `src/lib/components/Logo.svelte`. The favicons (`static/favicon.png`, `favicon.ico`, `apple-touch-icon.png`) are the mark cropped from that image onto a `#334a50` tile. Replace them once there is a standalone mark.
