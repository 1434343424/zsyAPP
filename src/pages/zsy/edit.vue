<template>
  <div class="edit">
    <z-header>编辑</z-header>
    <div class="wrapper">
      <div class="shopImg"></div>
      <div class="shop">豆蔻年华城西店</div>
      <div class="orderMoney">订单金额(元)</div>
      <div class="money">
        <span class="moneyIcon">￥</span>
        <input v-model="totalamount" @input="changePayButton" @keyup="moneyFormat(totalamount)" class="money-input" placeholder="请询问收银员后输入">
      </div>
      <div class="payButtonGray" v-show="payNoneShow" @click="payButtonClick()">确认付款</div>
      <div class="payButton" v-show="payCanShow" @click="payButtonClick()">确认付款</div>
      <div>[1]{{result}}</div>
      <div>[2]{{result2}}</div>
    </div>
  </div>
</template>

<script>
import ZHeader from 'components/m-header/z-header'
import { currency } from 'common/js/util'
import { createPayOrder } from '../../api/index'
import { Toast } from 'mint-ui'
import md5 from 'blueimp-md5'
export default {
  components: {
    ZHeader
  },
  data() {
    return {
      payNoneShow: true,
      payCanShow: false,
      totalamount: '',
      shopid: '',
      channelType: '',
      codename: '',
      orderid: '',
      result: '',
      result2: '',
      payPramas: {
        appId: '',
        timeStamp: '',
        nonceStr: '',
        package: '',
        signType: 'MD5',
        paySign: ''
      }
    }
  },
  created() {
    this.shopid = this.$route.query.shopid;
    this.codename = this.$route.query.codename;
    this.openid = this.$route.query.openid;
    this.IsWeixinOrAlipay()
    // let time = new Date().getTime()
    // console.log(`time:${time}`)
    // console.log(`time:${time + 'lqt'}`)
    // console.log('abc'.toUpperCase())
  },
  methods: {
    payButtonClick() {
      let params = {
        totalamount: this.totalamount,
        shopid: this.shopid,
        channelType: this.channelType,
        codename: this.codename,
        //          orderid: this.orderid,
        openid: this.openid
      }
      createPayOrder(params).then(res => {
        this.result2 = params
        if (res.code === 0) {
          // payPramas: {
          //   appId: '',
          //   timeStamp: '',
          //   nonceStr: '',
          //   package: '',
          //   signType: 'MD5',
          //   paySign: ''
          // }
          this.result = res.obj
          this.payPramas.appId = 'wxdd8259dbcf817d01'
          this.payPramas.timeStamp = new Date().getTime()
          this.payPramas.nonceStr = md5(res.obj.orderid + new Date().getTime())
          this.payPramas.package = res.obj.prePayId
          this.payPramas.signType = 'MD5'
          // 生成微信签名
          let stringA = `appId=${this.payPramas.appId}&timeStamp=${this.payPramas.timeStamp}&nonceStr=${this.payPramas.nonceStr}&package=${this.payPramas.package}`
          let stringSignTemp = `stringA&key=${res.obj.key}`
          this.payPramas.paySign = md5(stringSignTemp).toUpperCase()

          if (typeof WeixinJSBridge === "undefined") {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(), false);
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady());
              document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady());
            }
          } else {
            this.onBridgeReady()
          }
        }
      })
    },
    IsWeixinOrAlipay() {
      var userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.indexOf('alipayclient') > -1) {
        this.channelType = 'ALI'
      } else if (userAgent.indexOf('micromessenger') > -1) {
        this.channelType = 'WX'
      } else {
      }
    },
    changePayButton() {
      if (this.totalamount !== '') {
        this.payNoneShow = false
        this.payCanShow = true
      } else {
        this.payNoneShow = true
        this.payCanShow = false
      }
    },
    moneyFormat(value) {
      this.totalamount = currency(value)
    },
    onBridgeReady() {
      let self = this
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          "appId": this.payPramas.appId,// 公众号名称，由商户传入
          "timeStamp": this.payPramas.timeStamp,// 时间戳，自1970年以来的秒数
          "nonceStr": this.payPramas.nonceStr,// 随机串
          "package": this.payPramas.package,
          "signType": this.payPramas.signType,// 微信签名方式
          "paySign": this.payPramas.paySign// 微信签名
          // "appId": "wx2421b1c4370ec43b",// 公众号名称，由商户传入
          // "timeStamp": "1395712654",// 时间戳，自1970年以来的秒数
          // "nonceStr": "e61463f8efa94090b1f366cccfbbb444",// 随机串
          // "package": "prepay_id=u802345jgfjsdfgsdg888",
          // "signType": "MD5",// 微信签名方式
          // "paySign": "70EA570631E4BB79628FBCA90534C63FF7FADD89"// 微信签名
        },
        function(res) {
          alert(res)
          // if (res.err_msg == "get_brand_wcpay_request:ok" ) {
          //   // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          // }
        }
      )
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./edit.styl";
</style>
