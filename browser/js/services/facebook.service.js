'use strict';
/*

app.factory('FacebookService', function($http, $q){
	var FacebookService = {};


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


	// Logs the user into Facebook
	FacebookService.login = function(){
		var deferred = $q.defer();
		FB.login(function(response){
			if(response.authResponse){
				console.log("You logged in successfully!");
				deferred.resolve({loggedIn: true});
			}else{
				console.log("Could not log you in through Facebook.");
				deferred.resolve({loggedIn: false});
			}
		})
		return deferred.promise;
	}


	// Returns an obj with accessToken, expiresIn, and userId
	FacebookService.getFbToken = function(){
		var deferred = $q.defer();
		FB.getLoginStatus(function(response){
			if(response.status == 'connected'){
				deferred.resolve({
					accessToken: response.authResponse.accessToken,
					expiresIn: response.authResponse.expiresIn,
					userId: response.authResponse.userID
				});
			}else if (response.status === 'not_authorized'){
				console.log("You are logged in, but not authorised.")
				deferred.reject();
			}else{
				console.log("You are not logged in.")
				deferred.reject();
			}
		})
		return deferred.promise;
	}

	return FacebookService;
});

*/