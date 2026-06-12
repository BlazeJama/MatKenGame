# MatKenGame — Feature Checklist

This file tracks the completion status of every planned feature.
Check items off as they are finished. Never remove items — mark them ✅ instead.

---

## 🏗️ Pre-Build Setup

- [x] Game Design Document written
- [x] Platform decision made (PWA)
- [x] GitHub repository created (MatKenGame)
- [x] README.md created
- [x] CHANGELOG.md created
- [x] TODO.md created
- [x] GitHub Pages enabled on main branch
- [x] Folder structure created in repo
- [x] index.html created
- [x] app.jsx created
- [x] manifest.json created
- [x] service-worker.js created
- [x] PWA icons created (192px, 512px)

---

## 🔧 Vite Migration

> Converting from CDN-based React to a build-tool setup for easier feature development and maintenance.
> **⚠️ Merge back to main requires explicit approval before proceeding.**

### Phase 1: Setup
- [x] Create git branch `vite-migration`
- [x] Initialize Vite with React template
- [x] Install dependencies (`npm install`)
- [x] Clean up unnecessary Vite template files

### Phase 2: Code Migration
- [x] Move app.jsx to src/ folder structure
- [x] Move data/vehicles.js to src/
- [x] Update all import paths for new structure
- [x] Move assets (images, icons) to public folder
- [x] Update manifest.json and service-worker.js for Vite paths
- [x] Remove CDN React/Tailwind links; add npm packages instead
- [x] Update index.html for Vite entry point

### Phase 3: Local Testing
- [x] Run `npm run dev` and verify dev server works
- [x] Test quiz gameplay (play a round, verify scores)
- [x] Test admin page functionality
- [ ] Test PWA (offline mode, installability) _(deferred — no change to SW logic)_
- [x] Test all UI screens and interactions
- [x] Verify responsive design on mobile

### Phase 4: Build & Deployment
- [x] Run `npm run build` and verify dist/ folder is created
- [x] Set up GitHub Actions workflow for auto-build and deploy
- [ ] Test live deployment on GitHub Pages _(requires merge to main + Pages config)_
- [ ] Verify deployed app works (no broken links, images load, PWA installs)

### Phase 5: Documentation & Merge
- [x] Update CLAUDE.md with new build/dev instructions
- [ ] Update README.md if needed
- [x] Update TODO.md with migration completion
- [x] Update CHANGELOG.md with migration summary
- [ ] ⚠️ **Request explicit approval to merge `vite-migration` → `main`**
- [ ] Merge to main (if approved)
- [ ] Verify GitHub Pages deployment after merge

---

## 🥇 MVP — Core Quiz Game

### UI Screens
- [x] Landing screen (entry point: Training / Learning Hub / Leaderboard cards)
- [x] Learning Hub screen (search + filter + vehicle grid)
- [x] Vehicle Study screen (image carousel + 5 tabs: Overview, Armament, Protection, Whats, Variants)
- [x] Home screen with Play button
- [x] Quiz screen — vehicle image display
- [x] Quiz screen — 4 answer option buttons
- [x] Feedback state — correct answer (green highlight)
- [x] Feedback state — wrong answer (red highlight + show correct)
- [x] Score tracker display (e.g. 3/10)
- [x] End screen — final score display
- [x] End screen — Play Again button
- [x] Responsive layout (mobile + desktop)
- [x] Touch-friendly button sizes (min 44x44px)
- [x] Visual-design polish pass — tactical HUD aesthetic (dark bg, amber accents, Bebas Neue, scanlines, corner brackets)

### Game Logic
- [x] Load vehicle data from data file
- [x] Randomly select 10 vehicles per round
- [x] Randomly select 1 image per vehicle from its image array
- [x] Generate 4 answer options (1 correct + 3 random wrong)
- [x] Handle correct answer selection
- [x] Handle wrong answer selection
- [x] Advance to next question
- [x] Calculate and display final score
- [x] Reset game state on Play Again

### Vehicle Data (MVP)
- [x] Data structure defined (id, name, country, category, era, images array of `{url, stars}`, funFact)
- [x] 10 Main Battle Tanks added with 3 images each (bare-minimum MVP count — 15–20 is the Phase 2 target)
- [x] Each image has a star rating (1, 2, or 3) recorded — not used by MVP game logic, kept for Phase 2
- [x] Wikimedia Commons image URLs sourced and added directly into `data/vehicles.js`
- [ ] (Phase 2) Local `assets/images/` storage + GitHub-API image upload via admin page
- [ ] (Phase 2) Enforce minimum 5 images per difficulty level for filtering

### PWA
- [x] manifest.json configured
- [x] Service worker registered
- [x] Offline caching working
- [x] Installable to iOS home screen — verified on iPhone 11 Pro
- [ ] Installable to Android home screen _(deferred — no Android device available for testing)_
- [ ] Tested in Google Sites iframe embed _(deferred — not currently required for launch)_

---

## 🥈 Phase 2 — Depth & Replayability

### New Content
- [x] APCs added to vehicle database (10 entries: M113, BTR-80, Stryker, FV432, Patria AMV, Boxer, BTR-60, VAB, Piranha III, Eitan)
- [x] IFVs added to vehicle database (10 entries: M2 Bradley, BMP-2, BMP-3, Warrior, CV90, Marder, BMP-1, Puma, K21, ZBD-04A)
- [x] Self-propelled artillery added (10 entries: M109, PzH 2000, 2S19, CAESAR, K9, AS-90, M270, 2S7, M777, PLZ-05)
- [x] Military helicopters added (10 entries: AH-64, Mi-24, UH-60, CH-47, Ka-52, Tiger HAD, UH-1, Mi-8, NH90, AW101)
- [x] Database expanded to 50 vehicles — 10 per category

### Difficulty Levels
- [x] Easy mode implemented (★ — uses 1-star images per vehicle)
- [x] Medium mode implemented (★★ — uses 2-star images per vehicle)
- [x] Hard mode implemented (★★★ — uses 3-star images per vehicle)
- [x] Difficulty selector on home screen

### Filters
- [x] Category filter (tanks, helicopters, etc.)
- [x] Era filter (WW2 / Cold War / Modern) — pill selector on home screen, dims when zero playable
- [x] Nation filter — dynamic dropdown auto-built from current category+era; resets to ALL when selection becomes unavailable
- [x] Alliance filter (NATO / Warsaw Pact / Other) — pill selector on home screen, stacks with all other filters; config editable via admin
- [ ] Random mixed mode (default)

### Hint System
- [ ] Hint button added to quiz screen
- [ ] 2 hints per round logic implemented
- [ ] Hint eliminates one wrong answer

### Fun Facts
- [ ] Fun fact panel shown after each answer
- [ ] Fun facts written for all vehicles in database

### Progress Tracking
- [x] Best score saved per category (localStorage)
- [x] Stats screen created — PERFORMANCE LOG with best score per category × difficulty, overall best callout, "Clear All Records" option
- [x] Stats accessible from home screen — "◆ PERFORMANCE LOG" ghost button below BEGIN TRAINING

### Admin Page
*Being built in 5 PRs — see CHANGELOG for status.*
- [x] Password screen at /admin _(PR 1)_
- [x] Session-based password authentication _(PR 1)_
- [x] Two-column desktop layout (list left, form right) _(PR 1)_
- [x] Desktop-only check with mobile fallback message _(PR 1)_
- [x] Vehicle list with search and category filter _(PR 2)_
- [x] Per-vehicle difficulty status stars (E / M / H rows) _(PR 2)_
- [x] Bright gold = ready (5+ images), dim = partial, very dim = none _(PR 2)_
- [x] Category badge + era badge per vehicle, image count _(PR 2)_
- [x] Click row → read-only details panel (name, ID, badges, fun facts list, image thumbnails) _(PR 3)_
- [x] Edit button (in details panel) → switch to edit form _(PR 3)_
- [x] Add vehicle form (name, country, category, era, fun facts) _(PR 3)_
- [x] Per-image star difficulty selector (1, 2, 3 stars) _(PR 3)_
- [x] Multi-row fun fact editor (add / remove) — game picks one at random per question _(PR 3)_
- [x] Auto-ID generation from name (with collision avoidance) _(PR 3)_
- [x] Permissive validation — save partial drafts; only `name` is required _(PR 3)_
- [x] Zero-image / zero-fun-fact handling — drafts excluded from game until playable _(PR 3)_
- [x] localStorage-backed drafts — survives refresh, shared with game tab _(PR 3)_
- [x] "Reset to file" button to discard local draft _(PR 3)_
- [x] "Previewing local draft" banner on game when localStorage draft is active _(PR 3)_
- [x] Delete vehicle (from list row) with native confirmation popup _(PR 4)_
- [x] Multi-select checkboxes on image rows _(PR 4)_
- [x] "Delete N selected" red button when ≥1 image checked, with confirmation _(PR 4)_
- [x] Alphabetical sort by name _(PR 4)_
- [x] Country filter dropdown (auto-derived from data) _(PR 4)_
- [x] Difficulty filter dropdown (1 / 2 / 3 star) _(PR 4)_
- [x] "Drafts (no images)" filter — quick way to find unfinished vehicles _(PR 4)_
- [x] Autocomplete for the country form field (HTML5 datalist) _(PR 4)_
- [x] Export vehicles.js — generated file content with download + copy-to-clipboard _(PR 5)_
- [x] Modal preview shows the exact file content before exporting _(PR 5)_
- [x] Alliance config editor (🌐 Alliances) — assign countries to NATO / Warsaw Pact / Other; saved to localStorage + baked into vehicles.js on export
- [x] Alliance config persisted in vehicles.js export as `window.pactConfig` — works on all devices after commit
- [x] Image upload — drag-and-drop / click-to-browse — drops convert to data URLs (live preview), Export modal bundles them as named downloads to drop into assets/images/
- [x] Add vehicle form (name, country, category, era, fun fact) _(duplicate of PR 3 item above — already done)_
- [x] Image upload — drag and drop or click to browse _(deferred — see item above)_
- [x] Per-image star difficulty selector (1, 2, 3 stars) _(duplicate of PR 3 item above — already done)_
- [x] Difficulty label under each image thumbnail (Easy / Medium / Hard) _(duplicate — already done)_
- [x] Multi-select checkboxes on image thumbnails _(duplicate of PR 4 item above — already done)_
- [x] "Delete X selected" button shown when images are checked _(duplicate of PR 4 item above — already done)_
- [x] Confirmation popup before image deletion _(duplicate of PR 4 item above — already done)_
- [x] Edit existing vehicle _(duplicate of PR 3 item above — already done)_
- [x] Delete vehicle with confirmation popup _(duplicate of PR 4 item above — already done)_

---

## 🥉 Phase 3 — Polish & Engagement

### Special Game Modes
- [ ] Silhouette mode — show outline only
- [ ] Detail zoom mode — show cropped close-up
- [ ] Nation flag mode — match vehicle to country flag
- [ ] "What's Wrong?" mode — spot the incorrect label
- [ ] Vehicle Spotlight mode — learn then quiz
- [ ] Side-by-side comparison after round

### Era Filter
- [x] WW2 filter _(shipped in Phase 2 — ERA pill selector on home screen)_
- [x] Cold War filter _(shipped in Phase 2 — ERA pill selector on home screen)_
- [x] Modern filter _(shipped in Phase 2 — ERA pill selector on home screen)_

### Timed Mode
- [x] Countdown timer per question
- [x] Bonus points for fast answers
- [x] Timer toggle on home screen

### Streak & Scoring
- [x] Points-based scoring (100/correct, max 1000) — replaces 0–10 raw counts
- [x] Supabase schema upgraded with `mode` + `hints_used` columns (`score` constraint widened to 0–1500)
- [x] Hint system (button on quiz screen, 2 hints/round, eliminate one wrong answer, −150 per hint at round end)
- [x] Timed mode (15s/question, +50 speed bonus for fast answers, separate leaderboard track)
- [ ] Streak counter (reset on wrong answer, displayed on quiz screen) — deferred until after hints + timed

### Leaderboard
- [x] Backend service set up (Supabase — PostgreSQL + RLS)
- [x] Score submission after round
- [x] Leaderboard screen created (category + difficulty filters, top 20, refresh)
- [x] Callsign entry for leaderboard (localStorage-persisted, CallsignModal)
- [x] Welcome Screen on first visit — required callsign entry before home
- [x] OPERATOR display on home screen with tap-to-edit
- [x] Top 10 instead of top 20 + personal highlight + pinned own entry if outside top 10
- [x] Mode filter (NORMAL / TIMED) on leaderboard screen
- [x] Admin leaderboard page — view all entries, filter by callsign / cat / diff / mode, delete individual entries
- [x] Admin nav bar — VEHICLES / LEADERBOARD tabs sharing a single session

### Social & Sound
- [ ] Share score button (iOS/Android share sheet)
- [ ] Score share image generated
- [ ] Sound effects added (correct/wrong)
- [ ] Sound toggle in settings

### Content
- [ ] Database expanded to 100+ vehicles
- [ ] All vehicles have multiple images

---

## 🐛 Bug Fixes & Known Issues

> Log bugs here as they are discovered. Mark fixed ones ✅.

- None yet

---

*Last updated: 2026-05-27*
