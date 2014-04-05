'use strict';

angular.module('fypApp').controller('loginCtrl',['$scope', '$http', '$modal', '$window',function($scope, $http, $modal, $window){
     /*
     * Scope initialization
     */
    $scope.hasMessage = false;

    /*
     * End scope initialization
     */

    /*
     * scope functions
     */
	$scope.login = function(){
		$http.post('/users/login', {username: $scope.username, password: $scope.password})
		.success(function(data){
			if(data !== 'ok')
			{
				$scope.message = data;
				$scope.hasMessage = true;
				$scope.password ='';
			}else{
				$window.location.href = '/app#/home';
			}
		});
	};


	$scope.open = function () {

        var modalInstance = $modal.open({
             templateUrl: 'partials/signUpModal.html',
             controller: 'ModalCtrl',
             keyboard: false
        });
	};
    /*
     * End Scope functions
     */
}]).controller('ModalCtrl', ['$scope', '$http', '$modalInstance', function($scope, $http, $modalInstance){
    /*
     * Scope initialization
     */

   	$scope.input ={};

    /*
     * End scope initialization
     */

    /*
     * scope functions
     */
	$scope.ok = function(){
        $http.post('/users',$scope.input)
            .success(function(data){
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

    /*
     * End Scope functions
     */
}]);
