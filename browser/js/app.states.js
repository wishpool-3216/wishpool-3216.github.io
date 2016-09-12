'use strict';

app.config(function($stateProvider){
  $stateProvider.state('feed', {
    url: '/',
    templateUrl: '/js/feed/feed.template.html',
    controller: 'FeedCtrl'
  });

  $stateProvider.state('gift', {
  	url: '/gift/:giftId',
  	templateUrl: '/js/gift/gift.template.html',
  	controller: 'GiftCtrl'
  });

  $stateProvider.state('contribute', {
  	url: '/gift/:giftId/contribute',
  	templateUrl: '/js/contribute/contribute.template.html',
  	controller: 'ContributeCtrl'
  })

  $stateProvider.state('wishlist', {
  	url: '/user/:userId',
  	templateUrl: '/js/wishlist/wishlist.template.html',
  	controller: 'WishlistCtrl'
  })



});
