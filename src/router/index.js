import Vue from 'vue'
import Router from 'vue-router'
/**
 * 导入组件
 */
import Login from '@/components/views/Login'
import View from '@/View'

// 引入类目JS文件
import Category from './modules/category'

Vue.use(Router)

let routerList = [{
  path: '/',
  name: 'Login',
  component: Login,
  meta: {
    title: '登录'
  }
},
{
  path: '/main',
  name: 'main',
  component: View,
  children: [{
    path: 'index',
    component: resolve => require(['@/components/views/main/Index'], resolve),
    meta: {
      title: '首页',
      name: '首页'
    }
  }, {
    path: 'user',
    component: resolve => require(['@/components/views/main/user/userManagement'], resolve),
    meta: {
      title: '账户管理',
      name: '账户管理'
    }
  }, {
    path: 'role',
    component: resolve => require(['@/components/views/main/user/RoleManagement'], resolve),
    meta: {
      title: '角色管理',
      name: '角色管理'
    }
  }, {
    path: 'health',
    component: resolve => require(['@/components/views/main/health/HealthRecord'], resolve),
    meta: {
      title: '健康管理',
      name: '健康管理'
    }
  }, {
    path: 'menu',
    component: resolve => require(['@/components/views/main/menu/LeftMenuManagement'], resolve),
    meta: {
      title: '资源管理',
      name: '资源管理'
    }
  },
  {
    path: 'test',
    component: resolve => require(['@/components/views/main/menu/test'], resolve),
    meta: {
      title: '健康管理',
      name: '健康管理'
    }
  },
  {
    path: 'map',
    component: resolve => require(['@/components/views/main/map/map'], resolve),
    meta: {
      title: '健康管理',
      name: '健康管理'
    }
  }]
},
  Category
]

/**
 * 注册路由并设置为经典模式
 * @type {VueRouter} 类型
 */
const router = new Router({
  mode: 'history',
  routes: routerList
})

/**
 * 读取设置标题
 */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
    let keywords = to.meta.keyword || '测试'
    let description = to.meta.description || '测试'
    document.querySelector('meta[name="keywords"]').setAttribute('content', keywords)
    document.querySelector('meta[name="description"]').setAttribute('content', description)
  }
  next()
})

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

export default router