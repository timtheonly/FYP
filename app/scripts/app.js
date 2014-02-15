'use strict';

angular.module('fypApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'btford.socket-io'
]).config(['$routeProvider', function($routeProvider){
	
	$routeProvider
		.when('/home',{
			templateUrl:'../partials/home.html',
			title:'Home'
		})
		.when('/sessions',{
			templateUrl: '../partials/sessions.html',
			controller:'sessionsCtrl',
			title:'Sessions'
		})
		.when('/session/:id',{
			templateUrl:'../partials/singleSession.html',
			controller:'singleSessionCrtl',
			title:'Session'
		});

}])
.controller('titleCtrl', function($scope,$route){//a controller to cahnge the page title when the route changes
	$scope.title = 'Welcome';
	$scope.$on('$routeChangeSuccess',function(){
		$scope.title = $route.current.title;
	});
});
