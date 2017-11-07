angular
	.module("managerApp")
	.factory("OrderFinishService", function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/order';
		return {
			//全部订单列表
			find: function(orderNo,carLicenseNo, orderStatus, payStatus, startTimeStr, endTimeStr, pageNo, pageSize) {
				var defer = $q.defer();
				var url = baseUrl + '/finishedorders?pageNo=' + pageNo + '&pageSize=' + pageSize;
				if(orderNo) {
					url += "&orderNo=" + orderNo;
				}
				if(carLicenseNo) {
					url += "&carLicenseNo=" + carLicenseNo;
				}
				if(payStatus) {
					url += "&payStatus=" + payStatus;
				}
				if(orderStatus) {
					url += "&orderStatus=" + orderStatus;
				}

				if(startTimeStr) {
					url += "&startTimeStr=" + startTimeStr;
				}
				if(endTimeStr) {
					url += "&endTimeStr=" + endTimeStr;
				}
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//订单详情
			detail: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/getfinished/' + id;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			}
		}
	})
