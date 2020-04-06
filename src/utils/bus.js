import Vue from 'vue'

const Bus = new Vue();
Vue.prototype.$bus = Bus

export default Bus