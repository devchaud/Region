App.controller('operationQueryCtrl',['$scope', '$rootScope', '$state', 'mainService', function($scope, $rootScope, $state, mainService){

	$scope.queryObj = JSON.parse($state.params.queryObj);
	console.log($scope.queryObj);
}]);

