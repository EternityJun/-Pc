import comTypes from './types'
const muations = {
  [comTypes.SET_LOADING]: (state, loading) => {
    state.loading = loading
  },
  [comTypes.POST_TABLE_HEADER]: (state, data) => {
    state.tableHeader = data.data
  }
}
export default muations
