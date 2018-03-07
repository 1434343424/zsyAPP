<template>
  <div class="help">
    <z-header>帮助中心</z-header>
    <div class="content">
      <div class="item">
        <div class="item-title" @click="qsClick(1)">
          关于臻收银
          <span class="iconRightArrow"></span>
        </div>
        <div class="item-content" v-show="currentShow[0].contentShow">
          <span>臻收银zpay是一款专业的聚合收银系统。该系统聚合了支付宝、微信等主流支付源，支持二维码、扫码枪、手机移动等多种扫码方式，提供丰富的实用功能（语音提示、对账统计、支持多店多人等），并通过网商银行清算资金，实现D+1结算方式，手续费低至0.38%。 臻收银不只是一个单纯的收银工具，我们还为商户提供丰富的线上营销活动，如收单关注公众号吸粉、商户补贴等各类活动提升商铺客流量。
          </span><br>
        </div>
      </div>
      <div class="item">
        <div class="item-title" @click="qsClick(2)">
          入驻臻收银
          <span class="iconRightArrow"></span>
        </div>
        <div class="item-content" v-show="currentShow[1].contentShow">
          <span>可通过应用市场下载臻收银APP，支持臻e盾、微信等第三方账号和手机号秒速注册登录，进入首页完成资料录入和上传即可完成商家入驻。（注：资料可分步骤进行上传，分别是“店铺信息”-“负责人资料”-“图片资料”-“绑定提现银行卡”）</span><br>
        </div>
      </div>
      <div class="item">
        <div class="item-title" @click="qsClick(3)">
          店铺管理
          <span class="iconRightArrow"></span>
        </div>
        <div class="item-content" v-show="currentShow[2].contentShow">
          <span>
            修改信息：“店铺”-选择店铺-“修改信息”，则可以修改店铺基本信息。<br> 增加分店：“首页”-“店铺”-“新增”，填写分店资料，无需审核，分店即可实现收银。
          </span><br>
        </div>
      </div>
      <div class="item">
        <div class="item-title" @click="qsClick(4)">
          操作员管理
          <span class="iconRightArrow"></span>
        </div>
        <div class="item-content" v-show="currentShow[3].contentShow">
          <span>
            当您生意忙碌，需要店员协助收银时，点击首页“操作员”-“新增”-“角色”-选择“收银员”，填写资料后点击“新增”。<br> 当您需要配备一个统筹店铺账务、掌握总店及分店交易情况的人员时，点击首页“操作员”-“新增”-“角色”，选择“管理员”，填写资料后点击“新增”。
          </span><br>
        </div>
      </div>
      <div class="item">
        <div class="item-title" @click="qsClick(5)">
          收款
          <span class="iconRightArrow"></span>
        </div>
        <div class="item-content" v-show="currentShow[4].contentShow">
          <span>
            1、收款码收银：点击“我的”-“收款码”，选择相应店铺的收款码进行下载，张贴在店铺显眼处，由顾客扫码付款。与此同时，打开“我的”-“设置”-“语音提醒”，及时收听收银语音提示，避免漏收、错收。<br> 2、扫码枪收银：登录电脑下载PC客户端软件，安装后连接扫码枪，即可在电脑上操作管理。
            <br> 3、手机收银：使用APP首页的“扫码收款”“二维码收款”功能进行移动收银。
          </span><br>
        </div>
      </div>
      <div class="item">
        <div class="item-title" @click="qsClick(6)">
          退款
          <span class="iconRightArrow"></span>
        </div>
        <div class="item-content" v-show="currentShow[5].contentShow">
          <span>
            如果收款金额有出入或错误，则点击收款账单详情界面的右上角“退款”按钮进行操作，并可对退款进行备注。
          </span><br>
        </div>
      </div>
      <div class="item">
        <div class="item-title" @click="qsClick(7)">
          账本1
          <span class="iconRightArrow"></span>
        </div>
        <div class="item-content" v-show="currentShow[6].contentShow">
          <span>点击“账本”-“筛选”，对总账目/特定账目进行对账查看。
          </span><br>
        </div>
      </div>
      <div class="item">
        <div class="item-title" @click="qsClick(8)">
          报表1
          <span class="iconRightArrow"></span>
        </div>
        <div class="item-content" v-show="currentShow[7].contentShow">
          <span>“报表”功能新增收入统计图和收入趋势图，更为直观。
          </span><br>
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
      currentShow: [{
        contentShow: false
      }, {
        contentShow: false
      }, {
        contentShow: false
      }, {
        contentShow: false
      }, {
        contentShow: false
      }, {
        contentShow: false
      }, {
        contentShow: false
      }, {
        contentShow: false
      }, {
        contentShow: false
      }]
    }
  },
  created() {
    this.itemLen = this.currentShow.length
    console.log(this.itemLen)
  },
  methods: {
    setFalse(flag) {
      for (let i = 0; i < this.itemLen; i++) {
        if (i !== flag) {
          this.currentShow[i].contentShow = false
        } else if (i === flag) {
          this.currentShow[i].contentShow = !this.currentShow[i].contentShow
        }
      }
    },
    qsClick(flag) {
      flag = flag - 1
      console.log('flag:' + flag)
      this.setFalse(flag)
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
