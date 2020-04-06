<template>
    <div>
        <div class="Logo_box">
            <span class="logo_img"><img src="../../../assets/images/login/logo.png"/></span> 
            <span><img class="icon" src="../../../assets/images/some_icon.png" alt=""></span>
        </div>
        <div class="role_box">
            <el-avatar  shape="circle" :size="72" :src="squareUrl"></el-avatar>
            <p class="role">医生</p>
            <p class="c_5992fe">当前版本:V2.2.4.5</p>
        </div>
        <!-- 左侧菜单 -->
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            unique-opened router
            active-text-color="#ffd04b"
            >
        <template v-for="val in treelist">
            <el-submenu :index="val.index" :key="val.id">
                <template class="title" slot="title">
                        <i :class="val.cls"></i>
                        <span>{{val.title}}</span>
                </template>
                <el-menu-item-group v-for="child in val.children" :key="child.index">
                    <el-menu-item :index="child.index">{{child.name}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </template>
    </el-menu>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
export default {
  data() {
    return {
      direction: "ltr",
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      treelist: [
        {
          id: 1,
          index: "/home/firstPage",
          cls: "el-icon-s-cooperation",
          title: "设备控制",
          role: [1, 2], //可访问角色有:超级管理员，普通员工
          children: [
                { index: "/home/Categor", name: "商品分类列表" },
                { index: "/home/Addcatego", name: "添加商品分类" }
            ]
        },
        {
          id: 2,
          index: "2",
          cls: "el-icon-menu",
          title: "健康档案",
          role: [1],
          children: [
            { index: "/home/Categories", name: "商品分类列表" },
            { index: "/home/Addcategories", name: "添加商品分类" }
          ]
        },
        {
          id: 3,
          index: "3",
          cls: "el-icon-s-goods",
          title: "收费管理",
          role: [1],
          children: [
            { index: "/home/ProductList", name: "商品列表" },
            { index: "/home/AddProduct", name: "添加商品" }
          ]
        },
        {
          id: 4,
          index: "4",
          cls: "el-icon-s-custom",
          title: "老人管理",
          role: [1],
          children: [
            { index: "/home/AccountList", name: "账号列表" },
            { index: "/home/AddAccount", name: "增加账号" },
            { index: "/home/modifyAccount", name: "修改密码" }
          ]
        },
        {
          id: 5,
          index: "5",
          cls: "el-icon-s-data",
          title: "物资管理",
          role: [1],
          children: [
            { index: "/home/Sales", name: "销售统计" },
            { index: "/home/Stock", name: "进货统计" }
          ]
        },
        {
          id: 6,
          index: "6",
          cls: "el-icon-s-tools",
          title: "短信管理",
          role: [1, 2],
          children: [
            { index: "/home/Menu", name: "菜单管理" },
            { index: "/home/AddMenu", name: "添加菜单" }
          ]
        },
        {
          id: 7,
          index: "7",
          cls: "el-icon-user",
          title: "接待管理",
          role: [1, 2],
          children: [{ index: "/home/Personal", name: "个人中心" }]
        }
      ]
    };
  },
  created(){
    //   if(this.$refs.headline.innerHTML!==null){

    //   }
  },
  methods: {
    handleOpen() {},
    handleClose() {},
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  border-right: 1px solid #fff;
  /deep/ .el-submenu__title {
    padding-left: 53px !important;
    position: relative;
  }
  /deep/.el-submenu .el-menu-item {
      padding-left:85px !important;
  }
  /deep/ .el-menu-item-group__title {
    padding: 0;
  }
}

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
    }
  }
  .logo_img{
    margin:0 15px;
  }
}
.role_box {
  margin: 41px 0 58px 0;
  text-align: center;
  .role {
    margin: 8px 0 7px 0;
  }
}
</style>