angular.module("homepage", [])

.controller("homepageCtrl", ["$scope","$location", "$routeParams", 
	"MockQuestions", "MockResponses", "MockProfiles", function($scope,$location, $routeParams, 
		MockUserQuestions, MockResponses, MockProfiles){
	
	$scope.isExpert = $scope.$parent.isExpert;

	var formattedAnswers = function(question) {
		var answers = MockResponses.getResponses(question.qid)
			for(var i=0; i< answers.length; i++){
				answers[i].expert = MockProfiles.getExpertProfile(answers[i].id);
			}
		return answers;
	};

	if($scope.isExpert){
		$scope.questions = MockUserQuestions.getUnansweredQuestions();
		$scope.expProfile = MockProfiles.getExpertProfile($routeParams.userID);
		$scope.name = $scope.expProfile.name;

	} else {
		$scope.questions = MockUserQuestions.getUserQuestions($routeParams.userID);
		for (var i=0; i <$scope.questions.length; i++) {
			$scope.questions[i].formattedAnswers = formattedAnswers($scope.questions[i]);
		}
		$scope.name = MockProfiles.getUserProfile($routeParams.userID).name;
	}



	$scope.askQuestion = function(){
		$location.path("/user/" + $routeParams.userID+ "/ask");
	};

	$scope.createResponse = function(question, isOK, comment){
		var response = {
			id:$routeParams.userID, 
			qid:question.qid,
			isOK:isOK,
			response:comment
		};
		MockResponses.addAResponse(response);

		for(var i=0; i<$scope.questions.length; i++){
			if($scope.questions[i] == question){
				$scope.questions[i].answered = true;
				$scope.questions.splice(i, 1);
			}
		}
	}

}])

;