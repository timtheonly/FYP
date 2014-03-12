'use strict';

angular.module('fypApp').controller('sessionsCtrl',[ '$scope','$http','UserFactory','$window',function($scope, $http, UserFactory, $window){
    $scope.user = UserFactory.get();
    $scope.showForm = false;
    $scope.tags = ['','',''];

    $scope.removeTag = function(){
        $scope.tags.pop();
    };

    $scope.addTag = function(){
        $scope.tags.push('');
    };

    $scope.remove = function(id){
        $http.delete('/session/'+id)
            .success($scope.refresh);
    };

    $scope.ok = function(){
        $http.post('/session',{

            name:$scope.name,
            creator:$scope.user._id,
            tags:$scope.tags,
            open:true,
            poll: null

        }).success(function(data){
             var loc = '/app#/session/'+data;
             loc =loc.replace(/["]+/g, '');//need to remove double quotes
             $window.location.href = loc;
        });
    }

    $scope.refresh = function(){
        $http.get('/session').success(function(data){
            $scope.sessions = data;
        });
    };


    $scope.refresh();
}]);