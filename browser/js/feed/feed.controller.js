'use strict';

app.controller('FeedCtrl', function($scope, $state, UserService, Session, $mdDialog){

	var monthsInYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July ', 'August', 'September', 'October', 'November', 'December'];

	$scope.highlighFeed();

	UserService.getUserFriends($scope.currentUser.id).then(function(users) {
		users = users.sort(function(l, r) {
			return (new Date(l.birthday)).getMonth() - (new Date(r.birthday)).getMonth();;
		});
		monthsInYear.forEach(function(monthName, index) {
			var usersInThisMonth = users.filter(function(user) {
				return (new Date(user.birthday)).getMonth() == index;
			});
			if (usersInThisMonth.length > 0) {
				$scope.months.push({
					name: monthName,
					friends: usersInThisMonth
				});
			}
		});
	})

	$scope.goToWishlist = function(id) {
		$state.go('wishlist', {userId: id }); //<-- dummy userId
	}

	$scope.months = [];

	if ($scope.currentUser && $scope.currentUser.justLoggedIn) {
		var currentUser = $scope.currentUser;
		currentUser.justLoggedIn = false;
		$scope.setCurrentUser(currentUser);
		if (currentUser.gifts.length) return;

		var confirm = $mdDialog.confirm()
      .title('Hey your wishlist is empty!')
      .textContent("Why don't you make a wish for yourself?")
      .ok('Do it now!')
      .cancel("Later");

    $mdDialog.show(confirm).then(function() {
			$state.go('wishadd', {userId: $scope.currentUser.id});
    });
	}
});
