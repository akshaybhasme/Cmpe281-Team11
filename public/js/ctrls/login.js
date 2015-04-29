cmpe.controller('loginCtrl', function($scope, $stateParams, $state, $log, $modal, $timeout,
		$rootScope, $http) {
	
	$scope.user={};
	
	$scope.user={
			  type:"Kanban"
	  }
	$scope.projecttype=["Kanban","Easyback","Gantter"];
	
	$scope.doLogin = function() {
		var user={
				email: $scope.user.email,
				password: $scope.user.password
		}
		$http.post("/users/login",user).success(function(data){
			console.log(data);
			if(data.email)
				$state.go('root.app');
			else
				$scope.status = data.error;
		}).error(function(err){
			console.log(err);
		})
	};
});
