'use strict';

app.controller('WishCtrl', function($scope, $stateParams, $state, LocalStorageService, WishService, ContributeService, $mdDialog, $mdToast){

	// Checks if client is viewing their own wishlist or someone else's
	$scope.pageUserId = $stateParams.userId;
  $scope.clientUserId = $scope.currentUser.id;
	$scope.userSeesOwnWish = $scope.pageUserId == $scope.clientUserId;

	$scope.wish = {};
	$scope.contributed = false;

	WishService.getGift($stateParams.wishId).then(function(wish) {
		$scope.wish = wish;
		wish.contributions.forEach(function(contribution) {
			if (contribution.creator_id == $scope.clientUserId) {
				$scope.contributed = true;
				$scope.contributeAmt = contribution.amount;
			}
		})
	});

  $scope.showContributePrompt = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .title('How much would you like to contribute?')
      .textContent("Full dollar contributions are recommended. Contributions in cents (or any use of the period '.' symbol) should be avoided.")
      .placeholder('Contribute amount')
      .ariaLabel('Contribute amount')
      .initialValue('0')
      .targetEvent(ev)
      .ok('Confirm')
      .cancel("Cancel");

    $mdDialog.show(confirm).then(function(result) {
			console.log(result);
      var regexp = /\d+/;
      var match = result.match(regexp);
      var contributeAmt = parseInt(match[0]);
      if(match && contributeAmt > 0){
				$scope.contributeAmt = contributeAmt;
				ContributeService.addContribution($scope.wish.id, $scope.contributeAmt).then(function(response) {
					$scope.wish.contributions.push(response);
					$scope.wish.sum_contributions += response.amount;
					$scope.showToast("Thank you!");
	      	$scope.contributed = true;
				});
      } else {
				$scope.showToast("Oops! Invalid result");
      }
    });
  };

	$scope.showToast = function(text) {
		if (!text) return;
    var pinTo = {
			top: false,
			left: false,
			bottom: true,
			right: true
		}
    $mdToast.show(
      $mdToast.simple()
        .textContent(text)
        .position(pinTo)
        .hideDelay(1000)
    );
  };

});
