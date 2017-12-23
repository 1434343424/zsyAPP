<template>
  <div class="message">
    <z-header>系统消息</z-header>
    <div class="content">
      <div class="item" :class="[item.isRead===1?'changeColor':'']" @click="intoMessageDetails(item.mapId,item.isRead)" v-for="item in list">
        <span class="item-img" :class="[item.isRead===1?'img2':'img1']"></span>
        <div class="item-bigDiv" ref="fontGray">
          <div class="item-title"><span>{{item.title}}</span><span class="item-time">{{item.created | time}}</span>
          </div>
          <span class="item-message">{{item.context}}</span>
        </div>
      </div>
      <!--<div class="item2" @click="intoMessageDetails(item.mapId,item.isRead)" v-for="item in list" v-show="afterChangeShow">-->
        <!--<span class="item-img"></span>-->
        <!--<div class="item-bigDiv" ref="fontGray">-->
          <!--<div class="item-title"><span>{{item.title}}</span><span class="item-time">{{item.created | time}}</span>-->
          <!--</div>-->
          <!--<span class="item-message">{{item.context}}</span>-->
        <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import ZHeader from 'components/m-header/z-header2'
  import {message, login} from '../../api/index'
  import {getDateTime} from '../../common/js/times'

  export default {
    components: {
      ZHeader
    },
    data() {
      return {
        list: [],
        beforeChangeShow: true,
        afterChangeShow: false
      }
    },
    created() {
//      this.queryMessage()
      this.login()
    },
    filters: {
      time(t) {
        return getDateTime(t)
      }
    },
    methods: {
      intoMessageDetails(id, isRead) {
//        this.queryMessage(id, isRead)
        this.$router.push(`/messageDetails?mapId=${id}`)
      },
      queryMessage() {
        //            this.$refs.fontGray.style.color = rgb(255, 255, 255)
        let params = {}
        message().then(res => {
          this.list = res.list
//          if (isRead === 0) {
//            console.log(111)
//            this.beforeChangeShow = true
//            this.afterChangeShow = false
//          } else if (isRead === 1) {
//            console.log(222)
//            this.beforeChangeShow = false
//            this.afterChangeShow = true
//          }
        })
      },
      login() {
        let params = {
          username: 13487106921,
          password: 123456
        }
        login(params).then(res => {
          if (res.code === 0) {
            this.queryMessage()
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "message.styl"
</style>
