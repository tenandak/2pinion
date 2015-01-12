angular.module("login", [])

.controller("loginCtrl", ["$scope", "$location", "MockLoginCredentials",  function($scope,$location, MockLoginCredentials){
	$scope.invalidUser = false;

	$scope.login = function(){
		var user = MockLoginCredentials.verify($scope.userEmail, $scope.userPassword);
		if(user) {
			$scope.$parent.isLoggedIn = true;
			$scope.$parent.isExpert = user.isExpert;
			$location.path("/user/" + user.id);
			$scope.userEmail = "";
			$scope.userPassword = "";
		} else {
			$scope.invalidUser = true;
		}

	};
}])

;