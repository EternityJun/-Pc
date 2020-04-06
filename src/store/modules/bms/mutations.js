import types from './types'
const muations = {
  [types.SET_CONST_DATA]: (state, data) => {
    state.CONST_DATA = data
  },
  [types.SET_ADDRESS_DATA]: (state, data) => {
    state.ADDRESS_DATA = data
  }
}
export default muations
