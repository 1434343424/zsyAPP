<template>
  <div class="messageDetails">
    <z-header>消息详情</z-header>
    <div class="main">
      <div class="title">{{title}}</div>
      <div class="time">{{updated | time}}</div>
      <div class="content">{{context}}</div>
    </div>
  </div>
</template>

<script>
import ZHeader from 'components/m-header/z-header2'
import { messageDetails } from '../../api/index'
import { getDateTime } from '../../common/js/times'
export default {
  components: {
    ZHeader
  },
  filters: {
    time(t) {
      return getDateTime(t)
    }
  },
  data() {
    return {
      title: '',
      context: '',
      updated: ''
    }
  },
  created() {
    this.mapId = this.$route.query.mapId;
    this.queryMessageDetails()
  },
  methods: {
    queryMessageDetails() {
      let params = {
        mapId: parseInt(this.mapId)
      }
      messageDetails(params).then(res => {
        console.log(params)
        if (res.code === 0) {
          this.title = res.obj.title
          this.context = res.obj.context
          this.updated = res.obj.updated
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "messageDetails.styl"
</style>
