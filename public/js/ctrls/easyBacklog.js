cmpe.controller('easybacklogCtrl', function($scope, $stateParams, $log, $modal,
		$timeout, $rootScope, $http) {

	$scope.sprints = [];
	$scope.backlog = [];
	/*
	 * $scope.backlog = [ { name : 'Home page', theme : [ { code : 'HOP', id :
	 * 'HOP5', userstoryln1 : 'user', userstoryln2 : 'view a set of simple
	 * screen shots', userstoryln3 : 'understand how the products work',
	 * criteria : [ 'Lightbox appears with ability to browse through gallery of
	 * screen shots' ], comments : 'Assumed use of JQuery Lightbox', points : 3,
	 * cost : 800, days : '1.0', status : 'Completed', sprint : 'Sprint 3', drag :
	 * true }, { code : 'HOP', id : 'HOP2', userstoryln1 : 'admin', userstoryln2 :
	 * 'track users who arrive on the home page via a campaign URL',
	 * userstoryln3 : 'measure the effectiveness of my campaigns', criteria : [
	 * 'Support for tracking code in the format ?campaign=[code]', 'Tracking
	 * code and number of visits to be stored in the database' ], comments : '',
	 * points : 3, cost : 800, days : '1.0', status : 'Accepted', sprint :
	 * 'Sprint 1', drag : true } ] }, { name : 'Authentication', theme : [ {
	 * code : 'AUT', id : 'AUT1', userstoryln1 : 'user', userstoryln2 : 'login
	 * to the website', userstoryln3 : 'access my account and use the support
	 * features', criteria : [ 'Email address and password is required', 'Login
	 * is visible in the top header of the website and is available after
	 * rolling over the login button', 'Error messages must be shown if the
	 * email address and password combination is incorrect' ], comments : 'No
	 * longer need to adhere to security requirements of lock out', points : 5,
	 * cost : 1333, days : '1.7', status : 'Accepted', sprint : 'Sprint 2', drag :
	 * true }, { code : 'AUT', id : 'AUT2', userstoryln1 : 'user', userstoryln2 :
	 * 'register on the website', userstoryln3 : 'access the secure areas',
	 * criteria : [ 'First name, last name, email address and password are all
	 * required fields', 'Additional fields include company and phone number',
	 * 'Email address must be unique', 'Password must pass strong password
	 * requirements', 'New registrations will send an email to validate the
	 * email address is valid' ], comments : 'Please refer to security document
	 * A1 for details on the existing strong password requirements', points : 8,
	 * cost : 2133, days : '2.7', status : 'Accepted', sprint : 'Sprint 3', drag :
	 * true } ] } ];
	 */
	
	
	$scope.getTheme = function() {
		$http.get('/api/getTasks/easyBacklog/' + $stateParams.projectID)
				.success(function(data) {

					angular.forEach(data, function(v, i) {
						v.object.id = v._id;
						$scope.backlog.push(v.object);
					});
					console.log($scope.backlog);
				});
	};

	$scope.getTheme();
	
	$scope.getSprints= function() {
		return $http.get('/api/getProjectByID/' + $stateParams.projectID)
		.success(function(data) {
			console.log(data);
			
			for(var i in data.object.sprints){
				console.log(data.object.sprints[i]);
				$scope.sprints.push(data.object.sprints[i]);
			}
		});
	},

	$scope.getSprints();

	$scope.title = "easyBacklog Project";

	$scope.sprints = [];
	$scope.open = function() {
		var modalInstance = $modal.open({

			templateUrl : 'views/modals/easyBacklogModal.html',
			controller : 'modaleasyBacklogCtrl',
			resolve : {
				sprints : function() {
					return $scope.sprints;
				}
			}
		});

		modalInstance.result.then(function(selectedItem) {
			console.log(selectedItem);
			console.log($stateParams.projectID);
			
			$http.get('/api/getProjectByID/' + $stateParams.projectID)
			.success(function(data) {
				console.log(data);
				var o = {
						object :data.object
					};
				var sid;
				if(!o.object.sprints){
					sid='Sprint 1';		
					o.object.sprints= [{
						sprint_details :selectedItem.sprint_details,
						sprintid :sid
					}];
				}
				else{
					sid='Sprint '+(o.object.sprints.length+1);
					o.object.sprints.push({
						sprint_details :selectedItem.sprint_details,
						sprintid :sid
					});
				}
				
				
				console.log(o.object.sprints);
				
				$http.put("/api/updateProject/" + $stateParams.projectID, o).success(
						function(data) {
							console.log('Saved :' + data);
							selectedItem.sprintid=sid;
							$scope.sprints.push(selectedItem);
						});
			});
			

		}, function() {
			$log.info('Modal dismissed at: ' + new Date());

		});

	};

	$scope.deleteTheme = function(theme) {
		$http({
			method : "delete",
			url : "/api/deleteTask/" + theme.id
		}).success(function(data) {
			$scope.backlog.splice($scope.backlog.indexOf(theme), 1);
		});
	};

	$scope.deleteStory = function(story,index) {
		$scope.backlog[index].theme.splice($scope.backlog[index].theme.indexOf(story), 1);
		//$scope.backlog[i].theme.push(selectedItem);
		var o = {
				object : {
					theme : $scope.backlog[index].theme,
					name : $scope.backlog[index].name
				}
			};
			$http.put("/api/updateTask/" + $scope.backlog[index].id, o).success(
					function(data) {
						//$scope.backlog[index].theme.splice($scope.backlog.indexOf(story), 1);
					});
	};

	$scope.totalStories = [];
	$scope.openCreateStory = function(i) {
		console.log($scope.backlog[i]);
		//console.log("index:" + i +" child index :"+ ci);
		var modalInstance = $modal.open({

			templateUrl : 'views/modals/storyModal.html',
			controller : 'modalStoryCtrl',
			resolve : {
				theme : function() {
					return $scope.backlog[i];
				}
			}
		});

		modalInstance.result.then(function(selectedItem) {
//			console.log($scope.backlog[i].theme);
			if ($scope.backlog[i].theme == undefined)
				$scope.backlog[i].theme = [];
			if($scope.backlog[i].name.length>=3)
				selectedItem.code=$scope.backlog[i].name.substring(1,3);
			else
				selectedItem.code=$scope.backlog[i].name;
			$scope.backlog[i].theme.push(selectedItem);
			console.log($scope.backlog[i]);
			var o = {
				object : {
					theme : $scope.backlog[i].theme,
					name : $scope.backlog[i].name
				}
			};
			$http.put("/api/updateTask/" + $scope.backlog[i].id, o).success(
					function(data) {
						console.log('Saved :' + data);
					});

		}, function() {
			$log.info('Modal dismissed at: ' + new Date());

		});

	};

	$scope.openEditStory = function(i) {
		console.log($scope.backlog[i]);
		//console.log("index:" + i +" child index :"+ ci);
		var modalInstance = $modal.open({

			templateUrl : 'views/modals/storyModal.html',
			controller : 'modalStoryCtrl',
			resolve : {
				theme : function() {
					console.log($scope.backlog[i]);
					return $scope.backlog[i];
				}
			}
		});

		modalInstance.result.then(function(selectedItem) {
			debugger;
			console.log($scope.backlog[i].theme);
			if ($scope.backlog[i].theme == undefined)
				$scope.backlog[i].theme = [];
			
			console.log(selectedItem.code);
			$scope.backlog[i].theme.push(selectedItem);
			console.log($scope.backlog[i]);
			var o = {
				object : {
					theme : $scope.backlog[i].theme,
					name : $scope.backlog[i].name
				}
			};
			$http.put("/api/updateTask/" + $scope.backlog[i].id, o).success(
					function(data) {
						console.log('Saved :' + data);
					});

		}, function() {
			$log.info('Modal dismissed at: ' + new Date());

		});

	};

	$scope.totalThemes = [];
	$scope.openCreateTheme = function() {
		var modalInstance = $modal.open({

			templateUrl : 'views/modals/themeModal.html',
			controller : 'modalThemeCtrl',
			resolve : {
				totalThemes : function() {
					return $scope.totalThemes;
				}
			}
		});

		modalInstance.result.then(function(selectedItem) {
			console.log(selectedItem);
			var o = {
				object : {
					name : selectedItem.name,
					theme : []
				}
			};
			console.log($stateParams.projectID);
			$http.post("/api/addTask/easyBacklog/" + $stateParams.projectID, o)
					.success(function(data) {
						selectedItem.id = data._id;
						$scope.backlog.push(selectedItem);

					});
		}, function() {
			$log.info('Modal dismissed at: ' + new Date());

		});

	};
	$scope.active = 'backlog';
	$scope.switchSprint = function(sprint){
		console.log(sprint);
		$scope.active = sprint.sprintid;
	};
	
	$scope.showStats = function(){
		console.log($scope.sprints);
		var rows = [];
		angular.forEach($scope.sprints, function(v, i){
			console.log(v);
			var val = {
					c : [
					     {v : v.sprintid},
					     {v : v.sprint_details.velocity}
					     ]
			};
			rows.push(val);
		});
		$scope.active = 'stats';
		$scope.chartObject = {};
		$scope.onions = [
		                 {v: "Onions"},
		                 {v: 3},
		             ];

		             $scope.chartObject.data = {"cols": [
		                 {id: "s", label: "Sprints", type: "string"},
		                 {id: "v", label: "Velocity", type: "number"}
		             ], "rows": rows};


		             // $routeParams.chartType == BarChart or PieChart or ColumnChart...
		             $scope.chartObject.type = "ColumnChart";
		             $scope.chartObject.options = {
		                 'title': 'Velocity of all Sprints'
		             }
	};
});

cmpe.controller('modaleasyBacklogCtrl', function($scope, $modalInstance, $http) {

	$scope.createSprint = function() {
		console.log($scope.sprints);
		$modalInstance.close($scope.sprints);
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});

cmpe.controller('modalThemeCtrl', function($scope, $modalInstance) {

	$scope.createTheme = function() {
		$modalInstance.close($scope.backlog);
	};

	$scope.cancelTheme = function() {
		$modalInstance.dismiss('cancel');
	};
});

cmpe.controller('modalStoryCtrl', function($scope, $modalInstance, $http, $stateParams, theme) {
	
	$scope.sprintList=[];
	$scope.getSprints= function() {
		return $http.get('/api/getProjectByID/' + $stateParams.projectID)
		.success(function(data) {
			console.log(data);
			
			for(var i in data.object.sprints){
				console.log(data.object.sprints[i]);
				$scope.sprintList.push(data.object.sprints[i].sprintid);
			}
		});
	},

	$scope.getSprints();
	
	$scope.createStory = function() {

		console.log($scope.backlog);
		// theme.theme.push($scope.backlog);
		// console.log(theme);
		var obj = $scope.backlog.theme;
		obj.drag = true;
		obj.status = 'Accepted';
		//obj.sprint = 'Sprint 2';
		//obj.code = 'hops';
		$modalInstance.close(obj);
	};

	$scope.cancelStory = function() {
		$modalInstance.dismiss('cancel');
	};
});