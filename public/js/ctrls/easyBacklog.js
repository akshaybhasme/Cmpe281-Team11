cmpe
		.controller(
				'easybacklogCtrl',
				function($scope, $stateParams, $log, $modal, $timeout,
						$rootScope, $http) {

					$scope.sprints = [ {
						sprintid : 'Sprint 1',
						sprint_details : [ {
							start_date : '03/13/2015',
							duration : 30,
							velocity : 15
						} ]
					}, {
						sprintid : 'Sprint 2',
						sprint_details : [ {
							start_date : '01/13/2015',
							duration : 20,
							velocity : 24
						} ]
					}, {
						sprintid : 'Sprint 3',
						sprint_details : [ {
							start_date : '03/25/2015',
							duration : 50,
							velocity : 20
						} ]
					} ];
					$scope.backlog = [
							{
								name : 'Home page',
								theme : [
										{
											code : 'HOP',
											id : 'HOP5',
											userstoryln1 : 'user',
											userstoryln2 : 'view a set of simple screen shots',
											userstoryln3 : 'understand how the products work',
											criteria : [ 'Lightbox appears with ability to browse through gallery of screen shots' ],
											comments : 'Assumed use of JQuery Lightbox',
											points : 3,
											cost : 800,
											days : '1.0',
											status : 'Completed',
											sprint : 'Sprint 3',
											drag : true
										},
										{
											code : 'HOP',
											id : 'HOP2',
											userstoryln1 : 'admin',
											userstoryln2 : 'track users who arrive on the home page via a campaign URL',
											userstoryln3 : 'measure the effectiveness of my campaigns',
											criteria : [
													'Support for tracking code in the format ?campaign=[code]',
													'Tracking code and number of visits to be stored in the database' ],
											comments : '',
											points : 3,
											cost : 800,
											days : '1.0',
											status : 'Accepted',
											sprint : 'Sprint 1',
											drag : true
										} ]
							},
							{
								name : 'Authentication',
								theme : [
										{
											code : 'AUT',
											id : 'AUT1',
											userstoryln1 : 'user',
											userstoryln2 : 'login to the website',
											userstoryln3 : 'access my account and use the support features',
											criteria : [
													'Email address and password is required',
													'Login is visible in the top header of the website and is available after rolling over the login button',
													'Error messages must be shown if the email address and password combination is incorrect' ],
											comments : 'No longer need to adhere to security requirements of lock out',
											points : 5,
											cost : 1333,
											days : '1.7',
											status : 'Accepted',
											sprint : 'Sprint 2',
											drag : true
										},
										{
											code : 'AUT',
											id : 'AUT2',
											userstoryln1 : 'user',
											userstoryln2 : 'register on the website',
											userstoryln3 : 'access the secure areas',
											criteria : [
													'First name, last name, email address and password are all required fields',
													'Additional fields include company and phone number',
													'Email address must be unique',
													'Password must pass strong password requirements',
													'New registrations will send an email to validate the email address is valid' ],
											comments : 'Please refer to security document A1 for details on the existing strong password requirements',
											points : 8,
											cost : 2133,
											days : '2.7',
											status : 'Accepted',
											sprint : 'Sprint 3',
											drag : true
										} ]
							} ];

					$scope.title = "easyBacklog Project";

					$scope.items = [];
					$scope.open = function() {
						var modalInstance = $modal.open({

							templateUrl : 'views/modals/easyBacklogModal.html',
							controller : 'modaleasyBacklogCtrl',
							resolve : {
								items : function() {
									return $scope.items;
								}
							}
						});

						modalInstance.result.then(function(selectedItem) {
							$scope.sprint.push(selectedItem);

						}, function() {
							$log.info('Modal dismissed at: ' + new Date());

						});

					};
					$scope.deleteTheme = function(theme) {
						$scope.backlog.splice($scope.backlog.indexOf(theme), 1);
						/*
						 * $http({ method: "post", url:
						 * "api/listings/delete/"+listing._id
						 * }).success(function(data){ $scope.getListing(); });
						 */
					};

					$scope.deleteStory = function(story) {
						$scope.backlog.theme.splice($scope.backlog.theme
								.indexOf(theme), 1);
						/*
						 * $http({ method: "post", url:
						 * "api/listings/delete/"+listing._id
						 * }).success(function(data){ $scope.getListing(); });
						 */
					};

					$scope.totalStories = [];
					$scope.openCreateStory = function(i) {
						var modalInstance = $modal.open({

							templateUrl : 'views/modals/storyModal.html',
							controller : 'modalStoryCtrl',
							resolve : {
								theme: function(){
									return $scope.backlog[i];
								}
							}
						});

						modalInstance.result.then(function(selectedItem) {
							$scope.backlog[i].theme.push(selectedItem);
							console.log($scope.backlog[i]);
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
							var object = {
								name : selectedItem.name,
								theme : []
							}
							$scope.backlog.push(object);

						}, function() {
							$log.info('Modal dismissed at: ' + new Date());

						});

					};

				});

cmpe.controller('modaleasyBacklogCtrl', function($scope, $modalInstance) {

	$scope.createSprint = function() {

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

cmpe.controller('modalStoryCtrl', function($scope, $modalInstance, theme) {

	$scope.createStory = function() {

			console.log($scope.backlog);
//			theme.theme.push($scope.backlog);
//			console.log(theme);
			var obj=$scope.backlog.theme;
			obj.code=1;
			obj.status="accepted";
			obj.drag=true;
			console.log(obj.status);
			$modalInstance.close(obj);
	};

	$scope.cancelStory = function() {
		$modalInstance.dismiss('cancel');
	};
});