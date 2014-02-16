'use strict';

angular.module('fypApp').controller('mainCtrl',function($scope, $http, UserFactory){
	$http.get('/users').success(function(data){
		//set factory user here
		UserFactory.set(data);
	});
});