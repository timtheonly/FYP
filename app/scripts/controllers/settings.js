'use strict';

angular.module('fypApp').controller('settingsCtrl',function($scope, $http, UserFactory){
    $scope.user = UserFactory.get();

    $scope.refresh  = function(){
        $http.get('/users')
            .success(function(data){
                $scope.users = data;
            });
    };

    $scope.elevate = function(id){
        $http.put('/users/elevate/'+id)
            .success(function(data){
               $scope.refresh();
            });
    }

    $scope.refresh();
});
