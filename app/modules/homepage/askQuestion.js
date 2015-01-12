angular.module("askQuestion", [])

.controller("askQuestionCtrl", ["$scope", "$location", "$routeParams", "MockQuestions",
	function($scope, $location, $routeParams, MockQuestions){

		console.log("MockQuestions.getNextIndex()", MockQuestions.getNextIndex());

	$scope.submit = function(){
		var newQuestion = {
			id:$routeParams.userID, 
			qid:MockQuestions.getNextIndex(),
			description:$scope.reasonInput,
			prescription:$scope.prescriptionInput, 
			reuse:$scope.reUse,
			reqDoc:$scope.reqDoc, 
			answered:false
		};

		MockQuestions.addAQuestion(newQuestion);
		$location.path("/user/" + $routeParams.userID);
	};
}])

;

