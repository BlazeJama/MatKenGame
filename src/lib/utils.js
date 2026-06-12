// Shared utility functions

import { pactConfig as filePactConfig } from '../../data/vehicles';
import {
  BEST_SCORES_KEY, DRAFT_STORAGE_KEY, PACT_CONFIG_KEY,
  POINTS_PER_CORRECT, HINT_PENALTY,
  NATO_COUNTRIES, WARSAW_COUNTRIES,
  SUPABASE_URL, SUPABASE_ANON_KEY,
  SPEED_BONUS_MAX, SPEED_BONUS_MAX_MS,
} from './constants';

export function loadBestScores() {
  try {
    const raw = localStorage.getItem(BEST_SCORES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};

    // Migration ladder — old data is brought up to the new shape automatically:
    //   v1 (flat):       { cat: number(0-10) }
    //   v2 (nested):     { cat: { diff: number(0-10) } }
    //   v3 (points):     { cat: { diff: { normal: number(0-1000), timed: ... } } }   ← current
    const migrated = {};
    for (const [cat, val] of Object.entries(parsed)) {
      migrated[cat] = {};
      if (typeof val === "number") {
        const pts = val <= 10 ? val * POINTS_PER_CORRECT : val;
        migrated[cat][1] = { normal: pts };
      } else if (val && typeof val === "object") {
        for (const [diff, score] of Object.entries(val)) {
          if (typeof score === "number") {
            const pts = score <= 10 ? score * POINTS_PER_CORRECT : score;
            migrated[cat][diff] = { normal: pts };
          } else if (score && typeof score === "object") {
            migrated[cat][diff] = score;
          }
        }
      }
    }
    return migrated;
  } catch (_) {
    return {};
  }
}

// Returns the pact id ("NATO" | "Warsaw Pact" | "Other") for a given country.
// Priority: localStorage override → vehicles.js export → hardcoded sets
export function getVehiclePact(country) {
  try {
    const local = JSON.parse(localStorage.getItem(PACT_CONFIG_KEY) || "{}");
    if (local[country]) return local[country];
  } catch (_) {}
  if (filePactConfig && filePactConfig[country]) return filePactConfig[country];
  if (NATO_COUNTRIES.has(country))   return "NATO";
  if (WARSAW_COUNTRIES.has(country)) return "Warsaw Pact";
  return "Other";
}

export function loadDraftFromStorage() {
  try {
    const stored = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn("Failed to read draft from localStorage:", e);
  }
  return null;
}

// Fisher-Yates shuffle — returns a new array, doesn't mutate the input
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickRandom(arr, n) {
  return shuffle(arr).slice(0, n);
}

export function buildRound(vehicles, difficulty) {
  const QUESTIONS_PER_ROUND = 10;
  const hasImageAtDifficulty = (v) =>
    Array.isArray(v.images) && v.images.some((img) => img.stars === difficulty);

  const playable = vehicles.filter(hasImageAtDifficulty);
  const roundVehicles = shuffle(playable).slice(0, QUESTIONS_PER_ROUND);

  return roundVehicles.map((vehicle) => {
    const imagesAtDifficulty = vehicle.images.filter((img) => img.stars === difficulty);
    const image = pickRandom(imagesAtDifficulty, 1)[0];

    const facts =
      Array.isArray(vehicle.funFacts) && vehicle.funFacts.length > 0
        ? vehicle.funFacts
        : vehicle.funFact
        ? [vehicle.funFact]
        : [];
    const funFact = facts.length > 0 ? pickRandom(facts, 1)[0] : "";

    const wrongPool = vehicles.filter(
      (v) => v.id !== vehicle.id && v.category === vehicle.category
    );
    const wrongAnswers = pickRandom(wrongPool, Math.min(3, wrongPool.length));
    const options = shuffle([vehicle, ...wrongAnswers]);
    return { vehicle, image, options, funFact };
  });
}

export function scoreLabel(score) {
  if (score >= 900) return "ELITE OPERATOR";
  if (score >= 700) return "FIELD READY";
  if (score >= 500) return "OBJECTIVE COMPLETE";
  if (score >= 300) return "TRAINING REQUIRED";
  return "BACK TO BASICS";
}

export function scoreSubtext(score) {
  if (score >= 900) return "Exceptional field intelligence";
  if (score >= 700) return "Strong recognition capability";
  if (score >= 500) return "Continue your training";
  if (score >= 300) return "Review vehicle profiles";
  return "Intensive training needed";
}

export function scoreLabelColor(score) {
  if (score >= 700) return "#f59e0b";
  if (score >= 500) return "#94a3b8";
  return "#ef4444";
}

export function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export async function submitScore({ callsign, score, total, category, difficulty, mode = "normal", hintsUsed = 0 }) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/leaderboard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Prefer": "return=representation",
    },
    body: JSON.stringify({
      callsign, score, total, category, difficulty,
      mode, hints_used: hintsUsed,
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Submit failed (${res.status})${text ? ": " + text : ""}`);
  }
  const data = await res.json();
  return { newBest: Array.isArray(data) && data.length > 0 };
}

export async function fetchLeaderboard(category, difficulty, mode) {
  let url = `${SUPABASE_URL}/rest/v1/leaderboard`
    + `?select=callsign,score,total,category,difficulty,mode,created_at`
    + `&order=score.desc,created_at.asc&limit=10`;
  if (category   && category   !== "all") url += `&category=eq.${encodeURIComponent(category)}`;
  if (difficulty && difficulty !== "all") url += `&difficulty=eq.${difficulty}`;
  if (mode       && mode       !== "all") url += `&mode=eq.${mode}`;
  const res = await fetch(url, {
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchPlayerBest(callsign, category, difficulty, mode) {
  let url = `${SUPABASE_URL}/rest/v1/leaderboard`
    + `?select=callsign,score,total,category,difficulty,mode,created_at`
    + `&callsign=eq.${encodeURIComponent(callsign)}`
    + `&order=score.desc&limit=1`;
  if (category   && category   !== "all") url += `&category=eq.${encodeURIComponent(category)}`;
  if (difficulty && difficulty !== "all") url += `&difficulty=eq.${difficulty}`;
  if (mode       && mode       !== "all") url += `&mode=eq.${mode}`;
  const res = await fetch(url, {
    headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": `Bearer ${SUPABASE_ANON_KEY}` },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data[0] || null;
}

export async function fetchRankAbove(score, category, difficulty, mode) {
  let url = `${SUPABASE_URL}/rest/v1/leaderboard?score=gt.${score}`;
  if (category   && category   !== "all") url += `&category=eq.${encodeURIComponent(category)}`;
  if (difficulty && difficulty !== "all") url += `&difficulty=eq.${difficulty}`;
  if (mode       && mode       !== "all") url += `&mode=eq.${mode}`;
  try {
    const res = await fetch(url, {
      method: "HEAD",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Prefer": "count=exact",
      },
    });
    const cr = res.headers.get("content-range");
    if (cr) {
      const count = parseInt(cr.split("/")[1]);
      if (!isNaN(count)) return count + 1;
    }
  } catch (_) {}
  return null;
}
