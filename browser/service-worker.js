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
self.addEventListener('install', function(event) {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(shellCacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching App Shell');
      return cache.addAll(filesToCache);
    })
  );
});


// Activation: Clearing old caches
self.addEventListener('activate', function(event) {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(cacheNames.map(function(cacheName) {
        console.log('[ServiceWorker] Removing old cache', cacheName);
        if (cacheName !== shellCacheName && cacheName !== apiCacheName) {
          return caches.delete(cacheName);
        }
      }));
    })
  );
});

// Fetching: The SW first checks if the request is an API one or an App Shell one  
self.addEventListener('fetch', function(event) {
  console.log('[ServiceWorker] Fetch', event.request.url);
  var apiUrl = 'https://server.wishpool.info/api/v1/';
  // If API request
  if (event.request.url.indexOf(apiUrl) === 0) {
    event.respondWith(  
      caches.match(event.request).then(function(response){
        if (response) { 
          console.log('[ServiceWorker] API-Response found in Cache.'); 
          return response;
        }else{  
          return fetch(event.request)  
          .then(function(response) {  
            return caches.open(apiCacheName).then(function(cache) {  
              cache.put(event.request.url, response.clone());  
              console.log('[ServiceWorker] Fetched&Cached Data');  
              return response;  
            });  
          })
        }  
      })
    );
  // If App Shell request
  } else {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) { console.log('[ServiceWorker] Shell-Response found in Cache.'); }  
        return response || fetch(event.request);
      })
    );
  }
});


