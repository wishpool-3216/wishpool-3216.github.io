'use strict';

var app = angular.module('wishpoolApp', ['ui.router','ngMaterial'])

app.constant('__env', {
  apiUrl: 'https://server.wishpool.info'
});

app.run(['$window', function($window) {
  $window.fbAsyncInit = function() {
    FB.init({
      appId: '295119780857739',
      status: true,
      cookie: true,
      xfbml: true,
      version: 'v2.7'
    });
  };


  // Service workers
  if ('serviceWorker' in navigator) {
  // Registration of service worker
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(function () {
      console.log('Registered Service Worker.');
    })
    .catch(function () {
      console.log('Unable to register Service Worker.');
    });
  }


  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}]);

app.run(function($rootScope, $state, AuthService) {
  $rootScope.$on('$stateChangeStart', function(event, toState, fromState) {
    var isLoggin = AuthService.isAuthenticated();
    var isLanding = toState.name == 'landing';
    if (isLoggin && isLanding) {
      $state.go('feed');
      event.preventDefault();
    } else if (!isLoggin && !isLanding) {
      $state.go('landing');
      event.preventDefault();
    }
  });
});

app.config(function ($urlRouterProvider, $mdThemingProvider, $httpProvider, $sceDelegateProvider, __env) {

  $urlRouterProvider.when('','/landing');
  // Returns to landing page if user types an undefined url
  $urlRouterProvider.otherwise('/');
  $mdThemingProvider
  .theme('default')
  .primaryPalette('purple')

  $httpProvider.defaults.useXDomain = true;
  $httpProvider.interceptors.push('sessionInjector');
})

app.controller('ApplicationController', function($scope, AuthService, LocalStorageService) {
  $scope.currentUser = LocalStorageService.getUser();

  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
    LocalStorageService.setUser(user);
  };
});

app.controller('TopbarCtrl', function($scope, $state, LocalStorageService, AuthService) {

  var originatorEv;

  this.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };

  this.goToSetting = function() {
    //$state.go('setting');
  }

  this.handleLogout = function() {
    AuthService.logout();
  }

	$scope.goToLanding = function () {
		$state.go('landing');
	}
  // Load the dummy data, for now!
	LocalStorageService.loadDummyData();
});

