<template>
  <div class="rolePage">
    <layoutSearchTab :searchTitle="searchTitle"/>
      <p class="create"><el-button @click="createVisible = true" type="primary">新增</el-button></p>
    <layoutDataTable
      id="categoryTableList"
      :pageIndex="1"
      :total="45"
      @callBack="create"
      :columns="columns"
      :dataList="dataList"/>

    <!--新增角色弹出框-->
      <el-dialog
        title="新增角色"
        :visible.sync="createVisible"
        width="60%" >
        <el-form :label-position="labelPosition" :rules="rules" label-width="80px" :model="roleVo">
          <el-form-item label="角色名" prop="roleName">
            <el-input class="widthInput" v-model="roleVo.roleName"></el-input>
          </el-form-item>
          <el-form-item label="是否删除">
              <el-select v-model="roleVo.enabled" placeholder="是否删除">
                  <el-option v-for="item in isDeleted" :key="item" :label="item.text" :value="item.value"/>
              </el-select>
          </el-form-item>
          <el-form-item label="所在机构编码" prop="organizationCode">
            <el-input class="widthInput" v-model="roleVo.organizationCode"></el-input>
          </el-form-item>
          <el-form-item label="所在机构上级名称" prop="topOrganizationName">
            <el-input class="widthInput" v-model="roleVo.topOrganizationName"></el-input>
          </el-form-item>
          <el-form-item label="备注">
              <el-input type="textarea" v-model="roleVo.remark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="createVisible = false">取 消</el-button>
          <el-button type="primary" @click="createVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    <!--编辑弹出框-->
      <el-dialog
        title="编辑角色"
        :visible.sync="roleVoVisible"
        width="60%" >

        <el-form :label-position="labelPosition" :rules="rules" label-width="80px" :model="roleVo">
          <el-form-item label="角色名" prop="roleName">
            <el-input v-model="roleVo.roleName"></el-input>
          </el-form-item>
          <el-form-item label="是否删除">
              <el-select v-model="roleVo.isDeleted" placeholder="是否删除">
                  <el-option v-for="item in isDeletedList" :key="item" :label="item.text" :value="item.value"/>
              </el-select>
          </el-form-item>
          <el-form-item label="所在机构编码" prop="organizationCode">
            <el-input v-model="roleVo.organizationCode"></el-input>
          </el-form-item>
          <el-form-item label="所在机构上级名称" prop="topOrganizationName">
            <el-input v-model="roleVo.topOrganizationName"></el-input>
          </el-form-item>
          <el-form-item label="备注">
              <el-input type="textarea" v-model="roleVo.remark"></el-input>
          </el-form-item>
          <el-form-item label="资源管理">
              <el-input v-model="roleVo.resourceManagement"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="roleVoVisible = false">取 消</el-button>
          <el-button type="primary" @click="roleVoVisible = false">确 定</el-button>
        </span>
      </el-dialog>
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
        {type: 'search', title: '角色名', id: 'idDatetime1', format: 'yyyy-MM-dd HH:mm:ss'},
      ],
      columns: [
        {fieldType: 'number', fieldName: '序号',width:'78'},
        {fieldCode: 'roleName', fieldName: '角色名称', width: '200'},
        {fieldType: 'switch', fieldCode: 'isDeleted', fieldName: '是否删除', width: '150', onText: '启用', onValue: 0, offText: '禁用', offValue: 1},        
        {fieldCode: 'organizationCode', fieldName: '所在机构编码', width: '200'},
        {fieldCode: 'topOrganizationName', fieldName: '所在机构上级名称', width: '200'},
        {fieldCode: 'remark', fieldName: '备注', width: '200'},
        {
          fieldType: 'custome-adv',
          fieldName: '操作选项',
          fixed: 'right',
          width: '200',
          btnList:
            [
              {text: '编辑', method: 'edit', type: 'primary'},
              {text: '删除', method: 'delete', type: 'danger'},
            ]
        }
      ],
      dataList: [
        {rolename:'李四',organizationCode:'123213'},
        {rolename:'李四',organizationCode:'123213'},
        {rolename:'李四',organizationCode:'123213'},
        {rolename:'李四',organizationCode:'123213'},
        {rolename:'李四',organizationCode:'123213'},
        {rolename:'王五',organizationCode:'123213'}
      ],
      labelPosition: 'right',
      //新增角色
      roleVo:{
        id:1,
        roleName:'',
        isDeleted:1,
        organizationCode:'',
        topOrganizationName:'',
        remark:''
      },
      //是否删除
      isDeletedList: [
        {text: '是', value: 0},
        {text: '否', value: 1}
      ],
      //编辑角色
      formLabelAlign: {
        rolename: '',
        roleState: ''
      },
      //新增表单规则
       rules: {
        roleName: [
          {required: true, message: '角色名称不能为空', trigger: 'blur'},
        ],
        organizationCode: [
          {required: true, message: '所在机构编码', trigger: 'blur'}
        ],
        topOrganizationName: [
          {required: true, message: '所在机构上级名称不能为空', trigger: 'blur'}
        ]
      },
      createVisible: false,
      roleVoVisible:false
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    init () {

    },
  create(e){
    if(e.type=='edit'){
      this.roleVoVisible=true;
      this.formLabelAlign=Object.assign({},e.row)
    }
  }
  }
}
</script>

<style lang="less" scoped>
.rolePage{
  padding-top:30px;
}
.create{
  margin-left:10px;
}
.widthInput{
  padding:0 10px;
}
.el-form-item__label{
  width:200px !important;
}
</style>
