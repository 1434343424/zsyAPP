<template>
  <div class="help">
    <z-header backType='backApp'>帮助中心</z-header>
    <div class="content">
      <div class="item">
        <div class="item-title" @click="qsClick(1)">
          入驻臻收银
          <span class="iconRightArrow"></span>
        </div>
        <div class="item-content" v-show="currentShow[0].contentShow">
          <span>可通过应用市场下载臻收银APP，支持臻e盾、微信等第三方账号和手机号秒速注册登录，进入首页完成资料录入和上传即可完成商家入驻。（注：资料可分步骤进行上传，分别是“店铺信息”-“负责人资料”-“图片资料”-“绑定提现银行卡”）</span><br>
        </div>
      </div>
      <div class="item">
        <div class="item-title" @click="qsClick(2)">收款（三种方式）
          <span class="iconRightArrow"></span>
        </div>
        <div class="item-content" v-show="currentShow[1].contentShow">
          <span>
            1、二维码收银：点击“我的”-“收款码”，选择相应店铺的收款码进行下载，张贴在店铺显眼处，由顾客扫码付款。与此同时，打开“我的”-“语音提示”，及时收听收银语音提示，避免漏收、错收。<br>2、扫码枪收银：登录电脑下载PC客户端软件，安装后连接扫码枪，即可在电脑上操作管理。 <br>3、手机收银：使用APP首页的“扫码收款”“二维码收款”功能进行移动收银。
          </span><br>
        </div>
      </div>
      <div class="item">
        <div class="item-title" @click="qsClick(3)">退款
          <span class="iconRightArrow"></span>
        </div>
        <div class="item-content" v-show="currentShow[2].contentShow">
          <span>如果收款金额有出入或错误，则点击收款账单界面的右上角“退款”按钮进行操作，并可对退款进行备注。</span><br>
        </div>
      </div>
      <div class="item">
        <div class="item-title" @click="qsClick(4)">查看账单
          <span class="iconRightArrow"></span>
        </div>
        <div class="item-content" v-show="currentShow[3].contentShow">
          <span>1、点击“账本”-“筛选”，对总账目/特定账目进行对账查看。 <br>2、“报表”功能新增收入统计图和收入趋势图，更为直观。
          </span><br>
        </div>
      </div>
      <div class="item">
        <div class="item-title" @click="qsClick(5)">增加收银员/管理员
          <span class="iconRightArrow"></span>
        </div>
        <div class="item-content" v-show="currentShow[4].contentShow">
          <span>当您生意忙碌，需要店员协助收银时，点击首页“操作员”-“新增”-“角色”-选择“收银员”，填写资料后点击“新增”。 <br>当您需要配备一个统筹店铺账务、掌握总店及分店交易情况的人员时，点击首页“操作员”-“新增”-“角色”，选择“管理员”，填写资料后点击“新增”。
          </span><br>
        </div>
      </div>
      <div class="item">
        <div class="item-title" @click="qsClick(6)">分店管理
          <span class="iconRightArrow"></span>
        </div>
        <div class="item-content" v-show="currentShow[5].contentShow">
          <span>“首页”-“店铺”-“新增”，填写分店资料，无需审核，分店即可实现收银。<br> “店铺”-选择店铺-“修改信息”，则可以修改店铺基本信息。
          </span><br>
        </div>
      </div>
      <div class="item">
        <div class="item-title" @click="qsClick(7)">关于修改
          <span class="iconRightArrow"></span>
        </div>
        <div class="item-content" v-show="currentShow[6].contentShow">
          <span>修改银行卡：点击“我的”-“银行卡”-“更换”-填写资料。<br>修改登录密码：点击“我的”-“密码管理”-“修改登录密码”。<br>修改交易密码：点击“我的”-“密码管理”-“修改交易密码”。
          </span><br>
        </div>
      </div>
      <div class="item">
        <div class="item-title" @click="qsClick(8)">臻收银的手续费率多少？
          <span class="iconRightArrow"></span>
        </div>
        <div class="item-content" v-show="currentShow[7].contentShow">
          <span>手续费率0.38%。交易手续费将在商户结算款项中同步扣收。
          </span><br>
        </div>
      </div>
      <div class="item">
        <div class="item-title" @click="qsClick(9)">资金多久到账？
          <span class="iconRightArrow"></span>
        </div>
        <div class="item-content" v-show="currentShow[8].contentShow">
          <span>选择结算到银行卡，则为D+1到账（汇总清算），通常在交易发生后的下一个工作日上午12点前到账。
          </span><br>
        </div>
      </div>
      <div class="item">
        <div class="item-title" @click="qsClick(10)">资金安全吗？
          <span class="iconRightArrow"></span>
        </div>
        <div class="item-content" v-show="currentShow[9].contentShow">
          <span>臻收银系杭州臻商大数据科技有限公司联合网商银行推出，由网商银行作为资金清算渠道，资金安全用户无需担心。
          </span><br>
        </div>
      </div>
      <div class="item">
        <div class="item-title" @click="qsClick(11)">系统是否支持花呗/信用卡？
          <span class="iconRightArrow"></span>
        </div>
        <div class="item-content" v-show="currentShow[10].contentShow">
          <span>支持。如需开通请联系客服。
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
      }, {
        contentShow: false
      }, {
        contentShow: false
      }],
      itemLen: ''
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
