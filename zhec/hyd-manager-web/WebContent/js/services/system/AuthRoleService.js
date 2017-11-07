angular
	.module("managerApp")
	.factory("AuthRoleService", function($q, $http, constMapiLocation) {
		var baseUrl = constMapiLocation + "/role";
		return {
			//角色条件查询分页列表
			find: function(roleName, scope, pageNo, pageSize) {
				var defer = $q.defer();
				var url = baseUrl + "/find?pageNo=" + pageNo + "&pageSize=" + pageSize;
				if(roleName) {
					url += "&roleName=" + roleName;
				}
				if(scope) {
					url += "&scope=" + scope;
				}
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//添加角色
			add: function(auth) {
				var defer = $q.defer();
				var url = baseUrl + '/add';
				$http({
					method: 'post',
					url: url,
					data: auth
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//角色详情
			detail: function(id) {
				var defer = $q.defer();
				var url = baseUrl + '/get/' + id;
				$http({
					method: 'get',
					url: url,
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//修改角色
			edit: function(auth) {
				var defer = $q.defer();
				var url = baseUrl + '/update';
				console.log(url);
				$http({
					method: 'put',
					url: url,
					data: auth
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//启禁用角色---2删除
			enable: function(id, status) {
				var defer = $q.defer();
				var url = baseUrl + '/updatestatus/' + id + "?status=" + status;
				$http({
					method: 'put',
					url: url,
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//给角色赋权限
			addrolefunctions: function(res, scope) {
				var defer = $q.defer();
				var url = baseUrl + '/addrolefunctions?scope=' + scope;
				$http({
					method: 'post',
					url: url,
					data: res
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//根据scope列出其所有可选权限
			findscopeallfunctions: function(scope) {
				var defer = $q.defer();
				var url = baseUrl + '/findscopeallfunctions?scope=' + scope;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			},
			//通过角色ID查询角色拥有的相应权限列表
			getrolefunctions: function(roleId) {
				var defer = $q.defer();
				var url = baseUrl + '/getrolefunctions/' + roleId;
				$http({
					method: 'get',
					url: url
				}).success(function(data) {
					defer.resolve(data);
				}).error(function(data) {
					defer.reject(data)
				})
				return defer.promise;
			}
		}
	})
