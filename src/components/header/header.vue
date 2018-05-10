<template>
  <div class="header morning" ref="header" @click="handleTop" :style="{transform: 'translateY('+y+'px)'}">
    <span class="iconfont icon-menu nav-icon" @click="showSidebar" :style="{transform: 'translateY('+-y+'px)'}"></span>
    <div class="title" :class="title==='今日热闻'?'today':''">
      {{title}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'VHeader',
  props: {
    title: {
      type: String,
      default: '今日热闻'
    },
    y: {
      type: Number,
      default: 0
    }
  },
  methods: {
    showSidebar () {},
    handleTop () {
      let nowTime = Date.now()
      let lastClickTime = this.lastClickTime || 0
      if (nowTime - lastClickTime < 400) {
        this.lastClickTime = 0
        this.$emit('handleTop')
      } else {
        this.lastClickTime = nowTime
      }
    }
  },
  watch: {}
}
</script>
<style lang="scss">
.header {
  z-index: 3;
  height: 40px;
  width: 100%;
  text-align: center;
  position: fixed;
  top: 0;
  &.morning {
    color: #fff;
    background-color: #00a2ea;
  }
  .title {
    line-height: 40px;
    font-size: 16px;
    &.today{
        font-size: 18px;
    }
  }
  .nav-icon {
    width: 40px;
    height: 40px;
    font-size: 18px;
    line-height: 40px;
    position: absolute;
    left: 0px;
    top: 0;
  }
}
</style>
