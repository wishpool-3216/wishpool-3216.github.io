'use strict';

app.factory('FacebookService', function($http, $q){
	var FacebookService = {};

/*
	// Takes a fbId and returns a user's name, picture
	FacebookService.getUserData = function(fbId){
		var deferred = $q.defer();
		FB.api(fbId + '?fields=name,picture.type(large)', function(response){
				if(!response || response.error){
					deferred.reject();
				}else{
					deferred.resolve({
						name: response.name,
						pictureUrl: response.data.picture.data.url
					});
				}
		})
		return deferred.promise;
	}
*/

	// Logs the user into Facebook
	FacebookService.login = function(){
		var deferred = $q.defer();
		FB.login(function(response){
			if(response.authResponse){
				console.log("You logged in successfully!");
				deferred.resolve({
					accessToken: response.authResponse.accessToken,
					expiresIn: response.authResponse.expiresIn,
					userId: response.authResponse.userID
				});
			} else {
				console.log("Could not log you in through Facebook.");
				deferred.reject();
			}
		})
		return deferred.promise;
	}

	return FacebookService;
});
