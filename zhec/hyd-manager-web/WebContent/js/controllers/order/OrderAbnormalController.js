function OrderAbnormalController($scope, $q, $http, $rootScope, OrderAbnormalService, constPageSize, ngDialog, goodsReminder) {
	$scope.WdatePicker = {}; //日期
	$scope.orderStatusList = [{
			'id': 1,
			"name": "订单创建"
		},
		{
			'id': 2,
			"name": "货主接受报价"
		},
		{
			'id': 3,
			"name": "司机到达货物所在地"
		},
		{
			'id': 4,
			"name": "装货完成"
		},
		{
			'id': 5,
			"name": "司机达到目的地"
		},
		{
			'id': 6,
			"name": "卸货完成"
		},
		{
			'id': 7,
			"name": "订单已完成"
		},
		{
			'id': 8,
			"name": "已评价"
		},
		{
			'id': 9,
			"name": "订单已取消"
		}
	]

	$scope.payStatusList = [{
			'id': 0,
			'name': '未支付'
		},
		{
			'id': 1,
			'name': '已支付'
		}
	]
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
	}
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
				return '册未提交审核'
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
	$scope.handleStatus = function(i) {
		switch(i) {
			case 1:
				return '正常签收无需处理'
				break;
			case 2:
				return '异常签收待处理'
				break;
			case 3:
				return '异常签收处理完成'
				break;
		}
	}

	//全部订单列表
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var orderNo = $scope.orderNo;
		var carLicenseNo = $scope.carLicenseNo
		$scope.startTimeStr = $scope.WdatePicker.startTimes;
		$scope.endTimeStr = $scope.WdatePicker.endTimes;
		OrderAbnormalService
			.find(orderNo,carLicenseNo, $scope.startTimeStr, $scope.endTimeStr, currentPageNo, currentPaseSize)
			.then(function(result) {
				$scope.orderAbnormalList = result.data;
				defer.resolve(result);
			}, function(reault) {
				defer.reject(result);
			})
		return defer.promise;
	};
	//弹出订单菜单弹窗
	$scope.openModal = function(orderId) {
		$scope.orderId = orderId;
		$scope.dialog = ngDialog.open({
			template: 'views/order/OrderAllFormModel.html',
			className: 'ngdialog-theme-default',
			controller: 'OrderAbnormalFormModelController',
			scope: $scope,
			width: 1150
		})
	};
	//处理订单弹窗
	$scope.openHandle = function(orderId) {
		$scope.orderId = orderId;
		$scope.dialog1 = ngDialog.open({
			template: 'views/order/OrderHandleFormModel.html',
			className: 'ngdialog-theme-default',
			controller: 'OrderHandleFormModelController',
			scope: $scope,
			width: 850
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
			OrderAbnormalService
				.cancel(id)
				.then(function(result) {
					$scope.loadData()
				}),
				function(reason) {}
		})
	}
	//关闭处理弹窗
	$scope.cancelModal1 = function() {
		$scope.dialog1.close();
	}
}

//弹窗操作
function OrderAbnormalFormModelController($scope, OrderAbnormalService) {
	//初始化
	$scope.innter = function() {
		if($scope.orderId) {
			OrderAbnormalService
				.detail($scope.orderId)
				.then(function(result) {
					$scope.dataArry=[1,2,3,4,5,6,7,8]
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
			case 'orderEvaluation.html': //订单评价
				$scope.innter(); //初始化基本信息数据
				break;
			case 'shipper.html': //货主信息
				$scope.innter(); //初始化基本信息数据
				break;
			case 'carOwner.html': //车主信息
				$scope.innter(); //初始化基本信息数据
				break;
			case 'carmodel.html': //车型
				$scope.innter(); //初始化基本信息数据
				break;
			case 'orderSignReceive.html': //签收单信息
				$scope.innter();; //初始化基本信息数据
				break;
			case 'orderStatusChanges.html': //订单状态改变记录
				$scope.innter(); //初始化基本信息数据
				break;
			case 'orderTracks.html': //订单轨迹
				$scope.innter(); //初始化基本信息数据
				break;
		}
	}
//初始化页面
	$scope.onClickTab('order.html');

	//关闭弹窗
	$scope.cancelModal = function() {
		$scope.dialog.close();
	}
}
//处理弹窗操作
function OrderHandleFormModelController($scope, OrderAbnormalService) {
	$scope.okModal = function() {
		if($scope.orderId) {
			OrderAbnormalService
				.updatehandle($scope.orderId, $scope.handleRemark)
				.then(function(result) {
					$scope.cancelModal1();
					$scope.loadData()
				}, function(result) {

				})
		}
	}
}

angular
	.module("managerApp")
	.controller("OrderAbnormalController", OrderAbnormalController)
	.controller("OrderAbnormalFormModelController", OrderAbnormalFormModelController)
	.controller("OrderHandleFormModelController", OrderHandleFormModelController)
