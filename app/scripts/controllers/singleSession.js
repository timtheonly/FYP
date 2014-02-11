'use strict';

angular.module('fypApp').controller('singleSessionCrtl',function($scope, $http, $routeParams){
	$http.get('/session/' +$routeParams.id).success(function(data){
		$scope.session = data;
	});
});