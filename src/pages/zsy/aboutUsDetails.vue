<template>
  <div class="aboutUsDetails">
    <z-header>关于我们</z-header>
    <div class="main">
      <div class="text">
        臻收银zpay是一款专业的聚合收银系统。该系统聚合了支付宝、微信等主流支付源，支持二维码、扫码枪、手机移动等多种扫码方式，提供丰富的实用功能（语音提示、对账统计、支持多店多人等），并通过网商银行清算资金，实现D+1结算方式，手续费低至0.38%。
      </div>
      <div class="text">
        臻收银不只是一个单纯的收银工具，我们还为商户提供丰富的线上营销活动，如收单关注公众号吸粉、商户补贴等各类活动提升商铺客流量。
      </div>
    </div>
  </div>
</template>

<script>
  import ZHeader from 'components/m-header/z-header'
  export default {
    components: {
      ZHeader
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "aboutUsDetails.styl"
</style>
