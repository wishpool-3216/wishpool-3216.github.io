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

	return FacebookService;

});
