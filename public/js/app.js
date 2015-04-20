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
				templateUrl: 'views/base.html',
				controller: 'baseCtrl'
			}
		}
	})
	.state('root.app', {
		url: '/',
		views: {
			'header': {
				templateUrl: 'views/header.html',
				controller: 'headerCtrl'
			},
			'container@': {
				templateUrl: 'views/container.html',
//				controller: 'baseCtrl'
			}
		}
	})
	.state('root.app.kanban', {
		url : 'kanban',
		templateUrl : 'views/kanban.html',
		controller : 'kanbanCtrl'
	})
	.state('root.app.gantter', {
		url : 'gantter',
		templateUrl : 'views/gantter.html',
		controller : 'gantterCtrl'
	})
	.state('root.app.easybacklog', {
		url : 'easybacklog',
		templateUrl : 'views/easybacklog.html',
		controller : 'easybacklogCtrl'
	});
	
});