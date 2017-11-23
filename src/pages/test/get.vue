<template>
  <div class="test">
    <m-header>get</m-header>
    <div @click="get">mapGetters</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import {mapGetters} from 'vuex'
  export default {
    components: {
      MHeader
    },
    computed: {
      // title() {
      //   return this.singer.name
      // },
      // bgImage() {
      //   return this.singer.avatar
      // },
      ...mapGetters([
        'singer',
        'pramas'
      ])
    },
    methods: {
      get() {
        console.log('singer:' + this.singer)
        console.log('pramas:')
        console.log(this.pramas)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
</style>