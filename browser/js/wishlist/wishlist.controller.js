'use strict';

app.controller('WishlistCtrl', function($scope, $state,  $stateParams, WishService, UserService, LocalStorageService){

	$scope.wishes = [];
	$scope.user = {};
	// Checks if the client is viewing their own wishlist or someone else's
	$scope.pageUserId = $stateParams.userId || -1; //<-- dummy id;
	$scope.clientUserId = $scope.currentUser.id;
	$scope.userSeesOwnWishlist = $scope.pageUserId == $scope.clientUserId;

	if ($scope.userSeesOwnWishlist) $scope.highlighMyWish(); else $scope.highlighFeed();

	UserService.getUser($scope.pageUserId).then(function(user) {
		$scope.user = user;
	});

	WishService.getUserGifts($scope.pageUserId).then(function(gifts) {
		$scope.wishes = gifts;
	});
});
