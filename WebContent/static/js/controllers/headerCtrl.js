App.controller('headerCtrl',function($scope,  $rootScope, $state){
	
	
	$rootScope.logout = function() {
		$state.go("login");
	};
	
	
});