import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import createTweet from '../views/CreateTweet.vue'
import createTraining from '../views/CreateTraining.vue'
import createCooking from '../views/CreateCooking.vue'
// import Search from '../views/Search.vue'
import Search2 from '../views/Search2.vue'
import Calendar from '../views/Calendar.vue'
import Calendar2 from '../views/Calendar2.vue'
import Notice from '../views/Notice.vue'
import Profile from '../views/Profile.vue'
// import FolloweeList from '../views/FolloweeList.vue'
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
      component: Home,
      meta: { requiresAuth: true}
    },
    {
      // ツイート投稿ページ
      path: '/createTweet',
      name: 'createTweet',
      component: createTweet,
      meta: { requiresAuth: true}
    },
    {
      // 筋トレ投稿ページ
      path: '/createTraining',
      name: 'createTraining',
      component: createTraining,
      meta: { requiresAuth: true}
    },
    {
      // 料理投稿ページ
      path: '/createCooking',
      name: 'createCooking',
      component: createCooking,
      meta: { requiresAuth: true}
    },
    {
      // 検索ページ
      path: '/search',
      name: 'search',
      component: Search2,
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
      // カレンダーページ2
      path: '/calendar2',
      name: 'calendar2',
      component: Calendar2,
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
    // {
    //   // フォローリストページ
    //   path: '/followeelist',
    //   name: 'followeelist',
    //   component: FolloweeList,
    //   meta: { requiresAuth: true }
    // },
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


// getUser().then((user) => {
//   if (user) {
//     router.push({path: '/'})
//   }
// })

// [fix1]でコメントアウトしたけど、router.beforeResolveとやってることかぶってると思う。
  
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