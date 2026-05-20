# MatKenGame 🎖️

A Progressive Web App (PWA) quiz game that teaches players to recognize and identify military vehicles from around the world.

## 🎮 How to Play

- You are shown a photograph of a military vehicle
- Choose the correct answer from 4 options (vehicle name and country)
- Build your score across 10 questions per round
- Learn fun facts about each vehicle after every answer

## 🌐 Play the Game

> 🚧 **Coming soon** — the live link will go up at `https://blazejama.github.io/MatKenGame` once the MVP is deployed.

> Will be embeddable in Google Sites. Works on iOS, Android, and desktop browsers. Can be installed to your home screen.

## 📦 MVP Features

- 10-question rounds of Main Battle Tank recognition
- 4 multiple-choice answers per question (vehicle name + country)
- Instant green/red feedback after each answer
- Fun fact shown after every answer
- Final score and Play Again button
- Multiple images per vehicle, picked at random each round
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
| MVP | 🛠️ In Setup | Core quiz game — Main Battle Tanks |
| Phase 2 | ⬜ Planned | More categories, difficulty, hints, admin page |
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
