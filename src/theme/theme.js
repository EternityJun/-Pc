// 登录、全局权限、角色、用户、用户权限相关请求
import { methodGet } from './index'

const M = '/head/';

/* 1. 主题色相关 */

// 主题颜色获取GET
export function GET_THEME (params) {
  return methodGet(M + 'getThemeColor', params, true)
}

// 主题颜色设置GET
export function SET_THEME (params) {
  return methodGet(M + 'setThemeColor', params, true)
}
