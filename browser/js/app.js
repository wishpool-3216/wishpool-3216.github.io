'use strict';

var app = angular.module('wishpoolApp', ['ui.router','ngMaterial'])

app.config(function ($urlRouterProvider, $mdThemingProvider) {
    $urlRouterProvider.when('','/');
    // Returns to landing page if user types an undefined url
		$urlRouterProvider.otherwise('/');
    $mdThemingProvider
    	.theme('default')
    	.primaryPalette('light-blue')
})

app.controller('TopbarCtrl', function($scope, $mdSidenav) {
	$scope.toggleSideNav = function () {
		$mdSidenav('left').toggle();
	};
});


