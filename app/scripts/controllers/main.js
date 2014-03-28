'use strict';
/*
*   outer controller to initialise the userFactory
*/
angular.module('fypApp').controller('mainCtrl',['$scope','$http','UserFactory',function($scope, $http, UserFactory){
	$http.get('/user').success(function(data){
		//set factory user here
		UserFactory.set(data);
	});
}]);