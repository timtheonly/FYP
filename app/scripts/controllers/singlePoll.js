'use strict';

angular.module('fypApp').controller('singlePollCrtl',['$scope','$http','$routeParams', 'UserFactory', function($scope, $http, $routeParams, UserFactory){
    /*
     * Scope initialization
     */
    $scope.elevated = UserFactory.get().elevated;
    $scope.graph = 1;
    $scope.PollAnswered = false;
    /* used to resolve a scope error created by ng-repeat
     * see: https://github.com/angular/angular.js/issues/1100
     */
    $scope.response = {val:1};
    /*
     * End scope initialization
     */

    /*
     * scope functions
     */
    $scope.submit = function(){
        $http({method:'PUT' , url:'/poll/'+$scope.poll._id+'/'+$scope.response.val})
            .success(function(data){
                console.log(data);
                if(data === 'response noted')
                {
                    $scope.PollAnswered = true;
                }
            });
    };

	$http.get('/poll/' + $routeParams.id+'/').success(function(data){
		$scope.poll = data;
	});
    /*
     * End Scope functions
     */
}]);