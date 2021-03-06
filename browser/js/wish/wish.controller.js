'use strict';

app.controller('WishCtrl', function($scope, $stateParams, $state, $location, LocalStorageService, WishService, ContributeService, $mdDialog, $mdToast, ToastService, InternetService){

	// Check if online
	if (!InternetService.isOnline()) {
		ToastService.showNoInterNetMessage($mdToast);
		return;
	}


	// Checks if client is viewing their own wishlist or someone else's
	$scope.curUrl = $location.absUrl();
	$scope.pageUserId = $stateParams.userId;
  $scope.clientUserId = $scope.currentUser.id;
	$scope.userSeesOwnWish = $scope.pageUserId == $scope.clientUserId;

	if ($scope.userSeesOwnWish) $scope.highlighMyWish(); else $scope.highlighFeed();

	$scope.wish = {};
	$scope.contributed = false;

	WishService.getGift($stateParams.wishId).then(function(wish) {
		$scope.wish = wish;

		// Checks that image source is not HTTP but HTTPS, and corrects it if necessary
		if($scope.wish.image_file_name && $scope.wish.image_file_name.split('://')[0] !== 'https'){
			$scope.wish.image_file_name = $scope.wish.image_file_name.replace('http', 'https');
		}

		wish.contributions.forEach(function(contribution) {
			if (contribution.creator_id == $scope.clientUserId) {
				$scope.contributed = true;
				$scope.contributeAmt = contribution.amount;
				$scope.contributionId = contribution.id;
			}
		})
	});

  $scope.showContributePrompt = function(ev) {

		if (!InternetService.isOnline()) {
			ToastService.showNoInterNetMessage($mdToast);
			return;
		}

		// Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .title('How much would you like to contribute?')
      .textContent("Full dollar contributions are recommended. Contributions in cents (or any use of the period '.' symbol) should be avoided.")
      .placeholder('Contribute amount')
      .ariaLabel('Contribute amount')
      .initialValue('0')
      .ok('Confirm')
      .cancel("Cancel");

    $mdDialog.show(confirm).then(function(result) {
			var regexp = /^\d+$/;
      var match = regexp.test(result);
      var contributeAmt = parseInt(result);
      if(match && contributeAmt > 0){
				if (contributeAmt > $scope.wish.expected_price - $scope.wish.sum_contributions) return ToastService.showToast($mdToast, "The amount you've set is too high!");
				$scope.contributeAmt = contributeAmt;
				ContributeService.addContribution($scope.wish.id, $scope.contributeAmt).then(function(response) {
					$scope.wish.contributions.push(response);
					$scope.wish.sum_contributions += response.amount;
					ToastService.showToast($mdToast, "Thank you!");
	      	$scope.contributed = true;
					$scope.contributionId = response.id;
				});
      } else {
				ToastService.showToast($mdToast, "Invalid amount.");
      }
    });
  };

	$scope.showEditContributePrompt = function(ev) {

		if (!InternetService.isOnline()) {
			ToastService.showNoInterNetMessage($mdToast);
			return;
		}

    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .textContent("Edit your contribution, or set the amount to zero if you'd like to cancel your contribution.")
      .placeholder('Contribute amount')
      .ariaLabel('Contribute amount')
      .initialValue($scope.contributeAmt)
      .ok('Confirm')
      .cancel("Cancel");

    $mdDialog.show(confirm).then(function(result) {
      var regexp = /^\d+$/;
      var match = regexp.test(result);
      var contributeAmt = parseInt(result);
      if(match) {
				var deltaAmount = contributeAmt - $scope.contributeAmt;
				if (deltaAmount > $scope.wish.expected_price - $scope.wish.sum_contributions) return ToastService.showToast($mdToast, "The amount you've set is too high!");
				$scope.contributeAmt = contributeAmt;
				if (contributeAmt > 0) {
					// edit the amount here
					ContributeService.updateContribution($scope.contributionId, $scope.contributeAmt).then(function(newContribution) {
						$scope.wish.contributions = $scope.wish.contributions.map(function(contribution) {
							if (contribution.contributor.id == $scope.clientUserId) return newContribution;
							return contribution;
						});
						$scope.wish.sum_contributions += deltaAmount;
						ToastService.showToast($mdToast, "Edited successfully!");
					});
				} else {
					// remove the contribution
					ContributeService.deleteContribution($scope.contributionId).then(function() {
						$scope.wish.contributions = $scope.wish.contributions.filter(function(contribution) {
							return contribution.id != $scope.contributionId;
						});
						$scope.wish.sum_contributions += deltaAmount;
						$scope.contributed = false;
						ToastService.showToast($mdToast, "Cancelled successfully!");
					});
				}

      } else {
				ToastService.showToast($mdToast, "Invalid amount.");
      }
    });
  };

});
