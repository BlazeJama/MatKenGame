# MatKenGame — Brainstorm & Feature Backlog

*Written 2026-05-25. Use this as a starting point for planning sessions.*

---

## How the game works right now

### Core loop
1. Player lands on the **Home Screen** and configures a session using four stacked filters.
2. They tap **BEGIN TRAINING** to start a 10-question round.
3. Each question shows a **vehicle photo** and four named answer buttons (A–D).
4. Selecting an answer locks in feedback immediately: the correct button goes green, a wrong pick goes red, the other two dim. A ✓ or ✗ icon marks the result.
5. The **NEXT TARGET** button (always visible, disabled until answered) advances to the next question.
6. After question 10 the player taps **DEBRIEF →** and lands on the **End Screen**.
7. From the End Screen they can: submit their score to the leaderboard, redeploy (same settings), or return home to change filters.

### Filters (Home Screen)
All four filters stack on top of each other — any combination is valid.

| Filter | Options | Effect |
|---|---|---|
| **CATEGORY** | ALL / MBT / APC / IFV / ARTY / HELO | Limits pool to one vehicle type |
| **ERA** | ALL / WW2 / COLD WAR / MODERN | Limits pool to one time period |
| **ALLIANCE** | ALL / NATO / WARSAW / OTHER | Limits pool to a military bloc |
| **NATION** | ALL NATIONS + dynamic list | Limits pool to one country |
| **DIFFICULTY** | EASY ★ / MEDIUM ★★ / HARD ★★★ | Selects which star-rated images are used |

Each pill/option dims when there are zero playable vehicles at that setting given the current other filters. The Nation dropdown auto-rebuilds whenever category, era or alliance changes.

### Difficulty system
Every image in the database has a star rating (1 / 2 / 3). The rating is meant to reflect how hard the photo makes identification:
- **Easy ★** — clear side-on or profile shots, full vehicle visible
- **Medium ★★** — partial obscuring, angle, camo, or distance
- **Hard ★★★** — close-up details, heavy camouflage, unusual angles

When a difficulty is selected, only vehicles with at least one image at that star level are in the playable pool. Vehicles without a matching image are excluded from questions but can still appear as wrong-answer names.

### Vehicle database
50 vehicles across five categories, 10 per category:
- **MBT** — Abrams, Leopard 2, T-72, Challenger 2, T-14, M60, T-34, Sherman, Tiger I, Merkava
- **APC** — M113, BTR-80, Stryker, FV432, Patria AMV, Boxer, BTR-60, VAB, Piranha III, Eitan
- **IFV** — M2 Bradley, BMP-2, BMP-3, Warrior, CV90, Marder, BMP-1, Puma, K21, ZBD-04A
- **Artillery** — M109, PzH 2000, 2S19, CAESAR, K9, AS-90, M270, 2S7, M777, PLZ-05
- **Helicopter** — AH-64, Mi-24, UH-60, CH-47, Ka-52, Tiger HAD, UH-1, Mi-8, NH90, AW101

Each vehicle has: name, country, category, era, 3 images at star ratings 1/2/3 (Wikimedia Commons URLs), and 3 fun facts. Fun facts are stored but not currently shown in-game.

### Scoring & personal bests
- Score is out of 10 (one point per correct answer, no partial credit).
- Best scores are saved to `localStorage` per **category × difficulty** combination (6 categories × 3 difficulties = up to 18 separate bests).
- The **Performance Log** (PERF LOG button on home screen) shows the full grid with the all-time best highlighted.

### Leaderboard
- Powered by **Supabase** (PostgreSQL, Row Level Security enabled).
- At the End Screen the player enters a **callsign** (1–16 chars, auto-uppercased, saved to `localStorage` as `matken-callsign`) and taps **SUBMIT SCORE**.
- Submission POSTs: callsign, score, total (10), category, difficulty, and timestamp to the `leaderboard` table.
- The **LeaderboardScreen** fetches the top 20 entries ordered by score descending then oldest-first (ties go to first submitter). Filters: category + difficulty (both can be ALL).
- The service worker deliberately bypasses its cache for all `supabase.co` requests so data is always live.

### Admin page (`/admin/`)
Password-gated, desktop-only. Full vehicle CRUD: add, edit, delete vehicles and individual images. Exports a new `data/vehicles.js` file (with alliance config baked in as `window.pactConfig`) that you copy into the repo and deploy via `update-game.bat`.

---

## What is NOT yet implemented

### High priority / most impact

#### Fun facts in-game
Fun fact text is written for every vehicle and stored in `funFacts: [...]` arrays. The display was deliberately removed during the v1.0.0 polish pass because the layout felt cluttered. The data and the random-pick logic (`buildRound`) are both still in place — re-enabling just requires adding the render block back to the QuizScreen after-answer state.
- **Decision to make:** where to show it — below the answer buttons before NEXT, or as a brief overlay on the image.

#### Hint system
Two hints per round. Each hint eliminates one wrong answer button (dims it, removes it from selection). The button to use a hint appears on the quiz screen. Remaining hints shown as a counter (e.g. `HINTS: 2`).
- **Decision to make:** should hints cost something (score penalty, no submission to leaderboard)?

#### Streak & multiplier scoring
Track consecutive correct answers. A streak counter displays on the quiz header. After a streak of e.g. 3+ a multiplier kicks in (×1.5, ×2) and the score could exceed 10. This changes the leaderboard schema since `score > 10` is now valid.
- **Impact:** the current Supabase check constraint is `score between 0 and 10` — would need updating.
- **Decision to make:** do we want variable max scores on the leaderboard, or keep streaks as a local-only visual reward with no effect on submitted score?

#### Timed mode
A countdown timer per question (e.g. 15 seconds). Running out counts as a wrong answer. Bonus points for fast correct answers. A timer toggle on the home screen.
- **Decision to make:** timer is separate from streak, or does speed feed into a speed multiplier?

#### Sound effects
Short audio cues for correct answer, wrong answer, round complete. A mute toggle. Could use the Web Audio API (no external files needed for simple beeps) or small bundled MP3s.

---

### Medium priority

#### Leaderboard improvements
- **Highlight own entry** — when viewing the leaderboard, the player's own callsign row gets a distinct amber highlight so they can quickly find where they placed.
- **Prevent spam submission** — right now nothing stops a player from submitting the same score multiple times. Options: disable the submit button immediately after first success (already done per session), or a server-side rate-limit / unique constraint on (callsign, category, difficulty, created_at day).
- **Personal best marker** — if the submitted score beats the player's previous best for that category × difficulty, show a "NEW PERSONAL BEST" callout on the End Screen.
- **Pagination / load more** — currently hard-capped at 20 entries. A "LOAD MORE" button for larger boards.

#### Share score
Use the native Web Share API (`navigator.share`) on iOS/Android to share a text snippet like:
> "I scored 9/10 on MatKenGame — ELITE OPERATOR [link]"
Falls back to copying to clipboard on desktop.

#### More vehicles
Target of 100+ vehicles total. Priority order for new additions:
1. Fill gaps in existing categories to 15–20 each
2. Consider new categories (MLRS as a sub-category of Artillery, Naval vehicles, Fighter jets)
3. Enforce minimum 5 images per difficulty level per vehicle before it enters the live pool

---

### Lower priority / Phase 3 game modes

These are all separate quiz variants — they would need a game-mode selector on the home screen.

| Mode | Description |
|---|---|
| **Silhouette mode** | Vehicle image replaced with a black outline/silhouette only |
| **Detail zoom mode** | Shows a tight crop of one detail (tracks, turret hatch, gun breech) |
| **Flag mode** | Given a vehicle, pick the correct country flag (or vice versa) |
| **"What's Wrong?" mode** | Vehicle shown with a wrong label — player spots the mismatch |
| **Spotlight mode** | Study phase first (see vehicle name + facts), then quiz on it |
| **Side-by-side** | After the round, show a comparison of your wrong picks vs the correct answer |

---

### Admin & infrastructure

- **Image upload via GitHub API** — currently images are Wikimedia Commons URLs pasted manually. The original Phase 2 plan was to upload images directly from the admin page into `assets/images/` via the GitHub Contents API. Deferred because it requires a GitHub personal access token stored in the browser session.
- **Enforce image minimums** — the home screen already shows "N DRAFTS SKIPPED — NO IMAGES" but there is no warning when a vehicle has images at only one or two star levels. The admin could add a yellow warning when a vehicle is missing images at any difficulty.
- **Android PWA install test** — has never been verified (no Android device available). The manifest is configured correctly; just needs a test run.

---

## Open design questions

1. **Fun facts — where do they appear?** Overlay on image after answer, text panel below buttons, or a slide-in card before NEXT?
2. **Hints — cost or free?** A penalty (score cap, or no leaderboard eligibility) makes hints a real trade-off. Free hints just make the game easier.
3. **Streaks — affect leaderboard score or local only?** Changing the max score breaks the current leaderboard sort and Supabase constraint.
4. **New categories** — does adding jets or naval vessels fit the "MatKen" brand, or should it stay ground/rotary focused?
5. **Leaderboard per-device bests vs global** — should the leaderboard also show a "my best" row pinned at top even if the player is outside the top 20?

---

*Last updated: 2026-05-25*
