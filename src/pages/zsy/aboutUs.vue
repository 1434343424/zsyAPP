<template>
  <div class="about">
    <z-header backType='backApp'>关于我们</z-header>
    <div class="main">
      <div class="item" @click="intoAbout">
        <label>关于我们</label>
        <span class="iconRightArrow"></span>
      </div>
      <div class="item" @click="intoHelp">帮助中心
        <span class="iconRightArrow"></span>
      </div>
      <div class="item" @click="intoOpinion">意见反馈
        <span class="iconRightArrow"></span>
      </div>
      <div class="item">客服
        <a class="number" href="tel:400-068-8003">400-068-8003</a>
        <a class="iconRightPhone"></a>
      </div>
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
  data() {
    return {
      userid: this.$route.query.userid
    }
  },
  methods: {
    intoAbout() {
      this.$router.push(`/aboutUsDetails`)
    },
    intoHelp() {
      this.$router.push(`/help`)
    },
    intoOpinion() {
      this.$router.push(`/opinion?userid=` + this.userid)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./aboutUs.styl"
</style>
