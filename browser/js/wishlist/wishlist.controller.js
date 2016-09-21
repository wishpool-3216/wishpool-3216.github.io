'use strict';

app.controller('WishlistCtrl', function($scope, $state,  $stateParams, LocalStorageService){

	$scope.wishes = LocalStorageService.getWishlist();
	// Checks if the client is viewing their own wishlist or someone else's
	$scope.pageUserId = $stateParams.userId || 123 //<-- dummy id;
	$scope.clientUserId = $scope.currentUser.id;
	if($scope.pageUserId == $scope.clientUserId){
		$scope.userSeesOwnWishlist = true;
	}
	$scope.defaultWishSource = "https://www.us.aspjj.com/sites/aspjj.com.us/files/default_images/No_available_image_3.jpg"

	//If user is viewing their own wishlist
	if($scope.userSeesOwnWishlist){
		// We can get the wishlist from the server OR localStorage
		// $scope.wishes = LocalStorageService.getWishlist();
	}else{
		// We can only get the wishlist from the server
		// $scope.wishes = [];
	}
});
