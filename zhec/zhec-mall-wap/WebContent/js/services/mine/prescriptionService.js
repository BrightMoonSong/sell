/**
 * 系统用户service定义
 */
app
    .factory('prescriptionService',function($http,$q){
    	var baseUrl= constWapLapiLocation + '/orders';
	    return {
	    	//查询数据方法
	        find:function(memberId,currentPageSize,currentPageNo){
	            var defer = $q.defer();
	            var url = baseUrl+"/findrecipe?memberId="+memberId+"&pageSize="+currentPageSize+"&pageNo="+currentPageNo;;
	            $http({
	                method:'get',
	                url:url
	            }).success(function(data){
	            	defer.resolve(data);
	            }).error(function(data){
	            	defer.reject(data);
	            });
	            return defer.promise;
	        },     
	        
	    }
});