<template>
  <div class="m-header">
    <div class="back" @click="back">
      <i class="iconfont icon-left-arrow">&#xe648;</i>
    </div>
    <h1 class="text">
      <slot></slot>
    </h1>
  </div>
</template>

<script type="text/ecmascript-6">
import { Toast } from 'mint-ui'
export default {
  props: {
    backType: {
      backType: String,
      default: 'back'
    },
    countUnread: {
      countUnread: Number,
      default: 0
    }
  },
  created() {
    console.log('backType:' + this.backType)
  },
  methods: {
    back() {
      // Toast(this.backType)
      if (this.backType === 'back') {
        this.$router.goBack()
      } else {
        // Toast(this.countUnread)
        let ua = navigator.userAgent.toLowerCase()
        if (/iphone|ipad|ipod/.test(ua)) {
          // Toast('调用苹果返回接口')
          popToViewController()
          getUnreadMessages(this.countUnread)
        } else if (/android/.test(ua)) {
          htmlToJava.popToViewController()
          htmlToJava.getUnreadMessages(this.countUnread)
        }
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .m-header
    position: fixed
    top: 0
    left: 0
    height: 44px
    width 100%
    text-align: center
    color: $color-text-white
    background-color $color-theme
    font-size: 0
    z-index: 1001
    .back
      position absolute
      left 0px
      top 0px
      width 44px
      height 44px
      background-color $color-theme
      &:active{
        background-color $color-text-m
      }
      .icon-left-arrow
        display block
        padding: 12px
        font-size: 20px
    .text
      line-height 44px
      font-size: $font-size-large
      // border-left 1px solid $color-theme-line
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
</style>
