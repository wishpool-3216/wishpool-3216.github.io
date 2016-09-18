'use strict';

app.factory('LocalStorageService', function(){
  var LocalStorageService = {}

  var setItem = function(key, item) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  var getItem = function(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  var removeItem = function(key) {
    localStorage.removeItem(key);
  }

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

  LocalStorageService.setUser = function(user) {
    setItem('user', user);
  };

  LocalStorageService.getUser = function() {
    return getItem('user');
  }

  LocalStorageService.removeUser = function() {
    removeItem('user');
  }

  return LocalStorageService;
})
