import actions from './actions'
import getters from './getters'
import mutations from './mutations'
const state = {
  loading: false,
  LOGIN_DATA: {}
}
const center = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}

export default center
