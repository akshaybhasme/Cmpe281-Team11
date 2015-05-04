cmpe.controller('kanbanCtrl', function($scope, $stateParams, $log, $modal,
		$timeout, $rootScope, $http) {

	$scope.list1 = [];
	$scope.list2 = [];
	$scope.list3 = [];

	$scope.title = "KANBAN Project";

	$scope.getListing = function() {
		$http.get('/api/getTasks/kanban/' + $stateParams.projectID).success(
				function(data) {
					angular.forEach(data, function(v, i) {
						if (v.object.status == "Requested") {
							v.object.id = v._id;
							$scope.list1.push(v.object);
						} else if (v.object.status == "In Progress") {
							v.object.id = v._id;
							$scope.list2.push(v.object);
						} else {
							v.object.id = v._id;
							$scope.list3.push(v.object);
						}
					});

				});
	};

	$scope.updateListing1 = function($event, $index, list) {
		list[$index].status="Requested";
		var o = {
				object : list[$index]
			};
		$http.put("/api/updateTask/" + list[$index].id, o)
		.success(function(data)  {
			console.log('Saved :' + data);
		});
	};
	$scope.updateListing2 = function($event, $index, list) {
		list[$index].status="In Progress";
		var o = {
				object : list[$index]
			};
		$http.put("/api/updateTask/" + list[$index].id, o)
		.success(function(data)  {
			console.log('Saved :' + data);
		});
	};
	$scope.updateListing3 = function($event, $index, list) {
		list[$index].status="Done";
		var o = {
				object : list[$index]
			};
		$http.put("/api/updateTask/" + list[$index].id, o)
		.success(function(data)  {
			console.log('Saved :' + data);
		});
	};

	$scope.deleteListing1 = function(listing) {
		console.log(listing);

		$http({
			method : "delete",
			url : "/api/deleteTask/" + listing.id
		}).success(function(data) {
			$scope.list1.splice($scope.list1.indexOf(listing), 1);
		});

	};

	$scope.deleteListing2 = function(listing) {

		$http({
			method : "delete",
			url : "/api/deleteTask/" + listing.id
		}).success(function(data) {
			$scope.list2.splice($scope.list2.indexOf(listing), 1);
		});

	};

	$scope.deleteListing3 = function(listing) {

		$http({
			method : "delete",
			url : "/api/deleteTask/" + listing.id
		}).success(function(data) {
			$scope.list3.splice($scope.list3.indexOf(listing), 1);
		});

	};

	$scope.items = [];
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

		modalInstance.result.then(function(selItem) {
			var o = {
				object : selItem
			};
			$http.post("/api/addTask/kanban/" + $stateParams.projectID, o)
					.success(function(data) {
						if (selItem.status == "Requested") {
							selItem.id = data._id;
							$scope.list1.push(selItem);
						} else if (selItem.status == "In Progress") {
							selItem.id = data._id;
							$scope.list2.push(selItem);
						} else if (selItem.status == "Done") {
							selItem.id = data._id;
							$scope.list3.push(selItem);
						}
					});
		}, function() {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
	$scope.getListing();
	
	$scope.showProgress = function(){
		var modalInstance = $modal.open({

			templateUrl : 'views/modals/kanban-progress.html',
			controller : function($scope, data){
				$scope.pie = {
						data: data,
						options: {thickness: 150}
				};
				console.log($scope.pie);
			},
			resolve : {
				data : function() {
					return [
					        {label: "Requested", value: $scope.list1.length, color: "red"}, 
					        {label: "In Progress", value: $scope.list2.length, color: "#00ff00"},
					        {label: "Done", value: $scope.list3.length, color: "rgb(0, 0, 255)"}
					      ];
				}
			}
		});
	};
});

cmpe.controller('modalKanbanCtrl', function($scope, $modalInstance, $http) {
	$scope.task = {};
	
	
	$scope.userlist=[];
	
	$http.get("/users/all").success(function(data){
		for(var i=0;i<data.length;i++)
			$scope.userlist.push(data[i]);
		console.log($scope.userlist);
	});

	$scope.checkedNames = [];
	$scope.toggleCheck = function (name) {
		if ($scope.checkedNames.indexOf(name) === -1) {
			$scope.checkedNames.push(name);
		} else {
			$scope.checkedNames.splice($scope.checkedNames.indexOf(name), 1);
		}
	};

	$scope.task = {
		status : "Requested"
	}
	$scope.projstatus = [ "Requested", "In Progress", "Done" ];
	$scope.task.assigneduser=[];
	$scope.ok = function() {
		console.log("Userlist:"+$scope.userlist.length);
		console.log("CheckedList:"+$scope.checkedNames.length);
		for(var i=0;i<$scope.userlist.length;i++){
			for(var j=0;j<$scope.checkedNames.length;j++){
				if($scope.userlist[i]._id==$scope.checkedNames[j]){
					console.log($scope.userlist[i]);
					$scope.task.assigneduser.push($scope.userlist[i].name);
				}
			}
		}
			console.log("----------------"+$scope.task.assigneduser);
		
		$modalInstance.close($scope.task);

	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});