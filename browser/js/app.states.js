'use strict';

app.config(function($stateProvider){
  $stateProvider.state('feed', {
    url: '/',
    templateUrl: '/html/feed/feed.template.html',
    controller: 'FeedCtrl'
  });

  $stateProvider.state('wish', {
  	url: '/user/:userId/wish/:wishId',
  	templateUrl: '/html/wish/wish.template.html',
  	controller: 'WishCtrl'
  });

  $stateProvider.state('contribute', {
  	url: '/user/:userId/wish/:wishId/contribute',
  	templateUrl: '/html/contribute/contribute.template.html',
  	controller: 'ContributeCtrl'
  })

  $stateProvider.state('wishlist', {
  	url: '/user/:userId',
  	templateUrl: '/html/wishlist/wishlist.template.html',
  	controller: 'WishlistCtrl'
  })

  $stateProvider.state('wishadd', {
    url: '/user/:userId/wishadd',
    templateUrl: '/html/wishadd/wishadd.template.html',
    controller: 'WishaddCtrl'
  })

  $stateProvider.state('landing', {
    url: '/landing',
    templateUrl: '/html/landing/landing.template.html',
    controller: 'LandingCtrl'
  })
});
