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
				templateUrl: 'views/partials/base.html',
				controller: 'baseCtrl'
			}
		}
	})
	.state('root.app', {
		url: '/',
		views: {
			'header': {
				templateUrl: 'views/partials/header.html',
				controller: 'headerCtrl'
			},
			'container@': {
				templateUrl: 'views/partials/container.html',
//				controller: 'baseCtrl'
			}
		}
	})
	.state('root.app.kanban', {
		url : 'kanban',
		templateUrl : 'views/partials/kanban.html',
		controller : 'kanbanCtrl'
	})
	.state('root.app.gantter', {
		url : 'gantter',
		templateUrl : 'views/partials/gantter.html',
		controller : 'gantterCtrl'
	})
	.state('root.app.easybacklog', {
		url : 'easybacklog',
		templateUrl : 'views/partials/easybacklog.html',
		controller : 'easybacklogCtrl'
	});
	
});