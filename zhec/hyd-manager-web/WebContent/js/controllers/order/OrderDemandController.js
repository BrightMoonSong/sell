function OrderDemandController($scope, $q, $http, $rootScope, OrderDemandService, constPageSize, ngDialog, goodsReminder) {
	$scope.WdatePicker = {}; //日期
	$scope.orderStatus = function(n) {
		switch(n) {
			case 1:
				return "订单创建"
				break;
			case 2:
				return "货主接受报价"
				break;
			case 3:
				return "司机到达货物所在地"
				break;
			case 4:
				return "装货完成"
				break;
			case 5:
				return "司机达到目的地"
				break;
			case 6:
				return "卸货完成"
				break;
			case 7:
				return "订单已完成"
				break;
			case 8:
				return "已评价"
				break;
			case 9:
				return "订单已取消"
				break;
		}
	};
	$scope.companyNature = function(a) {
		switch(a) {
			case 1:
				return '国有'
				break;
			case 2:
				return '集体'
				break;
			case 3:
				return '有限责任'
				break;
			case 4:
				return '股份有限'
				break;
			case 5:
				return '中外合资'
				break;
			case 6:
				return '外商投资'
				break;

		}
	};
	$scope.checkStatus = function(a) {
		switch(a) {
			case 1:
				return '注册未提交审核'
				break;
			case 2:
				return '提交审核'
				break;
			case 3:
				return '审核通过'
				break;
			case 4:
				return '审核不通过'
				break;
		}
	}

	//全部订单列表
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var orderNo = $scope.orderNo;
		$scope.startTimeStr = $scope.WdatePicker.startTimes;
		$scope.endTimeStr = $scope.WdatePicker.endTimes;
		OrderDemandService
			.find(orderNo, $scope.startTimeStr, $scope.endTimeStr, currentPageNo, currentPaseSize)
			.then(function(result) {
				$scope.ordedemandList = result.data;
				defer.resolve(result);
			}, function(reault) {
				defer.reject(result);
			})
		return defer.promise;
	}

	//弹出订单菜单弹窗
	$scope.openModal = function(orderId) {
		$scope.orderId = orderId;
		$scope.dialog = ngDialog.open({
			template: 'views/order/OrderDemandFormModel.html',
			className: 'ngdialog-theme-default',
			controller: 'OrderDemandFormModelController',
			scope: $scope,
			width: 1150
		})
	};
	//取消订单操作
	$scope.enableId = function(id) {
		var chainstouses;
		chainstouses = goodsReminder.ordersCancel;
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
			OrderDemandService
				.cancel(id)
				.then(function(result) {
					$scope.loadData()
				},
				function(reason) {})
		})
	}
}

//弹窗操作
function OrderDemandFormModelController($scope, OrderDemandService) {
	//初始化
	$scope.innter = function() {
		if($scope.orderId) {
			OrderDemandService
				.detail($scope.orderId)
				.then(function(result) {
					$scope.orderallEntiy = result.data;
				}, function(result) {

				})
		}

	}
	//标签页
	$scope.onClickTab = function(url) {
		if($scope.currentTab == url) {
			return true;
		}
		$scope.currentTab = url;
		switch(url) {
			case 'order.html': //订单信息
				$scope.innter(); //初始化基本信息数据
				break;
			case 'shipper.html': //货主信息
				$scope.innter(); //初始化基本信息数据
				break;
			case 'carmodel.html': //车型信息
				$scope.innter(); //初始化基本信息数据
				break;
		}
	}

	$scope.onClickTab('order.html');

	//关闭弹窗
	$scope.cancelModal = function() {
		$scope.dialog.close();
	}
}

angular
	.module("managerApp")
	.controller("OrderDemandController", OrderDemandController)
	.controller("OrderDemandFormModelController", OrderDemandFormModelController)
