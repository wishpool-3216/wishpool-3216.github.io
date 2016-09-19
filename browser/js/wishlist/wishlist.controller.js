'use strict';

app.controller('WishlistCtrl', function($scope, $state, LocalStorageService){
	$scope.wishes = LocalStorageService.getWishlist();

	$scope.goToWish = function(wishObj) {
		$state.go('wish', {wishObj: wishObj});
	}
	
	$scope.defaultWishSource = "https://www.us.aspjj.com/sites/aspjj.com.us/files/default_images/No_available_image_3.jpg"

	$scope.goToWishadd = function(){
		$state.go('wishadd');
	}

});