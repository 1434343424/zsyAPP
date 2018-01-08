<template>
  <div class="edit">
    <div class="wrapper">
      <div class="shopImg"><img :src="doorFirstUrl"></div>
      <div class="shop">{{doorName}}</div>
      <div class="orderMoney">订单金额(元)</div>
      <div class="money">
        <span class="moneyIcon">￥</span>
        <input v-model="totalamount" type="number" @input="changePayButton" @keyup="moneyFormat(totalamount)" class="money-input" placeholder="请询问收银员后输入">
      </div>
      <div class="payButtonGray" v-show="payNoneShow" @click="payButtonClick()">确认付款</div>
      <div class="payButton" v-show="payCanShow" @click="payButtonClick()">确认付款</div>
      <div>[pramas:]{{pramas}}</div>
      <div>[resCode:]{{resCode}}</div>
      <div>[prePayId:]{{prePayId}}</div>
      <div>[result]{{result}}</div>
      <div>[payPramas]{{payPramas}}</div>
    </div>
  </div>
</template>

<script>
import ZHeader from 'components/m-header/z-header'
import { currency } from 'common/js/util'
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
      channelType: 'WX',
      codename: '',
      orderid: '',
      result: '',
      result2: '',
      pramas: '',
      resCode: '',
      prePayId: '',
      doorName: '',
      doorFirstUrl: 'http://static.hpbanking.com/xg/uploads/files/7902fdeae8318f00321d227c0f9ccaf0-640-640.jpg',
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
    // onBridgeReady(payPramas) {
    //   let weixinParams = {
    //     "appId": payPramas.appId,// 公众号名称，由商户传入     
    //     "timeStamp": payPramas.timeStamp,// 时间戳，自1970年以来的秒数     
    //     "nonceStr": payPramas.nonceStr,// 随机串     
    //     "package": payPramas.package,
    //     "signType": payPramas.signType,// 微信签名方式：     
    //     "paySign": payPramas.paySign// 微信签名 
    //   }
    //   console.log(weixinParams)
    //   WeixinJSBridge.invoke('getBrandWCPayRequest', weixinParams, function(res) {
    //     // Toast(res.err_msg)
    //     WeixinJSBridge.log(res.err_msg)
    //     if (res.err_msg == "get_brand_wcpay_request:ok") {
    //       // Toast('支付成功!')
    //       WeixinJSBridge.call('closeWindow');
    //     } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
    //       // alert("用户取消支付!")
    //       // Toast('取消支付!')
    //       WeixinJSBridge.call('closeWindow');
    //     } else {
    //       // Toast('支付失败!')
    //       WeixinJSBridge.call('closeWindow');
    //     }
    //   })
    // },
    payButtonClick() {
      let self = this
      let params = {
        totalamount: this.totalamount,
        shopid: this.shopid,
        channelType: this.channelType ? this.channelType : 'WX',// 这个判断纯属是为了方便在电脑中调试
        codename: this.codename,
        openid: this.openid,
        codeid: this.codeid
      }
      this.pramas = params
      createPayOrder(params).then(res => {
        self.resCode = res.code
        self.result = res.obj
        if (res.code === 0) {
          // 微信签名算法
          // let stringA = `appId=${self.payPramas.appId}&timeStamp=${self.payPramas.timeStamp}&nonceStr=${self.payPramas.nonceStr}&package=${self.payPramas.package}&signType=${self.payPramas.signType}&paySign=${self.payPramas.paySign}`
          self.prePayId = res.obj.prePayId
          if (self.channelType === _WX) {
            self.payPramas = JSON.parse(res.obj.payInfo)
            self.payPramas.appId = res.obj.subappid
            let weixinParams = {
              "appId": self.payPramas.appId,// 公众号名称，由商户传入      
              "nonceStr": self.payPramas.nonceStr,// 随机串     
              "package": self.payPramas.package,    
              "paySign": self.payPramas.paySign,// 微信签名 
              "signType": self.payPramas.signType,// 微信签名方式： 
              "timeStamp": self.payPramas.timeStamp// 时间戳，自1970年以来的秒数    
            }
            WeixinJSBridge.invoke('getBrandWCPayRequest', weixinParams, function(res) {
              Toast(res.err_msg)
              WeixinJSBridge.log(res.err_msg)
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                Toast('支付成功!')
              } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                Toast('取消支付!')
              } else {
                Toast('支付失败!')
                // WeixinJSBridge.call('closeWindow');
              }
            })
          } else if (self.channelType === _ALI) {
            self.ready(function() {
              AlipayJSBridge.call("tradePay", {
                tradeNO: self.prePayId
              }, function(result) {
                // alert(JSON.stringify(result));
                AlipayJSBridge.call('popWindow');
              });
            });
          }
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
    moneyFormat(value) {
      this.totalamount = currency(value)
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
