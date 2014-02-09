'use strict';

angular.module('fypApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
]).config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/home',{templateUrl:'../partials/home.html'})
		.when('/sessions',{
			templateUrl: '../partials/sessions.html',
			controller:'sessionsCtrl'
		});
}]);
