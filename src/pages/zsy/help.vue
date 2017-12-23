<template>
  <div class="help">
    <z-header>帮助中心</z-header>
    <div class="content">
      <div class="item">
        <div class="item-title" @click="qsClick(1)">提款不成怎么办?<span class="iconRightArrow"></span></div>
        <div class="item-content" v-show="content1Show">
          <span>如何使用信鸽收银台收款?</span><br/>
          <span>收款时发现收款来源与消费者提供的不一致怎么办?</span><br>
          <span>如何确认收款是否成功</span><br>
          <span>如何查看账本</span><br>
          <span>顾客收到扣款通知后,但信鸽收银台仍停留在扫码界面<br>如何处理这种情况?</span>
        </div>
      </div>
      <div class="item">
        <div class="item-title" @click="qsClick(2)">提款不成怎么办?<span class="iconRightArrow"></span></div>
        <div class="item-content" v-show="content2Show">
          <span @click="intoDetailsClick">提款不成怎么办?</span><br/>
          <span>通过大数据、云计算与人工智能量化评估。<br>信用中心将基于您的信用分优质金融服务。</span><br>
        </div>
      </div>
      <div class="item">
        <div class="item-title" @click="qsClick(3)">提款不成怎么办?<span class="iconRightArrow"></span></div>
        <div class="item-content" v-show="content3Show">
          <span>提款不成怎么办?</span><br/>
          <span>通过大数据、云计算与人工智能量化评估。<br>信用中心将基于您的信用分优质金融服务。</span><br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ZHeader from 'components/m-header/z-header'

  export default {
    components: {
      ZHeader
    },
    data() {
      return {
        content1Show: false,
        content2Show: false,
        content3Show: false
      }
    },
    methods: {
      qsClick(flag) {
        if (flag === 1) {
          this.content1Show = !this.content1Show
        } else if (flag === 2) {
          this.content2Show = !this.content2Show
        } else if (flag === 3) {
          this.content3Show = !this.content3Show
        }
      },
      intoDetailsClick() {
        this.$router.push(`/details`)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./help.styl"
</style>
