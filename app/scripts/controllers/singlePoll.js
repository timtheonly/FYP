'use strict';

angular.module('fypApp').controller('singlePollCrtl',function($scope, $http, $routeParams, UserFactory){
	$scope.elevated = UserFactory.get().elevated;
    $scope.graph = 1;

	$http.get('/poll/' + $routeParams.id+'/').success(function(data){
		$scope.poll = data;
	});

});