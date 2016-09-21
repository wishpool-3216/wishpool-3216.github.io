app.controller('WishaddCtrl', function($scope, $state, LocalStorageService, WishService, $stateParams, $window, FileUpload, ImageReader){

	// Checks if client is viewing their own wishlist or someone else's
	$scope.pageUserId = $stateParams.userId;
	$scope.clientUserId = $scope.currentUser.id;
	$scope.userSeesOwnWishlist = $scope.pageUserId == $scope.clientUserId;

	if ($scope.userSeesOwnWishlist) $scope.highlighMyWish(); else $scope.highlighFeed();

	// By default, the new wish is a Public wish
	$scope.newWishIsPublic = true;

	// Add the wish
	$scope.addWish = function() {

		FileUpload.uploadFileToUrl($scope.imageFile).then(function(response) {
			var imageData = response.data;
			var newWishPublicity = "Public";
			if(!$scope.newWishIsPublic) newWishPublicity = "Private";

			// Very hackish way of making new wish index for the new wish
			//var localStorageLastWish = LocalStorageService.getWishlist().slice(-1)[0];
			var newWishObj = {
				//id: localStorageLastWish.id + 1,
				name: $scope.newWishName,
				publicity: newWishPublicity,
				source: imageData.url,
				expected_price: $scope.newWishPrice,
				accumulated: 0,
				expiry: $scope.newWishExpiry,
				description: $scope.newWishDescription
			}

			WishService.addGift($scope.pageUserId, newWishObj).then(function(response) {
				console.log(response);
				$state.go('wishlist', {userId: $scope.pageUserId});
			});
		});
	}

	$scope.fileNameChanged = function(el) {
		$scope.imageFile = el.files[0];
		ImageReader.readFile($scope.imageFile).then(function(base64) {
			$scope.imageFileBase64 = base64;
		});
	}

	$scope.chooseFile = function() {
		// do a bit tricky here
		document.getElementById('image-input').click();
	}

	$scope.cancel = function() {
		$window.history.back();
	}

});
