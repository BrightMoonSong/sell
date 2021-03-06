angular
	.module("managerApp")
	.factory("ShipperNotService", function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/shipper';
		return {
			//待审核列表
			find: function(realName, phone, startTime, pageNo, pageSize) {
				var defer = $q.defer();
				var url = baseUrl + '/notpasschecks?pageNo=' + pageNo + '&pageSize=' + pageSize;
				if(realName) {
					url += "&realName=" + realName;
				}
				if(phone) {
					url += "&phone=" + phone;
				}
				if(startTime) {
					url += "&startTime=" + startTime;
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
			//详情
			detail: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/get/' + id;
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
			//详情
			enable: function(id,status) {
				var defer = $q.defer();
				var url = baseUrl + '/updatestatus/' + id + '?status=' + status;
				$http({
					method: 'put',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data);
				})
				return defer.promise;
			},
			//货主审核
			seach:function(shipperId,pageNo,pageSize){
				var defer = $q.defer();
				var url = baseUrl + '/checks?shipperId=' + shipperId + '&pageNo='+ pageNo + '&pageSize=' + pageSize;
				$http({
					method:'get',
					url:url
				}).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				})
				return defer.promise;
			}
			
		}
	})