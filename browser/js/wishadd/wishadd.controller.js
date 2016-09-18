'use strict';
app.controller('WishaddCtrl', function($scope, $rootScope, $state, LocalStorageService, WishService, $stateParams){

	$scope.pageUserId = $stateParams.userId || 1;
	$scope.clientUserId = $rootScope.userId || 1;
	if($scope.pageUserId === $scope.clientUserId){
		$scope.userSeesOwnWishlist = true; 
	}

	
	$scope.newWishPublicity = true;

	$scope.addWish = function() {
		var newWishObj = {
			name: $scope.newWishName,
			source: $scope.newWishSource,
			expected_price: $scope.newWishPrice,
			expiry: $scope.newWishExpiry,
			description: $scope.newWishDescription
		}

		// If the user is adding a wish for themselves, save wish in Web Storage
		if($scope.userSeesOwnWishlist){
			LocalStorageService.addWish(newWishObj);
		}

		// POST new wish to server
		WishService.addGift($rootScope.userId, newWishObj)
		.then(function(){
			console.log("Wish added. Returning you to the wishlist...");
			$state.go('wishlist');
		})

	}

});
