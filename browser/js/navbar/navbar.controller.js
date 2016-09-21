'use strict';

app.controller('NavbarCtrl', function($scope, $state, LocalStorageService, $rootScope){

	$scope.clientUserId = $scope.currentUser.id;

	$scope.goToFeed = function () {
		$state.go('feed');
	}

	$scope.goToWishlist = function() {
		$state.go('wishlist')
	}

	$scope.currentNavItem = 'feed';

});
