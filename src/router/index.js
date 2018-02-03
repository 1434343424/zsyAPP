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
const AboutUs = (resolve) => {
  import('pages/zsy/aboutUs').then((module) => {
    resolve(module)
  })
}
const Help = (resolve) => {
  import('pages/zsy/help').then((module) => {
    resolve(module)
  })
}
const HelpInHome = (resolve) => {
  import('pages/zsy/helpInHome').then((module) => {
    resolve(module)
  })
}
const Details = (resolve) => {
  import('pages/zsy/details').then((module) => {
    resolve(module)
  })
}
const AboutUsDetails = (resolve) => {
  import('pages/zsy/aboutUsDetails').then((module) => {
    resolve(module)
  })
}
const Opinion = (resolve) => {
  import('pages/zsy/opinion').then((module) => {
    resolve(module)
  })
}
const Edit = (resolve) => {
  import('pages/zsy/edit').then((module) => {
    resolve(module)
  })
}
const BankAgreement = (resolve) => {
  import('pages/zsy/bankAgreement').then((module) => {
    resolve(module)
  })
}
const BenefitAgreement = (resolve) => {
  import('pages/zsy/benefitAgreement').then((module) => {
    resolve(module)
  })
}
const Privacy = (resolve) => {
  import('pages/zsy/privacyAgreement').then((module) => {
    resolve(module)
  })
}
const Login = (resolve) => {
  import('pages/zsy/loginAgreement').then((module) => {
    resolve(module)
  })
}
const MovePayAgreement = (resolve) => {
  import('pages/zsy/movePayAgreement').then((module) => {
    resolve(module)
  })
}
const Message = (resolve) => {
  import('pages/zsy/message').then((module) => {
    resolve(module)
  })
}
const MessageDetails = (resolve) => {
  import('pages/zsy/messageDetails').then((module) => {
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
          component: AboutUs
        },
        {
          path: '/test',
          component: Test
        },
        {
          path: '/get',
          component: Get
        },
        {
          path: '/about',
          component: AboutUs
        },
        {
          path: '/help',
          component: Help
        },
        {
          path: '/helpInHome',
          component: HelpInHome
        },
        {
          path: '/details',
          component: Details
        },
        {
          path: '/aboutUsDetails',
          component: AboutUsDetails
        },
        {
          path: '/opinion',
          component: Opinion
        },
        {
          path: '/edit',
          component: Edit
        },
        {
          path: '/bankAgreement',
          component: BankAgreement
        },
        {
          path: '/benefitAgreement',
          component: BenefitAgreement
        },
        {
          path: '/privacyAgreement',
          component: Privacy
        },
        {
          path: '/loginAgreement',
          component: Login
        },
        {
          path: '/movePayAgreement',
          component: MovePayAgreement
        },
        {
          path: '/message',
          component: Message
        },
        {
          path: '/messageDetails',
          component: MessageDetails
        }
      ]
    }
  ]
})
