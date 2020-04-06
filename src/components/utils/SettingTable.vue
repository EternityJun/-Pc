<template>
  <div class="setTab fs14" v-if="tableData.show">
    <div class="setTab_box">
      <p class="setTab_mark"><span>注：</span>你可以在此页配置表格列显示内容</p>
      <ul>
        <li class="width150 t_r mr10">字段</li>
        <li class="width50 t_c">显示</li>
        <!--<li class="width50 t_c">锁定</li>-->
        <li class="width50 t_c">移动</li>
      </ul>
      <el-scrollbar class="setTab_content">
        <ul v-for="(set,index) in tableData.listSet" :key="index">
          <!--字段值-->
          <li class="width150 t_r mr10">{{set.fieldName}}</li>
          <!--是否显示-->
          <li class="width50 t_c">
            <el-checkbox v-model="set.display" :disabled="set.locked"></el-checkbox>
          </li>
          <!--调整顺序-->
          <li class="width50 t_c">
            <div class="setTab_sort" v-if="!set.locked">
              <a @click="sort(index,'top')" v-if="index != 0">
                <svg-icon icon-class="setTable_top"/>
              </a>
              <span class="mr5"></span>
              <a @click="sort(index,'down')" v-if="index != tableData.listSet.length-1">
                <svg-icon icon-class="setTable_down"/>
              </a>
            </div>
          </li>
        </ul>
      </el-scrollbar>
      <div class="btn_box">
        <a class="fl" @click="reset">恢复默认</a>
        <el-button type="info" @click="close">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    // 表格配置对象 tableData: {name: '表格标识名称', show: false, list: []},
    /**
    list and listSet: 数组对象格式：
    columnCode (string, optional): 列标识 ,
    columnName (string, optional): 列名 ,
    columnWidth (integer, optional): 列宽度 ,
    display (boolean, optional): 是否显示 true显示 false不显示 ,
    id (integer, optional): 列主键 ,
    locked (boolean, optional): 是否锁定 true 锁定 false未锁定 ,
    sort (integer, optional): 排序
    */
    tableData: Object
  },
  data () {
    return {
      listSet: []
    }
  },
  mounted () {
    this.getColumnList(false)
  },
  created () {
  },
  methods: {
    /**
     * 获取显示的表格配置
     * @param {Boolean} _boolean 是否关闭窗口
     */
    getColumnList (_boolean) {
      for (let i = 0; i < this.tableData.listSet.length; i++) {
        this.listSet[i] = this.tableData.listSet[i]
        this.listSet[i]['sort'] = i
      }
    },
    /**
     * 恢复默认
     */
    reset () {
      // let params = {tableCode: this.tableData.name}
    },
    /**
     * 提交
     */
    submit () {
    },
    /**
     * 调整顺序
     * @param {Number} _index 当前下标
     * @param {String} _type 调整类型：top | down
     */
    sort (_index, _type) {
      this.$emit('sort', _index, _type)
    },
    /**
    * 关闭设置窗口
    */
    close () {
      this.listSet = JSON.parse(JSON.stringify(this.tableData.listSet))
      this.tableData.show = false
    }
  }
}
</script>
<style scoped>

  .setTab{
    position: fixed;
    top: 60px;
    left: 209px;
    width: 100%;
    height: calc(100% - 60px);
    z-index: 8;
    color: #444;
  }
  .setTab_box{
    position: relative;
    width: 340px;
    height: 100%;
    background-color: #fff;
    box-shadow:0px 0px 4px 0px rgba(187,187,187,0.5);
  }
  .setTab_mark{
    height: 76px;
    padding: 28px 20px;
    border-bottom: 1px solid #dbdbdb;
  }
  .setTab_mark>span{
    color: #DD4A47;
  }
  .setTab_box>ul{
    height: 46px;
    line-height: 46px;
    font-weight: bold;
    border-bottom: 1px solid #dbdbdb;
  }
  .setTab_box li{
    display: inline-block;
  }
  .setTab_content{
    height: calc(100% - 76px - 46px - 67px);
    border-bottom: 1px solid #dbdbdb;
  }
  .setTab_content ul{
    line-height: 35px;
  }
  .setTab_content ul:first-child{
    margin-top: 10px;
  }
  .setTab_content ul:last-child{
    margin-bottom: 10px;
  }
  .setTab_content div.setTab_sort{
    display: none;
  }
  .setTab_content ul:hover div.setTab_sort{
    display: inline-block;
  }
  .setTab_content .lock_img{
    position: relative;
    top: 3px;
    height: 16px;
  }
  .btn_box{
    height: 67px;
    padding: 18px;
    line-height: 32px;
    text-align: right;
  }
  .el-button{
    width: 68px;
    height: 32px;
    line-height: 32px;
    padding: 0px;
    font-size: 13px;
    border-radius: 2px;
  }
</style>
