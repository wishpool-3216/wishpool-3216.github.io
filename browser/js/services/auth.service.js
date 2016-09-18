app.service('Session', function (LocalStorageService) {
  this.create = function (id, uid) {
    this.id = id;
    this.uid = uid;
  };
  this.destroy = function () {
    this.id = null;
    this.uid = null;
  };

  var user = LocalStorageService.getUser();
  if (user && user.id) {
    this.create(user.id, user.uid);
  }
})

app.factory('AuthService', function ($http, $q, Session, __env) {
  var authService = {};
  var deferred = $q.defer();

  authService.login = function () {
    FB.login(function(response) {
			if(response.authResponse){
				console.log("You logged in successfully!");
        $http({
      		method: 'POST',
      		url: __env.apiUrl + '/auth/facebook/callback',
      		data: {
      			uid: response.authResponse.userID,
    				access_token: response.authResponse.accessToken,
      			expires_in: response.authResponse.expiresIn,
      		}
      	}).then(function(res) {
          Session.create(res.data.id, res.data.uid);
          deferred.resolve(res.data);
        }, function() {
          deferred.reject();
        });
			} else {
				console.log("Could not log you in through Facebook.");
        deferred.reject();
			}
		}, {scope: 'user_birthday,user_friends'})

    return deferred.promise;
  };

  authService.isAuthenticated = function() {
    return !!Session.id;
  }

  return authService;
})
