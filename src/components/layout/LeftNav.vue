<template>
  <el-aside style="margin-top:50px">
    <div class="sidebar">
        <div class="menu_scroll">
        <el-scrollbar>
          <el-menu
            router 
            unique-opened
            :style="navHeight"
            :collapse="nav.isCollapse"
            :default-active="$route.path"
            :default-openeds="nav.openeds"
            :active-text-color="activeTextColor"
            :background-color="backgroundColor"
            :text-color="textColor"
            :class="className"
            :mode="modeName"
            >
            <el-submenu v-for="item in menuList" :key="item.id" :index="item.id" class="menu1_sub">
              <template  class="list" slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.menuName }}</span>
              </template>
              <template v-for="child in item.children">
                <el-menu-item-group v-if="child.linkUrl !== ''" :key="child.menuName">
                  <el-menu-item @click="createTabs" :title="child.menuName" :id="child.id" :index="child.linkUrl" :class="{'menu-active': isActive(child.index)}">{{ child.menuName }}
                  </el-menu-item>
                </el-menu-item-group>
                <el-submenu v-else :index="item.id" :key="child.menuName">
                  <template slot="title">{{ child.menuName }}</template>
                  <el-menu-item @click="createTabs" v-for="children in item.children" :key="children.id"
                                :title="children.menuName" :id="children.id" :index="children.linkUrl"
                                :class="{'menu-active': isActive(children.index)}">
                    {{ children.menuName }}
                  </el-menu-item>
                </el-submenu>
              </template>
            </el-submenu>
          </el-menu>
        </el-scrollbar>
       </div>
    </div>
  </el-aside>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import auth from '@/store/auth'

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
      menuList: [
        {
          id:1,
          icon:'el-icon-document',
          linkUrl:'',
          menuName:'系统管理',
          children:[
            {
              id:2,
              linkUrl:'/main/user',
              menuName:'账户管理',
            },
            {
              id:3,
              linkUrl:'/main/role',
              menuName:'角色管理'
            },
          ]
        },
        {
          id:3,
          icon:'el-icon-document',
          menuName:'健康档案',
          children:[
            {
              id:4,
              linkUrl:'/main/health',
              menuName:'档案'
            },
          ]
        },
        {
          id:5,
          icon:'el-icon-document',
          linkUrl:'',          
          menuName:'资源管理',
          children:[
            {
              id:6,
              linkUrl:'/main/menu',
              menuName:'资源管理'
            },
            {
              id:7,
              linkUrl:'/main/test',
              menuName:'测试页面'
            },
            {
              id:8,
              linkUrl:'/main/map',
              menuName:'地图'
            },
          ]
        },
      ],
      drawer: true,
      direction: 'ltr',
    }
  },
  props: {
    navHeight: {
      type: String,
      default: '60px'
    },
    activeValue: {
      type: String,
      default: ''
    },
    textColor: {
      type: String,
      default: '#000'
    },
    activeTextColor: {
      type: String,
      default: '#438afe'
    },
    backgroundColor: {
      type: String,
      default: '#fff'
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
    ...mapGetters('center', ['menuAccountList'])
  },
  mounted () {
    let that = this
    that.$nextTick(() => {
      that.init()
    })
  },
 
  methods: {
    ...mapActions('center', ['getMenuAccountList']),
    init () {
      // let menu = {}
      // menu['id'] = '1'
      // menu['icon'] = 'el-icon-document'
      // menu['linkUrl'] = ''
      // menu['menuName'] = '设备控制'
      // menu['children'] = []
      // let children = {}
      // children['id'] = '1'
      // children['icon'] = 'el-icon-document'
      // children['linkUrl'] = '/category/index'
      // children['menuName'] = '子菜单'
      // menu.children.push(children)
      // children = {}
      // children['id'] = '2'
      // children['icon'] = 'el-icon-document'
      // children['linkUrl'] = '/main/index'
      // children['menuName'] = '子菜单2'
      // menu.children.push(children)
      // this.menuList.push(menu)
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
      this.$emit('createTabs', params)
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
  },
  created(){
    // let leftMenu=localStorage.getItem('leftMenu');
    // let leftMenuList=JSON.parse(leftMenu)
    // this.menuList=leftMenuList.resourceList
    // console.log(leftMenuList.resourceList)
  }
}
</script>

<style lang="less" scoped>
.sidebar{
  width:299px;
  background-color:#E9EEF3;
  top:98px;
  .list{
  line-height:0 !important;
 }
}
.logo_box {
  width:100%;
  display: flex;
  justify-content: space-between;
  background: #438afe;
  padding:0;
}
.logo_box>span {
    display: flex;
    align-items: center;
  }
.icon {
    width: 36px;
    height: 31px;
  }
.logo_img{
  margin:0 15px;
}
</style>
