import actions from './actions'
import getters from './getters'
import mutations from './mutations'
const state = {
  loading: false,
  tableHeader: []
}

export default {
  namespace: true,
  state,
  actions,
  getters,
  mutations
}
