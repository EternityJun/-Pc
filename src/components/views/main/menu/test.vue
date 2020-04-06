<template>
  <div>
    <el-table
      :data="tableData"
      border
      :cell-style="cellStyle"
      @current-change="handleCurrentChange"
      @selection-change="changeAll"
      @row-dblclick="dblClickRow"
      @sort-change="sortChange"
      type="selection"
      style="width: 100%">
      <el-table-column  type="selection">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="180"
        :resizable="false"
        :sortable="true"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
        :sortable="true"
        >
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    <vshare></vshare>
    <!-- 验证码 -->
    <div class="verCode"> 
      <el-button @click="verCodeClick">{{vercode}}</el-button>
    </div>
    <!-- 麻将 -->
    <div class="mahjongBox">
      <!-- 玩家1 -->
      <div class="playerOne" >
        <span v-for="item in player1" :key="item"> {{item}}</span>
       </div>
      <div class="playBox">
        <!-- 玩家2 -->
        <div class="playerTwo">
        <span v-for="item in player2" :key="item"> {{item}}</span>
          
        </div>
        <!-- 玩家3 -->
        <div class="playerThree">
        <span v-for="item in player3" :key="item"> {{item}}</span>
          
        </div>
        <el-button @click="sendPerClick">发牌</el-button>
      </div>
      <!-- 玩家4 -->
      <div class="playerFour">
        <span v-for="item in player4" :key="item"> {{item}}</span>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      vercode:"发送验证码",
      time:5,
      player1:[],
      player2:[],
      player3:[],
      player4:[],
    };
  },
  methods: {
    //单元格的样式回调方法
    cellStyle() {
      return "padding: 8px 0;";
    },
    //当前选中
    handleCurrentChange(row) {
      let params = {};
      params.type = "current";
      params.row = row;
      this.callBackMethod(params);
      console.log(params);
    },
    //选择项发生变化时触发
    changeAll(rows) {
      console.log(rows);
      this.checkList = rows;
    },
    //双击
    dblClickRow(row, column, event) {
      // console.log(column)
    },
    //排序
    sortChange(column, prop, order) {
      let params = {};
      params.type = "sort";
      params.sortField = column.order;
      params.sortType = column.prop;
      params.row = column.column;
      this.callBackMethod(params);
      console.log(params);
    },
    /**
     * 回调
     * @param params 参数
     */
    callBackMethod(params) {
      this.$emit("callBack", params);
    },
    /* 验证码 */
    verCodeClick(){
        if(this.vercode!='发送验证码'){
          return;
        }
      this.vercode=this.time+'s';
      var timer=setInterval(()=>{
        if(this.time==0){
          this.vercode='发送验证码'
          this.time=5
          clearInterval(timer)
        }else{
          this.time-=1;
          this.vercode=this.time+'s';
        }
      },1000)
    },
    /* 发送玩家手牌 */
    sendPerClick(){
      this.player1=this.sendPock(this.player1)
      this.player2=this.sendPock(this.player1)
      this.player3=this.sendPock(this.player1)
      this.player4=this.sendPock(this.player1)
    },
    /* 发牌 */
    sendPock(p){
      let total=[]
      for(let i=1;i<=9;i++){
        total.push(i+'万',i+'条',i+'筒')
      }
      let newTal=total.sort(function(){
        return Math.random()-0.5
      })

      let firstPock=(newTal.slice(0,1)).join(' ')
      p.push(firstPock)
      return total;
    },
  },
  created() {}
};
</script>

<style lang="less" scoped>
.verCode{
  margin-top: 50px;
}
.mahjongBox{
  width: 600px;
  height: 500px;
  margin:0 auto;
  border:1px solid #000;
  .playerOne{
    width:200px;
    margin: 0 auto;
    border:1px solid #000;  
  }
  .playerTwo{
    width: 30px;
    border:1px solid #000;
    margin-top: 100px;
  }
  .playerThree{
     width:200px;
    margin: 0 auto;
    border:1px solid #000;  
  }
  .playerFour{
    width: 30px;
    border:1px solid #000;
  }
}
</style>