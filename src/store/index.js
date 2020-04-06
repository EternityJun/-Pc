import Vue from 'vue'
import Vuex from 'vuex'
import com from '@/store/modules/com'
import center from '@/store/modules/center'
import rms from '@/store/modules/rms'
import bms from '@/store/modules/bms'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    com,
    center,
    rms,
    bms
  }
})
