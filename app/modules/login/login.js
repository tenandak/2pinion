angular.module("login", [])

.controller("loginCtrl", ["$scope", "$location", "MockUserLogin",  function($scope,$location, MockUserLogin){
	$scope.invalidUser = false;

	$scope.login = function(){
		var checkLogin = MockUserLogin.check($scope.userEmail, $scope.userPassword);
		if(checkLogin) {
			$scope.$parent.isLogin = true;
			$scope.$parent.isExpert = checkLogin.isExpert;
			$location.path("/user/" + checkLogin.id);
			$scope.userEmail = "";
			$scope.userPassword = "";
		} else {
			$scope.invalidUser = true;
		}

	};
}])

.factory("MockUserLogin", [function(){

	var userLogin = [
		{id:1,email:"a@a.com",password:"a", isExpert:false},
		{id:2,email:"b@b.com",password:"b", isExpert:true},
		{id:3,email:"c@c.com",password:"c", isExpert:false},
		{id:4,email:"d@d.com",password:"d", isExpert:true},
	];

    return {
        check: function(email,password) {
        	for(var i=0; i<userLogin.length; i++) {
        		if(email == userLogin[i].email && password == userLogin[i].password) {
        			return userLogin[i];
        		}
        	}
        	return undefined;
        }
    };
}])

;