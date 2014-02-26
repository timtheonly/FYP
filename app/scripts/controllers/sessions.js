'use strict';

angular.module('fypApp').controller('sessionsCtrl',function($scope, $http, UserFactory, $modal){
    $scope.elevated = UserFactory.get().elevated;
    $scope.showForm = false;
    /* Based on example from:
     * http://mrngoitall.net/blog/2013/10/02/adding-form-fields-dynamically-in-angularjs/
     */
    $scope.tags = [{id:'tag1', name:''},{id:'tag2', name:''},{id:'tag3', name:''}];

    $scope.addTag = function(){
        var numtags = $scope.tags.length +1;
        $scope.tags.push({id:'tag'+ numtags, name:''});
    };

    $scope.showAddButton = function(tag){
        return $scope.tags[$scope.tags.length -1].id === tag;
    };

    $scope.ok = function(){
        console.log($scope.tags);
    }

	$http.get('/session').success(function(data){
		$scope.sessions = data;
	});
});