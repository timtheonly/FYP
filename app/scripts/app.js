'use strict';

angular.module('fypApp', [
  'ngRoute',
  'ui.bootstrap',
  'btford.socket-io'
]).config(['$routeProvider', function($routeProvider){
	
	$routeProvider
		.when('/home',{
			templateUrl:'../partials/home.html',
			title:'Home'
		})
        .when('/settings',{
            templateUrl: '../partials/settings.html',
            controller:'settingsCtrl',
            title:'Settings'
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
		})
		.when('/polls',{
			templateUrl: '../partials/polls.html',
			controller:'pollsCtrl',
			title:'Polls'
		})
		.when('/poll/:id',{
			templateUrl:'../partials/singlePoll.html',
			controller:'singlePollCrtl',
			title:'Poll'
		});

}]).factory('UserFactory',function(){
	var user ={};
	return{
		get: function(){
			return user;
		},

		set: function(value){
			angular.copy(value,user);
		}
	};
})
.controller('titleCtrl', function($scope,$route){//a controller to cahnge the page title when the route changes
	$scope.title = 'Welcome';
	$scope.$on('$routeChangeSuccess',function(){
		$scope.title = $route.current.title;
	});
});
