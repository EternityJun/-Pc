<template>
  <el-dialog :title="isTips.title" :visible.sync="isTips.show" width="400px" append-to-body class="el-del-dialog" :close-on-click-modal="false">
    <div class="del-dialog-cnt">{{isTips.content}}</div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="cancel" class="cancel">取 消</el-button>
      <el-button size="small" type="primary" @click="sureCancel">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    isTips: Object
  },
  name: 'cancel',
  data () {
    return {}
  },
  methods: {
    /**
    * 确定取消
    * */
    sureCancel () {
      this.$emit('cancel', 'yes');
    },
    /**
     * 取消
     * */
    cancel () {
      this.$emit('cancel', 'no');
    }
  }
}
</script>
<style scoped>
</style>
