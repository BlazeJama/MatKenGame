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

### Added — Phase 3: Leaderboard
- **Global leaderboard** — powered by Supabase (PostgreSQL, RLS-secured). Scores are posted to a `leaderboard` table with callsign, score, total, category, difficulty, and timestamp. Uses the browser-safe publishable key with Row Level Security: all reads are public, inserts are validated server-side (score 0–10, difficulty 1–3, callsign 1–16 chars).
- **Callsign system** — players pick a 1–16 character callsign (auto-uppercased) stored in `localStorage` under `matken-callsign`. The `CallsignModal` overlay prompts on first submit and can be re-opened at any time from the End Screen.
- **End Screen — leaderboard submission card** — new `TacCard` below the score shows the current callsign and a "SUBMIT SCORE" button. State cycles: idle → transmitting → ✓ SCORE SUBMITTED. Error messages surface if the POST fails. Also shows session badges (category abbreviation + difficulty stars).
- **End Screen — leaderboard navigation** — bottom button row now has "⊞ LEADERBOARD" (pre-filtered to the session's category + difficulty) alongside "← CHANGE CAT".
- **LeaderboardScreen** — accessible from End Screen and Home Screen (⊞ LEADERBOARD button). Shows top-20 entries in a table (rank, callsign, score/10, category, difficulty stars, time ago). Category and difficulty filters update the fetch live. A "↻ REFRESH" button re-fetches without a page reload. Empty-state and error-state handled.
- **Home Screen — leaderboard button** — the single "◆ PERFORMANCE LOG" ghost button is now a side-by-side pair: "◆ PERF LOG" + "⊞ LEADERBOARD" (opens the global ALL × ALL board).

### Added — Phase 2 progress
- **Alliance filter** — new ALLIANCE pill row on the home screen with four options: ALL / NATO / WARSAW / OTHER. NATO covers all current NATO member states (including Finland and Sweden); Warsaw Pact covers Soviet Union and Russia; Other covers Switzerland, Israel, South Korea, China, and any country not in the above two groups. Pills dim when the current category+era+nation+difficulty combination has zero playable vehicles for that alliance. Stacks with all other filters.
- **Alliance config editor in admin** — new **🌐 Alliances** button in the admin header opens a modal listing every country in the vehicle database with its vehicle count and an alliance dropdown. Changes save to localStorage instantly (no export needed for live preview). The button gains an amber ★ indicator when any custom assignment is active. A "Reset to defaults" option wipes all overrides.
- **Alliance config baked into `vehicles.js` export** — the **💾 Save** export now appends `window.pactConfig = { ... }` to the downloaded file alongside `window.vehicles`. Once exported and committed via `update-game.bat`, the alliance assignments are in the repo and work identically on every device. Priority order in the game: localStorage override (admin live preview) → `window.pactConfig` (deployed) → hardcoded NATO/Warsaw sets (fallback).
- **Stats screen (PERFORMANCE LOG)** — accessible via the "◆ PERFORMANCE LOG" ghost button on the home screen. Shows a compact grid of best scores per category × difficulty (ALL / MBT / APC / IFV / ARTY / HELO rows, EASY ★ / MEDIUM ★★ / HARD ★★★ columns). The highest recorded score is highlighted in brighter amber. Includes a "PERSONAL BEST X/10" callout, an empty state for first-time players, a "BACK TO BASE" button, and a "🗑 CLEAR ALL RECORDS" option (shown only when records exist, with a confirm dialog).
- **Era filter** — new ERA pill row on the home screen with four options: ALL / WW2 / COLD WAR / MODERN. Pills dim when the current category+nation+difficulty combination has zero playable vehicles at that era. Default is ALL.
- **Nation filter** — dynamic `<select>` below the era row. The option list is auto-built from the vehicles that pass the active category+era filters, so it only ever shows nations that actually exist in the current context. Selecting a specific nation narrows both the question pool and the playable-count display. Resets to ALL automatically when a category or era change makes the chosen nation unavailable. Default is ALL NATIONS.
- **Difficulty modes (EASY / MEDIUM / HARD)** — the home screen now offers three difficulty levels, mapped to the per-image `stars` field that has been in the data schema since v0.1.0. Each round picks images of the chosen star level only; vehicles without an image at the selected level are excluded from the question pool but still appear as plausible wrong answers (since wrong-answer cards only use the vehicle name, not its image). Difficulty buttons dim when the current category has zero playable images at that level. Default is Easy on first launch.
- **Best scores are now tracked per category × difficulty.** The localStorage key (`matken-best-scores`) migrates legacy flat scores (`{ category: number }`) into the new nested form (`{ category: { difficulty: number } }`) automatically — old flat scores are treated as Easy-mode results.
- **Per-category vehicle expansion** — each non-MBT category now has 10 entries with full metadata and 3 fun facts. New additions: APCs (BTR-60, VAB, Piranha III, Eitan); IFVs (BMP-1, Puma, K21, ZBD-04A); Artillery (M270 MLRS, 2S7 Pion, M777, PLZ-05); Helicopters (UH-1 Huey, Mi-8 Hip, NH90, AW101 Merlin). Total: 50 vehicles, 10 per category.

### Changed
- **`Reset to file` button replaced with `🗑 Discard draft`** on the admin page — red destructive styling, stronger confirm dialog that counts the new vehicles and image URLs being lost, and a tip pointing at Save + update-game.bat as the non-destructive alternative.
- **End screen now offers two paths** — primary `↺ REDEPLOY` (same category/difficulty again) and secondary `← CHANGE CATEGORY` (back to home).

### Fixed
- **Stray `];` in `data/vehicles.js`** that prematurely closed the vehicles array after the M4 Sherman entry, leaving the four new categories as dangling syntax errors. The deployed game hadn't crashed because the service worker was still serving the cached pre-expansion file, but the next cache refresh would have triggered a `DATA LOAD FAILURE`. Fixed and verified — the file now parses to exactly 50 vehicles.

---

## [1.0.0] - 2026-05-23 — MVP Release 🚀

First public release. Complete playable PWA: Home → 10-question quiz → Debrief → Replay. Tactical HUD aesthetic across all screens. Installable on iOS (verified) and Android (untested but configured). Admin page included as a bonus — full vehicle CRUD, draft persistence, export to `data/vehicles.js`.

### Added
- **Mobile safe-area layout (v17)** — quiz, home, and end screens now respect iOS safe-area insets so nothing hides behind the iPhone status bar / Dynamic Island or the home indicator. New `.quiz-shell` CSS class uses `100dvh` so the layout is exactly one screen tall on mobile (no dead space below the answers). The vehicle image switched from a fixed 220px height to a flex-fill region that grows into the space between the header and the answer buttons. Verified on iPhone 11 Pro.
- **PWA icons** — `assets/icons/icon-192.png` and `assets/icons/icon-512.png` generated: white tank silhouette (hull, turret, barrel, wheel cutouts) on navy #1a2744 background. Both declared `maskable` in `manifest.json` so Android adaptive icons clip cleanly to any shape. Service worker bumped to v14 to precache the new files; `.gitkeep` placeholder removed from `assets/icons/`.

### Changed
- **Quiz image now shows the whole vehicle (v18)** — switched the target image from `object-cover` (which cropped tall or wide photos) to `object-contain`, so every photo is shown end-to-end. Any letterboxing sits on the existing dark `#0a0e1a` image backdrop and reads as intentional.
- **Result panel removed from the quiz (v19)** — the "✓ TARGET ACQUIRED" / "✗ WRONG TARGET" box has been pulled out of the quiz screen. The answer-button styling (green for correct, red for the chosen wrong option, dimmed for the unchosen alternatives, plus ✓ / ✗ glyphs) already carries the full feedback signal, so the panel was redundant. The `funFacts` data, the random-pick logic in `buildRound`, and the admin editor all remain in place — the in-game render can be restored with a single block in `QuizScreen`.
- **Next button is now always visible (v19)** — the Next / Debrief button used to appear only after an answer was selected, causing the layout to shift. It now renders on every question and is styled disabled (gray background, dim text, `cursor: not-allowed`) until an answer is picked, matching the disabled-button look from the home screen.
- **Tactical HUD visual redesign** — complete UI overhaul across all three screens (Home, Quiz, End):
  - Dark `#070b14` background with a subtle amber grid and fixed scanline overlay (CSS `body::after`)
  - **Bebas Neue** display font for all headings and action labels; **Rajdhani** for body/UI text; **Share Tech Mono** for score counters and metadata readouts — all served from Google Fonts
  - Amber (`#f59e0b`) replaces navy as the accent colour: progress bar, letter badges, corner brackets, active states, highlights
  - `TargetBrackets` component overlays four corner brackets on the mission intel card, target image, and score card
  - Target image gets a `◉ IDENTIFY TARGET` gradient overlay and full-corner targeting reticle
  - Answer buttons use dark glass panels (`rgba(15,23,42,0.85)`) with amber border; reveal green/red/ghosted states after selection with animated `anim-panel` entry
  - Result banner shows `✓ TARGET ACQUIRED` / `✗ WRONG TARGET` in Bebas Neue with the amber `◈` fun-fact bullet
  - End screen redesigned as a DEBRIEF: score fraction, animated percent fill bar, tactical rating label (`ELITE OPERATOR` → `BACK TO BASICS`), **REDEPLOY** button
  - Home screen: `◈ SYSTEM ONLINE ◈` label, MATKENGAME title with amber **GAME** suffix, Mission Intel card, **BEGIN TRAINING** button, Field Briefing section
  - Service worker bumped to v15; `.claude/launch.json` added for local preview server

### Admin page (bonus — not strictly required for MVP)
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
- **Admin delete + list refinements (PR 4 of 5)**:
  - Delete button on each vehicle row is now active; clicking it confirms then removes the vehicle from the draft (selection is cleared if the deleted vehicle was on screen).
  - Inside the form, every image row gets a checkbox; ticking ≥1 reveals a red **Delete N selected** button that confirms before bulk-removing. The existing ✕ button still removes a single row instantly. Selection is reset when switching vehicles.
  - Vehicle list now sorts **alphabetically by name** by default.
  - Filter row reorganised into a search bar (full width) + three dropdowns: **Category**, **Country**, **Difficulty**. Country and difficulty options are auto-derived from the current data.
  - Category dropdown gains a **"Drafts (no images)"** sentinel option for quickly finding unfinished vehicles; real categories are grouped under a `By category` heading.
  - Difficulty dropdown filters to vehicles that have at least one image at the selected star level.
  - Country form field now uses a native HTML5 `<datalist>` so typing suggests existing countries — prevents spelling drift like "U.S.A" vs "United States".
- **Admin export (PR 5 of 5)** — completes the edit-export-commit loop. New **⬇ Export vehicles.js** button in the admin header opens a modal that:
  - Shows a preview of the generated file content (full schema header + properly formatted entries that exactly match the hand-written `data/vehicles.js` style — unquoted keys, sensible indentation, JSON-stringified strings for safe escaping)
  - **Copy to clipboard** button (with green ✓ confirmation feedback)
  - **Download as file** button (saves `vehicles.js`)
  - Closes on Esc / click outside / Close button
  - Disabled when there are zero vehicles to export
- Service worker bumped to v13.

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
