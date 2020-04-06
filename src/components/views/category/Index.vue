<template>
  <div>
    <layoutSearchTab :searchTitle="searchTitle"/>
    <layoutDataTable
      id="categoryTableList"
      :pageIndex="1"
      :total="45"
      :columns="columns"
      :dataList="dataList"/>
  </div>
</template>

<script>
import layoutSearchTab from '@/components/layout/SearchTab'
import layoutDataTable from '@/components/layout/DataTables'

export default {
  name: 'CategoryList',
  components: {
    layoutSearchTab,
    layoutDataTable
  },
  data () {
    return {
      searchTitle: [
        {type: 'datetime', title: '搜索条件1', id: 'idDatetime', format: 'yyyy-MM-dd HH:mm:ss'},
        {type: '', title: '搜索条件3', id: 'idDatetime1', format: 'yyyy-MM-dd HH:mm:ss'},
        {type: 'switch', title: '搜索条件4', onText: '是', onValue: 1, offText: '否', offValue: 0, id: 'idDatetime2', format: 'yyyy-MM-dd HH:mm:ss'},
        {type: 'select', title: '搜索条件5', id: 'idDatetime3', format: 'yyyy-MM-dd HH:mm:ss'},
        {type: 'daterange', title: '时间段搜索', id: 'idDatetime4'},
        {type: 'datetimerange', title: '时间段搜索', id: 'idDatetime5'},
        {type: 'cascader', title: '搜索条件6', id: 'idDatetime6', format: 'yyyy-MM-dd HH:mm:ss'},
        {type: 'date', title: '搜索条件2', id: 'idDatetime7'},
        {type: '', title: '搜索条件7', id: 'idDatetime8', format: 'yyyy-MM-dd HH:mm:ss'},
        {type: '', title: '搜索条件8', id: 'idDatetime9', format: 'yyyy-MM-dd HH:mm:ss'},
        {type: '', title: '搜索条件9', id: 'idDatetime10', format: 'yyyy-MM-dd HH:mm:ss'},
        {type: '', title: '搜索条件10', id: 'idDatetime11', format: 'yyyy-MM-dd HH:mm:ss'}
      ],
      columns: [
        {fieldType: 'number', fieldName: '序号'},
        {fieldCode: 'category_code', fieldName: '类目编码', width: '150'},
        {fieldCode: 'category_name', fieldName: '类目名称', width: '150'},
        {fieldCode: 'grade', fieldName: '等级', width: '150'},
        {fieldCode: 'parentName', fieldName: '上级类目名称', width: '150'},
        {fieldCode: 'remarks', fieldName: '备注', width: '150'},
        {fieldCode: 'addTime', fieldName: '添加时间', width: '150'},
        {fieldCode: 'addUserName', fieldName: '添加用户', width: '150'},
        {fieldCode: 'editTime', fieldName: '最后修改时间', width: '150'},
        {fieldCode: 'editUserName', fieldName: '最后修改人', width: '150'},
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
        {category_code: '234234'},
        {category_code: '234234'},
        {category_code: '234234'},
        {category_code: '234234'},
        {category_code: '234234'},
        {category_code: '234234'},
        {category_code: '234234'},
        {category_code: '234234'},
        {category_code: '234234'},
        {category_code: '234234'},
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
  },
  methods: {
    init () {

    }
  }
}
</script>

<style scoped>

</style>
