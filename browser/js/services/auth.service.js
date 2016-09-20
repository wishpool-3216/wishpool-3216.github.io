/**
  Token will include
    "access-token": "{{ token }}",
    "token-type":   "Bearer",
    "client":       "{{ clientId }}",
    "expiry":       "{{ expiry }}",
    "uid":          "{{ uid }}"
*/

app.constant('tokenKeys', ['access-token', 'token-type', 'client', 'expiry', 'uid']);

app.service('Session', function (LocalStorageService) {
  this.setToken = function (token) {
    this.token = token;
    LocalStorageService.setToken(token);
  };

  var token = LocalStorageService.getToken();
  if (token) {
    this.setToken(token);
  }
})

app.factory('AuthService', function ($http, $q, $window, Session, LocalStorageService, __env) {
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

  authService.logout = function() {
    LocalStorageService.removeUser();
    LocalStorageService.removeToken();
    $window.location.reload();
  }

  authService.isAuthenticated = function() {
    return !!Session.token;
  }

  return authService;
});

app.factory('sessionInjector', function(Session, tokenKeys) {
  var sessionInjector = {
    request: function(config) {
      if (config.url.startsWith('https://api.cloudinary.com')) {
        return config;
      }
      if (Session.token) {
        tokenKeys.forEach(function(key) {
          config.headers[key] = Session.token[key];
        })
      }
      return config;
    },
    response: function(response) {
      var headers = response.headers();

      var newToken = tokenKeys.reduce(function(newToken, key) {
        if (!newToken || (headers[key] != 0 && !headers[key])) return null;
        newToken[key] = headers[key];
        return newToken;
      }, {});

      if (newToken) Session.setToken(newToken);
      return response;
    }
  }
  return sessionInjector;
})

app.factory('sessionRecoverer', function(Session) {
})
