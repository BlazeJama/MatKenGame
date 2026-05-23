// MatKenGame service worker
// Bump CACHE_VERSION every time you change the cached files so old caches are evicted.
const CACHE_VERSION = "matkengame-v25";

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

// Install: precache the core files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
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

// Fetch: cache-first, fall back to network. Network responses are cached for next time.
self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          // Cache successful same-origin and CDN responses for next time
          if (response && response.status === 200 && response.type !== "opaque") {
            const clone = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Offline fallback: return the cached index.html for navigation requests
          if (event.request.mode === "navigate") {
            return caches.match("index.html");
          }
        });
    })
  );
});
