cmpe.controller('projectsCtrl', function($scope, $stateParams, $state, $log, $modal, $timeout,
		$rootScope, $http) {

	
	$scope.list1 = [ {
		id : 1,
		title: 'Project1',
		type : 'Kanban',
		description : 'Desc Kanban',
	}, {
		id : 2,
		title: 'Project2',
		type : 'EasyBackog',
		description : 'Desc Easybacklog',
	}, {
		id : 3,
		title: 'Project3',
		type : 'Gantter',
		description : 'Desc Gantter',
	} ];
	

	$scope.title = "User Projects";

	$scope.getListing = function() {
		/*
		 * $http.get('/api/listings/'+$scope.apartment.place_id).success(function(data){
		 * $scope.data = []; angular.forEach(data, function(v, i){
		 * if(v.stickyUntil > new Date().getTime()){
		 * $scope.stickyListings.push(v); } else{ $scope.listings.push(v); } });
		 * $scope.allListings = data; });
		 */
	};

	$scope.deleteListing = function(listing) {		
		$scope.list1.splice($scope.list1.indexOf(listing),1);
		/*
		 * $http({ method: "post", url: "api/listings/delete/"+listing._id
		 * }).success(function(data){ $scope.getListing(); });
		 */
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
				$scope.list1.push(selectedItem);		
		}, function() {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
});

cmpe.controller('modalProjectsCtrl', function($scope, $modalInstance) {

	$scope.ok = function() {
		$modalInstance.close($scope.task);

	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});