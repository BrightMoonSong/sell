/**
 * 指令定义
 */
function pageTitle($rootScope, $timeout) {
	return {
		link: function(scope, element) {
			var listener = function(event, toState, toParams, fromState, fromParams) {
				// Default title - load on Dashboard 1
				var title = '御草堂 | 平台管理';
				// Create your own title pattern
				if(toState.data && toState.data.pageTitle) title = '御草堂 | ' + toState.data.pageTitle;
				$timeout(function() {
					element.text(title);
				});
			};
			$rootScope.$on('$stateChangeStart', listener);
		}
	}
}

/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout) {
	return {
		restrict: 'A',
		link: function(scope, element) {
			// Call the metsiMenu plugin and plug it to sidebar navigation
			$timeout(function() {
				element.metisMenu();
			});
		}
	};
}

//删除数组指定的某个元素
Array.prototype.indexOf = function(val) {
	for(var i = 0; i < this.length; i++) {
		if(this[i] == val) return i;
	}
	return -1;
};
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if(index > -1) {
		this.splice(index, 1);
	}
};
String.prototype.numbian = function() {
	var a = this;
	var b;
	b = Number(a);
	return b;
};
//判断数组是否包含指定元素的方法
Array.prototype.contains = function(needle) {
	for(i in this) {
		if(this[i] == needle) return true;
	}
	return false;
};

/**
 * 价格过滤器
 */
String.prototype.priceFilter = function() {
	price = this;
	price = price.toString();
	var re = /\d+\.[0-9]/g; //判断数字是否为小数
	if(!re.test(price)) {
		price = price + ".00";
	} else {
		if(price.toString().split(".")[1].length == 1) {
			price = price + "0";
		} else if(price.toString().split(".")[1].length > 2) {
			price = Math.round(parseFloat(price) * 100) / 100;
		}
	}
	return price;
};
Number.prototype.priceFilternum = function() {
	price = this;
	price = price.toString();
	var re = /\d+\.[0-9]/g; //判断数字是否为小数
	if(!re.test(price)) {
		price = price + ".00";
	} else {
		if(price.toString().split(".")[1].length == 1) {
			price = price + "0";
		} else if(price.toString().split(".")[1].length > 2) {
			price = Math.round(parseFloat(price) * 100) / 100;
		}
	}
	return price;
};
//比较时间JS：
String.prototype.comp = function() {
	var date = this;
	var now = new Date;
	var d = new Date(date);
	if(now > d) {
		//alert("之前的日期");
		return false;
	} else if(now < d) {
		//alert("之后的日期");
		return true;
	} else {
		//alert("一样的日期");
		return false;
	}
}

//比较俩个时间JS：
String.prototype.comps = function(time) {
	var date = this;
	var now = new Date(time);
	var d = new Date(date);
	if(now > d) {
		return false;
	} else if(now < d) {
		return true;
	} else {
		return false;
	}
}

//js数组去重的算法实现   思路：获取没重复的最右一值放入新数组 
function unique(array) {
	var r = [];
	for(var i = 0, l = array.length; i < l; i++) {
		for(var j = i + 1; j < l; j++)
			if(array[i] === array[j]) j = ++i;
		r.push(array[i]);
	}
	return r;
}

//针对引用数据类型    克隆
function clone(obj) {
	var o, i, j, k;
	if(typeof(obj) != "object" || obj === null) return obj;
	if(obj instanceof(Array)) {
		o = [];
		i = 0;
		j = obj.length;
		for(; i < j; i++) {
			if(typeof(obj[i]) == "object" && obj[i] != null) {
				o[i] = arguments.callee(obj[i]);
			} else {
				o[i] = obj[i];
			}
		}
	} else {
		o = {};
		for(i in obj) {
			if(typeof(obj[i]) == "object" && obj[i] != null) {
				o[i] = arguments.callee(obj[i]);
			} else {
				o[i] = obj[i];
			}
		}
	}

	return o;
}

//滚动条回到顶部
function myScroll() {
	//前边是获取chrome等一般浏览器 如果获取不到就是ie了 就用ie的办法获取 
	var x = document.body.scrollTop || document.documentElement.scrollTop;
	var timer = setInterval(function() {
		x = x - 100;
		if(x < 100) {
			x = 0;
			window.scrollTo(x, x);
			clearInterval(timer);
		}
		window.scrollTo(x, x);
	}, "250");

	$('#ngdialog1').animate({
		scrollTop: 0
	}, 1); //回到顶端
}

/**
 *
 * Pass all functions into module
 */
app.directive('pageTitle', pageTitle)
	.directive('sideNavigation', sideNavigation)
	.filter('trust2Html', ['$sce', function($sce) {
		return function(val) {
			return $sce.trustAsHtml(val);
		};
	}]);
	
app.directive('lunbo', function() {
	return {
		restrict: 'EA',
		templateUrl: 'lunbo.html',
		scope: {},
		link: function(scope, element, attr) {
			scope.$parent.findImages()
				.then(
					function(result) {
						//scope.images = scope.$parent.images;
						scope.step = 0;
						var imagesLength = scope.$parent.images.length;
						scope.dataImg = scope.$parent.images[0];
						scope.timerSetInterval = function() {
							scope.timer = setInterval(function() { //开启定时器
								scope.step++;
								scope.step = scope.step % imagesLength;
								scope.dataImg = scope.$parent.images[scope.step];
								//强行进行脏值检查
								scope.$apply();
							}, 1500);
						}
						scope.timerSetInterval();
						scope.focusBannerStep = function(n) {
							scope.step = n;
							scope.dataImg = scope.$parent.images[scope.step];
							clearInterval(scope.timer); //清除定时器
						}
					},
					function(result) {

					})
		}
	}
});