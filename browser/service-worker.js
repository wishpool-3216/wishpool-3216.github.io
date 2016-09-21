var dataCacheName = "wishpool";
var cacheName = "Wishpool-v1";
var filesToCache = [
	// External Dependencies
	'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic',
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
	'/html/contribute/contribute.template.html',
	'/html/wishlist/wishlist.template.html',
	'/html/wishadd/wishadd.template.html',
	'/html/landing/landing.template.html'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching App Shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        console.log('[ServiceWorker] Removing old cache', key);
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});


self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  var dataUrl = 'https://wishpool-backend.com/';
  if (e.request.url.indexOf(dataUrl) === 0) {
    // When the request is made
    e.respondWith(  
      // It fetches the request
      fetch(e.request)  
      // But intercepts the response
      .then(function(response) {  
        // Opens cache
        return caches.open(dataCacheName).then(function(cache) {  
          // Clones the res and stores it k:req.url v:res.clone pair
          cache.put(e.request.url, response.clone());  
          console.log('[ServiceWorker] Fetched&Cached Data');  
          // Responds with the actual response
          return response;  
        });  
      })  
    );
  } else {
    // Check if requested URL is for the data service here
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
