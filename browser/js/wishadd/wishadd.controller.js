'use strict';
app.controller('WishaddCtrl', function($scope, $rootScope, $state, LocalStorageService, WishService, $stateParams, $window, FileUpload, ImageReader){

	$scope.pageUserId = $stateParams.userId || 123;
	$scope.clientUserId = $rootScope.userId || 456;
	if($scope.pageUserId === $scope.clientUserId){
		$scope.userSeesOwnWishlist = true;
	}


	$scope.newWishIsPublic = true;

	$scope.addWish = function() {

		FileUpload.uploadFileToUrl($scope.imageFile).then(function(response) {
			console.log(response.data);
		});
		return;

		var newWishPublicity = "public";
		if(!$scope.newWishIsPublic) newWishPublicity = "private";
		var newWishObj = {
			name: $scope.newWishName,
			publicity: newWishPublicity,
			source: $scope.newWishSource,
			expected_price: $scope.newWishPrice,
			expiry: $scope.newWishExpiry,
			description: $scope.newWishDescription
		}

		// If the user is adding a wish for themselves, save wish in Web Storage
		if($scope.userSeesOwnWishlist){
			LocalStorageService.addWish(newWishObj);
		}

		// POST new wish to server
		WishService.addGift($rootScope.userId, newWishObj)
		.then(function(){
			console.log("Wish added. Returning you to the wishlist...");
			$state.go('wishlist');
		})

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
