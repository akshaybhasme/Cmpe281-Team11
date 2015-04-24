cmpe.controller('easybacklogCtrl', function($scope, $stateParams, $log, $modal, $timeout,
		$rootScope, $http) {

	$scope.theme1 = [ {
		theme : 'Home page',
		code : 'HOP',
		id : 'HOP5',
		userstoryln1 : 'user',
		userstoryln2 : 'view a set of simple screen shots',
		userstoryln3 : 'understand how the products work',
		criteria : ['Lightbox appears with ability to browse through gallery of screen shots'],
		comments : 'Assumed use of JQuery Lightbox',
		points : 3,
		cost: 800,
		days: '1.0',
		status: 'Completed',
		sprint: 'sprint 5',
		drag : true
	},
	{
		theme : 'Home page',
		code : 'HOP',
		id : 'HOP2',
		userstoryln1 : 'admin',
		userstoryln2 : 'track users who arrive on the home page via a campaign URL',
		userstoryln3 : 'measure the effectiveness of my campaigns',
		criteria : ['Support for tracking code in the format ?campaign=[code]','Tracking code and number of visits to be stored in the database'],
		comments : '',
		points : 3,
		cost: 800,
		days: '1.0',
		status: 'Accepted',
		sprint: 'sprint 1',
		drag : true
	}
	];
	$scope.theme2 = [ {
		theme : 'Authentication',
		code : 'AUT',
		id : 'AUT1',
		userstoryln1 : 'user',
		userstoryln2 : 'login to the website',
		userstoryln3 : 'access my account and use the support features',
		criteria : ['Email address and password is required','Login is visible in the top header of the website and is available after rolling over the login button','Error messages must be shown if the email address and password combination is incorrect'],
		comments : 'No longer need to adhere to security requirements of lock out',
		points : 5,
		cost: 1333,
		days: '1.7',
		status: 'Accepted',
		sprint: 'sprint 2',
		drag : true
	},
	{
		theme : 'Authentication',
		code : 'AUT',
		id : 'AUT2',
		userstoryln1 : 'user',
		userstoryln2 : 'register on the website',
		userstoryln3 : 'access the secure areas',
		criteria : ['First name, last name, email address and password are all required fields','Additional fields include company and phone number','Email address must be unique','Password must pass strong password requirements','New registrations will send an email to validate the email address is valid'],		
		comments : 'Please refer to security document A1 for details on the existing strong password requirements',
		points : 8,
		cost: 2133,
		days: '2.7',
		status: 'Accepted',
		sprint: 'sprint 4',
		drag : true
	}
	];

	$scope.title = "easyBacklog Project";

});
cmpe.controller('modaleasyBacklogCtrl', function($scope, $modalInstance) {

	$scope.ok = function() {
		// console.log($scope.task);
		$scope.story.drag=true;
		$modalInstance.close($scope.story);

	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});