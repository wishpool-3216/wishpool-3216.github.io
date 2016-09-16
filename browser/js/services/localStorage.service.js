'use strict';

app.factory('LocalStorageService', function(){
  var LocalStorageService = {}

  LocalStorageService.saveWishlist = function(array){
  	localStorage.setItem("wishlist",JSON.stringify(array));
  }

  LocalStorageService.getWishlist = function(){
  	return JSON.parse(localStorage.getItem("wishlist"));
  }

  LocalStorageService.addWish = function(newWishObj){
  	var wishlist = LocalStorageService.getWishlist()
  	wishlist.push(newWishObj);
  	LocalStorageService.saveWishlist(wishlist);
  }

  return LocalStorageService;
})