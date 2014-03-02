'use strict';

angular.module('fypApp').controller('pollsCtrl',function($scope, $http, UserFactory){
	$http.get('/poll/globals').success(function(data){
		$scope.polls = data;
	});

    $scope.user = UserFactory.get();
    $scope.answers = ['','',''];
    $scope.showForm = false;

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
            .success(function(){
                $http.get('/poll/globals').success(function(data){
                    $scope.polls = data;
                });
            })
    };

    $scope.addAnswer = function(){
        $scope.answers.push('');
    };

    $scope.removeAnswer = function(){
        $scope.answers.pop();
    };
});