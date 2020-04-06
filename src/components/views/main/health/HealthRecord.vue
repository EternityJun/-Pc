<template>
  <div>
  <!--健康档案页面-->
    <div class="search">
       <el-input
        placeholder="请输入内容"
        v-model="input4">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <div>
      <layoutDataTable
      id="categoryTableList"
      :pageIndex="1"
      :total="45"
      @callBack="create"
      :columns="columns"
      :dataList="dataList"/>
    </div>

    <!--弹出框-->
    <el-dialog
      :visible.sync="dialogVisible"
      width="80%">
      <div class="oldInfoTop">
        <div class="headImg"></div>
        <div class="headInfo">
           <p class="infoOne"><span>在院编号:</span><span>姓名:</span>
           <span>性别:</span><span>民族 :</span><span>年龄:</span><span>出生日期:</span>  </p>
           <p class="infoOne"><span>床位号:</span><span>护理级别:</span>
           <span>身份证号 :</span></p>
           <p class="infoOne"><span>家庭住址:</span></p>
           <p class="infoOne"><span>紧急联系人:</span><span>紧急联系电话:</span><span>所属服务点:</span><span>服务类型:</span>  </p>
           <p class="infoOne"><span>服务状态:</span><span>慢性病:</span>
           <span>失能情况:</span><span>护理等级 :</span><span>残疾情况:</span> </p>
        </div>
      </div>
      <div class="nav">
        <span class="nav_title" v-for="item in navList">{{item}}</span>

        <div class="monitor">
          <img src="../../../../assets/images/healthPic.png"/>
          <div class="monitor_right">
              <el-button type="primary">查看实时监控</el-button>
              <div class="monitorBigBox">
                <div class="monitorBox" v-for="item in monitorList" :key="item.id">
                  <h3>{{item.type}}</h3>
                  <p><span class="num">{{item.num}}</span>bmp</p>
                  <p class="state">{{item.state}}</p>
                  <p class="time">{{item.time}}</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
let id = 1000;
import layoutDataTable from '@/components/layout/DataTables'
  export default {
     name: 'CategoryList',
    components: {
      layoutDataTable
    },
    data(){
      return{
         columns: [
          {fieldType: 'number', fieldName: '序号',width: '60'},
          {fieldCode: 'category_code', fieldName: '在院编号', width: '129'},
          {fieldCode: 'category_name', fieldName: '姓名', width: '98'},
          {fieldCode: 'grade', fieldName: '性别', width: '56'},
          {fieldCode: 'parentName', fieldName: '年龄', width: '92'},
          {fieldCode: 'seatNum', fieldName: '床位号', width: '137'},
          {fieldCode: 'rank', fieldName: '护理级别', width: '129'},
          {fieldCode: 'disability', fieldName: '失能情况', width: '138'},
          {fieldCode: 'address', fieldName: '家庭住址', width: '350'},
          {fieldCode: 'serve', fieldName: '所属服务点', width: '214'},
          {
            fieldType: 'custome-adv',
            fieldName: '操作',
            fixed: 'right',
            width: '146',
            btnList:
              [
                {text: '查看', method: 'look', type: 'primary'},
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
        navList:['动态健康数据','生理参数表','首次入院记录'],
        monitorList:[
          {
            id:1,
            type:'心率',
            num:75,
            state:'正常',
            time:'2018-12-12 12:33:21'
          },
          {
            id:2,
            type:'心率',
            num:75,
            state:'正常',
            time:'2018-12-12 12:33:21'
          },
          {
            id:3,
            type:'心率',
            num:75,
            state:'正常',
            time:'2018-12-12 12:33:21'
          },
          {
            id:4,
            type:'心率',
            num:75,
            state:'正常',
            time:'2018-12-12 12:33:21'
          },
          {
            id:5,
            type:'心率',
            num:75,
            state:'正常',
            time:'2018-12-12 12:33:21'
          },
          {
            id:7,
            type:'心率',
            num:75,
            state:'正常',
            time:'2018-12-12 12:33:21'
          },
        ],
        dialogVisible:false
      }
    },
    methods:{
      create(e){
        if(e.type=='look'){
          this.dialogVisible=true
          
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.search{
  margin:23px 21px 20px 20px;
  background:#fff;
  display:flex;
  justify-content:center;
  padding:33px 0 26px 0;
  .el-input{
    width:493px;
    margin-right:7px;
  }
}
.oldInfoTop{
  display:flex;
  .headImg{
    width:207px;
    height:225px;
    background:#ccc;
  }
  .headInfo{
    padding:0 30px;
    .infoOne{
      border-bottom:1px solid #ccc;
      padding-bottom:10px;
      span{
        display:inline-block;
        width:150px;
      }
    }
  }
}
.nav{
  .nav_title{
    display:inline-block;
    width:100px;
    height:36px;
    background:#d3e3f7;
    text-align:center;
    line-height:35px;
    margin-right:10px;
    cursor:pointer;
  }
  .monitor{
    margin-top:30px;
    display:flex;
    padding-left:78px;
    .monitor_right{
      margin-left:91px;
      padding-top:20px;
      .monitorBigBox{
        display:flex;
        flex-wrap:wrap;
        .monitorBox{
          width:173px;
          height:158px;
          background:#f5f5f5;
          margin:10px 10px 0 0;
          h3{
            margin-left:10px;
            font-size:13px;
            color:#272727;
          }
          p{
            text-align:center;
            .num{
              font-size:44px;
              color:#272727;
            }
          }
          .state{
            color:#2de07f;
            font-size:12px;
          }
          .time{
            font-size:5px;
            color:#949494;
          }
        }
      }
    }
  }
}
</style>