# MatKenGame — Learning Mode Design

*Created: 2026-05-24*

---

## Overview

This spec covers the addition of a Learning Mode to MatKenGame — a study section separate from the game where players can browse vehicles, view their identifying features, and learn the structured WHATS (ground vehicles) and WEFT (aircraft) observation frameworks. The admin page is extended to manage all learning content, and images gain a new purpose flag so close-up detail shots can be added without affecting the game.

The player-facing Learning section is **mobile-first**. The admin page remains **desktop-only**, consistent with the existing admin pattern.

---

## 1. Scope

### In Scope
- Player-facing Learning section with vehicle browsing and study pages
- Per-vehicle WHATS/WEFT data structure
- Image purpose flag (`GAME` / `LEARNING` / `BOTH`)
- Admin page extension for entering WHATS/WEFT data and managing image purpose
- Admin UI cleanup (Country/Category/Era on one row)

### Out of Scope (Future Sub-Projects)
- Interactive WHATS practice mode (player fills in a card and is graded)
- Expert mode using zoomed-in / star-rated learning images
- Player profile / learning progress tracking
- Special markings (S) field — situational and country-dependent, not core to learning the framework

---

## 2. Player-Facing Learning Section

### Entry Point
Accessible from the Home Screen, alongside the existing PERF LOG and LEADERBOARD buttons. Suggested label: `LEARNING` or `STUDY`.

### Browse Screen
Reuses the same filter UI as the game's Home Screen:
- **Category** — ALL / MBT / APC / IFV / ARTY / HELO
- **Era** — ALL / WW2 / COLD WAR / MODERN
- **Alliance** — ALL / NATO / WARSAW / OTHER
- **Nation** — dynamic dropdown
- **Difficulty** — does NOT apply here (difficulty is a game concept, not a study concept)

Below the filters: a scrollable list of vehicles matching the current filter combination. Each list item shows the vehicle name, country, category tag, and a small thumbnail (the first `LEARNING` or `BOTH` image).

Tapping a vehicle opens the **Study Page** for that vehicle.

### Study Page

Three tabs, mobile-optimized:

#### Tab 1 — OVERVIEW
- Identifying features (key visual markers, e.g. "distinctive turret wedge", "external fuel drums at rear")
- Fun facts (existing `funFacts` array from the vehicle database is finally surfaced here)

#### Tab 2 — WHATS or WEFT
Auto-selected based on the vehicle's category:
- Ground vehicles (MBT / APC / IFV / ARTY) → WHATS
- Aircraft (HELO and future jets) → WEFT

Each letter is a collapsible section. Collapsed state shows a one-line summary:
```
▸ W — Tracked, rear drive, 7 road wheels
▸ H — Driver center, exhaust right rear, 2 hatches
▸ A — 120mm cannon, coax MG right of cannon
▸ T — Center-mounted, smoke launchers left+right
```

Tapping a letter expands it to show the full breakdown with all sub-questions answered. Tapping again collapses it.

#### Tab 3 — IMAGES
Full-width swipe gallery. One image fills the screen, with a small caption below (e.g. `★ EASY`, `★★★ HARD`, `LEARNING — TURRET DETAIL`). A position indicator (e.g. `2 / 5` or dots) shows where the player is in the gallery. Swipe left/right to navigate.

Pulls only images flagged `LEARNING` or `BOTH`.

---

## 3. WHATS Schema (Ground Vehicles)

### W — Wheels / Tracks
- **Drive type:** Tracked / Wheeled
- **If Tracked:**
  - Drive wheel position: Front / Rear
  - Track tension: Tight / Slack
  - Number of road wheels (integer)
- **If Wheeled:**
  - Number of axles (integer)

### H — Hull
- Driver position: Left / Center / Right
- Exhaust location: Left / Right / Rear
- Number of crew hatches (integer)

### A — Armament
- Main weapon: Cannon / Autocannon / Machine gun / ATGM / Mortar / None
- Coaxial MG position: Left of main weapon / Right of main weapon / None

### T — Turret
- Turret position on hull: Forward / Center / Rear / No turret
- Smoke launchers present: Yes / No

### Dropped
- **S — Special markings** — flags, unit symbols, plates, antennas. Excluded because these vary by country and unit, not by vehicle type. Not core to learning the framework.

---

## 4. WEFT Schema (Aircraft — Helicopters and Future Jets)

### W — Wings / Rotors
- Configuration: Fixed wing / Single rotor / Tandem rotor / Coaxial rotor

### E — Engines
- Number of engines (integer)
- Position: Top-mounted / Wing-mounted / Fuselage-mounted

### F — Fuselage
- Shape notes (text field — distinguishing features)

### T — Tail
- Configuration: Tail rotor / No tail rotor / Conventional tail / V-tail / T-tail

WEFT is designed generic enough to support fixed-wing aircraft (jets, transports) when they are added to the database in the future.

---

## 5. Image Purpose Flag

Every image now has, in addition to its star rating:

| Flag | Used By |
|---|---|
| `GAME` | Recognition game only |
| `LEARNING` | Learning section only |
| `BOTH` | Both contexts |

- Game's vehicle pool pulls images flagged `GAME` or `BOTH`
- Learning section's IMAGES tab pulls images flagged `LEARNING` or `BOTH`
- Star ratings (1/2/3) are retained on all images regardless of flag, to support a future expert mode

---

## 6. Admin Page Extension

### UI Cleanup (Existing Fields)
- **Country**, **Category**, and **Era** are arranged on a single row in the edit panel to reduce vertical space

### New Collapsible Section: OBSERVATION DATA
Appended below the existing fields (Name / Country / Category / Era / Fun Facts / Images).
- Collapsed by default with a `▸ OBSERVATION DATA` header
- Expands on click to reveal the WHATS or WEFT form
- Form auto-switches between WHATS and WEFT based on the vehicle's Category — admin does not choose the framework manually
- All fields are dropdowns / text inputs / number inputs as appropriate (option B from the brainstorming session — structured form with smart defaults)

### Image Purpose Dropdown
Each image row in the admin gets a new dropdown next to the existing star rating:
- `GAME` / `LEARNING` / `BOTH`

Star rating remains visible and editable for all images regardless of purpose flag.

### Authentication
- Same password as the existing admin page
- Admin nav bar (designed in the Leaderboard spec) extends to include a tab for vehicle admin and leaderboard admin. Learning content lives within the vehicle admin tab, so no new top-level admin page is needed.

---

## 7. Data Storage

All WHATS/WEFT data is stored in the existing `data/vehicles.js` file alongside the rest of the vehicle data. Each vehicle object gains an `observationData` field:

```javascript
{
  name: "Leopard 2",
  country: "Germany",
  category: "MBT",
  era: "MODERN",
  funFacts: [...],
  images: [
    { url: "...", stars: 1, purpose: "BOTH" },
    { url: "...", stars: 3, purpose: "LEARNING" },
    ...
  ],
  observationData: {
    type: "WHATS",       // or "WEFT"
    w: { driveType: "Tracked", drivePosition: "Rear", trackTension: "Slack", roadWheels: 7 },
    h: { driverPosition: "Center", exhaustLocation: "Right", hatches: 2 },
    a: { mainWeapon: "Cannon", coaxialMG: "Right of main weapon" },
    t: { turretPosition: "Center", smokeLaunchers: true }
  }
}
```

This is exported by the admin tool in the same way as today, via `update-game.bat`.

---

## 8. Compatibility with the Leaderboard Spec

This design has been cross-checked against the Leaderboard & Scoring System Design spec to ensure they don't conflict:

- **No shared schema changes** — Learning Mode modifies only `data/vehicles.js`. Leaderboard changes only affect the Supabase `leaderboard` table.
- **Admin nav bar** designed in the Leaderboard spec accommodates both pages cleanly.
- **Player profile** — both specs flag this as a future sub-project that will unify callsign + learning progress. Both have been designed without depending on it, so it can be added later without rework.
- **Image system** — the new `purpose` flag does not affect how the existing game pulls images. Game logic only needs to filter for `GAME` or `BOTH` (one line change).

---

## 9. Future-Proofing Notes

- **Interactive WHATS practice** — a future mode where the player fills out a card and is graded against the stored `observationData`. The data structure already supports this.
- **Expert mode** in the game — would draw from `LEARNING`-flagged images at high star ratings, testing recognition from close-up details. Schema supports this with no migration.
- **Jets/fixed-wing aircraft** — WEFT schema is generic; adding jets requires no schema changes, only new entries in `vehicles.js`.
- **Learning progress tracking** — could be added as a separate `learningProgress` object in `localStorage` keyed by vehicle ID, without affecting current schema.

---

*End of spec.*
