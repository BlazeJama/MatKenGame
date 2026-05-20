# Military Vehicle Recognition Game
## Game Design Document — Feature Plan
*Version 1.2 | May 2026*

---

## Game Concept

A Progressive Web App (PWA) quiz game that teaches players to recognize and identify military vehicles from around the world. Players are shown a photograph of a vehicle and must select the correct answer from a set of options. The game builds real recognition skills across multiple vehicle types, nations, and eras.

**Platform:** PWA — works on iOS, Android, and desktop browsers. Installable to home screen. Embeds in Google Sites.
**Hosting:** GitHub Pages (free, HTTPS)

---

## Core Game Loop (All Phases)

> See image → Read options → Pick answer → Get feedback → Next vehicle → Final score

---

## 🥇 MVP — Minimum Viable Product
*Goal: A fully playable proof of concept. Simple, fast, fun.*

---

### Game Flow
- Player lands on a home screen and presses **Play**
- Shown a vehicle image with **4 multiple choice answers**
- Answers are in the format: **Vehicle Name — Country** (e.g. "T-72 — Russia")
- **Instant feedback** after each answer — correct answer highlights green, wrong highlights red
- Fun fact shown after every answer (correct or wrong)
- Game runs for **10 questions per round**
- **End screen** shows final score (e.g. 7/10) with a Play Again button

### Vehicle Content
- **One category:** Main Battle Tanks (MBTs) only
- **15–20 vehicles** in the database to start
- **Multiple images per vehicle** — each image has its own difficulty star rating (see below)
- A random image matching the selected difficulty is shown each round

### Image Difficulty System
Each image has an individual star rating — not the vehicle as a whole:
- ⭐ **1 star — Easy** — clear side profile, good lighting, clean background, distinctive angle
- ⭐⭐ **2 stars — Medium** — three-quarter angle, some camouflage, field conditions
- ⭐⭐⭐ **3 stars — Hard** — front-on, heavy camo, poor lighting, partially obscured

**MVP rule:**
- The game picks any image at random from a vehicle's `images` array. The `stars` field is recorded per image but not used by game logic yet.
- This keeps MVP small. Phase 2 enables difficulty filtering using these same stars, without changing the data shape.

### Vehicle Data Structure
Each vehicle stores:
- Name and country of origin
- Category and era
- Array of images — each image has a URL and a star rating (1, 2, or 3)
- A fun fact

```javascript
{
  id: "challenger2",
  name: "Challenger 2",
  country: "United Kingdom",
  category: "Main Battle Tank",
  era: "Modern",
  images: [
    { url: "https://...side.jpg", stars: 1 },
    { url: "https://...camo.jpg", stars: 2 },
    { url: "https://...front.jpg", stars: 3 }
  ],
  funFact: "The Challenger 2 has never had a crew member killed in combat."
}
```

### Scoring
- 1 point per correct answer
- Final score shown as X out of 10
- No time pressure in MVP

### Technical
- Single data file holds all vehicle information — adding a new vehicle never requires touching game code
- Works on iOS, Android, and desktop browsers
- Installable to home screen (PWA)
- Embeds in Google Sites via iframe
- Works offline after first visit

### Vehicle Authoring (MVP)
- Vehicles are added by hand-editing `data/vehicles.js`
- Image URLs in MVP are direct HTTPS links to Wikimedia Commons
- No admin page in MVP — the admin page is a Phase 2 feature (see below)

### What MVP Proves
The image + quiz format is fun and educational, runs on all platforms, and the data shape is forward-compatible with Phase 2 features.

---

## 🥈 Phase 2 — Depth & Replayability
*Goal: Give players more to explore and a reason to come back.*

---

### New Vehicle Categories
- Armoured Personnel Carriers (APCs)
- Infantry Fighting Vehicles (IFVs)
- Self-Propelled Artillery
- Military Helicopters
- **Expanded database: 50–75 vehicles**

### Difficulty Levels (Player-Facing)
- **Easy** — only ⭐ images shown, wrong answers are clearly different vehicles
- **Medium** — only ⭐⭐ images shown, wrong answers from same category mixed nations
- **Hard** — only ⭐⭐⭐ images shown, wrong answers are similar variants of the same family

### Filters & Game Modes
- **Category filter** — play a round of only tanks, only helicopters, etc.
- **Nation filter** — play only Russian, NATO, Cold War, or specific country vehicles
- **Random mode** — mixed bag across all categories (default)

### Hint System
- Each round starts with **2 hints**
- Using a hint **eliminates one wrong answer** from the options
- Encourages learning without frustrating new players

### Progress Tracking
- Game remembers your **best score per category** between sessions
- Simple stats screen: total games played, best score, favourite category

### Admin Page
The admin page lets the project owner add and edit vehicles efficiently from the browser.

**Access:**
- Desktop browser only — not designed for mobile or tablet
- URL: `/admin`
- Protected by a simple password prompt shown on every new session
- Password is entered once per browser session

**Layout:**
- Two-column desktop layout — vehicle list on the left, add/edit form on the right

**Vehicle List:**
- Shows vehicle name, country, image count, category badge, era badge
- 3-row difficulty status indicator (E / M / H) per vehicle using star icons: bright gold ★ = ready (5+ images), dim grey ★ = partial, very dim ★ = none
- Edit and delete buttons per vehicle, plus search bar and category filter

**Add / Edit Vehicle Form:**
- Fields: vehicle name, country, category (dropdown), era (dropdown), fun fact (textarea)
- Drag-and-drop or click-to-browse image upload, with a 1–3 star difficulty selector per image
- Minimum 2 images required to save a vehicle

**Image & Vehicle Deletion:**
- Multi-select checkboxes on image thumbnails; "Delete X selected" button confirms before removing
- Per-vehicle delete button with confirmation popup; deletion is permanent

### Image Storage & Auto-Naming (Phase 2)
- Images stored directly in the GitHub repo under `assets/images/`
- Admin page auto-renames images on upload: `vehicleid-001.jpg`, `vehicleid-002.jpg`, etc.
- Admin page writes files to the repo via the GitHub API
- Image URLs in `data/vehicles.js` become relative paths (`assets/images/...`)
- Phase 2 also enforces the **5-images-per-difficulty-level** rule so the player-facing difficulty modes have enough variety

---

## 🥉 Phase 3 — Polish & Engagement
*Goal: A fully-featured, polished game that feels complete.*

---

### New Game Modes
- **Silhouette Mode** — only the vehicle outline is shown, no surface detail
- **Detail Zoom Mode** — a close-up crop of part of the vehicle (track, turret, gun barrel)
- **Nation Flag Mode** — given a vehicle name, pick which country's flag it belongs to
- **"What's Wrong?" Mode** — shown a vehicle with an incorrect label, player spots the mistake
- **Vehicle Spotlight Mode** — learn about a vehicle first, then get quizzed on it
- **Side-by-Side Comparison** — after a round, compare two similar vehicles visually

### Era Filter
- **WW2** — early armoured warfare
- **Cold War** — the arms race era
- **Modern** — post-1990 vehicles

### Timed Mode
- Optional countdown timer per question
- Answer faster = more points

### Streak & Bonus System
- Correct answers in a row build a streak
- Streaks multiply your score
- Losing a streak resets the multiplier

### Leaderboard
- Compare scores with other players
- Free lightweight backend (Supabase or Firebase free tier)
- Optional nickname entry

### Social & Sound
- Share score button (iOS/Android share sheet)
- Subtle sound effects for correct/wrong answers — toggle on/off
- 100+ vehicles in the database

---

## 📋 Feature Summary Table

| Feature | MVP | Phase 2 | Phase 3 |
|---|---|---|---|
| Vehicle image quiz | ✅ | ✅ | ✅ |
| 4 multiple choice answers | ✅ | ✅ | ✅ |
| Instant feedback | ✅ | ✅ | ✅ |
| Fun facts after every answer | ✅ | ✅ | ✅ |
| Multiple images per vehicle | ✅ | ✅ | ✅ |
| Per-image star difficulty rating (data only in MVP) | ✅ | ✅ | ✅ |
| Min 5 images per difficulty level (enforced) | — | ✅ | ✅ |
| Score tracking (per round) | ✅ | ✅ | ✅ |
| Main Battle Tanks only | ✅ | — | — |
| 15–20 vehicles | ✅ | — | — |
| Play Again button | ✅ | ✅ | ✅ |
| PWA (installable, offline) | ✅ | ✅ | ✅ |
| Google Sites embed | ✅ | ✅ | ✅ |
| Admin page (password protected) | — | ✅ | ✅ |
| Admin — add/edit/delete vehicles | — | ✅ | ✅ |
| Admin — image upload with star rating | — | ✅ | ✅ |
| Admin — multi-select image delete | — | ✅ | ✅ |
| Admin — difficulty status per vehicle | — | ✅ | ✅ |
| More vehicle categories | — | ✅ | ✅ |
| 50–75 vehicles | — | ✅ | — |
| Difficulty levels (player-facing) | — | ✅ | ✅ |
| Nation / category filters | — | ✅ | ✅ |
| Hint system | — | ✅ | ✅ |
| Progress tracking | — | ✅ | ✅ |
| Silhouette mode | — | — | ✅ |
| Detail zoom mode | — | — | ✅ |
| Nation flag mode | — | — | ✅ |
| Era filter (WW2/Cold War/Modern) | — | — | ✅ |
| Timed mode | — | — | ✅ |
| Streak & bonus system | — | — | ✅ |
| Leaderboard | — | — | ✅ |
| Share your score | — | — | ✅ |
| Sound effects | — | — | ✅ |
| 100+ vehicles | — | — | ✅ |

---

## 🗂️ Data Architecture Note

All vehicle data lives in a **single structured data file** (`data/vehicles.js`). Adding a new vehicle never requires touching game code. Each image in the array has its own star difficulty rating. The admin page writes directly to this file.

---

## 🎨 Visual Design

**Style:** Clean and modern
**Primary colour:** Navy #1a2744
**Correct answer:** Green (bg-green-50 / border-green-500)
**Wrong answer:** Red (bg-red-50 / border-red-500)
**Font:** System default

### Screen Flow
Home → Quiz → End → (Play Again → Quiz)

---

*Version 1.2 — Updated May 2026*
*Admin page reverted to Phase 2 to keep MVP focused on a playable quiz. MVP image selection simplified to random-pick. Per-image `stars` field retained in the data schema so Phase 2 can add difficulty filtering without a data migration.*
