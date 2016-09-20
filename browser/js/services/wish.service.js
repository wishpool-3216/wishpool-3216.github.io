'use strict';

app.factory('WishService', function($http){

	var WishService = {};

	// sUrl refers to server URL
	var sUrl = 'http://server.wishpool.info';
	var getResponseData = function(response){
		return response.data;
	}


	// Gets all the gifts that a user is receiving
	WishService.getUserGifts = function(userId){
		$http.get(sUrl + '/api/v1/user/' + userId + '/gifts')
		.then(getResponseData);
	}


	// Gets gift data for a particular gift
	WishService.getGift = function(giftId){
		$http.get(sUrl + '/api/v1/gifts' + giftId)
		.then(getResponseData);
	}


	// Creates a new gift for a user
	WishService.addGift = function(userId, giftData){
		/* giftData should contain: {name, publicity, expected_price, expiry, description} */
		$http.get(sUrl + '/api/v1/user/' + userId + '/gifts', {
			user_id: userId,
			name: giftData.name,
			publicity: giftData.publicity,
			expected_price: giftData.expected_price || null,
			expiry: giftData.expiry || null,
			description: giftData.description || null
		})
		.then(getResponseData);
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
