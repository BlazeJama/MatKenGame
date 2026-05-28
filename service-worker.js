// MatKenGame service worker
// Bump CACHE_VERSION every time you change the cached files so old caches are evicted.
const CACHE_VERSION = "matkengame-v55";

// Hostnames whose responses must NEVER be cached — always go to network.
// Supabase leaderboard data is live and shared across devices; a cached
// response would hide new entries from other players until the SW updates.
const NETWORK_ONLY_HOSTS = ["supabase.co", "supabase.in"];

// Files to precache on install. These are the core local files only —
// CDN resources (React, Tailwind, Babel) are cached opportunistically on first fetch.
//
// NOTE: vehicle images in assets/images/ are intentionally NOT in this list.
// There are 146 of them (~35 MB) and a slow mobile install would either be
// painfully slow or fail outright. Instead, the cacheFirst strategy below
// caches each image the first time it is fetched during gameplay, so:
//   - first session online  → every image viewed is now offline-ready
//   - subsequent sessions   → all viewed images work offline
// Future enhancement: a "Cache all images for offline" button that prefetches
// the full set so even un-viewed vehicles work without a network.
const PRECACHE_URLS = [
  "./",
  "index.html",
  "app.jsx",
  "manifest.json",
  "data/vehicles.js",
  "admin/",
  "admin/index.html",
  "admin/admin.jsx",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png"
];

// Files that should always be fetched fresh when online (network-first).
// These are the entry points whose contents change every deploy — using a
// cache-first strategy on them is what caused iOS PWAs to keep serving an
// older version after an "Update available" refresh.
const NETWORK_FIRST_PATHS = [
  "/",
  "/index.html",
  "/app.jsx",
  "/data/vehicles.js",
  "/admin/",
  "/admin/index.html",
  "/admin/admin.jsx",
];

// Install: precache the core files.
// We do NOT call self.skipWaiting() here — the new SW waits until the app
// explicitly sends a SKIP_WAITING message so we never interrupt active gameplay.
//
// CRITICAL: every Request is created with { cache: "reload" } so the precache
// fetches BYPASS the HTTP cache. Without this, the browser's HTTP cache can
// hand the new SW a stale index.html / app.jsx, which then gets stored under
// the new cache version — meaning the user has a new SW but still the old
// site. This is the classic iOS PWA "have to reinstall to see updates" bug.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      const requests = PRECACHE_URLS.map((url) => new Request(url, { cache: "reload" }));
      return cache.addAll(requests);
    })
  );
});

// Message handler — the app posts { type: "SKIP_WAITING" } when the user
// clicks the update banner and it is safe to activate the new SW.
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Activate: clean up any old cache versions
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// True if a URL's pathname matches one of NETWORK_FIRST_PATHS, allowing
// for the GitHub Pages subpath (/MatKenGame/...).
function isNetworkFirst(url) {
  return NETWORK_FIRST_PATHS.some((p) => url.pathname === p || url.pathname.endsWith(p));
}

// Fetch strategy:
//   - Non-GET → straight to network (we never intercept writes).
//   - Live API hosts (Supabase) → straight to network.
//   - Entry-point files (index.html, app.jsx, etc.) → NETWORK-FIRST so a
//     refresh always picks up the latest deploy when online.
//   - Everything else → cache-first (CDN libs, images, icons).
self.addEventListener("fetch", (event) => {
  const req = event.request;

  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (NETWORK_ONLY_HOSTS.some((h) => url.hostname.endsWith(h))) {
    event.respondWith(fetch(req));
    return;
  }

  // Treat top-level page navigations as network-first too — same reason as
  // the entry-point files: the user just tapped Refresh, give them the
  // freshest HTML if we can reach the network.
  if (req.mode === "navigate" || isNetworkFirst(url)) {
    event.respondWith(networkFirst(req));
    return;
  }

  // Default: cache-first for everything else (libs, fonts, images).
  event.respondWith(cacheFirst(req));
});

// Network-first: try the network, fall back to cache. Successful responses
// update the cache so we always have a working offline copy.
function networkFirst(req) {
  return fetch(req)
    .then((response) => {
      if (response && response.status === 200 && response.type !== "opaque") {
        const clone = response.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(req, clone));
      }
      return response;
    })
    .catch(() => caches.match(req).then((cached) => cached || caches.match("index.html")));
}

// Cache-first: serve from cache if present, otherwise fetch + cache.
function cacheFirst(req) {
  return caches.match(req).then((cached) => {
    if (cached) return cached;
    return fetch(req)
      .then((response) => {
        if (response && response.status === 200 && response.type !== "opaque") {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, clone));
        }
        return response;
      })
      .catch(() => {
        if (req.mode === "navigate") return caches.match("index.html");
      });
  });
}
