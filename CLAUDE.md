# CLAUDE.md — MatKenGame Project Briefing

This file tells Claude Code everything it needs to know about this project.
Read this at the start of every session before writing any code.

---

## Project Overview

**Name:** MatKenGame
**Type:** Progressive Web App (PWA)
**Purpose:** A quiz game that teaches players to recognize and identify military vehicles from around the world.

**How it works:**
- Player is shown a photograph of a military vehicle
- Player chooses the correct answer from 4 options (vehicle name + country)
- Instant feedback — green for correct, red for wrong
- Fun fact shown after each answer
- 10 questions per round, final score at the end

**Live URL:** https://blazejama.github.io/MatKenGame
**GitHub Repo:** https://github.com/BlazeJama/MatKenGame
**Hosting:** GitHub Pages — main branch, root folder

---

## Current Status

**Active Phase: MVP (Phase 1)**
See TODO.md for the full checklist of what is done and what remains.
See CHANGELOG.md for a history of all changes made.
See game-design-document.md for the full feature plan across all phases.

---

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| UI | React 18 | Loaded via CDN — no build step |
| Styling | Tailwind CSS | Loaded via CDN |
| Icons | No icon library in MVP | Keep it simple |
| Language | JavaScript (ES6+) | No TypeScript for now |
| Hosting | GitHub Pages | Main branch, root folder |
| PWA | manifest.json + service-worker.js | Required for installability |
| Images | Wikimedia Commons URLs | HTTPS, free to use |
| Backend | None | Everything runs in the browser |

**Important:** No build tools, no npm, no webpack, no bundler.
Everything runs directly in the browser via CDN links.
This keeps the setup simple and GitHub Pages compatible.

---

## Folder Structure

```
MatKenGame/
├── index.html              ← Entry point — loads React + Tailwind via CDN
├── app.jsx                 ← Main React app (all components in one file for MVP)
├── admin.html              ← Admin page — password protected, desktop only
├── data/
│   └── vehicles.js         ← ALL vehicle data lives here and only here
├── assets/
│   ├── images/             ← All vehicle images — auto-named by admin page
│   └── icons/              ← PWA icons (192px and 512px)
├── manifest.json           ← PWA manifest
├── service-worker.js       ← Offline caching
├── CLAUDE.md               ← This file
├── CHANGELOG.md            ← Version history
├── TODO.md                 ← Feature checklist
├── README.md               ← Project description
└── game-design-document.md ← Full feature plan
```

---

## Vehicle Data Structure

All vehicles live in `data/vehicles.js`. This is the ONLY place vehicle data exists.
Adding a new vehicle NEVER requires touching game code — only this file.

```javascript
export const vehicles = [
  {
    id: "challenger2",
    name: "Challenger 2",
    country: "United Kingdom",
    category: "Main Battle Tank",
    era: "Modern",
    images: [
      { url: "https://upload.wikimedia.org/wikipedia/.../challenger2-side.jpg", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/.../challenger2-camo.jpg", stars: 2 },
      { url: "https://upload.wikimedia.org/wikipedia/.../challenger2-front.jpg", stars: 3 }
    ],
    funFact: "The Challenger 2 has never had a crew member killed in combat."
  }
]
```

**Rules for vehicle data:**
- Every vehicle must have at least 2 images
- Each image has its own star rating: 1 = easy, 2 = medium, 3 = hard
- Images must be HTTPS Wikimedia Commons URLs
- category is one of: "Main Battle Tank", "APC", "IFV", "Artillery", "Helicopter"
- era is one of: "WW2", "Cold War", "Modern"

> **MVP note:** the game ignores the `stars` field and picks a random image. The field is recorded now so Phase 2 difficulty filtering can be added without a data migration. The "5 images per difficulty level" rule is a Phase 2 concern, not MVP.

---

## Coding Rules

### General
- Write clean, readable code with clear variable names
- Add a short comment above any function that isn't obvious
- Keep components small — if a component is getting long, split it
- No external libraries beyond what is listed in the tech stack
- Mobile first — always design for small screens first, then scale up

### React
- Use functional components only — no class components
- Use hooks (useState, useEffect) for state management
- For MVP, all components can live in app.jsx
- Keep game logic separate from UI rendering where possible

### Styling (Tailwind)
- Mobile-first responsive classes (sm:, md:, lg:)
- Touch targets must be minimum 44px height on mobile
- No hover-only interactions — must work on touchscreens
- Colour scheme: navy (#1a2744) as primary, white backgrounds, green for correct, red for wrong

### Images
- For MVP: image URLs in `data/vehicles.js` are direct HTTPS Wikimedia Commons URLs
- Phase 2 introduces the admin page, which will store images in `assets/images/` and auto-name them (`vehicleid-001.jpg`, etc.) via the GitHub API. Not part of MVP.

---

## Game Logic Rules

- A round is always 10 questions
- Each question shows 1 correct answer + 3 randomly chosen wrong answers
- Wrong answers must be from the same category as the correct vehicle (MVP: all MBTs)
- One image is randomly selected from the vehicle's images array each round
- The same vehicle should not appear twice in the same round
- Score increments only on correct answer
- Fun fact is shown after EVERY answer (correct or wrong)

---

## Design Reference

**Visual style:** Clean and modern
**Primary colour:** Navy #1a2744
**Correct answer:** Green (Tailwind: green-600 / bg-green-50 border-green-500)
**Wrong answer:** Red (Tailwind: red-600 / bg-red-50 border-red-500)
**Font:** System default (no custom fonts in MVP)
**Screens:** Home → Quiz → End → (Play Again → Quiz)

See the mockup description below for layout guidance.

### Home Screen
- Navy header with game title
- Stats cards (vehicle count, best score)
- Category selector (MVP: Main Battle Tanks only)
- Large Play button (navy, full width)
- Brief how-to-play description

### Quiz Screen
- Progress bar + question counter + score (in navy header)
- Vehicle photo (full width, fixed height ~200px)
- "Which vehicle is this?" label
- 4 answer buttons (A, B, C, D) with letter circle + vehicle name + country
- On answer: correct goes green with checkmark, wrong goes red with X
- Fun fact panel appears below buttons after answer
- Next button appears after answer is selected

### End Screen
- Final score (large, centred)
- Score message (e.g. "Great job!" for 7+, "Keep practising!" for under 5)
- Play Again button

---

## What NOT to Do

- Do not hardcode vehicle data anywhere except data/vehicles.js
- Do not use npm install or add any build steps
- Do not add features from Phase 2 or Phase 3 during MVP build
- Do not break the single-file CDN approach
- Do not use localStorage in MVP (Phase 2 feature)
- Do not add a backend or any server-side code
- Do not skip updating CHANGELOG.md and TODO.md after completing features

---

## After Every Work Session

1. Update **TODO.md** — check off anything completed
2. Update **CHANGELOG.md** — add an entry describing what changed
3. Commit with a clear message e.g. `Add quiz screen UI` or `Fix score reset bug`
4. Push to main branch so GitHub Pages updates

---

## Key Files to Read Before Coding

If starting a new session or picking up after a break, read these in order:
1. This file (CLAUDE.md) — you are here
2. TODO.md — see what's done and what's next
3. CHANGELOG.md — see what was last worked on
4. data/vehicles.js — understand the data before touching game logic

---

## Reference Documents (read on demand only)

These files exist in the repo but do NOT need to be loaded every session.
Only read them when specifically relevant to the task at hand.

| File | When to read it |
|---|---|
| game-design-document.md | Planning new features or moving to a new phase |
| project-summary.md | Questions about platform decisions or tech choices |
| README.md | Updating project description or live URL |

To load one, just say: "Read game-design-document.md before we start"

---

*Last updated: 2026-05-20*
*Project owner: BlazeJama*
