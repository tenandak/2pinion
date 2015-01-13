angular.module("app",["ngRoute", "login", "homepage", "profile", "askQuestion"])

	
.controller("mainCtrl", ["$scope", "$location", "$routeParams", 
	"MockLoginCredentials","MockProfiles","MockQuestions","MockResponses",
	function($scope, $location, $routeParams, MockLoginCredentials, MockProfiles, MockQuestions, MockResponses){

	$scope.activeTab = 0;
	$scope.isLoggedIn = false;
	$scope.isExpert = false;
	$scope.mockQuestions = MockQuestions.getQuestions();

	$scope.goHome = function(){

		$scope.activeTab = 0;
		$scope.homeTab = true;
		$location.path("/user/" + $routeParams.userID);
	};

	$scope.goProfile = function(){

		$scope.activeTab = 1;
		$location.path("/user/" + $routeParams.userID+ "/profile");
	};

	$scope.goLogOut = function(){
		$scope.isLoggedIn = false;
		$scope.activeTab = 0;
		$location.path("/");
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
		{id:1,email:"emilys@gmail.com",password:"2p", isExpert:false}, 
		{id:2,email:"michaelb@gmail.com",password:"2p", isExpert:true},
		{id:3,email:"jeffm@gmail.com",password:"2p", isExpert:false},
		{id:4,email:"kathyr@gmail.com",password:"2p", isExpert:true},
		{id:5,email:"saraht@gmail.com",password:"2p", isExpert:true},
		{id:6,email:"janicem@gmail.com",password:"2p", isExpert:true},
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
		{id:1, qid:1, description:"I haven't taken my Synthroid for about 6 months and my doctor mentioned that my thyroid levels are okay, and that I won't need to take them anymore. Is this normal?",
		prescription:"none",
		answered:true},
		{id:1, qid:2, description:"My skin is very itchy and my elbows, arms, and knees have rashes. The doctor diagnosed me with eczema, but no treatement. Don't people usually get a cream?",
		prescription:"none",
		answered:true},
		{id:1, qid:3, description:"I have been feeling very depressed, and so my doctor recommended me Zoloft. After taking one, I felt very lightheaded, but my doctor said that's common. Is it?",
		prescription:"Zoloft 50mg, 1/day",
		answered:true},
		{id:3, qid:4, description:"My stomach has really been hurting lately, and my doctor mentioned that due to all the spicy food that I've been eating I must have an ulcer. He prescribed me DisperMox, and I just wanted to make sure it's okay to take!",
		prescription:"DisperMox 1g",
		answered:false},
		{id:5, qid:5, description:"I have been diagnosed with gastritis, and prescribed this. Let me know if you think this is safe.",
		prescription:"nexium 40mg",
		answered:false},
		{id:5, qid:6, description:"My doctor told me for low blood pressure to eat more salt. Is this true?",
		prescription:"none",
		answered:false},
		
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
		{id:4, qid:1, isOK:true, response:"That does happen, you should be fine!"},
		{id:2, qid:2, isOK:false,response:"You should at least get a cream. Ask to see a Dermatologist!"},
		{id:6, qid:3, isOK:false,response:"Please do not take that! That is a very high dose. Your doctor must have made a mistake!"},
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
		{id:1,name:"Emily Swank",age:25,gender:"F",conditions:"Thyroid, Eczema",allergies:"Peanuts",meds:"Synthroid"},
		{id:3,name:"Jeff Miller",age:45,gender:"M",conditions:"none",allergies:"Penicillin",meds:"none"},
		{id:5,name:"Sarah Thompson",age:45,gender:"F",conditions:"none",allergies:"none",meds:"none"}
	];

	var expertProfiles = [
		{id:2, name:"Dr. Michael Brown", position:"Immunologist"},
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





