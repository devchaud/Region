App.controller('loginCtrl',['$scope', '$rootScope', '$state', 'mainService', '$localStorage', function($scope, $rootScope, $state, mainService, $localStorage){

	$scope.login = function( ){
		$scope.error = "";
		$scope.url = 'http://'+ $scope.ipAddress + ':' + $scope.port;
		$scope.fullUrl = $scope.url + '/registrar';
		$localStorage.url = $scope.url;
		$localStorage.enrollId = $scope.userid;
		$scope.loginDetails = {
			  "enrollId": $scope.userid,
			  "enrollSecret": $scope.pwd
			  
			  };
		mainService.getDetails($scope.loginDetails, $scope.fullUrl).then(function(result){
			if(result.Failure){
				$scope.error = result;
				return false;
			}
			else if (result.OK){
				$state.go('operation');
				}
						
		}, function(error){
			$scope.error = error;
		});
	};
}]);

