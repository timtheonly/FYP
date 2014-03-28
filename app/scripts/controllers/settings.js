'use strict';

angular.module('fypApp').controller('settingsCtrl',['$scope','$http','UserFactory',function($scope, $http, UserFactory){
    /*
     * Scope initialization
     */
    $scope.user = UserFactory.get();
    $scope.hasMessage = false;
    $scope.success = false;
    /*
     * End scope initialization
     */


    /*
     * scope functions
     */
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
    };

    $scope.changePw = function(){
       if($scope.newPw === $scope.confNewPw)
       {
           $http.put('/users/password',{
               username: $scope.user.username,
               password: $scope.password,
               newPassword:$scope.newPw
           })
               .success(function(data){
                   if(data != 'ok')
                   {
                       $scope.message = data;
                       $scope.hasMessage = true;
                   }else{
                       $scope.success = true;
                   }
               });
       }else{
           $scope.message ='Passwords don\'t match';
           $scope.hasMessage = true;
       }
       $scope.password ='';
       $scope.confNewPw ='';
       $scope.newPw = '';
    };

    $scope.refresh();
    /*
     * End Scope functions
     */
}]);
