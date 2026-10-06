# OpenLink site update brief (2026-10-05)

For the agent updating the OpenLink website. Describes what changed in the
project since the last site update and what the site should say. Screenshots
are in this folder:

- `openlink-vote-open.jpg`: the OpenLink app during a vote (map thumbnails,
  live counts, countdown, the player's pick outlined).
- `openlink-vote-result.jpg`: the same panel after the vote closed
  ("Next match: … starting in 0 s", winner outlined in green).

Both were taken from the app's built-in preview mode, so the server name reads
"Vote Test (demo)" and the counts are sample data. The UI is the real app UI.

## 1. Player side: the OpenLink app is the way to play

- The desktop **OpenLink app** (Windows; Linux build exists) is the player
  download. It lists community servers, joins them, and keeps the game
  connected while you play.
- **hi-connector (the command-line connector) is being phased out.** Do not
  promote it on the site anymore (no download button, no "play from the
  command line" instructions). New features, such as voting, are app-only.
  It may still exist in releases for a while; if it must be mentioned, call
  it legacy.
- Players should keep the app open while playing and **update it** when a new
  version ships (servers with voting need the new app).

### New in the app: vote for the next match

- On servers with voting, a panel appears in the app when you join and after
  every match: up to **4 map/mode choices with map thumbnails**, live vote
  counts and a countdown (30 s by default).
- Click a card to vote; you can change your vote until the countdown ends.
  Most votes wins; with a tie or no votes, the server picks at random among
  the leading/offered choices. The match starts a few seconds later.
- Since players are usually in the game, the app **plays a short chime** when
  a vote opens (can be turned off in Settings), shows a Windows notification
  and flashes its taskbar button. Windows may hold the notification back while
  a game is focused; the chime still plays. Alt-tab to the app to vote.
- After the vote the app shows the **next match** by name. (The game's own
  lobby screen may show a different map name until the match loads; the app
  is correct.)
- Thumbnails are the official Halo Infinite map thumbnails, loaded from Halo
  Waypoint's public image host; nothing else is loaded.
- Only players who are actually in the server (connected through the app) can
  vote: one vote per player. No accounts, no sign-in data.

### Tip for hosts who also play

- If you host a server and play on the **same PC**, set the app to
  **"LAN broadcast"** in Settings. Otherwise the game does not see the server
  through the app (the server itself occupies the LAN discovery port).

## 2. Host side: hi-hostagent and the host package

Hosting is now a **zip download**, not a single exe:
`OpenLink-host-windows-amd64.zip` (Windows) containing:

| File | Purpose |
|---|---|
| `hi-hostagent.exe` | Starts and supervises the Halo Infinite LAN dedicated server, lists it in the directory, proxies players (player counts, ping, kicks/bans, rate limits), runs the playlist and voting |
| `hi-hostctl.dll` | Server-side control, loaded **only into the host's own server process** |
| `hostctl-loader.exe` | Loads the DLL into the server the agent starts |
| `hostagent.example.json` | Example config (playlist + voting + server-owned lobby) |
| `playlist.example.json` | Example playlist |
| `README.txt` | Setup steps |

Setup in short: unzip into one folder, copy the two example files to
`hostagent.json` / `playlist.json`, fill in server name, directory key and the
public address/port (port forward or tunnel), list map/mode pairs, run
`hi-hostagent.exe` from a normal terminal.

### What hosts can do now (all optional, set in hostagent.json)

- **Server-chosen maps and modes (`playlist`)**: the server, not a player,
  decides the map and mode of every match, from a playlist of published
  maps/modes (Forge and UGC content). Rotation shuffles through the list.
- **Playlist voting (`vote`)**: players vote in the OpenLink app between up
  to 4 random playlist entries (never the one just played), when the first
  player joins and after every match. Settings: vote length (default 30 s),
  number of choices (1–4), start delay (default 5 s).
- **Server-owned lobby (`server_owned`)**: no player becomes lobby leader,
  and players cannot start or end matches (Play and pause-menu End Game do
  nothing). Matches end on their own time/score limits.
- **Automatic start (`auto_start`)**: without voting, the server starts the
  match by itself once enough players are in the lobby (configurable count
  and delay).
- Existing: proxy mode with player counts, reachability check, kick/ban,
  per-player rate limits; `hi-hostagent status` shows server, players,
  playlist and vote state.

### Requirements and honest caveats (keep these on the site)

- Windows, Halo Infinite on Steam, the **same game build** as the players.
  A public IPv4 with UDP 1343 forwarded, or a UDP tunnel.
- The DLL supports **one game build at a time**. After a Halo update, hosting
  with map/mode control waits for an OpenLink update.
- The host package **modifies the host's own server process** (never players'
  games, never anti-cheat). Hosts run it at their own risk with respect to
  the game's terms of service.
- Players' games are unmodified; Microsoft sign-in stays in the game.
- Unofficial fan project, not affiliated with Microsoft, Xbox or Halo
  Studios.

## 3. Playlist format (for the unggoy.xyz "export to OpenLink" feature)

```json
{
  "schema_version": 1,
  "selection": "shuffle_bag",
  "entries": [
    {
      "id": "interference-fiesta",
      "name": "Fiesta Slayer on Interference",
      "map":  {"asset_id": "70f884d7-6869-469d-b4d2-4219627e2d83", "version_id": "cc791b4b-054a-4653-9034-5dc13c809c54"},
      "mode": {"asset_id": "aca7bbf8-7a18-4aae-8785-1bd3f58275fd", "version_id": "3685f6b2-2860-4e98-9d13-513087edb465"}
    }
  ]
}
```

- `id`: unique per entry (letters/digits/dashes recommended, ≤ 80 chars).
- `name`: shown to players when voting (≤ 80 bytes; longer is cut).
- `map` / `mode`: asset and version IDs as shown in the content browser
  (canonical lowercase UUIDs). Pin a version.
- `mode_kind`: `"custom"` (default, UGC game variant). Engine modes are not
  supported.
- `enabled`: optional, default true.
- `selection`: `"shuffle_bag"` (default) or `"sequential"` (used for rotation
  without voting).
- **No thumbnail field**: the app computes each card's image from the map's
  asset and version IDs
  (`…/ugcstorage/map/<asset>/<version>/images/thumbnail.jpg`, then `.png`).
- At least one entry must be `"custom"` (the server uses one for its first
  selection).
