'use strict';

app.controller('WishlistCtrl', function($scope, $state, LocalStorageService){
	//Dummy data
	var dummyWishlist = [
		{
			name: "Xbox 360",
			source: "http://compass.xbox.com/assets/6e/52/6e524b42-a264-43f4-ae7a-1f08297424f8.jpg?n=Console-Page_Console-cross-sell-Elite_480x306_02.jpg",
			price: 400,
			accumulated: 200,
			progress: "50",
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
			name: "PS4",
			source: "http://ps4daily.com/wp-content/uploads/2016/05/ps4-console.jpg",
			price: 500,
			accumulated: 450,
			progress: "90",
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
			name: "Nintendo Wii",
			source: "https://tctechcrunch2011.files.wordpress.com/2013/01/nintendowii.gif?w=440&h=330&crop=1",
			price: 200,
			accumulated: 120,
			progress: "60",
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

	$scope.wishes = LocalStorageService.getWishlist() || dummyWishlist;

	$scope.goToWish = function(wishObj) {
		$state.go('wish', {wishObj: wishObj});
	}

	$scope.defaultWishSource = "https://www.us.aspjj.com/sites/aspjj.com.us/files/default_images/No_available_image_3.jpg"

	$scope.goToWishadd = function(){
		$state.go('wishadd');
	}

});
