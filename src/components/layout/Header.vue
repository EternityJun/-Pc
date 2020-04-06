<template>
    <div class="header_box">
        <div class="header_left">
            <div class="Logo_box">
                <span class="logo_img">
                    <img src="../../assets/images/login/logo.png"/>
                </span>
                <span @click="openDrawer">
                    <img :class="logoClass" src="../../assets/images/some_icon.png" alt="">
                </span>
            </div>
            <h1>琅智智慧康养管理平台&nbsp;|&nbsp;{{addUserName}}登录</h1>
        </div>
        <div class="user_info">
						<el-popover
							placement="top-start"
							title="标题"
							width="100"
							trigger="hover"
							content="这是一段内容,这是一段内容。">
							 <div slot="reference">
									<el-badge :value="12" class="item">
									<img src="../../assets/images/header/bell_icon.png">
									</el-badge>
								</div>
						</el-popover>
            <div class="avatar_box">
                <el-dropdown trigger='click' @command="handleCommand">
                    <span class="el-dropdown-link">
                        <el-avatar shape="circle" :size="50" :src="squareUrl"></el-avatar>
                    </span>
                    <el-dropdown-menu style="top:80px !important" slot="dropdown">
                    <el-dropdown-item command="modifiPwd">修改密码</el-dropdown-item>
                    <el-dropdown-item command="modifiPhoto">修改照片</el-dropdown-item>
                    <el-dropdown-item command="logout">注销</el-dropdown-item>
                    </el-dropdown-menu >
                </el-dropdown>
                <span>{{loginName}}</span>
                <span class="nabla">▾</span>
            </div>
        </div>
    </div>
</template>

<script>
import square from '../../assets/images/header/医生头像.png'
export default {
  data () {
    return {
      squareUrl: square,
      drawer: true,
      logoClass: 'icon',
	  visible: false,
      loginName:'',
      addUserName:''
    }
  },
  created () {
    let leftMenu=localStorage.getItem('leftMenu');
    let leftMenuList=JSON.parse(leftMenu)
    this.loginName=leftMenuList.loginName
    this.addUserName=leftMenuList.addUserName
  },
  methods: {
    // 注销
    handleCommand (command) {
    },
    openDrawer (e) {
      if (this.drawer) {
        this.logoClass = 'icon logo_img_transform'
      } else {
        this.logoClass = 'icon'
      }
      this.drawer = !this.drawer
      this.$emit('callBack', this.drawer)
    },

  }
}
</script>

<style lang="less" scoped>
    .logo_img_transform{
        -moz-transform:rotate(-180deg);
        -webkit-transform:rotate(-180deg);
        filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=6);
    }
    .header_box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .header_left {
            display: flex;

            .Logo_box {
                display: flex;
                justify-content: space-between;
                height: 98px;
                line-height: 54px;
                background: #438afe;

                span {
                    display: flex;
                    align-items: center;

                    .icon {
                        width: 36px;
                        height: 31px;
                        cursor: pointer;
                    }
                }

                .logo_img {
                    margin: 0 15px;
                }
            }

            h1 {
                font-size: 26px;
                font-weight: normal;
                display: flex;
                align-items: center;
                padding: 0 30px;
            }
        }

        .user_info {
            display: flex;
            align-items: center;
            .el-badge{
                display:flex;
                align-items:center;
            }
            /deep/ .el-input__icon {
                margin-right: 10px;
                font-size: 20px;
            }

            .search {
                width: 226px;

                /deep/ .el-input__inner {
                    border-radius: 50px !important;
                }
            }

            .avatar_box {
                display: flex;
                align-items: center;

                .el-dropdown {
                    margin: 0 13px 0 72px;
                    padding-top: 20px;
                }
                .el-avatar{
                    background-color:#fff;
                }
                .nabla {
                    margin: 0 40px 0 22px;
                }
            }
        }

    }
</style>
