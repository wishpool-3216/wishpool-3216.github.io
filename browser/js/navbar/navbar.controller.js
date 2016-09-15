'use strict';

app.controller('NavbarCtrl', function($scope, $state){
	$scope.goToFeed = function () {
		$state.go('feed');
	}

	$scope.goToWishlist = function() {
		$state.go('wishlist')
	}

	$scope.currentNavItem = 'feed';

});
