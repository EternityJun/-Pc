import types from './types'
import comTypes from '../com/types'
import {request} from '@/utils'
const actions = {
  findConstList: (context, data) => {
    context.commit(comTypes.SET_LOADING, true, {root: true})
    return request('/bms/const/findConstList', data).then(res => {
      context.commit(types.SET_CONST_DATA, res)
      context.commit(comTypes.SET_LOADING, false, {root: true})
    })
  },
  listAddress: (context, data) => {
    context.commit(comTypes.SET_LOADING, true, {root: true})
    return request('/bms/address/listAddress', data).then(res => {
      context.commit(types.SET_ADDRESS_DATA, res)
      context.commit(comTypes.SET_LOADING, false, {root: true})
    })
  }
}
export default actions
