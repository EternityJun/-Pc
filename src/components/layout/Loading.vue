<template>
  <div class="mint-indicator">
    <div class="mint-indicator-wrapper" style="padding: 15px;">
    <span class="mint-indicator-spin">
      <div class="mint-spinner-snake" style="border-top-color: rgb(204, 204, 204); border-left-color: rgb(204, 204, 204); border-bottom-color: rgb(204, 204, 204); height: 32px; width: 32px;"></div>
    </span>
      <span class="mint-indicator-text" style="display: none;"></span>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
import {Loading} from 'element-ui'
export default {
  name: 'Loading',
  components: {
    Loading
  },
  data () {
    return {msg: '这个是Home模板页'}
  }
}
</script>

<style scoped>
  .mask {
    opacity: 0.5;
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background: #000;
    z-index: 9999;
  }
  .mint-indicator {
    -webkit-transition: opacity 0.2s linear;
    transition: opacity 0.2s linear;
  }
  .mint-indicator-wrapper {
    top: 50%;
    left: 50%;
    position: fixed;
    z-index: 999;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    box-sizing: border-box;
    text-align: center;
  }
  .mint-indicator-text {
    display: block;
    color: #fff;
    text-align: center;
    margin-top: 10px;
    font-size: 16px;
  }
  .mint-indicator-spin {
    display: inline-block;
    text-align: center;
  }
  .mint-indicator-enter,
  .mint-indicator-leave-active {
    opacity: 0;
  }

  .mint-spinner-snake {
    -webkit-animation: mint-spinner-rotate 0.8s infinite linear;
    animation: mint-spinner-rotate 0.8s infinite linear;
    border: 4px solid transparent;
    border-radius: 50%;
  }
  @-webkit-keyframes mint-spinner-rotate {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes mint-spinner-rotate {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
