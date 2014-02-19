'use strict';

angular.module('fypApp').controller('singleSessionCrtl',function($scope, $http, $routeParams, socket, UserFactory){
	$scope.elevated = UserFactory.get().elevated;
	$scope.questions =[];

	$http.get('/session/' +$routeParams.id).success(function(data){
		$scope.session = data;
		console.log($scope.session);
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
		$scope.questions.push(question);
		socket.emit('send', question);
		$scope.questionText ='';
	};

	$scope.$on('socket:question',function(ev,data){
		$scope.questions.push(data);
	});
});