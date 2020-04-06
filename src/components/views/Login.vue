<template>
    <div class="login_component">
        <div class="nlogin_left">
            <img src="../../assets/images/nlogin-main.png" alt/>
            <div class="title">
                <span>琅智智慧康养管理平台</span>
                <p>LANGZHI INTELLIGENT HEALTH MANAGEMENT PLATFORM</p>
            </div>
        </div>
        <el-col>
            <div class="loginContainer">
                <p class="logoBox">
                    <img src="../../assets/images/login/nlogin-logo.png" class="nlogo_logo"/>
                </p>
                <h4 class="fs18 mt30 f_w_normal">登录中心欢迎回来！</h4>
                <el-form :model="LoginFrom" :rules="rules" ref="LoginFrom">
                    <el-form-item prop="username">
                        <p class="c_1e">账号</p>
                        <el-input v-model="LoginFrom.username" placeholder="请输入账号" @keyup.enter.native="login"
                                  auto-complete="on" clearable>
                            <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <p class="c_1e">密码</p>
                        <el-input
                                v-model="LoginFrom.password"
                                type="password"
                                placeholder="请输入密码"
                                @keyup.enter.native="login"
                        >
                            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                        </el-input>
                    </el-form-item>
                    <!-- <el-form-item prop="verifyCode">
                        <p class="c_1e">验证码</p>
                        <div class="Verification_code_box">
                            <el-input
                                    v-model="LoginFrom.verifyCode"
                                    @keyup.enter.native="login"
                                    placeholder="请输入验证码">
                                <i slot="prefix" class="el-input__icon el-icon-chat-round"></i>
                            </el-input>
                            <img @click="verificationCode" class="Verificaion_code" :src="location_code" alt/>
                        </div>
                    </el-form-item> -->
                    <el-form-item>
                        <el-button type="primary" @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <p class="company_name">
                成都乐享智家科技责任公司 @2019
                <a class="c_1e" target="_blank" href="http://beian.miit.gov.cn/">蜀ICP备16033182号</a>
            </p>
        </el-col>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data () {
    return {
      // 表单相关
      LoginFrom: {
        username: '',
        password: '',
        // verifyCode: ''
      },
      rules: {
        username: [
          {required: true, message: '账号不能为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {min: 6, max: 16, message: '请输入6-16位密码', trigger: 'blur'}
        ],
        // verifyCode: [
        //   {required: true, message: '验证码不能为空', trigger: 'blur'},
        //   {min: 1, max: 4, message: '请输入4位验证码', trigger: 'blur'}
        // ]
      },
      /* 验证码地址 */
      code: '',
      location_code: ''
    }
  },
  created () {
    // this.verificationCode()
  },
  computed: {
      /* 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
        使用对象展开运算符将 getter 混入 computed 对象中
      */
    ...mapGetters('center', ['LOGIN_DATA']),
    ...mapGetters(['loading'])
  },
  methods: {
    ...mapActions('center', ['userLogin']),
    // 登录接口
    login () {
      let _this = this
      _this.$refs.LoginFrom.validate(valid => {
        if (valid) {
          let loginParams = _this.LoginFrom
        //   loginParams['number'] = _this.code
          _this.userLogin(loginParams).then(res => {
              let data = json.data
              _this.$message({
                message: '恭喜你,登陆成功！',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  // 跳转页面
                  this.$router.push('/main/index')
                }
              })
          })
        }
      })
    },
    /**
     * 验证码
     * @constructor
     */
    // verificationCode () {
    //   this.code = Math.random()
    //   this.location_code = '/security/verify/code?number=' + this.code
    // }
  }
}
</script>

<style scoped lang="css">
    .login_component {
        display: flex;
        background: #fff
    }

    .nlogin_left {
        position: relative
    }

    .nlogin_left img {
        width: 1026px
    }

    .title {
        position: absolute;
        bottom: 272px;
        left: 50px;
        color: #fff;
    }

    .title > span {
        display: block;
        font-size: 30px;
        line-height: 50px;
        padding-bottom: 5px;
    }

    .title > p {
        font-size: 16px;
        line-height: 20px;
    }

    .title:after {
        display: block;
        content: "";
        width: 70px;
        height: 3px;
        background-color: #fff;
        position: absolute;
        bottom: -50px;
    }

    .el-col {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .loginContainer {
        width: 430px;
        position: relative;
        top: -40px;
    }

    .logoBox {
        text-align: center;
    }

    .el-form {
        margin-top: 20px;
    }

    .el-input {
        height: 46px;
    }

    .el-button {
        width: 100%;
        height: 48px;
        font-size: 22px;
        background-color: rgba(67, 138, 257, 1);
    }

    .el-form-item {
        color: #b6b6b6;
        font-size: 16px;
        border-radius: 5px;
    }

    /* 登录表单样式 */
    .nlogo_logo {
        width: 149px;
        height: 149px;
        margin: 0 auto;
    }

    .Verification_code_box {
        display: flex;
    }

    .Verificaion_code {
        height: 40px;
        width: 140px;
        margin: 0 5px;
    }

    .company_name {
        position: absolute;
        width: 100%;
        bottom: 40px;
        text-align: center;
        color: #111;
        font-size: 12px;
    }

    .company_name a {
        color: #111;
        font-size: 12px;
        text-decoration: underline;
    }
</style>
