
app.factory('WishPoolCacheService', function($cacheFactory, $q) {
  var WishPoolCacheService = {};

  WishPoolCacheService.createCache = function(name) {
    return $cacheFactory(name || 'defaultCache');
  }

  WishPoolCacheService.put = function(cache, key, value) {
    cache.put(key, value);
  }

  WishPoolCacheService.isInCache = function(cache, key) {
    return cache.get(key) != null;
  }

  WishPoolCacheService.get = function(cache, key) {
    return cache.get(key);
  }

  WishPoolCacheService.requestCache = function(cache, key) {
    return $q(function(resolve) {
      resolve(cache.get(key))
    });
  }

  WishPoolCacheService.cacheData = function(cache, key) {
		return function(response) {
			WishPoolCacheService.put(cache, key, response);
			return response;
		}
	}


  return WishPoolCacheService;
});
