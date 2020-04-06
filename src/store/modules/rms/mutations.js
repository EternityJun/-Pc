import types from './types'
const muations = {
  [types.SET_USER_DATA]: (state, data) => {
    state.USER_DATA = data
  },
  [types.SET_INSERT_DATA]: (state, data) => {
    state.INSERT_DATA = data
  },
  [types.SET_MODIFY_DATA]: (state, data) => {
    state.MODIFY_DATA = data
  },
  [types.SET_ROLE_DATA]: (state, data) => {
    state.ROLE_DATA = data
  }
}
export default muations
