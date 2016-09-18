app.controller('LandingCtrl', function($scope, AuthService) {
	$scope.handleLoginButtonClick = function() {
    AuthService.login().then(function(user) {
			$scope.setCurrentUser(user);
		}, function() {
			console.log('can not login');
		});
  }
});
