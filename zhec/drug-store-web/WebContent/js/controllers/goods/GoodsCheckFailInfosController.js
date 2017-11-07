/**
 * 系统用户controller定义
 */
function GoodsCheckFailInfosController($scope, $http, $q, constPageSize, GoodsCheckFailInfosService, GoodsInfoService, ngDialog) {
	$scope.modalType = ""; //模态框类型：edit、add
	$scope.dataId = ""; //当前操作的数据id
	$scope.infoNameSearch = ""; //搜索关键词
	$scope.infoContainer = true; //数据列表
	$scope.editorModel = false; //富文本
	$scope.expOrDes = ''; //说明书或者商品描述信息
	$scope.okModalDisabled = false; //保存按钮的disabled
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
		GoodsCheckFailInfosService.find(currentPageNo, currentPaseSize, $scope.infoNameSearch, cateId, drugstoreIdSearch).then(
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
	//	$scope.findallCate = function() {
	//		GoodsCheckFailInfosService
	//			.findall()
	//			.then(
	//				function(result) {
	//					$scope.allCateList = result.data;
	//				},
	//				function(result) {
	//
	//				});
	//	}
	//	$scope.findallCate();

	/**
	 * 根据PID获取子分类列表
	 */
	//	$scope.findinfosbypid = function(id, n) {
	//		if(!id) {
	//			switch(n) {
	//				case 1: //一级选中的
	//					$scope.secCateList = [];
	//					$scope.thirdCateList = [];
	//					return false;
	//					break;
	//				case 2: //二级选中的
	//					$scope.thirdCateList = [];
	//					return false;
	//					break;
	//			}
	//		}
	//		GoodsCheckFailInfosService
	//			.findinfosbypid(id)
	//			.then(
	//				function(result) {
	//					switch(n) {
	//						case 1: //一级选中的
	//							$scope.secCateList = result.data;
	//							$scope.thirdCateList = [];
	//							break;
	//						case 2: //二级选中的
	//							$scope.thirdCateList = result.data;
	//							break;
	//					}
	//				},
	//				function(result) {
	//				});
	//
	//	}

	/**
	 * 弹出修改数据模态框
	 */
	$scope.openModal = function(dataId) {
		if($scope.openModalDisable) {
			return false;
		}
		$scope.openModalDisable = true;

		//获取品牌 name id 列表
		GoodsInfoService
			.namelist()
			.then(
				function(result) {
					$scope.brandNameList = result.data;
					//弹窗
					$scope.dataId = dataId;
					$scope.dialog = ngDialog.open({
						template: 'views/goods/GoodsInfoModal.html',
						className: 'ngdialog-theme-default',
						controller: 'goodsInfoFormModalController',
						scope: $scope,
						width: 1150
					});
					$scope.openModalDisable = false;
				},
				function(result) {
					$scope.openModalDisable = false;
				});

	};

	/**
	 * 弹出 商品图片管理  模态框
	 */
	$scope.openModalImages = function(dataId) {
		$scope.dataId = dataId;
		$scope.dialog = ngDialog.open({
			template: 'views/goods/GoodsInfoImages.html',
			className: 'ngdialog-theme-default',
			controller: 'goodsInfoImagesController',
			scope: $scope,
			width: 1150
		})
	};

	/**
	 * 更改状态，状态值（0 禁用 1 正常 2 已删除 3 在售）
	 * @param {Object} id
	 * @param {Object} status
	 */
	$scope.updatestatus = function(id, status) {
		var reminder; //提示语
		switch(status) {
			case 0:
				reminder = "确定禁用吗？"; //提示语
				break;
			case 1:
				reminder = "确定启用吗？"; //提示语
				break;
			case 2:
				reminder = "确定删除吗？"; //提示语
				break;
			case 3:
				reminder = "确定提交审核吗？"; //提示语
				break;
		}

		ngDialog.openConfirm({
			template: '<p>' + reminder + '</p>' +
				'<div class="ngdialog-buttons">' +
				'<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消' +
				'<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定' +
				'</button></div>',
			plain: true,
			closeByDocument: false,
			closeByEscape: false,
			className: 'ngdialog-theme-default'
		}).then(function(value) {
			switch(status) {
				case 3:
					$scope.dataId = id;
					$scope.status = 4; //药店提交上架审核中
					GoodsInfoService
						.updatestatus($scope.dataId, $scope.status)
						.then(
							function(result) {
								if(result.code >= 0) {
									$scope.loadData();
								}
							},
							function(result) {});
					break;
				default:
					GoodsInfoService
						.updatestatus(id, status)
						.then(
							function(result) {
								if(result.code >= 0) {
									$scope.loadData();
								}
							},
							function(result) {

							});
					break;
			}

		}, function(reason) {

		});

	}

	/**
	 * 获取树形分类列表，返回全部分类数据
	 */
	$scope.findallCate = function(dataEntity, n) {
		GoodsInfoService
			.findall(2) //只返回状态是正常的数据
			.then(
				function(result) {
					$scope.allCateList = result.data;
					if(n == 1) {
						return 0;
					}
					var endLoop = 0;
					$scope.allCateList.forEach(function(element, index, array) {
						try {
							if(endLoop == 1) {
								return false;
							}
							$scope.secCateList = element.childrenList;
							$scope.brandList = element;
							element.childrenList.forEach(function(element, index, array) {
								if(endLoop == 1) {
									return false;
								}
								$scope.thirdCateList = element.childrenList;
								$scope.brandLtId = element;
								element.childrenList.forEach(function(element, index, array) {
									if(endLoop == 1) {
										return false;
									}
									$scope.brandLtaId = element;
									if(element.cateId == dataEntity.goodsCateId) {
										dataEntity.goodsCateName = element.cateName;
										endLoop = 1;
									}
								})
							})
						} catch(e) {
							//TODO handle the exception
						}

					})
				},
				function(result) {
					//alert("该用户不存在");
				}
			);
	}
	$scope.findallCate('', 1);
	/**
	 * 根据PID获取子分类列表
	 */
	$scope.findinfosbypid = function(id, n, m) {
		if(!id) {
			switch(n) {
				case 1: //一级选中的
					if(m == 1) {
						$scope.secCateList1 = [];
						$scope.thirdCateList1 = [];
						return false;
					} else {
						$scope.secCateList = [];
						$scope.thirdCateList = [];
						return false;
					}
					break;
				case 2: //二级选中的
					if(m == 1) {
						$scope.thirdCateList1 = [];
						return false;
					} else {
						$scope.thirdCateList = [];
						return false;
					}
					break;
			}
		}
		GoodsInfoService
			.findinfosbypid(id)
			.then(
				function(result) {
					switch(n) {
						case 1: //一级选中的
							if(m == 1) {
								$scope.secCateList1 = result.data;
								$scope.thirdCateList1 = [];
							} else {
								$scope.secCateList = result.data;
								$scope.thirdCateList = [];
							}
							break;
						case 2: //二级选中的
							if(m == 1) {
								$scope.thirdCateList1 = result.data;
							} else {
								$scope.thirdCateList = result.data;
							}
							break;
					}
				},
				function(result) {});

	}

	/**
	 * 弹出商品  描述信息  说明书  模态框
	 */
	$scope.openGoodsDetailsModal = function(dataId, res) {
		$scope.dataId = dataId;
		$scope.infoContainer = false;
		$scope.editorModel = true;
		initEditorFun();
		if(res == 'explain') { //说明书
			$scope.instructions = false;
			//oss图片富文本
			imgPathEditorOss = imgPathGoods + '/' + dataId + '/instructions';
			$scope.expOrDes = 'explain';
			GoodsInfoService
				.getinfo($scope.dataId)
				.then(
					function(result) {
						setContent(false, result.data.instruction);
					}
				);
		} else if(res == 'describe') { //描述信息
			//oss图片富文本
			imgPathEditorOss = imgPathGoods + '/' + dataId + '/detail';
			$scope.expOrDes = 'describe';
			GoodsInfoService
				.getinfo($scope.dataId)
				.then(
					function(result) {
						setContent(false, result.data.description);
					}
				);
		}
	};

	/**
	 * 获取富文本内容----------------保存
	 */
	$scope.getContentAngular = function() {
		var arr = [];
		//arr.push("使用editor.getContent()方法可以获得编辑器的内容");
		//arr.push("内容为：");
		arr.push(UM.getEditor('myEditor').getContent());
		//alert(arr.join("\n"));
		var res;
		if($scope.expOrDes == 'explain') { //说明书
			res = {
				id: $scope.dataId,
				text: arr.join("\n"), //返回一个字符串。该字符串是通过把 arrayObject 的每个元素转换为字符串，然后把这些字符串连接起来，在两个元素之间插入 separator 字符串而生成的。
				type: 1
			};

			if(res.text == null || res.text == '' || res.text == undefined) {
				$rootScope.showAlert("说明书内容为空，不能保存！");
				return 0;
			}
			GoodsInfoService
				.description(res)
				.then(
					function(result) {

					}
				);
		} else if($scope.expOrDes == 'describe') { //商品描述信息
			res = {
				id: $scope.dataId,
				text: arr.join("\n"),
				type: 2
			};
			if(res.text == null || res.text == '' || res.text == undefined) {
				$rootScope.showAlert("商品描述内容为空，不能保存！");
				return 0;
			}

			GoodsInfoService
				.description(res)
				.then(
					function(result) {

					}
				);
		}

		$scope.infoContainer = true;
		$scope.editorModel = false;
	}
	/**
	 * 返回list页面
	 */
	$scope.goBack = function() {
		setContent(false, '');
		$scope.infoContainer = true;
		$scope.editorModel = false;
	}

	/**
	 * 详情
	 */
	$scope.openModel = function(id) {
		$scope.dataId = id;
		$scope.dialog = ngDialog.open({
			template: 'views/goods/GoodsCheckDeatilModal.html',
			className: 'ngdialog-theme-default',
			controller: 'GoodsFailDeatilController',
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
function GoodsFailDeatilController($scope, $q, GoodsCheckFailInfosService, $rootScope) {
	$scope.initEntity = function() {
		GoodsCheckFailInfosService
			.getinfo($scope.dataId)
			.then(
				function(result) {
					$scope.dataEntity = result.data;
				},
				function(result) {});
	}
	$scope.initEntityImg = function() {
		GoodsCheckFailInfosService
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
		GoodsCheckFailInfosService
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
	//获取说明书
	$scope.goodsExplain = function() {
		GoodsCheckFailInfosService
			.getinfo($scope.dataId)
			.then(
				function(result) {
					$scope.goodsExplainData = result.data.instruction;
				},
				function(result) {});
	}
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

	//初始化
	$scope.onClickTab('basicInformation.html');

}


/**
 * 用户修改弹出页面controller定义
 */
function goodsInfoFormModalController($scope, $q, $rootScope, $filter, GoodsInfoService, ngDialog, goodsReminder, ngVerify, $timeout) {
	$scope.dataEntity = {
		'goodsType': 3, // 商品类型     其他  3
		'storeId': localStorage.drugstoreId //	分店ID取登录时获得的
		//		'isGift': 0, // 是否是赠品    0否
		//		'isInPromotion': 0, // 是否促销    isInPromotion      1：参与并填写促销价格      0：不参与
		//		'isInstock': 0 // 是否有货    0否
	}
	$scope.WdatePicker = {};

	$scope.selectedClickResList = []; //关联症状选中的数据列表

	//基本信息
	$scope.initEntity = function() {
		if($scope.dataId) {
			GoodsInfoService
				.getinfo($scope.dataId)
				.then(
					function(result) {
						if(result.code >= 0) {
							$scope.dataEntity = result.data;
							//$scope.drugstoreById($scope.dataEntity.chainId); //根据连锁店ID获取商户列表
							$scope.dataEntityPrice = {
								'costPrice': $scope.dataEntity.costPrice, //成本价
								'goodsId': $scope.dataEntity.goodsId, //商品ID
								'remark': '', //备注
								'salesPrice': $scope.dataEntity.salesPrice //销售价					
							};
							$scope.findallCate($scope.dataEntity);
						}
					},
					function(reason) {

					});
		} else {
			$scope.brandList = ''; //一级选中的 置空
			$scope.secCateList = []; //二级
			$scope.thirdCateList = []; //三级
		}
	}

	//价格更改记录
	$scope.initEntityPrice = function() {
		GoodsInfoService
			.getinfo($scope.dataId)
			.then(
				function(result) {
					if(result.code >= 0) {
						$scope.dataEntity = result.data;
					}
				},
				function(result) {});
	}
	//弹窗 分页
	$scope.search = function(currentPageNo, currentPaseSize) {
		var startTime = '';
		var endTime = '';
		if($scope.WdatePicker.startTimes) {
			startTime = $scope.WdatePicker.startTimes;
		}
		if($scope.WdatePicker.endTimes) {
			endTime = $scope.WdatePicker.endTimes;
		}
		var defer = $q.defer();
		GoodsInfoService
			.findpricebills($scope.dataId, currentPaseSize, currentPageNo, startTime, endTime)
			.then(
				function(result) {
					$scope.infoauditList = result.data;
					defer.resolve(result);
				},
				function(result) {
					defer.reject(result);
				});
		return defer.promise;
	};

	$scope.clickone = function(res) {
		$scope.secCateList = res;
	}
	$scope.clicktwo = function(res) {
		$scope.thirdCateList = res;
	}
	$scope.clickThird = function(res) {
		if(res) {
			$scope.dataEntity.goodsCateName = res.cateName;
			$scope.dataEntity.goodsCateId = res.cateId;
		} else {
			$scope.dataEntity.goodsCateName = '';
			$scope.dataEntity.goodsCateId = '';
		}
	}

	//radio 选项
	$scope.checkedRadio = function(m, n) {
		switch(n) {
			case 'goodsType': //商品类型
				$scope.dataEntity.goodsType = m;
				break;
		}
	}

	//价格保存
	$scope.okModalPrice = function() {
		if($scope.dataEntityPrice.salesPrice <= 0) { //商品售价>0
			$rootScope.showAlert("商品售价必须大于0！");
			return false;
		}
		if(!$scope.dataEntityPrice.remark) { //更改价格备注不能为空
			$rootScope.showAlert("更改价格备注不能为空！");
			return false;
		}
		var reminder = '确定更改价格吗？';
		ngDialog.openConfirm({
			template: '<p>' + reminder + '</p>' +
				'<div class="ngdialog-buttons">' +
				'<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消' +
				'<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定' +
				'</button></div>',
			plain: true,
			closeByDocument: false,
			closeByEscape: false,
			className: 'ngdialog-theme-default'
		}).then(function(value) {
			GoodsInfoService
				.updateprice($scope.dataEntityPrice)
				.then(
					function(result) {
						if(result.code >= 0) {
							$scope.loadData();
							$scope.initEntity(); //初始化基本信息数据
						}
					},
					function(reason) {

					});
		}, function(reason) {

		});

	}
	//保存
	$scope.okModal = function() {
		if(!$scope.dataEntity.goodsCateName) { //分类名称
			$rootScope.showAlert("请选择分类！");
			return false;
		}
		if($scope.dataEntity.sort <= 0) { //排序号
			$rootScope.showAlert("排序号必须大于0！");
			return false;
		}
		if($scope.dataEntity.weight <= 0) { //重量
			$rootScope.showAlert("重量必须大于0！");
			return false;
		}
		//		if(!$scope.dataEntity.storeId) { //商户ID
		//			$rootScope.showAlert("请选择商户ID！");
		//			return false;
		//		}
		if($scope.dataId) { //修改 
			GoodsInfoService
				.updateinfo($scope.dataEntity)
				.then(
					function(result) {
						if(result.code >= 0) {
							$scope.loadData();
							$scope.initEntity(); //初始化基本信息数据
						}
					},
					function(reason) {

					});
		} else { //添加
			GoodsInfoService
				.addinfo($scope.dataEntity)
				.then(
					function(result) {
						if(result.code >= 0) {
							$scope.cancelModal();
							$scope.loadData();
						}
					},
					function(reason) {

					});
		}
	}

	//选择 所关联症状ID
	$scope.openModelSelectSymp = function() {
		GoodsInfoService
			.symptomsAll()
			.then(
				function(result) {
					if(result.code >= 0) {
						$scope.symptomsAllList = result.data;
						var str = $scope.dataEntity.symptomIds;
						$scope.symptomsSelectedId = []; //关联症状选中的数据列表的ID
						if(!str) { //如果所关联症状ID为空
							return false;
						}
						var attr = [];
						if(str.indexOf(",") < 0) { //如果所关联症状ID为不包含‘，’的一个ID
							var match = str.match(/^\d+$/); //考虑小数写法 ^\d+(\.\d+)?$
							if(match) {
								$scope.symptomsSelectedId.push(str);
								attr.push(str);
							}
						} else {
							attr = str.split(',');
							$scope.symptomsSelectedId = attr;
						}
						$scope.selectedClickResList = []; //关联症状选中的数据列表
						try {
							$scope.symptomsAllList.forEach(function(element, index, array) {
								try {
									element.childrenList.forEach(function(element, index, array) {
										if(attr.contains(element.symptomId)) {
											$scope.selectedClickResList.push(element);
										}
									})
								} catch(e) {
									//TODO handle the exception
								}
							})
						} catch(e) {
							//TODO handle the exception
						}
					}
				},
				function(reason) {

				});
	};
	//症状关联  下拉改变时的数据
	$scope.changeSysm = function(obj) {
		$scope.secondSysmtomList = obj;
	}
	//选择症状时的点击事件
	$scope.selectedClickRes = function(obj) {
		if($scope.symptomsSelectedId.contains(obj.symptomId)) {
			return false;
		}
		$scope.selectedClickResList.push(obj);
		$scope.symptomsSelectedId.push(obj.symptomId);
		$scope.dataEntity.symptomIds = $scope.symptomsSelectedId.join(","); //数组转字符串
	}
	//移除选择症状时的点击事件
	$scope.removeClickRes = function(symptomId) {
		$scope.symptomsSelectedId.remove(symptomId);
		$scope.selectedClickResList.forEach(function(element, index, array) {
			if(element.symptomId == symptomId) {
				$scope.selectedClickResList.splice(index, 1);
				return 0;
			}
		});
		$scope.dataEntity.symptomIds = $scope.symptomsSelectedId.join(","); //数组转字符串
	}

	//标签页
	$scope.onClickTab = function(url) {
		if($scope.currentTab == url) {
			return true;
		}
		$scope.currentTab = url;
		switch(url) {
			case 'basicInformation.html': //基本信息
				$scope.initEntity(); //初始化基本信息数据
				break;
			case 'updateprice.html': //修改价格
				$scope.initEntity(); //初始化基本信息数据
				break;
			case 'updateprice.html':
				$scope.loadDataDialog(); //初始化更改价格记录列表
				break;
			case 'SelectSymp.html': //关联症状
				$scope.initEntity(); //初始化基本信息数据
				$scope.openModelSelectSymp();
				break;
		}
	}

	//$scope.findallCate(); //获取所有分类数据

	$scope.onClickTab('basicInformation.html');
}


/**
 * 商品图片管理
 */
function goodsInfoImagesController($scope, $rootScope, $filter, GoodsInfoService, ngDialog, goodsReminder, ngVerify, $timeout) {
	//回显
	$scope.initInfo = function() {
		GoodsInfoService
			.findinfosImg($scope.dataId)
			.then(
				function(result) {
					if(result.code >= 0) {
						$scope.dataInfoImages = result.data;
						$scope.dataInfoImages2 = []; //新增的数据
					}
				},
				function(reason) {

				});
	};

	//图片删除
	$scope.removeImg = function(imgId) {
		var reminder = '确定删除吗？';
		ngDialog.openConfirm({
			template: '<p>' + reminder + '</p>' +
				'<div class="ngdialog-buttons">' +
				'<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消' +
				'<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定' +
				'</button></div>',
			plain: true,
			closeByDocument: false,
			closeByEscape: false,
			className: 'ngdialog-theme-default'
		}).then(function(value) {
			GoodsInfoService
				.updatestatusImg(imgId, 2)
				.then(
					function(result) {
						if(result.code >= 0) {
							$scope.initInfo();
						}
					},
					function(result) {
						//alert("该用户不存在");
					});
		}, function(reason) {

		});
	}

	/**
	 * 在修改modal页面增加一行
	 */
	$scope.add_li = function() {
		//加默认值
		$scope.dataInfoImages2.push({
			"imagePath": " ",
			"imageId": 0,
			"sort": " ",
			"status": 1,
			"goodsId": $scope.dataId
		});
	};
	//上传完图片的确定
	$scope.imgPathSet = function() {
		$scope.previewHide = true; //上传前的预览隐藏
		for(var i = 0; i < imgPath.length; i++) {
			$scope.dataInfoImages2.push({
				"imagePath": imgPath[i],
				"imageId": 0,
				"sort": 1,
				"status": 1,
				"goodsId": $scope.dataId
			});
		}
		var str1 = [];
		for(i = 0; i < $scope.dataInfoImages2.length; i++) {
			if(str1.indexOf($scope.dataInfoImages2[i]) < 0) {
				str1.push($scope.dataInfoImages2[i])
			}
		}
		$scope.dataInfoImages2 = str1;
		$scope.loadData();
		//$scope.okInfoImages($scope.dataInfoImages,$scope.dataInfoImages2);
		imgPath = [];
		$scope.dialog.close();
	}

	/**
	 * 打开OSS弹窗
	 * @param dataIds
	 */
	$scope.openModalOss = function(dataIds) {
		$scope.dataIdOss = $scope.dataId;
		$scope.dialog = ngDialog.open({
			template: 'views/goods/GoodsInfoModalOss.html',
			className: 'ngdialog-theme-default',
			controller: 'goodsInfoOssFormModalController',
			//closeByDocument:false,
			scope: $scope,
			width: 1150
		})
	};

	//图片  保存
	$scope.okInfoImages = function(dataInfoImages, dataInfoImages2) {
		dataInfoImages = dataInfoImages.concat(dataInfoImages2); //数组合并

		GoodsInfoService
			.updateinfoImg(dataInfoImages)
			.then(
				function(result) {
					if(result.code >= 0) {
						$scope.initInfo();
						$scope.loadData();
					}
				}
			)
	};

	//初始化 回显
	$scope.initInfo();
}

/**
 * OSS图片上传  弹出框
 * @param $scope
 * @param $filter
 * @param GoodsInfoService
 */
function goodsInfoOssFormModalController($scope, $filter, GoodsInfoService) {
	if($scope.dataIdOss != null && $scope.dataIdOss != undefined && $scope.dataIdOss != "") {
		$scope.idData = imgPathGoods + '/' + $scope.dataIdOss + '/rotation'; //轮播图
	} else {
		$rootScope.showAlert("出错了！");
	}

}

var imgPath = [];

function disabled() {
	var piclist = document.getElementsByClassName("pic_list");
	var bool = true;
	for(var i = 0; i < piclist.length; i++) {
		if($(".progress").width() == 160) {

		} else {
			bool = false;
		}
	}
	if(bool) {
		document.getElementById("ifSucessShow").disabled = false;
	} else {
		document.getElementById("ifSucessShow").disabled = true;
	}
}

function setImgInfoPath(res) {
	imgPath.push(res);
	disabled();
}

var imgPathSpec = [];

function setImgGoodsSpecPath(res) {
	imgPathSpec.push(res);
	$("#ossbrandimg").removeAttr("disabled");
	if(listattr.length == 1) {} else {
		var img = document.getElementsByClassName('pic_list');
		for(var i = 0; i < img.length; i++) {
			if(i != 0) {
				img[i].style.display = 'none';
			}
		}
	}
}

angular
	.module('managerApp')
	.controller('GoodsCheckFailInfosController', GoodsCheckFailInfosController)
	.controller('GoodsFailDeatilController', GoodsFailDeatilController)
	.controller('goodsInfoFormModalController', goodsInfoFormModalController)
	.controller('goodsInfoOssFormModalController', goodsInfoOssFormModalController)
	.controller('goodsInfoImagesController', goodsInfoImagesController)