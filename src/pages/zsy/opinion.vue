<template>
  <div class="opinion">
    <z-header>意见反馈</z-header>
    <div class="content-wrapper">
      <textarea class="content" maxlength="150" @input="countInput" v-model="contentText" placeholder="您的宝贵意见是我们前进的动力"></textarea>
      <div class="text-remain">剩余{{remain}}/150</div>
    </div>
    <div class="content-phone"><input maxlength="11" v-model='mobile' class="content-input" type="text" placeholder="请留下您的联系电话，以便我们联系您"></div>
    <div class="submit" @click="submitButton" v-show="greenButtonShow">提交</div>
    <div class="submit2" v-show="grayButtonShow">提交</div>
    <div class="icon"></div>
    <div class="phone">
      <a class="number" href="tel:400-068-8003">400-068-8003</a>
      <!-- <a class="iconPhone"> -->
    </div>
  </div>
</template>

<script>
import ZHeader from 'components/m-header/z-header'
import { option } from '../../api/index'
import { isEmojiCharacter, filteremoji } from '../../common/js/util'
import { Toast } from 'mint-ui'
const root = '/zsy'
export default {
  components: {
    ZHeader
  },
  data() {
    return {
      userid: this.$route.query.userid,
      remain: 150,// 最多150个字
      contentText: '',
      mobile: '',
      grayButtonShow: true,
      greenButtonShow: false,
      context: ''
    }
  },
  methods: {
    countInput() {
      var textVal = this.contentText.length;
      this.remain = 150 - textVal;
      if (this.contentText !== '') {
        this.greenButtonShow = true
        this.grayButtonShow = false
      } else {
        this.grayButtonShow = true
        this.greenButtonShow = false
      }
    },
    submitButton() {
      console.log('isEmojiCharacter:' + isEmojiCharacter(this.contentText))
      if (isEmojiCharacter(this.contentText)) {
        Toast('不能输入Emoji表情')
        return
      }
      let params = {
        userid: this.userid,
        mobile: this.mobile,
        context: this.contentText
      }
      option(params).then(res => {
        console.log(res)
        if (res.code === 0) {
          Toast('反馈成功')
          this.$router.goBack()
        } else {
          Toast('不好意思出错了：' + res.msg)
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./opinion.styl";
</style>
