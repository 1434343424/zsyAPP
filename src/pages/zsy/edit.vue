<template>
  <div class="edit">
    <div class="wrapper">
      <div class="shopImg"><img :src="doorFirstUrl"></div>
      <div class="shop">{{doorName}}</div>
      <div class="orderMoney">订单金额(元)</div>
      <div class="money">
        <span class="moneyIcon">￥</span>
        <input id="moneyInput" class="moneyInput" v-model="totalamount" @input="changePayButton" @keyup="moneyFormat" placeholder="请询问收银员后输入">
      </div>
      <div class="payButtonGray" v-show="payNoneShow" @click="payButtonClick()">确认付款</div>
      <div class="payButton" v-show="payCanShow" @click="payButtonClick()">确认付款</div>
      <!-- <div>{{channelType}}</div>
      <div>resCode：{{resCode}}</div>
      <div>下单接口返回的参数：{{result}}</div>
      <div>prePayId：{{prePayId}}</div>
      <div>二维码中的参数：{{pramas}}</div>
      <div>传给微信的参数：{{weixinParams}}</div> -->
    </div>
  </div>
</template>

<script>
import ZHeader from 'components/m-header/z-header'
import { currencyNew } from 'common/js/util'
import { createPayOrder, queryPayLogo } from '../../api/index'
import { Toast } from 'mint-ui'
import md5 from 'blueimp-md5'
const _WX = 'WX'
const _ALI = 'ALI'
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
      pramas: '',
      resCode: '',
      prePayId: '',
      doorName: '',
      doorFirstUrl: 'http://static.hpbanking.com/xg/uploads/files/e2b83f681aba213e853adc9db6b59b5c-100-100.png',
      // doorFirstUrl: 'http://static.hpbanking.com/xg/uploads/files/7902fdeae8318f00321d227c0f9ccaf0-640-640.jpg',
      payPramas: {
        appId: '',
        timeStamp: '',
        nonceStr: '',
        package: '',
        signType: 'MD5',
        paySign: ''
      },
      weixinParams: ''
    }
  },
  created() {
    document.getElementById('title').textContent = '收款'
    this.shopid = this.$route.query.shopid;
    this.codename = this.$route.query.codename;
    this.openid = this.$route.query.openid;
    this.codeid = this.$route.query.codeid;
    this.IsWeixinOrAlipay()
    this.queryPayLogo()
  },
  methods: {
    queryPayLogo() {
      let params = {
        shopid: this.shopid
      }
      queryPayLogo(params).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.doorName = res.obj.shopname
          this.doorFirstUrl = res.obj.doorFirstUrl
        }
      })
    },
    payButtonClick() {
      let self = this
      if (this.totalamount == '' || this.totalamount == 0) {
        Toast('输入金额不能等于0')
        return
      }
      if (this.totalamount > 999999.99) {
        Toast('最大只能输入999999.99')
        return
      }
      let params = {
        totalamount: this.totalamount,
        shopid: this.shopid,
        channelType: this.channelType,
        codename: this.codename,
        openid: this.openid,
        codeid: this.codeid
      }
      this.pramas = params
      createPayOrder(params).then(res => {
        self.resCode = res.code
        self.result = res.obj
        if (res.code == 0) {
          // 微信签名算法
          // let stringA = `appId=${self.payPramas.appId}&timeStamp=${self.payPramas.timeStamp}&nonceStr=${self.payPramas.nonceStr}&package=${self.payPramas.package}&signType=${self.payPramas.signType}&paySign=${self.payPramas.paySign}`
          self.prePayId = res.obj.prePayId
          // 微信支付
          if (self.channelType == _WX) {
            self.payPramas = JSON.parse(res.obj.payInfo)
            // self.payPramas.appId = res.obj.subappid
            let weixinParams = {
              "appId": self.payPramas.appId,// 公众号名称，由商户传入
              "timeStamp": self.payPramas.timeStamp,// 时间戳
              "nonceStr": self.payPramas.nonceStr,// 随机串     
              "package": self.payPramas.package,
              "signType": self.payPramas.signType,// 微信签名方式
              "paySign": self.payPramas.paySign// 微信签名 
            }
            this.weixinParams = weixinParams
            WeixinJSBridge.invoke('getBrandWCPayRequest', weixinParams, function(res) {
              // Toast(res.err_msg)
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                Toast('支付成功!')
                WeixinJSBridge.call('closeWindow');
              } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                Toast('取消支付!')
                WeixinJSBridge.call('closeWindow');
              } else {
                Toast('支付失败!')
              }
              // WeixinJSBridge.call('closeWindow');
            })
          } else if (self.channelType == _ALI) {
            // 支付宝支付
            self.ready(function() {
              AlipayJSBridge.call("tradePay", {
                tradeNO: self.prePayId
              }, function(result) {
                // alert(JSON.stringify(result));
                AlipayJSBridge.call('popWindow');
              });
            });
          }
        } else {
          Toast(res.error)
        }
      })
    },
    IsWeixinOrAlipay() {
      var userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.indexOf('alipayclient') > -1) {
        this.channelType = _ALI
      } else if (userAgent.indexOf('micromessenger') > -1) {
        this.channelType = _WX
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
    moneyFormat() {
      this.totalamount = currencyNew(this.totalamount)
    },
    ready(callback) {
      // 如果jsbridge已经注入则直接调用
      if (window.AlipayJSBridge) {
        callback && callback();
      } else {
        // 如果没有注入则监听注入的事件
        document.addEventListener('AlipayJSBridgeReady', callback, false);
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./edit.styl";
</style>
