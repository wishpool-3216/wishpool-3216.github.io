'use strict';

app.factory('WishService', function($http){
	var WishService = {};
	var getResponseData = response => response.data;

	WishService.getUserGifts = function(userId){
		$http.get('/api/v1/user/' + userId + '/gifts')
		.then(getResponseData);
	}

	WishService.getGift = function(giftId){
		$http.get('/api/v1/gifts' + giftId)
		.then(getResponseData);
	}

	WishService.addGift = function(userId, giftData){
		/* giftData should contain: {name, publicity, expected_price, expiry, description} */
		$http.get('/api/v1/user/' + userId + '/gifts', { 
			user_id: userId,
			name: giftData.name,
			publicity: giftData.publicity,
			expected_price: giftData.expected_price || null,
			expiry: giftData.expiry || null,
			description: giftData.description || null
		})
		.then(getResponseData);
	}

	WishService.editGift= function(giftId, giftData){
		$http.patch('/api/v1/gifts/' + giftId, { 
			name: giftData.name,
			publicity: giftData.publicity,
			expected_price: giftData.expected_price || null,
			expiry: giftData.expiry || null,
			description: giftData.description || null
		})
		.then(getResponseData);
	}

	WishService.deleteGift = function(giftId){
		$http.delete('/api/v1/gifts/' + giftId)
		.then(getResponseData);
	}	

	return WishService;
})