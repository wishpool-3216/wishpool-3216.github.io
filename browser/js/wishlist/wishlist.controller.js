'use strict';

app.controller('WishlistCtrl', function($scope, $state, $stateParams, $rootScope, LocalStorageService){


	// Checks if the client is viewing their own wishlist or someone else's
	$scope.pageUserId = $stateParams.userId || 123 //<-- dummy id;
	$scope.clientUserId = $rootScope.userId || LocalStorageService.getUserData().id;
	if($scope.pageUserId == $scope.clientUserId){
		$scope.userSeesOwnWishlist = true; 
	}


	//If user is viewing their own wishlist, we can load from localStorage
	if($scope.userSeesOwnWishlist){
		$scope.wishes = LocalStorageService.getWishlist();
	}else{
		$scope.wishes = [];
	}


	$scope.defaultWishSource = "https://www.us.aspjj.com/sites/aspjj.com.us/files/default_images/No_available_image_3.jpg"

});