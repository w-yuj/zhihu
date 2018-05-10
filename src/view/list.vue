<template>
  <div class="page" ref="page">
    <scroll :data="storiesData" ref="scroll" :pullUpLoad="pullUpLoadObj" @pullingUp="moreData" :listenScroll="true" @scroll="handleScroll">
      <div>
        <swiper :options="swiperOption" ref="swiper" @ready="swiperReady" class="swiper">
          <swiper-slide class="swiper-slide" v-for="item in topStories" :key="item.id">
            <img class="top-image" :src="item.image|replaceUrl" :alt="item.title">
            <h1 class="slider-title">{{item.title}}</h1>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="stories-list">
          <list-body class="list-body" v-for="item in storiesData" :key="item.date" :data="item" :height.sync="item.height"></list-body>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getNews, getNewsBefore } from '../api/stories'
import scroll from '@/components/scroll/scroll'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import listBody from '@/components/list-body/list-body'
export default {
  name: 'List',
  data () {
    return {
      pullUpLoadObj: {
        threshold: 0,
        txt: {
          more: '加载更多',
          noMore: '没有更多数据了'
        }
      },
      storiesData: [],
      topStories: [],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: {
          delay: 3500
        }
      }
    }
  },
  created () {
    this.date = new Date()
    this.listHeight = []
    getNews().then(res => {
      let _date = res.data.date
      let _stories = res.data.stories
      let _topStories = res.data.top_stories
      _stories.map(item => {
        item.image = item.images[0]
      })
      this.storiesData = [
        {
          date: _date,
          stories: _stories
        }
      ]
      this.topStories = _topStories
      this.calcListHeight()
    })
  },
  methods: {
    swiperReady (e) {
      this.swiper = e
    },
    handleTop () {
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
    formatDate (time) {
      if (('' + time).length === 10) time = parseInt(time) * 1000
      let date = new Date(time)
      const _addZero = number => (number < 10 ? '0' + number : number)
      let Y = date.getFullYear()
      let M = _addZero(date.getMonth() + 1)
      let D = _addZero(date.getDate())
      let str = Y + M + D
      return str
    },
    // 日期往前一天
    reduceDate () {
      this.date.setDate(this.date.getDate() - 1)
    },
    // 加载往期news
    moreData () {
      let _dateStr = this.formatDate(this.date.valueOf())
      getNewsBefore(_dateStr).then(res => {
        let _date = res.data.date
        let _stories = res.data.stories
        _stories.map(item => {
          item.image = item.images[0]
        })
        this.storiesData.push({
          date: _date,
          stories: _stories
        })
        this.reduceDate()
        this.calcListHeight()
      })
    },
    handleScroll (pos) {
      const listHeight = this.listHeight
      for (let i = 0; i < listHeight.length; i++) {
        let h1 = listHeight[i]
        let h2 = listHeight[i + 1]
        let barHeight = this.barHeight
        if (-pos.y > h1 && -pos.y < h2) {
          if (-pos.y < h1 + barHeight && i !== 0) {
            this.$emit('moveBar', h1 + pos.y, this.calcTitle(i - 1))
          } else if (-pos.y > h1 + barHeight) {
            this.$emit('moveBar', 0, this.calcTitle(i))
          }
          break
        }
      }
    },
    calcTitle (i) {
      let _date = this.storiesData[i].date
      return this.$options.filters['dateTime'](_date)
    },
    calcListHeight () {
      setTimeout(() => {
        let height = this.swiper.height
        let list = this.storiesData
        this.listHeight = [height]
        for (let i = 0; i < list.length; i++) {
          height += list[i].height
          this.listHeight.push(height)
        }
      }, 20)
    }
  },
  mounted () {
    let w = this.$refs.page.offsetWidth
    this.barHeight = w / 750 * 80
  },
  components: {
    scroll,
    swiper,
    swiperSlide,
    listBody
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import '../assets/css/swiper.min';

.page {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
}

.swiper-slide {
  position: relative;
  .top-image {
    display: inline-block;
    object-fit: cover;
    height: 230px;
    width: 100%;
  }
  .slider-title {
    position: absolute;
    bottom: 23px;
    line-height: 1.2;
    left: 0;
    padding: 0 18px;
    font-weight: 300;
    font-size: 21px;
    color: #ffffff;
  }
}
.swiper {
  margin-top: 40px;
}
.swiper-pagination-bullet {
  width: 6px;
  height: 6px;
  display: inline-block;
  border-radius: 100%;
  background: #5a5a5a;
  opacity: 0.8;
}
.swiper-pagination-bullet-active {
  opacity: 1;
  background: #f4f5ff;
}
.stories-list {
  .list-body:first-child {
    .stories-date {
      height: 0;
    }
  }
}
</style>
