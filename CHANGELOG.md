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
- **Admin vehicle list (PR 2 of 5)** — left column now lists every vehicle with name, country, category badge, era badge (colour-coded per era), image count, and a 3-row difficulty status indicator (E / M / H) showing per-star-level image counts and readiness (bright gold ★ = 5+ images, dim grey ★ = partial, very dim ★ = none). Includes a live search box, category dropdown filter, "Showing X of Y" counter, empty-state message, and a star-colour legend. Edit / Delete buttons present but disabled — wired up in PR 3 / PR 4. Service worker bumped to v5.
- **Admin add / edit form + view-first workflow (PR 3 of 5)** — right column is now driven by a mode state (`empty` / `view` / `edit` / `new`):
  - Click any row → read-only **VehicleDetails** panel with name, ID, badges, difficulty status, fun-facts list, and image thumbnails (each labelled with its star difficulty).
  - **Edit** button (in the details panel) → switch to the **VehicleForm** with all fields editable.
  - **+ New Vehicle** button (moved to the left-column header, next to the count) → blank form for adding.
  - Form: name + auto-generated ID preview, country, category, era, multi-row fun facts with add / remove, multi-row image URLs with per-image star selector and add / remove.
  - Permissive validation: only `name` is required. Country, fun facts, and images can all be empty so partial drafts can be saved and finished later. Any URL provided must be HTTPS.
  - Save → returns to the read-only details view.
- **Multi-fun-fact schema** — `funFact: "..."` migrated to `funFacts: [...]` across the schema docs, `data/vehicles.js` (10 entries), the game (random pick per question, panel hidden when empty), and the admin (add / remove fun-fact rows). Backward-compatibility helper reads either field shape.
- **Zero-image-vehicle handling in the game** — `buildRound` now filters to vehicles with at least one image. Home screen shows "X playable" + "(N drafts skipped — no images yet)". Play button disables when no vehicles are playable.
- **localStorage-backed admin drafts** — admin draft is persisted under `matken-draft-vehicles`. Refreshing the admin keeps your work. The game reads the same key and shows a yellow "Previewing local draft" banner when a draft is active. A **Reset to file** button (visible only when dirty) wipes the draft and reloads from `data/vehicles.js`.
- Service worker bumped to v9.

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
