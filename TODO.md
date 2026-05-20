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
- [ ] Home screen with Play button
- [ ] Quiz screen — vehicle image display
- [ ] Quiz screen — 4 answer option buttons
- [ ] Feedback state — correct answer (green highlight)
- [ ] Feedback state — wrong answer (red highlight + show correct)
- [ ] Score tracker display (e.g. 3/10)
- [ ] End screen — final score display
- [ ] End screen — Play Again button
- [ ] Responsive layout (mobile + desktop)
- [ ] Touch-friendly button sizes (min 44x44px)

### Game Logic
- [ ] Load vehicle data from data file
- [ ] Randomly select 10 vehicles per round
- [ ] Randomly select 1 image per vehicle from its image array
- [ ] Generate 4 answer options (1 correct + 3 random wrong)
- [ ] Handle correct answer selection
- [ ] Handle wrong answer selection
- [ ] Advance to next question
- [ ] Calculate and display final score
- [ ] Reset game state on Play Again

### Vehicle Data (MVP)
- [ ] Data structure defined (id, name, country, category, era, images array of `{url, stars}`, funFact)
- [ ] 15–20 Main Battle Tanks added with at least 2 images each
- [ ] Each image has a star rating (1, 2, or 3) recorded — not used by MVP game logic, kept for Phase 2
- [ ] Wikimedia Commons image URLs sourced and added directly into `data/vehicles.js`
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
- [ ] Password screen at /admin
- [ ] Session-based password authentication
- [ ] Two-column desktop layout (list left, form right)
- [ ] Vehicle list with search and category filter
- [ ] Per-vehicle difficulty status stars (E / M / H rows)
- [ ] Bright gold = ready (5+ images), dim = partial, very dim = none
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
