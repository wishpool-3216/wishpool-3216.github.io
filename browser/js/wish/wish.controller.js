'use strict';
app.controller('WishCtrl', function($scope, $stateParams, $state, $rootScope, LocalStorageService){
	
	// Checks if client is viewing their own wishlist or someone else's
	$scope.pageUserId = $stateParams.userId;
	$scope.clientUserId = $rootScope.userId || LocalStorageService.getUserData().id;
	if($scope.pageUserId == $scope.clientUserId){
		$scope.userSeesOwnWish = true; 
	}


	//If user is viewing their own wish, we can load from localStorage
	if($scope.userSeesOwnWish){
		$scope.wish = LocalStorageService.getWishById($stateParams.wishId);
	}else{
		$scope.wish = {};
	}



	$scope.defaultWishSource = "https://www.us.aspjj.com/sites/aspjj.com.us/files/default_images/No_available_image_3.jpg"

});
