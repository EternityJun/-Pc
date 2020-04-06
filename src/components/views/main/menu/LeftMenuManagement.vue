<template>
  <div class="rolePage">
      <p class="create"><el-button @click="createVisible = true" type="primary">新增</el-button></p>

    <!--新增弹出框-->
      <el-dialog
        title="添加菜单"
        :visible.sync="createVisible"
        width="60%" >
        <!--添加菜单-->
        <el-form :label-position="labelPosition" label-width="80px" :model="addUserList">
          <el-form-item label="菜单名称">
            <el-input class="widthInput" v-model="addUserList.name"></el-input>
          </el-form-item>
          <el-form-item
              label="资源编码"
              prop="code"
              :rules="[
                { required: true, message: '资源编码不能为空'},
                { type: 'string', message: '资源编码必须为字符型'}
              ]"
            >
              <el-input type="code" v-model.number="addUserList.code" autocomplete="off"></el-input>
            </el-form-item>
          <p>是否可用
            <el-switch
              v-model="addUserList.enabled"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </p>
            <el-form-item
              label="排序"
              prop="rank"
              :rules="[
                { required: true, message: '排序不能为空'},
                { type: 'number', message: '排序必须为数字值'}
              ]"
            >
              <el-input type="rank" v-model.number="addUserList.rank" autocomplete="off"></el-input>
            </el-form-item>
          <el-form-item label="备注">
              <el-input type="textarea" v-model="addUserList.remark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="createVisible = false">取 消</el-button>
          <el-button type="primary" @click="resourceVo">确 定</el-button>
        </span>
      </el-dialog>
      <!-- default-expand-all   是否默认展开所有节点
          expand-on-click-node  是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点
          render-content        树节点的内容区的渲染 Function
       -->
      <!--展示-->
      <div class="custom-tree-container">
        <div class="block">
          <el-tree
            :data="data"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent">
          </el-tree>
        </div>
      </div>
  </div>
</template>

<script>
  let id = 1000;
import {mapActions, mapGetters} from 'vuex'
export default {
  data () {
     const data = [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }];
    return {
      data: JSON.parse(JSON.stringify(data)),
      labelPosition: 'right',
      //添加资源
      addUserList:{
        name:'',
        code:'',
        enabled:true,
        rank:'',
        remark:''
      },
      createVisible: false,
      editVisible:false,
    }
  },
  computed:{
    ...mapGetters('center', ['Get_MENU']),
  },
  methods: {
    ...mapActions('center', ['getMenuAccountList']),
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button size="mini" type="text" on-click={ () => this.append(data) }>添加</el-button>
            <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
          </span>
        </span>);
    },
    resourceVo(){
      createVisible = false
    }
  },
  created(){
    console.log(this.$route.params)
  }
}
</script>

<style lang="less" scoped>
.create{
  margin-left:10px;
}
.widthInput{
  width:200px;
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
