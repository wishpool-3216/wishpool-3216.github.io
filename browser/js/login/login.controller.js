app.controller('LoginCtrl', function($scope, $auth) {
	$scope.handleLoginButtonClick = function() {
    FB.login(function(response) {
			console.log(response);
			if (response.authResponse) {

			} else {

			}
		});
  }
});
