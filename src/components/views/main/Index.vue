<template>
<div class="IndexPage">
  <div class="IndexTop">
  <!--医生登录-->
    <div class="UserInfo">
      <h3>医生登录</h3>
      <div class="UserBox">
        <el-avatar shape="circle" :size="75" :src="squareUrl"></el-avatar>
        <p>下午好,{{username}}医生!</p>
        <p>所属科类:{{category}}</p>
        <span class="LoginTime">登录时间:{{addTime|formateDate}}</span>
      </div>
    </div>
    <!--工作台-->  
    <div class="WorkBench">
      <h3>工作台</h3>
      <div class="cardBox">
        <div class="card" v-for="(v,i) in WorkBenchList" :key="i">
          <span><img :src="v.icon"/></span>
          <p>
            <span class="num">{{v.num}}</span>
            <span class="look">{{v.look}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="IndexBottom">
    <div class="dataTables">
      <h3 class="taskTitle">任务列表</h3>
       <layoutSearchTab style="searchTab" :searchTitle="searchTitle"/>
        <layoutDataTable
          id="categoryTableList"
          :pageIndex="1"
          :total="45"
          :columns="columns"
          :dataList="dataList"/>
      </div>
    <div class="Bottom_right">
      <div class="Memu" >
        <h3>快捷菜单</h3>
          <div class="falstMenu">
            <div v-for="item in falstMenuList" :key="item.id" class="falseMenubox">
              <img :src="item.icon" />
              <p>{{item.title}}</p>
            </div>
          </div>
        <div class="addfalstIcon"><img src="../../../assets/images/addfalst_icon.png"/></div>
      </div>
      <div class="work">
        <h3>排班表</h3>
        <div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import layoutSearchTab from '@/components/layout/SearchTab'
import layoutDataTable from '@/components/layout/DataTables'
import square from '../../../assets/images/header/医生头像.png'
import icon from '../../../assets/images/workbench/LookOldPepo.png'
import falstIcon from '../../../assets/images/falst_icon.png'
import moment from "moment";
  export default {
    
    data(){
      return{
        name: 'CategoryList',
        squareUrl:square,
        username:'刘德天',
        category:'内科',
        work_icon:icon,
        addTime:'',
        WorkBenchList:[
          {
            icon:icon,
            num:45,
            look:'今日巡视'
          },
          {
            icon:icon,
            num:45,
            look:'今日巡视'
          },
          {
            icon:icon,
            num:45,
            look:'今日巡视'
          },
          {
            icon:icon,
            num:45,
            look:'今日巡视'
          },
          {
            icon:icon,
            num:45,
            look:'今日巡视'
          },
          {
            icon:icon,
            num:45,
            look:'今日巡视'
          },
          {
            icon:icon,
            num:45,
            look:'今日巡视'
          },
        ],
        searchTitle: [
        {type: 'select', title: '任务状态', id: 'idDatetime3', format: 'yyyy-MM-dd HH:mm:ss'},
        {type: 'select', title: '任务分类', id: 'idDatetime11', format: 'yyyy-MM-dd HH:mm:ss'}
      ],
      columns: [
        {fieldType: 'number', fieldName: '分类',width:'78'},
        {fieldCode: 'category_code', fieldName: '任务标题', width: '101'},
        {fieldCode: 'category_name', fieldName: '任务内容', width: '298'},
        {fieldCode: 'grade', fieldName: '创建时间', width: '119'},
        {fieldCode: 'parentName', fieldName: '到期时间', width: '113'},
        {fieldCode: 'remarks', fieldName: '状态', width: '81'},
        {
          fieldType: 'custome-adv',
          fieldName: '操作',
          fixed: 'right',
          width: '200',
          btnList:
            [
              {text: '修改', method: 'edit', type: 'primary'},
              {text: '删除', method: 'delete', type: 'danger'}
            ]
        }
      ],
      dataList: [
        {category_code: '234234',category_name:'hello'},
        {category_code: '234234'},
        {category_code: '234234'},
        {category_code: '234234'},
        {category_code: '234234'},
        {category_code: '234234'}
      ],
      //快捷菜单列表
      falstMenuList: [
        {
          id:1,
          primaryTitle:'快捷菜单',
          icon:falstIcon,
          title:'设备控制'
        },
        {
          id:2,
          primaryTitle:'快捷菜单',
          icon:falstIcon,
          title:'设备控制'
        },
        {
          id:3,
          primaryTitle:'快捷菜单',
          icon:falstIcon,
          title:'设备控制'
        },
        {
          id:4,
          primaryTitle:'快捷菜单',
          icon:falstIcon,
          title:'设备控制'
        },
        {
          id:5,
          primaryTitle:'快捷菜单',
          icon:falstIcon,
          title:'设备控制'
        },
        {
          id:6,
          primaryTitle:'快捷菜单',
          icon:falstIcon,
          title:'设备控制'
        },
        {
          id:7,
          primaryTitle:'快捷菜单',
          icon:falstIcon,
          title:'设备控制'
        },
        {
          id:8,
          primaryTitle:'快捷菜单',
          icon:falstIcon,
          title:'设备控制'
        },
        {
          id:9,
          primaryTitle:'快捷菜单',
          icon:falstIcon,
          title:'设备控制'
        },
        {
          id:10,
          primaryTitle:'快捷菜单',
          icon:falstIcon,
          title:'设备控制'
        },
      ]
      }
    },
    components:{
      layoutSearchTab,
      layoutDataTable
    },
    created(){
      let leftMenu=localStorage.getItem('leftMenu');
      let leftMenuList=JSON.parse(leftMenu)
      this.addTime=leftMenuList.addTime;
    },
    filters:{
      formateDate(v){
        return moment(v).format("YYYY-MM-DD h:mm:ss");
      }
    }
  }
</script>

<style lang="less" scoped>
.IndexPage{
  display:flex;
  flex-direction:column;
  .IndexBottom{
    display:flex;
    .dataTables{
      width:936px;
      margin:0 20px;
      background-color:#fff;
      .taskTitle{
        font-size:13px;
        text-indent:16px;
      }
    }
    .Bottom_right{
      .Memu{
        width:603px;
        height:210px;
        background-color:#fff;
        margin-bottom:20px;
        padding-left:13px;
        display:flex;
        flex-direction:column;
        h3{
          font-weight:normal;
        }
        .falstMenu{
          text-align:center;
          display:flex;
          flex-wrap:wrap;
          .falseMenubox{
            margin-right:18px;
            margin-bottom:20PX;
            width:50px;
          }
          p{
            margin:0;
            font-size:10px;
          }
        }
        .addfalstIcon{
          position:relative;
          top: -170px;
          img{
            width: 39px;
            height: 55px;
            position: absolute;
            right: 27px;
            top: 16px;
          }
        }
      }
      .work{
        width:603px;
        height:354px;
        background-color:#fff;
        h3{
          padding:12px 0 0 13px;
          font-weight:normal;
          margin:0;
        }
      }
    }
  }
}
.IndexTop{
  display:flex;
  margin-bottom:27px;
  .UserInfo{
    width:300px;
    height:301px;
    background-color:#fff;
    display:flex;
    flex-direction:column;
    margin:23px 21px 0 20px;
    h3{
      font-size:13px;
      text-indent:16px;
    }
    .UserBox{
      display:flex;
      flex-direction:column;
      align-items:center;
      position:relative;
      .el-avatar{
        background-color:#fff;
      }
      p,span{
        font-size:14px;
      }
      p{
        margin-top:16px;
        margin-bottom:0;
      }
      .LoginTime{
        position:absolute;
        bottom:-56px;
        color:#afafaf;
      }
    }
  }                    
  .WorkBench{
    display:flex;
    flex-direction:column;
    width:1260px;
    h3{
      font-weight:normal;
    }
    .cardBox{
      display:flex;
      flex-wrap:wrap;
      .card{
        width:232px;
        height:121px;
        background-color:#fff;
        display:flex;
        justify-content:space-around;
        align-items:center;
        margin-right:20px;
        margin-bottom:20px;
        p{
          display:flex;
          flex-direction:column;
          .num{
            font-size:45px;
            color:#428bfe;
          }
          .look{
            font-size:12px;
            color:#c4c4c4;
          }
        }
      }
    }
  }
}
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