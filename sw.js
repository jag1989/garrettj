const CACHE = 'garrettj-cache'


self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE)
		.then(
			cache => cache.addAll([
				'.',
				'https://fonts.googleapis.com/css?family=Raleway:500,600,700',
				'/index.html',
				'/assets/main.js',
				'/assets/images/jonathan-garrett-professional.jpg',
				'/assets/images/jonathan-garrett-japan.jpg',
				'/assets/images/asvb-logo.svg',
				'/assets/images/ege-logo.svg',
				'/assets/images/gch-logo.svg',
				'/assets/images/henshaws-logo.svg',
				'/assets/images/longbeds-logo.png',
				'/assets/images/paradigm-logo.svg',
				'/assets/images/pinkstones-logo.svg',
				'/assets/images/samaritans-logo.png'
			])
		)
	)
});

self.addEventListener('activate', event => {
	const cacheWhiteList = [CACHE];

	event.waitUntil(
		caches.keys().then(
			cacheNames => Promise.all(
				cacheNames.map(cacheName => {
					if (!cacheWhiteList.includes(cacheName)) {
						return caches.delete(cacheName);
					}
				})
			)
		)
	)
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request)
		.then(
			response => response || fetch(event.request).then(
				response => {
					if (!response || response.status !== 200) {
						return response;
					}
					const responseToCache = response.clone();
					caches.open(CACHE)
						.then(
							cache => cache.put(event.request, responseToCache)
						);
					return response;
				}
			)
		)
	)
});