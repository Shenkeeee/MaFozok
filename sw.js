const CACHE = 'mafozok-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // ponytail: images are cache-first forever, so a changed photo needs a new filename (or bump CACHE)
  e.respondWith(e.request.destination === 'image' ? cacheFirst(e) : staleWhileRevalidate(e));
});

async function cacheFirst(e) {
  const cache = await caches.open(CACHE);
  return (await cache.match(e.request)) || fetchAndStore(cache, e.request);
}

// serve the cached page/json instantly, refresh it in the background for next launch
async function staleWhileRevalidate(e) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(e.request, { ignoreSearch: true });
  const fresh = fetchAndStore(cache, e.request);
  if (!cached) return fresh;
  e.waitUntil(fresh.catch(() => {}));
  return cached;
}

async function fetchAndStore(cache, req) {
  const res = await fetch(req);
  if (res.ok) await cache.put(req, res.clone());
  return res;
}
