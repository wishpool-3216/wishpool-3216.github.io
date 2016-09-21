'use strict';

app.controller('WishCtrl', function($scope, $stateParams, $state, $rootScope, LocalStorageService, WishService, $mdDialog){

	// Checks if client is viewing their own wishlist or someone else's
	$scope.pageUserId = $stateParams.userId;
	$scope.clientUserId = $scope.currentUser.id;
	$scope.userSeesOwnWish = $scope.pageUserId == $scope.clientUserId;

	$scope.wish = {};
	WishService.getGift($stateParams.wishId).then(function(wish) {
		$scope.wish = wish;
	});

	$scope.contributed = false;
	$scope.contributeStatus = "";
  $scope.showContributePrompt = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .title('How much would you like to contribute?')
      .textContent("Full dollar contributions are recommended. Contributions in cents (or any use of the period '.' symbol) should be avoided.")
      .placeholder('ContributeAmt')
      .ariaLabel('ContributeAmt')
      .initialValue('0')
      .targetEvent(ev)
      .ok('Confirm!')
      .cancel("I'll think about it");

    $mdDialog.show(confirm).then(function(result) {
      var regexp = /\d+/;
      var match = result.match(regexp);
      var contributeAmt = parseInt(match[0]);
      if(match && contributeAmt > 0){
      	$scope.contributeAmt = contributeAmt;
      	$scope.contributeStatus = "Thank you! Your contribution was noted.";
      	$scope.contributed = true;
      }else{
      	$scope.contributeStatus = "Oops! Your contribution was not accepted.";
      }
    });
  };

});
