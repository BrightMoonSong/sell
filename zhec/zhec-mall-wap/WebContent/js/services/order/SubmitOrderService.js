app.factory('SubmitOrderService', function($q, $http) {
	var baseUrl = constWapLapiLocation + '/member';
	var baseUrl2 = constWapLapiLocation + '/orders';
	var baseUrl3 = constWapLapiLocation + '/area';
	return {
		//获取会员的收货信息
		findaddress: function(memberId) {
			var defer = $q.defer();
			var url = baseUrl + "/findaddress?memberId=" + memberId;
			$http({
				method: 'get',
				url: url
			}).success(function(data) {
				defer.resolve(data);
			}).error(function(data) {
				defer.reject(data);
			});
			return defer.promise;
		},
		//获取一级区域列表
		findtoplevelareas: function() {
			var defer = $q.defer();
			var url = baseUrl3 + '/findtoplevelareas';
			$http({
				method: 'get',
				url: url
			}).success(function(data) {
				defer.resolve(data);
			}).error(function(data) {
				defer.reject(data);
			});
			return defer.promise;
		},
		//获取单条收货人信息
		getaddress: function(id) {
			var defer = $q.defer();
			var url = baseUrl + '/getaddress/' + id;
			$http({
				method: 'get',
				url: url
			}).success(function(data) {
				defer.resolve(data);
			}).error(function(data) {
				defer.reject(data);
			});
			return defer.promise;
		},
		//根据pid获取下级区域列表
		findareasbypid: function(id) {
			var defer = $q.defer();
			var url = baseUrl3 + '/findareasbypid/' + id;
			$http({
				method: 'get',
				url: url
			}).success(function(data) {
				defer.resolve(data);
			}).error(function(data) {
				defer.reject(data);
			});
			return defer.promise;
		},
		//根据memberID获取商品列表
		findsubmitproducts: function(orderSource, memberId) {
			var defer = $q.defer();
			var url = baseUrl2 + '/findsubmitproducts?orderSource=' + orderSource + '&memberId=' + memberId;
			$http({
				method: 'get',
				url: url
			}).success(function(data) {
				defer.resolve(data);
			}).error(function(data) {
				defer.reject(data);
			});
			return defer.promise;
		},
		//添加收货信息
		addaddress: function(res) {
			var defer = $q.defer();
			var url = baseUrl + '/addaddress';
			$http({
				method: 'post',
				url: url,
				data: res
			}).success(function(data) {
				defer.resolve(data);
			}).error(function(data) {
				defer.reject(data);
			});
			return defer.promise;
		},
		//修改收货信息
		editaddress: function(res) {
			var defer = $q.defer();
			var url = baseUrl + '/editaddress';
			$http({
				method: 'put',
				url: url,
				data: res
			}).success(function(data) {
				defer.resolve(data);
			}).error(function(data) {
				defer.reject(data);
			});
			return defer.promise;
		},
		//提交订单
		submit: function(res, submitType) {
			var defer = $q.defer();
			var url = baseUrl2 + '/submit?submitType=' + submitType;
			$http({
				method: 'post',
				url: url,
				data: res
			}).success(function(data) {
				defer.resolve(data);
			}).error(function(data) {
				defer.reject(data);
			});
			return defer.promise;
		},
		finddirectpurchaseproducts: function(orderSource, consultantId, productId, productCount, memberId) {
			var defer = $q.defer();
			var url = baseUrl2 + '/finddirectpurchaseproducts?orderSource=' + orderSource + '&consultantId=' + consultantId + '&productId=' + productId + '&productCount=' + productCount + '&memberId=' + memberId;
			$http({
				method: 'get',
				url: url
			}).success(function(data) {
				defer.resolve(data);
			}).error(function(data) {
				defer.reject(data);
			});
			return defer.promise;
		},
		//获取最后一次的发票信息
		getlastinvoice: function(memberId) {
			var defer = $q.defer();
			var url = baseUrl2 + '/getlastinvoice?memberId=' + memberId;
			$http({
				method: 'get',
				url: url
			}).success(function(data) {
				defer.resolve(data);
			}).error(function(data) {
				defer.reject(data);
			});
			return defer.promise;
		},
		//添加发票信息
		addInvoice: function(res) {
			var defer = $q.defer();
			var url = baseUrl2 + '/addInvoice';
			$http({
				method: 'post',
				url: url,
				data: res
			}).success(function(data) {
				defer.resolve(data);
			}).error(function(data) {
				defer.reject(data);
			});
			return defer.promise;
		},
		//setdefault  设为默认地址
		setdefault: function(addressId, memberId) {
			var defer = $q.defer();
			var url = baseUrl + '/setdefault?addressId=' + addressId + '&memberId=' + memberId;
			$http({
				method: 'put',
				url: url
			}).success(function(data) {
				defer.resolve(data);
			}).error(function(data) {
				defer.reject(data);
			});
			return defer.promise;
		}
	}
})