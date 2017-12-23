<template>
  <div class="edit">
    <z-header>编辑</z-header>
    <div class="wrapper">
      <div class="shopImg"></div>
      <div class="shop">豆蔻年华城西店</div>
      <div class="orderMoney">订单金额(元)</div>
      <div class="money"><span class="moneyIcon">￥</span>
        <input v-model="totalamount" @input="changePayButton" @keyup="moneyFormat(totalamount)" class="money-input"
               placeholder="请询问收银员后输入">
      </div>
      <div class="payButtonGray" v-show="payNoneShow" @click="payButtonClick()">确认付款</div>
      <div class="payButton" v-show="payCanShow" @click="payButtonClick()">确认付款</div>
      <div>{{result}}</div>
      <div>{{result2}}</div>
    </div>
  </div>
</template>

<script>
  import ZHeader from 'components/m-header/z-header'
  import {currency} from 'common/js/util'
  import {createPayOrder} from '../../api/index'
  import Vue from 'vue'
  import {Toast} from 'mint-ui'

  Vue.use(Toast)
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
        result2: ''
      }
    },
    created() {
      this.shopid = this.$route.query.shopid;
      this.codename = this.$route.query.codename;
      this.openid = this.$route.query.openid;
      this.IsWeixinOrAlipay()
    },
    methods: {
      IsWeixinOrAlipay() {
        var userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.indexOf('alipayclient') > -1) {
          this.channelType = 'ALI'
          Toast('ALI')
        } else if (userAgent.indexOf('micromessenger') > -1) {
          this.channelType = 'WX'
          Toast('WX')
        } else {
          Toast('请使用微信或支付宝扫一扫')
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
          this.result = res
          this.result2 = params
          Toast(res.obj)
        })
      }
    },
    filters: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./edit.styl";
</style>
