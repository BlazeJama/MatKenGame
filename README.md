# MatKenGame 🎖️

A Progressive Web App (PWA) quiz game that teaches players to recognize and identify military vehicles from around the world.

## 🎮 How to Play

- You are shown a photograph of a military vehicle
- Choose the correct answer from 4 options (vehicle name and country)
- Build your score across 10 questions per round
- Learn fun facts about each vehicle after every answer

## 🌐 Play the Game

👉 **[Play MatKenGame](https://matken.github.io/MatKenGame)**

> Also embeddable in Google Sites. Works on iOS, Android, and desktop browsers. Can be installed to your home screen.

## 📦 Features

- Multiple images per vehicle — different angles, conditions, and camouflage schemes
- Main Battle Tanks, APCs, IFVs, Artillery, Helicopters (growing library)
- Difficulty levels — Easy, Medium, Hard
- Silhouette mode, Detail Zoom mode, Nation Flag mode *(Phase 3)*
- Leaderboard and score sharing *(Phase 3)*
- Works offline after first visit

## 🗺️ Development Phases

| Phase | Status | Description |
|---|---|---|
| MVP | 🔄 In Progress | Core quiz game — Main Battle Tanks |
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
