self.addEventListener('install', event => {
    console.log('Service Worker installing.');
    event.waitUntil(
        caches.open('my-pwa-cache').then(cache => {
            return cache.addAll([
                '/my-pwa/',
                '/my-pwa/index.html',
                '/my-pwa/manifest.webmanifest',
                '/my-pwa/assets/icons/icon-192x192.png',
                '/my-pwa/assets/icons/icon-512x512.png'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
