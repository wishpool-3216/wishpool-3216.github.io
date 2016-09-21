[1mdiff --git a/browser/css/variables.scss b/browser/css/variables.scss[m
[1mindex cffccdf..8fdb4e5 100644[m
[1m--- a/browser/css/variables.scss[m
[1m+++ b/browser/css/variables.scss[m
[36m@@ -6,3 +6,4 @@[m [m$z-index-top-level: 50;[m
 [m
 $complement-color: #FF4081;[m
 $success-color: #00cd66;[m
[32m+[m[32m$normal-text-color: rgba(0, 0, 0, 0.6);[m
[1mdiff --git a/browser/css/wish.scss b/browser/css/wish.scss[m
[1mindex e06b323..e8994cc 100644[m
[1m--- a/browser/css/wish.scss[m
[1m+++ b/browser/css/wish.scss[m
[36m@@ -13,6 +13,13 @@[m
 	.wishLabel {[m
 		margin: 5px;[m
 		margin-top: 10px;[m
[32m+[m		[32mcolor: $complement-color;[m
[32m+[m	[32m}[m
[32m+[m
[32m+[m	[32m.wish-label-content {[m
[32m+[m		[32mcolor: $normal-text-color;[m
[32m+[m		[32mfont-size: 14px;[m
[32m+[m		[32mfont-weight: normal;[m
 	}[m
 [m
 	.wishImage {[m
[1mdiff --git a/browser/js/wish/wish.controller.js b/browser/js/wish/wish.controller.js[m
[1mindex adbcf84..c8f1566 100644[m
[1m--- a/browser/js/wish/wish.controller.js[m
[1m+++ b/browser/js/wish/wish.controller.js[m
[36m@@ -1,6 +1,6 @@[m
 'use strict';[m
 [m
[31m-app.controller('WishCtrl', function($scope, $stateParams, $state, LocalStorageService, WishService, $mdDialog){[m
[32m+[m[32mapp.controller('WishCtrl', function($scope, $stateParams, $state, LocalStorageService, WishService, $mdDialog, $mdToast){[m
 [m
 	// Checks if client is viewing their own wishlist or someone else's[m
 	$scope.pageUserId = $stateParams.userId;[m
[36m@@ -13,31 +13,48 @@[m [mapp.controller('WishCtrl', function($scope, $stateParams, $state, LocalStorageSe[m
 	});[m
 [m
 	$scope.contributed = false;[m
[31m-	$scope.contributeStatus = "";[m
   $scope.showContributePrompt = function(ev) {[m
     // Appending dialog to document.body to cover sidenav in docs app[m
     var confirm = $mdDialog.prompt()[m
       .title('How much would you like to contribute?')[m
       .textContent("Full dollar contributions are recommended. Contributions in cents (or any use of the period '.' symbol) should be avoided.")[m
[31m-      .placeholder('ContributeAmt')[m
[31m-      .ariaLabel('ContributeAmt')[m
[32m+[m[32m      .placeholder('Contribute amount')[m
[32m+[m[32m      .ariaLabel('Contribute amount')[m
       .initialValue('0')[m
       .targetEvent(ev)[m
[31m-      .ok('Confirm!')[m
[31m-      .cancel("I'll think about it");[m
[32m+[m[32m      .ok('Confirm')[m
[32m+[m[32m      .cancel("Cancel");[m
 [m
     $mdDialog.show(confirm).then(function(result) {[m
[32m+[m			[32mconsole.log(result);[m
       var regexp = /\d+/;[m
       var match = result.match(regexp);[m
       var contributeAmt = parseInt(match[0]);[m
       if(match && contributeAmt > 0){[m
       	$scope.contributeAmt = contributeAmt;[m
[31m-      	$scope.contributeStatus = "Thank you! Your contribution was noted.";[m
[32m+[m[41m      [m	[32m$scope.contributeStatus =[m
[32m+[m				[32m$scope.showToast("Thank you!");[m
       	$scope.contributed = true;[m
[31m-      }else{[m
[31m-      	$scope.contributeStatus = "Oops! Your contribution was not accepted.";[m
[32m+[m[32m      } else {[m
[32m+[m				[32m$scope.showToast("Oops! Invalid result");[m
       }[m
     });[m
   };[m
 [m
[32m+[m	[32m$scope.showToast = function(text) {[m
[32m+[m		[32mif (!text) return;[m
[32m+[m[32m    var pinTo = {[m
[32m+[m			[32mtop: false,[m
[32m+[m			[32mleft: false,[m
[32m+[m			[32mbottom: true,[m
[32m+[m			[32mright: true[m
[32m+[m		[32m}[m
[32m+[m[32m    $mdToast.show([m
[32m+[m[32m      $mdToast.simple()[m
[32m+[m[32m        .textContent(text)[m
[32m+[m[32m        .position(pinTo)[m
[32m+[m[32m        .hideDelay(2000)[m
[32m+[m[32m    );[m
[32m+[m[32m  };[m
[32m+[m
 });[m
[1mdiff --git a/browser/js/wish/wish.template.html b/browser/js/wish/wish.template.html[m
[1mindex ec21e91..62de0e7 100644[m
[1m--- a/browser/js/wish/wish.template.html[m
[1m+++ b/browser/js/wish/wish.template.html[m
[36m@@ -1,18 +1,15 @@[m
 <md-content class="wish container" layout="column" layout-align="center center" flex>[m
 	<img class="wishImage" src="{{wish.image_file_name | defaultPhoto}}">[m
 	<h2 class="wishLabel">{{wish.name}}</h2>[m
[31m-	<h4 class="wishLabel">Expires On: {{wish.expiry.slice(0,10)}}</h4>[m
[31m-	<h4 class="wishLabel">Wish Progress: ${{wish.accumulated || 0}} / ${{wish.expected_price}}</h4>[m
[32m+[m	[32m<h4 class="wishLabel">Expires On: <span class="wish-label-content"> {{wish.expiry.slice(0,10)}} </span> </h4>[m
[32m+[m	[32m<h4 class="wishLabel">Wish Progress: <span class="wish-label-content"> ${{wish.accumulated || 0}} / ${{wish.expected_price}} </span> </h4>[m
 	<md-progress-linear md-mode="determinate" value="{{(wish.sum_contributions || 0)/ wish.expected_price * 100}}"></md-progress-linear>[m
 	<br>[m
 	<h4 class="wishLabel">Wish Fairies:</h4>[m
 	<div layout="row" class="contributorIcons">[m
[31m-		<p class="noContributors" ng-hide="{{wish.contributions.length > 0}}">No contributors!</p>[m
[32m+[m		[32m<p class="noContributors wish-label-content" ng-hide="{{wish.contributions.length > 0}}">No contributors!</p>[m
 		<img ng-repeat="giver in wish.contributions" src="{{giver.source}}" class="contributorIcon">[m
 	</div>[m
[31m-	<div class="contributeStatus">[m
[31m-		{{contributeStatus}}[m
[31m-	</div>[m
 </md-content>[m
 [m
 <md-button class="contributeButton md-primary md-raised" ng-hide="userSeesOwnWish || contributed" ng-click="showContributePrompt($event)">Contribute</md-button>[m
