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



'use strict';

app.config(function($stateProvider){
  $stateProvider.state('feed', {
    url: '/',
    templateUrl: '/html/feed/feed.template.html',
    controller: 'FeedCtrl'
  });

  $stateProvider.state('gift', {
  	url: '/gift/:giftId',
  	templateUrl: '/html/gift/gift.template.html',
  	controller: 'GiftCtrl'
  });

  $stateProvider.state('contribute', {
  	url: '/gift/:giftId/contribute',
  	templateUrl: '/html/contribute/contribute.template.html',
  	controller: 'ContributeCtrl'
  })

  $stateProvider.state('wishlist', {
  	url: '/user/:userId',
  	templateUrl: '/html/wishlist/wishlist.template.html',
  	controller: 'WishlistCtrl'
  })



});

'use strict';

app.controller('ContributeCtrl', function($scope){
	
});
'use strict';
app.controller('GiftCtrl', function($scope){

});

'use strict';

app.controller('FeedCtrl', function($scope, $state){
	$scope.feed = [
		{
			firstName: "Emman",
			source: "https://scontent-sit4-1.xx.fbcdn.net/v/t1.0-1/p240x240/11855781_10204708918342687_2306807101497391770_n.jpg?oh=7f4b1c579f992a1ea752ae29663f5298&oe=58413A4A"
		},
		{	
			firstName: "Xujie",
			source: "https://scontent-sit4-1.xx.fbcdn.net/v/t1.0-1/c33.33.414.414/s240x240/529739_4832624688006_1289908355_n.jpg?oh=f2e4778618df68561d8322a6567593b3&oe=58431436"
		},
		{
			firstName: "Hiep",
			source: "https://scontent-sit4-1.xx.fbcdn.net/v/t1.0-1/c0.0.240.240/p240x240/13882306_830093813793178_7461496676363089630_n.jpg?oh=1a88321d5a39e55a029cead583e7b2c8&oe=587A3FE1"
		},
		{
			firstName: "Yao",
			source: "https://scontent-sit4-1.xx.fbcdn.net/v/t1.0-1/p240x240/12439280_10153334778955248_8673996898083161717_n.jpg?oh=9fad171f54d774ace83f0eef1df2b59e&oe=5843B71C"
		}
	]
});

'use strict';

app.controller('NavbarCtrl', function($scope, $state, $mdSidenav){
	$scope.goToFeed = function () {
		$mdSidenav('left').toggle();
		$state.go('feed');
	}

	$scope.goToWishlist = function() {
		$mdSidenav('left').toggle();
		$state.go('wishlist')
	}

});

'use strict';

app.directive('navbar', function () {
	return {
		restrict: 'E',
		templateUrl: '/html/navbar/navbar.template.html',
		controller: 'NavbarCtrl'
	}
})
'use strict';

app.controller('WishlistCtrl', function($scope){
	
})