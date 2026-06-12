// Shared constants used across multiple screens and components

export const DRAFT_STORAGE_KEY = "matken-draft-vehicles";
export const BEST_SCORES_KEY   = "matken-best-scores";
export const CALLSIGN_KEY      = "matken-callsign";
export const PACT_CONFIG_KEY   = "matken-pact-config";

export const POINTS_PER_CORRECT = 100;
export const HINT_PENALTY       = 150;
export const MAX_HINTS          = 2;
export const QUESTION_TIME_MS   = 15000;
export const SPEED_BONUS_MAX_MS = 5000;
export const SPEED_BONUS_MAX    = 50;

export const CATEGORY_OPTIONS = [
  { id: "all",              label: "ALL"  },
  { id: "Main Battle Tank", label: "MBT"  },
  { id: "APC",              label: "APC"  },
  { id: "IFV",              label: "IFV"  },
  { id: "Artillery",        label: "ARTY", hidden: true },
  { id: "Helicopter",       label: "HELO", hidden: true },
];

export const DIFFICULTY_OPTIONS = [
  { id: 1, label: "EASY",   stars: "★"   },
  { id: 2, label: "MEDIUM", stars: "★★"  },
  { id: 3, label: "HARD",   stars: "★★★" },
];

export const ERA_OPTIONS = [
  { id: "all",      label: "ALL"      },
  { id: "WW2",      label: "WW2",      hidden: true },
  { id: "Modern",   label: "MODERN"   },
  { id: "Cold War", label: "COLD WAR" },
];

export const PACT_OPTIONS = [
  { id: "all",         label: "ALL"    },
  { id: "NATO",        label: "NATO"   },
  { id: "Warsaw Pact", label: "WARSAW" },
  { id: "Other",       label: "OTHER",  hidden: true },
];

export const NATO_COUNTRIES = new Set([
  "United States", "United Kingdom", "France", "Germany", "Italy",
  "Netherlands", "Belgium", "Canada", "Norway", "Denmark", "Portugal",
  "Spain", "Turkey", "Greece", "Poland", "Czech Republic", "Hungary",
  "Romania", "Bulgaria", "Slovakia", "Slovenia", "Estonia", "Latvia",
  "Lithuania", "Albania", "Croatia", "Montenegro", "North Macedonia",
  "Finland", "Sweden",
]);

export const WARSAW_COUNTRIES = new Set([
  "Soviet Union", "Russia",
]);

export const SUPABASE_URL      = "https://eftpalpigevckaisugmp.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_Lx6cMTZg5n9ZKQ6I4rYoFQ_1W1nhhsr";
