'use strict';

app.factory('UserService', function($http, __env, $stateParams, $rootScope, LocalStorageService){
	var UserService = {};

	// sUrl refers to server URL
	var sUrl = __env.apiUrl;
	var getResponseData = function(response){
		return response.data;
	}

  // Gets data for a user
  UserService.getUser = function(userId){
  	$http.get(sUrl + '/api/v1/users/' + userId)
  	.then(getResponseData);
  }


  // Updates the user data
  UserService.updateUser = function(userId){
  	$http.patch(sUrl + '/api/v1/users/' + userId)
  	.then(getResponseData);
  }


  // Gets user's friends (and birthdays) in an array
  UserService.getUserFriends = function(userId){
  	return $http.get(sUrl + '/api/v1/users/' + userId + '/friend_birthdays')
  	.then(getResponseData);
  }

	return UserService;

})
