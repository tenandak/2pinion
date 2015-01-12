angular.module("2app",["ngRoute", "login", "homepage", "profile", "askQuestion"])

	
.controller("mainCtrl", ["$scope", "$location", "$routeParams", "MockQuestions", function($scope, $location, $routeParams, MockQuestions){
	
	$scope.isLogin = false;
	$scope.isExpert = false;
	$scope.mockQuestions = MockQuestions.getQuestions();

	$scope.goHome = function(){
		$location.path("/user/" + $routeParams.userid);
	};

	$scope.goProfile = function(){
		$location.path("/user/" + $routeParams.userid+ "/profile");
	};

	$scope.goLogOut = function(){
		$scope.isLogin = false;
	};
}])

.config(["$routeProvider", "$locationProvider", function($routeProvider){
	$routeProvider
	.when("/user/:userid", {
		templateUrl:"app/modules/homepage/homepage.html",
		controller:"homepageCtrl"
	})
	.when("/user/:userid/profile", {
		templateUrl:"app/modules/homepage/profile.html",
		controller:"profileCtrl"
	})
	.when("/user/:userid/ask", {
		templateUrl:"app/modules/homepage/askQuestion.html",
		controller:"askQuestionCtrl"
	})
	.otherwise({
		redirectTo:"askQuestionCtrl"
	});

}])

.factory("MockQuestions", [function(){

	var questions = [
		{id:1, qid:1,description:"My wrists and arms have been hurting more lately, and I went to see my family physician about it. He mentioned that I should continue to use Celebrex, but a stronger dose. The side effects already made me feel bloated and I've heard that it affects my calcium levels. Could it be the medicine?",
		prescription:"Celebrex, 400mg, 2x a day", reuse:true,
		reqDoc:false, answered:false},
		{id:1, qid:2,description:"I haven't taken my Synthroid for about 6 months and my doctor mentioned that my thyroid levels are okay, and that I won't need to take them anymore. Is this normal?",
		prescription:"none", reuse:false,
		reqDoc:true, answered:true},
		{id:2, qid:2,description:"I got a question for you, i just don't know what it is yet!",
		prescription:"none", reuse:false,
		reqDoc:true, answered:false}
	];

	return {
		getQuestions: function() {
			return questions;
		}
	};
}])

;





