'use strict';

angular.module('fypApp').controller('sessionsCtrl',function($scope, $http, UserFactory){
    $scope.elevated = UserFactory.get().elevated;
    $scope.showForm = false;
    /* Based on example from:
     * http://mrngoitall.net/blog/2013/10/02/adding-form-fields-dynamically-in-angularjs/
     */
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
            $http.get('/session').success(function(data){
                $scope.sessions = data;
            });
            $scope.showForm = false;
        });
    }

	$http.get('/session').success(function(data){
		$scope.sessions = data;
	});
});