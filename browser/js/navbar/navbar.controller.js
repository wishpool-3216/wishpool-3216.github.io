'use strict';

app.controller('NavbarCtrl', function($scope, $state, LocalStorageService){

	$scope.clientUserId = $scope.currentUser.id;
	$scope.currentNavItem = 'feed';

});
