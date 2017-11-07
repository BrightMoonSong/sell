angular
	.module("managerApp")
	.factory("CarownerFeedBacksService", function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + '/carowner';
		var shipperBaseUrl = constMapiLocation + '/shipper';
		return {
			//意见反馈列表
			find: function(realName, phone, pageNo, pageSize) {
				var defer = $q.defer();
				var url = baseUrl + '/feedbacks?pageNo=' + pageNo + '&pageSize=' + pageSize;
				if(realName) {
					url += "&realName=" + realName;
				}
				if(phone) {
					url += "&phone=" + phone;
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
			//处理
			feedback: function(feedbackId,handleRemark) {
				var defer = $q.defer();
				var url = baseUrl + '/handlefeedback/' + feedbackId + '?handleRemark=' + handleRemark;
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
			//详情
			detail: function(feedbackId) {
				var defer = $q.defer();
				var url = baseUrl + '/feedback/' + feedbackId;
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
			// 货主
			//意见反馈列表
			shipperfind: function(realName, phone, pageNo, pageSize) {
				var defer = $q.defer();
				var url = shipperBaseUrl + '/feedbacks?pageNo=' + pageNo + '&pageSize=' + pageSize;
				if(realName) {
					url += "&realName=" + realName;
				}
				if(phone) {
					url += "&phone=" + phone;
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
			//处理
			shipperfeedback: function(feedbackId,handleRemark) {
				var defer = $q.defer();
				var url = shipperBaseUrl + '/handlefeedback/' + feedbackId + '?handleRemark=' + handleRemark;
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
			//详情
			shipperdetail: function(feedbackId) {
				var defer = $q.defer();
				var url = shipperBaseUrl + '/feedback/' + feedbackId;
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
