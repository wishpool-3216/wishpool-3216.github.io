'use strict';

app.controller('WishCtrl', function($scope, $stateParams, $state, $rootScope, LocalStorageService, $mdDialog){

	$scope.wish = $stateParams.wishObj;
	// Checks if client is viewing their own wishlist or someone else's
	$scope.pageUserId = $stateParams.userId;
	$scope.clientUserId = $rootScope.userId || LocalStorageService.getUserData().id;
	if($scope.pageUserId == $scope.clientUserId){
		$scope.userSeesOwnWish = true;
	}


	//If user is viewing their own wish
	if($scope.userSeesOwnWish){
		// We get the wish from the server OR localStorage
		$scope.wish = LocalStorageService.getWishById($stateParams.wishId);
	}else{
		// We can only get the wish from the server
		$scope.wish = {};
	}


	$scope.contributed = false;
	$scope.contributeStatus = "";
  $scope.showContributePrompt = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .title('How much would you like to contribute?')
      .textContent("Full dollar contributions are recommended -- using cents (or the period '.' symbol) should be avoided.")
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


	$scope.defaultWishSource = "https://www.us.aspjj.com/sites/aspjj.com.us/files/default_images/No_available_image_3.jpg"



});
