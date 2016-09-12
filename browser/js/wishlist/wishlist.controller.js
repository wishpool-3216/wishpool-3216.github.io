'use strict';

app.controller('WishlistCtrl', function($scope, $state){
	$scope.goToWish = function() {
		$state.go('wish');
	}
	
	$scope.wishes = [
		{
			name: "Xbox 360",
			source: "http://compass.xbox.com/assets/6e/52/6e524b42-a264-43f4-ae7a-1f08297424f8.jpg?n=Console-Page_Console-cross-sell-Elite_480x306_02.jpg",
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
		}
	]
})