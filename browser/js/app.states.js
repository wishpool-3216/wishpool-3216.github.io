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
  	controller: 'WishlistCtrl'
  })


});
