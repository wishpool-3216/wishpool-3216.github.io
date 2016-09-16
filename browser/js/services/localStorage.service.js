'use strict';

app.factory('localStorageService', function(){
  var localStorageService = {}

  localStorageService.saveWishlist = function(array){
  	localStorage.setItem("wishlist",JSON.stringify(array));
  }

  localStorageService.getWishlist = function(){
  	return JSON.parse(localStorage.getItem("wishlist"));
  }

  localStorageService.addWish = function(newWishObj){
  	var wishlist = localStorageService.getWishlist()
  	wishlist.push(newWishObj);
  	localStorageService.saveWishlist(wishlist);
  }

  return localStorageService;
})