// MatKenGame service worker
// Bump CACHE_VERSION every time you change the cached files so old caches are evicted.
const CACHE_VERSION = "matkengame-v47";

// Hostnames whose responses must NEVER be cached — always go to network.
// Supabase leaderboard data is live and shared across devices; a cached
// response would hide new entries from other players until the SW updates.
const NETWORK_ONLY_HOSTS = ["supabase.co", "supabase.in"];

// Files to precache on install. These are the core local files only —
// CDN resources (React, Tailwind, Babel) are cached opportunistically on first fetch.
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

// Install: precache the core files.
// We do NOT call self.skipWaiting() here — the new SW waits until the app
// explicitly sends a SKIP_WAITING message so we never interrupt active gameplay.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(PRECACHE_URLS))
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

// Fetch: cache-first by default, but always go to network for live API hosts
// (leaderboard etc.) and never cache or intercept non-GET requests.
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Let non-GET requests (e.g. Supabase POST inserts) go straight to the network,
  // untouched. Service workers can intercept them but we don't want to.
  if (req.method !== "GET") return;

  // Live data — bypass cache entirely so every player sees fresh entries.
  const url = new URL(req.url);
  if (NETWORK_ONLY_HOSTS.some((h) => url.hostname.endsWith(h))) {
    event.respondWith(fetch(req));
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;

      return fetch(req)
        .then((response) => {
          // Cache successful same-origin and CDN responses for next time
          if (response && response.status === 200 && response.type !== "opaque") {
            const clone = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(req, clone));
          }
          return response;
        })
        .catch(() => {
          // Offline fallback: return the cached index.html for navigation requests
          if (req.mode === "navigate") {
            return caches.match("index.html");
          }
        });
    })
  );
});
