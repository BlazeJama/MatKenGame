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
