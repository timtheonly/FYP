'use strict';

angular.module('fypApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
]).config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/home',{
			templateUrl:'../partials/home.html',
			title:'home'
		})
		.when('/sessions',{
			templateUrl: '../partials/sessions.html',
			controller:'sessionsCtrl',
			title:'Session'
		});
}]).controller('titleCtrl', function($scope,$route){
	$scope.title = 'Welcome';
	$scope.$on('$routeChangeSuccess',function(){
		$scope.title = $route.current.title;
	});
});
