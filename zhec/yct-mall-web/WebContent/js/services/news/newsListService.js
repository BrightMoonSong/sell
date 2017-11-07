app.factory('newsListService', function($q, $http, constMapiLocation) {
	var baseUrl = constMapiLocation + '/news';
	return{
		//新闻列表
		//192.168.1.50:8080/yucaotang/web/news/findnews?type=1 
		findnews:function(type){
			var defer = $q.defer();
			var url = baseUrl + '/findnews?type=' +type;
			$http({
				method:'get',
				url:url
			}).success(function(data) {
				defer.resolve(data);
			}).error(function(data) {
				defer.reject(data);
			});
			return defer.promise;
		},	
		//详情
		newsdetail: function(newsId) {
			var defer = $q.defer();
			var url = baseUrl + '/newsdetail?newsId=' + newsId;
			$http({
				method: 'get',
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