# MatKenGame — Leaderboard & Scoring System Design

*Created: 2026-05-24*

---

## Overview

This spec covers the redesign of the leaderboard system, introduction of a formal scoring model, player identity (callsign) flow, and a new admin leaderboard page. The design is intentionally future-proofed to accommodate timed mode and hints without requiring schema migrations later.

---

## 1. Scoring System

### Base Game (Normal Mode)
- 100 points per correct answer
- 10 questions per round
- **Max score: 1000**

### Hints (Normal Mode Only)
- 2 hints available per round
- Each hint eliminates one wrong answer button
- Each hint deducts **150 points** from the final score (applied at end of round, not per question)
- Max score with 1 hint used: **850**
- Max score with 2 hints used: **700**
- Hints and Timed Mode **cannot be combined**

### Timed Mode
- 15-second countdown per question
- Correct answer within time = 100 points + speed bonus (up to 50 bonus points for answering in under 5 seconds)
- Timeout = 0 points for that question
- **Max possible score: 1500**
- Timed Mode scores are displayed on a **separate leaderboard** — they do not compete with normal mode scores

---

## 2. Database Schema

### Changes to Supabase `leaderboard` Table

The following columns are added or modified:

| Column | Type | Notes |
|---|---|---|
| `score` | INTEGER | 0–1000 for normal mode, 0–1500 for timed mode |
| `total` | INTEGER | Always 1000 (replaces the legacy "out of 10" total) |
| `mode` | TEXT | `'normal'` or `'timed'` |
| `hints_used` | INTEGER | 0, 1, or 2. Always 0 for timed mode entries |

### Unchanged Columns
`callsign`, `category`, `difficulty`, `created_at` — no changes.

### Constraint Update
The existing Supabase check constraint `score BETWEEN 0 AND 10` must be updated to `score BETWEEN 0 AND 1500`.

---

## 3. Player Identity — Callsign System

### First Visit
- A **Welcome Screen** is shown before the Home Screen on first visit
- Player is prompted to enter a callsign (1–16 characters, auto-uppercased)
- Callsign is saved to `localStorage` as `matken-callsign`
- Welcome Screen is never shown again once a callsign is set

### Returning Visits
- Welcome Screen is skipped entirely
- Saved callsign is used automatically for all score submissions

### Changing Callsign
- The Home Screen displays `OPERATOR: [CALLSIGN]`
- Tapping this opens an edit prompt
- Changing the callsign only affects **future submissions** — past leaderboard entries retain the old name

---

## 4. Leaderboard Screen

### Filters
Three filter rows:
1. **Category** — ALL / MBT / APC / IFV / ARTY / HELO (existing)
2. **Difficulty** — ALL / EASY / MEDIUM / HARD (existing)
3. **Mode** — NORMAL / TIMED *(new)*

### Display
- Top **10** entries shown (reduced from current 20)
- Ranked by score descending
- Ties broken by oldest submission first (first submitter wins)

### Personal Highlight
- The player's own callsign row is highlighted in **amber**
- If the player does not appear in the top 10, their personal best entry is **pinned below the list** with a divider:
  > `— YOUR BEST — #47  ULLABULLA  800`
- Matching is done by callsign stored in `localStorage`

### Refresh
- Existing REFRESH button stays as-is
- Supabase requests bypass the service worker cache for live data

---

## 5. Admin Pages

### Shared Behaviour
- Both admin pages use the **same password** as the existing `/admin/` page
- Both pages display a **navigation bar at the top** with two buttons: `VEHICLES` and `LEADERBOARD`
- The active page button is highlighted; the other is tappable to switch
- No re-authentication is required when switching between pages
- Both pages remain desktop-only

### Existing `/admin/` — Vehicle Management
- No changes to functionality
- Navigation bar added at top

### New `/admin/leaderboard/` — Leaderboard Management
Features:
- View the **full leaderboard** (beyond the top 10 shown to players)
- All columns visible: callsign, score, total, category, difficulty, mode, hints_used, created_at
- **Filter** by: callsign (text search), category, difficulty, mode
- **Delete individual entries** — requires a confirmation prompt before deletion
- No bulk delete in this version (safety measure)

---

## 6. Future-Proofing Notes

- **Learning Mode** — identified as a separate sub-project. The callsign/profile system will extend naturally to track learning progress per player.
- **Streak multiplier** — if added later, it fits within the timed mode scoring structure. No schema changes needed; `score` column already accommodates values above 1000.
- **Score validation** — a `session_id` column can be added later if server-side validation becomes necessary. Not in scope for this version.
- **Pagination** — the admin leaderboard view should be built with pagination in mind even if not implemented immediately, as the table will grow over time.

---

## Out of Scope (This Version)

- Spam prevention beyond disabling the submit button post-submission
- Bulk delete on admin leaderboard page
- Learning Mode
- Streak/multiplier scoring
- "New Personal Best" callout on End Screen (can be added in a follow-up)

---

*End of spec.*
