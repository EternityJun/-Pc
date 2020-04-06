<template>
  <div class="header">
    <header>
      <h1 class="logo-box">
        <router-link to="/index.html">WIKI教程文档 -- 技术为本</router-link>
      </h1>
      <div class="search">
        <el-input v-model="keyword" @keyup.enter.native="enterSearch" clearable prefix-icon="el-icon-search"
                  class="input-search" placeholder="输入搜索条件"/>
      </div>
    </header>
    <nav>
      <navMenu
      :modeName="modeName"
      :backgroundColor="backgroundColor"
      :textColor="textColor"
      :activeTextColor="activeTextColor"/>
    </nav>
  </div>
</template>

<script>
import navMenu from '@/components/layout/web/NavMenu'
export default {
  components: {
    navMenu
  },
  name: 'Header',
  data () {
    return {
      keyword: '',
      activeIndex: '',
      modeName: 'horizontal',
      backgroundColor: '#17baef',
      textColor: '#ffffff',
      activeTextColor: '#ffffff'
    }
  },
  mounted () {
  },
  computed: {},
  methods: {
    enterSearch (e) {
      this.$router.push('/wiki/search.html?keywords=' + e.target.value)
    }
  }
}
</script>

<style scoped>
  .header {
    height: 167px;
  }

  .header header {
    width: 1100px;
    height: 100px;
    margin: 0 auto;
  }

  .header .logo-box {
    background: url('~@/assets/images/logo.png');
    background-repeat: no-repeat;
    text-indent: -9999px;
    width: 400px;
    height: 77px;
    margin-top: 10px;
    display: block;
    float: left;
  }

  .header .search {
    width: 450px;
    float: right;
    height: 77px;
    margin-top: 10px;
    line-height: 77px;
  }

  .header nav{
    background: #17baef;
    width: 100%;
    height: 56px;
    overflow: hidden;
    text-align: center;
  }
  .header nav .el-menu-header{
    width: 1100px;
    margin: 0 auto;
  }
  .header nav .el-menu-header li.el-menu-item{
    float: left;
  }
</style>
