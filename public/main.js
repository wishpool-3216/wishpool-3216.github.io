'use strict';

var app = angular.module('wishpoolApp', ['ui.router','ngMaterial'])

app.config(function ($urlRouterProvider, $mdThemingProvider) {
    $urlRouterProvider.when('','/');
    // Returns to landing page if user types an undefined url
		$urlRouterProvider.otherwise('/');
    $mdThemingProvider.theme('default')
})

app.controller('MainCtrl', function($scope, $mdSidenav) {
	$scope.message = 'Angular is running.';
	$scope.toggleSideNav = function () {
		$mdSidenav('left').toggle();
	};

});


