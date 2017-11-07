/**
 * 路径配置
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
	$urlRouterProvider.otherwise("/manager/index");

	$ocLazyLoadProvider.config({
		// Set to true if you want to see what and when is dynamically loaded
		debug: true
	});

	$stateProvider
		.state('manager', {
			url: "/manager",
			templateUrl: "views/common/content.html",
		})
		.state('manager.index', {
			url: "/index",
			templateUrl: "views/main.html",
			data: {
				pageTitle: '管理首页'
			}
		})
		//系统管理
		.state('manager.sysconfig', {
			abstract: true,
			url: "/sysconfig",
			template: "<ui-view/>",
		})
		.state('manager.sysconfig.sysuserlist', {
			url: "/sysuserlist/:funcId",
			templateUrl: "views/system/SysUserList.html",
			data: {
				pageTitle: '管理员'
			},
			controller: 'SysUserController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/system/SysUserService.js'),
							__uri('/js/controllers/system/SysUserController.js')
						]
					}])
				}]
			}
		})
		//平台用户管理
		.state('manager.sysconfig.authsysuserlist', {
			url: "/authsysuserlist/:funcId",
			templateUrl: "views/system/AuthSysUserList.html",
			data: {
				pageTitle: '平台用户管理'
			},
			controller: 'AuthSysUserController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/system/AuthSysUserService.js'),
							__uri('/js/controllers/system/AuthSysUserController.js')
						]
					}])
				}]
			}
		})
		//角色管理
		.state('manager.sysconfig.authrole', {
			url: "/authrole/:funcId",
			templateUrl: "views/system/AuthRole.html",
			data: {
				pageTitle: '角色管理'
			},
			controller: 'AuthRoleController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/system/AuthRoleService.js'),
							__uri('/js/controllers/system/AuthRoleController.js')
						]
					}])
				}]
			}
		})
		//功能点管理
		.state('manager.sysconfig.authfunction', {
			url: "/authfunction/:funcId",
			templateUrl: "views/system/AuthFunction.html",
			data: {
				pageTitle: '功能点管理'
			},
			controller: 'AuthFunctionController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/system/AuthFunctionService.js'),
							__uri('/js/controllers/system/AuthFunctionController.js')
						]
					}])
				}]
			}
		})
		//车主管理
		.state('manager.carconfig', {
			abstract: true,
			url: "/carconfig",
			template: "<ui-view/>",
		})
		.state('manager.carconfig.carownerpendinglist', {
			url: "/carownerpendinglist/:funcId",
			templateUrl: "views/carowner/CarownerPendingList.html",
			data: {
				pageTitle: '待审核管理'
			},
			controller: 'CarownerPendingController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/carowner/CarownerPendingService.js'),
							__uri('/js/controllers/carowner/CarownerPendingController.js')
						]
					}])
				}]
			}
		})
		//审核未通过
		.state('manager.carconfig.carownernotlist', {
			url: "/carownernotlist/:funcId",
			templateUrl: "views/carowner/CarownerNotList.html",
			data: {
				pageTitle: '审核未通过管理'
			},
			controller: 'CarownerNotController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/carowner/CarownerNotService.js'),
							__uri('/js/controllers/carowner/CarownerNotController.js')
						]
					}])
				}]
			}
		})
		//审核通过
		.state('manager.carconfig.carowneroklist', {
			url: "/carowneroklist/:funcId",
			templateUrl: "views/carowner/CarownerOkList.html",
			data: {
				pageTitle: '审核通过管理'
			},
			controller: 'CarownerOkController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/carowner/CarownerOkService.js'),
							__uri('/js/controllers/carowner/CarownerOkController.js')
						]
					}])
				}]
			}
		})
		//意见反馈管理
		.state('manager.carconfig.carownerfeedbackslist', {
			url: "/carownerfeedbackslist/:funcId",
			templateUrl: "views/carowner/CarownerFeedBacksList.html",
			data: {
				pageTitle: '意见反馈管理'
			},
			controller: 'CarownerFeedBacksController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/carowner/CarownerFeedBacksService.js'),
							__uri('/js/controllers/carowner/CarownerFeedBacksController.js')
						]
					}])
				}]
			}
		})
		//注册未审核管理
		.state('manager.carconfig.carownerregnocheckslist', {
			url: "/carownerregnocheckslist/:funcId",
			templateUrl: "views/carowner/CarownerRegnochecksList.html",
			data: {
				pageTitle: '注册未审核管理'
			},
			controller: 'CarownerRegnochecksController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/carowner/CarownerRegnochecksService.js'),
							__uri('/js/controllers/carowner/CarownerRegnochecksController.js')
						]
					}])
				}]
			}
		})
		//字典管理
		.state('manager.carmodelconfig', {
			abstract: true,
			url: "/carmodelconfig",
			template: "<ui-view/>",
		})
		//车型管理
		.state('manager.carmodelconfig.carmodellist', {
			url: "/carmodellist/:funcId",
			templateUrl: "views/carmodel/CarModelList.html",
			data: {
				pageTitle: '车型管理'
			},
			controller: 'CarModelController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/carmodel/CarModelService.js'),
							__uri('/js/controllers/carmodel/CarModelController.js')
						]
					}])
				}]
			}
		})
		//佣金管理
		.state('manager.carmodelconfig.carcommissionlist', {
			url: "/carcommissionlist/:funcId",
			templateUrl: "views/carmodel/CarComMissionList.html",
			data: {
				pageTitle: '佣金管理'
			},
			controller: 'CarComMissionController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/carmodel/CarComMissionService.js'),
							__uri('/js/controllers/carmodel/CarComMissionController.js')
						]
					}])
				}]
			}
		})
		//用户字典管理
		.state('manager.carmodelconfig.carmodeldictionarylist', {
			url: "/carmodeldictionarylist/:funcId",
			templateUrl: "views/carmodel/CarModelDictionaryList.html",
			data: {
				pageTitle: '用户字典管理'
			},
			controller: 'CarModelDictionaryController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/carmodel/CarModelDictionaryService.js'),
							__uri('/js/controllers/carmodel/CarModelDictionaryController.js')
						]
					}])
				}]
			}
		})
		//货主管理
		.state('manager.shipperconfig', {
			abstract: true,
			url: "/shipperconfig",
			template: "<ui-view/>",
		})
		//意见反馈管理
		.state('manager.shipperconfig.shipperfeedbacklist', {
			url: "/shipperfeedbacklist/:funcId",
			templateUrl: "views/shipper/ShipperFeedbackList.html",
			data: {
				pageTitle: '意见反馈管理'
			},
			controller: 'ShipperFeedbackController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/shipper/ShipperFeedbackService.js'),
							__uri('/js/controllers/shipper/ShipperFeedbackController.js')
						]
					}])
				}]
			}
		})
		//审核未通过管理
		.state('manager.shipperconfig.shippernotlist', {
			url: "/shippernotlist/:funcId",
			templateUrl: "views/shipper/ShipperNotList.html",
			data: {
				pageTitle: '审核未通过管理'
			},
			controller: 'ShipperNotController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/shipper/ShipperNotService.js'),
							__uri('/js/controllers/shipper/ShipperNotController.js')
						]
					}])
				}]
			}
		})
		//待审核管理
		.state('manager.shipperconfig.shipperpendinglist', {
			url: "/shipperpendinglist/:funcId",
			templateUrl: "views/shipper/ShipperPendingList.html",
			data: {
				pageTitle: '待审核管理'
			},
			controller: 'ShipperPendingController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/shipper/ShipperPendingService.js'),
							__uri('/js/controllers/shipper/ShipperPendingController.js')
						]
					}])
				}]
			}
		})
		//审核通过管理
		.state('manager.shipperconfig.shipperoklist', {
			url: "/shipperoklist/:funcId",
			templateUrl: "views/shipper/ShipperOkList.html",
			data: {
				pageTitle: '审核通过管理'
			},
			controller: 'ShipperOkController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/shipper/ShipperOkService.js'),
							__uri('/js/controllers/shipper/ShipperOkController.js')
						]
					}])
				}]
			}
		})
		//注册未审核用户
		.state('manager.shipperconfig.shipperregnocheckslist', {
			url: "/shipperregnocheckslist/:funcId",
			templateUrl: "views/shipper/ShipperRegnochecksList.html",
			data: {
				pageTitle: '注册未审核用户'
			},
			controller: 'ShipperRegnocheckController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/shipper/ShipperRegnocheckService.js'),
							__uri('/js/controllers/shipper/ShipperRegnocheckController.js')
						]
					}])
				}]
			}
		})
		// APP版本管理
		.state('manager.versionconfig', {
			abstract: true,
			url: "/versionconfig",
			template: "<ui-view/>",
		})
		// APP版本管理
		.state('manager.versionconfig.versionlist', {
			url: "/versionlist/:funcId",
			templateUrl: "views/version/VersionList.html",
			data: {
				pageTitle: ' APP版本管理'
			},
			controller: 'VersionController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/version/VersionService.js'),
							__uri('/js/controllers/version/VersionController.js')
						]
					}])
				}]
			}
		})
		// 订单管理
		.state('manager.orderconfig', {
			abstract: true,
			url: "/orderconfig",
			template: "<ui-view/>",
		})
		// 需求单管理
		//		.state('manager.orderconfig.orderdemandlist', {
		//			url: "/orderdemandlist/:funcId",
		//			templateUrl: "views/order/OrderDemandList.html",
		//			data: {
		//				pageTitle: ' 需求单管理'
		//			},
		//			controller: 'OrderDemandController',
		//			resolve: {
		//				deps: ['$ocLazyLoad', function($ocLazyLoad) {
		//					return $ocLazyLoad.load([{
		//						name: 'managerApp',
		//						insertbefore: "#ng_load_plugins_before",
		//						files: [
		//							__uri('/js/services/order/OrderDemandService.js'),
		//							__uri('/js/controllers/order/OrderDemandController.js')
		//						]
		//					}])
		//				}]
		//			}
		//		})
		// 全部订单管理
		.state('manager.orderconfig.orderalllist', {
			url: "/orderalllist/:funcId",
			templateUrl: "views/order/OrderAllList.html",
			data: {
				pageTitle: ' 全部订单管理'
			},
			controller: 'OrderAllController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/order/OrderAllService.js'),
							__uri('/js/controllers/order/OrderAllController.js')
						]
					}])
				}]
			}
		})
		// 异常签收订单管理
		.state('manager.orderconfig.orderabnormallist', {
			url: "/orderabnormallist/:funcId",
			templateUrl: "views/order/OrderAbnormalList.html",
			data: {
				pageTitle: ' 异常签收订单管理'
			},
			controller: 'OrderAbnormalController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/order/OrderAbnormalService.js'),
							__uri('/js/controllers/order/OrderAbnormalController.js')
						]
					}])
				}]
			}
		})
		// 已完成订单管理
		.state('manager.orderconfig.orderfinishlist', {
			url: "/orderfinishlist/:funcId",
			templateUrl: "views/order/OrderFinishList.html",
			data: {
				pageTitle: ' 已完成订单管理'
			},
			controller: 'OrderFinishController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/order/OrderFinishService.js'),
							__uri('/js/controllers/order/OrderFinishController.js')
						]
					}])
				}]
			}
		})
		//财务管理
		.state('manager.fundsconfig', {
			abstract: true,
			url: "/fundsconfig",
			template: "<ui-view/>",
		})
		.state('manager.fundsconfig.fundslist', {
			url: "/fundslist/:funcId",
			templateUrl: "views/funds/FundslistList.html",
			data: {
				pageTitle: '结算订单管理'
			},
			controller: 'FundsController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/funds/FundsService.js'),
							__uri('/js/controllers/funds/FundsController.js')
						]
					}])
				}]
			}
		})
		//日志管理
		.state('manager.logconfig', {
			abstract: true,
			url: "/logconfig",
			template: "<ui-view/>",
		})
		//操作日志管理
		.state('manager.logconfig.operationlist', {
			url: "/operationlist/:funcId",
			templateUrl: "views/log/OperationList.html",
			data: {
				pageTitle: '操作日志管理'
			},
			controller: 'OperationController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/log/OperationService.js'),
							__uri('/js/controllers/log/OperationController.js')
						]
					}]);
				}
			}
		})
		//异常日志管理
		.state('manager.logconfig.exceptionlist', {
			url: "/exceptionlist/:funcId",
			templateUrl: "views/log/ExceptionList.html",
			data: {
				pageTitle: '异常日志管理'
			},
			controller: 'ExceptionController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/log/ExceptionService.js'),
							__uri('/js/controllers/log/ExceptionController.js')
						]
					}]);
				}
			}
		})
		//APP崩溃日志管理
		.state('manager.logconfig.appcollapselist', {
			url: "/appcollapselist/:funcId",
			templateUrl: "views/log/AppCollapseList.html",
			data: {
				pageTitle: 'APP崩溃日志管理'
			},
			controller: 'AppCollapseController',
			resolve: {
				loadPlugin: function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/log/AppCollapseService.js'),
							__uri('/js/controllers/log/AppCollapseController.js')
						]
					}]);
				}
			}
		})
		//车辆管理档案
		.state('manager.filecarmconfig', {
			abstract: true,
			url: "/carconfig",
			template: "<ui-view/>",
		})
		.state('manager.filecarmconfig.filecarmlist', {
			url: "/filecarmlist/:funcId",
			templateUrl: "views/filecarm/FilecarmList.html",
			data: {
				pageTitle: '车辆管理档案'
			},
			controller: 'FilecarmController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/filecarm/FilecarmService.js'),
							__uri('/js/controllers/filecarm/FilecarmController.js')
						]
					}])
				}]
			}
		})
		.state('manager.filecarmconfig.financiallist', {
			url: "/financiallist/:funcId",
			templateUrl: "views/filecarm/FinancialList.html",
			data: {
				pageTitle: '财务档案管理'
			},
			controller: 'FinancialController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/filecarm/FinancialService.js'),
							__uri('/js/controllers/filecarm/FinancialController.js')
						]
					}])
				}]
			}
		})
		.state('manager.filecarmconfig.platformdriverlist', {
			url: "/platformdriverlist/:funcId",
			templateUrl: "views/filecarm/PlatformDriverList.html",
			data: {
				pageTitle: '平台司机档案管理'
			},
			controller: 'PlatformDriverController',
			resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
					return $ocLazyLoad.load([{
						name: 'managerApp',
						insertbefore: "#ng_load_plugins_before",
						files: [
							__uri('/js/services/filecarm/PlatformDriverService.js'),
							__uri('/js/controllers/filecarm/PlatformDriverController.js')
						]
					}])
				}]
			}
		})

}
angular
	.module('managerApp')
	.config(config)
	.run(function($rootScope, $state) {
		$rootScope.$state = $state;
	});