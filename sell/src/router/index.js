import Vue from 'vue';
import Router from 'vue-router';
// import Goods from '@/components/goods/goods';
// import Ratings from '@/components/ratings/ratings';
// import Seller from '@/components/sellers/seller';

// import Home from '@/page/home';
import NotFound from '@/page/404';
// import User from '@/page/user/user';
// import Role from '@/page/role/role';
import Login from '@/page/login/login';
// import Carmodellist from '@/page/carmodel/carmodellist';

// Vue.use()安装插件，在这里是安装路由模块
Vue.use(Router);

export default new Router({
  // 由于router自动生成的默认的选中的是class：router-link-active太长，可以用该方法改变其默认className
  linkActiveClass: 'active',
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: Home
    //   这里就是二级路由的配置
    //   children: [{
    //       path: '/home/user/:funcId',
    //       name: 'user',
    //       component: User
    //     },
    //     {
    //       path: '/home/role/:funcId',
    //       name: 'role',
    //       component: Role
    //     },
    //     {
    //       path: '/home/carmodellist/:funcId',
    //       name: 'carmodellist',
    //       component: Carmodellist
    //     }
    //   ]
    // }
  ]
});
