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
      { section: "MAIN GUN", name: "105mm M68E1 rifled gun (early models) or 120mm M256 smoothbore cannon", description: "" },
      { section: "SECONDARY WEAPONS", name: "12.7mm M2HB heavy machine gun", description: "" },
      { section: "SECONDARY WEAPONS", name: "2 x 7.62mm M240 machine guns", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "Chobham composite armor", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Hull/turret anti-accumulation side skirts", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Halon fire-suppression and NBC system", description: "" }
    ],
    whats: {
      intro: "A broad, low-slung tank with an angular, heavily sloped turret front and an exposed rear engine deck venting intense heat.",
      cues: [
        { letter: "E", keyword: "Engine whine", description: "Distinctive engine whine" },
        { letter: "B", keyword: "Blow-out panels", description: "Massive angular blow-out panel turret" },
        { letter: "H", keyword: "Hatch placement", description: "Low-profile driver's hatch placement below the gun mantlet" }
      ]
    },
    variants: [
      { name: "M1A1", year: 1985, label: "Upgraded to 120mm main gun", visibleDifferences: [], internalDifferences: [] },
      { name: "M1A2 SEPv3", year: 2012, label: "Modern digital architecture and heavily upgraded armor package", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN GUN", name: "120mm Rheinmetall L/44 or L/55 smoothbore cannon", description: "" },
      { section: "SECONDARY WEAPONS", name: "7.62mm coaxial machine gun", description: "" },
      { section: "SECONDARY WEAPONS", name: "7.62mm anti-aircraft machine gun / Remote Weapon Station", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "Advanced third-generation composite matrix armor", description: "" },
      { section: "ARMOUR", name: "Reinforced anti-mine hull belly armor", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Modular add-on arrowhead turret wedges (A5 onwards)", description: "" }
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
      { name: "Leopard 2A4", year: 1984, label: "Classic boxy configuration turret", visibleDifferences: [], internalDifferences: [] },
      { name: "Leopard 2A7V", year: 2012, label: "Modernized German Army variant with advanced optronics and programmable ammunition capabilities", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN GUN", name: "120mm L30A1 rifled main gun", description: "" },
      { section: "SECONDARY WEAPONS", name: "7.62mm L94A1 EX-34 coaxial chain gun", description: "" },
      { section: "SECONDARY WEAPONS", name: "7.62mm L37A2 anti-aircraft machine gun", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "Second-generation classified Dorchester composite armor", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Explosive Reactive Armor (ERA) / applique side panels", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Hydrogas variable suspension for smoother hull targeting", description: "" }
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
      { name: "Challenger 2E", year: 2000, label: "Export variant optimized for hot environments", visibleDifferences: [], internalDifferences: [] },
      { name: "Challenger 3", year: 2030, label: "Next-generation evolution featuring a NATO smoothbore gun upgrade", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN GUN", name: "120mm GIAT CN120-26 smoothbore cannon", description: "" },
      { section: "SECONDARY WEAPONS", name: "12.7mm heavy coaxial machine gun", description: "" },
      { section: "SECONDARY WEAPONS", name: "7.62mm anti-aircraft machine gun", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "Advanced structural modular composite armor", description: "" },
      { section: "SMOKE", name: "GALIX vehicle combat self-defence smoke/grenade layout", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Automated fast-reaction internal fire containment systems", description: "" }
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
      { name: "Leclerc Series 1", year: 1992, label: "Initial baseline production versions", visibleDifferences: [], internalDifferences: [] },
      { name: "Leclerc XLR", year: 2020, label: "Comprehensive modern digitization and urbanization combat upgrade package", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN GUN", name: "125mm 2A46M smoothbore cannon", description: "" },
      { section: "SECONDARY WEAPONS", name: "12.7mm Kord heavy machine gun", description: "" },
      { section: "SECONDARY WEAPONS", name: "7.62mm PKMT coaxial machine gun", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "Blend composite armor with integrated steel", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Kontakt-5 or Relikt Explosive Reactive Armor (ERA) tiles", description: "" },
      { section: "SENSORS", name: "Shtora-1 electro-optical countermeasures / Arena active kill systems", description: "" }
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
      { name: "T-90A", year: 2004, label: "Welded turret upgrade featuring the 1,000 hp engine package", visibleDifferences: [], internalDifferences: [] },
      { name: "T-90M Proryv-3", year: 2020, label: "Heavily advanced modern overhaul with Relikt ERA, new turret layout, and isolated bushed ammunition", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN GUN", name: "125mm 2A46 smoothbore gun", description: "" },
      { section: "SECONDARY WEAPONS", name: "12.7mm NSVT anti-aircraft heavy machine gun", description: "" },
      { section: "SECONDARY WEAPONS", name: "7.62mm PKT coaxial machine gun", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "Early cast steel composite armor arrays", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Built-in radiation liner protection for CBRN scenarios", description: "" },
      { section: "ARMOUR", name: "Hull-integrated deep trench entrenching blade assembly", description: "" }
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
      { name: "T-72A", year: 1979, label: "Features thickened cast 'Dolly Parton' armor layout", visibleDifferences: [], internalDifferences: [] },
      { name: "T-72B3", year: 2010, label: "Modernized upgrade equipped with Relikt ERA and digital thermal targeting sights", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN GUN", name: "20-pounder (84mm) rifled gun (early) or Royal Ordnance 105mm L7 (later Marks)", description: "" },
      { section: "SECONDARY WEAPONS", name: ".50 caliber coaxial ranging machine gun", description: "" },
      { section: "SECONDARY WEAPONS", name: "7.62mm (.30 cal) Browning coaxial machine gun", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "Heavy rolled homogeneous steel glacis armor plate", description: "" },
      { section: "ARMOUR", name: "Thick modular side armor bazooka skirts covering running gear", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Resilient Horstmann suspension system", description: "" }
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
      { name: "Centurion Mk 3", year: 1950, label: "Features the iconic 20-pounder main gun setup", visibleDifferences: [], internalDifferences: [] },
      { name: "Centurion Mk 5/2", year: 1956, label: "Upgraded variant integrating the legendary 105mm L7 rifled gun", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN GUN", name: "88mm KwK 36 L/56 heavy cannon", description: "" },
      { section: "SECONDARY WEAPONS", name: "7.92mm MG 34 coaxial machine gun", description: "" },
      { section: "SECONDARY WEAPONS", name: "7.92mm MG 34 bow-mounted hull machine gun", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "100mm thick flat face homogeneous steel frontal hull plate", description: "" },
      { section: "ARMOUR", name: "Interleaved and overlapping road wheel array for distributing mass weight", description: "" },
      { section: "ARMOUR", name: "Zimmerit anti-magnetic paste surface coating (mid-to-late production)", description: "" }
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
      { name: "Tiger I Early Production", year: 1942, label: "Features tall drum commander cupola and dual rear air pre-cleaners", visibleDifferences: [], internalDifferences: [] },
      { name: "Tiger I Late Production", year: 1943, label: "Features low-profile cast cupola and steel-rimmed road wheels", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN GUN", name: "76.2mm F-34 main gun (or 85mm ZiS-S-53 on later variations)", description: "" },
      { section: "SECONDARY WEAPONS", name: "7.62mm DT coaxial machine gun", description: "" },
      { section: "SECONDARY WEAPONS", name: "7.62mm DT bow hull machine gun", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "45mm highly sloped homogeneous steel hull plates", description: "" },
      { section: "PROTECTION SYSTEMS", name: "All-terrain Christie spring suspension system", description: "" },
      { section: "ARMOUR", name: "Wide stamped track design for minimal ground sink pressure", description: "" }
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
      { name: "T-34/76", year: 1940, label: "Early war configuration variant carrying the 76.2mm weapon", visibleDifferences: [], internalDifferences: [] },
      { name: "T-34-85", year: 1943, label: "Late war upgrade featuring an enlarged three-man turret and hard-hitting 85mm gun", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN GUN", name: "75mm M3 L/40 gun (later upgraded to 76mm M1 gun or 105mm howitzer)", description: "" },
      { section: "SECONDARY WEAPONS", name: ".50 caliber Browning M2HB anti-aircraft roof machine gun", description: "" },
      { section: "SECONDARY WEAPONS", name: "2 x .30-06 caliber Browning M1919A4 machine guns (coaxial and bow-mounted)", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "Cast or welded steel armor array with rounded mantlet shield", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Early vertical volute spring suspension bogie layout (VVSS)", description: "" },
      { section: "PROTECTION SYSTEMS", name: "'Wet' ammunition storage racking to limit internal ammunition fires", description: "" }
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
      { name: "M4A1", year: 1942, label: "Features a completely cast smooth rounded upper armor hull shell construction", visibleDifferences: [], internalDifferences: [] },
      { name: "M4A3E8 Easy Eight", year: 1945, label: "Late war update integrating a 76mm high-velocity gun and smooth riding wide track HVSS suspension", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN WEAPON", name: "12.7mm M2 Browning heavy machine gun", description: "" },
      { section: "SECONDARY WEAPONS", name: "Optional pintle-mounted 7.62mm M60 machine gun", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "5083 Aircraft-grade aluminum alloy armor", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Internal spall suppression blankets", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Front-mounted trim vane engine heat shield", description: "" }
    ],
    whats: {
      intro: "A boxy, tracked rectangular transport hull with a steeply sloped front nose and a wide hydraulic deployment ramp at the back.",
      cues: [
        { letter: "A", keyword: "WHEELS", description: "Five road wheels per side with no return rollers" },
        { letter: "B", keyword: "CUPOLA", description: "Exposed high-mounted commander's cupola ring with single heavy gun layout" }
      ]
    },
    variants: [
      { name: "M113A2", year: 1964, label: "Improved engine cooling setup and rugged suspension dampers", visibleDifferences: [], internalDifferences: [] },
      { name: "M113A3", year: 1987, label: "Massive upgrade including a turbocharged 275 hp engine and external armored fuel cell pods", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN WEAPON", name: "14.5mm KPVT heavy machine gun", description: "" },
      { section: "SECONDARY WEAPONS", name: "7.62mm PKT coaxial machine gun", description: "" },
      { section: "SMOKE", name: "6 x 81mm smoke grenade launchers", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "All-welded steel armor protecting against 7.62mm rounds", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Overpressurized collective NBC filtration suite", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Bullet-resistant pneumatic run-flat tires", description: "" }
    ],
    whats: {
      intro: "A lengthy, low-slung 8-wheeled amphibious vehicle with an angular boat-like hull belly and a small pointed turret positioned forward.",
      cues: [
        { letter: "A", keyword: "WHEELS", description: "Four evenly spaced large rubber tires on each side" },
        { letter: "B", keyword: "DOORS", description: "Distinctive side passenger split doors wedged between the second and third axles" }
      ]
    },
    variants: [
      { name: "BTR-80K", year: 1986, label: "Command framework variation fitted with advanced long-range radios and navigation tracking equipment", visibleDifferences: [], internalDifferences: [] },
      { name: "BTR-80A", year: 1994, label: "Fitted with a prominent modular weapons system carrying a 30mm 2A72 autocannon", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN WEAPON", name: "Protector Remote Weapon Station (RWS) with 12.7mm M2 machine gun", description: "" },
      { section: "SECONDARY WEAPONS", name: "Alternate Mk 19 40mm automatic grenade launcher", description: "" },
      { section: "SMOKE", name: "4 x M6 smoke grenade clusters", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "High-hardness steel hull backed by MEXAS ceramic armor tiles", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Reinforced shock-absorbing internal troop bench frames", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Integrated automatic fire suppression array", description: "" }
    ],
    whats: {
      intro: "A high-stature, very modern 8x8 wheeled vehicle with a sharp wedge nose, slab sides, and a low-profile weapon turret on the roof.",
      cues: [
        { letter: "A", keyword: "HULL", description: "Tall, flat vertical side hull structures" },
        { letter: "B", keyword: "RWS", description: "Central remote weapon module with no traditional manned gun turret" }
      ]
    },
    variants: [
      { name: "M1126 ICV", year: 2002, label: "Infantry Carrier Vehicle basic baseline troop transporter configuration", visibleDifferences: [], internalDifferences: [] },
      { name: "M1128 MGS", year: 2003, label: "Mobile Gun System variant sporting an external 105mm tank cannon", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN WEAPON", name: "7.62mm L7 General Purpose Machine Gun (GPMG)", description: "" },
      { section: "SMOKE", name: "Dual three-barrel forward smoke dischargers", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "All-welded heavy steel plate providing defense up to 12.7mm rounds", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Retractable fabric wading screens for water operations", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Sealed interior chemical blast defense liner", description: "" }
    ],
    whats: {
      intro: "A squat, short tracked vehicle with completely flat steel sides and an offset exhaust pipe running cleanly along its roofline edge.",
      cues: [
        { letter: "A", keyword: "HATCH", description: "Large circular commander's roof escape hatch" },
        { letter: "B", keyword: "WHEELS", description: "Five road wheels layout with distinctive dual upper track support return rollers" }
      ]
    },
    variants: [
      { name: "FV432 Mortar Carrier", year: 1965, label: "Fitted with an internal 81mm mortar firing straight through a spinning roof port", visibleDifferences: [], internalDifferences: [] },
      { name: "FV432 Bulldog", year: 2006, label: "Modern variant upgraded with bolt-on reactive composite armor grids and air-conditioning units", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN WEAPON", name: "12.7mm heavy machine gun in a Remote Weapon Station", description: "" },
      { section: "SECONDARY WEAPONS", name: "Coaxial 7.62mm machine gun", description: "" },
      { section: "SMOKE", name: "Integrated multi-directional defensive smoke block arrays", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "Advanced high-tier modular ballistic armor kit", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Double-layered V-shaped anti-mine underside blast hull belly", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Specialized infra-red absorbing low-visibility thermal paint finish", description: "" }
    ],
    whats: {
      intro: "A massive, highly angular modern 8x8 wheeled vehicle with clean modular panels, a tall ride clearance, and a wide rear stance.",
      cues: [
        { letter: "A", keyword: "FENDERS", description: "Distinctive wheel layout with wide geometric fenders" },
        { letter: "B", keyword: "PANELS", description: "Clean modular bolt seams visible along the engine and cabin panels" }
      ]
    },
    variants: [
      { name: "Patria AMV APC", year: 2004, label: "Baseline configuration infantry sector variant with light remote weapon mount", visibleDifferences: [], internalDifferences: [] },
      { name: "Rosomak IFV", year: 2004, label: "Polish variant boasting an Italian Oto Melara Hitfist turret equipped with a 30mm cannon", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN WEAPON", name: "Heckler & Koch GMG 40mm automatic grenade launcher or 12.7mm machine gun", description: "" },
      { section: "SECONDARY WEAPONS", name: "Pintle-mounted 7.62mm MG3 support weapon", description: "" },
      { section: "SMOKE", name: "Roof-integrated perimeter smoke grid assemblies", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "AMAP (Advanced Modular Armour Protection) composite layer system", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Dual-wall decoupled hull shell for isolating blast waves", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Top-attack armor defenses shielding against sub-munitions", description: "" }
    ],
    whats: {
      intro: "An exceptionally large, heavy 8-wheeled vehicle with a tall geometric profile and a visible split line where the rear module drops into place.",
      cues: [
        { letter: "A", keyword: "PROFILE", description: "Immense structural height with heavily sloped upper nose glazing" },
        { letter: "B", keyword: "MODULE", description: "Visible square structural seam running completely around the rear half" }
      ]
    },
    variants: [
      { name: "Boxer GTK", year: 2009, label: "Standard baseline armored personnel transport version", visibleDifferences: [], internalDifferences: [] },
      { name: "Boxer RCT30", year: 2018, label: "Upgraded infantry fighting version utilizing the uncrewed Puma IFV 30mm turret", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN WEAPON", name: "14.5mm KPVT heavy machine gun (BTR-60PB variant)", description: "" },
      { section: "SECONDARY WEAPONS", name: "7.62mm PKT coaxial machine gun", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "Sloped welded homogeneous steel plate skin", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Built-in amphibious rear hull water jet channel propulsion", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Central tire inflation management system", description: "" }
    ],
    whats: {
      intro: "A classic boat-shaped 8-wheeled Soviet combat carrier with a distinctively tapered lower chin profile and a small conical turret.",
      cues: [
        { letter: "A", keyword: "WHEELS", description: "Eight large wheels with visible gaps between them" },
        { letter: "B", keyword: "HATCHES", description: "Dual roof passenger entry escape hatches, engine ventilation slits located at the very rear" }
      ]
    },
    variants: [
      { name: "BTR-60PA", year: 1963, label: "Introduced a fully enclosed, welded steel roof over the passenger hold", visibleDifferences: [], internalDifferences: [] },
      { name: "BTR-60PB", year: 1966, label: "Fully finalized version carrying the conical machine gun turret assembly", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN WEAPON", name: "12.7mm M2HB heavy machine gun in a manual open ring mount", description: "" },
      { section: "SECONDARY WEAPONS", name: "Alternate 7.62mm AA-52 light defense machine gun", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "High-strength steel alloy armor rated against 7.62mm rounds", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Integrated twin hydraulic rear water-jet propulsion impellers", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Thick armored driver windshield protective safety shutters", description: "" }
    ],
    whats: {
      intro: "A compact, angled 4-wheeled or 6-wheeled vehicle with a distinctive sloping forward nose plate featuring two large armored cabin windshields.",
      cues: [
        { letter: "A", keyword: "WINDSHIELDS", description: "Two large armored front observation windows" },
        { letter: "B", keyword: "REAR", description: "A boxy flat rear profile with two large outward-opening access doors" }
      ]
    },
    variants: [
      { name: "VAB VTT", year: 1976, label: "Standard baseline French Army 4x4 infantry transporter version", visibleDifferences: [], internalDifferences: [] },
      { name: "VCAC Mephisto", year: 1984, label: "Anti-tank variation fitted with a four-tube retractable HOT guided missile mount", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN GUN", name: "25mm M242 Bushmaster chain gun", description: "" },
      { section: "MISSILES", name: "Twin BGM-71 TOW anti-tank guided missile box launcher", description: "" },
      { section: "SECONDARY WEAPONS", name: "7.62mm M240C coaxial machine gun", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "Spaced laminate aluminum/steel ballistic alloy armour skin", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Bolt-on explosive reactive armor (ERA) panel blocks (A2 onwards)", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Integrated vehicle perimeter smoke launch systems", description: "" }
    ],
    whats: {
      intro: "A tall, tracked armored vehicle with an angled front glacis, a large two-man offset turret, and a rectangular missile launcher pod folded along its left side.",
      cues: [
        { letter: "A", keyword: "LAUNCHER", description: "Distinctive boxy TOW launcher arm fixed onto the left turret side" },
        { letter: "B", keyword: "TRACKS", description: "Complex heavy double-pin track skirts along both sides" }
      ]
    },
    variants: [
      { name: "M2A2 ODS", year: 1992, label: "Desert Storm upgrade integrating laser rangefinders and battlefield GPS links", visibleDifferences: [], internalDifferences: [] },
      { name: "M2A3", year: 2000, label: "Fully digitized version outfitted with a tall independent commander's thermal panoramic sight", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN GUN", name: "30mm 2A42 automatic dual-feed cannon", description: "" },
      { section: "MISSILES", name: "Roof-mounted 9M113 Konkurs anti-tank guided missile launcher", description: "" },
      { section: "SECONDARY WEAPONS", name: "7.62mm PKT coaxial machine gun", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "Welded steel alloy armor optimized with highly sloped armor angles", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Low-profile infrared target mask configuration", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Amphibious track-driven water displacement hull design", description: "" }
    ],
    whats: {
      intro: "An exceptionally low, flat tracked vehicle with an ultra-long sloped rib-textured front nose deck and a wide, low turret.",
      cues: [
        { letter: "A", keyword: "GUN", description: "Prominent, long needle-like 30mm gun barrel extending past the front nose" },
        { letter: "B", keyword: "DOORS", description: "Dual rear access doors that double as internal fuel storage reservoirs" }
      ]
    },
    variants: [
      { name: "BMP-2D", year: 1982, label: "Modified variant adding heavy steel side armor plates; loses amphibious capability due to weight", visibleDifferences: [], internalDifferences: [] },
      { name: "BMP-2M Berezhok", year: 2005, label: "Modern upgrade package incorporating four side-mounted Kornet missile tubes and digital optical sights", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN GUN", name: "20mm Rheinmetall Rh-202 automatic cannon", description: "" },
      { section: "MISSILES", name: "MILAN anti-tank guided missile launcher (stationed at the commander's hatch)", description: "" },
      { section: "SECONDARY WEAPONS", name: "7.62mm MG3 coaxial machine gun", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "All-welded steel plates shielding against 14.5mm armor-piercing ammunition", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Add-on spaced rubber shock-absorbing armor panels (A3 variant onwards)", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Standard interior overpressure chemical NBC system", description: "" }
    ],
    whats: {
      intro: "A long, steeply pitched tracked vehicle with a small, narrow weapon pod turret sitting on a highly angular hull frame.",
      cues: [
        { letter: "A", keyword: "EXHAUST", description: "Sloping nose layout with the engine exhaust grill mounted on the front right flank" },
        { letter: "B", keyword: "TURRET", description: "External exposed open weapon cradle on the small turret" }
      ]
    },
    variants: [
      { name: "Marder 1A1", year: 1979, label: "Introduced dual-feed system autocannons and passive night vision arrays", visibleDifferences: [], internalDifferences: [] },
      { name: "Marder 1A3", year: 1988, label: "Heavily up-armored model featuring bolt-on armor plates; eliminates the old hull side firing ports", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN GUN", name: "30mm Mauser MK 30-2/ABM airburst-capable autocannon", description: "" },
      { section: "SECONDARY WEAPONS", name: "5.56mm HK MG4 or 7.62mm MG5 coaxial machine gun", description: "" },
      { section: "MISSILES", name: "Spike-LR anti-tank guided missile launcher assembly", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "AMAP advanced modular composite armor array blocks", description: "" },
      { section: "PROTECTION SYSTEMS", name: "MUSS (Multifunctional Self-Protection System) soft-kill missile countermeasure suite", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Decoupled mine-resistant floor structure plates", description: "" }
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
      { name: "Puma Level A", year: 2015, label: "Air-transportable baseline weight configuration designed for loading inside an Airbus A400M", visibleDifferences: [], internalDifferences: [] },
      { name: "Puma Level C", year: 2015, label: "Heavy combat configuration outfitted with thick composite side blocks and turret roof protection modules", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN GUN", name: "155mm M126 Howitzer cannon (or M284 long-barrel on later variants)", description: "" },
      { section: "SECONDARY WEAPONS", name: "12.7mm M2HB roof-mounted heavy defense machine gun", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "32mm welded structural aluminum core hull skin", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Secure internal hydraulic ammunition storage configurations", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Dual massive rear ground-anchor stabilizing spades", description: "" }
    ],
    whats: {
      intro: "A tall, wide tracked vehicle with an oversized box-shaped turret and a massive heavy artillery barrel ending in a dual-baffle muzzle brake.",
      cues: [
        { letter: "A", keyword: "TURRET", description: "Large square hatch doors at the rear of the turret for loading ammunition shells" },
        { letter: "B", keyword: "WHEELS", description: "Seven road wheels per side with no return rollers" }
      ]
    },
    variants: [
      { name: "M109A2", year: 1979, label: "Introduced a longer barrel layout with improved ammunition blast storage", visibleDifferences: [], internalDifferences: [] },
      { name: "M109A6 Paladin", year: 1991, label: "Deep modernization featuring an automated fire control computer system, allowing it to halt and fire within 30 seconds", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN GUN", name: "Rheinmetall 155mm L52 chromium-lined artillery gun", description: "" },
      { section: "SECONDARY WEAPONS", name: "7.62mm Rheinmetall MG3 roof defense machine gun", description: "" },
      { section: "SMOKE", name: "2 x 4 smoke grenade launchers", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "All-welded steel armor core resistant to 14.5mm direct fires", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Turret roof blanket armor specifically designed to defeat top-attack cluster bomblets", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Full automated internal NBC collective overpressure seals", description: "" }
    ],
    whats: {
      intro: "An immense, tank-sized tracked artillery vehicle with an ultra-long barrel that extends far past the vehicle's front hull line.",
      cues: [
        { letter: "A", keyword: "BARREL", description: "Long 52-caliber gun barrel with an integrated fume extractor midway down" },
        { letter: "B", keyword: "TURRET", description: "A boxy turret featuring slanted side panel wedges" }
      ]
    },
    variants: [
      { name: "PzH 2000 A2", year: 2010, label: "Upgraded model adding an independent auxiliary power unit and crew cooling ventilation systems", visibleDifferences: [], internalDifferences: [] },
      { name: "PzH 2000 A5", year: 2020, label: "Modernized digital framework upgrade featuring an advanced ammunition automated loader terminal", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN GUN", name: "152mm 2A64 long-range rifled howitzer", description: "" },
      { section: "SECONDARY WEAPONS", name: "Remote-operated 12.7mm NSVT roof anti-aircraft machine gun", description: "" },
      { section: "SMOKE", name: "6 x turret-mounted smoke grenade dischargers", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "Welded steel plating shielding against small arms and shell splinters", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Internal armored separation walls dividing the shell and charge rooms", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Automatic fire suppression sensors", description: "" }
    ],
    whats: {
      intro: "A long, imposing tracked artillery system featuring a high-clearance main chassis running a massive, high-angle turret block.",
      cues: [
        { letter: "A", keyword: "CLAMP", description: "Distinctive dual-spring travel lock bracket clamp fixed onto the center nose glacis plate to secure the gun barrel during transit" }
      ]
    },
    variants: [
      { name: "2S19M1", year: 2006, label: "Upgraded model integrating an automated digital lay computer system and satellite guidance mapping", visibleDifferences: [], internalDifferences: [] },
      { name: "2S19M2", year: 2013, label: "Heavily modernized variant updating the piece to a higher 8-round-per-minute rate of fire with advanced thermal signature shrouds", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN GUN", name: "30mm M230 automatic chain gun (1,200 rounds)", description: "" },
      { section: "MISSILES", name: "Up to 16 x AGM-114 Hellfire laser-guided anti-tank missiles", description: "" },
      { section: "ROCKETS", name: "Hydra 70 70mm folding-fin aerial rocket pods", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "Lightweight Kevlar-lined titanium crew survival tub structure", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Boron-composite armor cockpit dividers and blast shields", description: "" },
      { section: "SENSORS", name: "IHADSS integrated electronic thermal jamming countermeasures", description: "" }
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
      { name: "AH-64A", year: 1984, label: "The original base production version deployed during the Cold War era", visibleDifferences: [], internalDifferences: [] },
      { name: "AH-64D Longbow", year: 1997, label: "Features a highly distinct circular millimeter-wave radar dome mounted directly on top of the main rotor mast", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN GUN", name: "12.7mm Yak-B four-barrel rotary nose machine gun (or fixed twin 30mm side cannon on Hind-F)", description: "" },
      { section: "MISSILES", name: "9M114 Shturm (AT-6 Spiral) radio-guided anti-tank missiles", description: "" },
      { section: "ROCKETS", name: "S-8 80mm unguided aerial rocket launcher pods", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "Steel and titanium cockpit shell armor plates resistant to 12.7mm rounds", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Ballistic-resistant glass canopy bubbles", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Fully overpressurized collective interior NBC defense suite", description: "" }
    ],
    whats: {
      intro: "A massive, bulking attack helicopter with distinctive downward-canted stub wings and an enlarged passenger fuselage midsection.",
      cues: [
        { letter: "A", keyword: "COCKPITS", description: "Double-bubble separate canopy cockpits (on D variants and up)" },
        { letter: "B", keyword: "WINGS", description: "Prominent forward-swept wing pylons creating a broad shoulder profile" }
      ]
    },
    variants: [
      { name: "Mi-24D Hind-D", year: 1973, label: "Introduced the iconic stepped tandem double bubble cockpit canopy layout", visibleDifferences: [], internalDifferences: [] },
      { name: "Mi-24P Hind-F", year: 1981, label: "Swapped out the movable nose gun for a fixed, devastating double-barrel 30mm autocannon bolted to the starboard fuselage side", visibleDifferences: [], internalDifferences: [] }
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
      { section: "SECONDARY WEAPONS", name: "2 x 7.62mm M134 Miniguns or M60D machine guns mounted in cabin windows", description: "" },
      { section: "MISSILES", name: "Optional ESSS external wings carrying Hellfire missile clusters", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "Heavy armor-plated crew seats and cockpit floor mats", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Ballistic-tolerant main rotor spars constructed with titanium cores", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Self-sealing, crash-resistant internal fuel cell architecture", description: "" }
    ],
    whats: {
      intro: "A long, slender, low-profile utility helicopter resting on a rugged fixed wheel landing gear with a lengthy passenger cabin box.",
      cues: [
        { letter: "A", keyword: "ROTORS", description: "Four swept-tip composite main rotor blades" },
        { letter: "B", keyword: "TAIL", description: "A distinctively canted tail rotor wheel trailing flat on the ground" }
      ]
    },
    variants: [
      { name: "UH-60A", year: 1979, label: "The initial original base model deployed during the late Cold War", visibleDifferences: [], internalDifferences: [] },
      { name: "UH-60L", year: 1988, label: "Upgraded model outfitted with uprated engines and an enhanced high-durability main gearbox network", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN GUN", name: "30mm 2A42 automatic cannon (mounted on the starboard hull flank)", description: "" },
      { section: "MISSILES", name: "Up to 12 x 9K121 Vikhr laser-guided supersonic anti-tank missiles", description: "" },
      { section: "ROCKETS", name: "B-8V20 80mm rocket launcher blocks", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "Full perimeter armored cockpit capsule shielding against 23mm projectiles", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Vital engine compartment side-armor titanium plates", description: "" },
      { section: "SENSORS", name: "Vitebsk L-370 integrated directional infrared laser jammer pods", description: "" }
    ],
    whats: {
      intro: "An aggressive attack helicopter with a noticeably wide front nose cockpit housing two crew members side-by-side, and two layers of main rotor blades with no tail rotor.",
      cues: [
        { letter: "A", keyword: "ROTORS", description: "Coaxial dual main rotors stacked directly on top of each other" },
        { letter: "B", keyword: "TAIL", description: "Complete absence of a tail rotor assembly at the rear fin block" }
      ]
    },
    variants: [
      { name: "Ka-50 Black Shark", year: 1995, label: "The earlier single-seat prototype baseline foundation concept", visibleDifferences: [], internalDifferences: [] },
      { name: "Ka-52K Katran", year: 2015, label: "Navalised variant engineered with folding composite rotor blades and anti-corrosion marine metallurgy", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN GUN", name: "130mm Rheinmetall Rh-130 L/52 smoothbore cannon", description: "" },
      { section: "SECONDARY WEAPONS", name: "12.7mm heavy coaxial machine gun", description: "" },
      { section: "SECONDARY WEAPONS", name: "7.62mm 'Natter' remote controlled weapon station (RCWS)", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "Advanced modular composite array", description: "" },
      { section: "PROTECTION SYSTEMS", name: "StrikeShield integrated active protection system (APS)", description: "" },
      { section: "SENSORS", name: "Top-attack protection suite against drones and smart missiles", description: "" }
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
      { name: "KF51 Demonstrator", year: 2022, label: "Manned turret configuration shown at Eurosatory 2022", visibleDifferences: [], internalDifferences: [] },
      { name: "KF51-U", year: 2025, label: "Unmanned turret variant introduced with an automated CUT module", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN GUN", name: "120mm smoothbore autoloader gun (adaptable up to 140mm ASCALON)", description: "" },
      { section: "SECONDARY WEAPONS", name: "30mm integrated remote weapon station (RCWS) for drone defence", description: "" },
      { section: "SECONDARY WEAPONS", name: "Modular launcher for Spike long-range anti-tank guided missiles", description: "" }
    ],
    protection: [
      { section: "PROTECTION SYSTEMS", name: "Integrated Israeli Trophy Active Protection System (APS)", description: "" },
      { section: "ARMOUR", name: "Heavily reinforced front/side Reactive Armor package over the crew cabin", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Isolated structural fuel and explosive containment areas", description: "" }
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
      { name: "Leopard 2A-RC 3.0 120", year: 2023, label: "Standard baseline configuration with 120mm gun module", visibleDifferences: [], internalDifferences: [] },
      { name: "Leopard 2A-RC 3.0 140", year: 2025, label: "Heavy configuration equipped with a 140mm large-caliber gun module", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN GUN", name: "MKE 120mm 55-caliber smoothbore cannon", description: "" },
      { section: "SECONDARY WEAPONS", name: "Remote Controlled Weapon Station (RCWS) with 12.7mm machine gun", description: "" },
      { section: "SECONDARY WEAPONS", name: "7.62mm coaxial machine gun", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "Advanced Roketsan composite armor matrix package", description: "" },
      { section: "PROTECTION SYSTEMS", name: "Aselsan AKKOR active hard-kill and soft-kill system", description: "" },
      { section: "SENSORS", name: "Electronic warfare and drone jamming suite", description: "" }
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
      { name: "Altay T1", year: 2025, label: "Initial production run with South Korean engine assembly", visibleDifferences: [], internalDifferences: [] },
      { name: "Altay T2", year: 2027, label: "Improved serial build featuring the native Turkish BMC Power BATU engine system", visibleDifferences: [], internalDifferences: [] }
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
      { section: "MAIN GUN", name: "120mm Oto Melara 44-caliber smoothbore gun", description: "" },
      { section: "SECONDARY WEAPONS", name: "7.62mm coaxial machine gun", description: "" },
      { section: "SECONDARY WEAPONS", name: "7.62mm anti-aircraft machine gun", description: "" }
    ],
    protection: [
      { section: "ARMOUR", name: "Steel-composite modular laminate armor", description: "" },
      { section: "PROTECTION SYSTEMS", name: "SPAL liner interior fragments protection", description: "" },
      { section: "SENSORS", name: "Laser warning receiver system mated to smoke launchers", description: "" }
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
      { name: "C1 Ariete", year: 1995, label: "Standard operational build variant", visibleDifferences: [], internalDifferences: [] },
      { name: "Ariete AMV", year: 2010, label: "Aggiornamento Mezza Vita - ongoing mid-life modernization featuring a 1,500 hp engine overhaul", visibleDifferences: [], internalDifferences: [] }
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
    funFacts: []
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
    funFacts: []
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
    funFacts: []
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
    funFacts: []
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
    funFacts: []
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
    funFacts: []
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
    funFacts: []
  }
];

// Alliance configuration — maps countries to military alliances.
// Managed via Admin → 🌐 Alliances. Empty = built-in defaults apply.
export const pactConfig = {

};
