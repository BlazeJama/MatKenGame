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
//   images    — array of { url, stars } objects. At least 2 required.
//                 stars: 1 = easy, 2 = medium, 3 = hard
//                 MVP ignores stars and picks a random image. The field is
//                 recorded so Phase 2 difficulty filtering doesn't need a
//                 data migration.
//   funFact   — one sentence shown after answering this vehicle
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
    funFact: "The M1 Abrams is powered by a gas turbine engine — the same type used in helicopters — giving it a distinctive whine when moving."
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
    funFact: "The Leopard 2's 120mm smoothbore gun became the de-facto standard for NATO main battle tanks."
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
    funFact: "Until 2023, no Challenger 2 had ever been destroyed by enemy fire in combat."
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
    funFact: "The Leclerc was the first Western main battle tank to feature a fully automated loading system, allowing it to operate with a 3-man crew instead of 4."
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
    funFact: "The T-90 is equipped with the Shtora defensive system, which uses infrared dazzlers to confuse incoming guided anti-tank missiles."
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
    funFact: "The T-72 is one of the most widely produced tanks in history, with over 25,000 built across many countries and variants."
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
    funFact: "The Centurion is considered one of the most successful tank designs ever made, serving for over 50 years in 17 countries."
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
    funFact: "The Tiger I's 88mm gun could destroy almost any Allied tank at ranges where Allied guns could not penetrate its armour."
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
    funFact: "The T-34's sloped armour was revolutionary — it effectively doubled the protection against direct hits without adding weight."
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
    funFact: "Over 49,000 M4 Sherman tanks were built during World War 2 — more than any other tank used by the Western Allies."
  }
];

// Convenience helper — total count, useful for the home-screen stats card
window.vehicleCount = window.vehicles.length;
