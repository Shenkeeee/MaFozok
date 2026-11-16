const CACHE = 'mafozok-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(staleWhileRevalidate(e));
});

// serve from cache instantly, revalidate in the background (ETag → usually a tiny 304),
// so a replaced file shows up on the next view
async function staleWhileRevalidate(e) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(e.request, { ignoreSearch: true });
  const fresh = fetchAndStore(cache, e.request);
  if (!cached) return fresh;
  e.waitUntil(fresh.catch(() => {}));
  return cached;
}

async function fetchAndStore(cache, req) {
  // no-cache: always ask the server (If-None-Match/If-Modified-Since), never trust the HTTP cache's guess
  const res = await fetch(req.url, { cache: 'no-cache' });
  if (res.ok) await cache.put(req, res.clone());
  return res;
}
