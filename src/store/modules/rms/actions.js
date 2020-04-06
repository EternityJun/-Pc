import types from './types'
import comTypes from '../com/types'
import {request} from '@/utils'

const actions = {
  findRmsUserPageList: (context, data) => {
    context.commit(comTypes.SET_LOADING, true, {root: true})
    return request('/rms/user/findRmsUserPageList', data).then(res => {
      context.commit(types.SET_USER_DATA, res)
      context.commit(comTypes.SET_LOADING, false, {root: true})
    })
  },
  insertRmsUser: (context, data) => {
    context.commit(comTypes.SET_LOADING, true, {root: true})
    return request('/rms/user/insertRmsUser', data).then(res => {
      context.commit(types.SET_INSERT_DATA, res)
      context.commit(comTypes.SET_LOADING, false, {root: true})
    })
  },
  modifyRmsUser: (context, data) => {
    context.commit(comTypes.SET_LOADING, true, {root: true})
    return request('/rms/user/modifyRmsUser', data).then(res => {
      context.commit(types.SET_INSERT_DATA, res)
      context.commit(comTypes.SET_LOADING, false, {root: true})
    })
  },
  listRole: (context, data) => {
    context.commit(comTypes.SET_LOADING, true, {root: true})
    return request('/rms/role/listRole', data).then(res => {
      context.commit(types.SET_ROLE_DATA, res)
      context.commit(comTypes.SET_LOADING, false, {root: true})
    })
  },
  modifyPassword: (context, data) => {
    context.commit(comTypes.SET_LOADING, true, {root: true})
    return request('/rms/user/modifyPassword', data).then(res => {
      context.commit(types.SET_MODIFY_DATA, res)
      context.commit(comTypes.SET_LOADING, false, {root: true})
    })
  }
}
export default actions
