<template>
    <el-menu
    router
    unique-opened
    :style="styleName"
    :collapse="nav.isCollapse"
    :default-active="$route.path"
    :default-openeds="nav.openeds"
    :active-text-color="activeTextColor"
    :background-color="backgroundColor"
    :text-color="textColor"
    :mode="modeName"
    :class="className">
        <el-menu-item v-for="item in menuList" :key="item.id" :index="item.linkUrl">
            <template slot="title">
                <i :class="item.icon" v-if="modeName !== 'horizontal'"></i>
                <span>{{ item.menuName }}</span>
            </template>
        </el-menu-item>
    </el-menu>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'LeftNav',
  data () {
    return {
      nav: {
        isCollapse: false,
        uniqueOpened: false,
        openeds: [],
        activeUrl: ''
      },
      leftNav: '',
      navList: [],
      menuList: []
    }
  },
  props: {
    styleName: {
      type: String,
      default: 'height:60px;'
    },
    activeValue: {
      type: String,
      default: ''
    },
    textColor: {
      type: String,
      default: '#ffffff'
    },
    activeTextColor: {
      type: String,
      default: '#FFD04B'
    },
    backgroundColor: {
      type: String,
      default: '#17baef'
    },
    className: {
      type: String,
      default: 'el-menu-header'
    },
    modeName: {
      type: String,
      default: 'vertical'
    }
  },
  computed: {
    ...mapGetters('main', ['menuAccountList'])
  },
  mounted () {
    let that = this
    that.$nextTick(() => {
      that.init()
    })
  },
  methods: {
    ...mapActions('main', ['getMenuAccountList']),
    init () {
      let children = {}
      children['id'] = '1234'
      children['icon'] = 'el-icon-document'
      children['linkUrl'] = '/index.html'
      children['menuName'] = '首页'
      this.menuList.push(children)
      let menu = {}
      menu['id'] = '123'
      menu['icon'] = 'el-icon-document'
      menu['linkUrl'] = ''
      menu['menuName'] = '测试菜单'
      menu['children'] = []
      menu.children.push(children)
      children = {}
      children['id'] = '1234'
      children['icon'] = 'el-icon-document'
      children['linkUrl'] = '/main/index'
      children['menuName'] = '子菜单2'
      menu.children.push(children)
      this.menuList.push(menu)
    },
    /**
     * 创建标签
     */
    createTabs (e) {
      let params = {}
      this.activeUrl = e.index
      params['index'] = e.index
      params['url'] = e.index
      params['id'] = e.$attrs.id
      params['name'] = e.$attrs.id
      params['title'] = e.$attrs.title
      // this.$emit('createTabs', params)
    },
    loadMenuList () {

    },
    /**
     * 菜单高亮
     * @param {Object} path 路由地址
     */
    isActive (path) {
      let result = this.activeUrl === path || path === this.activeValue
      this.activeUrl = ''
      return result
    }
  }
}
</script>

<style scoped>
.el-menu{
    border: none
}
</style>
