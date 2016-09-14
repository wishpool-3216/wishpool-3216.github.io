'use strict';

app.controller('WishlistCtrl', function($scope, $state, localStorageService){
	$scope.goToWish = function(wishObj) {
		$state.go('wish', {wishObj: wishObj});
	}
	
	$scope.wishes = localStorageService.getWishlist();

	$scope.defaultWishSource = "https://www.us.aspjj.com/sites/aspjj.com.us/files/default_images/No_available_image_3.jpg"

	$scope.addWish = function() {
		var newWishObj = {
			name: $scope.newWishName,
			source: $scope.newWishSource,
			price: $scope.newWishPrice,
			accumulated: 0,
			givers: []
		}
		localStorageService.addWish(newWishObj);
		$scope.wishes = localStorageService.getWishlist();
	}


})	