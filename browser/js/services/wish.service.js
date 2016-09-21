app.factory('WishService', function($http, WishPoolCacheService, __env){

	var WishService = {};

	// sUrl refers to server URL
	var sUrl = __env.apiUrl;
	var cache = WishPoolCacheService.createCache('wishCache');

	var getResponseData = function(response){
		return response.data;
	}

	var getUserGiftsCacheId = function(userId) {
		return 'user_gifts_' + userId;
	}

	// Gets all the gifts that a user is receiving
	WishService.getUserGifts = function(userId) {
		var key = getUserGiftsCacheId(userId);
		if (WishPoolCacheService.isInCache(cache, key)) return WishPoolCacheService.requestCache(cache, key);
		return $http.get(sUrl + '/api/v1/users/' + userId + '/gifts')
								.then(getResponseData).then(WishPoolCacheService.cacheData(cache, key));;
	}


	// Gets gift data for a particular gift
	WishService.getGift = function(giftId){
		return $http.get(sUrl + '/api/v1/gifts/' + giftId)
		.then(getResponseData);
	}

	// Creates a new gift for a user
	WishService.addGift = function(userId, giftData){
		/* giftData should contain: {name, publicity, expected_price, expiry, description} */
		return $http.post(sUrl + '/api/v1/users/' + userId + '/gifts', {
			user_id: userId,
			name: giftData.name,
			publicity: giftData.publicity,
			expected_price: giftData.expected_price || null,
			expiry: giftData.expiry || null,
			description: giftData.description || null,
			image_file_name: giftData.source
		})
		.then(getResponseData);
	}

	WishService.cacheNewGift = function(userId, gift) {
		var key = getUserGiftsCacheId(userId);
		if (!WishPoolCacheService.isInCache(cache, key)) return;
		var list = WishPoolCacheService.get(cache, key);
		list.push(gift);
		WishPoolCacheService.put(cache, key, list);
	}

	// Updates a gift with new data
	WishService.editGift= function(giftId, giftData){
		$http.patch(sUrl + '/api/v1/gifts/' + giftId, {
			name: giftData.name,
			publicity: giftData.publicity,
			expected_price: giftData.expected_price || null,
			expiry: giftData.expiry || null,
			description: giftData.description || null
		})
		.then(getResponseData);
	}


	// Deletes a gift
	WishService.deleteGift = function(giftId){
		$http.delete(sUrl + '/api/v1/gifts/' + giftId)
		.then(getResponseData);
	}

	return WishService;

})
