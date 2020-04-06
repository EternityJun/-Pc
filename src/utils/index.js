import axios from 'axios'
import {Message} from 'element-ui'
// import auth from '../store/auth'
// import encryption from '../assets/scripts/utils'

const env = process.env /* 返回一个包含用户环境信息的对象 */
const isDev = env !== 'production'

axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return error
  }
)
/* axios 拦截器 响应 */
axios.interceptors.response.use(res => {
  if (res.status !== 200) {
    Message({
      message: '200!',
      type: 'error'
    })
  } else if (res.data.code === 900) {
    Message({
      message: res.data.message,
      type: 'error',
      onClose: function () {
        top.location.href = '/'
      }
    })
  } else {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(res)
      }, 1000)
    })
  }
})

/* 跨域访问需要发送cookie时一定要加 */
axios.defaults.withCredentials = true

// axios.defaults.baseURL = isDev ? '' : ''
axios.defaults.baseURL = process.env.API_ROOT

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  OPTIONS: 'OPTIONS',
  FILE: 'FILE',
  EXPORT: 'EXPORT'
}
export const request = (
  api, /* 地址 */
  params, /* 参数 */
  methods = METHODS.POST, /* 默认请求方式 */
  contentType = 'application/json', /* contentType（数据格式） 默认application/json（JSON数据格式） */
  jsonType = true /* 默认序列化json格式 */
) => {
  const requestOptions = {
    url: api,
    method: methods,
    headers: {
      'X-Requested-With': 'XMLHttpRequest', /* 如果 requestedWith 为 null，则为同步请求。 如果 requestedWith 为 XMLHttpRequest 则为 Ajax 请求 */
      'Access-Control-Allow-Origin': '*', /* 标识允许哪个域的请求 */
      'Access-Control-Allow-Headers': 'X-Requested-With', /* 此项在请求头包含时必须响应 */
      'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
      // 'token': auth.getAuth(),
      'Content-Type': contentType
    },
    withCredentials: true /* 前端跨域设置 */
  }
  params = params || {} /* 用户不传参数处理 */
  let parameter = params // encryption.encrypt(JSON.stringify(params)) 加密
  switch (methods) { /* 请求方式状态处理 */
    case 'GET':
      requestOptions.params = parameter
      requestOptions.paramsSerializer = function (parameter) {
        return parameter
      }
      break
    case 'FILE':
      requestOptions.method = METHODS.POST
      let sBoundary = '---------------------------' + Date.now().toString(16)
      requestOptions.headers['Content-Type'] = 'multipart/form-data; boundary=' + sBoundary
      requestOptions.data = params
      break
    case 'EXPORT':
      requestOptions.method = METHODS.POST
      requestOptions.responseType = 'blob'
      requestOptions.data = parameter
      break
    default:
      requestOptions.data = parameter
      break
  }
  /* 返回axios请求响应数据 */
  return axios(requestOptions).then(function (res) {
    return JSON.parse(res.data)
  }, function () {
    return null
  })
}
