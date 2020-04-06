<template>
  <div class="userPage">
  <!--用户管理界面-->
    <layoutSearchTab @callBack="callBack" :searchTitle="searchTitle"/>
      <p class="create">
        <el-button size="mini" @click="addUserInfo" type="primary">新增</el-button>
      </p>
    <layoutDataTable
      id="categoryTableList"
      :pageIndex="table.pageIndex"
      :total="table.total"
      :top="table.top"
      @callBack="callBack"
      :columns="table.columns"
      :dataList="table.dataList"/>
    <!--编辑弹出框-->
    <el-dialog
      title="编辑用户信息"
      :visible.sync="dialogVisible"
      width="40%">
        <el-form size="mini" :rules="rules" ref="userVo" :model="userVo" label-width="80px">
            <el-form-item label="账户名称" prop="loginName">
                <el-input type="text" v-model="userVo.loginName" placeholder="只能输入字符及数字 6-20 位"/>
            </el-form-item>
            <el-form-item label="账户类型" prop="userTypeId">
                <el-select v-model="userVo.userTypeId" placeholder="请选择账户类型" @change="changeType">
                    <el-option v-for="item in userTypeList" :key="item" :label="item.constName" :value="item.id"/>
                </el-select>
            </el-form-item>
            <el-form-item label="角色" prop="roleIds">
                <el-select v-model="userVo.roleIds" multiple placeholder="请选择角色">
                    <el-option v-for="item in roleList" :key="item" :label="item.roleName" :value="item.id"/>
                </el-select>
            </el-form-item>
            <el-form-item label="姓名" prop="displayName">
                <el-input type="text" v-model="userVo.displayName" placeholder="姓名"/>
            </el-form-item>
            <el-form-item label="手机" prop="cellphone">
                <el-input type="text" v-model="userVo.cellphone" placeholder="手机"/>
            </el-form-item>
            <el-form-item label="备用电话">
                <el-input type="text" v-model="userVo.telephone" placeholder="备用电话"/>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="userVo.sex" placeholder="性别">
                    <el-option v-for="item in sexList" :key="item" :label="item.text" :value="item.value"/>
                </el-select>
            </el-form-item>
            <el-form-item label="是否启用">
                <el-select v-model="userVo.enabled" placeholder="是否启用">
                    <el-option v-for="item in enabledList" :key="item" :label="item.text" :value="item.value"/>
                </el-select>
            </el-form-item>
            <el-form-item label="民族">
                <el-select v-model="userVo.nation" placeholder="请选择民族">
                    <el-option v-for="item in nationList" :key="item" :label="item.constName" :value="item.id"/>
                </el-select>
            </el-form-item>
            <el-form-item label="籍贯">
                <el-input type="text" v-model="userVo.nativePlace" placeholder="籍贯"/>
            </el-form-item>
            <el-form-item label="生日">
                <el-date-picker
                        v-model="userVo.birthday"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="地址" style="display: none">
                <el-select v-model="userVo.addressFirstId" @change="changeFirstAddress" placeholder="省" style="width: 150px">
                    <el-option v-for="item in addressFirstList" :key="item" :label="item.name" :value="item.id"/>
                </el-select>
                <el-select v-model="userVo.addressSecondId" @change="changeSecondAddress" placeholder="市" style="width: 150px">
                    <el-option v-for="item in addressSecondList" :key="item" :label="item.name" :value="item.id"/>
                </el-select>
                <el-select v-model="userVo.addressId" placeholder="区（县）" style="width: 150px">
                    <el-option v-for="item in addressThreeList" :key="item" :label="item.name" :value="item.id"/>
                </el-select>
            </el-form-item>
            <el-form-item label="详细地址">
                <el-input type="text" v-model="userVo.addressDetails" placeholder="详细地址"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">保存</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
import layoutSearchTab from '@/components/layout/SearchTab'
import layoutDataTable from '@/components/layout/DataTables'
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'CategoryList',
  components: {
    layoutSearchTab,
    layoutDataTable
  },
  data () {
    return {
      searchTitle: [
        {type: 'search', title: '用户名', id: 'loginName'},
        {type: 'search', title: '手机', id: 'cellphone'},
        {type: 'search', title: '姓名', id: 'displayName'}
      ],
      table: {
        columns: [
          {fieldType: 'number', fieldName: '序号', width: '78'},
          {fieldCode: 'loginName', fieldName: '用户名', width: '150'},
          {fieldCode: 'displayName', fieldName: '姓名', width: '150'},
          {fieldCode: 'cellphone', fieldName: '手机', width: '150'},
          {fieldType: 'formatter', fieldCode: 'sex', fieldName: '性别', width: '150', fieldValue: [{'text': '男', 'value': '1'}, {'text': '女', 'value': '2'}]},
          {fieldType: 'switch', fieldCode: 'enabled', fieldName: '是否启用', width: '150', onText: '启用', onValue: 0, offText: '禁用', offValue: 1},
          {fieldCode: 'addUserName', fieldName: '添加人', width: '150'},
          {fieldType: 'time', fieldCode: 'addTime', fieldName: '添加时间', width: '160'},
          {fieldCode: 'editUserName', fieldName: '修改人', width: '150'},
          {fieldType: 'time', fieldCode: 'editTime', fieldName: '修改时间', width: '160'},
          {
            fieldType: 'custome-adv',
            fieldName: '操作选项',
            fixed: 'right',
            width: '260',
            btnList: [
              {text: '编辑', method: 'edit', type: 'primary'},
              {text: '重置密码', method: 'changePwd', type: 'danger'}]
          }
        ],
        dataList: [
          {
            
          }
        ],
        total: 0,
        top: 120,
        pageIndex: 1,
        pageSize: 15
      },
      userVo: {
        addressFirstId: '',
        addressSecondId: '',
        addressId: '',
        addressDetails: '',
        displayName: '',
        birthday: '',
        cellphone: '',
        enabled: 1,
        loginName: '',
        nation: '',
        nativePlace: '',
        password: '123456',
        remark: '',
        sex: 1,
        telephone: '',
        userTypeId: '',
        userTypeName: '',
        currentOrganizationId: '',
        roleIds: [],
        roleList: []
      },
      sexList: [
        {text: '男', value: 1},
        {text: '女', value: 2}
      ],
      enabledList: [
        {text: '启用', value: 0},
        {text: '禁用', value: 1}
      ],
      userTypeList: [
        {'constName': '护士', id: 'nurse'},
        {'constName': '护工', id: 'nursing_workers'},
        {'constName': '老人', id: 'elderly'},
        {'constName': '家属', id: 'family_members'},
        {'constName': '志愿者', id: 'volunteer'},
        {'constName': '医生', id: 'doctor'},
        {'constName': '前台', id: 'reception'}
      ],
      nationList: [],
      addressFirstList: [],
      addressSecondList: [],
      addressThreeList: [],
      roleList: [],
      rules: {
        loginName: [
          {required: true, message: '账户名称不能为空', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
        ],
        userTypeId: [
          {required: true, message: '账户类型不能为空', trigger: 'blur'}
        ],
        displayName: [
          {required: true, message: '姓名不能为空', trigger: 'blur'}
        ],
        cellphone: [
          {required: true, message: '手机不能为空', trigger: 'change'}
        ],
        roleIds: [
          {required: true, message: '角色不能为空', trigger: 'change'}
        ]
      },
      dialogVisible: false,
      searchData: {}
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    ...mapGetters('rms', ['USER_DATA', 'INSERT_DATA', 'MODIFY_DATA', 'ROLE_DATA']),
    ...mapGetters('bms', ['ADDRESS_DATA'])
  },
  methods: {
    ...mapActions('rms', ['findRmsUserPageList', 'insertRmsUser', 'modifyRmsUser', 'modifyPassword', 'listRole']),
    ...mapActions('bms', ['listAddress']),
    init () {
      let params = {}
      params['pageIndex'] = 1
      params['pageSize'] = this.table.pageSize
      this.query(params)
      this.loadAddress(0)
    },
    loadAddress (level, parentId) {
      let params = {}
      params['level'] = level
      params['parentId'] = parentId
      let that = this
      // 地址数据
      that.listAddress(params)
        .then(result => {
          switch (level) {
            case 1:
              that.addressSecondList = that.ADDRESS_DATA.data
              break
            case 2:
              that.addressThreeList = that.ADDRESS_DATA.data
              break
            default:
              that.addressFirstList = that.ADDRESS_DATA.data
              break
          }
        })
      // 角色信息
      that.listRole({})
        .then(result => {
          let data = that.ROLE_DATA
          if (data.code === 0) {
            that.roleList = data.data
          }
        })
    },
    query (params) {
      let that = this
      that.findRmsUserPageList(params)
        .then(result => {
          let data = that.USER_DATA
          if (data.code === 0) {
            that.table.dataList = data.data
            that.table.total = data.total
          }
        })
    },
    callBack (e) {
      let params = this.searchData
      switch (e.type) {
        case 'edit':
          if (e.row.loginName === 'admin') {
            this.$message.warning('超级管理员不能修改')
            return
          }
          this.userVo = e.row
          if (this.userVo.roleList !== null && this.userVo.roleList.length > 0) {
            this.userVo.roleIds = []
            for (let i = 0; i < this.userVo.roleList.length; i++) {
              let role = this.userVo.roleList[i]
              this.userVo.roleIds.push(role.id)
            }
          }
          this.dialogVisible = true
          break
        case 'switch':
          if (e.row.loginName === 'admin') {
            this.$message.warning('超级管理员不能修改')
            return
          }
          this.userVo = e.row
          this.modifyUser()
          break
        case 'changePwd':
          if (e.row.loginName === 'admin') {
            this.$message.warning('超级管理员不能修改')
            return
          }
          this.changePassword(e.row)
          break
        case 'pageIndex':
          params['pageIndex'] = e.pageIndex
          params['pageSize'] = e.pageSize
          this.query(params)
          break
        case 'pageSize':
          params['pageIndex'] = e.pageIndex
          params['pageSize'] = e.pageSize
          this.query(params)
          break
        case 'query':
          params = e.data
          params['pageIndex'] = 1
          params['pageSize'] = this.table.pageSize
          this.searchData = e.data
          this.query(params)
          break
        default:
          break
      }
    },
    changePassword (row) {
      let params = {}
      params['id'] = row.id
      params['oldPassword'] = '000000'
      let that = this
      that.modifyPassword(params)
        .then(function () {
          let data = that.MODIFY_DATA
          if (data.code === 0) {
            that.$message.success('重置密码成功！')
          } else {
            that.$message.warning('重置密码失败！')
          }
        }, function (e) {
          that.$message.warning(e)
        })
    },
    changeFirstAddress (e) {
      let item = this.addressFirstList.find(c => c.id === e)
      this.loadAddress(item.level + 1, item.id)
    },
    changeSecondAddress (e) {
      let item = this.addressSecondList.find(c => c.id === e)
      this.loadAddress(item.level + 1, item.id)
    },
    changeType (e) {
      let item = this.userTypeList.find(c => c.id === e)
      this.userVo.userTypeName = item.constName
    },
    addUser () {
      let that = this
      that.insertRmsUser(that.userVo)
        .then(result => {
          let data = that.ADDRESS_DATA
          if (data.code === 0) {
            that.query({})
            that.resetForm()
            that.dialogVisible = false
            that.$message.success('保存成功')
          } else {
            that.$message.warning(data.message)
          }
        })
    },
    modifyUser (row) {
      let that = this
      that.modifyRmsUser(that.userVo)
        .then(result => {
          let data = that.ADDRESS_DATA
          if (data.code === 0) {
            that.query({})
            that.resetForm()
            that.dialogVisible = false
            that.$message.success('保存成功')
          } else {
            that.$message.warning(data.message)
          }
        })
    },
    submitForm () {
      let that = this
      that.$refs['userVo'].validate(valid => {
        if (valid) {
          let len = that.userVo.roleIds.length
          for (let i = 0; i < len; i++) {
            let id = that.userVo.roleIds[i]
            that.userVo.roleList.push({id: id, userId: that.userVo.id})
          }
          if (!that.userVo.id) {
            that.addUser()
          } else {
            that.modifyUser()
          }
        }
      })
    },
    addUserInfo () {
      this.resetForm()
      this.dialogVisible = true
    },
    resetForm () {
      this.userVo = {
        addressFirstId: '',
        addressSecondId: '',
        addressId: '',
        addressDetails: '',
        displayName: '',
        birthday: '',
        cellphone: '',
        enabled: 1,
        loginName: '',
        nation: '',
        nativePlace: '',
        password: '123456',
        remark: '',
        sex: 1,
        telephone: '',
        userTypeId: '',
        userTypeName: '',
        currentOrganizationId: '',
        roleIds: [],
        roleList: []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.userPage{
  padding-top:10px;
}
.create{
  margin-left:10px;
}
.userInfoPage{
  background:#fff;
  .operation{
    display:flex;
    height:400px;
    .onload{
      height:40px;
    }
    .el-input{
      width:280px;
      margin:0 15px;
    }
    .download{
      height:40px;
    }
  }
}
.createTab{
  .lable{
    display:inline-block;
    width:60px;
  }
  .el-input{
    width:150px;
  }
}
</style>
