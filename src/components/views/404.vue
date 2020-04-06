<template>
  <div class="error">
    <div class="imgWrapper">
      <img src="~img/errorPages/404.png" alt="404">
      <div class="tips">
        <p>页面出错啦，打不开网页？试试刷新网页或者回到首页</p>
        <p class="btn">
          <el-button type="primary" @click="refresh">刷新网页</el-button>
          <el-button type="primary" @click="$router.replace('/home/index')">返回首页</el-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    refresh () {
      location.reload();
    }
  }
}
</script>
