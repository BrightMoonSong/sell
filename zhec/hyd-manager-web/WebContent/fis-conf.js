// fis.match('::packager', {
//   spriter: fis.plugin('csssprites')
// });

// fis.match('*', {
//   useHash: false
// });

// fis.match('*.js', {
//   optimizer: fis.plugin('uglify-js')
// });

// fis.match('*.css', {
//   useSprite: true,
//   optimizer: fis.plugin('clean-css')
// });

// fis.match('*.png', {
//   optimizer: fis.plugin('png-compressor')
// });
// 启用 fis-spriter-csssprites 插件
/**
fis.match('::package', {
    spriter: fis.plugin('csssprites')
});
*/
//,zhecConfig.js
fis.match('/js/{controllers/**.js,services/**.js,app.js,router.js,appLogin.js,CommonFilter.js,controllers.js,config.js,directives.js,initview.js,interceptor.js}', {
	// 开启压缩
  	useHash: true,
  	// fis-optimizer-uglify-js 插件进行压缩，已内置
	optimizer: fis.plugin('uglify-js')
});

fis.match('/css/**.css', {
	useHash: true,
	// fis-optimizer-clean-css 插件进行压缩，已内置
	optimizer: fis.plugin('clean-css')
});
fis.match('/img/**.{png,gif}', {
	useHash: false
});
// 配置配置文件，注意，清空所有的配置，只留下以下代码即可。
/**
fis.match('**.{png,gif,js,css,otf,eot,svg,ttf,woff,woff2}', {
	release: '/dist/$0'
});*/
fis.config.set('settings.optimizer.uglify-js', {
	// 关闭变量名混淆
	mangle: false
});
/**
fis.match('*.html', {
  optimizer: fis.plugin('html-compress')
});*/
