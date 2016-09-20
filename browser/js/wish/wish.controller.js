'use strict';

app.controller('WishCtrl', function($scope, $stateParams, $state, WishService, LocalStorageService){

	// Checks if client is viewing their own wishlist or someone else's
	$scope.pageUserId = $stateParams.userId;
	$scope.clientUserId = $scope.currentUser.id;
	$scope.userSeesOwnWish = $scope.pageUserId == $scope.clientUserId;

	$scope.wish = {};
	WishService.getGift($stateParams.wishId).then(function(wish) {
		$scope.wish = wish;
	});
});
