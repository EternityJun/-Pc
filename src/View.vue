<template>
  <el-container>
      <el-header>
        <Loading v-if="loading"/>
        <layout-header @callBack="callBack"/></el-header>
    <el-container class="content-box">
      <el-aside v-if="leftDisplay"><layout-nav @createTabs="createTabs" :activeValue="activeValue"/></el-aside>
      <el-container>
      <el-main>
        <layout-tags ref="tags"/>
        <div class="content-main">
          <layout-main/>
        </div>
      </el-main>
    </el-container>
    </el-container>
  </el-container>
</template>

<script>
import layoutMain from '@/components/views/main/Main.vue'
import Loading from '@/components/layout/Loading.vue'
import layoutHeader from '@/components/layout/Header.vue'
import layoutNav from '@/components/layout/LeftNav.vue'
import layoutTags from '@/components/layout/Tags'
export default {
  components: {
    Loading,
    layoutHeader,
    layoutMain,
    layoutNav,
    layoutTags
  },
  name: 'App',
  data () {
    return {
      activeValue: '',
      editableTabsValue: 'home',
      tagList: [],
      leftDisplay: true
    }
  },
  mounted () {
    // 初始化
    this.init()
  },
  computed: {
  },
  methods: {
    init () {
    },
    /**
     * 创建标签
     */
    createTabs (params) {
      this.$refs['tags'].loadTag(params)
    },
    callBack (drawer) {
      this.leftDisplay = drawer
    }
  }
}
</script>

<style lang="less" scoped>
  .content-box{
    position: absolute;
    margin-top: 98px;
    height: calc(100%);
    width: calc(100%);
  }
  .content-main {
    height: calc(100% - 50px);
    width: calc(100%);
    overflow-y: auto;
  }
  .el-container {
    height: calc(100% - 40px);
  }
  .el-header{
    display: flex;
    background-color: #438afe;
    color: #fff;
    line-height: 60px;
    height:98px !important;
  }

  .el-aside {
    height: calc(100% - 40px);
    background-color: #fff;
    color: #333;
    width: 299px !important;
    border-right: solid 1px #e6e6e6;
    overflow: hidden;
  }
  .el-menu {
    border: none !important;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    padding:0;
    overflow: hidden;
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
