<template>
  <el-dialog title="确认删除" :visible.sync="isDel.show" width="400px" center :show-close="false" :close-on-click-modal="false"
    append-to-body class="el-del-dialog">
    <div class="del-dialog-cnt">{{isDel.content}}</div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="cancelD" class="dialog-cancel">取 消</el-button>
      <el-button size="small" type="primary" @click="deleteRow" class="dialog-sure">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    isDel: Object
  },
  name: 'delete',
  data () {
    return {}
  },
  methods: {
    // 确定删除
    deleteRow () {
      this.$emit('delete', 'yes');
    },
    // 取消
    cancelD () {
      this.$emit('delete', 'cancel');
    }
  }
}
</script>

<style scoped>

</style>
