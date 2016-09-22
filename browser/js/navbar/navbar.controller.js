'use strict';

app.controller('NavbarCtrl', function($scope, $state, $document, $window, LocalStorageService, $rootScope){

	$scope.clientUserId = $scope.currentUser.id;

	$scope.show = true;
  $scope.lastPageOffset = 0;

	$scope.goToFeed = function () {
		$state.go('feed');
	}

	$scope.goToWishlist = function() {
		$state.go('wishlist')
	}

	$scope.toggleMenu = function(newValue) {
    $scope.show = newValue;
  }

  $document.on('scroll', function() {
    var pageYOffset = $window.pageYOffset;
		if (pageYOffset < $scope.lastPageOffset) {
			$scope.toggleMenu(true);
			$scope.lastPageOffset = pageYOffset;
		} else if (pageYOffset - $scope.lastPageOffset > 100) {
			$scope.toggleMenu(false);
			$scope.lastPageOffset = pageYOffset;
		}
    $scope.$apply();
  });
});
