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
- [ ] PWA icons created (192px, 512px)

---

## 🥇 MVP — Core Quiz Game

### UI Screens
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
- [ ] Visual-design polish pass (deferred — feedback collected, to be done later)

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
- [ ] manifest.json configured
- [ ] Service worker registered
- [ ] Offline caching working
- [ ] Installable to iOS home screen
- [ ] Installable to Android home screen
- [ ] Tested in Google Sites iframe embed

---

## 🥈 Phase 2 — Depth & Replayability

### New Content
- [ ] APCs added to vehicle database
- [ ] IFVs added to vehicle database
- [ ] Self-propelled artillery added
- [ ] Military helicopters added
- [ ] Database expanded to 50–75 vehicles

### Difficulty Levels
- [ ] Easy mode implemented
- [ ] Medium mode implemented
- [ ] Hard mode implemented (similar variants)
- [ ] Difficulty selector on home screen

### Filters
- [ ] Category filter (tanks, helicopters, etc.)
- [ ] Nation filter (Russian, NATO, etc.)
- [ ] Random mixed mode (default)

### Hint System
- [ ] Hint button added to quiz screen
- [ ] 2 hints per round logic implemented
- [ ] Hint eliminates one wrong answer

### Fun Facts
- [ ] Fun fact panel shown after each answer
- [ ] Fun facts written for all vehicles in database

### Progress Tracking
- [ ] Best score saved per category (localStorage)
- [ ] Stats screen created
- [ ] Stats accessible from home screen

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
- [ ] Image upload — drag-and-drop / click-to-browse _(deferred — admin uses URL paste; full GitHub-API upload is a future enhancement)_
- [ ] Add vehicle form (name, country, category, era, fun fact)
- [ ] Image upload — drag and drop or click to browse
- [ ] Per-image star difficulty selector (1, 2, 3 stars)
- [ ] Difficulty label under each image thumbnail (Easy / Medium / Hard)
- [ ] Multi-select checkboxes on image thumbnails
- [ ] "Delete X selected" button shown when images are checked
- [ ] Confirmation popup before image deletion
- [ ] Edit existing vehicle
- [ ] Delete vehicle with confirmation popup

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
- [ ] WW2 filter
- [ ] Cold War filter
- [ ] Modern filter

### Timed Mode
- [ ] Countdown timer per question
- [ ] Bonus points for fast answers
- [ ] Timer toggle on home screen

### Streak & Scoring
- [ ] Streak counter implemented
- [ ] Score multiplier for streaks
- [ ] Streak reset on wrong answer
- [ ] Streak displayed on quiz screen

### Leaderboard
- [ ] Backend service set up (Supabase or Firebase free tier)
- [ ] Score submission after round
- [ ] Leaderboard screen created
- [ ] Nickname entry for leaderboard

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

*Last updated: 2026-05-20*
