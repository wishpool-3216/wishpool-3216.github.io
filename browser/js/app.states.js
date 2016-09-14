'use strict';

app.config(function($stateProvider){
  $stateProvider.state('feed', {
    url: '/',
    templateUrl: '/html/feed/feed.template.html',
    controller: 'FeedCtrl'
  });

  $stateProvider.state('wish', {
  	url: '/wish/:wishId',
    params: {'wishObj': null},
  	templateUrl: '/html/wish/wish.template.html',
  	controller: 'WishCtrl'
  });

  $stateProvider.state('contribute', {
  	url: '/wish/:wishId/contribute',
  	templateUrl: '/html/contribute/contribute.template.html',
  	controller: 'ContributeCtrl'
  })

  $stateProvider.state('wishlist', {
  	url: '/user/:userId',
  	templateUrl: '/html/wishlist/wishlist.template.html',
  	controller: 'WishlistCtrl'
  })

  $stateProvider.state('landing', {
    url: '/landing',
    templateUrl: '/html/landing/landing.template.html',
  })

});
