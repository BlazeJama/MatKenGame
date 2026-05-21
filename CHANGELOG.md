# Changelog — MatKenGame

All notable changes to this project are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

Versions follow: **[MAJOR.MINOR.PATCH]**
- **MAJOR** — complete phase release (MVP, Phase 2, Phase 3)
- **MINOR** — new feature added
- **PATCH** — bug fix or small tweak

---

## [Unreleased]
> Changes being worked on but not yet in a release.

### Added
- **Admin page foundation (PR 1 of 5)** — new `/admin/` URL with separate `index.html` and `admin.jsx`. Includes session-based password gate (stored in `sessionStorage`), desktop-only check with mobile "use a desktop" message, and a two-column shell with placeholders for the vehicle list (PR 2) and add/edit form (PR 3). Service worker cache bumped to v4 to precache the new admin files.

---

## [0.2.0] - 2026-05-20
### Added
- `data/vehicles.js` — vehicle database with 10 Main Battle Tanks (5 Modern, 2 Cold War, 3 WW2), each with 3 Wikimedia Commons image URLs at star ratings 1/2/3, plus name, country, era, and a fun fact
- `app.jsx` — full MVP game loop:
  - **Home screen** with vehicle-count stats card, Play button, and how-to-play description
  - **Quiz screen** with progress bar, question counter, live score, vehicle image, "Which vehicle is this?" prompt, 4 lettered (A/B/C/D) answer buttons, green/red feedback states with ✓ / ✗ markers, fun-fact panel after each answer, and Next/See Results button
  - **End screen** with large final score, score-based message, and Play Again button
- Helper functions: Fisher-Yates `shuffle`, `pickRandom`, `buildRound`, `scoreMessage`
- Safety fallback if `window.vehicles` fails to load

### Changed
- `service-worker.js` cache bumped to v3 (precaches `data/vehicles.js`)
- `index.html` now loads `data/vehicles.js` before `app.jsx`
- TODO.md — ticked off all MVP UI Screen, Game Logic, and Vehicle Data items

### Notes
- 10 tanks instead of the 15–20 from the original GDD — bare-minimum MVP, every round shows every tank in shuffled order
- Visual-design feedback collected but deferred — polish pass will come in a later commit
- PWA icons still pending — game runs without them but install prompts won't show

---

## [0.1.2] - 2026-05-20
### Added
- `index.html` — entry point loading React 18, Tailwind, and Babel via CDN
- `manifest.json` — PWA manifest with navy theme colour and icon references
- `service-worker.js` — cache-first offline support with version-based eviction
- `app.jsx` — minimal "MatKenGame scaffold" screen confirming React + Tailwind + service-worker pipeline works end-to-end
- Custom `navy` (#1a2744) colour added to Tailwind config

### Changed
- TODO.md — marked Pre-Build Setup items as done (folder structure, index.html, app.jsx, manifest.json, service-worker.js, GitHub Pages enabled)

### Notes
- PWA icons (192px, 512px) still pending — will be generated before first phone install test

---

## [0.1.1] - 2026-05-20
### Changed
- Admin page reverted from MVP back to Phase 2 to keep MVP focused on a playable quiz.
- MVP difficulty filtering simplified — game picks a random image; per-image `stars` field retained in the data schema for Phase 2.
- CLAUDE.md vehicle schema and image-handling rules brought in sync with game-design-document.md.
- README live link corrected (`blazejama.github.io/MatKenGame`), MVP/future features separated, phase status changed from "In Progress" to "In Setup".
- TODO.md refreshed to current scope; admin items confirmed under Phase 2; image-storage items split between MVP and Phase 2.
- Game Design Document bumped to v1.2 — admin and image-storage sections moved to Phase 2, MVP rule simplified to random-pick.

### Added
- `.gitignore` for static PWA project
- `data/` and `assets/icons/` folder skeleton (with `.gitkeep` placeholders)

---

## [0.1.0] - 2026-03-26
### Added
- Project repository created (MatKenGame)
- README.md — project overview and structure
- CHANGELOG.md — version tracking
- TODO.md — feature checklist for all phases
- Game Design Document — full feature plan MVP through Phase 3
- Project Technical Summary — PWA platform decision

---
