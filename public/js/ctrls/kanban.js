cmpe.controller('kanbanCtrl',
		function($scope, $stateParams, $rootScope, $http) {

			$scope.title = "KANBAN Project";

			$scope.data = [ {
				id : 1,
				title : 'task1',
				description : 'Desc one',
				assigneduser : 'User1',
				duration : 12,
				status : 1
			}, {
				id : 2,
				title : 'task2',
				description : 'Desc two',
				assigneduser : 'User2',
				duration : 11,
				status : 1
			},

			{
				id : 3,
				title : 'task3',
				description : 'Desc three',
				assigneduser : 'User1',
				duration : 10,
				status : 2
			}, {
				id : 4,
				title : 'task4',
				description : 'Desc four',
				assigneduser : 'User2',
				duration : 15,
				status : 2
			}, {
				id : 5,
				title : 'task5',
				description : 'Desc five',
				assigneduser : 'User1',
				duration : 10,
				status : 3
			}, {
				id : 6,
				title : 'task6',
				description : 'Desc six',
				assigneduser : 'User2',
				duration : 10,
				status : 3
			} ];

			$scope.getListing = function() {
				/*
				 * $http.get('/api/listings/'+$scope.apartment.place_id).success(function(data){
				 * $scope.data = []; angular.forEach(data, function(v, i){
				 * if(v.stickyUntil > new Date().getTime()){
				 * $scope.stickyListings.push(v); } else{
				 * $scope.listings.push(v); } }); $scope.allListings = data; });
				 */
			};

			$scope.deleteListing = function(listing) {
				/*
				 * $http({ method: "post", url:
				 * "api/listings/delete/"+listing._id }).success(function(data){
				 * $scope.getListing(); });
				 */
			};

			$scope.open = function(size) {

				var modalInstance = $modal.open({
					templateUrl : 'views/modals/task.html',
					controller : 'ModalInstanceCtrl',
					size : size,
					resolve : {
						items : function() {
							return $scope.items;
						}
					}
				});

				modalInstance.result.then(function(selectedItem) {
					// $scope.selected = selectedItem;
					$scope.arrs.push(selectedItem);
				}, function() {
					$log.info('Modal dismissed at: ' + new Date());
				});
			};
		});