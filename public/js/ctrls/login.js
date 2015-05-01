cmpe.controller('loginCtrl', function($scope, $stateParams, $state, $log, $modal, $timeout,
		$rootScope, $http) {
	
	$scope.user={};
	
	$scope.user={
			  type:"Kanban"
	  }
	$scope.projecttype=["Kanban","EasyBacklog","Gantter"];
	
	$scope.doLogin = function() {
		var user={
				email: $scope.user.email,
				password: $scope.user.password
		}
		$http.post("/users/login",user).success(function(data){
			console.log(data);
			console.log()
			if(data.email){
				if($scope.user.type === "Kanban")
					$state.go('root.app.kanban');
				if($scope.user.type === "EasyBacklog")
					$state.go('root.app.easybacklog');
				if($scope.user.type === "Gantter")
					$state.go('root.app.gantter');
			}				
			else
				$scope.status = data.error;
		}).error(function(err){
			console.log(err);
		})
	};
});
