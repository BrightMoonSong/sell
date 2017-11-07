function AuthFunctionController($scope, $q, $http, $rootScope, AuthFunctionService, constPageSize, ngDialog, goodsReminder) {
	$scope.authsId = "" //操作当前Id
	$scope.functionUrl = "" //功能点路径
	$scope.code = "" //关键词
	$scope.parentId = "" //父级权限ID
	$scope.name = ""
	$scope.names=""
	$scope.scopeList = [ //功能点范围:1平台web，2商家web，3商家手机端，4配送员手机端，5用户手机端) ,
		{
			id: 1,
			"name": '平台web'
		}, {
			id: 2,
			"name": '商家web'
		}, {
			id: 3,
			"name": '商家手机端'
		}, {
			id: 4,
			"name": '配送员手机端'
		}, {
			id: 5,
			"name": '用户手机端'
		}
	]

	//角色范围
	$scope.scopes = function(n) {
		switch(n) {
			case 1:
				return '平台web';
				break;
			case 2:
				return '商家web';
				break;
			case 3:
				return '商家手机端';
				break;
			case 4:
				return '配送员手机端';
				break;
			case 5:
				return '用户手机端';
				break;
			default:
				return '';
				break;
		}
	}
	$scope.find = function(currentPageNo, currentPaseSize) {
		var defer = $q.defer()
		var codes = $scope.code;
		var names = $scope.name
		var functionUrls = $scope.functionUrl;
		if(!$scope.scopeobj) {
			var scopeId = "";
		} else {
			var scopeId = $scope.scopeobj.id
		}

		AuthFunctionService
			.onefind(currentPageNo, currentPaseSize, names, scopeId)
			.then(function(result) {
				$scope.authfunOneList = result.data;
				defer.resolve(result)
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
		$scope.currentNum = 0;
		switch(url) {
			case 'numberOne.html': //基本信息
				$scope.find = function(currentPageNo, currentPaseSize) {
					var defer = $q.defer()
					var codes = $scope.code;
					var functionUrls = $scope.functionUrl;
					var names=$scope.names
					if($scope.scopeobj == undefined) {
						var scopeId = "";
					} else {
						var scopeId = $scope.scopeobj.id
					}

					AuthFunctionService
						.onefind(currentPageNo, currentPaseSize, names, scopeId)
						.then(function(result) {
							$scope.authfunOneList = result.data;
							defer.resolve(result)
						}, function(result) {
							defer.reject(result)
						})
					return defer.promise;
				}
				if($scope.currentNum != 0) {
					$scope.loadData(true)
				}
				$scope.currentNum++;
				break;
			case 'numberTwo.html': //二级菜单
				$scope.find = function(currentPageNo, currentPaseSize) {
					var defer = $q.defer()
					var codes = $scope.code;
					var name = $scope.name
					var parentsId = $scope.parentId;
					if(!parentsId){
						parentsId="";
					}
					var functionUrls = $scope.functionUrl;
					if($scope.scopeobtwo == undefined) {
						var scopeIdTwo = "";
					} else {
						var scopeIdTwo = $scope.scopeobtwo.id
					}

					AuthFunctionService
						.twofind(currentPageNo, currentPaseSize, parentsId, name, scopeIdTwo)
						.then(function(result) {
							$scope.authfunTwoList = result.data;
							defer.resolve(result)
						}, function(result) {
							defer.reject(result)
						})
					return defer.promise;
				}

				$scope.loadData(true)
				break;
			case 'points.html'://功能点
				$scope.find = function(currentPageNo, currentPaseSize) {
					var defer = $q.defer()
					var codes = $scope.code;
					var name = $scope.name
					var parentsId = $scope.parentIds;
					if(!parentsId){
						parentsId="";
					}
					var functionUrls = $scope.functionUrl;
					if($scope.scopeobjpoint == undefined) {
						var scopeIdPoint = "";
					} else {
						var scopeIdPoint = $scope.scopeobjpoint.id
					}

					AuthFunctionService
						.pointfind(currentPageNo, currentPaseSize, parentsId, name,codes, scopeIdPoint)
						.then(function(result) {
							$scope.authfunPointList = result.data;
							defer.resolve(result)
						}, function(result) {
							defer.reject(result)
						})
					return defer.promise;
				}

				$scope.loadData(true)
				break;
		}
	}
	//二级联动-2
	$scope.findallsecondarymenu = function(id) {
		if(!id){
			$scope.authfunTwoseach =[];0
			return 0;
		}
		AuthFunctionService
			.twofinded(id)
			.then(function(result) {
				$scope.authfunTwoseach = result.data
			}, function(result) {

			})
	}

	//二级联动-1
	$scope.findallfirstlevelmenu = function() {
		AuthFunctionService
			.twofindOne()
			.then(function(result) {
				$scope.authfunTwoseachs = result.data
			}, function(result) {

			})
	}
	$scope.findallfirstlevelmenu();

	//弹出一级菜单添加弹窗
	$scope.openModal = function(id, boller ) {
		$scope.authsId = id;
		$scope.datared = boller;
		
		$scope.dialog = ngDialog.open({
			template: 'views/system/AuthFunctionFormModel.html',
			className: 'ngdialog-theme-default',
			controller: 'AuthFunctionFormModelController',
			scope: $scope,
			width: 850
		})
	};
	//弹出二级菜单添加弹窗
	$scope.openModalTwo = function(id, boller,num,scope) {
		$scope.authsId = id;
		$scope.datared = boller;
		$scope.number=num;
		$scope.scopesId=scope;
		$scope.dialog = ngDialog.open({
			template: 'views/system/AuthFunctionFormModelTwo.html',
			className: 'ngdialog-theme-default',
			controller: 'AuthFunctionFormModelTwoController',
			scope: $scope,
			width: 850
		})
	};
	//弹出功能点菜单添加弹窗
	$scope.openModalPoint = function(id, boller,num,scope) {
		$scope.authsId = id;
		$scope.datared = boller;
		$scope.number=num;
		$scope.scopepoint=scope;
		$scope.dialog = ngDialog.open({
			template: 'views/system/AuthFunctionFormModelPoint.html',
			className: 'ngdialog-theme-default',
			controller: 'AuthFunctionFormModelPointController',
			scope: $scope,
			width: 850
		})
	};

	//启禁用操作
	$scope.enableId = function(id, status) {
		var chainstouses;
		if(status == 1) {
			//0禁1启
			chainstouses = goodsReminder.goodsState.enable;
		} else if(status == 0){
			chainstouses = goodsReminder.goodsState.forbidden;
		}else if(status == 2){
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
			AuthFunctionService
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
	$scope.onClickTab('numberOne.html')
}
//一级菜单管理
function AuthFunctionFormModelController($scope, AuthFunctionService) {
	$scope.initer = function() {
		if($scope.authsId) { //判断当前id如果为空则为添加，反之为修改
			AuthFunctionService
				.detail($scope.authsId)
				.then(function(result) {
					$scope.authfunlist = result.data
				})
		} else {
			$scope.authfunlist = {
				"status": 1,
				"isMenu": 1
			}
		}
	}
	$scope.scopeList = [ //功能点范围:1平台web，2商家web，3商家手机端，4配送员手机端，5用户手机端) ,
		{
			"id": 1,
			"name": '平台web'
		}, {
			"id": 2,
			"name": '商家web'
		}, {
			"id": 3,
			"name": '商家手机端'
		}, {
			"id": 4,
			"name": '配送员手机端'
		}, {
			"id": 5,
			"name": '用户手机端'
		}
	]
	//操纵保存弹窗
	$scope.okModal = function() {
		if($scope.authsId) {
			AuthFunctionService
				.edit($scope.authfunlist)
				.then(function(result) {
					$scope.cancelModal();
					$scope.loadData();
				}, function(reason) {
					
				})
		} else {
			AuthFunctionService
				.oneadd($scope.authfunlist)
				.then(function(result) {
					$scope.cancelModal();
					$scope.loadData();
				}, function(reason) {
				
				})
		}
	}
	//操作状态
	$scope.check = function(n) {
		$scope.authfunlist.status = n;
	}
	//操作菜单状态
	$scope.checks = function(j) {
		$scope.authfunlist.isMenu = j;
	}
	$scope.initer();
}
//二级菜单Contrroler操作
function AuthFunctionFormModelTwoController($scope, AuthFunctionService) {
	$scope.initer = function() {
		if($scope.authsId&&$scope.number==1) { //判断当前id如果为空则为添加，反之为修改
			AuthFunctionService
				.detail($scope.authsId)
				.then(function(result) {
					$scope.authfunlist = result.data
				})
		} else {
			$scope.authfunlist = {
				"status": 1,
				"isMenu": 1,
				"parentId":$scope.authsId,
				"scope":$scope.scopesId
			}
		}
	}
	
	//操纵保存弹窗
	$scope.okModal = function() {
		if($scope.authsId&&$scope.number==1) {
			AuthFunctionService
				.edit($scope.authfunlist)
				.then(function(result) {
					$scope.cancelModal();
					$scope.loadData();
				}, function(reason) {
					$scope.cancelModal();
				})
		} else {
			AuthFunctionService
				.twoadd($scope.authfunlist)
				.then(function(result) {
					$scope.cancelModal();
					$scope.loadData();
				}, function(reason) {
					
				})
		}
	}
	//操作状态
	$scope.check = function(n) {
		$scope.authfunlist.status = n;
	}
	//操作菜单状态
	$scope.checks = function(j) {
		$scope.authfunlist.isMenu = j;
	}
	$scope.initer();
}
//功能点Contrroler操作
function AuthFunctionFormModelPointController($scope, AuthFunctionService) {
	$scope.initer = function() {
		if($scope.authsId&&$scope.number==1) { //判断当前id如果为空则为添加，反之为修改
			AuthFunctionService
				.detail($scope.authsId)
				.then(function(result) {
					$scope.authfunlist = result.data
				})
		} else {
			$scope.authfunlist = {
				"status": 1,
				"isMenu": 0,
				"parentId":$scope.authsId,
				"scope":$scope.scopepoint
			}
		}
	}

	//操纵保存弹窗
	$scope.okModal = function() {
		if($scope.authsId&&$scope.number==1) {
			AuthFunctionService
				.edit($scope.authfunlist)
				.then(function(result) {
					$scope.cancelModal();
					$scope.loadData();
				}, function(reason) {
					$scope.cancelModal();
				})
		} else {
			AuthFunctionService
				.pointadd($scope.authfunlist)
				.then(function(result) {
					$scope.cancelModal();
					$scope.loadData();
				}, function(reason) {
					
				})
		}
	}
	//操作状态
	$scope.check = function(n) {
		$scope.authfunlist.status = n;
	}
	//操作菜单状态
	$scope.checks = function(j) {
		$scope.authfunlist.isMenu = j;
	}
	$scope.initer();
}
angular
	.module("managerApp")
	.controller('AuthFunctionController', AuthFunctionController)
	.controller('AuthFunctionFormModelController', AuthFunctionFormModelController)
	.controller("AuthFunctionFormModelTwoController",AuthFunctionFormModelTwoController)
	.controller("AuthFunctionFormModelPointController",AuthFunctionFormModelPointController)
