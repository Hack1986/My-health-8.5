// My Health Record V8.2 — GitHub Pages project-subpath safe offline cache.
const CACHE_NAME = 'my-health-record-v8-4';
const APP_ROOT = new URL('./', self.registration.scope);
const CORE_PATHS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Cache core files individually: one missing optional response won't abort all installation.
    for (const path of CORE_PATHS) {
      const url = new URL(path, APP_ROOT);
      try {
        const response = await fetch(url, {cache: 'reload'});
        if (response.ok) await cache.put(url, response.clone());
      } catch (err) {
        // Keep installing; a later online visit can populate missing assets.
      }
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => key.startsWith('my-health-record-') && key !== CACHE_NAME)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== APP_ROOT.origin || !url.pathname.startsWith(APP_ROOT.pathname)) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request, {ignoreSearch: request.mode === 'navigate'});
    if (cached) return cached;

    try {
      const response = await fetch(request);
      if (response && response.ok) cache.put(request, response.clone());
      return response;
    } catch (err) {
      if (request.mode === 'navigate') {
        const fallback = await cache.match(new URL('./index.html', APP_ROOT));
        if (fallback) return fallback;
      }
      return new Response('ออฟไลน์: ไม่พบไฟล์นี้ในแคช กรุณาเปิดแอปขณะเชื่อมต่ออินเทอร์เน็ตหนึ่งครั้ง', {
        status: 503, headers: {'Content-Type': 'text/plain; charset=utf-8'}
      });
    }
  })());
});
