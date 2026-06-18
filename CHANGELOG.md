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

### Changed — Welcome + Game Setup screen redesigns (Figma pull, nodes 3-2, 14-2)

**WelcomeScreen** (`src/screens/WelcomeScreen.jsx`) — Figma node 3-2:
- Added double-div max-width wrapper (`tac-grid` + `max-width: 390px, margin: 0 auto`)
- Header: paddingTop bumped to 80px (+ safe-area), centered layout with precise spacers (20px / 12px)
- "OPERATOR REGISTRATION" label: switched from Share Tech Mono to Rajdhani SemiBold, amber rgba 0.5
- Subtitle: both lines now same colour (#94a3b8) — removed the darker tint on line 2
- "CALLSIGN (1–16 CHARS)": switched from Share Tech Mono to Rajdhani SemiBold #334155
- DEPLOY button: removed the `▶ ` prefix — text is now just `DEPLOY`

**GameSetupScreen** (`src/screens/GameSetupScreen.jsx`) — Figma node 14-2:
- Added double-div max-width wrapper
- Header completely redesigned (140px fixed height):
  - `← BACK` button: amber (#f59e0b), Rajdhani SemiBold 14px (was `← HOME` in grey Share Tech Mono)
  - Added `◈ GLOBAL RANKING ◈` amber label above the title
  - Title changed from `MATKENGAME` to `GAME SETTINGS` (Bebas Neue 48px, "game" white + "settings" amber)
  - Subtitle: Share Tech Mono 10px grey, centered
- Section labels (CATEGORY / ERA / ALLIANCE / DIFFICULTY / MODE): switched from Share Tech Mono to Rajdhani SemiBold
- Filter chips: Rajdhani SemiBold 14px with `padding: 13px 11px` (was Share Tech Mono 0.72rem)
- Difficulty chips: stars and label now rendered as single string (`★  EASY` / `★★  MEDIUM` / `★★★  HARD`)
- Mission Intel card: VEHICLES READY / PER ROUND labels switched to Rajdhani SemiBold 13px; BEST row switches from Share Tech Mono to Rajdhani
- BEGIN TRAINING button: height 40px (was 58px min-height); added `→` arrow suffix
- Removed utility buttons at bottom (PERF LOG / LEADERBOARD / CALLSIGN edit) — navigation now flows through the home screen

---

### Changed — Home screen redesign (Figma pull, node 49-2)

Rebuilt `LandingScreen.jsx` to match the updated Figma design:

- **Card order** reversed — TEST YOUR SELF is now first (primary action), VEHICLE LIBRARY second, LEADERBOARD third
- **Each card** now follows a consistent TacCard layout: amber `◈ CATEGORY` label → split-color Bebas Neue title → Rajdhani subtitle → full-width button
- **Three button tiers**: solid amber fill (Begin Training, primary CTA), amber border (Study Vehicles, secondary), grey border (View Rankings, tertiary)
- **Header** is now left-aligned (paddingLeft 67px) matching the Figma frame, replacing the previous centered layout
- **Leaderboard card** retains the live `#rank` display in the top-right, now styled as a clean number column with "YOUR RANK" label above it
- Removed the `rankNeighbors` list from the leaderboard card (Figma no longer shows it)

---

### Added — Pinch-to-zoom inside lightbox viewer

**Pinch-to-zoom** (`VehicleStudyScreen`) — the lightbox overlay now supports native two-finger zoom and pan on mobile:

- **Pinch in/out** scales the image from 1× up to 6×. A separate `handleLightboxTouchMove` handler fires continuously during the gesture to update scale in real time.
- **Pan** — while zoomed in (scale > 1), a single finger drags the image freely. Pan resets when zoom snaps back to 1×.
- **Double-tap** toggles between 1× and 2.5× — tap twice quickly (<300ms) to jump in; double-tap again to reset.
- **Snap-back** — releasing a pinch at scale < 1.05 snaps cleanly back to 1× with a 0.25s ease transition.
- **Swipe gestures disabled while zoomed** — swipe-to-navigate and swipe-down-to-close only trigger when scale ≤ 1, preventing accidental navigation while panning.
- **Arrow buttons hidden while zoomed** — ‹ › nav arrows disappear at scale > 1 to clear the viewport for panning.
- **Hint text updates dynamically** — shows `PINCH TO ZOOM · DOUBLE-TAP TO RESET` while zoomed, and the full gesture hint at 1×.
- Zoom resets automatically on image navigate (prev/next) and on lightbox close.

Touch tracking uses dedicated refs (`pinchStartDist`, `pinchStartScale`, `isPinching`, `panStartRef`, `lastTapTime`) alongside a `zoomRef` that mirrors `zoom` state for stale-closure-free reads inside move handlers.

---

### Added — Vehicle image swipe gestures + lightbox fullscreen viewer

**Swipe to navigate** (`VehicleStudyScreen`) — the image carousel now responds to horizontal finger swipes on mobile. Swiping left/right advances or rewinds through the vehicle's images. The existing ‹ › arrow buttons remain for desktop. `touch-action: pan-y` is set on the carousel so the browser still handles vertical page scroll and only horizontal touches are captured by the swipe handler.

**Lightbox / fullscreen overlay** — tapping any vehicle image opens a full-screen overlay (`position: fixed; z-index: 1000`) with:
- Image scaled to fit the screen (`max-height: 70vh, object-contain`)
- Vehicle name + image counter (e.g. `2 / 3`) in the top-left
- ✕ close button top-right
- ‹ › navigation arrows at mid-screen left and right (44px touch targets)
- Dot row for direct image jumping
- Star difficulty label (★ EASY / MEDIUM / HARD) below the image
- Hint line: `SWIPE TO NAVIGATE · SWIPE DOWN TO CLOSE`
- **Swipe left/right** to change image; **swipe down** (>80px vertical, predominantly vertical) to close

Both swipe handlers share a single `touchStartX / touchStartY` ref pair. The carousel and lightbox use separate `onTouchEnd` callbacks so they can each apply the right gesture logic.

---

### Changed — Full UI redesign: Landing, Learning Library, Vehicle Study screens (Figma pull)

Rebuilt three screens from scratch to match the Figma design system (Rajdhani / Bebas Neue / Share Tech Mono, MatKen Colors, 390px frames). All screens now use the double-div max-width pattern (`tac-grid` outer wrapper + `max-width: 390px, margin: 0 auto` inner) so layout stays centred and unscaled on wide desktop browsers.

**LandingScreen** (`src/screens/LandingScreen.jsx`) — Figma node 49:2
- Title split: MATKEN (white #e2e8f0) + GAME (amber #f59e0b) in Bebas Neue, `clamp(3rem, 13vw, 4.8rem)`
- Subtitle: Rajdhani Medium 0.68rem, `#47576b`, tight tracking — "MILITARY VEHICLE RECOGNITION TRAINING"
- Card order changed to: Leaderboard → Study Vehicles → Test Your Knowledge
- Leaderboard TacCard: rank (#—), "YOUR BEST RANK" label, divider, neighbour rows
- Study / Test cards: centred Bebas Neue 2.25rem white label, amber border `rgba(245,158,11,0.35)`

**LearningHomeScreen** (`src/screens/LearningHomeScreen.jsx`) — Figma node 56:2
- Header Secondary: `← BACK` (Rajdhani SemiBold, #64748b) + `◈ INTELLIGENCE FILES` (amber) + `VEHICLE LIBRARY` (Bebas Neue 3rem, white + amber split), 110px total height
- Search bar: 43px height, `rgba(15,23,42,0.5)` background, `rgba(51,65,85,0.5)` border, Rajdhani Medium
- Category chips: `justify-between`, 44px height, Rajdhani SemiBold — ALL / MBT / APC / IFV / ARTY / HELO
- Vehicle grid: 2-col CSS grid, 11px gap. Each card: 89px photo area (`#0a0f1c`), 36px text area (Rajdhani SemiBold name + `CAT · ERA` in Rajdhani Medium `#64748b`)
- Back button in footer navigates to home via `onBack`

**VehicleStudyScreen** (`src/screens/VehicleStudyScreen.jsx`) — Figma nodes 76:2, 78:2, 78:59, 78:116, 78:173
- **Nav Area**: `← ALL VEHICLES` (Rajdhani SemiBold, amber 35% opacity) → vehicle name (Bebas Neue 34px) → `CATEGORY · ERA · COUNTRY` breadcrumb (Rajdhani Medium 11px, `#637387`)
- **Image Carousel**: 190px `#141f38` background; shows image or `[ VEHICLE PHOTO ]` placeholder; `★ EASY/MEDIUM/HARD` star label at bottom-left; ‹ › circular nav buttons (32px, dark glass) when multiple images
- **Dots Row**: 36px centred row; amber active dot, dark inactive dots; clickable for direct image jump
- **Tab Bar**: `#1e293b` background, 44px height, 5 fixed-width tabs × 78px (OVERVIEW / ARMAMENT / PROTECTION / WHATS / VARIANTS); active tab = white Rajdhani SemiBold + amber 2px bottom underline; inactive = `rgba(99,115,135,0.7)` Rajdhani Medium
- **OVERVIEW tab**: ABOUT paragraph (Rajdhani Medium 13px, `#637387`) + SPECIFICATIONS table (label: Rajdhani Medium `#637387` / value: Rajdhani SemiBold white) with `rgba(51,65,85,0.3)` dividers
- **ARMAMENT / PROTECTION tabs**: section headers (Rajdhani SemiBold 11px, `#334155`) + entries (name white + `◉ N` amber visibility badge + description `#637387`) with dividers
- **WHATS tab**: intro text (Rajdhani Medium, `rgba(99,115,135,0.6)`) + letter/keyword/description entries (Bebas Neue 22px amber letter + Rajdhani SemiBold keyword + Rajdhani Medium description) with dividers
- **VARIANTS tab**: `◉ VISIBLE ID DIFFERENCE  ⚙ INTERNAL / NOT VISIBLE` legend + variant entries (Bebas Neue 18px name + year + tag label + amber `◉ visible` lines + grey `⚙ internal` lines) with dividers
- INTEL PENDING state unchanged for all tabs with no data

### Fixed — vehicles.js format + live admin page loading no vehicles

Three stacked issues caused the live admin to show an empty vehicle list and the game to lose all vehicles after an export cycle:

1. **Wrong export format** — `data/vehicles.js` was regenerated by the admin in `window.vehicles = [...]` (browser global) format, but the Vite-built game imports it as an ES module (`import { vehicles } from '../data/vehicles'`). Converted the file to `export const vehicles` / `export const pactConfig`.
2. **Admin's export generator was broken** — `generateVehiclesJs()` in `admin.babel` was still emitting `window.*` globals, meaning every future Export from the admin would have broken the game again. Fixed to always emit ES module format.
3. **Live admin couldn't load vehicles** — Vite bundles `data/vehicles.js` into the JS blob but never copies it as a standalone file. The admin page loads it directly via a browser `import`, which got a 404 on the live site. Added a Vite plugin (`copy-vehicles-data`) that copies `data/vehicles.js` → `dist/data/vehicles.js` after every build.

### Changed — Admin page: full vehicle data in view panel, W.H.A.T.S. rename, template buttons, image thumbnails (v63)

**Left panel — vehicle card thumbnails**
- Each vehicle card now shows the first image as an `80×56px` thumbnail between the name and the Delete button, so you can visually identify vehicles without remembering their names.
- Vehicles with no images show a dashed "No image" placeholder instead.

**Right panel — full data view on select**
- Selecting a vehicle now shows ALL data without needing to open Edit: About text, Specs grid, Fun facts, Armament entries, Protection entries, W.H.A.T.S. cues, Variants, and full image gallery.
- First 3 images displayed as a quick preview strip at the top of the panel (below Difficulty Status), above the Overview section.

**W.H.A.T.S. rename**
- All references to "What's It?" updated to "W.H.A.T.S." — both in the form section header and the study data description line.

**W.H.A.T.S. template buttons**
- Two template buttons added to the W.H.A.T.S. section header in the edit form:
  - **W.H.A.T.S.** (blue) — pre-fills 5 cues: W=Wheels/Tracks, H=Hull, A=Armament, T=Turret, S=Suspension/Silhouette
  - **W.E.F.T.** (purple) — pre-fills 4 cues for helicopters: W=Wings, E=Engines, F=Fuselage, T=Tail
- Both buttons confirm before replacing existing cues.

### Added — Component Showcase page (v62)
- New `src/screens/ShowcaseScreen.jsx` — a standalone design system reference page accessible from the landing screen.
- Tapping the `v0.2.0 · CLASSIFIED` version badge in the landing footer navigates to the showcase.
- Sections: Colour Palette (14 swatches with hex values), Typography (Bebas Neue display + Share Tech Mono data at all sizes), TacCard variants (default, stat, image), Buttons (primary/ghost amber/ghost grey/danger/small/disabled), Filter Pills (category, difficulty, mode), Answer Options (all 4 states: default/correct/wrong/eliminated), Badges & Labels (category/difficulty/mode/YOU tag), Progress Bars (round, timer at amber/orange/red, score percent), Score Display (4 rating tiers), Input Fields (callsign + search), Target Brackets (4 sizes), SW Update Banner.
- Landing screen `onShowcase` prop added; `App.jsx` wired the route and passes the prop.

### Added — Study Data populated for ALL 61 vehicles (v60)
- **18 remaining vehicles** completed: 5 IFVs (Tulpar, ASCOD, Piranha V, VBCI, VBM Freccia), 7 Artillery (CAESAR, K9 Thunder, AS-90, M270 MLRS, 2S7 Pion, M777, PLZ-05), 6 Helicopters (CH-47 Chinook, Tiger HAD, UH-1 Huey, Mi-8 Hip, NH90, AW101 Merlin)
- Each vehicle includes complete study data structure:
  - **Overview tab**: About (history/context), Crew, Weight, Length, Width, Height, Engine type, Horsepower, Fuel capacity, Speed, Range, Entered Service year
  - **Armament tab**: Main gun and secondary weapons with technical specifications
  - **Protection tab**: Armor composition, protective systems, and sensor descriptions
  - **What's It? tab**: Visual identification guide with letter-keyed distinctive features (e.g. "E" for Engine, "B" for Blow-out panels, "H" for Hatch placement)
  - **Variants tab**: Historical production variants with years, labels, and visible/internal differences
- **All 61 vehicles** in the database now have complete study data. Vehicle Study screen fully functional for every vehicle.

### Added — New screen flow: Landing, Learning Hub, Vehicle Study
- **LandingScreen**: new app entry point replacing the direct Game Setup landing. Shows three TacCards: Training (→ Game Setup), Learning Hub (→ vehicle browser), and Leaderboard. Displays operator callsign, vehicle count, and personal best score.
- **LearningHomeScreen**: vehicle browser with full-text search (name/country), category filter pills (ALL/MBT/APC/IFV/ARTY/HELO), and a 2-column responsive vehicle grid showing photo, name, country, and category badge.
- **VehicleStudyScreen**: tabbed vehicle detail page. Image carousel with difficulty star badge and dot navigation. Overview tab shows country/category/era/image count and fun facts. Armament/Protection/Whats/Variants tabs show "INTEL PENDING" placeholder (data structure not yet defined).
- **GameSetupScreen** (renamed from HomeScreen internally): added "← HOME" back button so players can return to Landing from the setup screen.
- Updated app routing: initial screen changed from `"home"` to `"landing"`; `returnHome()` now navigates to Landing; added `screen` states `"learning"` and `"vehicle-study"`.
- `TacCard` now accepts and spreads extra props (e.g. `onClick`, `role`, `tabIndex`) enabling full-card interactive patterns.

### Changed — Vite migration (branch: vite-migration)
- Replaced CDN-based React/Tailwind/Babel setup with Vite + npm packages (`react`, `react-dom`, `tailwindcss`, `@vitejs/plugin-react`)
- `src/App.jsx` — proper ES module imports; removed CDN globals and bottom-of-file `ReactDOM.createRoot` call
- `src/main.jsx` + `src/index.css` — Vite entry point; Tailwind via PostCSS
- `data/vehicles.js` — converted `window.vehicles`/`window.pactConfig` globals to ES module exports
- `index.html` — stripped all CDN scripts; Vite injects the bundled JS/CSS automatically
- `public/` — static assets (images, icons, manifest, service-worker) moved here for Vite build inclusion
- `public/admin/` — admin page moved here so Vite's transform pipeline doesn't break Babel's CDN loading; `admin.jsx` renamed `admin.babel` to prevent Vite from processing it
- `vite.config.js` — `base: '/MatKenGame/'`, custom middleware serves `public/admin/index.html` raw at `/admin/`
- `manifest.json` — updated `start_url`, `scope`, and icon paths to absolute `/MatKenGame/` URLs (required because Vite moves the manifest to `assets/` with a content hash)
- `.github/workflows/deploy.yml` — GitHub Actions workflow: `npm ci` → `npm run build` → deploy `dist/` to GitHub Pages

### Added — Admin Study Data fields (v59)
- Added a "Study Data" section to the admin vehicle edit form, powering the 5-tab Vehicle Study screen.
- **Overview tab**: About textarea (vehicle history paragraph) + 11 spec inputs: Crew, Weight, Length, Width, Height, Engine, Horsepower, Fuel, Speed, Range, Entered Service.
- **Armament tab**: dynamic list of weapon entries. Each entry has a Section dropdown (MAIN GUN / SECONDARY WEAPONS / SMOKE), Name, Description, and optional Visibility Rating (1–3, the ◉ badge shown in-game).
- **Protection tab**: dynamic list with Section dropdown (ARMOUR / SENSORS / PROTECTION SYSTEMS), Name, Description, and optional Visibility Rating.
- **What's It? tab**: Intro text input + dynamic cue list. Each cue has a single Letter (W/H/A/T/S), Keyword, and Description.
- **Variants tab**: dynamic list with Name, Year, Label, and two textarea inputs for Visible Differences (◉) and Internal Differences (⚙) — one item per line.
- Export (`formatVehicleEntry`) updated to serialise all new fields. All study data is emitted conditionally — fields are omitted entirely if empty, keeping `vehicles.js` clean for the 50+ vehicles without study data yet.
- Admin version bumped to v59.

### Added — Admin stale-cache recovery (v58)
- New "🔄 Force refresh" button in the admin header. One click unregisters the service worker, clears all Cache Storage entries, and hard-reloads — replacing the previous 5-step DevTools dance. The localStorage draft is preserved (Save first if you want belt-and-braces safety).
- Silent auto-recovery on load: admin.jsx now compares its baked-in `ADMIN_VERSION` against the `?v=` query the HTML used to load it. On mismatch (i.e. the SW handed us inconsistent HTML/JS), caches are cleared and the page reloads automatically.
- SW bumped to v58.

### Added — Local image hosting (true offline play)
- All 146 vehicle images downloaded from Wikimedia Commons into `assets/images/` with the naming convention `{vehicleId}-{nnn}.{ext}`. Re-runnable: `node scripts/download-images.mjs`.
- `data/vehicles.js` rewritten so every URL is a same-origin local path. The previous Wikimedia URLs were cross-origin, which forced the service worker to return opaque responses and explicitly skip caching them — so offline play was previously impossible.
- 2 broken Google-thumbnail URLs on the Boxer entry are unchanged (they never worked online either).
- Download script handles 429/503 with exponential backoff (2s → 30s cap), 700ms per-request pacing, redirect following, and tmp-rename-on-success so partial files don't pollute the assets folder.
- SW bumped to v51 then v52 to roll out the new vehicles.js + assets.

### Added — Admin drag-and-drop image upload
- `ImageRow` is now a drag-and-drop / click-to-browse tile (no URL input). Existing committed images show a thumbnail + filename; freshly dropped images show as amber "● Pending upload" tiles labelled with the future filename.
- New `ImagesSection` component wraps the whole image list in a multi-file dropzone — drop several images at once to append them in one motion. Drag-depth counter prevents flicker on nested elements.
- Data model: committed images store `image.url = "assets/images/<id>-<nnn>.<ext>"`; pending uploads store `image.url = "data:image/...;base64,..."`. Both render natively in `<img>`, so game preview needs no special-case code.
- New helpers in admin.jsx: `isDataUrl`, `dataUrlExt`, `readFileAsDataUrl`, `nextImageSlotNumber`, `collectPendingDownloads`, `vehiclesWithPathsForExport`.
- Drop validation: non-image files are ignored. Files over 10MB are rejected with an alert (oversized data URLs would blow past the localStorage quota and silently drop the draft).
- FileReader errors are surfaced as user-visible alerts instead of being swallowed.
- Export modal Pending-Images panel: per-image and bulk download buttons, each renaming the file to its target filename. If a pending image is on a vehicle that has no id yet (no `name` set), the export warns and skips it so the user can fix it.
- Admin form: dropped the `https://` validation check (URLs are now local paths or data URLs).
- TODO checkbox updated (`drag-and-drop image upload` now complete).
- SW bumped to v52.

### Added — Admin export: auto-rename + ZIP bundle
- Replaced data-URL anchor downloads with **Blob-URL** downloads so the `download="..."` attribute is honored reliably (Safari and sometimes Chrome ignored it for data URLs, dropping files with the original drag-and-drop name).
- New **📦 Download update bundle** button (JSZip via CDN) — a single `matken-update.zip` containing `/data/vehicles.js` + `/assets/images/<files>`, structured to match the repo. Extract at the project root, run `update-game.bat`, done.
- The ZIP option becomes the primary footer button when there are pending images; the per-file download path remains as a fallback.
- All Blob-URL revokes use `setTimeout(... 1000)` so older Safari has time to start the download before the URL is released.
- SW bumped to v53.

### Added — Hint system
- **◈ USE HINT button** on the quiz screen — sits between the answer options and the NEXT button, visible only before the player answers. Shows remaining hints and the cost upfront ("2 LEFT · −150 PTS EA").
- **2 hints per round** — each hint eliminates one randomly chosen wrong answer on the current question. Eliminated options are heavily dimmed (opacity 0.3), disabled, and cannot be selected.
- **Per-question reset** — eliminated IDs reset when the question advances, so each question starts fresh.
- **−150 pts per hint**, deducted at the end of the round (not per question). Final score cannot go below 0. Best-score tracking uses the post-penalty score.
- **End screen deduction note** — when hints were used, "−N PTS · N HINT(S) USED" appears in red below the session rating.
- `hintsUsed` is submitted with the leaderboard score as before (column already existed in the schema).
- SW bumped to v41.

### Added — Leaderboard mode filter
- **MODE filter row** on the player-facing leaderboard screen — three pill buttons: ALL / NORMAL / ⏱ TIMED. Selecting a mode re-fetches the top 10 filtered to that mode. TIMED button uses the red accent colour to match the quiz timer.
- **⏱ icon on rows** — when the filter is set to ALL, a small ⏱ icon appears next to the timestamp on timed-mode entries so mixed-mode results are distinguishable at a glance.
- **Pre-seeded from end screen** — tapping LEADERBOARD on the debrief screen now pre-selects the mode just played. The home-screen leaderboard button still defaults to ALL.
- **Pinned own entry** — the player-best fetch and rank count both respect the mode filter, giving accurate standings when outside the top 10 in a specific mode.
- Service worker bumped to v39.

### Added — Admin leaderboard page
- **VEHICLES / LEADERBOARD tab bar** in the admin header — both tabs share the same authenticated session. Switching tabs does not log you out or reload the page.
- **Leaderboard tab** shows all entries (up to 1 000) in a full-width table: rank, callsign, score/total, category badge, difficulty stars, mode badge (⏱ TIMED / NORMAL), submission date.
- **Filters** — callsign text search, category dropdown, difficulty dropdown, mode dropdown, sort dropdown (score ↓ / score ↑ / newest / oldest). All filters are client-side; results and count update instantly.
- **Per-row delete** — red Delete button on each row with a confirmation prompt. Delete is optimistic: the row disappears immediately and an error alert appears if the request fails.
- **SQL required for deletes:** `CREATE POLICY "Public delete" ON public.leaderboard FOR DELETE USING (true);` — a reminder banner is shown in the panel until the user sets this up.
- Vehicles-tab action buttons (🌐 Alliances, 💾 Save, 🗑 Discard) are hidden when the leaderboard tab is active.

### Changed — Leaderboard: one best score per player per slot
- **Database trigger `enforce_best_score`** — a BEFORE INSERT trigger on the `leaderboard` table enforces one entry per `(callsign, category, difficulty, mode)` slot. If the incoming score is lower than or equal to the existing one, the insert is silently discarded. If it is higher, the old row is deleted and the new one takes its place.
- **EndScreen feedback** — the submission result now distinguishes between two outcomes: `✓ NEW PERSONAL BEST — LEADERBOARD UPDATED` (green) when the row was actually inserted, and `NOT A NEW PERSONAL BEST — SCORE NOT RECORDED` (grey) when the trigger discarded it. Uses `Prefer: return=representation` so the client can inspect the response body.

### Added — Phase 3 Stage 4: Timed mode
- **TIMED mode toggle** on the Home Screen — a new MODE row (NORMAL / TIMED) sits between the difficulty selector and the begin button. NORMAL is the default (unchanged scoring). TIMED activates the countdown.
- **15-second countdown per question** — a depleting bar below the round-progress bar shows time remaining. Colour transitions amber → orange → red as time runs low. A large countdown number sits at the right end of the bar.
- **Speed bonus** — in timed mode, a correct answer earns 100 pts + up to 50 speed-bonus pts. Full 50 bonus if answered within 5 s, linearly scaled to 0 at 5 s, nothing after that. Max round score is 1500 (10 × 150).
- **Auto-advance on timeout** — when the 15 s expires the correct answer highlights green for 1.5 s ("TIME EXPIRED — ADVANCING...") then the next question loads automatically.
- **Leaderboard separation** — timed scores are submitted with `mode: "timed"` and `total: 1500`. The schema already had the `mode` column from Stage 1.
- **Best scores per mode** — `matken-best-scores` now tracks normal and timed bests independently per category × difficulty. The BEST display on the home screen switches between the two as the mode toggle changes.
- **End Screen mode badge** — a third badge alongside CAT and DIFF shows `⏱ TIMED` (red tint) or `NORMAL` to clearly identify the session mode.
- `useRef` added to the React destructuring (`useState, useEffect, useRef`) for the timer interval ref.
- Service worker bumped to v37.

### Added — Phase 3 Stage 3: Leaderboard polish
- **Top 10** — leaderboard now shows the top 10 entries instead of 20. More competitive, faster to scan.
- **Own callsign highlight** — any row in the top 10 that matches the player's callsign gets an amber tint background and a small `YOU` badge next to the callsign. Multiple entries from the same callsign are all highlighted.
- **Pinned own entry** — when the player's callsign is not in the top 10, a secondary "YOUR STANDING" section appears below a dashed separator showing their personal best for the current filter with an approximate rank (fetched via a HEAD + `Prefer: count=exact` query to Supabase). Rank shows `—` if the secondary fetch fails (offline, CORS, etc.) — graceful degradation.
- Service worker bumped to v36.

### Added — Phase 3 Stage 2: Welcome flow + operator callsign on home
- **Welcome Screen** — first-visit registration. Shown only when `localStorage` has no callsign. Asks for a 1–16 char callsign (auto-uppercased Bebas Neue input) and lands the player on the home screen on confirm. Once a callsign is saved this screen is never shown again unless localStorage is cleared.
- **OPERATOR chip on Home Screen** — a small tappable pill under the subtitle shows `OPERATOR <CALLSIGN> ✎`. Tap to open the existing `CallsignModal` and change it. Changing the callsign only affects *future* score submissions — old leaderboard entries keep the previous name.
- **App router restructured** — moved the screen-pick into a single `body` variable, then renders `body` with the `CallsignModal` overlaid at top level. The modal now works on home, end, or any future screen that exposes an edit action.
- Service worker bumped to v35.

### Changed — Phase 3 scoring overhaul (Stage 1: foundation)
- **Points-based scoring** replaces the old 0–10 raw-count system. Each correct answer is now worth **100 points** (max 1000 in normal mode). Constants live at the top of `app.jsx` (`POINTS_PER_CORRECT`, `HINT_PENALTY`, `QUESTION_TIME_MS`, `SPEED_BONUS_MAX`) ready for hints + timed mode to drop in.
- **Supabase schema migrated** — dropped and recreated the `leaderboard` table with new columns: `mode` (`'normal'` | `'timed'`), `hints_used` (0–2). Score check constraint expanded to `0–1500` to cover timed-mode max. `total` default is now 1000.
- **Score thresholds rescaled** — ELITE / FIELD READY / OBJECTIVE COMPLETE / TRAINING REQUIRED / BACK TO BASICS now trigger at 900 / 700 / 500 / 300 / below 300 (was 9 / 7 / 5 / 3).
- **Best scores migration** — `localStorage` `matken-best-scores` now nests by mode: `{ cat: { diff: { normal: pts, timed: pts } } }`. Old values (0–10 flat or nested) are auto-migrated × 100 on next load. Pre-existing bests are treated as normal-mode.
- **Score displays rescaled** — End Screen score font reduced from 5.5rem → 4rem to fit "1000/1000". Performance Log columns widened to 72px and font reduced to 1.05rem for 4-digit scores. Leaderboard table drops the denominator from the SCORE cell (just shows raw points) and widens the column to 58px.
- Service worker bumped to v34.

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
