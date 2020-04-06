import types from './types'
const muations = {
  [types.SET_LOADING]: (state, loading) => {
    state.loading = loading
  },
  [types.USER_LOGIN]: (state, data) => {
    state.LOGIN_DATA = data
  },
  [types.Get_MENU]: (state, data) => {
    state.Get_MENU = data
  }
}
export default muations
