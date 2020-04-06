<template>
    <el-container>
    <el-aside><Aside/></el-aside>
    <el-container>
      <el-header><Header/></el-header>
      <el-main><Main/></el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Main from '@/components/views/main/Main.vue'
  import Header from '@/components/views/main/Header.vue'
  // import Aside from '@/components/views/main/Aside.vue'
  import Aside from '@/components/layout/LeftNav.vue'
  export default {
    components:{
      Main,
      Header,
      Aside
    }
  }
</script>

<style lang="less" scoped>
  .el-container {
    height:100%;
  }
 .el-header{
   display: flex;
    background-color: #438afe;
    color: #fff;
    line-height: 60px;
    height:98px !important;
  }
  
  .el-aside {
    background-color: #fff;
    color: #333;
    width:320px !important;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    padding:0;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>