<template>
  <div class="test">
    <m-header :backType="backType">测试测试呢</m-header>
    <div @click="save">click</div>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      backType: 'back', // back/backToApp
      duration: 750
    }
  },
  components: {
    MHeader
  },
  methods: {
    ...mapMutations({
      setSinger: 'SET_SINGER',
      setPramas: 'SET_PRAMAS'
    }),
    save() {
      this.setSinger('lqt')
      this.setPramas({ name: 'lqt', age: 18 })
      this.$router.push('/get')
      console.log(this.$router.isBack)
    }
  }
}
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
</style>