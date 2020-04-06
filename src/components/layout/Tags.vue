<template>
  <div class="tags">
    <div class="tags_scroll">
      <el-tabs v-model="editableTabsValue"
               type="card"
               @dblclick.native="refreshPage"
               @tab-click="switchTab"
               @tab-remove="tabRemove">
        <el-tab-pane v-for="(item, index) in tagsList"
          :key="index"
          :label="item.title"
          :name="item.name"
          :closable="item.closable"/>
      </el-tabs>
    </div>
    <el-dropdown class="tags_btn" @command="handleTags">
      <span class="tags_btn_link cursor_p c_FFFFFF"><i class="el-icon-arrow-down"></i></span>
      <el-dropdown-menu class="tags_btn_menu" slot="dropdown">
        <el-dropdown-item command="other">关闭其它</el-dropdown-item>
        <el-dropdown-item command="all">关闭所有</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tagsList: [],
      editableTabsValue: 'home'
    }
  },
  watch: {
    '$router' (newValue, oldValue) {
      console.log(newValue)
      this.setTags(newValue)
    }
  },
  computed: {
    showTags () {
      return this.tagsList.length > 0
    }
  },
  created () {
    this.init()
  },
  methods: {
    /**
     * 初始化数据
     */
    init () {
      let tag = {}
      tag['title'] = '首页'
      tag['name'] = 'index'
      tag['url'] = '/main/index'
      tag['id'] = 'index'
      tag['closable'] = false
      this.tagsList.push(tag)
    },
    loadTag (params) {
      let item = this.getTags(params.id)
      if (item && item.length > 0) {
        this.switchTab(params)
        return
      }
      params['closable'] = true
      this.editableTabsValue = params.name
      this.tagsList.push(params)
    },
    /**
     * 刷新页面
     */
    refreshPage (e) {
      let id = e.target.id.replace('tab-', '')
      let item = this.getTags(id)
      if (item) {
        this.$store.dispatch(item[0].url)
      }
    },
    /**
     * 删除e
     */
    tabRemove (e) {
      let item = this.getTags(e.id)
      if (item) {
        let index = this.tagsList.indexOf(item)
        this.tagsList.splice(index, 1)
        let currentItem = this.tagsList[index - 1]
        this.editableTabsValue = currentItem.name
        this.$router.push(currentItem.url)
      }
    },
    /**
     * 标签点击路由切换 呈高亮则不跳转路由
     * @param {String} _url 标签路由
     */
    switchTab (e, event) {
      let id = e['id']
      if (!id) {
        id = e.name
      }
      let item = this.getTags(id)[0]
      if (item) {
        this.editableTabsValue = item.name
        this.$router.push(item.url)
      }
    },
    /**
     * 标签高亮
     * @param {String} path 标签路由
     */
    isActive (path) {
      // 目标路由与标签路由相同  或者 目标路由父路由与标签路由相同 标签高亮显示
      return path === this.$route.path || this.$route.meta.parent === path
    },
    /**
     * 设置标签
     * @param {Object} route 路由对象
     */
    setTags (route) {
      let tag = {}
      tag['title'] = route.meta.name
      tag['name'] = route.meta.id
      tag['url'] = route.path
      tag['id'] = route.meta.id
      tag['closable'] = true
      this.tagsList.push(tag)
    },
    /**
     * 关闭全部标签
     */
    closeAll () {
      this.tagsList = []
      this.init()
    },
    /**
     * 关闭其他标签
     */
    closeOther () {
      const curItem = this.tagsList.filter(item => {
        return item.name === this.editableTabsValue || item.name === 'home'
      })
      this.tagsList = curItem
    },
    /**
     * 操作标签
     * @param {String} command 操作类型
     */
    handleTags (command) {
      command === 'other' ? this.closeOther() : this.closeAll()
    },
    /**
     * 获取 tag
     */
    getTags (_id) {
      return this.tagsList.filter(item => {
        return item.id === _id
      })
    }
  }
}
</script>
<style lang="less" scoped>

  /* tags begin */
  .tags {
    position: relative;
    height: 43px;
    line-height: 43px;
    font-size: 12px;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 4px 0px rgba(187, 187, 187, 0.5);
  }
  .tags .tabs-frame{
    height: calc(100vh - 100px);
    width: 100%;
    border: none;
    overflow: hidden;
  }
  .tags_scroll {
    display: inline-block;
    width: calc(100%);
    position: absolute;
    overflow: hidden;
    margin-top: 3px;
    height: 40px;
    line-height: 40px;
  }

  .tags_li {
    position: relative;
    display: inline-block;
    padding: 0px 16px;
    color: #999999;
  }

  .tags_li.active {
    color: #333333;
  }

  .tags_li:hover .el-icon-close {
    display: inline-block;
  }

  .tags_li .el-icon-close {
    position: absolute;
    display: none;
    font-weight: bold;
    color: #999999;
    margin-left: 4px;
    top: 11px;
    cursor: pointer;
  }

  .tags_li .el-icon-close:hover {
    color: #757575;
  }

  .tags_btn {
    float: right;
    width: 32px;
    text-align: center;
    border-left: 1px solid #DDDDDD;
  }

  .tags_btn_link {
    display: inline-block;
    width: 100%;
  }

  .tags_btn_menu {
    padding: 5px 0;

    .el-dropdown-menu__item {
      font-size: 12px;
      padding: 0 12px;
    }

    .el-dropdown-menu__item:not(.is-disabled):hover {
      background-color: #F5F7FA;
      color: #333;
    }
  }
  /* tags end */
</style>
<style>
  .el-tabs__header{
    margin: 0 !important;
  }
  .el-tabs__nav-scroll{
    padding-left: 5px !important;
  }
</style>
