/* 引入请求类型名字 */
import comTypes from './types'
import {request, METHODS} from '@/utils/index'

const actions = {
  loadTableHeader: (context, data) => {
    context.commit(comTypes.SET_LOADING, true)
    return request('/rebate/table/header', data, METHODS.POST).then(res => {
      context.commit(comTypes.POST_TABLE_HEADER, res)
      context.commit(comTypes.SET_LOADING, false, {root: true})
    })
  }
}
export default actions
