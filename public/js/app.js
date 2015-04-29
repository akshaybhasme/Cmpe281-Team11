var cmpe = angular
		.module('cmpe', [ 'ui.router', 'ui.bootstrap', 'ngDragDrop' ]);

cmpe.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/");

	$stateProvider.state('root', {
		url : '',
		controller : 'baseCtrl'
	// abstract: true
	}).state('root.login', {
		url : '/login',
		views : {
			'container@' : {
				templateUrl : 'views/partials/login.html',
				controller : 'loginCtrl'
			}
		}
	}).state('root.signup', {
		url : '/signup',
		views : {
			'container@' : {
				templateUrl : 'views/partials/signup.html',
				controller : 'signupCtrl'
			}
		}
	}).state('root.app', {
		url : '/',
		views : {
			'header@' : {
				templateUrl : 'views/partials/header.html',
				controller: 'baseCtrl'
			},
			'container@' : {
				templateUrl : 'views/partials/projects.html',
				controller : 'projectsCtrl'
			}
		}
	}).state('root.app.kanban', {
		url : 'kanban',
		views : {
			'container@' : {
				templateUrl : 'views/partials/kanban-list.html',
				controller : 'projectsCtrl'
			}
		}
	}).state('root.app.kanban.project', {
		url : '/:projectID',
		views : {
			'container@' : {
				templateUrl : 'views/partials/kanban.html',
				controller : 'kanbanCtrl'
			}
		}
	}).state('root.app.gantter', {
		url : 'gantter',
		views : {
			'container@' : {
				templateUrl : 'views/partials/kanban-list.html',
				controller : 'projectsCtrl'
			}
		}
	}).state('root.app.gantter.project', {
		url : '/:projectID',
		views : {
			'container@' : {
				templateUrl : 'views/partials/gantter.html',
				controller : 'gantterCtrl'
			}
		}
	}).state('root.app.easybacklog', {
		url : 'easybacklog',
		views : {
			'container@' : {
				templateUrl : 'views/partials/kanban-list.html',
				controller : 'projectsCtrl'
			}
		}
	}).state('root.app.easybacklog.project', {
		url : '/:projectID',
		views : {
			'container@' : {
				templateUrl : 'views/partials/easyBacklog.html',
				controller : 'easybacklogCtrl'
			}
		}
	});

});
