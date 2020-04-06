import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import element from 'element-ui'
import ehcarts from 'echarts'
/* 分享到 */
import vshare from 'vshare'
import 'element-ui/lib/theme-chalk/index.css'
import '@/icons'
Vue.prototype.$echarts = ehcarts
Vue.use(ehcarts)
Vue.use(element)
Vue.use(vshare)
/* 关闭生产模式下给出的提示 */
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
