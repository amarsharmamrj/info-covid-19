const dynamicCacheName = 'site-static-v1';
const assets = [
    '/',
    '/index.html',
    '/css/animate.css',
    '/css/bootstrap.min.css',
    '/css/animate.css',
    '/js/app.js',
    '/js/bootstrap.min.js',
    '/js/jquery-3.3.1.min.js',
    '/js/scipt.js',
    '/js/wow.js',
    '/images/bg.jpg',
    '/images/moon',
    '/images/mountain.png',
    '/images/road.png',
    '/images/logo-72x72.png',
    '/images/logo-96x96.png',
    '/images/logo-128x128.png',
    '/images/logo-144x144.png',
    '/images/logo-152x152.png',
    '/images/logo-192x192.png',
    '/images/logo-384x384.png',
    '/images/logo-512x512.png',
    '/images/favicon.png',
];

// install event
self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});

// activate event
self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== dynamicCacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});

// When we change the name we could have multiple cache, to avoid that we need to delet the old cache, so with this function we check the key that is our cache naming, if it is different from the actual naming we delete it, in this way we will always have only the last updated cache.

// fetch event
self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
        })
    );
});