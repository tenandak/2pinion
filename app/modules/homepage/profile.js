angular.module("profile", [])

.controller("profileCtrl", ["$scope","$location", "$routeParams", "MockProfileData", function($scope,$location,$routeParams,MockProfileData){
	$scope.profile = MockProfileData.getProfile($routeParams.userid)
	console.log("profile info", $scope.profile);
}])

.factory("MockProfileData",[function(){
	var profiles = [
		{id:1,name:"Emily Swank",age:35,gender:"F",conditions:"Arthiritis,Thyroid",allergies:"Peanuts",meds:"Celebrex,Synthroid"},
		{id:3,name:"Jeff Miller",age:65,gender:"M",conditions:"Lung Cancer",allergies:"Penicillin",meds:"none"}
	];
	return {

		getProfile: function(userId){
			for(var i=0; i< profiles.length; i++) {
				if(userId == profiles[i].id) {
					return profiles[i];
				}
			}
		}

	};
}])

;
