'use strict';

app.controller('WishlistCtrl', function($scope, $state,  $stateParams, WishService, UserService, LocalStorageService){

	$scope.wishes = [];
	$scope.user = {};
	// Checks if the client is viewing their own wishlist or someone else's
	var pageUserId = $stateParams.userId || -1; //<-- dummy id;
	var clientUserId = $scope.currentUser.id;
	$scope.userSeesOwnWishlist = pageUserId == clientUserId;

	UserService.getUser(pageUserId).then(function(user) {
		$scope.user = user;
	});

	WishService.getUserGifts(pageUserId).then(function(gifts) {
		$scope.wishes = gifts;
	});
});
