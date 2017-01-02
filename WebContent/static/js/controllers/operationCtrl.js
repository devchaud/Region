App.controller('operationCtrl',['$scope', '$rootScope', '$state', 'mainService','$localStorage', function($scope, $rootScope, $state, mainService, $localStorage){

	$scope.operationOptions = [{
		"operation":"query"
	},{
		"operation":"invoke"
	}];
	
	$scope.operation = $scope.operationOptions[0];
	$scope.selectOperation = (opt) => {
		$scope.operation = opt;
	}
	
	$scope.operationCall = () =>{
		
		$scope.operationObj = {
								  "jsonrpc": "2.0",
								  "method": $scope.operation.operation,
								  "params": {
									  "type": 1,
									  "chaincodeID":{
										  "name":$scope.chaincodeID
									  },
									  "ctorMsg": {
										 "args":[]
									  },
									  "secureContext": $localStorage.enrollId
								  },
								  "id": ''
								}
		
		if($scope.operation.operation == 'invoke'){
				$scope.operationObj.params.ctorMsg.args.push("_regionIndexTxStr", $scope.regionName, $scope.insuredId, $scope.insured,$scope.businessArea,
								$scope.lineOfBusinessId, $scope.lineOfBusiness, $scope.policy, $scope.dealId, $scope.policy, $scope.dealNum, $scope.brokerId,
								$scope.broker, $scope.inceptionDate, $scope.expirationDate,$scope.carrier,$scope.carrierCd);
				$scope.operationObj.id = 3;			
		}else{
			$scope.operationObj.params.ctorMsg.args.push("query", $scope.policy);
				$scope.operationObj.id = 5;			
			
		}
		$scope.fullUrl = $localStorage.url + '/chaincode';
		mainService.getDetails($scope.operationObj, $scope.fullUrl).then(function(result){
			if(result.error){
				$scope.error = result.error.data;
				return false;
			}
			else if (result.result.status == 'OK'){
				if(result.id == 5){
					$state.go('operationQuery',{"queryObj":result.result.message});
				}else{
					$scope.successMsg = "Chaincode " + $scope.operation.operation + " succesfully..!";
				}
				
				}
						
		}, function(error){
			$scope.error = error;
		});
	}
	
	
}]);

