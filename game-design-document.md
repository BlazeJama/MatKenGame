# Military Vehicle Recognition Game
## Game Design Document — Feature Plan
*Version 1.0 | March 2026*

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
- Game runs for **10 questions per round**
- **End screen** shows final score (e.g. 7/10) with a Play Again button

### Vehicle Content
- **One category:** Main Battle Tanks (MBTs) only
- **15–20 vehicles** in the database to start
- **Multiple images per vehicle** — each vehicle has several photos (different angles, conditions, camouflage schemes). A random image is shown each round to prevent memorization and build real recognition skill.

### Vehicle Data Structure
Each vehicle stores:
- Name and country of origin
- Category and era
- Multiple images (front, side, action, camo variants)
- A fun fact
- Difficulty rating

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

### What MVP Proves
The image + quiz format is fun and educational, runs on all platforms, and is easy to expand.

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

### Difficulty Levels
- **Easy** — options are clearly different vehicles from different nations
- **Medium** — mix of similar and different vehicles
- **Hard** — variants of the same vehicle family (e.g. T-72 vs T-72B3 vs T-90)

### Filters & Game Modes
- **Category filter** — play a round of only tanks, only helicopters, etc.
- **Nation filter** — play only Russian, NATO, Cold War, or specific country vehicles
- **Random mode** — mixed bag across all categories (default)

### Hint System
- Each round starts with **2 hints**
- Using a hint **eliminates one wrong answer** from the options
- Encourages learning without frustrating new players

### Fun Facts Panel
- After each answer (correct or wrong), a short fact about the vehicle is displayed
- e.g. "The Challenger 2 has never had a crew member killed in combat"
- Turns the quiz into a learning experience, not just a test

### Progress Tracking
- Game remembers your **best score per category** between sessions
- Simple stats screen: total games played, best score, favourite category

### Admin Page (Hidden URL)
- Accessible at a private URL (e.g. `/admin`)
- Add a new vehicle by filling out a form — no code editing required
- Upload multiple images per vehicle directly from the admin page
- Edit or remove existing vehicles
- Makes expanding the game fast and easy for the creator

---

## 🥉 Phase 3 — Polish & Engagement
*Goal: A fully-featured, polished game that feels complete.*

---

### New Game Modes
- **Silhouette Mode** — only the vehicle outline is shown, no surface detail. Tests real shape recognition.
- **Detail Zoom Mode** — a close-up crop of part of the vehicle (track, turret, gun barrel). Identify it from the detail alone.
- **Nation Flag Mode** — given a vehicle name, pick which country's flag it belongs to. Flips the quiz around.
- **"What's Wrong?" Mode** — shown a vehicle with an incorrect label, player must spot the mistake.
- **Vehicle Spotlight Mode** — learn about a vehicle first (stats, history, images), then get quizzed on it.
- **Side-by-Side Comparison** — after a round, compare two similar vehicles visually to see the differences.

### Era Filter
- **WW2** — early armoured warfare
- **Cold War** — the arms race era
- **Modern** — post-1990 vehicles

### Timed Mode
- Optional countdown timer per question
- Answer faster = more points
- Adds pressure and excitement for experienced players

### Streak & Bonus System
- Correct answers in a row build a **streak**
- Streaks multiply your score
- Losing a streak resets the multiplier — adds tension

### Leaderboard
- Compare scores with other players
- Uses a free lightweight backend service (e.g. Supabase or Firebase free tier)
- Optional — players can submit a name/nickname

### Sound Effects
- Subtle audio feedback for correct/wrong answers
- Toggle on/off in settings
- No music unless added later

### Share Your Score
- One-tap button to share your score as an image or text
- Works on iOS and Android share sheets

### Expanded Database
- **100+ vehicles** across all categories and eras
- Multiple images per vehicle (all phases)

---

## 📋 Feature Summary Table

| Feature | MVP | Phase 2 | Phase 3 |
|---|---|---|---|
| Vehicle image quiz | ✅ | ✅ | ✅ |
| 4 multiple choice answers | ✅ | ✅ | ✅ |
| Instant feedback | ✅ | ✅ | ✅ |
| Multiple images per vehicle | ✅ | ✅ | ✅ |
| Score tracking (per round) | ✅ | ✅ | ✅ |
| Main Battle Tanks only | ✅ | — | — |
| 15–20 vehicles | ✅ | — | — |
| Play Again button | ✅ | ✅ | ✅ |
| PWA (installable, offline) | ✅ | ✅ | ✅ |
| Google Sites embed | ✅ | ✅ | ✅ |
| More vehicle categories | — | ✅ | ✅ |
| 50–75 vehicles | — | ✅ | — |
| Difficulty levels | — | ✅ | ✅ |
| Nation / category filters | — | ✅ | ✅ |
| Hint system | — | ✅ | ✅ |
| Fun facts panel | — | ✅ | ✅ |
| Progress tracking | — | ✅ | ✅ |
| Admin page | — | ✅ | ✅ |
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

All vehicle data lives in a **single structured data file**. Adding a new vehicle never requires touching game code — just add a new entry to the file (or use the Phase 2 admin page). Each vehicle entry includes:

- ID, name, country, category, era
- Array of multiple image URLs
- Fun fact
- Difficulty rating

---

*This document should be updated as features are confirmed, changed, or moved between phases.*
