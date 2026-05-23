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
  },
  {
    id: "m113",
    name: "M113",
    country: "United States",
    category: "APC",
    era: "Cold War",
    images: [
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/US_provides_AFU_Soldiers_with_maintanence_training_on_M113_Armored_Personnel_Carrier_%287282080%29.jpg/960px-US_provides_AFU_Soldiers_with_maintanence_training_on_M113_Armored_Personnel_Carrier_%287282080%29.jpg?_=20241027213422", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/US_provides_AFU_Soldiers_with_maintanence_training_on_M113_Armored_Personnel_Carrier_%287282078%29.jpg/960px-US_provides_AFU_Soldiers_with_maintanence_training_on_M113_Armored_Personnel_Carrier_%287282078%29.jpg?_=20241027213407", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/US_provides_AFU_Soldiers_with_maintanence_training_on_M113_Armored_Personnel_Carrier_%287282079%29.jpg/960px-US_provides_AFU_Soldiers_with_maintanence_training_on_M113_Armored_Personnel_Carrier_%287282079%29.jpg?_=20241027213415", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/BTR-80_TEK.jpg/960px-BTR-80_TEK.jpg?_=20200122131134", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Btr-80_in_Serbia.jpg/960px-Btr-80_in_Serbia.jpg?_=20120204175745", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/b/b1/BTR-80_of_the_Hungarian_Army.jpg?_=20230429145914", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/UA_M1126_Stryker_infantry_carrier_vehicle.jpg/960px-UA_M1126_Stryker_infantry_carrier_vehicle.jpg?_=20241016194224", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Fort_Irwin_National_Training_Center_-_Stryker_-_3.jpg/960px-Fort_Irwin_National_Training_Center_-_Stryker_-_3.jpg?_=20111219024936", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/5/51/Stryker_ICV_front_q.jpg?_=20130928124831", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/GKN-Sankey_FV432_pic5.JPG/960px-GKN-Sankey_FV432_pic5.JPG?_=20120717173600", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/GKN_Sankey_FV432_pic12.JPG/960px-GKN_Sankey_FV432_pic12.JPG?_=20120717173215", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/9/95/Image-Bulldog2007.jpg?_=20070515163434", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Croatian_Patria_AMV_during_the_2025_military_parade.jpg/960px-Croatian_Patria_AMV_during_the_2025_military_parade.jpg?_=20250731212106", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Patria_AMV_Karlovac_2009_8.jpg/960px-Patria_AMV_Karlovac_2009_8.jpg?_=20090529123345", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Patria_AMV_NEMO.jpg/960px-Patria_AMV_NEMO.jpg?_=20190824164522", stars: 1 }
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
      { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGmeXsJMOb1awJv-LVnQIluVXSYXeovEZTEw&s", stars: 1 },
      { url: "https://www.army-technology.com/wp-content/uploads/sites/3/2018/09/Image-1-Boxer-Multi-Role-Armoured-Vehicle-MRAV.jpg", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/G%C5%82%C4%99bokie_BTR-60_01.jpg/960px-G%C5%82%C4%99bokie_BTR-60_01.jpg?_=20220626100847", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/BTR-60PB_DA-ST-89-06597.jpg/960px-BTR-60PB_DA-ST-89-06597.jpg?_=20060514084230", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/%D0%9A%D0%BE%D0%BD%D0%B0%D0%B5%D0%B2%2C_%D0%91%D0%A2%D0%A0-60.jpg/960px-%D0%9A%D0%BE%D0%BD%D0%B0%D0%B5%D0%B2%2C_%D0%91%D0%A2%D0%A0-60.jpg?_=20260408190915", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/APC_passes_Presidency_Sarajevo.jpg/960px-APC_passes_Presidency_Sarajevo.jpg?_=20090329231306", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/French_VAB_Vehicle_Being_Unloaded_from_RAF_C17_in_Mali_MOD_45155003.jpg/960px-French_VAB_Vehicle_Being_Unloaded_from_RAF_C17_in_Mali_MOD_45155003.jpg?_=20130625173846", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/French_VAB_APC_during_Operation_Desert_Shield.JPEG/960px-French_VAB_APC_during_Operation_Desert_Shield.JPEG?_=20100402205053", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Irish_Piranha_on_display.JPG?_=20190715184421", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/MOWAG_Piranha_4x4.JPG/960px-MOWAG_Piranha_4x4.JPG?_=20120924160508", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Irish_Army_Mowag_Piranha.jpg?_=20080217125534", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Eytan_--_Our-IDF-2018-IZE-131_%2844815555242%29_%28cropped%29.jpg/960px-Eytan_--_Our-IDF-2018-IZE-131_%2844815555242%29_%28cropped%29.jpg?_=20180924124955", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/0/07/Vehicles-of-idf-3.webp?_=20250606124902", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Eitan_APC_2026.jpg/960px-Eitan_APC_2026.jpg?_=20260314194932", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/1BFV01.jpg/960px-1BFV01.jpg?_=20170407181914", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/M2_Bradley_live_fire_exercise.jpg/960px-M2_Bradley_live_fire_exercise.jpg?_=20190710140844", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/M2-A2_Bradley_Postcard_%2852629519704%29.jpg/960px-M2-A2_Bradley_Postcard_%2852629519704%29.jpg?_=20250427114838", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/%D0%A1%D0%B0%D1%80%D1%8B%D0%BE%D0%B7%D0%B5%D0%BA%2C_%D0%91%D0%9C%D0%9F-2_%D0%BD%D0%B0_%D0%96%D0%B8%D0%B1%D0%B5%D0%BA_%D0%B6%D0%BE%D0%BB%D1%8B.jpg/960px-%D0%A1%D0%B0%D1%80%D1%8B%D0%BE%D0%B7%D0%B5%D0%BA%2C_%D0%91%D0%9C%D0%9F-2_%D0%BD%D0%B0_%D0%96%D0%B8%D0%B1%D0%B5%D0%BA_%D0%B6%D0%BE%D0%BB%D1%8B.jpg?_=20260329153812", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/UA_60th_Mechanized_Brigade_BMP-2_IFV.jpg/960px-UA_60th_Mechanized_Brigade_BMP-2_IFV.jpg?_=20240827200654", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/BMP-2_military_parade_rehearsal.jpg/960px-BMP-2_military_parade_rehearsal.jpg?_=20090816153636", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/6/61/Bmp-3_tan.jpg?_=20051116115735", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/BMP-3_%283%29.jpg/960px-BMP-3_%283%29.jpg?_=20130419145417", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/TB2015ExhibitionP2-42.jpg/960px-TB2015ExhibitionP2-42.jpg?_=20160811022100", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/FV510_Warrior_at_Camp_Coyote%2C_Kuwait.JPEG/960px-FV510_Warrior_at_Camp_Coyote%2C_Kuwait.JPEG?_=20110428092651", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/MCV-80.jpg/960px-MCV-80.jpg?_=20101231215813", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/FV510_Warrior_Applique_Armor.jpg/960px-FV510_Warrior_Applique_Armor.jpg?_=20251122211738", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/UA_21st_Mechanized_Brigade_CV-90.jpg/960px-UA_21st_Mechanized_Brigade_CV-90.jpg?_=20241115201124", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Combat_Vehicle_90_at_Estonian_parade-902243.jpeg/960px-Combat_Vehicle_90_at_Estonian_parade-902243.jpeg?_=20180704195443", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/CV_90_Mk_IV_SIAF-2022.jpg/960px-CV_90_Mk_IV_SIAF-2022.jpg?_=20220929202804", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Marder1A3.6.jpg/960px-Marder1A3.6.jpg?_=20060715233814", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/UA_Marder_1A3_IFV_in_training.jpg/960px-UA_Marder_1A3_IFV_in_training.jpg?_=20241008175436", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Marder_1A5.jpg/960px-Marder_1A5.jpg?_=20160224213034", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/BMP-1_Zlot_Dar%C5%82owo_2009.JPG/960px-BMP-1_Zlot_Dar%C5%82owo_2009.JPG?_=20090924191837", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/BMP-1_03.jpg/960px-BMP-1_03.jpg?_=20080517234617", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/%D0%91%D0%9C%D0%9F-1_%D1%81_%D1%83%D1%87%D0%B5%D0%B1%D0%BD%D0%BE%D0%B3%D0%BE_%D0%BF%D0%BE%D0%BB%D0%B8%D0%B3%D0%BE%D0%BD%D0%B0_%D0%90%D0%BB%D0%BC%D0%B0%D1%82%D0%B8%D0%BD%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%98%D0%BD%D1%81%D1%82%D0%B8%D1%82%D1%83%D1%82%D0%B0_%D0%A1%D1%83%D1%85%D0%BE%D0%BF%D1%83%D1%82%D0%BD%D1%8B%D1%85_%D0%92%D0%BE%D0%B9%D1%81%D0%BA.JPG/960px-%D0%91%D0%9C%D0%9F-1_%D1%81_%D1%83%D1%87%D0%B5%D0%B1%D0%BD%D0%BE%D0%B3%D0%BE_%D0%BF%D0%BE%D0%BB%D0%B8%D0%B3%D0%BE%D0%BD%D0%B0_%D0%90%D0%BB%D0%BC%D0%B0%D1%82%D0%B8%D0%BD%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%98%D0%BD%D1%81%D1%82%D0%B8%D1%82%D1%83%D1%82%D0%B0_%D0%A1%D1%83%D1%85%D0%BE%D0%BF%D1%83%D1%82%D0%BD%D1%8B%D1%85_%D0%92%D0%BE%D0%B9%D1%81%D0%BA.JPG?_=20150511112552", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Puma_IFV_Wettin_Sword_2022.jpg/960px-Puma_IFV_Wettin_Sword_2022.jpg?_=20220402211720", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Puma_IFV_with_MJH.jpg/960px-Puma_IFV_with_MJH.jpg?_=20190622144429", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Puma%2C_first_series.jpg/960px-Puma%2C_first_series.jpg?_=20150716194820", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/2007_Seoul_Air_Show_024.JPG/960px-2007_Seoul_Air_Show_024.JPG?_=20071020162026", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/2007_Seoul_Air_Show_025.JPG/960px-2007_Seoul_Air_Show_025.JPG?_=20071020161724", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Soldiers_from_20th_Mechanized_division_disembarking_from_K21_IFV.jpg?_=20150704155952", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/ZBD-04A_IFV_20170716.jpg/960px-ZBD-04A_IFV_20170716.jpg?_=20171210041920", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ZBD-04A_front_left_view_20170919.jpg/960px-ZBD-04A_front_left_view_20170919.jpg?_=20180827154827", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/ZBD-04A_rear_20170902.jpg/960px-ZBD-04A_rear_20170902.jpg?_=20170911141642", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Paladin_M109_howitzer_firing_position_%286239595%29.jpg/960px-Paladin_M109_howitzer_firing_position_%286239595%29.jpg?_=20250104091121", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Paladin_M109_howitzer_firing_position_%286239598%29.jpg/960px-Paladin_M109_howitzer_firing_position_%286239598%29.jpg?_=20250104091128", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Cannon_fire_-_M109_self-propelled_howitzer.jpg/960px-Cannon_fire_-_M109_self-propelled_howitzer.jpg?_=20081214120518", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/9/96/PzH_2000_of_the_Hungarian_Armed_Forces_%285%29.jpg?_=20230429145923", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/6/64/PzH_2000_of_the_Hungarian_Armed_Forces_%284%29.jpg?_=20230429145921", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/e/ee/PzH_2000_of_the_Hungarian_Armed_Forces_%283%29.jpg?_=20230429145914", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/2S19_MSTA-S%2C_Artillery_museum%2C_Saint-Petersburg_pic5.JPG/960px-2S19_MSTA-S%2C_Artillery_museum%2C_Saint-Petersburg_pic5.JPG?_=20160904145702", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/2S19_Msta-S_%2828051832178%29.jpg/960px-2S19_Msta-S_%2828051832178%29.jpg?_=20190210054929", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/ParkPatriot2015part6-02.jpg/960px-ParkPatriot2015part6-02.jpg?_=20160609110139", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/CAESAR_firing_in_Afghanistan.jpg/960px-CAESAR_firing_in_Afghanistan.jpg?_=20090918152804", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Caesar_artillery_system_at_Capu_Midia%2C_2023.jpg/960px-Caesar_artillery_system_at_Capu_Midia%2C_2023.jpg?_=20230831160612", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/French_Caesars_train_in_DF23_%287700355%29.jpg/960px-French_Caesars_train_in_DF23_%287700355%29.jpg?_=20241227104717", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/K9_K%C3%B5u.jpg/960px-K9_K%C3%B5u.jpg?_=20251207193728", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Przekazanie_155mm_samobie%C5%BCnej_haubicy_Krab.jpg?_=20160824192201", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Polish_Army_K9_back_at_Radom-2023.jpg/960px-Polish_Army_K9_back_at_Radom-2023.jpg?_=20230828195629", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/AS-90_self-propelled_artillery.JPG/960px-AS-90_self-propelled_artillery.JPG?_=20081003164133", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/British_AS-90_on_a_trailer_at_Estonia-Latvia_border_in_Ikla.jpg/960px-British_AS-90_on_a_trailer_at_Estonia-Latvia_border_in_Ikla.jpg?_=20190114093427", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Tank_Transporter_with_AS-90_on_board.jpg/960px-Tank_Transporter_with_AS-90_on_board.jpg?_=20220604131236", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/M270_MLRS_%281984%29.JPEG/960px-M270_MLRS_%281984%29.JPEG?_=20080618161235", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/M270_MLRS_Danish.jpg/960px-M270_MLRS_Danish.jpg?_=20150929135629", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/MARS_M270_MLRS_at_Open_Day_Munster_2015.jpg/960px-MARS_M270_MLRS_at_Open_Day_Munster_2015.jpg?_=20230123205623", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Russian_2S7_Pion_self_propelled_203_mm_Heavy_artillery_gun_%28Ank_Kumar%2C_Infosys_Limited%29_03.jpg/960px-Russian_2S7_Pion_self_propelled_203_mm_Heavy_artillery_gun_%28Ank_Kumar%2C_Infosys_Limited%29_03.jpg?_=20220620182058", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/2S7_Pion_at_ARMY-2018.jpg/960px-2S7_Pion_at_ARMY-2018.jpg?_=20201128203328", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/2S7_Pion_Army-2022_2022-08-20_2395.jpg/960px-2S7_Pion_Army-2022_2022-08-20_2395.jpg?_=20220904184359", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/M777_Howitzer_Helmand_April2007.JPEG/960px-M777_Howitzer_Helmand_April2007.JPEG?_=20130615155347", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Dynamic_Front_25-_FAS_2CR_shoot_M777_howitzer_%288765207%29.jpg/960px-Dynamic_Front_25-_FAS_2CR_shoot_M777_howitzer_%288765207%29.jpg?_=20241126204030", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/M777_howitzer_on_captured_equipment_exhibition_in_Moscow_%28side_view%29.jpg/960px-M777_howitzer_on_captured_equipment_exhibition_in_Moscow_%28side_view%29.jpg?_=20240507171437", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/PLZ_05_self_propelled_gun.jpg/960px-PLZ_05_self_propelled_gun.jpg?_=20100429004822", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/PLZ-05_Self-Propelled_Artillery_20170919.jpg/960px-PLZ-05_Self-Propelled_Artillery_20170919.jpg?_=20171002132030", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/PLZ-05_Self-Propelled_Artillery_20170902.jpg/960px-PLZ-05_Self-Propelled_Artillery_20170902.jpg?_=20170912103612", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/AH-64_Apache_%282233201139%29.jpg/960px-AH-64_Apache_%282233201139%29.jpg?_=20130405091753", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/7/70/Two_AH-64_Apache_attack_helicopters_on_exercise_at_Talisman_Sabre_2019_SHOALWATER_BAY_QLD_AUSTRALIA_07.08.2019.png?_=20210421095507", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/AH-64_Apache%2C_ILA_2024%2C_Schoenefeld_%28ILA44641%29.jpg/960px-AH-64_Apache%2C_ILA_2024%2C_Schoenefeld_%28ILA44641%29.jpg?_=20240615071822", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Mil_Mi_24_Hind_%2852232144100%29.jpg/960px-Mil_Mi_24_Hind_%2852232144100%29.jpg?_=20220730113311", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Czech_Air_Force_Mil_Mi-24_Hind_3362_-_Radom_Air_Show_-_20180825_0939_4719_DxO.jpg/960px-Czech_Air_Force_Mil_Mi-24_Hind_3362_-_Radom_Air_Show_-_20180825_0939_4719_DxO.jpg?_=20190918070428", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Czech_Air_Force_Mil_Mi-24_Hind_3362_-_Radom_Air_Show_-_20180825_0926_4675_DxO.jpg/960px-Czech_Air_Force_Mil_Mi-24_Hind_3362_-_Radom_Air_Show_-_20180825_0926_4675_DxO.jpg?_=20190918070428", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/UH-60.jpg/960px-UH-60.jpg?_=20220319231631", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/UH-60_2nd_Squadron%2C_2nd_Cavalry_Regiment_%28cropped%29.jpg/960px-UH-60_2nd_Squadron%2C_2nd_Cavalry_Regiment_%28cropped%29.jpg?_=20180416000526", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/UH_60_Black_Hawk_of_the_Croatian_Air_Force.jpg/960px-UH_60_Black_Hawk_of_the_Croatian_Air_Force.jpg?_=20241122090155", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/20181208_JASDF_CH-47_Chinook_Naha_Air_Show_2018-1.jpg/960px-20181208_JASDF_CH-47_Chinook_Naha_Air_Show_2018-1.jpg?_=20211229072205", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/20181208_JASDF_CH-47_Chinook_Naha_Air_Show_2018-32.jpg/960px-20181208_JASDF_CH-47_Chinook_Naha_Air_Show_2018-32.jpg?_=20211229072645", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/20181208_JASDF_CH-47_Chinook_Naha_Air_Show_2018-7.jpg/960px-20181208_JASDF_CH-47_Chinook_Naha_Air_Show_2018-7.jpg?_=20211229072317", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Kamov_Ka-50_in_flight.jpg/960px-Kamov_Ka-50_in_flight.jpg?_=20110822184616", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Kamov_Ka-50_in_Moscow.jpg/960px-Kamov_Ka-50_in_Moscow.jpg?_=20080613092734", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Russian_Air_Force_Kamov_Ka-50.jpg/960px-Russian_Air_Force_Kamov_Ka-50.jpg?_=20180403040500", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Adriatic_Strike_2023_%287845460%29.jpg/960px-Adriatic_Strike_2023_%287845460%29.jpg?_=20241224212706", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Spanish_Army_Eurocopter_Tiger_HAD_on_USS_Kearsarge_%28LHD-3%29_in_April_2016.JPG/960px-Spanish_Army_Eurocopter_Tiger_HAD_on_USS_Kearsarge_%28LHD-3%29_in_April_2016.JPG?_=20160426164024", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/French_Army%2C_6010%2C_Eurocopter_EC_665_Tiger_HAD_%2849580123847%29.jpg/960px-French_Army%2C_6010%2C_Eurocopter_EC_665_Tiger_HAD_%2849580123847%29.jpg?_=20200224185421", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/UH1_Huey_-_Fly_Navy_2017_%28cropped%29.jpg/960px-UH1_Huey_-_Fly_Navy_2017_%28cropped%29.jpg?_=20210604170723", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Bell_UH-1_Iroquois_%22Huey%22_Medevac_%28medical_evacuation%29.jpg/960px-Bell_UH-1_Iroquois_%22Huey%22_Medevac_%28medical_evacuation%29.jpg?_=20260307194101", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/GSOF_Huey_%281%29.jpg/960px-GSOF_Huey_%281%29.jpg?_=20231103191120", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/%27Z2388%27_Mil_Mi-8T_National_Military_Memorial_Park%2C_Bangalore_%28Ank_Kumar%2C_Infosys_Limited%29_04.jpg/960px-%27Z2388%27_Mil_Mi-8T_National_Military_Memorial_Park%2C_Bangalore_%28Ank_Kumar%2C_Infosys_Limited%29_04.jpg?_=20220823171843", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Mil_Mi-8_at_VDNKh.jpg/960px-Mil_Mi-8_at_VDNKh.jpg?_=20250429111542", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Mi-8_Kyiv_Museum_2018_G1.jpg/960px-Mi-8_Kyiv_Museum_2018_G1.jpg?_=20251214231632", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/20190719_NHIndustries_NH90.jpg/960px-20190719_NHIndustries_NH90.jpg?_=20190722193720", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/NHIndustries_NH90_TTH_Italian_Army_MM81540_EI-223_PAS_2013_01.jpg/960px-NHIndustries_NH90_TTH_Italian_Army_MM81540_EI-223_PAS_2013_01.jpg?_=20130730084620", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/NHIndustries_NH90_EAY_1.jpg/960px-NHIndustries_NH90_EAY_1.jpg?_=20190809184217", stars: 1 }
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Leonardo_AW101_Merlin_751_Squadron_Portuguese_Air_Force.png/960px-Leonardo_AW101_Merlin_751_Squadron_Portuguese_Air_Force.png?_=20250727234120", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Agusta-Westland_AW-101_%28ZR288%29%2C_Radom_Air_Show%2C_20230826_1514_9520.jpg/960px-Agusta-Westland_AW-101_%28ZR288%29%2C_Radom_Air_Show%2C_20230826_1514_9520.jpg?_=20230921165319", stars: 1 },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Portuguese_Air_Force_Agusta-Westland_EH-101_Merlin_Mk.514_19606_Royal_International_Air_Tattoo_2025_01.jpg/960px-Portuguese_Air_Force_Agusta-Westland_EH-101_Merlin_Mk.514_19606_Royal_International_Air_Tattoo_2025_01.jpg?_=20260120211952", stars: 1 }
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
