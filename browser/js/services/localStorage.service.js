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


  // Saves an array of wishes into localStorage
  LocalStorageService.saveWishlist = function(array){
  	localStorage.setItem("wishlist",JSON.stringify(array));
  }


  // Gets an array of wishes from localStorage
  LocalStorageService.getWishlist = function(){
  	return JSON.parse(localStorage.getItem("wishlist"));
  }


  // Adds a wish to localStorage
  LocalStorageService.addWish = function(newWishObj){
  	var wishlist = LocalStorageService.getWishlist()
  	wishlist.push(newWishObj);
  	LocalStorageService.saveWishlist(wishlist);
  }

  // Gets a wish from LocalStorage by its id
  LocalStorageService.getWishById = function(wishId){
    var wishlist = LocalStorageService.getWishlist();
    for(var i=0; i<wishlist.length;i++){
      if(wishlist[i].id == wishId) return wishlist[i];
    }
    return null;
  }


  // Saves userData object into localStorage
  LocalStorageService.saveUserData = function(obj){
    localStorage.setItem("userData", JSON.stringify(obj));
  }


  // Get userData object from localStorage
  LocalStorageService.getUserData = function(){
    return JSON.parse(localStorage.getItem("userData"));
  }


  // Saves dummy data into localStorage
  LocalStorageService.loadDummyData = function(){
    if(!LocalStorageService.getWishlist()){
      LocalStorageService.saveWishlist(dummyWishlist);
    }
    if(!LocalStorageService.getUserData()){
      LocalStorageService.saveUserData(dummyUserData);
    }
  }


  //Dummy data
  var dummyUserData = {
    id: 123,
    name: "Emman Ng Xu Jie"
  }

  var dummyWishlist = [
    {
      id: 1,
      name: "Xbox 360",
      source: "http://compass.xbox.com/assets/6e/52/6e524b42-a264-43f4-ae7a-1f08297424f8.jpg?n=Console-Page_Console-cross-sell-Elite_480x306_02.jpg",
      expected_price: 400,
      accumulated: 200,
      expiry: new Date(),
      description: "...",
      givers: [
        {
          firstName: "Emman",
          source: "https://scontent-sit4-1.xx.fbcdn.net/v/t1.0-1/p240x240/11855781_10204708918342687_2306807101497391770_n.jpg?oh=7f4b1c579f992a1ea752ae29663f5298&oe=58413A4A"
        },
        {
          firstName: "Xujie",
          source: "https://scontent-sit4-1.xx.fbcdn.net/v/t1.0-1/c33.33.414.414/s240x240/529739_4832624688006_1289908355_n.jpg?oh=f2e4778618df68561d8322a6567593b3&oe=58431436"
        }
      ]
    },
    {
      id: 2,
      name: "PS4",
      source: "http://ps4daily.com/wp-content/uploads/2016/05/ps4-console.jpg",
      expected_price: 500,
      accumulated: 450,
      expiry: new Date(),
      description: "...",
      givers: [
        {
          firstName: "Hiep",
          source: "https://scontent-sit4-1.xx.fbcdn.net/v/t1.0-1/c0.0.240.240/p240x240/13882306_830093813793178_7461496676363089630_n.jpg?oh=1a88321d5a39e55a029cead583e7b2c8&oe=587A3FE1"
        },
        {
          firstName: "Yao",
          source: "https://scontent-sit4-1.xx.fbcdn.net/v/t1.0-1/p240x240/12439280_10153334778955248_8673996898083161717_n.jpg?oh=9fad171f54d774ace83f0eef1df2b59e&oe=5843B71C"
        }
      ]
    },
    {
      id: 3,
      name: "Nintendo Wii",
      source: "https://tctechcrunch2011.files.wordpress.com/2013/01/nintendowii.gif?w=440&h=330&crop=1",
      expected_price: 200,
      accumulated: 120,
      expiry: new Date(),
      description: "...",
      givers: [
        {
          firstName: "Hiep",
          source: "https://scontent-sit4-1.xx.fbcdn.net/v/t1.0-1/c0.0.240.240/p240x240/13882306_830093813793178_7461496676363089630_n.jpg?oh=1a88321d5a39e55a029cead583e7b2c8&oe=587A3FE1"
        },
        {
          firstName: "Yao",
          source: "https://scontent-sit4-1.xx.fbcdn.net/v/t1.0-1/p240x240/12439280_10153334778955248_8673996898083161717_n.jpg?oh=9fad171f54d774ace83f0eef1df2b59e&oe=5843B71C"
        }
      ]
    },
  ]

  LocalStorageService.setUser = function(user) {
    setItem('user', user);
  };

  LocalStorageService.getUser = function() {
    return getItem('user');
  }

  LocalStorageService.removeUser = function() {
    removeItem('user');
  }

  LocalStorageService.setToken = function(token) {
    setItem('token', token);
  }

  LocalStorageService.getToken = function() {
    return getItem('token');
  }

  LocalStorageService.removeToken = function() {
    removeItem('token');
  }

  return LocalStorageService;
})
