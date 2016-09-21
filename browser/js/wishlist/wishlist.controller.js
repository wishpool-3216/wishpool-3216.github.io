'use strict';

app.controller('WishlistCtrl', function($scope, $state,  $stateParams, WishService, UserService, LocalStorageService, $mdDialog, $mdToast){

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
		$scope.wishes.forEach(function(wish) {
			wish.canDelete = wish.creator_id == $scope.clientUserId;
		});
	});

	$scope.deleteWish = function(ev, index) {
		var confirm = $mdDialog.confirm()
			.title('Remove this Gift')
			.textContent("This gift was created by you, if you remove it, all contributions will be lost, too. Do you want to continue?")
			.targetEvent(ev)
			.ok('Confirm')
			.cancel("Cancel");

		$mdDialog.show(confirm).then(function() {
			WishService.deleteGift($scope.wishes[index].id).then(function(response) {
				$scope.wishes.splice(index, 1);
				WishService.updateGiftsList($scope.pageUserId, $scope.wishes);
			});
		});
	}
});
