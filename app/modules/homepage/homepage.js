angular.module("homepage", [])

.controller("homepageCtrl", ["$scope","$location", "$routeParams", "MockUserQuestions", "MockAnswers", 
	function($scope,$location, $routeParams, MockUserQuestions, MockAnswers){
	$scope.isExpert = $scope.$parent.isExpert;
	var mockQuestions = $scope.$parent.mockQuestions;
	$scope.commentEnabled = false;

	if($scope.isExpert){
		$scope.questions = MockUserQuestions.getUnansweredQuestions(mockQuestions);

	} else {
		$scope.questions = MockUserQuestions.getUserQuestions(mockQuestions,$routeParams.userid);
		for (var i=0; i <$scope.questions.length; i++) {
			$scope.questions[i].answers = MockAnswers.getAnswers($scope.questions[i].qid);
		}
	}

	$scope.askQuestion = function(){
		$location.path("/user/" + $routeParams.userid+ "/ask");
	};

	$scope.createResponse = function(question, isOK, comment){
		var answer = {
			expid:2, 
			qid:question.id,
			isOK:isOK,
			response:comment
		};
		MockAnswers.setAnswers(answer);

		for(var i=0; i<$scope.questions.length; i++){
			if($scope.questions[i] == question){
				$scope.questions[i].answered = true;
				$scope.questions.splice(i, 1);
			}
		}
	}

}])

.factory("MockUserQuestions",[function(){
	return {

		getUnansweredQuestions: function(questions) {
			var UnansweredQuestions = [];
			for(var i=0; i< questions.length; i++) {
				if(questions[i].answered == false) {
					UnansweredQuestions.push(questions[i])
				}
			}

			return UnansweredQuestions;
		},

		getUserQuestions: function(questions, userId){
			var userQuestions = [];
			for(var i=0; i< questions.length; i++) {
				if(questions[i].id == userId) {
					userQuestions.push(questions[i])
				}
			}

			return userQuestions;
		}

	};
}])

.factory("MockAnswers",[function(){
	var answers = [
		{expid:2, qid:1,isOK:false,response:"no, that sounds wrong you should get a second opinion from a specialist!"},
		{expid:2, qid:2,isOK:true,response:"that's very common, do not worry!"}
	];
	return {

		getAnswers: function(questionId){
			var questionAnswers = [];
			for(var i=0; i< answers.length; i++) {
				if(answers[i].qid == questionId) {
					questionAnswers.push(answers[i])
				}
			}
			return questionAnswers;
		},

		setAnswers: function(answer){
			answers.push(answer);
		}

	};
}])

;