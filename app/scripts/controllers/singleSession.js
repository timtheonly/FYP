'use strict';

angular.module('fypApp').controller('singleSessionCrtl',function($scope, $http, $routeParams, socket, UserFactory, $modal, $timeout){
	$scope.elevated = UserFactory.get().elevated;
	$scope.questions =[];
    $scope.graph = 1;
    $scope.PollAnswered = false;
    $scope.live = true;
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
                        $scope.PollAnswered = true;
                    });
                }
            });
    };

    $scope.openModal = function(){
        var modalInstance = $modal.open({
            templateUrl: 'partials/attachPollModal.html',
            controller: attachPollModal,
            keyboard: false,
            resolve:{
                sessionID:function(){
                    return $scope.session._id;
                },
                UserID:function(){
                    return UserFactory.get()._id;
                }
            }
        });

        modalInstance.result.then(function(message){
            if(message === 'success'){//if the poll was created successfully update session data
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
            }
        });
    };

    $scope.timer = function(){
       $timeout(function(){
            if($scope.live)
            {
                $http.get('/poll/' + $scope.session.poll+'/').success(function(data){
                    $scope.poll = data;
                });

            }else{
                $scope.timer();
            }
       }, 30000);
    };

    $scope.timer();
});

var attachPollModal =  function($scope, $http, $modalInstance, sessionID, UserID){
        $scope.answers =['','',''];
        $scope.input = {};

        console.log(sessionID);
        console.log(UserID)

        $scope.addAnswer=function(){
            $scope.answers.push('');
        };

        $scope.removeAnswer = function(){
            $scope.answers.pop();
        };

        $scope.attach = function(){
            var postAnswers = [];
            console.log($scope.question);
            for(var i =0; i< $scope.answers.length;i++){
                postAnswers.push({answer:$scope.answers[i], response:0});//wrap answers in a format accepted on the server
            }

            $http.post('/poll',{
                question: $scope.input.pollQ,
                creator: UserID,
                open: true,
                answers: postAnswers
            })
                .success(function(data){
                    data =data.replace(/["]+/g, '');//need to remove double quotes
                    $http.put('/session/'+sessionID+'/poll/'+data)
                        .success(function(){
                            $modalInstance.close('success');
                        })
                        .error(function(){
                            $modalInstance.close('error');
                        });
                });
        };

        $scope.cancel = function(){
            $modalInstance.close('canceled');
        };
}