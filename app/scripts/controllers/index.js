'use strict';

angular.module('fypApp').controller('loginCtrl',['$scope', '$http', '$modal', '$window','userService', function($scope, $http, $modal, $window, userService){
	$scope.hasMessage = false;
	$scope.login = function(){
		$http.post('/users/login', {username: $scope.username, password: $scope.password})
		.success(function(data){
			if(typeof data === 'string')
			{
				$scope.message = data;
				$scope.hasMessage = true;
				$scope.password ='';
			}else{
				userService.setUser(data);
				$window.location.href = '/app#/home';
			}
		});
	};


	$scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'partials/signUpModal.html',
      controller: 'ModalCtrl',
      keyboard: false,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
	};
}]).controller('ModalCtrl', ['$scope', '$http', '$modalInstance', function($scope, $http, $modalInstance){
	$scope.input ={};
	$scope.ok = function(){
		console.log($scope);
		$http.post('/users',$scope.input)
			.success(function(data,status,headers,config){
				if(data === 'ok'){
					$scope.createdAccount = true;
					setTimeout(function(){
						$modalInstance.close();
					}, 3000);

				}else if(data ==='user exsits'){
					$scope.usernameExists = true;
				}else{
					$scope.errorHappened = true;
				}
			})
			.error(function(){
				$scope.errorHappened = true;
			});
		
	};

	$scope.cancel = function(){
		$modalInstance.close('canceled');
	};
}]);