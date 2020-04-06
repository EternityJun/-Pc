<template>
  <div class="dataTable" ref="dataTables">
    <el-row type="flex" class="row-bg" v-if="tableFlag">
      <el-button type="text" @click="addRow()">添加</el-button>
      <el-button type="text" @click="deleteSelect()">删除</el-button>
    </el-row>

    <!--highlight-current-row   是否要高亮当前行
      border                    是否带有纵向边框
      show-summary              是否在表尾显示合计行
      summary-method            自定义的合计计算方法
      cell-style                单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style
      current-change            当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性
      selection-change          当选择项发生变化时会触发该事件
       -->

    <el-table
      highlight-current-row
      border
      style="width: 100%;height: 100%"
      :data="dataList"
      :show-summary="showSummary"
      :summary-method="getSummaries"
      :cell-style="cellStyle"
      @current-change="handleCurrentChange"
      @selection-change="changeAll">
      <template v-for="col in columns">
        <!--prop  对应列内容的字段名   
            type  	对应列的类型。
                    selection 则显示多选框；
                    index 则显示该行的索引（从 1 开始计算）；
                    如果设置了 expand 则显示为一个可展开的按钮
            label   显示的标题
            resizable   对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）
            align       对齐方式left/center/right
            sortable    对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
         -->
        <el-table-column v-if="col.fieldType === 'checkbox'" align="center" :key="col.fieldCode" type="selection" width="50px" class="selection" prop="id"></el-table-column>
        <el-table-column v-else-if="col.fieldType === 'index'" type="index" :key="col.fieldCode" align="center" width="80px" label="序号" :resizable="indexResizable"></el-table-column>
        <el-table-column v-else-if="col.fieldType === 'date'"
                         :align="col.align"
                         :width="col.width"
                         :key="col.fieldCode"
                         :sortable="col.sortable"
                         :formatter="formatterDate"
                         :prop="col.fieldCode"
                         :label="col.fieldName"></el-table-column>
        <el-table-column v-else-if="col.fieldType === 'time'"
                         :align="col.align"
                         :width="col.width"
                         :key="col.fieldCode"
                         :sortable="col.sortable"
                         :formatter="formatterTime"
                         :prop="col.fieldCode"
                         :label="col.fieldName"></el-table-column>
        <el-table-column v-else-if="col.fieldType === 'formatter'"
                         :align="col.align"
                         :width="col.width"
                         :key="col.fieldCode"
                         :sortable="col.sortable"
                         :formatter="formatterValue"
                         :prop="col.fieldCode"
                         :label="col.fieldName"></el-table-column>
        <el-table-column v-else-if="(col.fieldType === 'select')"
                         :align="col.align"
                         :width="col.width"
                         :key="col.fieldCode"
                         :sortable="col.sortable"
                         :prop="col.fieldCode"
                         :label="col.fieldName">
          <template slot-scope="scope">
            <el-select v-model="scope.row[col.fieldCode]" placeholder="请选择">
              <el-option v-for="item in col.selectData"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column v-else-if="(col.fieldType === 'area')"
                         width="250"
                         :align="col.align"
                         :key="col.fieldCode"
                         :sortable="col.sortable"
                         :prop="col.fieldCode"
                         :label="col.fieldName">
          <template slot-scope="scope">
            <el-cascader
              :options="cityAreaOptions"
              v-model="scope.row.regionsData"
              @change="cellBackRegions">
            </el-cascader>
          </template>
        </el-table-column>
        <el-table-column v-else-if="(col.keyPress === 'true')"
                         :align="col.align"
                         :width="col.width"
                         :key="col.fieldCode"
                         :sortable="col.sortable"
                         :prop="col.fieldCode"
                         :label="col.fieldName">
          <template slot-scope="scope">
            <el-input v-model.trim="scope.row[col.fieldCode]"
                      @keyup.enter.native="keyQuery(scope.row)" placeholder="输入内容回车搜索"></el-input>
          </template>
        </el-table-column>
        <el-table-column v-else-if="(col.fieldType === 'query')"
                         :align="col.align"
                         :width="col.width"
                         :key="col.fieldCode"
                         :sortable="col.sortable"
                         :prop="col.fieldCode"
                         :label="col.fieldName">
          <template slot-scope="scope">
            <el-input v-model.trim="scope.row[col.fieldCode]"
                      @keyup.enter.native="keyQuery(scope.row)" placeholder="输入内容回车搜索">
              <el-button @click="keyQuery(scope.row)" slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column v-else-if="(col.fieldType === 'number')"
                         :align="col.align"
                         :width="col.width"
                         :key="col.fieldCode"
                         :sortable="col.sortable"
                         :prop="col.fieldCode"
                         :label="col.fieldName">
          <template slot-scope="scope">
            <el-input v-model.trim="scope.row[col.fieldCode]"
                      @change="blurChange(scope.row,scope.row[col.fieldCode],col.fieldCode)" min="0"  type="number"></el-input>
          </template>
        </el-table-column>
        <el-table-column v-else-if="(col.disable === 'disabled')"
                         :align="col.align"
                         :width="col.width"
                         :key="col.fieldCode"
                         :sortable="col.sortable"
                         :prop="col.fieldCode"
                         :label="col.fieldName">
          <template slot-scope="scope">
            <el-input v-model.trim="scope.row[col.fieldCode]" readonly="readonly" ></el-input>
          </template>
        </el-table-column>
        <el-table-column v-else-if="(col.fieldType === 'text')"
                         :width="col.width"
                         :align="col.align"
                         :prop="col.fieldCode"
                         :key="col.fieldCode"
                         :sortable="col.sortable"
                         :label="col.fieldName">
          <template slot-scope="scope">
            <span class="scope-auto-hide"
                  :title="scope.row[col.fieldCode]">{{ scope.row[col.fieldCode] }}</span>
          </template>
        </el-table-column>
        <el-table-column v-else
                         :width="col.width"
                         :align="col.align"
                         :prop="col.fieldCode"
                         :key="col.fieldCode"
                         :sortable="col.sortable"
                         :label="col.fieldName">
          <template slot-scope="scope">
            <el-input v-model.trim="scope.row[col.fieldCode]"></el-input>
          </template>
        </el-table-column>
      </template>
      <el-table-column label="" key="" prop=""></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import auth from '@/store/auth'
  import areaData from '../../utils/area.js'
  import regions from '@/components/common/Regions'
  export default {
    name: 'DataTables',
    components: {
      regions
    },
    data () {
      return {
        options:null,
        cityAreaOptions: [],
        background: true,
        indexResizable: true,
        currentPaging: true,
        tableHeight: 150,
        currentPageSizes: [],
        checkList: [],
        headerColumns: [],
        adv: {
          see: true,
          edit: true,
          deleted: true,
          choice: false,
          auth:true
        }
      }
    },
    props: {
      columns: {
        type: Array ,
        default: function () {
          return []
        }
      },
      dataList: {
        type: Array ,
        default: function () {
          return []
        }
      },
      height: {
        type: Number,
        default: 0
      },
      top: {
        type: Number,
        default: 30
      },
      paging: {
        type: Boolean,
        default: true
      },
      tableFlag: {
        type: Boolean,
        default: false
      },
      tableIndex: {
        type: Number,
        default: 0
      },
      showSummary: {
        type: Boolean,
        default: false
      },
      sumText: {
        type: Object,
      default: function () {
          return {}
        }
      }
    },
    mounted () {
      this.init()
    },
    computed: {
    },
    methods: {
      cellStyle () {
        return 'padding: 8px 0'
      },
      init () {
        let that=this
        that.dataList.forEach(function (e, j) {
          e['index'] = j
        })
        var item = this.columns.find(item => item.fieldType === 'area')
        if (item) {
          this.cityAreaOptions = areaData.getAreas()
        }
        let tableTop = parseInt(this.top || 0)
        // 验证高度设置
        let height = (this.height || 0)
        if (height > 0) {
          this.tableHeight = height
        } else {
          this.tableHeight = window.innerHeight - 50 - tableTop
        }
      },

      getSummaries (param) {
        const sumRow = []
        let sumText = this.sumText
        if (!sumText) {
          return sumRow
        }
        let colList = sumText.columns
        if(!sumText || !colList || colList.length === 0) {
          return sumRow
        }
        const { columns, data } = param
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
              const value = Number(curr);
              if (!isNaN(value)) {
                return Math.round((prev + curr)*1000)/1000
              } else {
                return Math.round(prev*1000)/1000
              }
            }, 0)
            sumRow[index] += item.unit || ''
          }
        });

        return sumRow
      },
      /**
       * 地区选择回调函数
       */
      cellBackRegions (params) {


      },
      /*
       * 删除所选择的行
       * */
      deleteSelect(){
        let that = this
        that.dataList.forEach(function (e, j) {
          e['index'] = j
        })
        if(that.dataList.length <= 1) {
          that.$message.info('至少保留一行')
          return
        }
        that.checkList.forEach(function (d, i) {
          that.dataList.splice(d.index,1)
        })
        that.dataList.forEach(function (e, j) {
          e['index'] = j
        })
      },
      /*
       * 添加行
       * */
      addRow(){
          if(this.dataList && this.dataList.length==0){
            this.dataList.push({index: this.dataList.length})
          }else {
           var row= Object.assign({}, this.dataList[0])
            for(const e in row){
               row[e]=null
            }
            row.index=this.dataList.length
            this.dataList.push(row)
          }


      },

      /*
       * 父页面调用该方法，返回所有数据
       * */
      parentCallBack(){
        if (this.dataList && this.dataList.length > 0) {
          this.dataList.forEach(e => {
            e.area={}
            if (e.regionsData != undefined) {
              if (e.regionsData.length == 3) {
                var name3 = this.getAeasNames(e.regionsData);
                e.area.provinceName = name3[0]
                e.area.cityName = name3[1]
                e.area.countyName = name3[2]
                e.area.provinceCode = e.regionsData[0]
                e.area.cityCode = e.regionsData[1]
                e.area.countyCode = e.regionsData[2]
              } else if (e.regionsData.length == 2) {
                var name2 = this.getAeasNames(e.regionsData);
                e.area.provinceName = name2[0]
                e.area.cityName = name2[1]
                e.area.countyName = ""
                e.area.provinceCode = e.regionsData[0]
                e.area.cityCode = e.regionsData[1]
                e.area.countyCode = ""
              }else if(e.regionsData.length == 1){
                var name1 = this.getAeasNames(e.regionsData);
                e.area.provinceName = name1[0]
                e.area.cityName = ""
                e.area.countyName = ""
                e.area.provinceCode = e.regionsData[0]
                e.area.cityCode = ""
                e.area.countyCode = ""
              }else if(e.regionsData.length==0){
                e.area.provinceName = ""
                e.area.cityName = ""
                e.area.countyName = ""
                e.area.provinceCode = ""
                e.area.cityCode = ""
                e.area.countyCode = ""
              }
            }
          })
        }

        return this.dataList
      },

      /*
       * 输入框回车事件
       * */

      keyQuery(row){
        let params = {}
        params.type = 'keyQuery'
        params.row = row
        this.callBackMethod(params)
      },
      /*
      * 失去焦点返回
      * */
      blurChange(row,vuel,cod){
          if(vuel<0){
            row[cod]=0
          }
        this.dataList.forEach(function (e, j) {
          e['index'] = j
        })
        let params = {}
        params.type = 'change'
        params.row = row
        params.tableIndex=this.tableIndex
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
       * 当前选中
       */
      handleCurrentChange (row) {
        let params = {}
        params.type = 'current'
        params.row = row
        this.callBackMethod(params)
      },
      changeAll (rows,gg) {
        console.log(gg)
        console.log(rows)
        this.checkList = rows
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
        return time.getFullYear + '-' + time.getMonth + '-' + time.getDate + ' ' + time.getHours + ':' + time.getMinutes + ':' + time.getSeconds
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
          let dataValue = col.value
          if (typeof dataValue === 'string') {
            dataValue = JSON.parse(col.value)
          }
          let item = dataValue.find(item => item.value === cellValue.toString())
          cellValue = item.text
        } catch (e) {
          console.log(e)
        }
        return cellValue
      },

      /*
       *获取省市区名字
       * */
      getAeasNames(areaCodes){
        var name = [];
        if (areaCodes.length == 3) {
          this.cityAreaOptions.forEach(p => {
            if (areaCodes[0] == p.value) {
              name.push(p.label);
              p.children.forEach(c => {
                if (areaCodes[1] == c.value)
                  name.push(c.label);
                c.children.forEach(s => {
                  if (areaCodes[2] == s.value) {
                    name.push(s.label);
                    return;
                  }
                })
                return;
              })
              return;
            }
          })
        } else if (areaCodes.length == 2) {
          this.areas.forEach(p => {
            if (areaCodes[0] == p.value) {
              name.push(p.label);
              p.children.forEach(c => {
                if (areaCodes[1] == c.value)
                  name.push(c.label);
                return;
              })
              return;
            }
          })
        } else if (areaCodes.length == 1) {
          this.areas.forEach(p => {
            if (areaCodes[0] == p.value) {
              name.push(p.label)
              return
            }
          })

        }
        return name
      }
    }
  }

</script>

<style>
  .full-screen {
    position: absolute;
    box-sizing: border-box;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .dataTable{
    margin: 10px;

  }
  .dataTable .el-table__header th {
    background-color: #ebeef5 !important;
    border-right: 1px solid #FFF;
  }
  .dataTable .el-pagination{
    text-align: right;
    margin-top: 10px;
    padding: 0 50px 0 0;
  }
  .dataTable .el-pagination .btn-next span,
  .dataTable .el-pagination .btn-prev span{
    padding: 0 5px !important;
  }
  .scope-auto-hide{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
