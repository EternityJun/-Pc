<template>
  <div class="dataTable" ref="dataTables">
    <setting-table @sort="sort" :tableData="tableData"></setting-table>
    <!-- 
        show-summary              是否在表尾显示合计行
        summary-method            自定义的合计计算方法
        row-dblclick              当某一行被双击时会触发该事件
        show-overflow-tooltip     当内容过长被隐藏时显示 tooltip
        resizable                 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）
        fixed                     列是否固定在左侧或者右侧，true 表示固定在左侧
        formatter                 用来格式化内容
     -->
    <el-table
      :data="dataList"
      :show-summary="showSummary"
      :summary-method="getSummaries"
      highlight-current-row
      border
      style="width: 100%"
      :height="tableHeight"
      :cell-style="cellStyle"
      @row-dblclick="dblClickRow"
      @current-change="handleCurrentChange"
      @selection-change="changeAll"
      @sort-change="sortChange">
      <template v-for="col in tableData.listSet">
        <el-table-column v-if="col.fieldType === 'checkbox'"
                         align="center"
                         :key="col.fieldCode"
                         type="selection"
                         width="50px"
                         class="selection"
                         prop="id"/>
        <el-table-column v-else-if="col.fieldType === 'index'"
                         show-overflow-tooltip
                         type="index"
                         align="center"
                         width="60px"
                         :key="col.fieldCode"
                         label="序号"
                         :resizable="indexResizable">
          <template slot="header" slot-scope="scope">
            <!--表格可配 触发按钮-->
            <label class="themeColor">
              <svg-icon @click="tableData.show = true" class="cursor_p" icon-class="setTable_setting"/>
            </label>
          </template>
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column v-else-if="col.fieldType === 'number'"
                         show-overflow-tooltip
                         align="center"
                         width="60px"
                         :key="col.fieldCode"
                         label="序号"
                         :resizable="indexResizable">
          <template slot="header" slot-scope="scope">
            <!--表格可配 触发按钮-->
            <label class="themeColor">
              序号
              <svg-icon @click="tableData.show = true" style="display: none" class="cursor_p" icon-class="setTable_setting"/>
            </label>
          </template>
          <template slot-scope="scope">{{(scope.$index + 1) + (pageIndex - 1) * pageSize}}</template>
        </el-table-column>
        <el-table-column v-else-if="col.fieldType === 'custome-adv'" align="center"
                         :fixed="col.fixed"
                         :width="col.width"
                         :sortable="col.sortable"
                         :prop="col.fieldCode"
                         :key="col.fieldCode"
                         :label="col.fieldName">
          <template slot-scope="scope">
            <div>
              <el-button v-for="item in col.btnList"
                         :key="item.id"
                         @click="customControl(scope.row,item.method)"
                         :type="item.type || primary"
                         size="mini"
                         plain
                         :value="scope.row['id']">{{ item.text }}
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-else-if="col.fieldType === 'switch'"
                         :align="col.align"
                         :width="col.width"
                         :key="col.fieldCode"
                         :sortable="col.sortable"
                         :prop="col.fieldCode"
                         :label="col.fieldName">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row[col.fieldCode]"
              active-color="#00A854"
              :active-text="col.onText"
              :active-value="col.onValue"
              inactive-color="#F04134"
              :inactive-text="col.offText"
              :inactive-value="col.offValue"
              @change="changeSwitch(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column v-else-if="(col.fieldType === 'image')"
                         :align="col.align"
                         :width="col.width"
                         :key="col.fieldCode"
                         :sortable="col.sortable"
                         :prop="col.fieldCode"
                         :label="col.fieldName">
          <template slot-scope="scope">
            <a target="_blank" :href="scope.row[col.fieldCode]">
              <img alt=""
                   :src="scope.row[col.fieldCode]"
                   :data-image="scope.row[col.fieldCode]"
                   data-uid="showQrCode"
                   @mouseover="mouseHover"
                   @mouseout="mouseOut" width="25px"/>
            </a>
          </template>
        </el-table-column>
        <el-table-column v-else-if="col.fieldType === 'date'"
                         :align="col.align"
                         :width="col.width"
                         :key="col.fieldCode"
                         :sortable="col.sortable"
                         :formatter="formatterDate"
                         :prop="col.fieldCode"
                         :label="col.fieldName">
        </el-table-column>
        <el-table-column v-else-if="col.fieldType === 'time'"
                         :align="col.align"
                         :width="col.width"
                         :key="col.fieldCode"
                         :sortable="col.sortable"
                         :formatter="formatterTime"
                         :prop="col.fieldCode"
                         :label="col.fieldName">
        </el-table-column>
        <el-table-column v-else-if="col.fieldType === 'formatter'"
                         :align="col.align"
                         :width="col.width"
                         :key="col.fieldCode"
                         :sortable="col.sortable"
                         :formatter="formatterValue"
                         :prop="col.fieldCode"
                         :label="col.fieldName">
        </el-table-column>
        <el-table-column v-else
                         :width="col.width"
                         :align="col.align"
                         :prop="col.fieldCode"
                         :key="col.fieldCode"
                         :sortable="col.sortable"
                         :label="col.fieldName">
          <template slot-scope="scope">
            <span class="scope-auto-hide"
                  :title="scope.row[col.fieldCode]">{{ scope.row[col.fieldCode] }}
            </span>
          </template>
        </el-table-column>
      </template>
      <el-table-column label="" key="" prop=""></el-table-column>
    </el-table>
    <el-pagination
      v-if="currentPaging"
      @size-change="pageSizeEvent"
      @current-change="pageEvent"
      background="background"
      :current-page.sync="pageIndex"
      :page-size="currentPageSize"
      :page-sizes="currentPageSizes"
      layout="sizes, total, prev, pager, next"
      prev-text="上一页"
      next-text="下一页"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import auth from '@/store/auth'
// 表格配置
import settingTable from '@/components/utils/SettingTable'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'DataTables',
  components: {
    settingTable
  },
  data () {
    return {
      background: true,
      indexResizable: false,
      currentPaging: true,
      currentPageSize: 10,
      tableHeight: 150,
      currentPageSizes: [],
      checkList: [],
      headerColumns: [],
      tableData: {
        name: '',
        show: false,
        listSet: []
      }
    }
  },
  props: {
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    dataList: {
      type: Array,
      default () {
        return []
      }
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 15
    },
    pageIndex: {
      type: Number,
      default: 1
    },
    pageSizes: {
      type: Array,
      default () {
        return [10, 15, 20, 30, 40, 60, 80]
      }
    },
    height: {
      type: Number,
      default: 0
    },
    top: {
      type: Number,
      default: 50
    },
    paging: {
      type: Boolean,
      default: true
    },
    id: {
      type: String,
      default: ''
    },
    custom: {
      type: Boolean,
      default: false
    },
    showSummary: {
      type: Boolean,
      default: false
    },
    sumText: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  computed: {
    ...mapGetters('com', ['tableHeader'])
  },
  methods: {
    ...mapActions('com', ['loadTableHeader']),
    /**
     * 初始数据
     */
    init () {
      if (!this.id) {
        this.$message({
          showClose: true,
          message: '未设置表格 ID',
          type: 'warning'
        })
      }
      // 设置列表
      if (this.tableData.listSet.length === 0) {
        this.tableData.listSet = this.columns
      }
      this.tableData.name = this.id
      // todo 调用查询表头数据
      this.currentPageSize = this.pageSize || 10
      this.currentPaging = (this.paging === undefined) ? true : this.paging
      this.currentPageSizes = this.pageSizes || [10, 20, 40, 80]

      let tableTop = this.top || 0
      // 验证高度设置
      let height = (this.height || 0)
      if (height > 0) {
        this.tableHeight = height
      } else {
        this.tableHeight = window.innerHeight - 170 - tableTop
      }
    },
    indexMethod (index) {
      return (index + 1) + (this.pageIndex - 1) * this.currentPageSize
    },
    /**
     * 计算合计
     */
    getSummaries (param) {
      const sumRow = []
      let sumText = this.sumText
      if (!sumText) {
        return sumRow
      }
      let colList = sumText.columns
      if (!sumText || !colList || colList.length === 0) {
        return sumRow
      }
      const {columns, data} = param
      columns.forEach((column, index) => {
        if (index === 0) {
          sumRow[index] = sumText.text || '合计'
          return
        }
        let item = colList.find(item => item.fieldCode === column.property)
        if (!item) {
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sumRow[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sumRow[index] += item.unit || ''
        }
      })
      return sumRow
    },
    cellStyle () {
      return 'padding: 6px 0'
    },
    /**
     * 行双击事件
     */
    dblClickRow (row) {
      let params = {}
      params.type = 'dblclick'
      params.row = row
      this.callBackMethod(params)
    },
    customControl (row, type) {
      let params = {}
      params.type = type
      params.row = row
      this.callBackMethod(params)
    },
    /**
     * 选择行（按钮）
     */
    choiceRow (row) {
      let params = {}
      params.type = 'choice'
      params.row = row
      this.callBackMethod(params)
    },
    /**
     * 查询数据
     */
    queryRow (row) {
      let params = {}
      params.type = 'see'
      params.row = row
      this.callBackMethod(params)
    },
    /**
     * 编辑数据
     */
    editorRow (row) {
      let params = {}
      params.type = 'editor'
      params.row = row
      this.callBackMethod(params)
    },
    /**
     * 删除数据
     */
    deleteRow (row) {
      let that = this
      that.$confirm('是否确认删除，删除后可能无法恢复', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {}
        params.type = 'delete'
        params.row = row
        that.callBackMethod(params)
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    /**
     * 授权数据
     */
    authRow (row) {
      let params = {}
      params.type = 'auth'
      params.row = row
      this.callBackMethod(params)
    },
    /**
     * 开关事件
     */
    changeSwitch (row) {
      let params = {}
      params.type = 'switch'
      params.row = row
      this.callBackMethod(params)
    },
    /**
     * 页码改变事件
     * @param pageIndex 当前页码
     */
    pageEvent (pageIndex) {
      let params = {}
      params.type = 'pageIndex'
      params.pageIndex = pageIndex
      params.pageSize = this.currentPageSize
      this.callBackMethod(params)
    },
    /**
     * 页大小改变事件
     * @param pageIndex 当前页码
     */
    pageSizeEvent (newPageSize) {
      let params = {}
      params.type = 'pageSize'
      params.pageIndex = 1
      params.pageSize = newPageSize
      this.currentPageSize = newPageSize
      this.callBackMethod(params)
    },
    /**
     * 鼠标 hover事件
     * @param e 参数
     */
    mouseHover (e) {
    },
    /**
     * 鼠标 out 事件
     * @param e 参数
     */
    mouseOut (e) {
    },
    /**
     * 当前选中
     */
    handleCurrentChange (row) {
      let params = {}
      params.type = 'current'
      params.row = row
      this.callBackMethod(params)
    },
    changeAll (row) {
      let params = {}
      params.type = 'checkbox'
      params.row = row
      this.callBackMethod(params)
    },
    /**
     * 排序
     */
    sortChange (column, prop, order) {
      let params = {}
      params.type = 'sort'
      params.sortField = column.order
      params.sortType = column.prop
      params.row = column.column
      this.callBackMethod(params)
    },
    /**
     * 回调
     * @param params 参数
     */
    callBackMethod (params) {
      this.$emit('callBack', params)
    },
    /**
     * 格式时间
     * @param row
     * @param column
     * @returns {string}
     */
    formatterDate (row, column) {
      let date = row[column.property]
      if (date === '' || date === undefined || date === null) {
        return ''
      }
      date = auth.fullTime(date)
      return date.getFullYear + '-' + date.getMonth + '-' + date.getDate
    },
    /**
     * 格式日期
     * @param row
     * @param column
     * @returns {string}
     */
    formatterTime (row, column) {
      let time = row[column.property]
      if (time === '' || time === undefined || time === null) {
        return ''
      }
      time = auth.fullTime(time)
      return time.getFullYear + '-' + this.addZero(time.getMonth) + '-' + this.addZero(time.getDate) + ' ' + this.addZero(time.getHours) + ':' + this.addZero(time.getMinutes) + ':' + this.addZero(time.getSeconds)
    },
    /**
     * 处理时间格式
     */
    addZero (i) {
      if (i < 10) {
        i = '0' + i
      }
      return i
    },
    /**
     * 指定值转换
     * @param row 行数据
     * @param column 列名
     * @param cellValue 值
     * @param index 索引
     */
    formatterValue (row, column, cellValue, index) {
      try {
        let col = this.columns.find(c => c.fieldCode === column.property)
        let dataValue = col.fieldValue
        if (typeof dataValue === 'string') {
          dataValue = JSON.parse(col.fieldValue)
        }
        let item = dataValue.find(item => item.value === cellValue.toString())
        cellValue = item.text
      } catch (e) {
        console.log(e)
      }
      return cellValue
    },
    /**
     * 调整顺序
     * @param {Number} _index 当前下标
     * @param {String} _type 调整类型：top | down
     */
    sort (_index, _type) {
      let repIndex = _type === 'top' ? _index - 1 : _index + 1
      let the = this.tableData.listSet[_index]
      let rep = this.tableData.listSet[repIndex]
      the['sort'] = repIndex
      rep['sort'] = _index
      this.tableData.listSet[_index] = rep
      this.tableData.listSet[repIndex] = the
      this.$set(this.tableData.listSet, _index, this.tableData.listSet[_index])
    }
  }
}
</script>

<style>
  .dataTable {
    overflow-x: auto;
    overflow-y: hidden;
    margin: 0 10px;
    top: 72px;
    width: calc(100% - 20px);
  /deep/ .el-table--border, .el-table--group {
    border: 1px solid #D8E1E3;
  }

  /deep/ .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
    border-right: 1px solid #D8E1E3;
  }

  /deep/ .el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid #D8E1E3;
  }

  }
  .dataTable .el-table__header th {
    background-color: #ebeef5 !important;
    border-right: 1px solid #FFF;
  }

  .dataTable .el-pagination {
    text-align: right;
    margin-top: 10px;
    padding: 0 50px 0 0;
  }

  .dataTable .el-pagination .btn-next span,
  .dataTable .el-pagination .btn-prev span {
    padding: 0 5px !important;
  }

  .scope-auto-hide {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
