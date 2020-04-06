<template>
  <div>
    <div class="query_box" v-if="!showMore"></div>
    <div :class="className">
      <el-form  size="mini" :inline="true" ref="searchForm" :modal="searchData" label-width="85px">
      <el-form-item label-position="right" label-width="130px" class="cdkj-form-label"
                    v-for="(item, index) in searchTitle" :key="item.id" :label="item.title">
        <el-date-picker v-if="item.type === 'date' || item.type === 'datetime'"
                        class="search-input" :type="item.type" :data-index="index"
                        v-model="searchData[item.id]" :format="item.format" :id="item.id"
                        :placeholder="item.title"></el-date-picker>
        <el-date-picker v-else-if="item.type === 'daterange'" :type="item.type" :data-index="index"
                        range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                        v-model="searchData[item.id]" format="yyyy-MM-dd" :id="item.id"
                        :placeholder="item.title"></el-date-picker>
        <el-date-picker v-else-if="item.type === 'datetimerange'" :type="item.type" :data-index="index"
                        range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                        v-model="searchData[item.id]" format="yyyy-MM-dd HH:mm:ss" :id="item.id"
                        :placeholder="item.title"></el-date-picker>
        <el-switch v-else-if="item.type === 'switch'" class="search-input"
                   style="display: block"
                   v-model="searchData[item.id]"
                   active-color="#00A854"
                   :active-text="item.onText"
                   :active-value="item.onValue"
                   inactive-color="#F04134"
                   :inactive-text="item.offText"
                   :inactive-value="item.offValue">
        </el-switch>
        <el-select v-else-if="item.type === 'select'" :data-type="item.callType"  class="search-input"
                   @change="callback(item.callType,$event)" v-model="searchData[item.id]" filterable clearable
                   placeholder="请选择">
          <el-option
            v-for="item in item.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-cascader v-else-if="item.type === 'cascader'" class="search-input" expand-trigger="hover" :id="item.id" :options="item.options"
                     clearable v-model="searchData[item.id]"></el-cascader>
        <regions v-else-if="item.type === 'area'" :regionsData="searchData[item.id]" :index="item.id"
                 @cellBack="regionsCallback"></regions>
        <el-input v-else :type="item.type" class="search-input" :id="item.id" v-model="searchData[item.id]" :placeholder="item.title"/>
      </el-form-item>
      <el-form-item class="query_btns fr search-query" v-if="showMore">
        <span class="more_btn themeColor" style="display: none" @click="showMores(true)">更多选项
          <i class="el-icon-arrow-down"></i>
        </span>
        <el-button size="mini" type="primary" @click="queryList">查 询</el-button>
      </el-form-item>
      <el-form-item class="query_btns query_list" v-if="!showMore">
        <el-button type="primary" @click="queryList">查 询</el-button>
        <el-button type="info" @click="resetData">重 置</el-button>
        <span class="more_btn themeColor" @click="showMores(false)">收起选项
          <i class="el-icon-arrow-up"></i>
        </span>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
import layoutRegions from '@/components/layout/Regions'
export default {
  name: 'SearchTab',
  components: {
    layoutRegions
  },
  data () {
    return {
      className: 'query_box query_line',
      showMore: true,
      drawer: true,
      searchData: {}
    }
  },
  computed: {},
  props: {
    searchTitle: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    /**
     * 初始加载
     */
    init () {
    },
    /**
     * 查询
     */
    queryList (e) {
      this.callback('query', null)
    },
    /**
     * 重置查询条件
     */
    resetQueryForm () {

    },
    /**
     * 显示更多
     */
    showMores (really) {
      this.showMore = !really
      if (really) {
        this.className = 'query_box query_more'
      } else {
        this.className = 'query_box query_line'
      }
    },
    regionsCallback (params) {
      this.searchData[params.index] = params.area
    },
    callback (e, value) {
      if (e) {
        let params = {}
        params.type = e
        params.value = value
        params.data = this.searchData
        this.$emit('callBack', params)
      }
    },
    /**
     * 搜索
     */
    btnSearch () {
      let params = {}
      for (let i = 0; i < this.searchTitle.length; i++) {
        let data = this.searchTitle[i]
        params[data.id] = this.searchData[data.id]
      }
      params.type = 'query'
      this.$emit('callBack', params)
    },
    /**
     * 重置
     */
    resetData () {
      for (let i = 0; i < this.searchTitle.length; i++) {
        let data = this.searchTitle[i]
        if (data.type === 'cascader') {
          this.searchData[data.id] = []
        } else {
          if (this.searchData[data.id]) {
            this.searchData[data.id] = ''
          }
        }
      }
    },
    changeTime (val) {
      console.log(val)
    }
  }
}
</script>

<style scoped>
  .el-form-item{
    margin-bottom: 8px !important;
  }
  .query_box .search-input {
    max-width: 194px !important;
  }
  .query_box .el-input {
    width: 194px !important;
  }
  .query_box .el-range-editor {
    width: 380px !important;
  }
  .query_box .el-switch {
    margin-top: 10px;
  }
</style>
