'use strict';

angular.module('fypApp').controller('singleSessionCrtl',function($scope, $http, $routeParams, socket){
	$scope.questions =[];

	$http.get('/session/' +$routeParams.id).success(function(data){
		$scope.session = data;
	});

	socket.forward('question');
	socket.emit('room', $scope.session._id);

	$scope.ask = function(){
		var question ={
			room:$scope.session._id,
			body:$scope.questionText
		};
		$scope.questions.push(question);
		socket.emit('send', question);
		$scope.questionText ='';
	};
});