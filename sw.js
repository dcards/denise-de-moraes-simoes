var CACHE_NAME = 'denise-de-moraes-simoes-to-v01-01';
var urlsToCache = [
	'/denise-de-moraes-simoes/',
	'/denise-de-moraes-simoes/index.html',
	'/denise-de-moraes-simoes/offline.html',
	'/denise-de-moraes-simoes/404.html',
	'/denise-de-moraes-simoes/favicon/android-chrome-512x512.png',
	'/denise-de-moraes-simoes/favicon/android-icon-192x192.png',
	'/denise-de-moraes-simoes/favicon-foto/android-chrome-512x512.png',
	'/denise-de-moraes-simoes/favicon-foto/android-icon-192x192.png',
	'/denise-de-moraes-simoes/css/all.css',
	'/denise-de-moraes-simoes/webfonts/fa-brands-400.eot',
	'/denise-de-moraes-simoes/webfonts/fa-brands-400.svg',
	'/denise-de-moraes-simoes/webfonts/fa-brands-400.ttf',
	'/denise-de-moraes-simoes/webfonts/fa-brands-400.woff',
	'/denise-de-moraes-simoes/webfonts/fa-brands-400.woff2',
	'/denise-de-moraes-simoes/webfonts/fa-regular-400.eot',
	'/denise-de-moraes-simoes/webfonts/fa-regular-400.svg',
	'/denise-de-moraes-simoes/webfonts/fa-regular-400.ttf',
	'/denise-de-moraes-simoes/webfonts/fa-regular-400.woff',
	'/denise-de-moraes-simoes/webfonts/fa-regular-400.woff2',
	'/denise-de-moraes-simoes/webfonts/fa-solid-900.eot',
	'/denise-de-moraes-simoes/webfonts/fa-solid-900.svg',
	'/denise-de-moraes-simoes/webfonts/fa-solid-900.ttf',
	'/denise-de-moraes-simoes/webfonts/fa-solid-900.woff',
	'/denise-de-moraes-simoes/webfonts/fa-solid-900.woff2',
	'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
	'https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
	'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
	'/denise-de-moraes-simoes/imgs/denise-de-moraes-simoes-sobre-picture-mobile.jpg',
	'/denise-de-moraes-simoes/imgs/denise-de-moraes-simoes-sobre-picture-mobile-02.jpg',
	'/denise-de-moraes-simoes/imgs/logo-cartao-digital-puro-v01-01.png',
	'/denise-de-moraes-simoes/imgs/portfolio-01.png',
	'/denise-de-moraes-simoes/imgs/portfolio-02.png',
	'/denise-de-moraes-simoes/imgs/portfolio-03.png',
	'/denise-de-moraes-simoes/imgs/logo-bkg-03-mobile-transparente.png',
	'/denise-de-moraes-simoes/imgs/logo-denise-de-moraes-simoes-cartao-digital-horiz-v01-01.png',
	'/denise-de-moraes-simoes/imgs/dcard-cartao-digital-molde-cabecalho-v01-01.png',
	'/denise-de-moraes-simoes/imgs/picture-circle-bkg.png',
	'/denise-de-moraes-simoes/imgs/denise-de-moraes-simoes-dcard-slide-01.jpg',
	'/denise-de-moraes-simoes/imgs/denise-de-moraes-simoes-dcard-slide-02.jpg',
	'/denise-de-moraes-simoes/imgs/denise-de-moraes-simoes-dcard-slide-03.jpg'
];
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});
self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					// Return true if you want to remove this cache,
					// but remember that caches are shared across
					// the whole origin
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});
/* FETCH */
self.addEventListener('fetch', function(event) {
	event.respondWith(
	// Try the cache
		caches.match(event.request).then(function(response) {
			//console.log('response 01 = ' + response);
			if (response) {
				return response;
			}
			return fetch(event.request).then(function(response) {
				//console.log('response.status = ' + response.status);
				if (response.status === 404) {
					return caches.match('/denise-de-moraes-simoes/404.html');
				}
				//console.log('response 02 = ' + response);
				return response
			});
		}).catch(function() {
			// If both fail, show a generic fallback:
			//console.log('offline event = ' + event);
			return caches.match('/denise-de-moraes-simoes/offline.html');
		})
	);
});