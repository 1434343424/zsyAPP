import Vue from 'vue'
import Router from 'vue-router'

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}
Vue.use(Router)

const Test = (resolve) => {
  import('pages/test/test').then((module) => {
    resolve(module)
  })
}
const Get = (resolve) => {
  import('pages/test/get').then((module) => {
    resolve(module)
  })
}
const PageTransition = (resolve) => {
  import('pages/PageTransition').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      component: PageTransition,
      children: [
        {
          path: '/',
          component: Test
        },
        {
          path: '/test',
          component: Test
        },
        {
          path: '/get',
          component: Get
        }
      ]
    }
    // {
    //   path: '/recommend',
    //   component: Recommend,
    //   children: [
    //     {
    //       path: ':id',
    //       component: Disc
    //     }
    //   ]
    // },
  ]
})
