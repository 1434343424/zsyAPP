<template>
  <div class="opinion">
    <z-header>意见反馈</z-header>
    <div class="content-wrapper">
      <textarea class="content" maxlength="150" @input="countInput" v-model="count" placeholder="您的宝贵意见是我们的前进动力"></textarea>
      <div class="text-remain">剩余{{remain}}/150</div>
    </div>
    <div class="content-phone"><input maxlength="11" v-model='mobile' class="content-input" type="text" placeholder="请留下您的联系电话，以便我们联系您"></div>
    <div class="submit" @click="submitButton" v-show="greenButtonShow">提交</div>
    <div class="submit2" v-show="grayButtonShow">提交</div>
    <div class="icon"></div>
    <div class="phone"><span class="iconPhone"></span class="number">400-068-8003</span></div>
  </div>
</template>

<script>
  import ZHeader from 'components/m-header/z-header'
  import {option} from '../../api/index'
  const root = '/zsy'
  export default {
    components: {
      ZHeader
    },
    data() {
      return {
        remain: 150,
        count: '',
        mobile: '',
        grayButtonShow: true,
        greenButtonShow: false
      }
    },
    created() {

    },
    methods: {
      countInput() {
        var textVal = this.count.length;
        this.remain = 150 - textVal;
        if (this.count !== '') {
          this.greenButtonShow = true
          this.grayButtonShow = false
        } else {
          this.grayButtonShow = true
          this.greenButtonShow = false
        }
      },
      submitButton() {
        let params = {
          mobile: this.mobile,
          context: this.count
        }
        option(params).then(res => {
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./opinion.styl";
</style>
