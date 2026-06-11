// MatKenGame service worker
// Bump CACHE_VERSION every time you deploy so old caches are evicted.
const CACHE_VERSION = "matkengame-v59";

// Hostnames whose responses must NEVER be cached — always go to network.
const NETWORK_ONLY_HOSTS = ["supabase.co", "supabase.in"];

// Core files to precache on install.
// NOTE: Vite bundles JS/CSS into hashed filenames — those are cached
// opportunistically on first fetch rather than listed here.
// Vehicle images (~35 MB) are also cached on demand during gameplay.
const PRECACHE_URLS = [
  "./",
  "manifest.json",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
];

// Entry points that should always be fetched fresh when online.
const NETWORK_FIRST_PATHS = [
  "/",
  "/index.html",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      const requests = PRECACHE_URLS.map((url) => new Request(url, { cache: "reload" }));
      return cache.addAll(requests);
    })
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

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

function isNetworkFirst(url) {
  return NETWORK_FIRST_PATHS.some((p) => url.pathname === p || url.pathname.endsWith(p));
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (NETWORK_ONLY_HOSTS.some((h) => url.hostname.endsWith(h))) {
    event.respondWith(fetch(req));
    return;
  }

  if (req.mode === "navigate" || isNetworkFirst(url)) {
    event.respondWith(networkFirst(req));
    return;
  }

  event.respondWith(cacheFirst(req));
});

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
