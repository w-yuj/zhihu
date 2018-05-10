<template>
    <div class="list-body" ref="listBody">
        <ul>
            <li class="stories-date" ref="bar">{{data.date|dateTime}}</li>
            <li class="stories-item border-1px" v-for="item in data.stories" :key="item.id">
                <div class="title">{{item.title}}</div>
                <div class="image-wrap">
                    <img class="image" :src="item.image|replaceUrl" :alt="item.title">
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  name: 'ListBody',
  props: {
    data: {
      type: null,
      default: function () {
        return {}
      }
    }
  },
  created () {},
  mounted () {
    this.$emit('update:height', this.$refs.listBody.offsetHeight)
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
@import '../../assets/css/common';
.list-body {
  .stories-date {
    color: #fff;
    background-color: #00a2ea;
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    z-index: 999;
  }
  .stories-item {
    list-style: none;
    height: 80px;
    padding: 10px;
    display: flex;
    background-color: #ffffff;

    .title {
      display: inline-block;
      flex: 1;
      padding-right: 20px;
      font-size: 16px;
    }
    .image-wrap {
      display: inline-block;
      height: 60px;
      width: 60px;
      .image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
