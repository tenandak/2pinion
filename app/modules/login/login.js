angular.module("login", [])

.controller("loginCtrl", ["$scope", "$location", "MockLoginCredentials",  function($scope,$location, MockLoginCredentials){
	$scope.invalidUser = false;

	$scope.login = function(){
		var user = MockLoginCredentials.verify($scope.userEmail, $scope.userPassword);
		if(user) {
			clearLogInPage();
			$scope.$parent.isLoggedIn = true;
			$scope.$parent.isExpert = user.isExpert;
			$location.path("/user/" + user.id);

		} else {
			$scope.invalidUser = true;
		}

	};

	var clearLogInPage = function () {
		$scope.userEmail = "";
		$scope.userPassword = "";
		$scope.invalidUser = false;
	};
}])

;