'use strict';

angular.module('fypApp').controller('pollsCtrl',function($scope, $http){
	$http.get('/poll/globals').success(function(data){
		$scope.polls = data;
	});
});