'use strict';

var app = angular.module('wishpoolApp', ['ui.router','ngMaterial', 'ng-token-auth'])

app.constant('__env', {
  apiUrl: 'http://52.77.241.218'
});

app.run(['$rootScope', '$window', function($rootScope, $window) {
  $rootScope.user = {};
  $window.fbAsyncInit = function() {
    FB.init({
      appId: '295119780857739',
      status: true,
      cookie: true,
      xfbml: true,
      version: 'v2.7'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}]);

app.config(function ($urlRouterProvider, $mdThemingProvider, $authProvider, $httpProvider, $sceDelegateProvider, __env) {

  $urlRouterProvider.when('','/landing');
  // Returns to landing page if user types an undefined url
  $urlRouterProvider.otherwise('/');
  $mdThemingProvider
  .theme('default')
  .primaryPalette('purple')

  $authProvider.configure({
    apiUrl: __env.apiUrl
  });

  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
})



app.controller('TopbarCtrl', function($scope, $state, LocalStorageService) {

  var originatorEv;

  this.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };

  this.goToSetting = function() {
    //$state.go('setting');
  }

  this.handleLogout = function() {
    alert('logout!');
  }

	$scope.goToLanding = function () {
		$state.go('landing');
	}

	LocalStorageService.loadDummyData();

});
