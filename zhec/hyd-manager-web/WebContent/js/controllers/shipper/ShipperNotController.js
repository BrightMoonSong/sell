function ShipperNotController($scope, $q, $http, $rootScope, ShipperNotService, constPageSize, ngDialog, goodsReminder) {
	$scope.WdatePicker = {}; //日期
	//审核未通过列表
	$scope.find = function(currentPageNo, currentPaseSize) {

		var defer = $q.defer();
		var realName = $scope.realName;
		var phone = $scope.phone;
		$scope.startTime = $scope.WdatePicker.startTimes;
		ShipperNotService
			.find(realName, phone, $scope.startTime, currentPageNo, currentPaseSize)
			.then(function(result) {
				$scope.shipperList = result.data;
				defer.resolve(result);
			}, function(result) {
				defer.reject(result)
			})
		return defer.promise;
	}
	//弹出详情菜单弹窗
	$scope.openModal = function(id) {
		$scope.shipperId = id;
		$scope.dialog = ngDialog.open({
			template: 'views/shipper/ShipperDetailFormModel.html',
			className: 'ngdialog-theme-default',
			controller: 'ShipperDetailFormModelController',
			scope: $scope,
			width: 1150
		})
	};
	//启禁用操作
	$scope.enableId = function(id, status) {
		var chainstouses;
		if(status == 1) {
			//0禁1启
			chainstouses = goodsReminder.goodsState.enable;
		} else if(status == 2) {
			chainstouses = goodsReminder.goodsState.forbidden;
		} else if(status == 3) {
			chainstouses = goodsReminder.goodsbranddelete;
		}
		ngDialog.openConfirm({
			template: '<p>' + chainstouses + '</p>' +
				'<div class="ngdialog-buttons">' +
				'<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消' +
				'<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定' +
				'</button></div>',
			plain: true,
			closeByDocument: false,
			closeByEscape: false,
			className: 'ngdialog-theme-default'
		}).then(function(value) {
			ShipperNotService
				.enable(id, status)
				.then(function(result) {
					$scope.loadData()
				}),
				function(reason) {}
		})
	}
	//关闭详情弹窗
	$scope.cancelModal = function() {
		$scope.dialog.close();
	}

}
//弹窗详情操作
function ShipperDetailFormModelController($scope,$q,ShipperNotService) {
	$scope.companyNatures = function(n) {
		switch(n) {
			case 1:
				return '国有';
				break;
			case 2:
				return '集体';
				break;
			case 3:
				return '有限责任';
				break;
			case 4:
				return '股份有限';
				break;
			case 5:
				return '中外合资';
				break;
			case 6:
				return '外商投资';
				break;
		}
	}
	$scope.checkStatus = function(j) {
		switch(j) {
			case 1:
				return '注册未提交审核';
				break;
			case 2:
				return '提交审核（待审核）';
				break;
			case 3:
				return '审核通过';
				break;
			case 4:
				return '审核不通过';
				break;
		}
	}

	$scope.innter = function() {
		if($scope.shipperId) {
			ShipperNotService
				.detail($scope.shipperId)
				.then(function(result) {
					$scope.shipperEntiy = result.data;
					$scope.dataArry = [1, 2, 3, 8];
				}, function(reason) {

				})
		}
	}
	$scope.search = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		ShipperNotService
			.seach($scope.shipperId, currentPageNo, currentPaseSize)
			.then(function(result) {
				$scope.carowerSear = result.data;
				defer.resolve(result);
			}, function(result) {
				defer.reject(result)
			})
		return defer.promise;
	}
	//标签页
	$scope.onClickTab = function(url) {
		if($scope.currentTab == url) {
			return true;
		}
		$scope.currentTab = url;
		switch(url) {
			case 'cardetail.html': //车主详情
				$scope.innter(); //初始化基本信息数据
				break;
			case 'carownerch.html': //审核记录
//				$scope.search(); //初始化基本信息数据
				break;
		}
	}

	$scope.onClickTab('cardetail.html');
}
angular
	.module("managerApp")
	.controller("ShipperNotController", ShipperNotController)
	.controller("ShipperDetailFormModelController", ShipperDetailFormModelController)