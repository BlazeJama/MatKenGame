// MatKenGame — Vehicle Database
// =================================================================
// This is the ONLY place vehicle data lives. Adding a new vehicle
// never requires touching game code — just add an entry below.
//
// Schema (one entry per vehicle):
//   id        — unique lowercase string, no spaces (e.g. "challenger2")
//   name      — display name shown in answer buttons (e.g. "Challenger 2")
//   country   — country of origin (e.g. "United Kingdom")
//   category  — "Main Battle Tank" | "APC" | "IFV" | "Artillery" | "Helicopter"
//               (MVP uses Main Battle Tank only)
//   era       — "WW2" | "Cold War" | "Modern"
//   images    — array of { url, stars } objects. Zero or more.
//                 stars: 1 = easy, 2 = medium, 3 = hard
//                 MVP picks a random image and ignores stars. Phase 2 will
//                 filter by difficulty using these stars.
//                 Vehicles with zero images are excluded from the game
//                 until at least one is added.
//   funFacts  — array of zero or more sentences. After the player answers,
//               one is picked at random and shown. Empty array = no fact shown.
//
// Image storage:
//   - Each image.url is a local path under assets/images/
//   - Naming convention: {vehicleId}-{nnn}.{ext}  (e.g. m1abrams-001.jpg)
//   - Images are added via the Admin page (drag-and-drop), which generates
//     the correct filename and exports both the .js file and the image files.
//
// Loading model:
//   This file is loaded as a regular <script> in index.html *before* app.jsx,
//   and exposes the data as `window.vehicles`. When the project later adopts
//   a build step (Phase 2+), this can be swapped to `export const vehicles`.
//
// =================================================================

window.vehicles = [
  {
    id: "m1abrams",
    name: "M1 Abrams",
    country: "United States",
    category: "Main Battle Tank",
    era: "Modern",
    images: [
      { url: "assets/images/m1abrams-001.jpg", stars: 1 },
      { url: "assets/images/m1abrams-002.jpg", stars: 2 },
      { url: "assets/images/m1abrams-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The M1 Abrams is powered by a gas turbine engine — the same type used in helicopters — giving it a distinctive whine when moving."
    ]
  },
  {
    id: "leopard2",
    name: "Leopard 2",
    country: "Germany",
    category: "Main Battle Tank",
    era: "Modern",
    images: [
      { url: "assets/images/leopard2-001.jpg", stars: 1 },
      { url: "assets/images/leopard2-002.jpg", stars: 2 },
      { url: "assets/images/leopard2-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The Leopard 2's 120mm smoothbore gun became the de-facto standard for NATO main battle tanks."
    ]
  },
  {
    id: "challenger2",
    name: "Challenger 2",
    country: "United Kingdom",
    category: "Main Battle Tank",
    era: "Modern",
    images: [
      { url: "assets/images/challenger2-001.jpg", stars: 1 },
      { url: "assets/images/challenger2-002.jpg", stars: 2 },
      { url: "assets/images/challenger2-003.jpg", stars: 3 }
    ],
    funFacts: [
      "Until 2023, no Challenger 2 had ever been destroyed by enemy fire in combat."
    ]
  },
  {
    id: "leclerc",
    name: "Leclerc",
    country: "France",
    category: "Main Battle Tank",
    era: "Modern",
    images: [
      { url: "assets/images/leclerc-001.jpg", stars: 1 },
      { url: "assets/images/leclerc-002.jpg", stars: 2 },
      { url: "assets/images/leclerc-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The Leclerc was the first Western main battle tank to feature a fully automated loading system, allowing it to operate with a 3-man crew instead of 4."
    ]
  },
  {
    id: "t90",
    name: "T-90",
    country: "Russia",
    category: "Main Battle Tank",
    era: "Modern",
    images: [
      { url: "assets/images/t90-001.jpg", stars: 1 },
      { url: "assets/images/t90-002.jpg", stars: 2 },
      { url: "assets/images/t90-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The T-90 is equipped with the Shtora defensive system, which uses infrared dazzlers to confuse incoming guided anti-tank missiles."
    ]
  },
  {
    id: "t72",
    name: "T-72",
    country: "Soviet Union",
    category: "Main Battle Tank",
    era: "Cold War",
    images: [
      { url: "assets/images/t72-001.jpg", stars: 1 },
      { url: "assets/images/t72-002.jpg", stars: 2 },
      { url: "assets/images/t72-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The T-72 is one of the most widely produced tanks in history, with over 25,000 built across many countries and variants."
    ]
  },
  {
    id: "centurion",
    name: "Centurion",
    country: "United Kingdom",
    category: "Main Battle Tank",
    era: "Cold War",
    images: [
      { url: "assets/images/centurion-001.jpg", stars: 1 },
      { url: "assets/images/centurion-002.jpg", stars: 2 },
      { url: "assets/images/centurion-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The Centurion is considered one of the most successful tank designs ever made, serving for over 50 years in 17 countries."
    ]
  },
  {
    id: "tiger1",
    name: "Tiger I",
    country: "Germany",
    category: "Main Battle Tank",
    era: "WW2",
    images: [
      { url: "assets/images/tiger1-001.jpg", stars: 1 },
      { url: "assets/images/tiger1-002.jpg", stars: 2 },
      { url: "assets/images/tiger1-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The Tiger I's 88mm gun could destroy almost any Allied tank at ranges where Allied guns could not penetrate its armour."
    ]
  },
  {
    id: "t34",
    name: "T-34",
    country: "Soviet Union",
    category: "Main Battle Tank",
    era: "WW2",
    images: [
      { url: "assets/images/t34-001.jpg", stars: 1 },
      { url: "assets/images/t34-002.jpg", stars: 2 },
      { url: "assets/images/t34-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The T-34's sloped armour was revolutionary — it effectively doubled the protection against direct hits without adding weight."
    ]
  },
  {
    id: "shermanm4",
    name: "M4 Sherman",
    country: "United States",
    category: "Main Battle Tank",
    era: "WW2",
    images: [
      { url: "assets/images/shermanm4-001.jpg", stars: 1 },
      { url: "assets/images/shermanm4-002.jpg", stars: 2 },
      { url: "assets/images/shermanm4-003.jpg", stars: 3 }
    ],
    funFacts: [
      "Over 49,000 M4 Sherman tanks were built during World War 2 — more than any other tank used by the Western Allies."
    ]
  },
  {
    id: "m113",
    name: "M113",
    country: "United States",
    category: "APC",
    era: "Cold War",
    images: [
      { url: "assets/images/m113-001.jpg", stars: 1 },
      { url: "assets/images/m113-002.jpg", stars: 2 },
      { url: "assets/images/m113-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The M113 is the most widely used armoured fighting vehicle in history, with over 80,000 built and operators in more than 50 countries.",
      "Despite being designed in the 1950s, modified M113s are still used in active service by dozens of militaries today.",
      "The M113's aluminium hull was controversial at first — critics worried it would melt under fire — but it proved lighter and faster than steel alternatives."
    ]
  },
  {
    id: "btr80",
    name: "BTR-80",
    country: "Russia",
    category: "APC",
    era: "Cold War",
    images: [
      { url: "assets/images/btr80-001.jpg", stars: 1 },
      { url: "assets/images/btr80-002.jpg", stars: 2 },
      { url: "assets/images/btr80-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The BTR-80 can cross rivers under its own power using a water jet, with no preparation needed — the crew simply raises the trim vane and drives in.",
      "Its eight wheels are all driven, giving it excellent cross-country mobility even if two wheels are destroyed by a mine.",
      "The BTR-80 replaced the BTR-60 and BTR-70 specifically because Soviet troops complained that the older models' exits were dangerous under fire — the new side hatches open forward to provide cover."
    ]
  },
  {
    id: "stryker",
    name: "Stryker",
    country: "United States",
    category: "APC",
    era: "Modern",
    images: [
      { url: "assets/images/stryker-001.jpg", stars: 1 },
      { url: "assets/images/stryker-002.jpg", stars: 2 },
      { url: "assets/images/stryker-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The Stryker was specifically sized to fit inside a C-130 Hercules transport aircraft, giving the US Army the ability to deploy armoured units anywhere in the world within hours.",
      "Unlike most APCs, the Stryker uses a remote weapon station that the gunner operates from inside the vehicle — keeping them protected while engaging targets.",
      "The Stryker's network of sensors and computers links every vehicle in a unit together, giving commanders a real-time picture of all friendly positions on the battlefield."
    ]
  },
  {
    id: "fv432",
    name: "FV432 Trojan",
    country: "United Kingdom",
    category: "APC",
    era: "Cold War",
    images: [
      { url: "assets/images/fv432-001.jpg", stars: 1 },
      { url: "assets/images/fv432-002.jpg", stars: 2 },
      { url: "assets/images/fv432-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The FV432 entered British Army service in 1963 and variants are still in use today — over 60 years of front-line service.",
      "During the Falklands War, FV432s were used as ambulances and command vehicles, showing how versatile the basic hull design could be.",
      "The FV432 was designed to be fully amphibious using a flotation screen, though this feature was rarely used in practice."
    ]
  },
  {
    id: "patria_amv",
    name: "Patria AMV",
    country: "Finland",
    category: "APC",
    era: "Modern",
    images: [
      { url: "assets/images/patria_amv-001.jpg", stars: 1 },
      { url: "assets/images/patria_amv-002.jpg", stars: 2 },
      { url: "assets/images/patria_amv-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The Patria AMV is one of the most modular APCs ever built — the same hull can be reconfigured as a troop carrier, IFV, mortar carrier, ambulance, or command vehicle in the field.",
      "Finland designed the AMV to operate reliably at -40°C, with heating systems that keep the engine and crew compartment functional without external power.",
      "The AMV's hull can be fitted with add-on armour packages that nearly double its protection level, adapting it to different threat environments."
    ]
  },
  {
    id: "boxer",
    name: "Boxer",
    country: "Germany",
    category: "APC",
    era: "Modern",
    images: [
      { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7C8Vu1fXdLKbdQDlTocn84TiaaqkrFb1qlA&s", stars: 1 },
      { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGmeXsJMOb1awJv-LVnQIluVXSYXeovEZTEw&s", stars: 2 },
      { url: "assets/images/boxer-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The Boxer uses a revolutionary 'drive module plus mission module' design — the front crew cab can be separated from the rear payload section and swapped in under an hour.",
      "This modularity means a single Boxer drive module can serve as an APC one day and an ambulance or command vehicle the next, without any workshop modifications.",
      "The Boxer is in service with Germany, the Netherlands, Lithuania, and Australia, and is one of the heaviest wheeled APCs ever built — nearly as well protected as some infantry fighting vehicles."
    ]
  },
  {
    id: "btr60",
    name: "BTR-60",
    country: "Soviet Union",
    category: "APC",
    era: "Cold War",
    images: [
      { url: "assets/images/btr60-001.jpg", stars: 1 },
      { url: "assets/images/btr60-002.jpg", stars: 2 },
      { url: "assets/images/btr60-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The BTR-60 was the first Soviet APC built on its own purpose-designed chassis rather than adapted from a truck — every wheeled Soviet APC since traces its lineage to it.",
      "The BTR-60 uses two engines, each driving four wheels on its own side. If one engine is destroyed, the vehicle can still drive away on the other.",
      "Over 25,000 BTR-60s were built, and they served with more than 50 countries — many of them still operating modernised variants today."
    ]
  },
  {
    id: "vab",
    name: "VAB",
    country: "France",
    category: "APC",
    era: "Cold War",
    images: [
      { url: "assets/images/vab-001.jpg", stars: 1 },
      { url: "assets/images/vab-002.jpg", stars: 2 },
      { url: "assets/images/vab-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The VAB (Véhicule de l'Avant Blindé) is fully amphibious using two water jets — French marines used it for beach assaults and river crossings without preparation.",
      "Over 5,000 VABs have been built, and the platform has seen combat with French forces in Lebanon, Bosnia, Mali, Afghanistan, and the Sahel.",
      "Despite being designed in the 1970s, modernised VABs are still in front-line French service — replacements (the Griffon) only began arriving in the early 2020s."
    ]
  },
  {
    id: "piranha3",
    name: "Piranha III",
    country: "Switzerland",
    category: "APC",
    era: "Modern",
    images: [
      { url: "assets/images/piranha3-001.jpg", stars: 1 },
      { url: "assets/images/piranha3-002.jpg", stars: 2 },
      { url: "assets/images/piranha3-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The Piranha family is the foundation for the Stryker, LAV-25, and Pandur — all of those Western APCs are derived from this Swiss 8×8 design.",
      "Switzerland is officially neutral, yet its arms industry produces the Piranha which serves with more than 20 militaries worldwide.",
      "The Piranha III can be air-transported by C-130 Hercules and reconfigured between APC, IFV, command vehicle, ambulance, and mortar carrier roles."
    ]
  },
  {
    id: "eitan",
    name: "Eitan",
    country: "Israel",
    category: "APC",
    era: "Modern",
    images: [
      { url: "assets/images/eitan-001.jpg", stars: 1 },
      { url: "assets/images/eitan-002.webp", stars: 2 },
      { url: "assets/images/eitan-003.jpg", stars: 3 }
    ],
    funFacts: [
      "Israel's Eitan was designed using lessons from the 2006 Lebanon War — it carries the Trophy active protection system, which can intercept incoming RPGs and anti-tank missiles in flight.",
      "The Eitan replaces the M113 in Israeli service, which had been criticised for inadequate protection against modern anti-armour weapons.",
      "Despite weighing over 35 tonnes, the Eitan can reach 90 km/h on roads — making it one of the fastest heavily-armoured wheeled APCs ever built."
    ]
  },
  {
    id: "m2bradley",
    name: "M2 Bradley",
    country: "United States",
    category: "IFV",
    era: "Cold War",
    images: [
      { url: "assets/images/m2bradley-001.jpg", stars: 1 },
      { url: "assets/images/m2bradley-002.jpg", stars: 2 },
      { url: "assets/images/m2bradley-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The Bradley is unusual in that it can both transport soldiers AND fight alongside them — its 25mm chain gun and TOW missiles make it capable of destroying enemy tanks.",
      "During the 1991 Gulf War, Bradleys destroyed more Iraqi armoured vehicles than M1 Abrams tanks did.",
      "The Bradley's development was so troubled and expensive that it inspired a satirical 1998 film — 'The Pentagon Wars' — depicting how the original simple APC design grew into a complex fighting vehicle."
    ]
  },
  {
    id: "bmp2",
    name: "BMP-2",
    country: "Russia",
    category: "IFV",
    era: "Cold War",
    images: [
      { url: "assets/images/bmp2-001.jpg", stars: 1 },
      { url: "assets/images/bmp2-002.jpg", stars: 2 },
      { url: "assets/images/bmp2-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The BMP-2's 30mm autocannon can engage both ground targets and low-flying helicopters, making it one of the most versatile IFVs ever built.",
      "Unlike most Western IFVs, the BMP-2 was designed so infantry could fire their personal weapons from inside the vehicle through firing ports along the sides.",
      "The BMP-2 is amphibious — it swims using its tracks with no preparation, though crews found its low freeboard made river crossings nerve-wracking in rough water."
    ]
  },
  {
    id: "bmp3",
    name: "BMP-3",
    country: "Russia",
    category: "IFV",
    era: "Modern",
    images: [
      { url: "assets/images/bmp3-001.jpg", stars: 1 },
      { url: "assets/images/bmp3-002.jpg", stars: 2 },
      { url: "assets/images/bmp3-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The BMP-3 is the only infantry fighting vehicle in the world armed with a 100mm gun, a 30mm autocannon, and three 7.62mm machine guns — all at the same time.",
      "Its 100mm gun can fire both conventional shells and laser-guided anti-tank missiles through the same barrel.",
      "The BMP-3 is fully amphibious and fast — it can reach 10 km/h on water using two water jets, fast enough to conduct river assault crossings under fire."
    ]
  },
  {
    id: "warrior",
    name: "Warrior (FV510)",
    country: "United Kingdom",
    category: "IFV",
    era: "Modern",
    images: [
      { url: "assets/images/warrior-001.jpg", stars: 1 },
      { url: "assets/images/warrior-002.jpg", stars: 2 },
      { url: "assets/images/warrior-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The Warrior's armour was specifically designed to protect against 14.5mm heavy machine gun fire on all sides — much tougher than contemporary Soviet IFVs.",
      "During the 1991 Gulf War, Warriors advanced so quickly across the Iraqi desert that they outpaced the infantry they were supposed to be supporting.",
      "The Warrior can run on flat tyres — its road wheels are designed to keep the vehicle moving even after being punctured by shrapnel or small-arms fire."
    ]
  },
  {
    id: "cv90",
    name: "CV90",
    country: "Sweden",
    category: "IFV",
    era: "Modern",
    images: [
      { url: "assets/images/cv90-001.jpg", stars: 1 },
      { url: "assets/images/cv90-002.jpg", stars: 2 },
      { url: "assets/images/cv90-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The CV90 was designed to start its engine reliably at -40°C and operate in the deep snow of Nordic terrain, conditions that would stop most other IFVs.",
      "Its 40mm autocannon is one of the most powerful ever fitted to an IFV, capable of destroying lightly armoured vehicles at over 1,500 metres.",
      "The CV90 is one of the best-selling IFVs in the world, used by Norway, Sweden, Switzerland, Finland, the Netherlands, and Denmark."
    ]
  },
  {
    id: "marder",
    name: "Marder",
    country: "Germany",
    category: "IFV",
    era: "Cold War",
    images: [
      { url: "assets/images/marder-001.jpg", stars: 1 },
      { url: "assets/images/marder-002.jpg", stars: 2 },
      { url: "assets/images/marder-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The Marder was one of the first true infantry fighting vehicles — designed not just to carry troops but to fight alongside them with its own heavy weapons.",
      "Its design placed such a priority on infantry protection that the troop compartment can withstand hits from 20mm rounds on all sides.",
      "The Marder has been continuously upgraded since its introduction in 1971 and remained in front-line German service for over 50 years."
    ]
  },
  {
    id: "bmp1",
    name: "BMP-1",
    country: "Soviet Union",
    category: "IFV",
    era: "Cold War",
    images: [
      { url: "assets/images/bmp1-001.jpg", stars: 1 },
      { url: "assets/images/bmp1-002.jpg", stars: 2 },
      { url: "assets/images/bmp1-003.jpg", stars: 3 }
    ],
    funFacts: [
      "Introduced in 1966, the BMP-1 was the world's first true infantry fighting vehicle — combining troop transport, armour, and direct fire support in one platform.",
      "Its 73mm low-pressure gun could fire HEAT rounds capable of penetrating early NATO tanks at close range, making the BMP-1 a serious threat far beyond a typical APC.",
      "The BMP-1 has been used in nearly every major conflict since the 1973 Yom Kippur War, with over 20,000 built and many still in service today."
    ]
  },
  {
    id: "puma",
    name: "Puma",
    country: "Germany",
    category: "IFV",
    era: "Modern",
    images: [
      { url: "assets/images/puma-001.jpg", stars: 1 },
      { url: "assets/images/puma-002.jpg", stars: 2 },
      { url: "assets/images/puma-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The Puma is one of the most heavily protected IFVs ever built — its modular armour can be upgraded in the field from 'Combat Light' (38 tonnes, air-transportable) to 'Combat' (43 tonnes, maximum protection).",
      "Its turret is unmanned — the gunner and commander sit inside the hull, removing the most exposed crew positions from harm's way.",
      "Germany's Puma development programme cost over 10 billion euros, making it one of the most expensive IFVs per unit ever fielded."
    ]
  },
  {
    id: "k21",
    name: "K21",
    country: "South Korea",
    category: "IFV",
    era: "Modern",
    images: [
      { url: "assets/images/k21-001.jpg", stars: 1 },
      { url: "assets/images/k21-002.jpg", stars: 2 },
      { url: "assets/images/k21-003.jpg", stars: 3 }
    ],
    funFacts: [
      "South Korea's K21 uses inflatable pontoons that deploy from the hull on demand, giving it enough buoyancy to swim across rivers without preparation.",
      "Its 40mm autocannon is one of the few fitted to any IFV that can engage tanks frontally at close range using armour-piercing rounds.",
      "The K21 is built largely from glass-fibre composite to keep weight down, making it air-transportable by C-17 and giving it excellent cross-country agility."
    ]
  },
  {
    id: "zbd04a",
    name: "ZBD-04A",
    country: "China",
    category: "IFV",
    era: "Modern",
    images: [
      { url: "assets/images/zbd04a-001.jpg", stars: 1 },
      { url: "assets/images/zbd04a-002.jpg", stars: 2 },
      { url: "assets/images/zbd04a-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The ZBD-04A is China's first true modern IFV, drawing design inspiration from the Russian BMP-3 but with significant Chinese improvements and updated electronics.",
      "Like the BMP-3, it carries a 100mm gun and 30mm autocannon — but with improved digital fire control and crew interfaces.",
      "The ZBD-04A is one of the few IFVs in the world capable of swimming at over 12 km/h using water jets, supporting amphibious operations."
    ]
  },
  {
    id: "m109paladin",
    name: "M109 Paladin",
    country: "United States",
    category: "Artillery",
    era: "Cold War",
    images: [
      { url: "assets/images/m109paladin-001.jpg", stars: 1 },
      { url: "assets/images/m109paladin-002.jpg", stars: 2 },
      { url: "assets/images/m109paladin-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The M109 Paladin can fire its first round within 60 seconds of stopping and be moving again 60 seconds later — a tactic called 'shoot and scoot' to avoid counter-battery fire.",
      "It has been continuously upgraded since 1963 and is still the primary self-propelled howitzer of the US Army today.",
      "The Paladin's 155mm shell can reach targets over 30 kilometres away with standard ammunition — and over 40 km with rocket-assisted rounds."
    ]
  },
  {
    id: "pzh2000",
    name: "PzH 2000",
    country: "Germany",
    category: "Artillery",
    era: "Modern",
    images: [
      { url: "assets/images/pzh2000-001.jpg", stars: 1 },
      { url: "assets/images/pzh2000-002.jpg", stars: 2 },
      { url: "assets/images/pzh2000-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The PzH 2000 can fire three rounds in 9 seconds and sustain 10-13 rounds per minute — faster than almost any other self-propelled howitzer in the world.",
      "Its automated loading system means the crew of five never has to manually handle the 43 kg shells, reducing fatigue and increasing sustained rate of fire.",
      "The PzH 2000 saw combat in Afghanistan with Dutch forces and in Ukraine, where its range and accuracy made it one of the most prized artillery systems of that conflict."
    ]
  },
  {
    id: "msta_s",
    name: "2S19 Msta-S",
    country: "Russia",
    category: "Artillery",
    era: "Modern",
    images: [
      { url: "assets/images/msta_s-001.jpg", stars: 1 },
      { url: "assets/images/msta_s-002.jpg", stars: 2 },
      { url: "assets/images/msta_s-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The 2S19 Msta-S uses the same hull as the T-80 tank, giving it excellent cross-country mobility compared to most self-propelled howitzers.",
      "It can fire a special Krasnopol laser-guided shell that homes in on a target painted by a forward observer, hitting with near-pinpoint accuracy at over 20 km.",
      "The Msta-S is designed for fully automated ammunition handling — the autoloader can cycle a round every 6–7 seconds without crew intervention."
    ]
  },
  {
    id: "caesar",
    name: "CAESAR",
    country: "France",
    category: "Artillery",
    era: "Modern",
    images: [
      { url: "assets/images/caesar-001.jpg", stars: 1 },
      { url: "assets/images/caesar-002.jpg", stars: 2 },
      { url: "assets/images/caesar-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The CAESAR is mounted on a standard 6×6 truck chassis rather than a tracked hull, making it cheaper to maintain and light enough to be air-transported by C-130.",
      "A CAESAR crew of five can go from driving down a road to firing a round in under 60 seconds, then be moving again within 30 seconds — one of the fastest deploy-fire-move cycles of any howitzer.",
      "CAESAR howitzers were donated to Ukraine in 2022 and praised by Ukrainian crews for their reliability, accuracy, and speed of deployment."
    ]
  },
  {
    id: "k9thunder",
    name: "K9 Thunder",
    country: "South Korea",
    category: "Artillery",
    era: "Modern",
    images: [
      { url: "assets/images/k9thunder-001.jpg", stars: 1 },
      { url: "assets/images/k9thunder-002.jpg", stars: 2 },
      { url: "assets/images/k9thunder-003.jpg", stars: 3 }
    ],
    funFacts: [
      "South Korea's K9 Thunder is one of the most exported self-propelled howitzers in the world, in service with nine countries including India, Egypt, Finland, and Norway.",
      "The K9 can fire three rounds in 15 seconds and sustain a rate of six rounds per minute for extended bombardment missions.",
      "India operates the K9 Vajra, a locally produced variant optimised for high-altitude Himalayan operations — the only self-propelled howitzer qualified for use at elevations above 4,000 metres."
    ]
  },
  {
    id: "as90",
    name: "AS-90",
    country: "United Kingdom",
    category: "Artillery",
    era: "Modern",
    images: [
      { url: "assets/images/as90-001.jpg", stars: 1 },
      { url: "assets/images/as90-002.jpg", stars: 2 },
      { url: "assets/images/as90-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The AS-90 can fire a burst of three rounds in under 10 seconds and sustain six rounds per minute for prolonged fire missions.",
      "Its 155mm gun uses a semi-automatic loading system that eliminates the need for a loader — the crew of five operates entirely from within the armoured turret.",
      "AS-90s were donated to Ukraine in 2023, where crews valued their combination of range, mobility, and protection compared to older Soviet-era artillery."
    ]
  },
  {
    id: "m270mlrs",
    name: "M270 MLRS",
    country: "United States",
    category: "Artillery",
    era: "Cold War",
    images: [
      { url: "assets/images/m270mlrs-001.jpg", stars: 1 },
      { url: "assets/images/m270mlrs-002.jpg", stars: 2 },
      { url: "assets/images/m270mlrs-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The M270 can fire 12 rockets in under 40 seconds, blanketing an area the size of six football fields with submunitions.",
      "It uses the same chassis as the Bradley fighting vehicle, allowing the rocket battery to keep pace with armoured units across rough terrain.",
      "Iraqi troops in the 1991 Gulf War nicknamed the M270 'Steel Rain' — its area-saturation attacks were devastating to dug-in positions."
    ]
  },
  {
    id: "2s7pion",
    name: "2S7 Pion",
    country: "Soviet Union",
    category: "Artillery",
    era: "Cold War",
    images: [
      { url: "assets/images/2s7pion-001.jpg", stars: 1 },
      { url: "assets/images/2s7pion-002.jpg", stars: 2 },
      { url: "assets/images/2s7pion-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The 2S7 Pion's 203mm gun is one of the largest-calibre weapons ever mounted on a tracked chassis — its shells weigh over 100 kg each.",
      "The Pion can fire a special tactical nuclear shell, making it one of the few Soviet artillery systems with strategic capabilities.",
      "With a maximum range of over 47 km using conventional rounds, the 2S7 outranges most NATO artillery — a deliberate Soviet design choice during the Cold War."
    ]
  },
  {
    id: "m777",
    name: "M777 Howitzer",
    country: "United Kingdom",
    category: "Artillery",
    era: "Modern",
    images: [
      { url: "assets/images/m777-001.jpg", stars: 1 },
      { url: "assets/images/m777-002.jpg", stars: 2 },
      { url: "assets/images/m777-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The M777 is the lightest 155mm howitzer in the world — its titanium construction makes it light enough to be sling-loaded by a CH-47 Chinook.",
      "It entered combat in 2005 and has been used extensively in Afghanistan, Iraq, and Ukraine — donated to Ukrainian forces by both the US and UK.",
      "Despite its low weight, the M777 can fire the GPS-guided Excalibur shell to land within four metres of a target at ranges over 40 km."
    ]
  },
  {
    id: "plz05",
    name: "PLZ-05",
    country: "China",
    category: "Artillery",
    era: "Modern",
    images: [
      { url: "assets/images/plz05-001.jpg", stars: 1 },
      { url: "assets/images/plz05-002.jpg", stars: 2 },
      { url: "assets/images/plz05-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The PLZ-05 is China's primary modern self-propelled howitzer, drawing heavily from the design of the Russian 2S19 Msta-S.",
      "Its 155mm gun can fire NATO-standard ammunition as well as Chinese laser-guided shells, giving it broad compatibility on the export market.",
      "The PLZ-05 features a fully automatic loading system, allowing it to sustain eight rounds per minute during prolonged fire missions."
    ]
  },
  {
    id: "ah64apache",
    name: "AH-64 Apache",
    country: "United States",
    category: "Helicopter",
    era: "Modern",
    images: [
      { url: "assets/images/ah64apache-001.jpg", stars: 1 },
      { url: "assets/images/ah64apache-002.png", stars: 2 },
      { url: "assets/images/ah64apache-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The Apache's fire control radar can track up to 128 targets simultaneously and prioritise which to engage — allowing a single crew to coordinate attacks on an entire armoured column.",
      "Apache pilots wear helmet-mounted displays that slave the 30mm chain gun directly to where they look — wherever the pilot looks, the gun points.",
      "The Apache is designed to survive hits from 23mm rounds — its critical components are armoured, its rotor blades can take multiple bullet hits and keep flying, and its engines can run for 30 minutes after losing all oil."
    ]
  },
  {
    id: "mi24hind",
    name: "Mi-24 Hind",
    country: "Russia",
    category: "Helicopter",
    era: "Cold War",
    images: [
      { url: "assets/images/mi24hind-001.jpg", stars: 1 },
      { url: "assets/images/mi24hind-002.jpg", stars: 2 },
      { url: "assets/images/mi24hind-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The Mi-24 Hind is unique among attack helicopters — it has a full troop compartment capable of carrying eight fully-equipped soldiers, making it simultaneously a gunship and an assault transport.",
      "Afghan Mujahideen fighters called the Mi-24 the 'flying tank' and 'devil's chariot' — its armoured hull could absorb small arms fire that would destroy other helicopters.",
      "The Mi-24 was so feared during the Soviet-Afghan War that the CIA supplied Stinger man-portable missiles to the Mujahideen specifically to counter it."
    ]
  },
  {
    id: "uh60blackhawk",
    name: "UH-60 Black Hawk",
    country: "United States",
    category: "Helicopter",
    era: "Cold War",
    images: [
      { url: "assets/images/uh60blackhawk-001.jpg", stars: 1 },
      { url: "assets/images/uh60blackhawk-002.jpg", stars: 2 },
      { url: "assets/images/uh60blackhawk-003.jpg", stars: 3 }
    ],
    funFacts: [
      "A single UH-60 Black Hawk can carry 11 combat-equipped soldiers, sling-load up to 4 tonnes of external cargo, or be rapidly converted into a medevac aircraft with six stretchers.",
      "The Black Hawk is specifically designed to be crash-worthy — its airframe is engineered to absorb impacts at up to 13.4 m/s vertical descent, protecting the crew in a hard landing.",
      "Black Hawks are used by over 30 countries and have served in virtually every US military operation since replacing the UH-1 Huey in 1979."
    ]
  },
  {
    id: "ch47chinook",
    name: "CH-47 Chinook",
    country: "United States",
    category: "Helicopter",
    era: "Cold War",
    images: [
      { url: "assets/images/ch47chinook-001.jpg", stars: 1 },
      { url: "assets/images/ch47chinook-002.jpg", stars: 2 },
      { url: "assets/images/ch47chinook-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The Chinook's tandem rotor design means all engine power goes to lifting — with no tail rotor needed, it has one of the best payload-to-weight ratios of any helicopter ever built.",
      "A CH-47 can carry up to 55 soldiers or lift over 12 tonnes of external sling load — including other helicopters and light artillery pieces.",
      "Chinooks have been in continuous production and service since 1962, making them one of the longest-serving military helicopters in history — with no replacement in sight."
    ]
  },
  {
    id: "ka52alligator",
    name: "Ka-52 Alligator",
    country: "Russia",
    category: "Helicopter",
    era: "Modern",
    images: [
      { url: "assets/images/ka52alligator-001.jpg", stars: 1 },
      { url: "assets/images/ka52alligator-002.jpg", stars: 2 },
      { url: "assets/images/ka52alligator-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The Ka-52 uses a coaxial rotor system — two sets of blades on the same mast spinning in opposite directions — which eliminates the tail rotor entirely and allows it to rotate and fly sideways as easily as forward.",
      "The Ka-52 is the only attack helicopter in the world fitted with an ejection seat — the rotor blades are blown off explosively before the seat fires, allowing the crew to escape in an emergency.",
      "Its nose-mounted radar and sensor suite allows it to fly behind terrain using 'pop-up' attack profiles, rising briefly to fire before dropping back into cover."
    ]
  },
  {
    id: "tiger_had",
    name: "Tiger HAD",
    country: "France",
    category: "Helicopter",
    era: "Modern",
    images: [
      { url: "assets/images/tiger_had-001.jpg", stars: 1 },
      { url: "assets/images/tiger_had-002.jpg", stars: 2 },
      { url: "assets/images/tiger_had-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The Tiger was designed using radar-absorbing composite materials to reduce its radar cross-section — making it significantly harder to detect than older metal-airframe helicopters.",
      "Its engine exhausts are shaped and shielded to minimise the infrared signature, making it harder for heat-seeking missiles to lock on.",
      "The Tiger HAD (Hélicoptère d'Appui Destruction) variant used by France and Spain is one of the most agile attack helicopters in the world — its lightweight composite airframe gives it performance comparable to much smaller scout helicopters."
    ]
  },
  {
    id: "uh1huey",
    name: "UH-1 Huey",
    country: "United States",
    category: "Helicopter",
    era: "Cold War",
    images: [
      { url: "assets/images/uh1huey-001.jpg", stars: 1 },
      { url: "assets/images/uh1huey-002.jpg", stars: 2 },
      { url: "assets/images/uh1huey-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The UH-1 Huey is one of the most iconic helicopters ever built — its distinctive 'thump-thump' blade slap became synonymous with the Vietnam War.",
      "Over 16,000 UH-1s were built, more than any other military helicopter except the Mi-8.",
      "The Huey is still in active military service with over 30 countries, more than 60 years after its first flight in 1956."
    ]
  },
  {
    id: "mi8hip",
    name: "Mi-8 Hip",
    country: "Soviet Union",
    category: "Helicopter",
    era: "Cold War",
    images: [
      { url: "assets/images/mi8hip-001.jpg", stars: 1 },
      { url: "assets/images/mi8hip-002.jpg", stars: 2 },
      { url: "assets/images/mi8hip-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The Mi-8 family is the most-produced helicopter in history, with over 17,000 built since 1961 — more than any Western helicopter design.",
      "An Mi-8 can carry 24 fully-equipped soldiers — twice the troop capacity of the Black Hawk — making it one of the most capable medium-lift helicopters ever built.",
      "The Mi-8 has flown in every climate on Earth, from the Arctic Circle to the equator, and has logged more combat hours than perhaps any other helicopter type."
    ]
  },
  {
    id: "nh90",
    name: "NH90",
    country: "France",
    category: "Helicopter",
    era: "Modern",
    images: [
      { url: "assets/images/nh90-001.jpg", stars: 1 },
      { url: "assets/images/nh90-002.jpg", stars: 2 },
      { url: "assets/images/nh90-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The NH90 is the most extensively customised helicopter ever built — virtually every operator nation gets a slightly different configuration tailored to its requirements.",
      "It was the first helicopter to be designed entirely on computer using CAD/CAM systems — no physical prototypes were built during the initial design phase.",
      "The NH90's fly-by-wire flight control system gives it stability and precision more typical of fighter jets than transport helicopters."
    ]
  },
  {
    id: "aw101merlin",
    name: "AW101 Merlin",
    country: "United Kingdom",
    category: "Helicopter",
    era: "Modern",
    images: [
      { url: "assets/images/aw101merlin-001.png", stars: 1 },
      { url: "assets/images/aw101merlin-002.jpg", stars: 2 },
      { url: "assets/images/aw101merlin-003.jpg", stars: 3 }
    ],
    funFacts: [
      "The AW101 Merlin can operate from ship decks in sea states that would ground most other helicopters — its automated flight control system manages pitch and roll to counter ship motion.",
      "Its three engines give it enormous performance reserves — a Merlin can complete its mission safely even after losing an engine entirely.",
      "The Royal Navy uses Merlins for anti-submarine warfare, dipping their sonar into the ocean to hunt submarines hundreds of kilometres from their host ship."
    ]
  }
];

// Convenience helper — total count, useful for the home-screen stats card
window.vehicleCount = window.vehicles.length;

// Alliance configuration — maps countries to military alliances.
// Managed via Admin → 🌐 Alliances. Empty = built-in defaults apply.
window.pactConfig = {
};
