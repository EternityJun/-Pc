import {Message} from 'element-ui'

/**
 *   json web token(jwt) 是基于JSON的一种开放标准
 *   koa koa-jwt
 */
const jwt = require('jsonwebtoken')
const Koa = require('koa')
const koaJwt = require('koa-jwt')
const app = new Koa()

/**
 * 定义签名
 * @type {string}
 */
const secret = 'cdkj-framework-jwt'

/**
 * 使用中间件验证 token 合法性
 * unless 指定哪些 URL 不需要进行 token 验证
 */
app.use(koaJwt({secret: secret}).unless({path: ['/', '/login', '/security/user/Login']}))

/**
 * 拦截器
 * 错误处理
 */
app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = 'invalid token...'
    } else {
      console.log(err)
    }
  })
})

export default {
  name: 'auth',
  data () {
    return {}
  },
  /**
   * 删除权限
   */
  removeAuth (key) {
    sessionStorage.removeItem(key)
  },
  /**
   * 删除全部
   */
  remove () {
    sessionStorage.clear()
  },
  /* 验证token */
  getAuth () {
    let that = this
    let token = sessionStorage.getItem('token')
    jwt.verify(token, secret, function (err) {
      if (err) {
        if (err.name === 'JsonWebTokenError') {
          Message({
            message: 'Token 错误，请重新登录',
            type: 'error',
            onClose: function () {
              that.backHomePage()
            }
          })
        }
        if (err.name === 'TokenExpiredError') {
          Message({
            message: 'Token 失效，请重新登录！',
            type: 'warning',
            onClose: function () {
              that.backHomePage()
            }
          })
        }
      }
    })

    // 返回 token 值
    return token
  },
  /**
   * 返回首页
   */
  backHomePage () {
    top.location.href = '/'
  },
  /**
   * 设置登录用户信息
   */
  setUserInfo (user, message) {
    localStorage.setItem('userInfo', JSON.stringify(user))
    try {
      let jsonObject = jwt.decode(message)
      let token = jsonObject['token']
      this.setAuth(user, token)
    } catch (e) {
      console.log(e)
    }
  },
  /**
   * 获取登录用户名称
   */
  getUserInfo () {
    let userInfo = sessionStorage.getItem('userInfo')
    return JSON.parse(userInfo)
  },
  /**
   * 设置并生成 token
   * @param data 必须为 JSON 对象
   */
  setAuth (data, key) {
    if (!key) {
      key = ''
    }
    let sign = {
      username: data.username,
      password: data.password,
      number: data.number,
      token: key
    }
    if (!data.number) {
      sign = {
        username: data.username,
        password: data.password,
        token: key
      }
    }
    // 生成 token
    const token = jwt.sign(sign, secret, {
      expiresIn: (24 * 60 * 60)
    })
    // 设置 token
    sessionStorage.setItem('token', token)
  },
  fullTime (times) {
    const time = times || ''
    const date = new Date(time)
    const dateObj = {}
    dateObj.getFullYear = date.getFullYear()
    dateObj.getMonth = date.getMonth() + 1
    dateObj.getDate = date.getDate()
    dateObj.getHours = date.getHours()
    dateObj.getMinutes = date.getMinutes()
    dateObj.getSeconds = date.getSeconds()
    dateObj.getTime = date.getTime()

    return dateObj
  }
}
