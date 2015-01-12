angular.module("askQuestion", [])

.controller("askQuestionCtrl", ["$scope", "$location", "$routeParams", function($scope, $location, $routeParams){
	var questionID = 3;
	$scope.submit = function(){
		var newQuestion = {
			id:$routeParams.userid, 
			qid:questionID,
			description:$scope.reasonInput,
			prescription:$scope.prescriptionInput, 
			reuse:$scope.reUse,
			reqDoc:$scope.reqDoc, 
			answered:false
		};

		$scope.$parent.mockQuestions.push(newQuestion);
		$location.path("/user/" + $routeParams.userid);
	};
}])

;

