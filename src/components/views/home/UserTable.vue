<template>
  <div>
    <layoutDataTable
      id="categoryTableList"
      :pageIndex="1"
      :total="45"
      :columns="columns"
      :dataList="dataList"/>
  </div>
</template>

<script>
import layoutDataTable from '@/components/layout/DataTables'
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'CategoryList',
  components: {
    layoutDataTable
  },
  data () {
    return {
      columns: [
        {fieldType: 'number', fieldName: '序号', width: '60'},
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
      ]
    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters('rms', ['USER_DATA']),
    ...mapGetters(['loading'])
  },
  methods: {
    ...mapActions('rms', ['findRmsUserPageList']),
    init () {

    }
  }
}
</script>

<style scoped>
#categoryTableList{
  text-align:center;
}
</style>
