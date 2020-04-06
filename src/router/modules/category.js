import View from '@/View'
let routerList = {
    path: '/category',
    component: View,
    children: [{
        path: 'index', // 运输订单管理
        name: 'category',
        component: resolve => require(['@/components/views/category/Index'], resolve),
        meta: {
            title: '慧慧返利管理系统后台 - 类目管理',
            name: '类目管理',
            id: 'categoryIndex'
        }
    }]
}

export default routerList