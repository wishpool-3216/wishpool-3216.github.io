app.controller('WishaddCtrl', function($scope, $state, LocalStorageService, WishService, $stateParams, $window, FileUpload, ImageReader, $mdToast, ToastService, InternetService) {

	// Checks if client is viewing their own wishlist or someone else's
	$scope.pageUserId = $stateParams.userId;
	$scope.clientUserId = $scope.currentUser.id;
	$scope.userSeesOwnWishlist = $scope.pageUserId == $scope.clientUserId;

	if ($scope.userSeesOwnWishlist) $scope.highlighMyWish(); else $scope.highlighFeed();

	// By default, the new wish is a Public wish
	$scope.newWishIsPublic = true;
	$scope.imageFile = null;

	$scope.closeProgress = function(text) {
		$scope.dismissProgress();
		ToastService.showToast($mdToast, text);
	}

	$scope.uploadWish = function(imageUrl) {
		var newWishPublicity = "Public";
		if(!$scope.newWishIsPublic) newWishPublicity = "Private";

		var newWishObj = {
			name: $scope.newWishName,
			publicity: newWishPublicity,
			source: imageUrl,
			expected_price: $scope.newWishPrice,
			accumulated: 0,
			expiry: $scope.newWishExpiry,
			description: $scope.newWishDescription
		}

		WishService.addGift($scope.pageUserId, newWishObj).then(function(newWish) {
			$scope.closeProgress('New Wish Added');
			WishService.cacheNewGift($scope.pageUserId, newWish);
			$state.go('wishlist', {userId: $scope.pageUserId});
		});
	}

	// Add the wish
	$scope.addWish = function() {
		if (!InternetService.isOnline()) {
			ToastService.showNoInterNetMessage($mdToast);
			return;
		}
		$scope.showProgress();
		if (!$scope.imageFile) {
			$scope.uploadWish(null);
		} else {
			FileUpload.uploadFileToUrl($scope.imageFile).then(function(response) {
				$scope.uploadWish(response.data.url);
			}, function(err) {
				$scope.closeProgress('Error! Please check your internet connection.');
			}).catch(function(err) {
				$scope.closeProgress('Error! Please check your internet connection.');
			});
		}
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
