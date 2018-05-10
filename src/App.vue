<template>
  <div id="app">
    <v-header @handleTop="handleTop" :y="y" :title="title"></v-header>
    <div class="router-view">
      <router-view ref="routerView" @moveBar="moveBar" />
    </div>
  </div>
</template>

<script>
import VHeader from '@/components/header/header'
export default {
  name: 'App',
  data () {
    return { y: 0, title: '今日热闻' }
  },
  components: {
    VHeader
  },
  methods: {
    // 双击header
    handleTop () {
      let f = this.$refs.routerView.handleTop
      if (typeof f === 'function') {
        this.$refs.routerView.handleTop()
      }
    },
    moveBar (y, title) {
      this.y = y
      if (title) {
        this.title = title
      }
    }
  }
}
</script>

<style>
#app {
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
  font-family: Source Sans Pro, Helvetica, sans-serif;
}
.router-view {
  background-color: #f2f2f2;
}
</style>
