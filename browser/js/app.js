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
    .register('service-worker.js')
    .then(function () {
      console.log('Registered Service Worker.');
    })
    .catch(function (err) {
      console.log(err);
      console.log('Unable to register Service Worker.');
    });
  }

  // Facebook SDK
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}]);


app.run(function($location, $rootScope, $state, AuthService) {

  // Check authentication before every state-change
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


  // Google Analytics Update after every state-change
  $rootScope.$on('$stateChangeSuccess', function(){
    ga('send', 'pageview', { page: $location.path() });
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
  $scope.showProgressDialog = false;
  $scope.currentNavItem = 'feed';
  $scope.highlighFeed = function() {
    $scope.currentNavItem = 'feed';
  }

  $scope.highlighMyWish = function() {
    $scope.currentNavItem = 'wishlist';
  }

  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
    LocalStorageService.setUser(user);
  };

  $scope.dismissProgress = function() {
    $scope.showProgressDialog = false;
  }

  $scope.showProgress = function(message) {
    $scope.showProgressDialog = true;
    $scope.loadingMessage = message || "Uploading, please wait!";
  }
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
});
