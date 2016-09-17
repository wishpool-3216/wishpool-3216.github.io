app.controller('LandingCtrl', function($scope, $auth, FacebookService, UserService) {
	$scope.handleLoginButtonClick = function() {
    FacebookService.login().then(function(response) {
			UserService.sendToken(response.userId, response.accessToken, response.expiresIn).then(function(response) {
				console.log(response);
			});
		}, function(err) {
			// can not login
		});
  }
});
