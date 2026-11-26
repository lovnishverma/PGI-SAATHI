const CACHE_NAME = 'pgi-saathi-v2.2.0';

// Core shell assets to precache immediately on install
const STATIC_SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './favicon.svg',
  './icons.svg'
];

// Install event: cache static application shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[PGI Saathi SW] Pre-caching application shell version:', CACHE_NAME);
      return cache.addAll(STATIC_SHELL_ASSETS).catch((err) => {
        console.warn('[PGI Saathi SW] Non-fatal precache warning:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate event: purge outdated cache generations
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key.startsWith('pgi-saathi-') && key !== CACHE_NAME)
          .map((key) => {
            console.log('[PGI Saathi SW] Deleting obsolete cache:', key);
            return caches.delete(key);
          })
      );
    })
  );
  self.clients.claim();
});

// Fetch event: Strategy optimized for hospital connectivity
// - Navigation / HTML: Network-first, fallback to cached index.html
// - Static JS, CSS, Media: Cache-first, fallback to network and dynamically cache
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only handle standard HTTP/HTTPS GET requests
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // Skip browser extension schemes or firestore real-time sockets
  if (!url.protocol.startsWith('http')) return;
  if (url.hostname.includes('firestore.googleapis.com')) return;

  // HTML Page Navigation requests
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            return cached || caches.match('./index.html') || caches.match('/index.html');
          });
        })
    );
    return;
  }

  // Static Assets (Hashed JS, CSS, Images, SVGs, Fonts)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch((_err) => {
          // Offline fallback for known asset types
          console.warn('[PGI Saathi SW] Asset fetch failed offline:', request.url);
          return null;
        });
    })
  );
});
