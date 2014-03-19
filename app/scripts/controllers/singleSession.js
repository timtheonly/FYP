'use strict';

angular.module('fypApp').controller('singleSessionCrtl',['$scope','$http','$routeParams','socket','UserFactory','$modal','$timeout', function($scope, $http, $routeParams, socket, UserFactory, $modal, $timeout){
	/*
	 * Scope initialization
	 */
    $scope.elevated = UserFactory.get().elevated;
	$scope.questions =[];
    $scope.graph = 1;
    $scope.PollAnswered = false;
    $scope.showQuestion = false; //to hide question after submission on live polls
    $scope.pollStatus = 'Open';
    $scope.pollLiveStatus = 'Show';
    $scope.hideSession = true;

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
                $scope.pollStatus = data.open ? 'Close' :'Open';
                $scope.pollLiveStatus = data.live ? 'Hide' : 'Show';
			});
		}
	});
    /*
     * End scope initialization
     */


    /*
     * socket stuff
     */
	socket.forward('question');//broadcast when a question is sent to the server
    socket.forward('pollUpdate');//broadcast when the session poll is modified

    $scope.$on('socket:pollUpdate',function(ev,data){
        $scope.poll = data;
    });

    $scope.$on('socket:question',function(ev,data){
        $scope.questions.unshift(data);
    });

    /*
    *  End socket stuff
    */

    /*
     * scope functions
     */

    $scope.togglePollLive = function(){
        socket.emit('poll-live',$scope.session.poll);
        $scope.poll.live = !$scope.poll.live;
        $scope.pollLiveStatus = $scope.poll.live ? 'Hide' : 'Show';
    };

    $scope.remove =function(index){
        if($scope.elevated){
            $scope.questions.splice(index,1);
        }
    };

    $scope.togglePoll = function(){
        socket.emit('poll-toggle',$scope.poll._id);
        $scope.poll.open = !$scope.poll.open;
        $scope.pollStatus = $scope.poll.open ? 'Close' : 'Open';
    };

    $scope.removePoll = function(){
        socket.emit('poll-remove',{poll:$scope.poll._id, session:$scope.session._id});
        $scope.session.poll = undefined;
    };

    $scope.setPassword = function(){
        $http({method:'PUT' , url:'/session/'+$scope.session._id+'/setpassword/'+$scope.sessionPassword})
            .success(function(data){
                   if(data === 'password set')
                   {
                       $scope.session.password = $scope.sessionPassword;
                       $scope.sessionPassword = '';
                   }
            });
    };

    $scope.removePassword = function(){
        $http({method:'PUT' , url:'/session/'+$scope.session._id+'/removepassword'})
            .success(function(data){
                if(data === 'password removed')
                {
                    $scope.session.password = undefined;
                    $scope.sessionPassword = '';
                }
            });
    };

    $scope.checkPassword = function(){
      if($scope.showSessionPassword === $scope.session.password){
          $scope.hideSession = false;
      };
    };

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



    $scope.submit = function(){
        $http({method:'PUT' , url:'/poll/'+$scope.poll._id+'/'+$scope.response.val})
            .success(function(data){
                if(data === 'response noted')
                {
                    $http.get('/poll/' + $scope.session.poll+'/').success(function(data){
                        $scope.poll = data;
                        $scope.PollAnswered = true;
                    });
                    if($scope.poll.live === false)
                    {
                        $scope.showQuestion = true;
                    }
                }
            });
    };

    //set up timer to check for poll responses if the poll is live every thirty seconds
    $scope.timer = function(){
        $timeout(function(){
            if($scope.poll)
            {
                if($scope.poll.live)
                {
                    $http.get('/poll/' + $scope.session.poll+'/').success(function(data){
                        $scope.poll = data;
                    });
                }
            }
            $scope.timer();
        }, 10000);
    };

    //call timer once to start it
    $scope.timer();

    $scope.openModal = function(){
        var modalInstance = $modal.open({
            templateUrl: 'partials/attachPollModal.html',
            controller: 'attachPollModal',
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

    /*
     * End Scope functions
     */
}]).controller('attachPollModal',['$scope','$http','$modalInstance','sessionID','UserID','socket',function($scope, $http, $modalInstance, sessionID, UserID, socket){
        $scope.answers =['','',''];
        $scope.input = {};

        $scope.addAnswer=function(){
            $scope.answers.push('');
        };

        $scope.removeAnswer = function(){
            $scope.answers.pop();
        };

        $scope.attach = function(){
            var postAnswers = [];
            for(var i =0; i< $scope.answers.length;i++){
                postAnswers.push({answer:$scope.answers[i], response:0});//wrap answers in a format accepted on the server
            }

            $http.post('/poll',{
                question: $scope.input.pollQ,
                creator: UserID,
                open: true,
                answers: postAnswers
            })
                .success(function(pollData){
                    pollData =pollData.replace(/["]+/g, '');//need to remove double quotes
                    $http.put('/session/'+sessionID+'/poll/'+pollData)
                        .success(function(){
                            socket.emit('new-poll',pollData)
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
}]);