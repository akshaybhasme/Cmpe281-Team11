var cmpe = angular.module('cmpe', ['ui.router', 'ui.bootstrap']);

cmpe.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise("/");
	
	$stateProvider
	.state('root',{
		url: '',
		abstract: true,
	})
	.state('root.login', {
		url: '/login',
		views: {
			'container@': {
				templateUrl: 'views/partials/login.html',
				controller: 'baseCtrl'
			}
		}
	})
	.state('root.app', {
		url: '/',
		views: {
			'header@': {
				templateUrl: 'views/partials/header.html',
				//controller: 'kanbanCtrl'
			},
			'container@': {
				templateUrl: 'views/partials/projects.html',
				//controller: 'projectsCtrl'
			}
		}
	})
	.state('root.app.kanban', {
		url : 'kanban',
		views: {
			'container@': {
			templateUrl : 'views/partials/kanban.html',
			controller: 'kanbanCtrl'
			}
		}
	})
	.state('root.app.gantter', {
		url : 'gantter',
		views: {
			'container@': {
			templateUrl : 'views/partials/gantter.html',
			controller: 'ModalDemoCtrl'
			}
		}
	})
	.state('root.app.easybacklog', {
		url : 'easybacklog',
		views: {
			'container@': {
			templateUrl : 'views/partials/easybacklog.html',
			controller: 'easybacklogCtrl'
			}
		}
	});
	
});