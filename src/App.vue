<template>
  <div id="app">
    <Loading v-if="loading"/>
    <router-view/>
  </div>
</template>

<script>
import Loading from '@/components/layout/Loading.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    Loading
  },
  name: 'App',
  computed: {
    ...mapGetters(['loading'])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height:100%;
}
</style>
