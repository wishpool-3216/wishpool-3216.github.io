'use strict';

app.factory('UserService', function($http, $stateParams, WishPoolCacheService, LocalStorageService, __env){
	var UserService = {};

	// sUrl refers to server URL
	var sUrl = __env.apiUrl;
	var cache = WishPoolCacheService.createCache('userCache');

	var getResponseData = function(response){
		return response.data;
	}

  // Gets data for a user
  UserService.getUser = function(userId){

		var key = 'user_' + userId;
		if (WishPoolCacheService.isInCache(cache, key)) return WishPoolCacheService.requestCache(cache, key);

  	return $http.get(sUrl + '/api/v1/users/' + userId)
  							.then(getResponseData).then(WishPoolCacheService.cacheData(cache, key));;
  }


  // Updates the user data
  UserService.updateUser = function(userId){
  	$http.patch(sUrl + '/api/v1/users/' + userId)
  	.then(getResponseData);
  }


  // Gets user's friends (and birthdays) in an array
  UserService.getUserFriends = function(userId) {

		var key = 'user_friends';
		if (WishPoolCacheService.isInCache(cache, key)) return WishPoolCacheService.requestCache(cache, key);

  	return $http.get(sUrl + '/api/v1/users/' + userId + '/friend_birthdays')
  							.then(getResponseData).then(WishPoolCacheService.cacheData(cache, key));
  }

	return UserService;

})
