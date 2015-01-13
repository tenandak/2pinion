angular.module("profile", [])

.controller("profileCtrl", ["$scope","$location", "$routeParams", "MockProfiles", function($scope,$location,$routeParams,MockProfiles){
	$scope.profile = MockProfiles.getUserProfile($routeParams.userID)
}])

;
