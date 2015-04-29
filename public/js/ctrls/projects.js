cmpe.controller('projectsCtrl', function($scope, $stateParams, $state, $log, $modal, $timeout,
		$rootScope, $http) {

	$scope.title = "User Projects";
	
	$scope.projects = [];

	$scope.getListing = function() {
		
		if($state.current.name == "root.app.kanban")
			$scope.type = "kanban";

		if($state.current.name == "root.app.easybacklog")
			$scope.type = "easybacklog";

		if($state.current.name == "root.app.gantter")
			$scope.type = "gantter";

		$http.get('/api/getProjects/'+$scope.type).success(function(data){
			$scope.projects = data; 
		});
	};

	$scope.deleteListing = function(listing) {		
		$scope.list1.splice($scope.list1.indexOf(listing),1);
		$http({ method: "post", url: "api/listings/delete/"+listing._id}).success(function(data){ 
			$scope.getListing(); 
		});

	};

	$scope.items=[];
	$scope.open = function() {
		var modalInstance = $modal.open({

			templateUrl : 'views/modals/projectsModal.html',
			controller : 'modalProjectsCtrl',
			resolve : {
				items : function() {
					return $scope.items;
				}
			}
		});

		modalInstance.result.then(function(selectedItem) {
			$scope.projects.push(selectedItem);
		}, function() {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
	
	$scope.viewProject = function(project){
		if(project.type == "kanban")
			$state.go('root.app.kanban.project', {projectID: project._id});
		
		if(project.type == "gantter")
			$state.go('root.app.gantter.project', {projectID: project._id});
		
		if(project.type == "easybacklog")
			$state.go('root.app.easybacklog.project', {projectID: project._id});
	};
	
	$scope.getListing();
});

cmpe.controller('modalProjectsCtrl', function($scope, $modalInstance, $state, $http) {

	if($state.current.name == "root.app.kanban")
		$scope.type = "kanban";

	if($state.current.name == "root.app.easybacklog")
		$scope.type = "easybacklog";

	if($state.current.name == "root.app.gantter")
		$scope.type = "gantter";

	$scope.ok = function() {

		$http.post('/api/addProject/'+$scope.type, {object : $scope.project}).success(function(data){
			$modalInstance.close(data);
		});

	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

});