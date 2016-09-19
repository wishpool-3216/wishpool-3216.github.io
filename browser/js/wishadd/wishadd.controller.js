'use strict';
app.controller('WishaddCtrl', function($scope, $rootScope, $state, LocalStorageService, WishService, $stateParams){

	// Checks if client is viewing their own wishlist or someone else's
	$scope.pageUserId = $stateParams.userId;
	$scope.clientUserId = $rootScope.userId || LocalStorageService.getUserData().id;
	if($scope.pageUserId == $scope.clientUserId){
		$scope.userSeesOwnWishlist = true; 
	}
	

	// By default, the new wish is a Public wish
	$scope.newWishIsPublic = true;


	// Add the wish
	$scope.addWish = function() {
		var newWishPublicity = "public";
		if(!$scope.newWishIsPublic) newWishPublicity = "private";

		// Very hackish way of making new wish index for the new wish
		var localStorageLastWish = LocalStorageService.getWishlist().slice(-1)[0];
		var newWishObj = {
			id: localStorageLastWish.id + 1,
			name: $scope.newWishName,
			publicity: newWishPublicity,
			source: $scope.newWishSource,
			expected_price: $scope.newWishPrice,
			accumulated: 0,
			expiry: $scope.newWishExpiry,
			description: $scope.newWishDescription
		}

		// If the user is adding a wish for themselves
		if($scope.userSeesOwnWishlist){
			// We POST to the server with WishService.addGift
			// We update localStorage with LocalStorage.addWish
		}else{
			// We only POST to the server with WishService.addGift
		}
		$state.go('wishlist');
	}

});
