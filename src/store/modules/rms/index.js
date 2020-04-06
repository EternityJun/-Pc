import actions from './actions'
import getters from './getters'
import mutations from './mutations'
const state = {
  USER_DATA: {},
  INSERT_DATA: {},
  MODIFY_DATA: [],
  ROLE_DATA: []
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
