'use strict';

angular.module('fypApp').controller('sessionsCtrl',function($scope, $http, UserFactory, $window){
    $scope.elevated = UserFactory.get().elevated;
    $scope.showForm = false;
    $scope.tags = ['','',''];

    $scope.removeTag = function(){
        $scope.tags.pop();
    };

    $scope.addTag = function(){
        $scope.tags.push('');
    };

    $scope.ok = function(){
        $http.post('/session',{

            name:$scope.name,
            creator:UserFactory.get()._id,
            tags:$scope.tags,
            open:true,
            poll: null

        }).success(function(data){
             var loc = '/app#/session/'+data;
             loc =loc.replace(/["]+/g, '');//need to remove double quotes
             $window.location.href = loc;
        });
    }

	$http.get('/session').success(function(data){
		$scope.sessions = data;
	});
});