'use strict';

angular.module('fypApp').controller('sessionsCtrl',function($scope, $http){
	$http.get('/session').success(function(data, ev){
		$scope.sessions = data;
	});
});