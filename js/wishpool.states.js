'use strict';

app.config(function($stateProvider){
	$stateProvider.state('landing', {
		url: '/',
		templateUrl: 'landing.html',
		controller: 'placeholderCtrl'
	});

	$stateProvider.state('profile', {
		url: '/user/:userId',
		templateUrl: 'landing.html',
		controller: 'placeholderCtrl'
	})

})