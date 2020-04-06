import types from './types'
import comTypes from '../com/types'
import { request, METHODS } from '@/utils'

const actions = {
  userLogin: (context, data) => {
    // context.commit(comTypes.SET_LOADING, true, { root: true })
    return request('/login', data).then(res => {
      /* store.commit 方法触发状态变更 */
      context.commit(types.USER_LOGIN, res)
      context.commit(comTypes.SET_LOADING, false, { root: true })
    })
  },
  getMenuAccountList: (context, data) => {
    // context.commit(comTypes.SET_LOADING, true, { root: true })
    return request('/bms/', data, METHODS.POST).then(res => {
      context.commit(types.Get_MENU, res)
      context.commit(comTypes.SET_LOADING, false, { root: true })
    })
  }
}
export default actions
