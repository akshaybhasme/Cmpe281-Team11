cmpe.controller('baseCtrl', function($scope, $stateParams, $state, $log, $modal, $timeout,
		$rootScope, $http) {
	
	$scope.user={};
	//if(user.name)
		$http.get("/users/isLoggedIn").success(function(data){
			console.log(data);
			if(data.email){
				$scope.user.name=data.name;
				$scope.user.projecttype=data.projecttype;
				//$state.go('root.app');
			}
			else{
				$state.go('root.login');
			}
		})
});
