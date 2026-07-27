const CACHE_NAME = 'pulsesync-v1.0';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/main.css',
  './css/components.css',
  './css/login.css',
  './css/dashboard.css',
  './js/app.js',
  './js/auth.js',
  './js/pwa.js',
  './assets/icons/icon.svg'
];

// Installation phase: Cache critical static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[PWA Service Worker] Caching initial static app shell');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
      .catch((error) => console.error('[PWA Service Worker] Installation failed:', error))
  );
});

// Activation phase: Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[PWA Service Worker] Purging legacy cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch phase: Stale-while-revalidate strategy for local assets, fallback to network
self.addEventListener('fetch', (event) => {
  // Only intercept GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and request is for navigation, return cached index.html
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });

      return cachedResponse || fetchPromise;
    })
  );
});
