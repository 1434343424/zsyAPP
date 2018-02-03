<template>
  <div class="message">
    <z-header backType='backApp' :countUnread="countUnread">系统消息</z-header>
    <div class="content">
      <div class="item" :class="[item.isRead===1?'changeColor':'']" @click="intoMessageDetails(item.mapId,item.isRead)" v-for="item in list">
        <span class="item-img" :class="[item.isRead===1?'img2':'img1']"></span>
        <div class="item-bigDiv" ref="fontGray" id='contentMessage'>
          <div class="item-title-line">
            <span class="item-title">{{item.title}}</span>
            <span class="item-time">{{item.created | time}}</span>
          </div>
          <!-- <div class="item-message">{{item.context}}</div> -->
          <span class="item-message">{{item.context | getLimiteText}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ZHeader from 'components/m-header/z-header2'
import { message, login } from '../../api/index'
import { getDateTime } from '../../common/js/times'
import { getLimiteText } from '../../common/js/util'
import { Indicator, Toast } from 'mint-ui'

export default {
  components: {
    ZHeader
  },
  data() {
    return {
      list: [],
      userid: this.$route.query.userid,
      // userid: this.$route.query.userid,
      beforeChangeShow: true,
      afterChangeShow: false,
      countUnread: 0,
      contentWidth: ''
    }
  },
  created() {
    // this.login()
    this.queryMessage()
  },
  filters: {
    time(t) {
      return getDateTime(t)
    },
    getLimiteText(v) {
      return getLimiteText(v)
    }
  },
  methods: {
    intoMessageDetails(id, isRead) {
      this.$router.push(`/messageDetails?mapId=${id}`)
    },
    // 查找消息列表
    queryMessage() {
      let self = this
      let params = {
        userid: this.userid
      }
      console.log(params)
      message(params).then(res => {
        if (res.code === 0) {
          this.list = res.list
          console.log(`this.list:`)
          console.log(this.list)
          // Toast('this.countUnread:' + this.countUnread)
          if (this.list.length === 0) {
            Toast('无消息')
          } else {
            this.list.forEach(function(element) {
              if (element.isRead === 0) {
                self.countUnread = self.countUnread + 1
              }
            })
          }
          // 获取模块的宽度
          // this.contentWidth = document.getElementById('contentMessage').clientWidth
          // console.log(`contentWidth:`)
          // console.log(contentWidth)
        } else {
          Toast('服务器出错：' + res.error)
        }
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
