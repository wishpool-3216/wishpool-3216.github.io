app.controller('LandingCtrl', function($scope, $window, AuthService) {
	$scope.handleLoginButtonClick = function() {
    AuthService.login().then(function(user) {
			user.justLoggedIn = 1;
			$scope.setCurrentUser(user);
			$window.location.reload();
		}, function() {
			console.log('can not login');
		});
  }
});
