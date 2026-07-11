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

export const vehicles = [
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
    ],
    about: "The definitive American main battle tank, built to dominate the battlefields of late Cold War and modern conflicts through an optimal balance of advanced composite armor, firepower, and gas-turbine mobility.",
    specs: {
      crew: "4 personnel",
      weight: "54.0 tonnes",
      length: "9.77 m",
      width: "3.66 m",
      height: "2.38 m",
      engine: "Lycoming AGT-1500 gas turbine",
      horsepower: "1,500 hp",
      fuel: "1,900 litres",
      speed: "72 km/h",
      range: "498 km",
      enteredService: "1980, United States"
    },
    armament: [
      { section: "MAIN GUN", name: "105mm M68E1 rifled gun (early models) or 120mm M256 smoothbore cannon" },
      { section: "SECONDARY WEAPONS", name: "12.7mm M2HB heavy machine gun" },
      { section: "SECONDARY WEAPONS", name: "2 x 7.62mm M240 machine guns" }
    ],
    protection: [
      { section: "ARMOUR", name: "Chobham composite armor" },
      { section: "PROTECTION SYSTEMS", name: "Hull/turret anti-accumulation side skirts" },
      { section: "PROTECTION SYSTEMS", name: "Halon fire-suppression and NBC system" }
    ],
    whats: {
      intro: "A broad, low-slung tank with an angular, heavily sloped turret front and an exposed rear engine deck venting intense heat.",
      cues: [
        { letter: "W", keyword: "WHEELS / TRACKS", description: "t features 7 evenly spaced road wheels per side. (This is a key differentiator from the Russian T-series tanks, which typically have 6)." },
        { letter: "H", keyword: "HULL", description: "The front upper glacis (the sloping front armor) is extremely long, flat, and sharply angled back toward the turret. It creates a very distinct wedge shape." },
        { letter: "A", keyword: "ARMAMENT", description: "Armed with a 120mm M256 smoothbore cannon" },
        { letter: "T", keyword: "TURRET", description: "Shape: Massive, angular, and boxy. It is highly elongated, stretching significantly toward the rear over the engine deck to accommodate the armored ammunition blow-out panels." },
        { letter: "S", keyword: "SUSPENSION / SILHOUETTE", description: "Very low, sleek, and exceptionally wide." }
      ]
    },
    variants: [
      { name: "M1A1", year: 1985, label: "Upgraded to 120mm main gun" },
      { name: "M1A2 SEPv3", year: 2012, label: "Modern digital architecture and heavily upgraded armor package" }
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
    ],
    about: "Widely considered the gold standard of NATO armored warfare, the Leopard 2 combines exceptional German automotive engineering with formidable firepower and export modularity.",
    specs: {
      crew: "4 personnel",
      weight: "65.0 tonnes (up to 69 tonnes on later variants)",
      length: "10.97 m (including gun)",
      width: "3.77 m",
      height: "2.64 m",
      engine: "MTU MB 873 Ka-501 V12 diesel",
      horsepower: "1,500 hp",
      fuel: "1,160 litres",
      speed: "70 km/h",
      range: "450 km",
      enteredService: "1979, Germany"
    },
    armament: [
      { section: "MAIN GUN", name: "120mm Rheinmetall L/44 or L/55 smoothbore cannon" },
      { section: "SECONDARY WEAPONS", name: "7.62mm coaxial machine gun" },
      { section: "SECONDARY WEAPONS", name: "7.62mm anti-aircraft machine gun / Remote Weapon Station" }
    ],
    protection: [
      { section: "ARMOUR", name: "Advanced third-generation composite matrix armor" },
      { section: "ARMOUR", name: "Reinforced anti-mine hull belly armor" },
      { section: "PROTECTION SYSTEMS", name: "Modular add-on arrowhead turret wedges (A5 onwards)" }
    ],
    whats: {
      intro: "A boxy, flat-faced hull transitioning to highly distinct wedge-shaped arrowhead turret armor on later variations.",
      cues: [
        { letter: "A", keyword: "Arrowhead", description: "Prominent arrowhead turret profile" },
        { letter: "E", keyword: "Exhaust", description: "Dual circular exhaust ports on the rear hull" },
        { letter: "S", keyword: "Skirts", description: "Stepped side skirts" }
      ]
    },
    variants: [
      { name: "Leopard 2A4", year: 1984, label: "Classic boxy configuration turret" },
      { name: "Leopard 2A7V", year: 2012, label: "Modernized German Army variant with advanced optronics and programmable ammunition capabilities" }
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
      { url: "assets/images/challenger2-003.jpg", stars: 3 },
      { url: "assets/images/challenger2-004.jpg", stars: 3 },
      { url: "assets/images/challenger2-005.jpg", stars: 3 }
    ],
    funFacts: [
      "Until 2023, no Challenger 2 had ever been destroyed by enemy fire in combat."
    ],
    about: "Designed to prioritize maximum crew survivability, the Challenger 2 is the heavily armored workhorse of the British Army, famous for its combat record and unique rifled main gun.",
    specs: {
      crew: "4 personnel",
      weight: "62.5 tonnes (up to 75.0 tonnes combat-ready with add-on kits)",
      length: "11.55 m (including gun)",
      width: "3.52 m",
      height: "2.49 m",
      engine: "Perkins CV12-6A V12 diesel",
      horsepower: "1,200 hp",
      fuel: "1,592 litres",
      speed: "59 km/h",
      range: "550 km (on road)",
      enteredService: "1998, United Kingdom"
    },
    armament: [
      { section: "MAIN GUN", name: "120mm L30A1 rifled main gun" },
      { section: "SECONDARY WEAPONS", name: "7.62mm L94A1 EX-34 coaxial chain gun" },
      { section: "SECONDARY WEAPONS", name: "7.62mm L37A2 anti-aircraft machine gun" }
    ],
    protection: [
      { section: "ARMOUR", name: "Second-generation classified Dorchester composite armor" },
      { section: "PROTECTION SYSTEMS", name: "Explosive Reactive Armor (ERA) / applique side panels" },
      { section: "PROTECTION SYSTEMS", name: "Hydrogas variable suspension for smoother hull targeting" }
    ],
    whats: {
      intro: "A massive, heavily armored tank with a continuous slope across its expansive turret front and distinctively tall external fuel drums mounted at the back.",
      cues: [
        { letter: "T", keyword: "Thermal sleeve", description: "Signature canvas thermal sleeve blanket wrapped around the rifled barrel" },
        { letter: "C", keyword: "Cheeks", description: "Sloping turret cheeks" },
        { letter: "F", keyword: "Fuel drums", description: "Distinctively tall external fuel drums mounted at the back" }
      ]
    },
    variants: [
      { name: "Challenger 2E", year: 2000, label: "Export variant optimized for hot environments" },
      { name: "Challenger 3", year: 2030, label: "Next-generation evolution featuring a NATO smoothbore gun upgrade" }
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
      { url: "assets/images/leclerc-003.jpg", stars: 3 },
      { url: "assets/images/leclerc-004.jpg", stars: 3 },
      { url: "assets/images/leclerc-005.jpg", stars: 3 }
    ],
    funFacts: [
      "The Leclerc was the first Western main battle tank to feature a fully automated loading system, allowing it to operate with a 3-man crew instead of 4."
    ],
    about: "France's high-tech main battle tank, engineered around a light profile and high tactical automation, allowing it to move fast and fire with incredible rapid-succession speed.",
    specs: {
      crew: "3 personnel",
      weight: "57.4 tonnes",
      length: "9.87 m (including gun)",
      width: "3.71 m",
      height: "2.53 m",
      engine: "SACM V8X-1500 Hyperbar diesel",
      horsepower: "1,500 hp",
      fuel: "1,300 litres (550 km range with auxiliary tanks)",
      speed: "72 km/h",
      range: "550 km",
      enteredService: "1992, France"
    },
    armament: [
      { section: "MAIN GUN", name: "120mm GIAT CN120-26 smoothbore cannon" },
      { section: "SECONDARY WEAPONS", name: "12.7mm heavy coaxial machine gun" },
      { section: "SECONDARY WEAPONS", name: "7.62mm anti-aircraft machine gun" }
    ],
    protection: [
      { section: "ARMOUR", name: "Advanced structural modular composite armor" },
      { section: "SMOKE", name: "GALIX vehicle combat self-defence smoke/grenade layout" },
      { section: "PROTECTION SYSTEMS", name: "Automated fast-reaction internal fire containment systems" }
    ],
    whats: {
      intro: "A compact, boxy Western vehicle with a tightly profile-fit turret shape, distinct rear autoloader housing overhang, and a very short hull front.",
      cues: [
        { letter: "M", keyword: "Mantlet", description: "Flush-fitted large rectangular gun mantlet layout" },
        { letter: "S", keyword: "Sight", description: "Commander's panoramic sight system offset to the right side of the turret roof" },
        { letter: "C", keyword: "Compact", description: "Very compact overall profile" }
      ]
    },
    variants: [
      { name: "Leclerc Series 1", year: 1992, label: "Initial baseline production versions" },
      { name: "Leclerc XLR", year: 2020, label: "Comprehensive modern digitization and urbanization combat upgrade package" }
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
    ],
    about: "Combining the low-profile chassis concept of the classic T-72 with the advanced tracking technologies of the T-80, the T-90 forms the core heavy armored presence of modern Russian ground units.",
    specs: {
      crew: "3 personnel",
      weight: "46.5 tonnes",
      length: "9.63 m",
      width: "3.78 m",
      height: "2.22 m",
      engine: "V-92S2 12-cylinder diesel (V-92S2F on newer models)",
      horsepower: "1,000 hp (1,130 hp on newer models)",
      fuel: "1,200 litres",
      speed: "60 km/h",
      range: "550 km",
      enteredService: "1992, Russia"
    },
    armament: [
      { section: "MAIN GUN", name: "125mm 2A46M smoothbore cannon" },
      { section: "SECONDARY WEAPONS", name: "12.7mm Kord heavy machine gun" },
      { section: "SECONDARY WEAPONS", name: "7.62mm PKMT coaxial machine gun" }
    ],
    protection: [
      { section: "ARMOUR", name: "Blend composite armor with integrated steel" },
      { section: "PROTECTION SYSTEMS", name: "Kontakt-5 or Relikt Explosive Reactive Armor (ERA) tiles" },
      { section: "SENSORS", name: "Shtora-1 electro-optical countermeasures / Arena active kill systems" }
    ],
    whats: {
      intro: "A very low-profile, squat vehicle characterized by overlapping angled armor bricks across the entire front of its dome-shaped turret.",
      cues: [
        { letter: "E", keyword: "Eyes", description: "Distinctive dual red-glowing 'eyes' (Shtora infrared dazzlers) on either side of the gun barrel" },
        { letter: "L", keyword: "Low", description: "Low roofline and carousel autoloader architecture inside" },
        { letter: "B", keyword: "Bricks", description: "Overlapping angled armor bricks across turret front" }
      ]
    },
    variants: [
      { name: "T-90A", year: 2004, label: "Welded turret upgrade featuring the 1,000 hp engine package" },
      { name: "T-90M Proryv-3", year: 2020, label: "Heavily advanced modern overhaul with Relikt ERA, new turret layout, and isolated bushed ammunition" }
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
    ],
    about: "One of the most ubiquitous and produced armored designs of the late 20th century, the Soviet T-72 set the standard for low-slung, autoloader-driven tank doctrine across the globe.",
    specs: {
      crew: "3 personnel",
      weight: "41.5 tonnes (up to 44.5 tonnes on later modifications)",
      length: "9.53 m (including gun)",
      width: "3.59 m",
      height: "2.23 m",
      engine: "V-46 12-cylinder multi-fuel diesel",
      horsepower: "780 hp",
      fuel: "1,000 litres (plus external drum capacity)",
      speed: "60 km/h",
      range: "500 km (up to 650 km with external fuel drums)",
      enteredService: "1973, Soviet Union"
    },
    armament: [
      { section: "MAIN GUN", name: "125mm 2A46 smoothbore gun" },
      { section: "SECONDARY WEAPONS", name: "12.7mm NSVT anti-aircraft heavy machine gun" },
      { section: "SECONDARY WEAPONS", name: "7.62mm PKT coaxial machine gun" }
    ],
    protection: [
      { section: "ARMOUR", name: "Early cast steel composite armor arrays" },
      { section: "PROTECTION SYSTEMS", name: "Built-in radiation liner protection for CBRN scenarios" },
      { section: "ARMOUR", name: "Hull-integrated deep trench entrenching blade assembly" }
    ],
    whats: {
      intro: "A classic Soviet tank design sitting extremely low to the ground with a round, bowl-shaped cast turret.",
      cues: [
        { letter: "I", keyword: "Infrared", description: "Single prominent infrared searchlight mounted to the right side of the main gun barrel" },
        { letter: "W", keyword: "Wheels", description: "Large star-pattern road wheels" },
        { letter: "T", keyword: "Turret", description: "Round, bowl-shaped cast turret" }
      ]
    },
    variants: [
      { name: "T-72A", year: 1979, label: "Features thickened cast 'Dolly Parton' armor layout" },
      { name: "T-72B3", year: 2010, label: "Modernized upgrade equipped with Relikt ERA and digital thermal targeting sights" }
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
      { url: "assets/images/centurion-003.jpg", stars: 3 },
      { url: "assets/images/centurion-004.jpg", stars: 1 }
    ],
    funFacts: [
      "The Centurion is considered one of the most successful tank designs ever made, serving for over 50 years in 17 countries."
    ],
    about: "Introduced right at the end of World War II, the British Centurion pioneered the concept of a multi-role universal tank, effectively helping birth the modern MBT category.",
    specs: {
      crew: "4 personnel",
      weight: "51.8 tonnes",
      length: "9.85 m (including gun forward)",
      width: "3.39 m",
      height: "3.00 m",
      engine: "Rolls-Royce Meteor V12 gasoline engine",
      horsepower: "650 hp",
      fuel: "450 litres",
      speed: "35 km/h",
      range: "190 km",
      enteredService: "1945, United Kingdom"
    },
    armament: [
      { section: "MAIN GUN", name: "20-pounder (84mm) rifled gun (early) or Royal Ordnance 105mm L7 (later Marks)" },
      { section: "SECONDARY WEAPONS", name: ".50 caliber coaxial ranging machine gun" },
      { section: "SECONDARY WEAPONS", name: "7.62mm (.30 cal) Browning coaxial machine gun" }
    ],
    protection: [
      { section: "ARMOUR", name: "Heavy rolled homogeneous steel glacis armor plate" },
      { section: "ARMOUR", name: "Thick modular side armor bazooka skirts covering running gear" },
      { section: "PROTECTION SYSTEMS", name: "Resilient Horstmann suspension system" }
    ],
    whats: {
      intro: "A classic early Cold War profile featuring a lengthy hull clad in heavy side armor panel skirts and a tall, straight-walled turret.",
      cues: [
        { letter: "H", keyword: "Horstmann", description: "Horstmann suspension wheel clusters visible under heavy full-length side skirts" },
        { letter: "U", keyword: "Utility", description: "External utility box layout clinging to turret sides" },
        { letter: "T", keyword: "Tall", description: "Tall, straight-walled turret" }
      ]
    },
    variants: [
      { name: "Centurion Mk 3", year: 1950, label: "Features the iconic 20-pounder main gun setup" },
      { name: "Centurion Mk 5/2", year: 1956, label: "Upgraded variant integrating the legendary 105mm L7 rifled gun" }
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
    ],
    about: "Germany's legendary heavy armored vehicle, striking psychological terror into Allied armor crews through its unmatched armor plate bulk and long-range high-velocity anti-aircraft gun derived armament.",
    specs: {
      crew: "5 personnel",
      weight: "54.0 tonnes (combat configuration up to 57 tonnes)",
      length: "8.45 m (including gun)",
      width: "3.56 m",
      height: "3.00 m",
      engine: "Maybach HL230 P45 V12 gasoline engine",
      horsepower: "700 hp",
      fuel: "540 litres",
      speed: "40 km/h",
      range: "110 km (road condition range)",
      enteredService: "1942, Germany"
    },
    armament: [
      { section: "MAIN GUN", name: "88mm KwK 36 L/56 heavy cannon" },
      { section: "SECONDARY WEAPONS", name: "7.92mm MG 34 coaxial machine gun" },
      { section: "SECONDARY WEAPONS", name: "7.92mm MG 34 bow-mounted hull machine gun" }
    ],
    protection: [
      { section: "ARMOUR", name: "100mm thick flat face homogeneous steel frontal hull plate" },
      { section: "ARMOUR", name: "Interleaved and overlapping road wheel array for distributing mass weight" },
      { section: "ARMOUR", name: "Zimmerit anti-magnetic paste surface coating (mid-to-late production)" }
    ],
    whats: {
      intro: "A blocky, heavily vertical tank structure with a horseshoe-shaped turret layout and complex layered road wheels.",
      cues: [
        { letter: "F", keyword: "Face", description: "Flat vertical hull armor nose profile" },
        { letter: "M", keyword: "Muzzle", description: "Prominent muzzle brake fixed onto a long 88mm barrel" },
        { letter: "W", keyword: "Wheels", description: "Overlapping disk road wheels" }
      ]
    },
    variants: [
      { name: "Tiger I Early Production", year: 1942, label: "Features tall drum commander cupola and dual rear air pre-cleaners" },
      { name: "Tiger I Late Production", year: 1943, label: "Features low-profile cast cupola and steel-rimmed road wheels" }
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
    ],
    about: "Widely considered one of the most effective and revolutionary armor layout designs of World War II, the T-34 combined innovative sloped armor protection with rugged mechanical mass productivity.",
    specs: {
      crew: "4 personnel (5 on late T-34-85 models)",
      weight: "26.5 tonnes (up to 32.0 tonnes for late models)",
      length: "6.68 m (hull length; up to 8.10 m with 85mm gun forward)",
      width: "3.00 m",
      height: "2.46 m",
      engine: "Model V-2-34 V12 diesel engine",
      horsepower: "500 hp",
      fuel: "460 litres (plus external side tank cylinders)",
      speed: "53 km/h",
      range: "330 km",
      enteredService: "1940, Soviet Union"
    },
    armament: [
      { section: "MAIN GUN", name: "76.2mm F-34 main gun (or 85mm ZiS-S-53 on later variations)" },
      { section: "SECONDARY WEAPONS", name: "7.62mm DT coaxial machine gun" },
      { section: "SECONDARY WEAPONS", name: "7.62mm DT bow hull machine gun" }
    ],
    protection: [
      { section: "ARMOUR", name: "45mm highly sloped homogeneous steel hull plates" },
      { section: "PROTECTION SYSTEMS", name: "All-terrain Christie spring suspension system" },
      { section: "ARMOUR", name: "Wide stamped track design for minimal ground sink pressure" }
    ],
    whats: {
      intro: "A medium combat tank characterized by starkly sloped front and side hull surfaces, a forward-positioned turret, and massive un-rimmed large road wheels.",
      cues: [
        { letter: "A", keyword: "Angled", description: "Angled nose plate with center-mounted driver's hatch" },
        { letter: "F", keyword: "Fuel", description: "Cylindrical spare fuel tanks clamped on the hull sides" },
        { letter: "T", keyword: "Track", description: "Wide link tracks" }
      ]
    },
    variants: [
      { name: "T-34/76", year: 1940, label: "Early war configuration variant carrying the 76.2mm weapon" },
      { name: "T-34-85", year: 1943, label: "Late war upgrade featuring an enlarged three-man turret and hard-hitting 85mm gun" }
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
    ],
    about: "The legendary backbone of the Western Allied offensive machine, the M4 Sherman succeeded due to unparalleled mechanical reliability, logistical ease, and production scaling.",
    specs: {
      crew: "5 personnel",
      weight: "30.3 tonnes",
      length: "5.84 m (hull length)",
      width: "2.62 m",
      height: "2.74 m",
      engine: "Continental R975 9-cylinder radial gasoline engine (varies by block model)",
      horsepower: "400 hp",
      fuel: "662 litres",
      speed: "38 km/h",
      range: "193 km",
      enteredService: "1942, United Kingdom / United States"
    },
    armament: [
      { section: "MAIN GUN", name: "75mm M3 L/40 gun (later upgraded to 76mm M1 gun or 105mm howitzer)" },
      { section: "SECONDARY WEAPONS", name: ".50 caliber Browning M2HB anti-aircraft roof machine gun" },
      { section: "SECONDARY WEAPONS", name: "2 x .30-06 caliber Browning M1919A4 machine guns (coaxial and bow-mounted)" }
    ],
    protection: [
      { section: "ARMOUR", name: "Cast or welded steel armor array with rounded mantlet shield" },
      { section: "PROTECTION SYSTEMS", name: "Early vertical volute spring suspension bogie layout (VVSS)" },
      { section: "PROTECTION SYSTEMS", name: "'Wet' ammunition storage racking to limit internal ammunition fires" }
    ],
    whats: {
      intro: "A distinctively tall, short-bodied vehicle with an elevated hull ceiling, a rounded cast turret profile, and side-mounted suspension assemblies.",
      cues: [
        { letter: "P", keyword: "Profile", description: "High vertical silhouette profile" },
        { letter: "B", keyword: "Bogie", description: "Three dual-wheel bogie assemblies bolted along each hull flank" },
        { letter: "T", keyword: "Transmission", description: "Prominent transmission casing bulges protruding at the front bottom" }
      ]
    },
    variants: [
      { name: "M4A1", year: 1942, label: "Features a completely cast smooth rounded upper armor hull shell construction" },
      { name: "M4A3E8 Easy Eight", year: 1945, label: "Late war update integrating a 76mm high-velocity gun and smooth riding wide track HVSS suspension" }
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
    ],
    about: "The legendary aluminum-hulled workhorse of Western mechanized forces, providing basic battlefield mobility and battlefield transport to infantry squads across dozens of global conflicts.",
    specs: {
      crew: "2 personnel (plus 11 passengers)",
      weight: "12.3 tonnes",
      length: "4.86 m",
      width: "2.69 m",
      height: "2.20 m",
      engine: "Detroit Diesel 6V53 V6 engine",
      horsepower: "212 hp",
      fuel: "360 litres",
      speed: "66 km/h",
      range: "480 km",
      enteredService: "1960, United States"
    },
    armament: [
      { section: "MAIN WEAPON", name: "12.7mm M2 Browning heavy machine gun" },
      { section: "SECONDARY WEAPONS", name: "Optional pintle-mounted 7.62mm M60 machine gun" }
    ],
    protection: [
      { section: "ARMOUR", name: "5083 Aircraft-grade aluminum alloy armor" },
      { section: "PROTECTION SYSTEMS", name: "Internal spall suppression blankets" },
      { section: "PROTECTION SYSTEMS", name: "Front-mounted trim vane engine heat shield" }
    ],
    whats: {
      intro: "A boxy, tracked rectangular transport hull with a steeply sloped front nose and a wide hydraulic deployment ramp at the back.",
      cues: [
        { letter: "A", keyword: "WHEELS", description: "Five road wheels per side with no return rollers" },
        { letter: "B", keyword: "CUPOLA", description: "Exposed high-mounted commander's cupola ring with single heavy gun layout" }
      ]
    },
    variants: [
      { name: "M113A2", year: 1964, label: "Improved engine cooling setup and rugged suspension dampers" },
      { name: "M113A3", year: 1987, label: "Massive upgrade including a turbocharged 275 hp engine and external armored fuel cell pods" }
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
    ],
    about: "Designed to rectify the operational downfalls of earlier Soviet wheeled transports, the BTR-80 features cross-country 8x8 mobility and distinctive dual-section troop access doors.",
    specs: {
      crew: "3 personnel (plus 7 passengers)",
      weight: "13.6 tonnes",
      length: "7.55 m",
      width: "2.95 m",
      height: "2.41 m",
      engine: "KamAZ-7403 V8 turbocharged diesel",
      horsepower: "260 hp",
      fuel: "300 litres",
      speed: "80 km/h",
      range: "600 km",
      enteredService: "1984, Soviet Union"
    },
    armament: [
      { section: "MAIN WEAPON", name: "14.5mm KPVT heavy machine gun" },
      { section: "SECONDARY WEAPONS", name: "7.62mm PKT coaxial machine gun" },
      { section: "SMOKE", name: "6 x 81mm smoke grenade launchers" }
    ],
    protection: [
      { section: "ARMOUR", name: "All-welded steel armor protecting against 7.62mm rounds" },
      { section: "PROTECTION SYSTEMS", name: "Overpressurized collective NBC filtration suite" },
      { section: "PROTECTION SYSTEMS", name: "Bullet-resistant pneumatic run-flat tires" }
    ],
    whats: {
      intro: "A lengthy, low-slung 8-wheeled amphibious vehicle with an angular boat-like hull belly and a small pointed turret positioned forward.",
      cues: [
        { letter: "A", keyword: "WHEELS", description: "Four evenly spaced large rubber tires on each side" },
        { letter: "B", keyword: "DOORS", description: "Distinctive side passenger split doors wedged between the second and third axles" }
      ]
    },
    variants: [
      { name: "BTR-80K", year: 1986, label: "Command framework variation fitted with advanced long-range radios and navigation tracking equipment" },
      { name: "BTR-80A", year: 1994, label: "Fitted with a prominent modular weapons system carrying a 30mm 2A72 autocannon" }
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
    ],
    about: "The centerpiece of the US Army's rapid-deployment brigade combat teams, the Stryker bridges the tactical operational gap between heavy tracked forces and light infantry.",
    specs: {
      crew: "2 personnel (plus 9 passengers)",
      weight: "16.5 tonnes",
      length: "6.95 m",
      width: "2.72 m",
      height: "2.64 m",
      engine: "Caterpillar 3126 diesel engine",
      horsepower: "350 hp",
      fuel: "212 litres",
      speed: "100 km/h",
      range: "530 km",
      enteredService: "2002, United States"
    },
    armament: [
      { section: "MAIN WEAPON", name: "Protector Remote Weapon Station (RWS) with 12.7mm M2 machine gun" },
      { section: "SECONDARY WEAPONS", name: "Alternate Mk 19 40mm automatic grenade launcher" },
      { section: "SMOKE", name: "4 x M6 smoke grenade clusters" }
    ],
    protection: [
      { section: "ARMOUR", name: "High-hardness steel hull backed by MEXAS ceramic armor tiles" },
      { section: "PROTECTION SYSTEMS", name: "Reinforced shock-absorbing internal troop bench frames" },
      { section: "PROTECTION SYSTEMS", name: "Integrated automatic fire suppression array" }
    ],
    whats: {
      intro: "A high-stature, very modern 8x8 wheeled vehicle with a sharp wedge nose, slab sides, and a low-profile weapon turret on the roof.",
      cues: [
        { letter: "A", keyword: "HULL", description: "Tall, flat vertical side hull structures" },
        { letter: "B", keyword: "RWS", description: "Central remote weapon module with no traditional manned gun turret" }
      ]
    },
    variants: [
      { name: "M1126 ICV", year: 2002, label: "Infantry Carrier Vehicle basic baseline troop transporter configuration" },
      { name: "M1128 MGS", year: 2003, label: "Mobile Gun System variant sporting an external 105mm tank cannon" }
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
    ],
    about: "Serving as the primary tracked infantry delivery platform for the British Army for generations, the FV432 is a simple, heavy-gauge steel armored battlefield box.",
    specs: {
      crew: "2 personnel (plus 10 passengers)",
      weight: "15.3 tonnes",
      length: "5.25 m",
      width: "2.55 m",
      height: "2.28 m",
      engine: "Rolls-Royce K60 multi-fuel engine",
      horsepower: "240 hp",
      fuel: "454 litres",
      speed: "52 km/h",
      range: "425 km",
      enteredService: "1963, United Kingdom"
    },
    armament: [
      { section: "MAIN WEAPON", name: "7.62mm L7 General Purpose Machine Gun (GPMG)" },
      { section: "SMOKE", name: "Dual three-barrel forward smoke dischargers" }
    ],
    protection: [
      { section: "ARMOUR", name: "All-welded heavy steel plate providing defense up to 12.7mm rounds" },
      { section: "PROTECTION SYSTEMS", name: "Retractable fabric wading screens for water operations" },
      { section: "PROTECTION SYSTEMS", name: "Sealed interior chemical blast defense liner" }
    ],
    whats: {
      intro: "A squat, short tracked vehicle with completely flat steel sides and an offset exhaust pipe running cleanly along its roofline edge.",
      cues: [
        { letter: "A", keyword: "HATCH", description: "Large circular commander's roof escape hatch" },
        { letter: "B", keyword: "WHEELS", description: "Five road wheels layout with distinctive dual upper track support return rollers" }
      ]
    },
    variants: [
      { name: "FV432 Mortar Carrier", year: 1965, label: "Fitted with an internal 81mm mortar firing straight through a spinning roof port" },
      { name: "FV432 Bulldog", year: 2006, label: "Modern variant upgraded with bolt-on reactive composite armor grids and air-conditioning units" }
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
    ],
    about: "A cutting-edge European modular 8x8 armored system, globally renowned for its exceptional mines protection design and flexible layout changes.",
    specs: {
      crew: "3 personnel (plus 10 passengers)",
      weight: "26.0 tonnes (can reach up to 32.0 tonnes depending on weapon gear)",
      length: "7.70 m",
      width: "2.80 m",
      height: "2.30 m",
      engine: "Scania DI12 12-cylinder turbo diesel",
      horsepower: "540 hp",
      fuel: "400 litres",
      speed: "100 km/h",
      range: "800 km",
      enteredService: "2004, Finland"
    },
    armament: [
      { section: "MAIN WEAPON", name: "12.7mm heavy machine gun in a Remote Weapon Station" },
      { section: "SECONDARY WEAPONS", name: "Coaxial 7.62mm machine gun" },
      { section: "SMOKE", name: "Integrated multi-directional defensive smoke block arrays" }
    ],
    protection: [
      { section: "ARMOUR", name: "Advanced high-tier modular ballistic armor kit" },
      { section: "PROTECTION SYSTEMS", name: "Double-layered V-shaped anti-mine underside blast hull belly" },
      { section: "PROTECTION SYSTEMS", name: "Specialized infra-red absorbing low-visibility thermal paint finish" }
    ],
    whats: {
      intro: "A massive, highly angular modern 8x8 wheeled vehicle with clean modular panels, a tall ride clearance, and a wide rear stance.",
      cues: [
        { letter: "A", keyword: "FENDERS", description: "Distinctive wheel layout with wide geometric fenders" },
        { letter: "B", keyword: "PANELS", description: "Clean modular bolt seams visible along the engine and cabin panels" }
      ]
    },
    variants: [
      { name: "Patria AMV APC", year: 2004, label: "Baseline configuration infantry sector variant with light remote weapon mount" },
      { name: "Rosomak IFV", year: 2004, label: "Polish variant boasting an Italian Oto Melara Hitfist turret equipped with a 30mm cannon" }
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
    ],
    about: "Built around a unique dual-component concept, the Boxer features an interchangeable rear mission module that can be hot-swapped in under an hour to change its role.",
    specs: {
      crew: "3 personnel (plus 8 passengers)",
      weight: "33.0 tonnes (gross configuration weight)",
      length: "7.88 m",
      width: "2.99 m",
      height: "2.37 m",
      engine: "MTU V8 199 TE20 diesel engine",
      horsepower: "711 hp",
      fuel: "500 litres",
      speed: "103 km/h",
      range: "1,050 km",
      enteredService: "2009, Germany / Netherlands"
    },
    armament: [
      { section: "MAIN WEAPON", name: "Heckler & Koch GMG 40mm automatic grenade launcher or 12.7mm machine gun" },
      { section: "SECONDARY WEAPONS", name: "Pintle-mounted 7.62mm MG3 support weapon" },
      { section: "SMOKE", name: "Roof-integrated perimeter smoke grid assemblies" }
    ],
    protection: [
      { section: "ARMOUR", name: "AMAP (Advanced Modular Armour Protection) composite layer system" },
      { section: "PROTECTION SYSTEMS", name: "Dual-wall decoupled hull shell for isolating blast waves" },
      { section: "PROTECTION SYSTEMS", name: "Top-attack armor defenses shielding against sub-munitions" }
    ],
    whats: {
      intro: "An exceptionally large, heavy 8-wheeled vehicle with a tall geometric profile and a visible split line where the rear module drops into place.",
      cues: [
        { letter: "A", keyword: "PROFILE", description: "Immense structural height with heavily sloped upper nose glazing" },
        { letter: "B", keyword: "MODULE", description: "Visible square structural seam running completely around the rear half" }
      ]
    },
    variants: [
      { name: "Boxer GTK", year: 2009, label: "Standard baseline armored personnel transport version" },
      { name: "Boxer RCT30", year: 2018, label: "Upgraded infantry fighting version utilizing the uncrewed Puma IFV 30mm turret" }
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
    ],
    about: "Developing the foundational blueprint for Soviet 8x8 wheeled armored platforms, the BTR-60 brought amphibious squad transport capabilities to Soviet motorized rifle units.",
    specs: {
      crew: "2 personnel (plus 14 passengers)",
      weight: "10.3 tonnes",
      length: "7.56 m",
      width: "2.82 m",
      height: "2.31 m",
      engine: "2 x GAZ-49 6-cylinder gasoline engines",
      horsepower: "180 hp total (90 hp per engine)",
      fuel: "290 litres",
      speed: "80 km/h",
      range: "500 km",
      enteredService: "1960, Soviet Union"
    },
    armament: [
      { section: "MAIN WEAPON", name: "14.5mm KPVT heavy machine gun (BTR-60PB variant)" },
      { section: "SECONDARY WEAPONS", name: "7.62mm PKT coaxial machine gun" }
    ],
    protection: [
      { section: "ARMOUR", name: "Sloped welded homogeneous steel plate skin" },
      { section: "PROTECTION SYSTEMS", name: "Built-in amphibious rear hull water jet channel propulsion" },
      { section: "PROTECTION SYSTEMS", name: "Central tire inflation management system" }
    ],
    whats: {
      intro: "A classic boat-shaped 8-wheeled Soviet combat carrier with a distinctively tapered lower chin profile and a small conical turret.",
      cues: [
        { letter: "A", keyword: "WHEELS", description: "Eight large wheels with visible gaps between them" },
        { letter: "B", keyword: "HATCHES", description: "Dual roof passenger entry escape hatches, engine ventilation slits located at the very rear" }
      ]
    },
    variants: [
      { name: "BTR-60PA", year: 1963, label: "Introduced a fully enclosed, welded steel roof over the passenger hold" },
      { name: "BTR-60PB", year: 1966, label: "Fully finalized version carrying the conical machine gun turret assembly" }
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
    ],
    about: "France's foundational armored front-line transport, the VAB is a highly versatile, reliable wheeled system configured in both 4x4 and 6x6 variations.",
    specs: {
      crew: "2 personnel (plus 10 passengers)",
      weight: "13.0 tonnes",
      length: "5.98 m",
      width: "2.49 m",
      height: "2.06 m",
      engine: "Renault MIDR 062045 diesel engine",
      horsepower: "320 hp",
      fuel: "310 litres",
      speed: "92 km/h",
      range: "1,200 km",
      enteredService: "1976, France"
    },
    armament: [
      { section: "MAIN WEAPON", name: "12.7mm M2HB heavy machine gun in a manual open ring mount" },
      { section: "SECONDARY WEAPONS", name: "Alternate 7.62mm AA-52 light defense machine gun" }
    ],
    protection: [
      { section: "ARMOUR", name: "High-strength steel alloy armor rated against 7.62mm rounds" },
      { section: "PROTECTION SYSTEMS", name: "Integrated twin hydraulic rear water-jet propulsion impellers" },
      { section: "PROTECTION SYSTEMS", name: "Thick armored driver windshield protective safety shutters" }
    ],
    whats: {
      intro: "A compact, angled 4-wheeled or 6-wheeled vehicle with a distinctive sloping forward nose plate featuring two large armored cabin windshields.",
      cues: [
        { letter: "A", keyword: "WINDSHIELDS", description: "Two large armored front observation windows" },
        { letter: "B", keyword: "REAR", description: "A boxy flat rear profile with two large outward-opening access doors" }
      ]
    },
    variants: [
      { name: "VAB VTT", year: 1976, label: "Standard baseline French Army 4x4 infantry transporter version" },
      { name: "VCAC Mephisto", year: 1984, label: "Anti-tank variation fitted with a four-tube retractable HOT guided missile mount" }
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
    ],
    about: "A highly adaptable 8x8 wheeled armored personnel carrier developed by Mowag, serving as the design foundation for numerous modern western military vehicle families.",
    specs: {
      crew: "2 personnel (plus 10 passengers)",
      weight: "18.5 tonnes",
      length: "6.93 m",
      width: "2.66 m",
      height: "2.17 m",
      engine: "Caterpillar 3126 diesel",
      horsepower: "400 hp",
      fuel: "300 litres",
      speed: "100 km/h",
      range: "750 km",
      enteredService: "1996, Switzerland"
    },
    armament: [
      { section: "MAIN WEAPON", name: "12.7mm M2HB heavy machine gun" },
      { section: "SECONDARY WEAPONS", name: "Coaxial 7.62mm machine gun" },
      { section: "SMOKE", name: "Smoke grenade launchers" }
    ],
    protection: [
      { section: "ARMOUR", name: "High-hardness modular steel plate armor" },
      { section: "PROTECTION SYSTEMS", name: "Spall liners for interior compartment safety" },
      { section: "PROTECTION SYSTEMS", name: "NBC overpressure collective filtration system" }
    ],
    whats: {
      intro: "A classic, sharp-nosed 8x8 wheeled vehicle with an angular hull top layout and clean vertical sidewalls.",
      cues: [
        { letter: "A", keyword: "NOSE", description: "Distinctive multi-angled front nose wedge" },
        { letter: "B", keyword: "WHEELS", description: "Four large evenly spaced wheels down each side" }
      ]
    },
    variants: [
      { name: "Piranha IIIH", year: 2000, label: "Features an upgraded heavy suspension configuration package" },
      { name: "LAV III", year: 2002, label: "Canadian variant heavily modified with a 25mm autocannon turret" }
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
    ],
    about: "Israel's cutting-edge heavy 8x8 wheeled armored personnel carrier, developed to replace aging M113 tracks with unmatched mine and ballistic protection.",
    specs: {
      crew: "3 personnel (plus 9 passengers)",
      weight: "35.0 tonnes",
      length: "8.00 m",
      width: "3.10 m",
      height: "2.80 m",
      engine: "MTU turbocharged diesel",
      horsepower: "750 hp",
      fuel: "400 litres",
      speed: "90 km/h",
      range: "800 km",
      enteredService: "2023, Israel"
    },
    armament: [
      { section: "MAIN WEAPON", name: "Samson Remote Weapon Station with 12.7mm machine gun" },
      { section: "SECONDARY WEAPONS", name: "Optional 30mm uncrewed autocannon module" },
      { section: "MISSILES", name: "Integrated 60mm internal mortar system" }
    ],
    protection: [
      { section: "ARMOUR", name: "Advanced modular composite structural armor array" },
      { section: "PROTECTION SYSTEMS", name: "Iron Fist Active Protection System (APS) hard-kill suite" },
      { section: "PROTECTION SYSTEMS", name: "V-shaped anti-blast underbelly hull plates" }
    ],
    whats: {
      intro: "An immense, exceptionally tall and broad 8-wheeled vehicle with massive thick armor panel flanks.",
      cues: [
        { letter: "A", keyword: "SIZE", description: "Massive overall size profile with high ground clearance stance" },
        { letter: "B", keyword: "OPTICS", description: "Prominent camera and sensor optics housings" }
      ]
    },
    variants: [
      { name: "Eitan APC", year: 2023, label: "Standard baseline infantry carrier configuration carrying a remote weapon station" },
      { name: "Eitan IFV", year: 2025, label: "Heavy fire support version carrying an uncrewed 30mm turret setup" }
    ]
  },
  {
    id: "m2bradley",
    name: "M2 Bradley",
    country: "United States",
    category: "IFV",
    era: "Modern",
    images: [
      { url: "assets/images/m2bradley-001.jpg", stars: 1 },
      { url: "assets/images/m2bradley-002.jpg", stars: 2 },
      { url: "assets/images/m2bradley-003.jpg", stars: 3 },
      { url: "assets/images/m2bradley-004.jpg", stars: 3 },
      { url: "assets/images/m2bradley-005.webp", stars: 1 },
      { url: "assets/images/m2bradley-006.jpg", stars: 2 },
      { url: "assets/images/m2bradley-007.webp", stars: 1 },
      { url: "assets/images/m2bradley-008.jpg", stars: 1 }
    ],
    funFacts: [
      "The Bradley is unusual in that it can both transport soldiers AND fight alongside them — its 25mm chain gun and TOW missiles make it capable of destroying enemy tanks.",
      "During the 1991 Gulf War, Bradleys destroyed more Iraqi armoured vehicles than M1 Abrams tanks did.",
      "The Bradley's development was so troubled and expensive that it inspired a satirical 1998 film — 'The Pentagon Wars' — depicting how the original simple APC design grew into a complex fighting vehicle."
    ],
    about: "Engineered to engage and destroy enemy armor assets while delivering infantry directly into the line of fire, the Bradley combines a fast autocannon with hard-hitting anti-tank missiles.",
    specs: {
      crew: "3 personnel (plus 6 passengers)",
      weight: "25.0 tonnes (early models) or up to 35.0 tonnes on modern variants",
      length: "6.55 m",
      width: "3.60 m",
      height: "2.98 m",
      engine: "Cummins VTA-903T 8-cylinder diesel",
      horsepower: "600 hp",
      fuel: "662 litres",
      speed: "64 km/h",
      range: "480 km",
      enteredService: "1981, United States"
    },
    armament: [
      { section: "MAIN GUN", name: "25mm M242 Bushmaster chain gun" },
      { section: "MISSILES", name: "Twin BGM-71 TOW anti-tank guided missile box launcher" },
      { section: "SECONDARY WEAPONS", name: "7.62mm M240C coaxial machine gun" }
    ],
    protection: [
      { section: "ARMOUR", name: "Spaced laminate aluminum/steel ballistic alloy armour skin" },
      { section: "PROTECTION SYSTEMS", name: "Bolt-on explosive reactive armor (ERA) panel blocks (A2 onwards)" },
      { section: "PROTECTION SYSTEMS", name: "Integrated vehicle perimeter smoke launch systems" }
    ],
    whats: {
      intro: "A tall, tracked armored vehicle with an angled front glacis, a large two-man offset turret, and a rectangular missile launcher pod folded along its left side.",
      cues: [
        { letter: "A", keyword: "LAUNCHER", description: "Distinctive boxy TOW launcher arm fixed onto the left turret side" },
        { letter: "B", keyword: "TRACKS", description: "Complex heavy double-pin track skirts along both sides" }
      ]
    },
    variants: [
      { name: "M2A2 ODS", year: 1992, label: "Desert Storm upgrade integrating laser rangefinders and battlefield GPS links" },
      { name: "M2A3", year: 2000, label: "Fully digitized version outfitted with a tall independent commander's thermal panoramic sight" }
    ]
  },
  {
    id: "bmp2",
    name: "BMP-2",
    country: "Soviet Union",
    category: "IFV",
    era: "Cold War",
    images: [
      { url: "assets/images/bmp2-001.jpg", stars: 1 },
      { url: "assets/images/bmp2-002.jpg", stars: 2 },
      { url: "assets/images/bmp2-003.jpg", stars: 3 },
      { url: "assets/images/bmp2-004.jpg", stars: 3 },
      { url: "assets/images/bmp2-005.jpg", stars: 1 },
      { url: "assets/images/bmp2-006.webp", stars: 3 },
      { url: "assets/images/bmp2-007.jpg", stars: 2 },
      { url: "assets/images/bmp2-008.jpg", stars: 1 },
      { url: "assets/images/bmp2-009.jpg", stars: 1 }
    ],
    funFacts: [
      "The BMP-2's 30mm autocannon can engage both ground targets and low-flying helicopters, making it one of the most versatile IFVs ever built.",
      "Unlike most Western IFVs, the BMP-2 was designed so infantry could fire their personal weapons from inside the vehicle through firing ports along the sides.",
      "The BMP-2 is amphibious — it swims using its tracks with no preparation, though crews found its low freeboard made river crossings nerve-wracking in rough water."
    ],
    about: "A legendary Soviet tracked amphibious design, the BMP-2 improved on its predecessor by introducing a wider two-man turret and a high-rate-of-fire 30mm autocannon.",
    specs: {
      crew: "3 personnel (plus 7 passengers)",
      weight: "14.3 tonnes",
      length: "6.74 m",
      width: "3.15 m",
      height: "2.45 m",
      engine: "UTD-20/3 V6 liquid-cooled diesel",
      horsepower: "300 hp",
      fuel: "462 litres",
      speed: "65 km/h",
      range: "600 km",
      enteredService: "1980, Soviet Union"
    },
    armament: [
      { section: "MAIN GUN", name: "30mm 2A42 automatic dual-feed cannon" },
      { section: "MISSILES", name: "Roof-mounted 9M113 Konkurs anti-tank guided missile launcher" },
      { section: "SECONDARY WEAPONS", name: "7.62mm PKT coaxial machine gun" }
    ],
    protection: [
      { section: "ARMOUR", name: "Welded steel alloy armor optimized with highly sloped armor angles" },
      { section: "PROTECTION SYSTEMS", name: "Low-profile infrared target mask configuration" },
      { section: "PROTECTION SYSTEMS", name: "Amphibious track-driven water displacement hull design" }
    ],
    whats: {
      intro: "An exceptionally low, flat tracked vehicle with an ultra-long sloped rib-textured front nose deck and a wide, low turret.",
      cues: [
        { letter: "A", keyword: "GUN", description: "Prominent, long needle-like 30mm gun barrel extending past the front nose" },
        { letter: "B", keyword: "DOORS", description: "Dual rear access doors that double as internal fuel storage reservoirs" }
      ]
    },
    variants: [
      { name: "BMP-2D", year: 1982, label: "Modified variant adding heavy steel side armor plates; loses amphibious capability due to weight" },
      { name: "BMP-2M Berezhok", year: 2005, label: "Modern upgrade package incorporating four side-mounted Kornet missile tubes and digital optical sights" }
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
      { url: "assets/images/bmp3-003.jpg", stars: 3 },
      { url: "assets/images/bmp3-004.jpg", stars: 1 },
      { url: "assets/images/bmp3-005.webp", stars: 3 },
      { url: "assets/images/bmp3-006.jpg", stars: 3 },
      { url: "assets/images/bmp3-007.jpg", stars: 2 },
      { url: "assets/images/bmp3-008.webp", stars: 1 },
      { url: "assets/images/bmp3-009.jpg", stars: 2 }
    ],
    funFacts: [
      "The BMP-3 is the only infantry fighting vehicle in the world armed with a 100mm gun, a 30mm autocannon, and three 7.62mm machine guns — all at the same time.",
      "Its 100mm gun can fire both conventional shells and laser-guided anti-tank missiles through the same barrel.",
      "The BMP-3 is fully amphibious and fast — it can reach 10 km/h on water using two water jets, fast enough to conduct river assault crossings under fire."
    ],
    about: "A unique and heavily armed Soviet-designed tracked infantry fighting vehicle featuring a radical dual-caliber integrated gun system.",
    specs: {
      crew: "3 personnel (plus 7 passengers)",
      weight: "18.7 tonnes",
      length: "7.14 m",
      width: "3.23 m",
      height: "2.45 m",
      engine: "UTD-29M V10 diesel",
      horsepower: "500 hp",
      fuel: "700 litres",
      speed: "70 km/h",
      range: "600 km",
      enteredService: "1987, Soviet Union"
    },
    armament: [
      { section: "MAIN GUN", name: "100mm 2A70 rifled gun / missile launcher" },
      { section: "SECONDARY WEAPONS", name: "30mm 2A72 coaxial automatic cannon" },
      { section: "SECONDARY WEAPONS", name: "3 x 7.62mm PKT machine guns (coaxial and bow-mounted)" }
    ],
    protection: [
      { section: "ARMOUR", name: "Aluminum alloy hull with steel face appliqué panels" },
      { section: "PROTECTION SYSTEMS", name: "Arena or Shtora defensive countermeasure suites" },
      { section: "PROTECTION SYSTEMS", name: "Hydrojet amphibious water propulsion drives" }
    ],
    whats: {
      intro: "A low-slung, boxy tracked vehicle with a wide centered turret sporting two barrels clamped side-by-side.",
      cues: [
        { letter: "A", keyword: "BARRELS", description: "Distinctive dual-barrel assembly layout (one thick, one thin)" },
        { letter: "B", keyword: "DOORS", description: "Rear hull troop roof doors that flip upward" }
      ]
    },
    variants: [
      { name: "BMP-3M", year: 2005, label: "Upgraded modern configuration with digital fire control and a new engine" },
      { name: "Dragun", year: 2011, label: "Re-engineered variant shifting the engine block forward to create a standard rear troop ramp" }
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
      { url: "assets/images/warrior-003.jpg", stars: 3 },
      { url: "assets/images/warrior-004.jpg", stars: 3 },
      { url: "assets/images/warrior-005.jpg", stars: 1 },
      { url: "assets/images/warrior-006.jpg", stars: 3 },
      { url: "assets/images/warrior-007.webp", stars: 1 },
      { url: "assets/images/warrior-008.jpg", stars: 2 },
      { url: "assets/images/warrior-009.jpg", stars: 1 },
      { url: "assets/images/warrior-010.webp", stars: 1 },
      { url: "assets/images/warrior-011.jpg", stars: 3 }
    ],
    funFacts: [
      "The Warrior's armour was specifically designed to protect against 14.5mm heavy machine gun fire on all sides — much tougher than contemporary Soviet IFVs.",
      "During the 1991 Gulf War, Warriors advanced so quickly across the Iraqi desert that they outpaced the infantry they were supposed to be supporting.",
      "The Warrior can run on flat tyres — its road wheels are designed to keep the vehicle moving even after being punctured by shrapnel or small-arms fire."
    ],
    about: "The stalwart tracked infantry fighting vehicle of the British Army, designed to provide rugged battlefield survivability and mobility to mechanized infantry squads.",
    specs: {
      crew: "3 personnel (plus 7 passengers)",
      weight: "25.4 tonnes (up to 30.0+ tonnes with combat armor upgrades)",
      length: "6.34 m",
      width: "3.03 m",
      height: "2.79 m",
      engine: "Perkins CV8 TCA V8 diesel",
      horsepower: "550 hp",
      fuel: "770 litres",
      speed: "75 km/h",
      range: "660 km",
      enteredService: "1988, United Kingdom"
    },
    armament: [
      { section: "MAIN GUN", name: "30mm L21A1 RARDEN autocannon" },
      { section: "SECONDARY WEAPONS", name: "7.62mm L94A1 coaxial chain gun" },
      { section: "SMOKE", name: "2 x 4 smoke grenade dischargers" }
    ],
    protection: [
      { section: "ARMOUR", name: "All-welded aluminum armor skin with steel appliqué frames" },
      { section: "PROTECTION SYSTEMS", name: "Thick side-skirt armor arrays protecting tracks" },
      { section: "PROTECTION SYSTEMS", name: "Fire suppression system in engine and crew cabins" }
    ],
    whats: {
      intro: "A boxy, flat-roofed tracked vehicle with a small offset two-man turret and an external storage basket rack layout.",
      cues: [
        { letter: "A", keyword: "BARREL", description: "Long, slender 30mm barrel with a prominent cage-style flash hider" },
        { letter: "B", keyword: "DOOR", description: "Single flat rear access door" }
      ]
    },
    variants: [
      { name: "Warrior Desert Variant", year: 1990, label: "Equipped with enhanced cooling packs and Chobham appliqué armor plates" },
      { name: "Warrior CSP", year: 2018, label: "Capability Sustainment Programme prototype adding a fully stabilized 40mm cased telescoped weapon turret" }
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
      { url: "assets/images/cv90-003.jpg", stars: 3 },
      { url: "assets/images/cv90-004.jpg", stars: 1 },
      { url: "assets/images/cv90-005.webp", stars: 2 },
      { url: "assets/images/cv90-006.webp", stars: 3 },
      { url: "assets/images/cv90-007.png", stars: 2 },
      { url: "assets/images/cv90-008.jpg", stars: 1 },
      { url: "assets/images/cv90-009.jpg", stars: 3 }
    ],
    funFacts: [
      "The CV90 was designed to start its engine reliably at -40°C and operate in the deep snow of Nordic terrain, conditions that would stop most other IFVs.",
      "Its 40mm autocannon is one of the most powerful ever fitted to an IFV, capable of destroying lightly armoured vehicles at over 1,500 metres.",
      "The CV90 is one of the best-selling IFVs in the world, used by Norway, Sweden, Switzerland, Finland, the Netherlands, and Denmark."
    ],
    about: "A world-class family of tracked armored vehicles developed by Sweden, renowned for its incredible firepower options, stealth contours, and agility in winter terrain.",
    specs: {
      crew: "3 personnel (plus 7 passengers)",
      weight: "23.0 to 38.0 tonnes (depending on armor pack generation)",
      length: "6.55 m",
      width: "3.10 m",
      height: "2.70 m",
      engine: "Scania V8 diesel",
      horsepower: "550 to 1,000 hp (varies by block iteration)",
      fuel: "525 litres",
      speed: "70 km/h",
      range: "320 km",
      enteredService: "1993, Sweden"
    },
    armament: [
      { section: "MAIN GUN", name: "40mm Bofors autocannon (Swedish version) or 30mm/35mm Bushmaster (export versions)" },
      { section: "SECONDARY WEAPONS", name: "7.62mm coaxial machine gun" },
      { section: "MISSILES", name: "Anti-tank guided missile launchers (integrated into select modern turrets)" }
    ],
    protection: [
      { section: "ARMOUR", name: "Steel core composite matrix shell layer" },
      { section: "PROTECTION SYSTEMS", name: "Barracuda thermal signature management camouflage system" },
      { section: "PROTECTION SYSTEMS", name: "Hard-kill active protection system (optional modern variants)" }
    ],
    whats: {
      intro: "A highly geometric, sharp-edged tracked vehicle with an angled turret face and clean sloping chassis hulls.",
      cues: [
        { letter: "A", keyword: "CANNON", description: "Prominent heavy caliber autocannon barrel" },
        { letter: "B", keyword: "HULL", description: "Continuous crisp sloping hull lines from front nose to rear" }
      ]
    },
    variants: [
      { name: "CV9040", year: 1993, label: "Standard Swedish version carrying the hard-hitting 40mm Bofors cannon" },
      { name: "CV9035", year: 1998, label: "Export version carrying a 35mm Bushmaster chain gun and a taller turret ring" }
    ]
  },
  {
    id: "marder",
    name: "Marder",
    country: "Germany",
    category: "IFV",
    era: "Modern",
    images: [
      { url: "assets/images/marder-001.jpg", stars: 1 },
      { url: "assets/images/marder-002.jpg", stars: 2 },
      { url: "assets/images/marder-003.jpg", stars: 3 },
      { url: "assets/images/marder-004.jpg", stars: 1 },
      { url: "assets/images/marder-005.jpg", stars: 3 },
      { url: "assets/images/marder-006.jpg", stars: 3 },
      { url: "assets/images/marder-007.jpg", stars: 1 },
      { url: "assets/images/marder-008.webp", stars: 2 }
    ],
    funFacts: [
      "The Marder was one of the first true infantry fighting vehicles — designed not just to carry troops but to fight alongside them with its own heavy weapons.",
      "Its design placed such a priority on infantry protection that the troop compartment can withstand hits from 20mm rounds on all sides.",
      "The Marder has been continuously upgraded since its introduction in 1971 and remained in front-line German service for over 50 years."
    ],
    about: "A foundational pillar of Cold War West German armored vehicle design, the Marder was built to run alongside the Leopard 1 tank, establishing mechanized infantry tactics for the Bundeswehr.",
    specs: {
      crew: "3 personnel (plus 6 passengers)",
      weight: "33.5 tonnes (A3 standard combat weight)",
      length: "6.88 m",
      width: "3.38 m",
      height: "3.02 m",
      engine: "MTU MB 833 Ea-500 6-cylinder diesel",
      horsepower: "600 hp",
      fuel: "650 litres",
      speed: "65 km/h",
      range: "500 km",
      enteredService: "1971, West Germany"
    },
    armament: [
      { section: "MAIN GUN", name: "20mm Rheinmetall Rh-202 automatic cannon" },
      { section: "MISSILES", name: "MILAN anti-tank guided missile launcher (stationed at the commander's hatch)" },
      { section: "SECONDARY WEAPONS", name: "7.62mm MG3 coaxial machine gun" }
    ],
    protection: [
      { section: "ARMOUR", name: "All-welded steel plates shielding against 14.5mm armor-piercing ammunition" },
      { section: "PROTECTION SYSTEMS", name: "Add-on spaced rubber shock-absorbing armor panels (A3 variant onwards)" },
      { section: "PROTECTION SYSTEMS", name: "Standard interior overpressure chemical NBC system" }
    ],
    whats: {
      intro: "A long, steeply pitched tracked vehicle with a small, narrow weapon pod turret sitting on a highly angular hull frame.",
      cues: [
        { letter: "A", keyword: "EXHAUST", description: "Sloping nose layout with the engine exhaust grill mounted on the front right flank" },
        { letter: "B", keyword: "TURRET", description: "External exposed open weapon cradle on the small turret" }
      ]
    },
    variants: [
      { name: "Marder 1A1", year: 1979, label: "Introduced dual-feed system autocannons and passive night vision arrays" },
      { name: "Marder 1A3", year: 1988, label: "Heavily up-armored model featuring bolt-on armor plates; eliminates the old hull side firing ports" }
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
      { url: "assets/images/bmp1-003.jpg", stars: 3 },
      { url: "assets/images/bmp1-004.jpg", stars: 1 },
      { url: "assets/images/bmp1-005.jpg", stars: 1 },
      { url: "assets/images/bmp1-006.jpg", stars: 3 },
      { url: "assets/images/bmp1-007.webp", stars: 1 },
      { url: "assets/images/bmp1-008.jpg", stars: 3 },
      { url: "assets/images/bmp1-009.jpg", stars: 2 },
      { url: "assets/images/bmp1-010.jpg", stars: 2 }
    ],
    funFacts: [
      "Introduced in 1966, the BMP-1 was the world's first true infantry fighting vehicle — combining troop transport, armour, and direct fire support in one platform.",
      "Its 73mm low-pressure gun could fire HEAT rounds capable of penetrating early NATO tanks at close range, making the BMP-1 a serious threat far beyond a typical APC.",
      "The BMP-1 has been used in nearly every major conflict since the 1973 Yom Kippur War, with over 20,000 built and many still in service today."
    ],
    about: "The world's first mass-produced infantry fighting vehicle, revolutionizing mechanized warfare by combining low-profile transport with an anti-tank gun and missile.",
    specs: {
      crew: "3 personnel (plus 8 passengers)",
      weight: "13.2 tonnes",
      length: "6.73 m",
      width: "2.94 m",
      height: "2.06 m",
      engine: "UTD-20 V6 diesel",
      horsepower: "300 hp",
      fuel: "462 litres",
      speed: "65 km/h",
      range: "500 km",
      enteredService: "1966, Soviet Union"
    },
    armament: [
      { section: "MAIN GUN", name: "73mm 2A28 Grom low-pressure smoothbore gun" },
      { section: "MISSILES", name: "9M14 Malyutka (AT-3 Sagger) wire-guided anti-tank missile rail mount" },
      { section: "SECONDARY WEAPONS", name: "7.62mm PKT coaxial machine gun" }
    ],
    protection: [
      { section: "ARMOUR", name: "Highly sloped thin rolled homogeneous steel plate armor" },
      { section: "PROTECTION SYSTEMS", name: "Low physical silhouette presentation mask" },
      { section: "PROTECTION SYSTEMS", name: "Collective NBC system filters" }
    ],
    whats: {
      intro: "An ultra-low tracked vehicle with a long, multi-ribbed forward engine deck and a very small cone turret.",
      cues: [
        { letter: "A", keyword: "GUN", description: "Short, stubby main gun barrel" },
        { letter: "B", keyword: "DOORS", description: "Track-integrated rear cabin doors fitted with dual glass viewing vision blocks" }
      ]
    },
    variants: [
      { name: "BMP-1P", year: 1979, label: "Upgraded version swapping out the old Sagger rail for a pintle-mounted Fagot/Konkurs ATGM system" },
      { name: "BMP-1 AM Basurmanin", year: 2015, label: "Modern Russian overhaul replacing the old turret with an open 30mm BTR-82A gun pod module" }
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
      { url: "assets/images/puma-003.jpg", stars: 3 },
      { url: "assets/images/puma-004.jpg", stars: 1 },
      { url: "assets/images/puma-005.webp", stars: 3 },
      { url: "assets/images/puma-006.webp", stars: 2 },
      { url: "assets/images/puma-007.jpg", stars: 1 }
    ],
    funFacts: [
      "The Puma is one of the most heavily protected IFVs ever built — its modular armour can be upgraded in the field from 'Combat Light' (38 tonnes, air-transportable) to 'Combat' (43 tonnes, maximum protection).",
      "Its turret is unmanned — the gunner and commander sit inside the hull, removing the most exposed crew positions from harm's way.",
      "Germany's Puma development programme cost over 10 billion euros, making it one of the most expensive IFVs per unit ever fielded."
    ],
    about: "One of the most technologically advanced and heavily armored infantry fighting vehicles in service today, the Puma is built around modular security packages and an unmanned turret.",
    specs: {
      crew: "3 personnel (plus 6 passengers)",
      weight: "31.4 tonnes (Level A baseline) or 43.0 tonnes (Level C fully up-armored configuration)",
      length: "7.40 m",
      width: "3.70 m",
      height: "3.10 m (to turret roof)",
      engine: "MTU MT 892 Ka-501 V10 diesel",
      horsepower: "1,088 hp",
      fuel: "900 litres",
      speed: "70 km/h",
      range: "600 km",
      enteredService: "2015, Germany"
    },
    armament: [
      { section: "MAIN GUN", name: "30mm Mauser MK 30-2/ABM airburst-capable autocannon" },
      { section: "SECONDARY WEAPONS", name: "5.56mm HK MG4 or 7.62mm MG5 coaxial machine gun" },
      { section: "MISSILES", name: "Spike-LR anti-tank guided missile launcher assembly" }
    ],
    protection: [
      { section: "ARMOUR", name: "AMAP advanced modular composite armor array blocks" },
      { section: "PROTECTION SYSTEMS", name: "MUSS (Multifunctional Self-Protection System) soft-kill missile countermeasure suite" },
      { section: "PROTECTION SYSTEMS", name: "Decoupled mine-resistant floor structure plates" }
    ],
    whats: {
      intro: "A massive, highly futuristic tracked vehicle with blocky, geometric armor plating and a compact uncrewed turret centered on the roof.",
      cues: [
        { letter: "A", keyword: "TURRET", description: "Unmanned turret layout offset to the left" },
        { letter: "B", keyword: "OPTICS", description: "Prominent cylindrical optronic sensor mast" },
        { letter: "C", keyword: "ARMOUR", description: "Massive multi-layered block armor flanks" }
      ]
    },
    variants: [
      { name: "Puma Level A", year: 2015, label: "Air-transportable baseline weight configuration designed for loading inside an Airbus A400M" },
      { name: "Puma Level C", year: 2015, label: "Heavy combat configuration outfitted with thick composite side blocks and turret roof protection modules" }
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
      { url: "assets/images/k21-003.jpg", stars: 3 },
      { url: "assets/images/k21-004.webp", stars: 1 },
      { url: "assets/images/k21-005.jpg", stars: 1 },
      { url: "assets/images/k21-006.jpg", stars: 3 },
      { url: "assets/images/k21-007.jpg", stars: 2 },
      { url: "assets/images/k21-008.jpg", stars: 3 }
    ],
    funFacts: [
      "South Korea's K21 uses inflatable pontoons that deploy from the hull on demand, giving it enough buoyancy to swim across rivers without preparation.",
      "Its 40mm autocannon is one of the few fitted to any IFV that can engage tanks frontally at close range using armour-piercing rounds.",
      "The K21 is built largely from glass-fibre composite to keep weight down, making it air-transportable by C-17 and giving it excellent cross-country agility."
    ],
    about: "South Korea's premier tracked infantry fighting vehicle, meticulously optimized to achieve lightweight amphibious operation and high autocannon fire rates.",
    specs: {
      crew: "3 personnel (plus 9 passengers)",
      weight: "25.6 tonnes",
      length: "6.90 m",
      width: "3.40 m",
      height: "2.60 m",
      engine: "Doosan D2840LXE V10 diesel",
      horsepower: "750 hp",
      fuel: "500 litres",
      speed: "70 km/h",
      range: "500 km",
      enteredService: "2009, South Korea"
    },
    armament: [
      { section: "MAIN GUN", name: "40mm S&T Dynamics K40 automatic cannon" },
      { section: "MISSILES", name: "Twin anti-tank guided missile launcher pod" },
      { section: "SECONDARY WEAPONS", name: "7.62mm coaxial machine gun" }
    ],
    protection: [
      { section: "ARMOUR", name: "Fiberglass-reinforced layered composite matrix armor skin" },
      { section: "PROTECTION SYSTEMS", name: "Inflatable side pontoon flotation screens" },
      { section: "PROTECTION SYSTEMS", name: "Laser warning receivers linked to smoke salvos" }
    ],
    whats: {
      intro: "A blocky, broad tracked vehicle with a wide angular two-man turret carrying a prominent heavy-caliber autocannon.",
      cues: [
        { letter: "A", keyword: "SKIRTS", description: "Wide side-skirt panels housing the internal inflatable bags" },
        { letter: "B", keyword: "OPTICS", description: "Square modern optronic optics blocks above the gun shield" }
      ]
    },
    variants: [
      { name: "K21 IFV", year: 2009, label: "Standard operational army configuration variant" },
      { name: "AS21 Redback", year: 2018, label: "Heavily up-armored derivative variant built specifically for the Australian Army upgrade program" }
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
    ],
    about: "China's frontline tracked infantry fighting vehicle, featuring a Russian-style dual 100mm/30mm weapon turret mated to an improved domestic armor chassis.",
    specs: {
      crew: "3 personnel (plus 7 passengers)",
      weight: "24.0 tonnes",
      length: "7.20 m",
      width: "3.20 m",
      height: "2.50 m",
      engine: "Turbocharged diesel",
      horsepower: "600 hp",
      fuel: "600 litres",
      speed: "65 km/h",
      range: "500 km",
      enteredService: "2014, China"
    },
    armament: [
      { section: "MAIN GUN", name: "100mm semi-automatic rifled gun / missile launcher" },
      { section: "SECONDARY WEAPONS", name: "30mm coaxial autocannon" },
      { section: "SECONDARY WEAPONS", name: "7.62mm coaxial machine gun" }
    ],
    protection: [
      { section: "ARMOUR", name: "Hardened steel armor with modular ceramic bolt-on panels" },
      { section: "PROTECTION SYSTEMS", name: "Laser countermeasure and warning device array" },
      { section: "PROTECTION SYSTEMS", name: "Detachable track side armor sheets" }
    ],
    whats: {
      intro: "A long tracked vehicle with flat bolt-on armor panel flanks and a wide turret displaying two distinct barrels protruding together.",
      cues: [
        { letter: "A", keyword: "BARRELS", description: "Double gun barrel pairing layout" },
        { letter: "B", keyword: "HULL", description: "Square bolt patterns along the hull flanks with high crisp nose ridge lines" }
      ]
    },
    variants: [
      { name: "ZBD-04", year: 2004, label: "Original baseline light variant with an un-stepped amphibious nose shape" },
      { name: "ZBD-04A", year: 2014, label: "The modernized heavy variant featuring flat boxy bolt-on side skirts" }
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
    ],
    about: "The most widely used Western self-propelled howitzer in history, the M109 delivers mobile heavy fire support via a 155mm cannon mounted inside a massive fully rotating turret.",
    specs: {
      crew: "6 personnel (reduced to 4 on modernized variants)",
      weight: "27.5 tonnes",
      length: "9.12 m",
      width: "3.15 m",
      height: "3.27 m",
      engine: "Detroit Diesel 8V71T supercharged engine",
      horsepower: "450 hp",
      fuel: "511 litres",
      speed: "56 km/h",
      range: "350 km",
      enteredService: "1963, United States"
    },
    armament: [
      { section: "MAIN GUN", name: "155mm M126 Howitzer cannon (or M284 long-barrel on later variants)" },
      { section: "SECONDARY WEAPONS", name: "12.7mm M2HB roof-mounted heavy defense machine gun" }
    ],
    protection: [
      { section: "ARMOUR", name: "32mm welded structural aluminum core hull skin" },
      { section: "PROTECTION SYSTEMS", name: "Secure internal hydraulic ammunition storage configurations" },
      { section: "PROTECTION SYSTEMS", name: "Dual massive rear ground-anchor stabilizing spades" }
    ],
    whats: {
      intro: "A tall, wide tracked vehicle with an oversized box-shaped turret and a massive heavy artillery barrel ending in a dual-baffle muzzle brake.",
      cues: [
        { letter: "A", keyword: "TURRET", description: "Large square hatch doors at the rear of the turret for loading ammunition shells" },
        { letter: "B", keyword: "WHEELS", description: "Seven road wheels per side with no return rollers" }
      ]
    },
    variants: [
      { name: "M109A2", year: 1979, label: "Introduced a longer barrel layout with improved ammunition blast storage" },
      { name: "M109A6 Paladin", year: 1991, label: "Deep modernization featuring an automated fire control computer system, allowing it to halt and fire within 30 seconds" }
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
    ],
    about: "A pinnacle of modern artillery engineering, the Panzerhaubitze 2000 is a fully automated 155mm system capable of immense rapid-fire bursts and multiple-round simultaneous impact target missions.",
    specs: {
      crew: "5 personnel (can operate with 3 in automated combat modes)",
      weight: "55.8 tonnes",
      length: "11.70 m",
      width: "3.60 m",
      height: "3.10 m",
      engine: "MTU MT881 Ka-500 supercharged diesel",
      horsepower: "986 hp",
      fuel: "1,000 litres",
      speed: "67 km/h",
      range: "420 km",
      enteredService: "1998, Germany"
    },
    armament: [
      { section: "MAIN GUN", name: "Rheinmetall 155mm L52 chromium-lined artillery gun" },
      { section: "SECONDARY WEAPONS", name: "7.62mm Rheinmetall MG3 roof defense machine gun" },
      { section: "SMOKE", name: "2 x 4 smoke grenade launchers" }
    ],
    protection: [
      { section: "ARMOUR", name: "All-welded steel armor core resistant to 14.5mm direct fires" },
      { section: "PROTECTION SYSTEMS", name: "Turret roof blanket armor specifically designed to defeat top-attack cluster bomblets" },
      { section: "PROTECTION SYSTEMS", name: "Full automated internal NBC collective overpressure seals" }
    ],
    whats: {
      intro: "An immense, tank-sized tracked artillery vehicle with an ultra-long barrel that extends far past the vehicle's front hull line.",
      cues: [
        { letter: "A", keyword: "BARREL", description: "Long 52-caliber gun barrel with an integrated fume extractor midway down" },
        { letter: "B", keyword: "TURRET", description: "A boxy turret featuring slanted side panel wedges" }
      ]
    },
    variants: [
      { name: "PzH 2000 A2", year: 2010, label: "Upgraded model adding an independent auxiliary power unit and crew cooling ventilation systems" },
      { name: "PzH 2000 A5", year: 2020, label: "Modernized digital framework upgrade featuring an advanced ammunition automated loader terminal" }
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
    ],
    about: "Designed to replace the aging Akatsiya platforms, the 2S19 Msta utilizes a heavy tracked chassis derived from T-72 and T-80 components to deploy a rapid-firing 152mm gun system.",
    specs: {
      crew: "5 personnel (plus 2 ground ammunition loaders when stationary)",
      weight: "42.0 tonnes",
      length: "11.92 m",
      width: "3.58 m",
      height: "2.98 m",
      engine: "V-84A 12-cylinder multi-fuel diesel",
      horsepower: "840 hp",
      fuel: "850 litres",
      speed: "60 km/h",
      range: "500 km",
      enteredService: "1989, Soviet Union"
    },
    armament: [
      { section: "MAIN GUN", name: "152mm 2A64 long-range rifled howitzer" },
      { section: "SECONDARY WEAPONS", name: "Remote-operated 12.7mm NSVT roof anti-aircraft machine gun" },
      { section: "SMOKE", name: "6 x turret-mounted smoke grenade dischargers" }
    ],
    protection: [
      { section: "ARMOUR", name: "Welded steel plating shielding against small arms and shell splinters" },
      { section: "PROTECTION SYSTEMS", name: "Internal armored separation walls dividing the shell and charge rooms" },
      { section: "PROTECTION SYSTEMS", name: "Automatic fire suppression sensors" }
    ],
    whats: {
      intro: "A long, imposing tracked artillery system featuring a high-clearance main chassis running a massive, high-angle turret block.",
      cues: [
        { letter: "A", keyword: "CLAMP", description: "Distinctive dual-spring travel lock bracket clamp fixed onto the center nose glacis plate to secure the gun barrel during transit" }
      ]
    },
    variants: [
      { name: "2S19M1", year: 2006, label: "Upgraded model integrating an automated digital lay computer system and satellite guidance mapping" },
      { name: "2S19M2", year: 2013, label: "Heavily modernized variant updating the piece to a higher 8-round-per-minute rate of fire with advanced thermal signature shrouds" }
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
    ],
    about: "A lightweight, highly mobile self-propelled howitzer mounted on a 6×6 civilian truck chassis, engineered for rapid deployment and fast relocation in contemporary operations.",
    specs: {
      crew: "5 personnel (commander, gunner, 2 ammunition handlers, driver)",
      weight: "18.0 tonnes (complete combat configuration)",
      length: "10.26 m (overall with gun deployed)",
      width: "2.55 m",
      height: "3.35 m (full combat height with barrel extended)",
      engine: "Renault MIDS 6-cylinder turbocharged diesel",
      horsepower: "320 hp",
      fuel: "360 litres",
      speed: "90 km/h (on paved surfaces)",
      range: "650 km",
      enteredService: "1994, France"
    },
    armament: [
      { section: "MAIN GUN", name: "155mm/52 Calibre howitzer gun mounted inside the reinforced cargo bed turret" },
      { section: "SECONDARY WEAPONS", name: "12.7mm machine gun on flexible roof mounting" }
    ],
    protection: [
      { section: "ARMOUR", name: "Ballistic steel crew cabin and gun turret protecting against artillery fragmentation and small arms fire" },
      { section: "PROTECTION SYSTEMS", name: "Sprinkler systems for chemical/biological defense contamination control" }
    ],
    whats: {
      intro: "A compact, low-slung truck with a central gun turret occupying most of the cargo bed, painted in camouflage.",
      cues: [
        { letter: "A", keyword: "TURRET", description: "Box-like elevated gun turret dominating the truck cargo section" },
        { letter: "B", keyword: "WHEELS", description: "Six large road wheels in a 6×6 civilian truck configuration" }
      ]
    },
    variants: [
      { name: "CAESAR Gun System", year: 1994, label: "Standard French Army variant with indigenous fire-control systems" },
      { name: "CAESAR NG (Next Generation)", year: 2020, label: "Modern upgrade variant with advanced digital systems and improved targeting capabilities" }
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
    ],
    about: "South Korea's most successful self-propelled howitzer export, the K9 Thunder is a full-tracked, fully automated platform engineered for rapid sustained firepower in modern mechanized warfare.",
    specs: {
      crew: "5 personnel (commander, driver, gunner, 2 ammunition handlers)",
      weight: "47.0 tonnes",
      length: "9.40 m (gun pointing forward)",
      width: "3.23 m",
      height: "2.27 m (gun barrel horizontal)",
      engine: "MTU 8V183 turbocharged diesel",
      horsepower: "1,200 hp",
      fuel: "1,000 litres",
      speed: "67 km/h",
      range: "480 km",
      enteredService: "1999, South Korea"
    },
    armament: [
      { section: "MAIN GUN", name: "155mm/52 Calibre self-loading howitzer gun mounted in a fully automated turret" },
      { section: "SECONDARY WEAPONS", name: "12.7mm coaxial machine gun" }
    ],
    protection: [
      { section: "ARMOUR", name: "All-welded steel armor hull and turret protecting against artillery fragmentation" },
      { section: "PROTECTION SYSTEMS", name: "Automatic fire detection and suppression system integrated throughout the vehicle" }
    ],
    whats: {
      intro: "A squared, heavily armored tracked gun platform with a central enclosed turret and a long, thin gun barrel pointing ahead.",
      cues: [
        { letter: "A", keyword: "TURRET", description: "Blocky rectangular turret superstructure on a low tracked chassis" },
        { letter: "B", keyword: "GUN", description: "Long 52-calibre gun barrel protruding from the turret center" }
      ]
    },
    variants: [
      { name: "K9", year: 1999, label: "The original production version fielded by the South Korean Army" },
      { name: "K9 Vajra", year: 2011, label: "Indian-built variant with specialized high-altitude environmental adaptations" }
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
    ],
    about: "The British Army's primary self-propelled howitzer, the AS-90 is a full-tracked platform featuring an automated turret with minimal crew exposure, optimized for rapid deployment and sustained fire.",
    specs: {
      crew: "5 personnel (driver, commander, gunner, 2 ammunition handlers inside turret)",
      weight: "45.0 tonnes",
      length: "9.06 m (gun pointing forward)",
      width: "3.30 m",
      height: "2.43 m",
      engine: "Perkins CV12 turbocharged diesel V12",
      horsepower: "1,260 hp",
      fuel: "1,500 litres",
      speed: "56 km/h",
      range: "300 km (limited by fuel capacity)",
      enteredService: "1993, United Kingdom"
    },
    armament: [
      { section: "MAIN GUN", name: "155mm/39 Calibre self-loading howitzer mounted in a rotating armored turret" },
      { section: "SECONDARY WEAPONS", name: "7.62mm coaxial machine gun" }
    ],
    protection: [
      { section: "ARMOUR", name: "All-welded steel armor hull and fully enclosed turret protecting crew from fragmentation" },
      { section: "PROTECTION SYSTEMS", name: "Automatic fire suppression sprinkler system for ammunition storage" }
    ],
    whats: {
      intro: "A low-profile tracked gun with a single angular turret and long artillery barrel, painted in camo patterns.",
      cues: [
        { letter: "A", keyword: "TURRET", description: "Large squared turret structure sitting atop a compact tracked hull" },
        { letter: "B", keyword: "GUN", description: "Medium-length gun barrel protruding straight forward from the turret" }
      ]
    },
    variants: [
      { name: "AS-90", year: 1993, label: "The original production variant fielded by the British Army" },
      { name: "AS-90 Mark II", year: 2018, label: "Upgraded variant with enhanced fire-control systems and targeting computers" }
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
    ],
    about: "The M270 Multiple Launch Rocket System is a tracked artillery platform capable of rapid area saturation, firing twelve guided missiles in rapid succession to blanket targets with submunitions.",
    specs: {
      crew: "3 personnel (driver, section chief, ammunition specialist)",
      weight: "25.4 tonnes (combat loaded weight)",
      length: "6.85 m (launcher pod closed)",
      width: "2.97 m",
      height: "2.26 m (pod stowed, gun pointing forward)",
      engine: "Cummins VTA903 turbocharged diesel",
      horsepower: "500 hp",
      fuel: "530 litres",
      speed: "65 km/h",
      range: "560 km",
      enteredService: "1983, United States"
    },
    armament: [
      { section: "MISSILES", name: "12 x MGM-140 ATACMS or other guided tactical missiles in a pod" },
      { section: "MISSILES", name: "Alternative: MLRS guided rocket rounds (up to 12 per pod reload)" }
    ],
    protection: [
      { section: "ARMOUR", name: "Welded aluminum alloy hull with spall liners protecting the crew compartment" },
      { section: "PROTECTION SYSTEMS", name: "NBC chemical and biological defense filtration systems" }
    ],
    whats: {
      intro: "A tracked vehicle with a large rectangular launcher pod mounted on the rear, capable of rotating and elevating to point towards targets.",
      cues: [
        { letter: "A", keyword: "POD", description: "Large square launcher pod dominating the rear superstructure" },
        { letter: "B", keyword: "CHASSIS", description: "Bradley-derived tracked chassis underneath the launcher system" }
      ]
    },
    variants: [
      { name: "M270 MLRS", year: 1983, label: "Original MLRS variant with dual-arm launcher pod system" },
      { name: "M270A1", year: 2002, label: "Modernized variant with advanced digital fire control and GPS guidance integration" }
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
    ],
    about: "The Soviet Union's largest self-propelled howitzer, the 2S7 Pion mounts a massive 203mm gun on a tracked chassis, delivering continent-spanning firepower with strategic capabilities.",
    specs: {
      crew: "7 personnel (driver, commander, gunner, loader, 3 ammunition handlers)",
      weight: "64.0 tonnes (full combat configuration)",
      length: "11.41 m (gun horizontal)",
      width: "3.38 m",
      height: "2.75 m",
      engine: "V-12 turbocharged diesel",
      horsepower: "900 hp",
      fuel: "1,000 litres",
      speed: "50 km/h",
      range: "420 km",
      enteredService: "1975, Soviet Union"
    },
    armament: [
      { section: "MAIN GUN", name: "203mm gun with a half-automatic hydraulic loader system" },
      { section: "SECONDARY WEAPONS", name: "12.7mm anti-aircraft machine gun on roof mounting" }
    ],
    protection: [
      { section: "ARMOUR", name: "Welded steel hull and gun turret structure protecting crew from fragmentation" },
      { section: "PROTECTION SYSTEMS", name: "Pressurized crew compartment with NBC defense systems" }
    ],
    whats: {
      intro: "An enormous, heavily armored tracked gun platform with a distinctively massive turret and very long gun barrel, designed for maximum firepower.",
      cues: [
        { letter: "A", keyword: "GUN", description: "Exceptionally thick and long 203mm gun barrel protruding far forward" },
        { letter: "B", keyword: "TURRET", description: "Massive rounded turret structure with heavy armor plating" }
      ]
    },
    variants: [
      { name: "2S7 Pion", year: 1975, label: "The original Soviet production variant with analog fire-control systems" },
      { name: "2S7M Malka", year: 1990, label: "Modernized variant with improved digital targeting and semi-automated systems" }
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
    ],
    about: "A towed 155mm howitzer engineered for extreme lightness through titanium construction, making it unique as the world's lightest 155mm artillery piece while maintaining battlefield effectiveness.",
    specs: {
      crew: "6 personnel (chief, gunner, ammunition handlers, assistant gunner, driver)",
      weight: "4.2 tonnes (remarkably light for a 155mm gun)",
      length: "9.14 m (in-battery position)",
      width: "2.77 m",
      height: "2.30 m",
      engine: "Not applicable - towed artillery (towed by tactical vehicle)",
      horsepower: "N/A",
      fuel: "Requires towing vehicle with 300+ hp",
      speed: "60+ km/h (when towed by appropriate vehicle)",
      range: "600 km (extended range with ammunition resupply)",
      enteredService: "2005, United States"
    },
    armament: [
      { section: "MAIN GUN", name: "155mm/39 calibre rifled howitzer with semi-automatic breech" },
      { section: "AMMUNITION", name: "Fires standard NATO 155mm shells including Excalibur GPS-guided rounds" }
    ],
    protection: [
      { section: "PROTECTION", name: "Crew protection limited to helmet and body armor - towed design offers minimal built-in armor" },
      { section: "PROTECTION SYSTEMS", name: "Emergency egress positions and dispersal capabilities" }
    ],
    whats: {
      intro: "A bare, lightweight 155mm gun assembly on a small towed trailer with large elevation wheels, designed for minimal weight and maximum portability.",
      cues: [
        { letter: "A", keyword: "WHEELS", description: "Oversized elevation and traversal hand-crank wheel mechanisms" },
        { letter: "B", keyword: "BARREL", description: "Thin, long gun barrel with muzzle brake prominently visible" }
      ]
    },
    variants: [
      { name: "M777A1", year: 2005, label: "Original production variant with titanium construction and manual aiming systems" },
      { name: "M777A2", year: 2012, label: "Enhanced variant with digital fire-control capability and integrated GPS targeting" }
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
    ],
    about: "China's primary self-propelled howitzer, the PLZ-05 represents a modern evolution of Soviet design principles, featuring full automation and compatibility with NATO ammunition standards.",
    specs: {
      crew: "5 personnel (driver, commander, gunner, 2 ammunition handlers)",
      weight: "48.0 tonnes",
      length: "10.54 m (gun pointing forward)",
      width: "3.43 m",
      height: "2.90 m",
      engine: "Diesel turbocharged inline-6",
      horsepower: "1,200 hp",
      fuel: "1,000 litres",
      speed: "61 km/h",
      range: "500 km",
      enteredService: "2005, China"
    },
    armament: [
      { section: "MAIN GUN", name: "155mm/52 Calibre self-loading howitzer mounted in rotating automated turret" },
      { section: "SECONDARY WEAPONS", name: "12.7mm coaxial machine gun" }
    ],
    protection: [
      { section: "ARMOUR", name: "All-welded steel armor hull and fully enclosed turret structure" },
      { section: "PROTECTION SYSTEMS", name: "Automatic fire detection and suppression system protecting ammunition storage areas" }
    ],
    whats: {
      intro: "A boxy, heavily armored tracked gun platform with a central enclosed turret and long gun barrel, similar in profile to Russian self-propelled howitzers.",
      cues: [
        { letter: "A", keyword: "TURRET", description: "Large rectangular turret structure with distinctive sloped sides" },
        { letter: "B", keyword: "GUN", description: "Long 52-calibre gun barrel with muzzle brake visible" }
      ]
    },
    variants: [
      { name: "PLZ-05", year: 2005, label: "Standard Chinese production variant with NATO ammunition compatibility" },
      { name: "PLZ-05B", year: 2015, label: "Enhanced variant featuring automated fire control and satellite-guided munition capability" }
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
    ],
    about: "The definitive Western attack helicopter, the Apache is an armored tandem-seat twin-engine platform engineered to locate and destroy heavy armor formations in any weather environment.",
    specs: {
      crew: "2 personnel (Pilot in rear cockpit, Co-pilot/Gunner in front cockpit)",
      weight: "5,160 kg (empty weight) or up to 10,432 kg max takeoff weight",
      length: "17.70 m (overall with rotors turning)",
      width: "4.80 m (stub wing span)",
      height: "3.87 m",
      engine: "2 x General Electric T700-GE-701C turboshaft engines",
      horsepower: "3,780 hp total (1,890 hp per engine)",
      fuel: "1,420 litres (internal capacity)",
      speed: "293 km/h",
      range: "480 km",
      enteredService: "1984, United States"
    },
    armament: [
      { section: "MAIN GUN", name: "30mm M230 automatic chain gun (1,200 rounds)" },
      { section: "MISSILES", name: "Up to 16 x AGM-114 Hellfire laser-guided anti-tank missiles" },
      { section: "ROCKETS", name: "Hydra 70 70mm folding-fin aerial rocket pods" }
    ],
    protection: [
      { section: "ARMOUR", name: "Lightweight Kevlar-lined titanium crew survival tub structure" },
      { section: "PROTECTION SYSTEMS", name: "Boron-composite armor cockpit dividers and blast shields" },
      { section: "SENSORS", name: "IHADSS integrated electronic thermal jamming countermeasures" }
    ],
    whats: {
      intro: "A narrow, aggressive attack helicopter with a prominent chin-mounted gun pod, small weapon-carrying stub wings, and two massive engine nacelles clamped tightly to its upper back.",
      cues: [
        { letter: "A", keyword: "COCKPITS", description: "Step-up tandem glass bubble cockpits" },
        { letter: "B", keyword: "WINGS", description: "Short mid-mounted weapon pylons" },
        { letter: "C", keyword: "GUN", description: "A heavy mechanical gun dangling behind the front nose gear" }
      ]
    },
    variants: [
      { name: "AH-64A", year: 1984, label: "The original base production version deployed during the Cold War era" },
      { name: "AH-64D Longbow", year: 1997, label: "Features a highly distinct circular millimeter-wave radar dome mounted directly on top of the main rotor mast" }
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
    ],
    about: "A unique Cold War hybrid design, the Mi-24 'Hind' functions as both a heavily armed attack gunship and a light armored infantry transport capable of inserting a squad of troops.",
    specs: {
      crew: "2 to 3 personnel (plus 8 fully equipped combat soldiers in the center hold)",
      weight: "8,500 kg (empty) or 12,000 kg max takeoff mass",
      length: "17.50 m (fuselage length)",
      width: "6.50 m (stub wing span)",
      height: "6.50 m",
      engine: "2 x Klimov TV3-117 turboshaft engines",
      horsepower: "4,400 hp total (2,200 hp per engine)",
      fuel: "1,500 litres",
      speed: "335 km/h",
      range: "450 km (extends to 950 km with external drop tanks)",
      enteredService: "1972, Soviet Union"
    },
    armament: [
      { section: "MAIN GUN", name: "12.7mm Yak-B four-barrel rotary nose machine gun (or fixed twin 30mm side cannon on Hind-F)" },
      { section: "MISSILES", name: "9M114 Shturm (AT-6 Spiral) radio-guided anti-tank missiles" },
      { section: "ROCKETS", name: "S-8 80mm unguided aerial rocket launcher pods" }
    ],
    protection: [
      { section: "ARMOUR", name: "Steel and titanium cockpit shell armor plates resistant to 12.7mm rounds" },
      { section: "PROTECTION SYSTEMS", name: "Ballistic-resistant glass canopy bubbles" },
      { section: "PROTECTION SYSTEMS", name: "Fully overpressurized collective interior NBC defense suite" }
    ],
    whats: {
      intro: "A massive, bulking attack helicopter with distinctive downward-canted stub wings and an enlarged passenger fuselage midsection.",
      cues: [
        { letter: "A", keyword: "COCKPITS", description: "Double-bubble separate canopy cockpits (on D variants and up)" },
        { letter: "B", keyword: "WINGS", description: "Prominent forward-swept wing pylons creating a broad shoulder profile" }
      ]
    },
    variants: [
      { name: "Mi-24D Hind-D", year: 1973, label: "Introduced the iconic stepped tandem double bubble cockpit canopy layout" },
      { name: "Mi-24P Hind-F", year: 1981, label: "Swapped out the movable nose gun for a fixed, devastating double-barrel 30mm autocannon bolted to the starboard fuselage side" }
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
    ],
    about: "The premier medium-lift tactical transport asset of the US military, the Black Hawk is a rugged, low-profile helicopter engineered to deliver air assault squads into hot landing zones.",
    specs: {
      crew: "2 Pilots (plus 1 to 2 crew chiefs/door gunners, and 11 fully armed soldiers in the back)",
      weight: "5,224 kg (empty) or up to 9,979 kg max tactical mission configuration",
      length: "19.76 m (overall with rotors turning)",
      width: "2.36 m (cabin body width)",
      height: "5.13 m",
      engine: "2 x General Electric T700-GE-701C turboshaft engines",
      horsepower: "3,780 hp total (1,890 hp per engine)",
      fuel: "1,360 litres (internal tanks)",
      speed: "294 km/h",
      range: "584 km (extends beyond 1,600 km using ESSS external wing auxiliary cells)",
      enteredService: "1979, United States"
    },
    armament: [
      { section: "SECONDARY WEAPONS", name: "2 x 7.62mm M134 Miniguns or M60D machine guns mounted in cabin windows" },
      { section: "MISSILES", name: "Optional ESSS external wings carrying Hellfire missile clusters" }
    ],
    protection: [
      { section: "ARMOUR", name: "Heavy armor-plated crew seats and cockpit floor mats" },
      { section: "PROTECTION SYSTEMS", name: "Ballistic-tolerant main rotor spars constructed with titanium cores" },
      { section: "PROTECTION SYSTEMS", name: "Self-sealing, crash-resistant internal fuel cell architecture" }
    ],
    whats: {
      intro: "A long, slender, low-profile utility helicopter resting on a rugged fixed wheel landing gear with a lengthy passenger cabin box.",
      cues: [
        { letter: "A", keyword: "ROTORS", description: "Four swept-tip composite main rotor blades" },
        { letter: "B", keyword: "TAIL", description: "A distinctively canted tail rotor wheel trailing flat on the ground" }
      ]
    },
    variants: [
      { name: "UH-60A", year: 1979, label: "The initial original base model deployed during the late Cold War" },
      { name: "UH-60L", year: 1988, label: "Upgraded model outfitted with uprated engines and an enhanced high-durability main gearbox network" }
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
    ],
    about: "A distinctive twin-rotor heavy-lift cargo and troop transport helicopter, the Chinook's tandem rotor design eliminates the need for a tail rotor, providing unmatched payload capacity and operational versatility.",
    specs: {
      crew: "3 personnel (pilot, copilot, flight engineer) plus up to 55 troops in cargo configuration",
      weight: "9,185 kg (empty weight) or 22,680 kg max takeoff weight",
      length: "15.54 m (fuselage length, not including rotors)",
      width: "3.78 m",
      height: "4.09 m (to top of rear rotor mast)",
      engine: "2 x Lycoming T55-GA-712 turboshaft engines",
      horsepower: "6,680 hp total (3,340 hp per engine)",
      fuel: "2,392 litres (internal capacity)",
      speed: "315 km/h",
      range: "740 km (without auxiliary fuel)",
      enteredService: "1962, United States"
    },
    armament: [
      { section: "WEAPONS", name: "Two 7.62mm machine guns mounted in side-opening doors (optional installation)" },
      { section: "EXTERNAL LOAD", name: "Up to 12 tonnes of external cargo sling-loaded beneath the fuselage" }
    ],
    protection: [
      { section: "ARMOUR", name: "Titanium and steel airframe structure with ballistic-resistant crew cockpit shielding" },
      { section: "PROTECTION SYSTEMS", name: "Redundant hydraulic flight control systems with manual backup capability" }
    ],
    whats: {
      intro: "A large, bulky transport helicopter with two large rotors mounted on vertical pylons at the front and rear, a distinctive boxy fuselage, and open cargo access doors.",
      cues: [
        { letter: "A", keyword: "ROTORS", description: "Two large rotors prominently visible on vertical extended pylons at each end" },
        { letter: "B", keyword: "TAIL", description: "No tail rotor assembly — clean tapered tail boom instead" }
      ]
    },
    variants: [
      { name: "CH-47A/B", year: 1962, label: "Original production variants with analog control systems and lower horsepower engines" },
      { name: "CH-47F", year: 2007, label: "Modern variant featuring fully-digital avionics, glass cockpits, and significantly upgraded engines" }
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
    ],
    about: "A highly unique heavy attack platform, the Ka-52 is characterized by a distinct side-by-side cockpit layout and a signature dual contra-rotating coaxial main rotor assembly.",
    specs: {
      crew: "2 personnel (Pilot and Weapons System Operator seated shoulder-to-shoulder)",
      weight: "7,700 kg (empty) or 10,800 kg max takeoff weight",
      length: "16.00 m",
      width: "7.30 m (stub wing span)",
      height: "4.93 m",
      engine: "2 x Klimov TV3-117VMA turboshaft engines",
      horsepower: "4,400 hp total (2,200 hp per engine)",
      fuel: "1,500 kg (approx. 1,900 litres internal)",
      speed: "310 km/h",
      range: "520 km",
      enteredService: "2011, Russia"
    },
    armament: [
      { section: "MAIN GUN", name: "30mm 2A42 automatic cannon (mounted on the starboard hull flank)" },
      { section: "MISSILES", name: "Up to 12 x 9K121 Vikhr laser-guided supersonic anti-tank missiles" },
      { section: "ROCKETS", name: "B-8V20 80mm rocket launcher blocks" }
    ],
    protection: [
      { section: "ARMOUR", name: "Full perimeter armored cockpit capsule shielding against 23mm projectiles" },
      { section: "PROTECTION SYSTEMS", name: "Vital engine compartment side-armor titanium plates" },
      { section: "SENSORS", name: "Vitebsk L-370 integrated directional infrared laser jammer pods" }
    ],
    whats: {
      intro: "An aggressive attack helicopter with a noticeably wide front nose cockpit housing two crew members side-by-side, and two layers of main rotor blades with no tail rotor.",
      cues: [
        { letter: "A", keyword: "ROTORS", description: "Coaxial dual main rotors stacked directly on top of each other" },
        { letter: "B", keyword: "TAIL", description: "Complete absence of a tail rotor assembly at the rear fin block" }
      ]
    },
    variants: [
      { name: "Ka-50 Black Shark", year: 1995, label: "The earlier single-seat prototype baseline foundation concept" },
      { name: "Ka-52K Katran", year: 2015, label: "Navalised variant engineered with folding composite rotor blades and anti-corrosion marine metallurgy" }
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
    ],
    about: "A modern European attack helicopter constructed primarily from composite materials, the Tiger features advanced avionics, a sophisticated fire-control system, and stealth-optimized design for low-visibility operations.",
    specs: {
      crew: "2 personnel (Pilot in rear, Gunner in front)",
      weight: "2,800 kg (empty weight) or 6,000 kg max takeoff weight",
      length: "17.40 m (including tail rotor)",
      width: "5.28 m (main rotor span)",
      height: "5.16 m",
      engine: "2 x Rolls-Royce/Turbomeca MTMU turboshaft engines",
      horsepower: "3,230 hp total (1,615 hp per engine)",
      fuel: "850 litres (internal capacity)",
      speed: "278 km/h",
      range: "600 km",
      enteredService: "2007, France / Germany"
    },
    armament: [
      { section: "MAIN GUN", name: "30mm GIAT 30M781 automatic cannon mounted on a flexible chin turret" },
      { section: "MISSILES", name: "Up to 8 x Hellfire anti-tank missiles or Stinger air-to-air missiles" },
      { section: "ROCKETS", name: "Hydra 70 70mm rocket launcher pods on outer wing pylons" }
    ],
    protection: [
      { section: "ARMOUR", name: "Advanced composite airframe with integrated ballistic protection for vital systems" },
      { section: "PROTECTION SYSTEMS", name: "Radar warning receiver and automated countermeasure dispensing systems" },
      { section: "STEALTH", name: "Radar-absorbing materials and shaped airframe design to minimize radar cross-section" }
    ],
    whats: {
      intro: "A sleek, angular attack helicopter with a narrow fuselage, prominent chin-mounted gun pod, short weapon pylons, and modern composite construction.",
      cues: [
        { letter: "A", keyword: "GUN", description: "Distinctive bulbous chin turret containing the 30mm gun" },
        { letter: "B", keyword: "LINES", description: "Clean, angular composite lines with minimal protrusions along the fuselage" }
      ]
    },
    variants: [
      { name: "Tiger HAD", year: 2007, label: "Attack/Support variant with primary anti-tank and fire support mission" },
      { name: "Tiger UHT", year: 2008, label: "Reconnaissance variant fielded by Germany with enhanced sensor packages and limited weapon capacity" }
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
    ],
    about: "An iconic single-rotor utility and transport helicopter that revolutionized military aviation, the UH-1 Huey's reliability, versatility, and distinctive silhouette became synonymous with the Vietnam War era.",
    specs: {
      crew: "2 pilots plus up to 14 troops in transport configuration or 6 armed gunship crew",
      weight: "2,363 kg (empty weight) or 4,763 kg max takeoff weight",
      length: "17.40 m (overall length including rotors)",
      width: "2.44 m (fuselage width)",
      height: "4.41 m (to top of rotor)",
      engine: "1 x Lycoming T53-L-13 turboshaft engine",
      horsepower: "1,400 hp",
      fuel: "839 litres (internal capacity)",
      speed: "296 km/h",
      range: "507 km",
      enteredService: "1956, United States"
    },
    armament: [
      { section: "MACHINE GUNS", name: "Two 7.62mm or 12.7mm machine guns mounted in side-opening cabin doors (optional)" },
      { section: "ROCKETS", name: "Rocket launcher pods or grenade dispensers mounted on stubby external pylons" }
    ],
    protection: [
      { section: "ARMOUR", name: "Thin aluminum alloy airframe with minimal armor protection in early variants" },
      { section: "SYSTEMS", name: "Redundant flight control hydraulic systems with manual reversion capability" }
    ],
    whats: {
      intro: "A compact, single-rotor utility helicopter with a distinctive thin fuselage, prominent exhaust manifolds on the engine area, and open side doors.",
      cues: [
        { letter: "A", keyword: "ROTOR", description: "Single main rotor mast mounted directly on top of fuselage" },
        { letter: "B", keyword: "EXHAUST", description: "Visible engine exhaust pipe coils protruding from the engine compartment" }
      ]
    },
    variants: [
      { name: "UH-1A Huey", year: 1956, label: "Original production variant powered by a single Lycoming T53 engine" },
      { name: "UH-1N Twin Huey", year: 1970, label: "Upgraded variant featuring twin engines and slightly larger fuselage for increased payload" }
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
    ],
    about: "A versatile twin-rotor transport and assault helicopter, the Mi-8 Hip is the most-produced helicopter in history, serving as the primary medium-lift platform for Soviet and Russian forces since the early 1960s.",
    specs: {
      crew: "2-3 pilots (pilot, copilot, engineer) plus up to 24 fully-equipped troops",
      weight: "5,512 kg (empty weight) or 13,000 kg max takeoff weight",
      length: "18.17 m (fuselage only, excluding rotors)",
      width: "3.76 m (fuselage width)",
      height: "5.65 m (to top of rotor)",
      engine: "2 x Isotov TV2-117A turboshaft engines",
      horsepower: "4,400 hp total (2,200 hp per engine)",
      fuel: "3,360 litres (internal capacity)",
      speed: "250 km/h",
      range: "600 km",
      enteredService: "1961, Soviet Union"
    },
    armament: [
      { section: "MACHINE GUNS", name: "Two 7.62mm PKM machine guns mounted in side-opening cabin doors (optional armed variant)" },
      { section: "ROCKETS", name: "B-8V20 80mm unguided rocket launcher pods mounted on external pylons" }
    ],
    protection: [
      { section: "ARMOUR", name: "Basic steel and aluminum airframe structure with minimal ballistic protection in standard variants" },
      { section: "SYSTEMS", name: "Dual hydraulic systems providing redundant flight control capability" }
    ],
    whats: {
      intro: "A large, bulky transport helicopter with two main rotors on stacked pylons, a tall flight deck windscreen, and open cargo doors.",
      cues: [
        { letter: "A", keyword: "ROTORS", description: "Two stacked main rotors on a central vertical mast" },
        { letter: "B", keyword: "CABIN", description: "Large prominent forward cabin windscreen structure sitting high above the fuselage" }
      ]
    },
    variants: [
      { name: "Mi-8MT Hip", year: 1979, label: "Upgraded variant with modernized engines and improved avionics" },
      { name: "Mi-17 Hip-H", year: 1981, label: "Export variant with upgraded engines and enhanced performance for export operators" }
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
    ],
    about: "A modern European tactical transport and assault helicopter, the NH90 features advanced composite construction, fly-by-wire controls, and mission-specific modular design enabling rapid configuration changes.",
    specs: {
      crew: "2 pilots plus up to 20 troops in transport configuration, or 12-16 in assault/gunship configuration",
      weight: "4,830 kg (empty weight) or 10,600 kg max takeoff weight",
      length: "19.60 m (overall fuselage length)",
      width: "4.48 m (fuselage width at widest point)",
      height: "5.07 m (to rotor mast top)",
      engine: "2 x Rolls-Royce/Turbomeca RTM322-01/9 turboshaft engines",
      horsepower: "3,300 hp total (1,650 hp per engine)",
      fuel: "1,750 litres (internal capacity)",
      speed: "324 km/h",
      range: "800 km",
      enteredService: "2007, France / Germany / Italy / Netherlands"
    },
    armament: [
      { section: "DOOR GUNS", name: "Two 7.62mm machine guns on flexible door-mount systems (optional)" },
      { section: "ROCKETS", name: "70mm or 80mm unguided rocket launcher pods on external pylons (in armed variants)" }
    ],
    protection: [
      { section: "ARMOUR", name: "Advanced composite airframe with integrated blast and fragmentation protection" },
      { section: "SYSTEMS", name: "Fully redundant fly-by-wire digital flight control system with automatic stabilization" }
    ],
    whats: {
      intro: "A modern tactical transport helicopter with a streamlined composite fuselage, prominent forward windscreen, and a single large main rotor.",
      cues: [
        { letter: "A", keyword: "ROTOR", description: "Single large main rotor on a central mast above the fuselage" },
        { letter: "B", keyword: "DESIGN", description: "Smooth, angular composite construction with integrated cabin windows" }
      ]
    },
    variants: [
      { name: "NH90 TTH", year: 2007, label: "Tactical Transport Helicopter variant for troop transport and utility missions" },
      { name: "NH90 NFH", year: 2006, label: "Naval Frigate Helicopter variant with anti-submarine and anti-surface warfare sensors" }
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
    ],
    about: "A three-engine naval transport and anti-submarine helicopter, the AW101 Merlin is optimized for sustained ship-based operations, featuring automatic flight control for deck landings in heavy seas.",
    specs: {
      crew: "2 pilots plus up to 30 troops in transport configuration, or 15 in anti-submarine configuration",
      weight: "7,430 kg (empty weight) or 14,500 kg max takeoff weight",
      length: "22.85 m (overall fuselage length)",
      width: "4.60 m (fuselage width)",
      height: "6.62 m (to rotor mast top)",
      engine: "3 x General Electric CT7-8A turboshaft engines",
      horsepower: "4,940 hp total (1,645 hp per engine)",
      fuel: "2,722 litres (internal capacity)",
      speed: "290 km/h",
      range: "1,270 km",
      enteredService: "1999, United Kingdom"
    },
    armament: [
      { section: "TORPEDOES", name: "2 x Stingray homing torpedoes or Mk 46 anti-submarine torpedoes (in naval variant)" },
      { section: "SONOBUOYS", name: "Dipping sonar system with active/passive sonobuoy deployment" }
    ],
    protection: [
      { section: "ARMOUR", name: "Aluminum alloy fuselage structure with corrosion-resistant marine coatings" },
      { section: "SYSTEMS", name: "Triple redundancy in flight control and engine systems for safety over water" }
    ],
    whats: {
      intro: "A large, three-engine naval helicopter with a bulky fuselage, enclosed cabin, and a single large rotor, designed for all-weather ship operations.",
      cues: [
        { letter: "A", keyword: "ENGINES", description: "Three large engine nacelles prominent on the fuselage sides and rear section" },
        { letter: "B", keyword: "CABIN", description: "Large integrated cabin structure with side-opening cargo door" }
      ]
    },
    variants: [
      { name: "HM.1 Anti-Submarine", year: 1999, label: "Anti-submarine warfare variant with dipping sonar and torpedo systems" },
      { name: "HC.3 Transport", year: 2003, label: "Transport and utility variant optimized for troop/cargo movement from ships" }
    ]
  },
  {
    id: "kf51panther",
    name: "KF51 Panther",
    country: "Germany",
    category: "Main Battle Tank",
    era: "Modern",
    images: [
      { url: "assets/images/kf51panther-001.webp", stars: 1 },
      { url: "assets/images/kf51panther-002.jpg", stars: 2 },
      { url: "assets/images/kf51panther-003.jpg", stars: 3 },
      { url: "assets/images/kf51panther-004.jpg", stars: 2 },
      { url: "assets/images/kf51panther-005.jpg", stars: 1 }
    ],
    funFacts: [
      "Features an integrated launch system for HERO 120 loitering munitions, letting the tank attack hidden enemy targets miles away over obstacles."
    ],
    about: "Developed by Rheinmetall as a concept for future land combat systems, the KF51 integrates a radical 130mm cannon into a digital hull architecture built for managing companion drone systems.",
    specs: {
      crew: "3 to 4 personnel (Autoloader allows 3, with an optional workstation slot for a drone/systems operator)",
      weight: "59.0 tonnes",
      length: "10.00 m (including gun)",
      width: "3.70 m",
      height: "2.50 m",
      engine: "MTU MB 873 Ka-501 V12 water-cooled diesel",
      horsepower: "1,500 hp",
      fuel: "1,100 litres",
      speed: "70 km/h",
      range: "500 km",
      enteredService: "Not yet in service (Prototype/Concept status)"
    },
    armament: [
      { section: "MAIN GUN", name: "130mm Rheinmetall Rh-130 L/52 smoothbore cannon" },
      { section: "SECONDARY WEAPONS", name: "12.7mm heavy coaxial machine gun" },
      { section: "SECONDARY WEAPONS", name: "7.62mm 'Natter' remote controlled weapon station (RCWS)" }
    ],
    protection: [
      { section: "ARMOUR", name: "Advanced modular composite array" },
      { section: "PROTECTION SYSTEMS", name: "StrikeShield integrated active protection system (APS)" },
      { section: "SENSORS", name: "Top-attack protection suite against drones and smart missiles" }
    ],
    whats: {
      intro: "A sharp-angled, highly futuristic tank featuring an oversized main gun and a faceted turret fitted with visible electronic optronics modules.",
      cues: [
        { letter: "G", keyword: "Gun", description: "Massive 130mm gun barrel with an angular geometric shroud" },
        { letter: "S", keyword: "Station", description: "Built-in weapon station block on the back corner of the turret roof" },
        { letter: "F", keyword: "Futuristic", description: "Faceted turret with visible electronic optronics modules" }
      ]
    },
    variants: [
      { name: "KF51 Demonstrator", year: 2022, label: "Manned turret configuration shown at Eurosatory 2022" },
      { name: "KF51-U", year: 2025, label: "Unmanned turret variant introduced with an automated CUT module" }
    ]
  },
  {
    id: "leopard2arc30",
    name: "Leopard 2A-RC 3.0",
    country: "Germany",
    category: "Main Battle Tank",
    era: "Modern",
    images: [
      { url: "assets/images/leopard2arc30-001.jpg", stars: 2 },
      { url: "assets/images/leopard2arc30-002.jpg", stars: 1 },
      { url: "assets/images/leopard2arc30-003.webp", stars: 3 },
      { url: "assets/images/leopard2arc30-004.webp", stars: 3 },
      { url: "assets/images/leopard2arc30-005.webp", stars: 1 },
      { url: "assets/images/leopard2arc30-006.jpg", stars: 2 },
      { url: "assets/images/leopard2arc30-007.jpg", stars: 2 },
      { url: "assets/images/leopard2arc30-008.jpg", stars: 1 }
    ],
    funFacts: [
      "Because the turret is completely unmanned, its physical silhouette is dramatically lowered, reducing its target presentation area by several feet compared to traditional models."
    ],
    about: "Developed by KNDS as a transformative upgrade concept, this design converts existing Leopard 2 hulls to utilize a fully uncrewed turret, containing all personnel within a heavily protected hull cell.",
    specs: {
      crew: "3 personnel (Commander, gunner, and driver all seated side-by-side in the hull)",
      weight: "Less than 60.0 tonnes",
      length: "7.95 m (hull length)",
      width: "3.73 m",
      height: "2.40 m",
      engine: "MTU 1,500 hp powerpack",
      horsepower: "1,500 hp",
      fuel: "1,160 litres",
      speed: "65 km/h",
      range: "460 km",
      enteredService: "Concept/Prototype variant"
    },
    armament: [
      { section: "MAIN GUN", name: "120mm smoothbore autoloader gun (adaptable up to 140mm ASCALON)" },
      { section: "SECONDARY WEAPONS", name: "30mm integrated remote weapon station (RCWS) for drone defence" },
      { section: "SECONDARY WEAPONS", name: "Modular launcher for Spike long-range anti-tank guided missiles" }
    ],
    protection: [
      { section: "PROTECTION SYSTEMS", name: "Integrated Israeli Trophy Active Protection System (APS)" },
      { section: "ARMOUR", name: "Heavily reinforced front/side Reactive Armor package over the crew cabin" },
      { section: "PROTECTION SYSTEMS", name: "Isolated structural fuel and explosive containment areas" }
    ],
    whats: {
      intro: "A classic Leopard 2 hull running gear mated to an extremely flat, narrow, uncrewed turret housing an external main gun.",
      cues: [
        { letter: "L", keyword: "Low", description: "Exceptionally low-profile flat turret" },
        { letter: "C", keyword: "Cannon", description: "Prominent 30mm auto-cannon pod top-mount" },
        { letter: "W", keyword: "Windows", description: "Absence of traditional optical viewing windows on turret cheeks" }
      ]
    },
    variants: [
      { name: "Leopard 2A-RC 3.0 120", year: 2023, label: "Standard baseline configuration with 120mm gun module" },
      { name: "Leopard 2A-RC 3.0 140", year: 2025, label: "Heavy configuration equipped with a 140mm large-caliber gun module" }
    ]
  },
  {
    id: "altayt1",
    name: "Altay T1",
    country: "Turkey",
    category: "Main Battle Tank",
    era: "Modern",
    images: [
      { url: "assets/images/altayt1-001.jpg", stars: 3 },
      { url: "assets/images/altayt1-002.jpg", stars: 2 },
      { url: "assets/images/altayt1-003.jpg", stars: 1 },
      { url: "assets/images/altayt1-004.jpg", stars: 3 },
      { url: "assets/images/altayt1-005.jpg", stars: 2 },
      { url: "assets/images/altayt1-006.jpg", stars: 1 },
      { url: "assets/images/altayt1-007.jpg", stars: 1 }
    ],
    funFacts: [
      "The initial Altay production batch utilizes a South Korean engine powerpack while Turkey completes domestic testing of its own indigenous 1,500 hp engine program."
    ],
    about: "Turkey's modern indigenous main battle tank project, designed to give the Turkish Land Forces an immensely protected platform optimized for diverse tactical theaters.",
    specs: {
      crew: "4 personnel",
      weight: "65.0 tonnes",
      length: "10.30 m (including gun forward)",
      width: "3.90 m",
      height: "2.60 m",
      engine: "HD Hyundai Infracore DV27K 12-cylinder diesel (T1 variant)",
      horsepower: "1,500 hp",
      fuel: "1,200 litres",
      speed: "65 km/h",
      range: "450 km",
      enteredService: "2025, Turkey"
    },
    armament: [
      { section: "MAIN GUN", name: "MKE 120mm 55-caliber smoothbore cannon" },
      { section: "SECONDARY WEAPONS", name: "Remote Controlled Weapon Station (RCWS) with 12.7mm machine gun" },
      { section: "SECONDARY WEAPONS", name: "7.62mm coaxial machine gun" }
    ],
    protection: [
      { section: "ARMOUR", name: "Advanced Roketsan composite armor matrix package" },
      { section: "PROTECTION SYSTEMS", name: "Aselsan AKKOR active hard-kill and soft-kill system" },
      { section: "SENSORS", name: "Electronic warfare and drone jamming suite" }
    ],
    whats: {
      intro: "A massive, broad-shouldered Western-style tank with seven prominent road wheels on each side and an imposing angular turret architecture.",
      cues: [
        { letter: "S", keyword: "Sensors", description: "Distinctive dual sensor pillars on the turret roof rear corners" },
        { letter: "L", keyword: "Length", description: "Extra long chassis body profile" },
        { letter: "D", keyword: "Deep", description: "Deep composite side-skirt panels" }
      ]
    },
    variants: [
      { name: "Altay T1", year: 2025, label: "Initial production run with South Korean engine assembly" },
      { name: "Altay T2", year: 2027, label: "Improved serial build featuring the native Turkish BMC Power BATU engine system" }
    ]
  },
  {
    id: "c1ariete",
    name: "C1 Ariete",
    country: "Italy",
    category: "Main Battle Tank",
    era: "Modern",
    images: [
      { url: "assets/images/c1ariete-001.jpg", stars: 1 },
      { url: "assets/images/c1ariete-002.jpg", stars: 2 },
      { url: "assets/images/c1ariete-003.jpg", stars: 3 },
      { url: "assets/images/c1ariete-004.jpg", stars: 3 },
      { url: "assets/images/c1ariete-005.webp", stars: 2 },
      { url: "assets/images/c1ariete-006.jpg", stars: 1 }
    ],
    funFacts: [
      "The Ariete can have its entire modular engine and transmission package unbolted and completely swapped by a recovery team in under an hour."
    ],
    about: "Developed by a consortium of Italian defense firms to replace aging American hardware, the C1 Ariete is an agile and lightweight entry among modern European armor assets.",
    specs: {
      crew: "4 personnel",
      weight: "54.0 tonnes",
      length: "9.67 m (including gun)",
      width: "3.61 m",
      height: "2.50 m",
      engine: "Fiat-Iveco MTCA V12 turbo-diesel",
      horsepower: "1,300 hp",
      fuel: "1,100 litres",
      speed: "65 km/h",
      range: "600 km",
      enteredService: "1995, Italy"
    },
    armament: [
      { section: "MAIN GUN", name: "120mm Oto Melara 44-caliber smoothbore gun" },
      { section: "SECONDARY WEAPONS", name: "7.62mm coaxial machine gun" },
      { section: "SECONDARY WEAPONS", name: "7.62mm anti-aircraft machine gun" }
    ],
    protection: [
      { section: "ARMOUR", name: "Steel-composite modular laminate armor" },
      { section: "PROTECTION SYSTEMS", name: "SPAL liner interior fragments protection" },
      { section: "SENSORS", name: "Laser warning receiver system mated to smoke launchers" }
    ],
    whats: {
      intro: "A compact, classically styled Western main battle tank with an elongated flat turret layout and a very clean hull silhouette.",
      cues: [
        { letter: "T", keyword: "Turret", description: "Slanted turret rear section" },
        { letter: "S", keyword: "Smoke", description: "Side-mounted smoke grenade bundles arranged in groups of four" },
        { letter: "V", keyword: "Viewport", description: "Centrally aligned driver viewport" }
      ]
    },
    variants: [
      { name: "C1 Ariete", year: 1995, label: "Standard operational build variant" },
      { name: "Ariete AMV", year: 2010, label: "Aggiornamento Mezza Vita - ongoing mid-life modernization featuring a 1,500 hp engine overhaul" }
    ]
  },
  {
    id: "kf41lynx",
    name: "KF41 Lynx",
    country: "Germany",
    category: "IFV",
    era: "Modern",
    images: [
      { url: "assets/images/kf41lynx-001.png", stars: 1 },
      { url: "assets/images/kf41lynx-002.png", stars: 2 },
      { url: "assets/images/kf41lynx-003.jpg", stars: 1 },
      { url: "assets/images/kf41lynx-004.jpg", stars: 1 },
      { url: "assets/images/kf41lynx-005.jpg", stars: 1 },
      { url: "assets/images/kf41lynx-006.jpg", stars: 1 },
      { url: "assets/images/kf41lynx-007.jpg", stars: 1 }
    ],
    funFacts: [],
    about: "A modern, highly modular tracked combat vehicle system developed by Rheinmetall, showcasing extreme internal volume and advanced electronic defense networks.",
    specs: {
      crew: "3 personnel (plus 8 passengers)",
      weight: "44.0 tonnes",
      length: "7.73 m",
      width: "3.60 m",
      height: "3.30 m",
      engine: "Liebherr inline-6 turbocharged diesel",
      horsepower: "1,140 hp",
      fuel: "900 litres",
      speed: "70 km/h",
      range: "500 km",
      enteredService: "2023, Hungary"
    },
    armament: [
      { section: "MAIN GUN", name: "30mm or 35mm WOTAN automatic chain gun inside a Lance 2.0 turret" },
      { section: "MISSILES", name: "Spike-LR anti-tank guided missile launcher module" },
      { section: "SECONDARY WEAPONS", name: "7.62mm three-barrel RMG coaxial machine gun" }
    ],
    protection: [
      { section: "ARMOUR", name: "Advanced ballistic steel hull layered with internal spall fabrics" },
      { section: "PROTECTION SYSTEMS", name: "StrikeShield Active Protection System (APS) hard-kill blocks" },
      { section: "PROTECTION SYSTEMS", name: "Heavy smoke countermeasure grids" }
    ],
    whats: {
      intro: "An immense, highly imposing tracked vehicle with a massive angular Lance turret sporting sharp geometric lines.",
      cues: [
        { letter: "A", keyword: "TURRET", description: "Angular wedge-shaped turret armor cheeks" },
        { letter: "B", keyword: "SHROUD", description: "Distinctive grooved geometric barrel shroud layout with high rear deck lines" }
      ]
    },
    variants: [
      { name: "KF31 Lynx", year: 2020, label: "Slightly smaller iteration variant carrying a lower weight envelope" },
      { name: "KF41 Lynx IFV", year: 2023, label: "Standard primary heavy production model adopted by Hungary" }
    ]
  },
  {
    id: "borsuk",
    name: "Borsuk",
    country: "Poland",
    category: "IFV",
    era: "Modern",
    images: [
      { url: "assets/images/borsuk-001.jpg", stars: 1 },
      { url: "assets/images/borsuk-002.jpg", stars: 2 },
      { url: "assets/images/borsuk-003.jpg", stars: 1 },
      { url: "assets/images/borsuk-004.jpg", stars: 1 },
      { url: "assets/images/borsuk-005.jpg", stars: 2 },
      { url: "assets/images/borsuk-006.webp", stars: 2 },
      { url: "assets/images/borsuk-007.jpg", stars: 3 },
      { url: "assets/images/borsuk-008.jpg", stars: 3 }
    ],
    funFacts: [],
    about: "Poland's newly developed indigenous amphibious tracked infantry fighting vehicle, built to replace obsolete Soviet hardware with high situational awareness and a remote turret.",
    specs: {
      crew: "3 personnel (plus 6 passengers)",
      weight: "25.0 tonnes (standard baseline amphibious configuration)",
      length: "7.60 m",
      width: "3.40 m",
      height: "3.00 m (including remote weapon system)",
      engine: "MTU 8-cylinder diesel",
      horsepower: "720 hp",
      fuel: "600 litres",
      speed: "65 km/h (8 km/h swimming in water)",
      range: "550 km",
      enteredService: "2024, Poland"
    },
    armament: [
      { section: "MAIN GUN", name: "30mm Bushmaster Mk 44S automatic chain gun in a ZSSW-30 remote turret" },
      { section: "MISSILES", name: "Dual Spike-LR anti-tank guided missile launcher container pod" },
      { section: "SECONDARY WEAPONS", name: "7.62mm UKM-2000C coaxial machine gun" }
    ],
    protection: [
      { section: "ARMOUR", name: "Add-on modular composite plate panels over a steel frame hull" },
      { section: "PROTECTION SYSTEMS", name: "Fully uncrewed remote turret structure keeping ammo outside the hull" },
      { section: "PROTECTION SYSTEMS", name: "Water-deflecting bow trim flap assembly" }
    ],
    whats: {
      intro: "A high-clearance tracked vehicle with a flat, low-profile uncrewed weapon module sitting on top of a long hull.",
      cues: [
        { letter: "A", keyword: "TURRET", description: "Slender uncrewed remote turret module" },
        { letter: "B", keyword: "MISSILES", description: "Prominent external dual missile box bolted on the right side of the gun carriage" }
      ]
    },
    variants: [
      { name: "Borsuk Amphibious IFV", year: 2024, label: "Standard baseline version designed to swim across European rivers" },
      { name: "Heavy Borsuk", year: 2025, label: "Up-armored non-amphidious version built for partnering with heavy M1 Abrams tank units" }
    ]
  },
  {
    id: "tulpar",
    name: "Tulpar",
    country: "Turkey",
    category: "IFV",
    era: "Modern",
    images: [
      { url: "assets/images/tulpar-001.jpg", stars: 1 },
      { url: "assets/images/tulpar-002.jpg", stars: 3 },
      { url: "assets/images/tulpar-003.jpg", stars: 1 },
      { url: "assets/images/tulpar-004.webp", stars: 2 },
      { url: "assets/images/tulpar-005.jpg", stars: 2 },
      { url: "assets/images/tulpar-006.png", stars: 3 }
    ],
    funFacts: [],
    about: "A heavy multi-purpose tracked armored vehicle platform developed by Otokar in Turkey, designed to support modern main battle tanks in intense operational conditions.",
    specs: {
      crew: "3 personnel (plus 9 passengers)",
      weight: "32.0 tonnes (scalable up to 45.0 tonnes)",
      length: "7.23 m",
      width: "3.40 m",
      height: "2.67 m (to hull top deck)",
      engine: "Scania inline-6 turbocharged diesel",
      horsepower: "810 hp",
      fuel: "700 litres",
      speed: "70 km/h",
      range: "600 km",
      enteredService: "2023, Turkey"
    },
    armament: [
      { section: "MAIN GUN", name: "30mm automatic cannon inside a Mizrak remote weapon station" },
      { section: "MISSILES", name: "Dual L-UMTAS anti-tank guided missile tubes" },
      { section: "SECONDARY WEAPONS", name: "7.62mm coaxial machine gun" }
    ],
    protection: [
      { section: "ARMOUR", name: "All-welded steel core with scalable modular composite add-on plates" },
      { section: "PROTECTION SYSTEMS", name: "Internal comprehensive explosion and spall suppression blankets" },
      { section: "PROTECTION SYSTEMS", name: "Chemical and radiation containment filters" }
    ],
    whats: {
      intro: "A long, tall tracked vehicle featuring smooth angular side skirts and a modern remote weapon housing block.",
      cues: [
        { letter: "A", keyword: "LINES", description: "Clean geometric lines along the hull edge" },
        { letter: "B", keyword: "OPTICS", description: "Large panoramic sensor globes mounted on the turret crown" }
      ]
    },
    variants: [
      { name: "Tulpar IFV", year: 2023, label: "Standard infantry configuration featuring the Mizrak 30mm turret" },
      { name: "Tulpar Light Tank", year: 2025, label: "Upgraded version mounting a heavy 105mm tank cannon turret" }
    ]
  },
  {
    id: "ascod",
    name: "ASCOD",
    country: "Austria",
    category: "IFV",
    era: "Modern",
    images: [
      { url: "assets/images/ascod-001.jpg", stars: 1 },
      { url: "assets/images/ascod-002.jpg", stars: 3 },
      { url: "assets/images/ascod-003.jpg", stars: 1 },
      { url: "assets/images/ascod-004.jpg", stars: 3 },
      { url: "assets/images/ascod-005.jpg", stars: 2 },
      { url: "assets/images/ascod-006.webp", stars: 2 },
      { url: "assets/images/ascod-007.jpg", stars: 1 }
    ],
    funFacts: [],
    about: "A collaborative European tracked armored vehicle framework produced by General Dynamics, serving as the primary infantry fighting vehicle for Spain and Austria.",
    specs: {
      crew: "3 personnel (plus 7 passengers)",
      weight: "28.0 tonnes (standard baseline configuration)",
      length: "6.83 m",
      width: "3.15 m",
      height: "2.65 m",
      engine: "MTU 8V 199 turbocharged diesel",
      horsepower: "720 hp",
      fuel: "560 litres",
      speed: "70 km/h",
      range: "500 km",
      enteredService: "2002, Spain / Austria"
    },
    armament: [
      { section: "MAIN GUN", name: "30mm Mauser MK 30-2 automatic cannon" },
      { section: "SECONDARY WEAPONS", name: "7.62mm MG3 or FN MAG coaxial machine gun" },
      { section: "SMOKE", name: "2 x 6 smoke discharger blocks" }
    ],
    protection: [
      { section: "ARMOUR", name: "Rolled steel armor skin with modular MEXAS ceramic composite kits" },
      { section: "PROTECTION SYSTEMS", name: "Dual-stage mine defense belly floor configurations" },
      { section: "PROTECTION SYSTEMS", name: "Automatic engine fire wire loop systems" }
    ],
    whats: {
      intro: "A standard-layout tracked Western IFV with an angular two-man turret sitting centered on a crisp wedge hull.",
      cues: [
        { letter: "A", keyword: "SKIRTS", description: "Segmented side track skirts" },
        { letter: "B", keyword: "LOCKER", description: "A distinctive squared storage locker box structure wrapping around the rear turret rim" }
      ]
    },
    variants: [
      { name: "Pizarro", year: 2002, label: "The specialized operational variant developed for the Spanish Army" },
      { name: "Ulan", year: 2002, label: "The specialized operational variant configured for the Austrian Land Forces" }
    ]
  },
  {
    id: "piranhav",
    name: "Piranha V",
    country: "Switzerland",
    category: "IFV",
    era: "Modern",
    images: [
      { url: "assets/images/piranhav-001.jpg", stars: 1 },
      { url: "assets/images/piranhav-002.jpg", stars: 3 },
      { url: "assets/images/piranhav-003.jpg", stars: 3 },
      { url: "assets/images/piranhav-004.jpg", stars: 1 },
      { url: "assets/images/piranhav-005.jpg", stars: 1 },
      { url: "assets/images/piranhav-006.webp", stars: 2 },
      { url: "assets/images/piranhav-007.jpg", stars: 2 },
      { url: "assets/images/piranhav-008.jpg", stars: 1 }
    ],
    funFacts: [],
    about: "The fifth-generation iteration of Mowag's highly successful wheeled vehicle family, introducing heavy armor volumes and internal space optimized for high-payload turrets.",
    specs: {
      crew: "3 personnel (plus 8 passengers)",
      weight: "30.0 tonnes",
      length: "8.00 m",
      width: "2.99 m",
      height: "2.34 m (hull line top)",
      engine: "Scania DC13 inline-6 turbo diesel",
      horsepower: "580 hp",
      fuel: "400 litres",
      speed: "100 km/h",
      range: "800 km",
      enteredService: "2018, Denmark / Spain"
    },
    armament: [
      { section: "MAIN GUN", name: "30mm Bushmaster automatic chain gun inside a remote turret module" },
      { section: "SECONDARY WEAPONS", name: "Coaxial 7.62mm machine gun" },
      { section: "SMOKE", name: "Roof perimeter smoke distribution canisters" }
    ],
    protection: [
      { section: "ARMOUR", name: "Integrated modular composite armor shell with high blast resistance" },
      { section: "PROTECTION SYSTEMS", name: "Mine-resistant energy-absorbing seats suspended from the roof frame" },
      { section: "PROTECTION SYSTEMS", name: "Electronic acoustic gunshot location sensor kits" }
    ],
    whats: {
      intro: "An immensely sized 8-wheeled vehicle with a broad geometric front nose and long, continuous slab-like side armor surfaces.",
      cues: [
        { letter: "A", keyword: "WHEELS", description: "Large vertical wheel clearance gaps" },
        { letter: "B", keyword: "SEAMS", description: "Crisp angular geometric engine access seams along the front nose deck" }
      ]
    },
    variants: [
      { name: "Piranha V Infantry Carrier", year: 2018, label: "Equipped with a light 12.7mm remote weapon station module" },
      { name: "Dragón IFV", year: 2020, label: "Highly specialized Spanish variant featuring advanced digital vehicle electronics and a 30mm turret" }
    ]
  },
  {
    id: "vbci",
    name: "VBCI",
    country: "France",
    category: "IFV",
    era: "Modern",
    images: [
      { url: "assets/images/vbci-001.jpg", stars: 1 },
      { url: "assets/images/vbci-002.jpg", stars: 2 },
      { url: "assets/images/vbci-003.jpg", stars: 1 },
      { url: "assets/images/vbci-004.jpg", stars: 1 },
      { url: "assets/images/vbci-005.jpg", stars: 1 },
      { url: "assets/images/vbci-006.webp", stars: 1 },
      { url: "assets/images/vbci-007.jpg", stars: 1 },
      { url: "assets/images/vbci-008.jpg", stars: 1 }
    ],
    funFacts: [],
    about: "A tracked infantry fighting vehicle designed and operated by the French Army, representing a balanced platform between mobility and firepower.",
    specs: {
      crew: "3 personnel (plus 6 passengers)",
      weight: "21.5 tonnes",
      length: "6.33 m",
      width: "2.98 m",
      height: "2.58 m",
      engine: "Baudouin 6M8.2 inline-6 turbodiesel",
      horsepower: "360 hp",
      fuel: "400 litres",
      speed: "65 km/h",
      range: "450 km",
      enteredService: "1990, France"
    },
    armament: [
      { section: "MAIN GUN", name: "25mm M242 Bushmaster automatic chain gun" },
      { section: "SECONDARY WEAPONS", name: "7.62mm coaxial machine gun" },
      { section: "SMOKE", name: "2 x 4 smoke discharger modules" }
    ],
    protection: [
      { section: "ARMOUR", name: "All-welded steel armor with side-mounted explosive reactive armor blocks" },
      { section: "PROTECTION SYSTEMS", name: "Mine-resistant floored troop compartment design" },
      { section: "PROTECTION SYSTEMS", name: "Electric smoke generation systems" }
    ],
    whats: {
      intro: "A compact, relatively low-slung tracked vehicle with a two-man turret and dense armor side skirts.",
      cues: [
        { letter: "A", keyword: "PROFILE", description: "Notably compact vertical height compared to other IFVs" },
        { letter: "B", keyword: "SKIRTS", description: "Continuous armor skirts running full length along both sides" }
      ]
    },
    variants: [
      { name: "VBCI Infantry Carrier", year: 1990, label: "The original production model equipped with a 25mm turret" },
      { name: "VBCI Amph", year: 2015, label: "Amphibious-capable variant with improved water-crossing capability systems" }
    ]
  },
  {
    id: "vbmfreccia",
    name: "VBM Freccia",
    country: "Italy",
    category: "IFV",
    era: "Modern",
    images: [
      { url: "assets/images/vbmfreccia-001.jpg", stars: 1 },
      { url: "assets/images/vbmfreccia-002.jpg", stars: 1 },
      { url: "assets/images/vbmfreccia-003.jpg", stars: 2 },
      { url: "assets/images/vbmfreccia-004.jpg", stars: 2 },
      { url: "assets/images/vbmfreccia-005.jpg", stars: 1 },
      { url: "assets/images/vbmfreccia-006.jpg", stars: 3 },
      { url: "assets/images/vbmfreccia-007.jpg", stars: 3 }
    ],
    funFacts: [],
    about: "A highly specialized Italian wheeled armored personnel carrier and infantry fighting vehicle, emphasizing extreme modularity for rapid multi-role reconfiguration.",
    specs: {
      crew: "2 personnel (plus 8 passengers)",
      weight: "27.0 tonnes",
      length: "7.02 m",
      width: "3.00 m",
      height: "2.37 m",
      engine: "Iveco 8-cylinder turbodiesel",
      horsepower: "480 hp",
      fuel: "500 litres",
      speed: "100 km/h",
      range: "600 km",
      enteredService: "2006, Italy"
    },
    armament: [
      { section: "MAIN GUN", name: "25mm or 30mm automatic cannon in an optional turret" },
      { section: "SECONDARY WEAPONS", name: "7.62mm machine gun in pintle roof mount" },
      { section: "SMOKE", name: "Turret roof smoke discharger blocks" }
    ],
    protection: [
      { section: "ARMOUR", name: "Modular welded steel armor platform with composite reinforcement layers" },
      { section: "PROTECTION SYSTEMS", name: "Integrated spall-lining protection blankets on all inner surfaces" },
      { section: "PROTECTION SYSTEMS", name: "Smoke screen generation perimeter systems" }
    ],
    whats: {
      intro: "A sleek 6-wheeled armored vehicle with a low, streamlined profile and optional turret pod mounting location.",
      cues: [
        { letter: "A", keyword: "WHEELS", description: "Six large wheels in a distinctive 3-2-3 pattern on long wheel base" },
        { letter: "B", keyword: "HULL", description: "Smooth, linear hull with minimal angular features and clean silhouette edges" }
      ]
    },
    variants: [
      { name: "Freccia APC", year: 2006, label: "Armored personnel carrier configuration without turret, pure transport role" },
      { name: "Freccia IFV", year: 2010, label: "Infantry fighting vehicle variant fitted with a 25mm or 30mm remote turret module" }
    ]
  }
];

// Convenience helper — total count, useful for the home-screen stats card
// (vehicle count is derived at runtime)

// Alliance configuration — maps countries to military alliances.
// Managed via Admin → 🌐 Alliances. Empty = built-in defaults apply.
export const pactConfig = {

};
