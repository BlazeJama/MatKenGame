# MatKenGame 🎖️

A Progressive Web App (PWA) quiz game that teaches players to recognize and identify military vehicles from around the world.

## 🎮 How to Play

- You are shown a photograph of a military vehicle
- Choose the correct answer from 4 options (vehicle name and country)
- Build your score across 10 questions per round
- Learn fun facts about each vehicle after every answer

## 🌐 Play the Game

**[Play MatKenGame →](https://blazejama.github.io/MatKenGame)**

Works on iOS, Android, and desktop browsers. On mobile you can add it to your home screen and play offline.

## 📦 MVP Features

- 10-question rounds of Main Battle Tank recognition
- 4 multiple-choice answers per question (vehicle name + country)
- Instant green/red feedback on the answer buttons themselves
- Tactical HUD visual style — dark backdrop, amber accents, custom typography
- Final score with a tactical rating (`ELITE OPERATOR` → `BACK TO BASICS`) and Replay button
- Multiple images per vehicle, picked at random each round
- Mobile-first layout that respects iOS safe-area insets (status bar, Dynamic Island, home indicator)
- Installable as a PWA, works offline after first visit

## 🔮 Coming Later

- More vehicle categories (APCs, IFVs, Artillery, Helicopters) — *Phase 2*
- Easy / Medium / Hard difficulty modes — *Phase 2*
- Admin page for adding vehicles via the browser — *Phase 2*
- Silhouette, Detail Zoom and Nation Flag modes — *Phase 3*
- Leaderboard, streaks, score sharing, sound — *Phase 3*

## 🗺️ Development Phases

| Phase | Status | Description |
|---|---|---|
| MVP | ✅ Released (v1.0.0) | Core quiz game — Main Battle Tanks, PWA, tactical HUD |
| Phase 2 | ⬜ Planned | More categories, difficulty modes, hints, expanded admin upload flow |
| Phase 3 | ⬜ Planned | Special modes, leaderboard, streaks, sound |

## 🛠️ Tech Stack

- React (via CDN)
- Tailwind CSS (via CDN)
- Vanilla JavaScript
- PWA — manifest.json + Service Worker
- Hosted on GitHub Pages

## 📁 Project Structure

```
MatKenGame/
├── index.html            ← Entry point
├── app.jsx               ← Main React app
├── admin/                ← Admin page (data editor, desktop-only)
│   ├── index.html
│   └── admin.jsx
├── data/
│   └── vehicles.js       ← All vehicle data
├── assets/
│   └── icons/            ← PWA icons
├── manifest.json         ← PWA manifest
├── service-worker.js     ← Offline support
├── CHANGELOG.md          ← Version history
├── TODO.md               ← Feature checklist
└── README.md             ← This file
```

## 🖼️ Image Credits

Vehicle images sourced from [Wikimedia Commons](https://commons.wikimedia.org) under free-use licenses.

## 📝 License

MIT License — free to use and modify.
