var cmpe = angular.module('cmpe', ['ui.router', 'ui.bootstrap']);

cmpe.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise("/");
	
	$stateProvider
		.state('root',{
			url: '',
			abstract: true,
			views: {
				'header': {
					templateUrl: 'views/partials/header.html',
					controller: 'headerCtrl'
				}
			}
		})
		/*
		.state('root.kanban', {
			url: '/',
			views: {
				'container@': {
					templateUrl: 'views/partials/kanban.html',
					controller: 'baseCtrl'
				}
			}
		})
		.state('root.easyBacklog', {
			url: '/easyBacklog',
			views: {
				'container@': {
					templateUrl: 'views/partials/easyBacklog.html',
					controller: 'baseCtrl'
				}
			}
		})
		*/
		.state('root.gantter', {
			url: '/',
			views: {
				'container@': {
					templateUrl: 'views/partials/gantter.html',
					controller: 'ModalDemoCtrl'
				}
			}
		});
		/*
		.state('root.base.search', {
			url: 'search/:lat/:lng/:universityName',
			templateUrl : 'views/search.html',
			controller : 'searchCtrl'
		})
		.state('root.base.apartment', {
			url: 'apartment/:placeID/:uniLat/:uniLong',
			templateUrl : 'views/apartment.html',
			controller : 'apartmentCtrl'
		})
		.state('root.base.team', {
			url: 'aboutus',
			templateUrl : 'views/team.html'
		});*/
	
});