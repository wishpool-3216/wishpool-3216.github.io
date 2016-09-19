'use strict';

app.controller('ContributeCtrl', function($scope, $state, $stateParams, $rootScope, LocalStorageService){

	$scope.pageUserId = $stateParams.userId;
	$scope.clientUserId = $rootScope.userId || LocalStorageService.getUserData().id;
	$scope.wishId = $stateParams.wishId;
	$scope.wish = LocalStorageService.getWishById($scope.wishId);

	$scope.confirm = function () {
		//Update Wish with ContributeService.addcontribution
		
		$state.go('wishlist', {userId: $scope.pageUserId});
	}

	
});