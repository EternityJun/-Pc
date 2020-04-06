<template>
  <div class="area-selector">
    <div class="text-selection">
      <el-cascader
        :options="provinceOptions"
        :placeholder="placeholder"
        v-model="selectedOptions"
        filterable
        change-on-select
        @change="handleChange">
      </el-cascader>
    </div>
  </div>
</template>

<script>
import areaData from '@/utils/area.js'
export default {
  name: 'Area',
  data () {
    return {
      currentAreaType: 'select',
      area: {
        province: '',
        provinceName: '',
        city: '',
        cityName: '',
        county: '',
        countyName: '',
        town: '',
        townName: ''
      },
      provinceOptions: [],
      cityOptions: [],
      countyOptions: [],
      selectedOptions: []
    }
  },
  props: {
    areaType: {
      type: Array,
      default: function () {
        return []
      }
    },
    index: {
      type: String,
      default: function () {
        return '0'
      }
    },
    regionsData: {
      type: Array,
      default: function () {
        return []
      }
    },
    placeholder: {
      type: String,
      default: '请选择区'
    }
  },
  computed: {},
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    /**
     * 初始方法
     */
    init () {
      if (this.regionsData) {
        this.selectedOptions = this.regionsData
      }
      // this.currentAreaType = this.areaType || 'select'
      this.provinceOptions = areaData.getAreas()
    },
    handleChange (value) {
      let province = this.provinceOptions.find(item => item.value === value[0])
      this.area.province = province.value
      this.area.provinceName = province.label
      if (value.length > 1) {
        let city = province.children.find(item => item.value === value[1])
        this.area.city = city.value
        this.area.cityName = city.label
        if (value.length > 2) {
          let county = city.children.find(item => item.value === value[2])
          this.area.county = county.value
          this.area.countyName = county.label
        }
      }
      // 回调参数
      let params = {}
      params.index = this.index
      params.area = this.area
      // 回调
      this.$emit('cellBack', params)
    },
    /**
     * 选择省
     */
    provinceChange (e) {
      let item = this.provinceOptions.find(item => item.value === e)
      this.area.city = ''
      this.area.cityName = ''
      this.area.county = ''
      this.area.countyName = ''
      this.area.town = ''
      this.area.townName = ''
      if (item === undefined) {
        this.cityOptions = []
      } else {
        this.area.provinceName = item.name
        this.cityOptions = item.children
      }
    },
    /**
     * 选择省
     */
    cityChange (e) {
      let item = this.cityOptions.find(item => item.value === e)
      this.area.county = ''
      this.area.countyName = ''
      this.area.town = ''
      this.area.townName = ''
      if (item === undefined) {
        this.countyOptions = []
      } else {
        this.area.cityName = item.name
        this.countyOptions = item.children
      }
    },
    /**
     * 选择省
     */
    countyChange (e) {
      this.area.town = ''
      this.area.townName = ''
      let item = this.cityOptions.find(item => item.value === e)
      if (item === undefined) {
      } else {
        this.area.countyName = item.name
      }
    },
    /**
     * 排序
     **/
    sortRegions (areaList) {
      for (let j = 0; j < areaList.length - 1; j++) {
        // 两两比较，如果前一个比后一个大，则交换位置。
        for (let i = 0; i < areaList.length - 1 - j; i++) {
          if (areaList[i] > areaList[i + 1]) {
            let temp = areaList[i]
            areaList[i] = areaList[i + 1]
            areaList[i + 1] = temp
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  .area-selector{
    overflow: hidden;
  }
</style>
