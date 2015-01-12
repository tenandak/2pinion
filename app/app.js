angular.module("app",["ngRoute", "login", "homepage", "profile", "askQuestion"])

	
.controller("mainCtrl", ["$scope", "$location", "$routeParams", 
	"MockLoginCredentials","MockProfiles","MockQuestions","MockResponses",
	function($scope, $location, $routeParams, MockLoginCredentials, MockProfiles, MockQuestions, MockResponses){

	$scope.profileTab = false;
	$scope.homeTab = true;
	$scope.isLoggedIn = false;
	$scope.isExpert = false;
	$scope.mockQuestions = MockQuestions.getQuestions();

	$scope.goHome = function(){

		$scope.profileTab = false;
		$scope.homeTab = true;
		$location.path("/user/" + $routeParams.userID);
	};

	$scope.goProfile = function(){

		$scope.profileTab = true;
		$scope.homeTab = false;
		$scope.activeIndex = 1;
		$location.path("/user/" + $routeParams.userID+ "/profile");
	};

	$scope.goLogOut = function(){
		$scope.isLoggedIn = false;
	};
}])

.config(["$routeProvider", "$locationProvider", function($routeProvider){
	$routeProvider
	.when("/user/:userID", {
		templateUrl:"app/modules/homepage/homepage.html",
		controller:"homepageCtrl"
	})
	.when("/user/:userID/profile", {
		templateUrl:"app/modules/homepage/profile.html",
		controller:"profileCtrl"
	})
	.when("/user/:userID/ask", {
		templateUrl:"app/modules/homepage/askQuestion.html",
		controller:"askQuestionCtrl"
	})
	.otherwise({
		redirectTo:"/"
	});

}])

.factory("MockLoginCredentials", [function(){

	var userLogIn = [
		{id:1,email:"a@a.com",password:"a", isExpert:false},
		{id:2,email:"b@b.com",password:"b", isExpert:true},
		{id:3,email:"c@c.com",password:"c", isExpert:false},
		{id:4,email:"d@d.com",password:"d", isExpert:true},
	];

    return {
        verify: function(email,password) {
        	for(var i=0; i<userLogIn.length; i++) {
        		if(email == userLogIn[i].email && password == userLogIn[i].password) {
        			return userLogIn[i];
        		}
        	}
        	return undefined;
        }
    };
}])

.factory("MockQuestions", [function(){

	var questions = [
		{id:1, qid:1,description:"My wrists and arms have been hurting more lately, and I went to see my family physician about it. He mentioned that I should continue to use Celebrex, but a stronger dose. The side effects already made me feel bloated and I've heard that it affects my calcium levels. Could it be the medicine?",
		prescription:"Celebrex, 400mg, 2x a day",
		answered:true},
		{id:1, qid:2,description:"I haven't taken my Synthroid for about 6 months and my doctor mentioned that my thyroid levels are okay, and that I won't need to take them anymore. Is this normal?",
		prescription:"none",
		answered:true},
		{id:3, qid:3,description:"My stomach has been hurting a lot lately, and I went to see the doctor. They said it's acid reflux and prescribed me Nexium. Should I look into this more?",
		prescription:"nexium 40mg",
		answered:false},
		{id:1, qid:4,description:"I have been feeling very depressed, and so my doctor recommended me Zoloft. After taking one, I felt very lightheaded, but my doctor said that's common. Is it?",
		prescription:"Zoloft 50mg",
		answered:true}
	];

	return {

		addAQuestion: function(question){
			questions.push(question);
		},

		getQuestions: function() {
			return questions;
		},

		getUnansweredQuestions: function() {
			var UnansweredQuestions = [];
			for(var i=0; i< questions.length; i++) {
				if(questions[i].answered == false) {
					UnansweredQuestions.push(questions[i])
				}
			}

			return UnansweredQuestions;
		},

		getUserQuestions: function(userID){
			var userQuestions = [];
			for(var i=0; i< questions.length; i++) {
				if(questions[i].id == userID) {
					userQuestions.push(questions[i])
				}
			}

			return userQuestions;
		},

		getNextIndex: function() {
			return questions.length +1;
		}
	};
}])

.factory("MockResponses",[function(){
	var answers = [
		{id:2, qid:1, isOK:false,response:"no, that sounds wrong you should get a second opinion from a specialist!"},
		{id:4, qid:1, isOK:false,response:"that could potentially be harmful, please double check dosage!"},
		{id:2, qid:2, isOK:true,response:"that's very common, do not worry!"},
		{id:6, qid:4, isOK:false,response:"YOU MAY BE ALLERGIC! STOP USING AND TALK TO ANOTHER DOCTOR!"},
	];
	return {

		getResponses: function(questionId){
			var questionAnswers = [];
			for(var i=0; i< answers.length; i++) {
				if(answers[i].qid == questionId) {
					questionAnswers.push(answers[i])
				}
			}
			return questionAnswers;
		},

		addAResponse: function(response){
			answers.push(response);
		}

	};
}])

.factory("MockProfiles",[function(){
	var userProfiles = [
		{id:1,name:"Emily Swank",age:35,gender:"F",conditions:"Arthiritis,Thyroid",allergies:"Peanuts",meds:"Celebrex,Synthroid"},
		{id:3,name:"Jeff Miller",age:65,gender:"M",conditions:"Lung Cancer",allergies:"Penicillin",meds:"none"}
	];

	var expertProfiles = [
		{id:2, name:"Dr. Michael Brown", position:"Family Physician"},
		{id:4, name:"Kathy Reed", position:"Pharmacologist"},
		{id:6, name:"Dr. Janice McGiller", position:"Psychiatrist"},
	];
	return {

		getUserProfile: function(userID){
			for(var i=0; i< userProfiles.length; i++) {
				if(userID == userProfiles[i].id) {
					return userProfiles[i];
				}
			}
		},

		getExpertProfile: function(expId){
			for(var i=0; i< expertProfiles.length; i++) {
				if(expId == expertProfiles[i].id) {
					return expertProfiles[i];
				}
			}
		}

	};
}])

;





