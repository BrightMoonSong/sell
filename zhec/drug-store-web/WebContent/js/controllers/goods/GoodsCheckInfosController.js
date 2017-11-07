/**
 * 系统用户controller定义
 */
function GoodsCheckInfosController($scope, $http, $q, constPageSize, GoodsCheckInfosService, ngDialog) {
	/**
	 * 数据初始化
	 */
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		var thirdCateObj = $scope.thirdCateObj;
		var cateId = '';
		if(thirdCateObj) {
			cateId = thirdCateObj.cateId;
		} else {
			cateId = '';
		}
		$scope.drugstoreIdSearch = localStorage.drugstoreId; //	分店ID取登录时获得的
		var drugstoreIdSearch = $scope.drugstoreIdSearch;
		if(!drugstoreIdSearch) {
			drugstoreIdSearch = '';
		}
		GoodsCheckInfosService.find(currentPageNo, currentPaseSize, $scope.infoNameSearch, cateId, drugstoreIdSearch).then(
			function(result) {
				$scope.goodsList = result.data;
				defer.resolve(result);
			},
			function(result) {
				defer.reject(result);
			});
		return defer.promise;
	};
	/**
	 * 获取树形分类列表，返回全部分类数据
	 */
	$scope.findallCate = function() {
		GoodsCheckInfosService
			.findall()
			.then(
				function(result) {
					$scope.allCateList = result.data;
				},
				function(result) {

				});
	}
	$scope.findallCate();

	/**
	 * 根据PID获取子分类列表
	 */
	$scope.findinfosbypid = function(id, n) {
		if(!id) {
			switch(n) {
				case 1: //一级选中的
					$scope.secCateList = [];
					$scope.thirdCateList = [];
					return false;
					break;
				case 2: //二级选中的
					$scope.thirdCateList = [];
					return false;
					break;
			}
		}
		GoodsCheckInfosService
			.findinfosbypid(id)
			.then(
				function(result) {
					switch(n) {
						case 1: //一级选中的
							$scope.secCateList = result.data;
							$scope.thirdCateList = [];
							break;
						case 2: //二级选中的
							$scope.thirdCateList = result.data;
							break;
					}
				},
				function(result) {});

	}

	/**
	 * 详情
	 */
	$scope.openModel = function(id) {
		$scope.dataId = id;
		$scope.dialog = ngDialog.open({
			template: 'views/goods/GoodsCheckDeatilModal.html',
			className: 'ngdialog-theme-default',
			controller: 'GoodsDeatilController',
			scope: $scope,
			width: 1150
		});
	};

	//关闭弹窗
	$scope.cancelModal = function() {
		$scope.dialog.close();
	};
}

/**
 * 详情
 */
function GoodsDeatilController($scope, $q, GoodsCheckInfosService, $rootScope) {
	$scope.initEntity = function() {
		GoodsCheckInfosService
			.getinfo($scope.dataId)
			.then(
				function(result) {
					$scope.dataEntity = result.data;
				},
				function(result) {});
	}
	$scope.initEntityImg = function() {
		GoodsCheckInfosService
			.findinfosImg($scope.dataId)
			.then(
				function(result) {
					$scope.dataInfoImages = result.data;
				},
				function(result) {});
	}
	//审核记录
	$scope.search = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer();
		GoodsCheckInfosService
			.findcheckbills(currentPageNo, currentPaseSize, $scope.dataId)
			.then(
				function(result) {
					$scope.checkBillsList = result.data;
					defer.resolve(result);
				},
				function(result) {
					defer.reject(result);
				});
		return defer.promise;
	};
	//标签页
	$scope.onClickTab = function(url) {
		if($scope.currentTab == url) {
			return true;
		}
		$scope.currentTab = url;
		switch(url) {
			case 'basicInformation.html': //基本信息
				$scope.initEntity();
				break;
			case 'goodsImg.html': //商品图片
				$scope.initEntityImg();
				break;
			case 'goodsCheckbills.html': //审核记录
				break;
			case 'goodsExplain.html': //说明书
				$scope.goodsExplain();
				break;
		}
	}
	//获取说明书
	$scope.goodsExplain = function() {
		GoodsCheckInfosService
			.getinfo($scope.dataId)
			.then(
				function(result) {
					$scope.goodsExplainData = result.data.instruction;
				},
				function(result) {});
	}

	//初始化
	$scope.onClickTab('basicInformation.html');

}

angular
	.module('managerApp')
	.controller('GoodsCheckInfosController', GoodsCheckInfosController)
	.controller('GoodsDeatilController', GoodsDeatilController)