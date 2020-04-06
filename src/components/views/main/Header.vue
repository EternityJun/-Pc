<template>
  <div class="header_box">
    <h1>琅智智慧康养管理平台&nbsp;|&nbsp;医生登录</h1>
    <div class="user_info">
        <el-input class="search" suffix-icon="el-icon-search"/>
      <div class="avatar_box">
          <el-dropdown trigger='click' @command="handleCommand">
            <span class="el-dropdown-link">
              <el-avatar shape="circle" :size="50" :src="squareUrl"></el-avatar>                
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="personal">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">注销</el-dropdown-item>
            </el-dropdown-menu >
          </el-dropdown>
        <span>医生</span>
        <span class="nabla">▾</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
      }
    },
    methods:{
       //注销
      handleCommand(command){
        // const vm=this;
        // if(command==='logout'){ //注销操作
        //   //拿到本地存储的token
        //     const token=localStorage.getItem('token')
        //   //发送axios
        //     logOut(token).then(data=>{
        //       if(data.success){
        //         //清除本地存储
        //         localStorage.setItem('token','');
        //         vm.$router.replace('/login')
        //       }else{
        //         vm.$message(data.message)
        //       }
        //     })
        // }else if(command==='personal'){
        //   vm.$router.push('Personal')
        // }
      }
    }
  }
</script>

<style lang="less" scoped>

.header_box{
  width: 100%;
  display:flex;
  justify-content : space-between;
  align-items: center;
  h1{
    font-size: 26px;
    font-weight: normal;
  }
  .user_info{
    display:flex;
    align-items: center;
    /deep/ .el-input__icon{
      margin-right:10px;
      font-size: 20px; 
    }
    .search{
      width:226px;
      /deep/.el-input__inner {
        border-radius: 50px !important;
      }
    }
    .avatar_box{
      display: flex;
      align-items: center;
      .el-dropdown{
        margin:0 13px 0 59px;
        padding-top:20px; 
      }
      .nabla{
        margin:0 40px 0 22px;
      }
    }
  }

}
</style>