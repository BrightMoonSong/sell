function CarModelDictionaryController($scope, $q, $http, $rootScope, CarModelDictionaryService, constPageSize, ngDialog, goodsReminder) {
	$scope.disableBoolea = true;
	//字典列表
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer()
		var content = $scope.content;
		CarModelDictionaryService
			.find(content, currentPageNo, currentPaseSize)
			.then(function(result) {
				$scope.DictionaryList = result.data;
				defer.resolve(result);
			}, function(result) {
				defer.reject(result);
			})
		return defer.promise;
	}
	//弹出详情菜单弹窗
	$scope.openModal = function(dictionaryId, dataBoolea) {
		$scope.dictionaryId = dictionaryId;
		$scope.dataBoolea = dataBoolea;
		$scope.dialog = ngDialog.open({
			template: 'views/carmodel/CarModelDictionaryFormModel.html',
			className: 'ngdialog-theme-default',
			controller: 'CarModelDictionaryFormModelController',
			scope: $scope,
			width: 850
		})
	};
	//启禁用删除操作
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
			CarModelDictionaryService
				.enable(id, status)
				.then(function(result) {
					$scope.loadData()
				}),
				function(reason) {}
		})
	}
	//关闭弹窗
	$scope.cancelModal = function() {
		$scope.dialog.close();
	}
}
//弹窗操作
function CarModelDictionaryFormModelController($scope, CarModelDictionaryService) {
	$scope.typeList = [{
		"id": 1,
		"name": '特殊需求'
	}]

	//弹窗初始化
	$scope.innter = function() {
		if($scope.dataBoolea) {
			$scope.disableBoolea = false;
		} else {
			$scope.disableBoolea = true;
		}
		if($scope.dictionaryId) {
			CarModelDictionaryService
				.detail($scope.dictionaryId)
				.then(function(result) {
					$scope.DictionaryEntiy = result.data;
				}, function(reason) {

				})
		} else {
			$scope.DictionaryEntiy = {
				"status": 1
			}
		}
	}
	$scope.innter();

	//保存操作
	$scope.okModal = function() {
		if($scope.dictionaryId) {
			$scope.disableBoolea = true;
			CarModelDictionaryService
				.edit($scope.DictionaryEntiy)
				.then(function(result) {
					$scope.cancelModal();
					$scope.loadData();
				}, function(reason) {

				})
		} else {
			CarModelDictionaryService
				.add($scope.DictionaryEntiy)
				.then(function(result) {
					$scope.cancelModal();
					$scope.loadData();
				}, function(reason) {

				})

		}
	}
}

angular
	.module("managerApp")
	.controller("CarModelDictionaryController", CarModelDictionaryController)
	.controller("CarModelDictionaryFormModelController", CarModelDictionaryFormModelController)