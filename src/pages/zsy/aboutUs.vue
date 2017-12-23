<template>
<div class="about">
  <z-header>关于我们</z-header>
  <div class="main">
    <div class="item" @click="intoAbout"><label>关于我们</label><span class="iconRightArrow"></span></div>
    <div class="item" @click="intoHelp">帮助中心<span class="iconRightArrow"></span></div>
    <div class="item" @click="intoOpinion">意见反馈<span class="iconRightArrow"></span></div>
    <div class="item">客服<span class="number">400-068-8003</span><span class="iconRightPhone"></span></div>
  </div>
</div>
</template>

<script>
  import ZHeader from 'components/m-header/z-header'
//  import {mapGetters} from 'vuex'
  export default {
    components: {
      ZHeader
    },
    methods: {
      intoAbout() {
        this.$router.push(`/aboutUsDetails`)
      },
      intoHelp() {
        this.$router.push(`/help`)
      },
      intoOpinion() {
        this.$router.push(`/opinion`)
      }
     }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./aboutUs.styl"
</style>
