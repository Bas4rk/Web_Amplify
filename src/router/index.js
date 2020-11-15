import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../views/Home.vue'
import Home2 from '../views/Home2.vue'
import Search from '../views/Search.vue'
import Calendar from '../views/Calendar.vue'
import Notice from '../views/Notice.vue'
import Profile from '../views/Profile.vue'
import Setting from '../views/Setting.vue'
import Tweet from '../views/Tweet.vue'
import SignUp from '../views/SignUp.vue'
import SignUpConfirm from '../views/SignUpConfirm.vue'
import SignIn from '../views/SignIn.vue'


import {AmplifyEventBus} from 'aws-amplify-vue'
import {getUser} from '@/utils/auth.js'

Vue.use(Router)


Vue.use(Router)


// ルーティング設定
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUp,
      meta: { requiresAuth: false }
    },
    {
      path: '/signUpConfirm',
      name: 'signUpConfirm',
      component: SignUpConfirm,
      meta: { requiresAuth: false }
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: SignIn,
      meta: { requiresAuth: false }
    },
    {
      // トップページ
      path: '/',
      name: 'home',
      component: Home2,
      meta: { requiresAuth: true}
    },
    {
      // 検索ページ
      path: '/search',
      name: 'search',
      component: Search,
      meta: { requiresAuth: true }
    },
    {
      // カレンダーページ
      path: '/calendar',
      name: 'calendar',
      component: Calendar,
      meta: { requiresAuth: true }
    },
    {
      // 通知ページ
      path: '/notice',
      name: 'notice',
      component: Notice,
      meta: { requiresAuth: true }
    },
    {
      // プロフィールページ
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      // 設定ページ
      path: '/setting',
      name: 'setting',
      component: Setting,
      meta: { requiresAuth: true }
    },
    {
      // 設定ページ
      path: '/tweet/:id',
      name: 'tweet',
      component: Tweet,
      meta: { requiresAuth: true }
    }
  ]
});


getUser().then((user) => {
  if (user) {
    router.push({path: '/'})
  }
})
  
AmplifyEventBus.$on('authState', async (state) => {
  const pushPathes = {
    signedOut: () => {
    router.push({path: '/signIn'})
    },
    signUp: () => {
    router.push({path: '/signUp'})
    },
    confirmSignUp: () => {
    router.push({path: '/signUpConfirm'})
    },
    signIn: () => {
    router.push({path: '/signIn'})
    },
    signedIn: () => {
    router.push({path: '/'})
    }
  }
  if (typeof pushPathes[state] === 'function') {
    pushPathes[state]()
  }
})
  
router.beforeResolve(async (to, from, next) => {
  const user = await getUser()
  if (!user) {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      return next({
        path: '/signIn',
      })
    }
  } else {
    if (to.matched.some((record) => typeof(record.meta.requiresAuth) === "boolean" && !record.meta.requiresAuth)) {
      return next({
        path: '/',
      })
    }
  }
  return next()
})

export default router