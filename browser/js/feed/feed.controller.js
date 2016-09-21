'use strict';

app.controller('FeedCtrl', function($scope, $state, UserService, Session){

	var monthsInYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July ', 'August', 'September', 'October', 'November', 'December'];

	UserService.getUserFriends($scope.currentUser.id).then(function(users) {
		console.log(users);
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
});
