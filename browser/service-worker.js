// Two Caches: One for app shell, one for requests to server
var apiCacheName = "WishpoolApiCache-1"
var shellCacheName = "WishpoolShellCache-1";

// Files that constitute the app shell
var filesToCache = [
	// External dependencies
  'https://fonts.googleapis.com/css?family=Roboto',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
	'https://cdnjs.cloudflare.com/ajax/libs/angular-material/1.1.1/angular-material.min.css',
	'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js',
	'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-animate.min.js',
	'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-aria.min.js',
	'https://cdnjs.cloudflare.com/ajax/libs/angular-material/1.1.1/angular-material.min.js',
	'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.3.1/angular-ui-router.js',

  // Internal HTML JS CSS files
	'/',
	'/index.html',
	'/main.js',
	'/style.css',
	'/html/feed/feed.template.html',
	'/html/wish/wish.template.html',
  '/html/navbar/navbar.template.html',
	'/html/contribute/contribute.template.html',
	'/html/wishlist/wishlist.template.html',
	'/html/wishadd/wishadd.template.html',
	'/html/landing/landing.template.html'
];


// Installation: Caching the app shell
self.addEventListener('install', function (event) {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(shellCacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching App Shell...');
      return cache.addAll(filesToCache);
    })
  );
});


// Activation: Clearing old caches
self.addEventListener('activate', function (event) {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(cacheNames.map(function (cacheName) {
        console.log('[ServiceWorker] Removing old cache', cacheName);
        if (cacheName !== shellCacheName && cacheName !== apiCacheName) {
          return caches.delete(cacheName);
        }
      }));
    })
  );
});


// Fetching
self.addEventListener('fetch', function (event) {
  var apiUrl = 'https://server.wishpool.info/api/v1/';
  // First ensure that the request is a GET
  if(event.request.method !== "GET") return;

  // If an API request was made
  if (event.request.url.indexOf(apiUrl) === 0) {
    event.respondWith(
      // Fetch the request first
      fetch(event.request)
      .then(function (response) {
        if (response) {
          return caches.open(apiCacheName).then(function (cache) {
            cache.put(event.request, response.clone());
            console.log("[SW] Fetched and cached API data for: ", event.request);
            return response;
          })
        } 
      })
      .catch(function (err) {
        console.log("[SW] API data fetch failed. Checking cache for: ", err);
        return caches.match(event.request).then(function (response) {
          if (response) { 
            console.log('[SW] API data found in cache for: ', event.request); 
            return response;
          } else {
            console.log("[SW] API data not found in cache for: ", event.request); 
          }
        });
      })
    );
  // If an App Shell request was made
  } else {
    event.respondWith(
      // Check the cache for response. If the response isn't found, fetch it.
      caches.match(event.request).then(function (response) {
        if (response) { 
          console.log('[SW] App Shell data found in cache for: ', event.request); 
          return response;
        } else {
          console.log("[SW] App Shell data not found in cache. Fetching: ", event.request);
          return fetch(event.request).then(function (response) {
            return caches.open(shellCacheName).then(function (cache) {
              cache.put(event.request, response.clone());
              console.log("[SW] Fetched and cached App Shell data for: ", event.request);
              return response;
            });
          })
          .catch(function(err){
            console.log("[SW] App Shell data fetched failed for: ", event.request);
          });
        }
      })
    );
  }
});

