cmpe.controller('kanbanCtrl', function($scope, $stateParams, $log, $modal, $timeout,
		$rootScope, $http) {

	$scope.list1 = [ {
		id : 3,
		title : 'task3',
		description : 'Desc three',
		assigneduser : 'User1',
		duration : 10,
		status : 1,
		drag : true
	}, {
		id : 4,
		title : 'task4',
		description : 'Desc four',
		assigneduser : 'User2',
		duration : 15,
		status : 1,
		drag : true
	} ];
	
	$scope.list2 = [{
		id : 1,
		title : 'task1',
		description : 'Desc one',
		assigneduser : 'User1',
		duration : 12,
		status : 2,
		drag : true
	}, {
		id : 2,
		title : 'task2',
		description : 'Desc two',
		assigneduser : 'User2',
		duration : 11,
		status : 2,
		drag : true
	}];
	
	$scope.list3 = [ {
		id : 5,
		title : 'task5',
		description : 'Desc five',
		assigneduser : 'User1',
		duration : 10,
		status : 3,
		drag : true
	}, {
		id : 6,
		title : 'task6',
		description : 'Desc six',
		assigneduser : 'User2',
		duration : 10,
		status : 3,
		drag : true
	}];

	$scope.title = "KANBAN Project";

	$scope.getListing = function() {
		/*
		 * $http.get('/api/listings/'+$scope.apartment.place_id).success(function(data){
		 * $scope.data = []; angular.forEach(data, function(v, i){
		 * if(v.stickyUntil > new Date().getTime()){
		 * $scope.stickyListings.push(v); } else{ $scope.listings.push(v); } });
		 * $scope.allListings = data; });
		 */
	};

	$scope.deleteListing1 = function(listing) {		
		$scope.list1.splice($scope.list1.indexOf(listing),1);
		/*
		 * $http({ method: "post", url: "api/listings/delete/"+listing._id
		 * }).success(function(data){ $scope.getListing(); });
		 */
	};
	
	$scope.deleteListing2 = function(listing) {		
		$scope.list2.splice($scope.list2.indexOf(listing),1);
		/*
		 * $http({ method: "post", url: "api/listings/delete/"+listing._id
		 * }).success(function(data){ $scope.getListing(); });
		 */
	};
	
	$scope.deleteListing3 = function(listing) {		
		$scope.list3.splice($scope.list3.indexOf(listing),1);
		/*
		 * $http({ method: "post", url: "api/listings/delete/"+listing._id
		 * }).success(function(data){ $scope.getListing(); });
		 */
	};
	
	$scope.items=[];
	$scope.open = function() {
		var modalInstance = $modal.open({
			
			templateUrl : 'views/modals/kanbanModal.html',
			controller : 'modalKanbanCtrl',
			resolve : {
				items : function() {
					return $scope.items;
				}
			}
		});

		modalInstance.result.then(function(selectedItem) {
			if(selectedItem.status==1)
				$scope.list1.push(selectedItem);
			
			else if(selectedItem.status==2)
				$scope.list2.push(selectedItem);
			
			else if(selectedItem.status==3)
				$scope.list3.push(selectedItem);
			
		}, function() {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
});

cmpe.controller('modalKanbanCtrl', function($scope, $modalInstance) {

	$scope.ok = function() {
		// console.log($scope.task);
		$scope.task.drag=true;
		$modalInstance.close($scope.task);

	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});