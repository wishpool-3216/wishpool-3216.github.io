'use strict';
app.controller('WishCtrl', function($scope, $stateParams){
	$scope.wish = $stateParams.wishObj;
	$scope.defaultWishSource = "https://www.us.aspjj.com/sites/aspjj.com.us/files/default_images/No_available_image_3.jpg"
});
