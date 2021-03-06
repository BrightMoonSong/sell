function FundsController($scope, $q, FundsService, $timeout, constPageSize, ngDialog, goodsReminder) {
	$scope.WdatePicker = {}; //日期
	$scope.scopeList = [{
			"id": 2,
			"name": "车主"
		},
		{
			"id": 3,
			"name": "货主"
		}

	];
	$scope.scopeObj = 2;
	$scope.contractTypeList = [{
			"id": 1,
			"name": "未签约"
		},
		{
			"id": 2,
			"name": "签约"
		}

	];
	$scope.settlementStatus = [{
			"id": 1,
			"name": "待结算"
		},
		{
			"id": 2,
			"name": "结算成功"
		},
		{
			"id": 3,
			"name": "结算失败"
		}

	];
	$scope.isOwnList = [{
			"id": 1,
			"name": "自有车辆"
		},
		{
			"id": 2,
			"name": "非自有车辆"
		}

	];

	//列表
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		if($scope.scopeObj) {
			var scopeId = $scope.scopeObj;
		}
		if($scope.contractTypeObj) {
			var contractTypeId = $scope.contractTypeObj;
		}
		if($scope.settlementStatusObj) {
			var settlementStatusId = $scope.settlementStatusObj;
		}
		if($scope.isOwnObj) {
			var isOwnId = $scope.isOwnObj;
		}
		var userId = $scope.userId;
		$scope.startTimeStr = $scope.WdatePicker.startTimes;
		$scope.endTimeStr = $scope.WdatePicker.endTimes;
		FundsService
			.find(scopeId, userId, contractTypeId, settlementStatusId, isOwnId, $scope.startTimeStr, $scope.endTimeStr, currentPageNo, currentPaseSize)
			.then(function(result) {
				$scope.fundsList = result.data;
			}, function(result) {
				defer.reject(result)
			})
		return defer.promise;
	}

	//搜索
	$scope.searc = function() {
		$scope.userId = "";
		FundsService
			.seach($scope.scopeObj, $scope.phone)
			.then(function(result) {
				$scope.sechList = result.data;
			}, function(result) {

			})
	}
	$scope.searc();
}

angular
	.module("managerApp")
	.controller("FundsController", FundsController)