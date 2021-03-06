'use strict';

angular.module('fypApp').controller('pollsCtrl',['$scope','$http','UserFactory',function($scope, $http, UserFactory){
    /*
     * Scope initialization
     */

    $scope.user = UserFactory.get();
    $scope.answers = ['','',''];
    $scope.showForm = false;

    /*
     * End scope initialization
     */

    /*
     * scope functions
     */
    $scope.ok = function(){
        var postAnswers = [];

        for(var i =0; i< $scope.answers.length;i++){
            postAnswers.push({answer:$scope.answers[i], response:0});//wrap answers in a format accepted on the server
        }

        $http.post('/poll',{
            question: $scope.question,
            creator: $scope.user._id,
            open: true,
            answers: postAnswers
        })
            .success($scope.refresh);

        $scope.answers = ['','',''];
        $scope.question = '';
    };

    $scope.remove = function(id){
        $http.delete('/poll/'+id)
            .success($scope.refresh)
    };

    $scope.addAnswer = function(){
        $scope.answers.push('');
    };

    $scope.removeAnswer = function(){
        $scope.answers.pop();
    };

    $scope.refresh = function(){
        $http.get('/poll/globals').success(function(data){
            $scope.polls = data;
        });
    };
    $scope.refresh();
    /*
     * End scope functions
     */
}]);