'use strict';

var app = angular.module('wishpoolApp', ['ui.router','ngMaterial'])

app.config(function ($urlRouterProvider, $mdThemingProvider) {
    $urlRouterProvider.when('','/');
    // Returns to landing page if user types an undefined url
		$urlRouterProvider.otherwise('/');
    $mdThemingProvider.theme('default')
})

app.controller('MainCtrl', function($scope, $mdSidenav) {
	$scope.message = 'Angular is running!';
	$scope.toggleSideNav = function () {
		$mdSidenav('left').toggle();
	};


});



'use strict';

app.config(function($stateProvider){
  $stateProvider.state('feed', {
    url: '/',
    templateUrl: '/browser/js/feed/feed.template.html',
    controller: 'FeedCtrl'
  });

  $stateProvider.state('gift', {
  	url: '/gift/:giftId',
  	templateUrl: '/browser/js/gift/gift.template.html',
  	controller: 'GiftCtrl'
  });

  $stateProvider.state('contribute', {
  	url: '/gift/:giftId/contribute',
  	templateUrl: '/browser/js/contribute/contribute.template.html',
  	controller: 'ContributeCtrl'
  })

  $stateProvider.state('wishlist', {
  	url: '/user/:userId',
  	templateUrl: 'browser/js/wishlist/wishlist.template.html',
  	controller: 'ProfileCtrl'
  })


});

'use strict';

app.controller('ContributeCtrl', function($scope){

});
'use strict';

app.controller('FeedCtrl', function($scope){

});


'use strict';
app.controller('GiftCtrl', function($scope){

});
