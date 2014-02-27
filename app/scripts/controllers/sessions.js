'use strict';

angular.module('fypApp').controller('sessionsCtrl',function($scope, $http, UserFactory, $modal){
    $scope.elevated = UserFactory.get().elevated;
    $scope.showForm = false;
    /* Based on example from:
     * http://mrngoitall.net/blog/2013/10/02/adding-form-fields-dynamically-in-angularjs/
     */
    $scope.tags = ['','',''];

    $scope.addTag = function(){
        $scope.tags.push('');
    };

    $scope.ok = function(){
        console.log($scope.tags);
    }

	$http.get('/session').success(function(data){
		$scope.sessions = data;
	});
});