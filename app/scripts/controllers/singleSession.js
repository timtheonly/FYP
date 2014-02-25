'use strict';

angular.module('fypApp').controller('singleSessionCrtl',function($scope, $http, $routeParams, socket, UserFactory){
	$scope.elevated = UserFactory.get().elevated;
	$scope.questions =[];
    $scope.graph = 1;
    $scope.PollAnswered = false;
    /* used to resolve a scope error created by ng-repeat
     * see: https://github.com/angular/angular.js/issues/1100
     */
    $scope.response = {val:1};

	$http.get('/session/' +$routeParams.id).success(function(data){
		$scope.session = data;
		socket.emit('room', $scope.session._id); //emit that this user has joined this session
		if($scope.session.poll)
		{
			$http.get('/poll/' + $scope.session.poll+'/').success(function(data){
				$scope.poll = data;
			});
		}
	});



	socket.forward('question');

	$scope.charsRemaining= function(){
		return 140 - ($scope.questionText || '').length;
	};
	

	$scope.ask = function(){
		var question ={
			room:$scope.session._id,
			body:$scope.questionText,
			time:new Date().toTimeString().substr(0,5)
		};
		$scope.questions.unshift(question);
		socket.emit('send', question);
		$scope.questionText ='';
	};

	$scope.$on('socket:question',function(ev,data){
		$scope.questions.unshift(data);
	});

    $scope.submit = function(){
        $http({method:'PUT' , url:'/poll/'+$scope.poll._id+'/'+$scope.response.val})
            .success(function(data){
                console.log(data);
                if(data === 'response noted')
                {
                    $http.get('/poll/' + $scope.session.poll+'/').success(function(data){
                        $scope.poll = data;
                        console.log('poll refreshed');
                        $scope.PollAnswered = true;
                    });
                }
            });
    };
});