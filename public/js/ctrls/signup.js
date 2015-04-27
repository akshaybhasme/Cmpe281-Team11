cmpe.controller('signupCtrl', function($scope, $stateParams, $state, $log, $modal, $timeout,
		$rootScope, $http) {
	
	$scope.user={};
	
	$scope.signup = function() {
		var user={
				name: $scope.user.name,
				email: $scope.user.email,
				password: $scope.user.password
		}
		$http.post("/users/register",user).success(function(data){
			console.log(data);
			$state.go('root.app');
		}).error(function(err){
			console.log(err);
		})
	};
});
