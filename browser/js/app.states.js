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
