# MatKenGame 🎖️

A Progressive Web App (PWA) quiz game that teaches players to recognize and identify military vehicles from around the world.

## 🎮 How to Play

- You are shown a photograph of a military vehicle
- Choose the correct answer from 4 options (vehicle name and country)
- Build your score across 10 questions per round
- Learn fun facts about each vehicle after every answer

## 🌐 Play the Game

**[Play MatKenGame →](https://blazejama.github.io/MatKenGame)**

Works on iOS, Android, and desktop browsers. On mobile you can add it to your home screen and play offline.

## 📦 Features

- 10-question rounds across **61 vehicles** in 5 categories — Main Battle Tanks, APCs, IFVs, Artillery and Helicopters
- 4 multiple-choice answers per question (vehicle name + country)
- **Easy / Medium / Hard** difficulty, driven by a per-image star rating
- Filters for category, era, alliance and nation
- **Timed mode** with a 15-second countdown and speed bonus
- **Hints** — 2 per round, each eliminates a wrong answer for a points cost
- **Vehicle Library** study mode: photos, specs, armament, protection, W.H.A.T.S. identification cues and variants
- **Global leaderboard** (Supabase) with per-category and per-difficulty filtering
- Instant green/red feedback on the answer buttons themselves
- Tactical HUD visual style — dark backdrop, amber accents, custom typography
- Final score with a tactical rating (`ELITE OPERATOR` → `BACK TO BASICS`)
- Mobile-first layout respecting iOS safe-area insets (status bar, Dynamic Island, home indicator)
- Installable as a PWA, works offline after first visit

## 🔮 Coming Later

- Silhouette, Detail Zoom and Nation Flag modes
- Streaks, score sharing, sound

## 🗺️ Development Phases

| Phase | Status | Description |
|---|---|---|
| MVP | ✅ Released (v1.0.0) | Core quiz game — Main Battle Tanks, PWA, tactical HUD |
| Phase 2 | ✅ Shipped | All 5 categories, difficulty modes, filters, admin page |
| Phase 3 | 🟡 Partly shipped | Leaderboard, timed mode, hints and study mode are live; special modes, streaks and sound are not |

## 🛠️ Tech Stack

- **React 19** + **Vite 8** (npm, bundled build — no CDN)
- **Tailwind CSS 3** via PostCSS
- JavaScript (ES modules), no TypeScript
- **Supabase** (Postgres + RLS) for the global leaderboard
- PWA — manifest.json + Service Worker for offline play
- Hosted on GitHub Pages, built and deployed by GitHub Actions

```bash
npm install
npm run dev     # http://localhost:5173/MatKenGame/
npm run build   # production output in dist/
```

The **admin page** is the exception: it is a standalone CDN React 18 + Babel
Standalone page served raw from `public/admin/`, deliberately outside the Vite
pipeline. That is why it uses a `.babel` extension and reads `window.vehicles`.

## 📁 Project Structure

```
MatKenGame/
├── index.html              ← HTML entry (Vite injects the bundle)
├── src/
│   ├── main.jsx            ← React entry point
│   ├── App.jsx             ← Router + game state
│   ├── screens/            ← One file per screen
│   ├── components/         ← Shared UI (TacCard, modals, …)
│   ├── lib/                ← constants.js, utils.js
│   └── index.css           ← Tailwind entry
├── data/
│   └── vehicles.js         ← All vehicle data (ES module exports)
├── public/                 ← Copied verbatim into dist/
│   ├── admin/              ← Admin page (CDN React + Babel, served raw)
│   ├── assets/
│   │   ├── images/         ← Vehicle photos — the ONLY image location
│   │   └── icons/          ← PWA icons
│   ├── manifest.json       ← PWA manifest
│   └── service-worker.js   ← Offline caching (bump CACHE_VERSION per deploy)
├── update-game.bat         ← One-click publish for admin exports
├── vite.config.js          ← base path, admin middleware, vehicles.js copy
├── CHANGELOG.md            ← Version history
├── TODO.md                 ← Feature checklist
└── README.md               ← This file
```

> **Where images live.** Image *files* belong in `public/assets/images/` — that
> is the only tree Vite publishes. The `image.url` *strings* in `vehicles.js`
> stay `assets/images/<file>`, because those are runtime URLs resolved against
> the page at `/MatKenGame/`. Files and URLs deliberately differ; don't
> "correct" one to match the other.

## 🖼️ Image Credits

Vehicle images sourced from [Wikimedia Commons](https://commons.wikimedia.org) under free-use licenses.

## 📝 License

MIT License — free to use and modify.
