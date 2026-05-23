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
// Image-URL rules:
//   - Must be HTTPS Wikimedia Commons URLs
//   - Each image needs the full URL (right-click on Commons → "Copy image address")
//   - URLs look like: https://upload.wikimedia.org/wikipedia/commons/.../filename.jpg
//
// Loading model:
//   This file is loaded as a regular <script> in index.html *before* app.jsx,
//   and exposes the data as `window.vehicles`. When the project later adopts
//   a build step (Phase 2+), this can be swapped to `export const vehicles`.
//
// =================================================================

window.vehicles = [
  // ─────────────────────────── Modern ────────────────────────────
  {
    id: "m1abrams",
    name: "M1 Abrams",
    country: "United States",
    category: "Main Battle Tank",
    era: "Modern",
    images: [
      { url: "https://upload.wikimedia.org/wikipedia/commons/b/bc/M1A1TTB_Abrams.jpg?_=20251221161250", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/M1_Abrams_training_in_Iraq_%28original%29.jpg/960px-M1_Abrams_training_in_Iraq_%28original%29.jpg?_=20110808085228", stars: 2 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/M1_Abrams_noBG.jpg/960px-M1_Abrams_noBG.jpg?_=20240705083952", stars: 3 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Leopard_2_A5_in_dust.jpg/960px-Leopard_2_A5_in_dust.jpg?_=20200221213433", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Leopard_2A4_IFOR_missie.jpg/960px-Leopard_2A4_IFOR_missie.jpg?_=20240108180954", stars: 2 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Leopard_2_A5_der_Bundeswehr.jpg/960px-Leopard_2_A5_der_Bundeswehr.jpg?_=20220829164425", stars: 3 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Challenger_2_Main_Battle_Tank_patrolling_outside_Basra%2C_Iraq_MOD_45148325.jpg/960px-Challenger_2_Main_Battle_Tank_patrolling_outside_Basra%2C_Iraq_MOD_45148325.jpg?_=20130627202116", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Challenger_2_FV4034_-_Megatron_%287527720374%29.jpg/960px-Challenger_2_FV4034_-_Megatron_%287527720374%29.jpg?_=20130102110023", stars: 2 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/FV4034_Challenger_2_%E2%80%93_TankFest_2017_%2831403626968%29.jpg/960px-FV4034_Challenger_2_%E2%80%93_TankFest_2017_%2831403626968%29.jpg?_=20181015040301", stars: 3 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Leclerc_p1040703_cropped.jpg/960px-Leclerc_p1040703_cropped.jpg?_=20060716095812", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Leclerc_p1040617.jpg/960px-Leclerc_p1040617.jpg?_=20060716095606", stars: 2 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Leclerc-openphotonet_PICT6015.JPG/960px-Leclerc-openphotonet_PICT6015.JPG?_=20060717130056", stars: 3 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Moscow_2012_Victory_Day_Parade_Rehearsal%2C_T-90_tank%2C_Russia.jpg/960px-Moscow_2012_Victory_Day_Parade_Rehearsal%2C_T-90_tank%2C_Russia.jpg?_=20210505143908", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Moscow_2012_Victory_Day_Parade_Rehearsal%2C_T-90_Tank_2%2C_Russia.jpg/960px-Moscow_2012_Victory_Day_Parade_Rehearsal%2C_T-90_Tank_2%2C_Russia.jpg?_=20210505170129", stars: 2 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/The_80th_Air_Assault_Brigade_captured_a_T-90M_Proryv_tank_in_the_Kursk_region.jpg/960px-The_80th_Air_Assault_Brigade_captured_a_T-90M_Proryv_tank_in_the_Kursk_region.jpg?_=20241121073626", stars: 3 }
    ],
    funFacts: [
      "The T-90 is equipped with the Shtora defensive system, which uses infrared dazzlers to confuse incoming guided anti-tank missiles."
    ]
  },

  // ───────────────────────── Cold War ────────────────────────────
  {
    id: "t72",
    name: "T-72",
    country: "Soviet Union",
    category: "Main Battle Tank",
    era: "Cold War",
    images: [
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/A_T-72_Main_Battle_Tank_Prepares_to_Fire_15683.jpg/960px-A_T-72_Main_Battle_Tank_Prepares_to_Fire_15683.jpg?_=20200727221217", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/G%C5%82%C4%99bokie_T-72_02.jpg/960px-G%C5%82%C4%99bokie_T-72_02.jpg?_=20220626101736", stars: 2 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/G%C5%82%C4%99bokie_T-72_01.jpg/960px-G%C5%82%C4%99bokie_T-72_01.jpg?_=20220626101736", stars: 3 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/7/74/Centurion_tank_gateway_monument_%28geograph_5711365%29.jpg?_=20210423201749", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Centurion_cfb_borden_1.JPG/960px-Centurion_cfb_borden_1.JPG?_=20050822022701", stars: 2 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Centurion_FAK_4_Com_LC1513-025.jpg/960px-Centurion_FAK_4_Com_LC1513-025.jpg?_=20210823162931", stars: 3 }
    ],
    funFacts: [
      "The Centurion is considered one of the most successful tank designs ever made, serving for over 50 years in 17 countries."
    ]
  },

  // ─────────────────────────── WW2 ───────────────────────────────
  {
    id: "tiger1",
    name: "Tiger I",
    country: "Germany",
    category: "Main Battle Tank",
    era: "WW2",
    images: [
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Tiger_Ausf_E_vimoutiers_0018.jpg/960px-Tiger_Ausf_E_vimoutiers_0018.jpg?_=20110404145906", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Tiger_Ausf_E_vimoutiers_0021.jpg/960px-Tiger_Ausf_E_vimoutiers_0021.jpg?_=20110404151507", stars: 2 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Tiger_Ausf_E_vimoutiers_0020.jpg/960px-Tiger_Ausf_E_vimoutiers_0020.jpg?_=20110405003910", stars: 3 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/T_34_als_Teil_des_Sowjetischen_Ehrenmals_Berlin_%28Tiergarten%29_20160413-_MG_0004.jpg/960px-T_34_als_Teil_des_Sowjetischen_Ehrenmals_Berlin_%28Tiergarten%29_20160413-_MG_0004.jpg?_=20160424074205", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/T_34_1942_noBG.jpg/960px-T_34_1942_noBG.jpg?_=20190911092241", stars: 2 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/%D0%A4%D0%BE%D1%82%D0%BE_%D0%A2-34-85_%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D1%86%D0%B0_1944_%D0%B3%D0%BE%D0%B4%D0%B0_%D0%BD%D0%B0_%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%BC%D0%B5%D0%BD%D1%82%D0%B5_%D0%B2_%D0%9A%D1%83%D1%80%D1%81%D0%BA%D0%B5.jpg/960px-%D0%A4%D0%BE%D1%82%D0%BE_%D0%A2-34-85_%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D1%86%D0%B0_1944_%D0%B3%D0%BE%D0%B4%D0%B0_%D0%BD%D0%B0_%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%BC%D0%B5%D0%BD%D1%82%D0%B5_%D0%B2_%D0%9A%D1%83%D1%80%D1%81%D0%BA%D0%B5.jpg?_=20131015112612", stars: 3 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/M4_Sherman.JPG/960px-M4_Sherman.JPG?_=20100906215553", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/M4_Sherman_Utah_Beach.jpg/960px-M4_Sherman_Utah_Beach.jpg?_=20150712153544", stars: 2 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/M4_Sherman_tank_at_the_Heeresgeschichtliches_Museum_in_Vienna.jpg/960px-M4_Sherman_tank_at_the_Heeresgeschichtliches_Museum_in_Vienna.jpg?_=20230915060454", stars: 3 }
    ],
    funFacts: [
      "Over 49,000 M4 Sherman tanks were built during World War 2 — more than any other tank used by the Western Allies."
    ]
  }
];

  // ══════════════════════════════════════════════════════════════════
  //  APCs — Armoured Personnel Carriers
  //  Images: add via the admin page, then run update-game.bat
  // ══════════════════════════════════════════════════════════════════
  {
    id: "m113",
    name: "M113",
    country: "United States",
    category: "APC",
    era: "Cold War",
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
    funFacts: [
      "The Boxer uses a revolutionary 'drive module plus mission module' design — the front crew cab can be separated from the rear payload section and swapped in under an hour.",
      "This modularity means a single Boxer drive module can serve as an APC one day and an ambulance or command vehicle the next, without any workshop modifications.",
      "The Boxer is in service with Germany, the Netherlands, Lithuania, and Australia, and is one of the heaviest wheeled APCs ever built — nearly as well protected as some infantry fighting vehicles."
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  //  IFVs — Infantry Fighting Vehicles
  // ══════════════════════════════════════════════════════════════════
  {
    id: "m2bradley",
    name: "M2 Bradley",
    country: "United States",
    category: "IFV",
    era: "Cold War",
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
    funFacts: [
      "The Marder was one of the first true infantry fighting vehicles — designed not just to carry troops but to fight alongside them with its own heavy weapons.",
      "Its design placed such a priority on infantry protection that the troop compartment can withstand hits from 20mm rounds on all sides.",
      "The Marder has been continuously upgraded since its introduction in 1971 and remained in front-line German service for over 50 years."
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  //  Artillery — Self-Propelled Guns & Howitzers
  // ══════════════════════════════════════════════════════════════════
  {
    id: "m109paladin",
    name: "M109 Paladin",
    country: "United States",
    category: "Artillery",
    era: "Cold War",
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
    funFacts: [
      "The AS-90 can fire a burst of three rounds in under 10 seconds and sustain six rounds per minute for prolonged fire missions.",
      "Its 155mm gun uses a semi-automatic loading system that eliminates the need for a loader — the crew of five operates entirely from within the armoured turret.",
      "AS-90s were donated to Ukraine in 2023, where crews valued their combination of range, mobility, and protection compared to older Soviet-era artillery."
    ]
  },

  // ══════════════════════════════════════════════════════════════════
  //  Helicopters — Attack & Utility
  // ══════════════════════════════════════════════════════════════════
  {
    id: "ah64apache",
    name: "AH-64 Apache",
    country: "United States",
    category: "Helicopter",
    era: "Modern",
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
    funFacts: [
      "The Tiger was designed using radar-absorbing composite materials to reduce its radar cross-section — making it significantly harder to detect than older metal-airframe helicopters.",
      "Its engine exhausts are shaped and shielded to minimise the infrared signature, making it harder for heat-seeking missiles to lock on.",
      "The Tiger HAD (Hélicoptère d'Appui Destruction) variant used by France and Spain is one of the most agile attack helicopters in the world — its lightweight composite airframe gives it performance comparable to much smaller scout helicopters."
    ]
  }
];

// Convenience helper — total count, useful for the home-screen stats card
window.vehicleCount = window.vehicles.length;
