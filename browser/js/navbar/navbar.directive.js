'use strict';

app.directive('navbar', function () {
	return {
		restrict: 'E',
		templateUrl: '/html/navbar/navbar.template.html',
		controller: 'NavbarCtrl'
	}
})