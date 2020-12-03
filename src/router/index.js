import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import createTweet from '../views/CreateTweet.vue'
import createTraining from '../views/CreateTraining.vue'
import createCooking from '../views/CreateCooking.vue'
import Search from '../views/Search.vue'
import Calendar from '../views/Calendar.vue'
import Calendar2 from '../views/Calendar2.vue'
import Notice from '../views/Notice.vue'
import Profile from '../views/Profile.vue'
//設定関連
import Setting from '../views/Setting.vue'
import SetPremium from '../views/setting/SettingPremium.vue'
import SetAccounts from '../views/setting/SettingAccount.vue'
import SetNot from '../views/setting/SettingNotification.vue'
import SetHelp from '../views/setting/SettingHelp.vue'
import SetPersonal from '../views/setting/SettingPersonal.vue'
import SetContact from '../views/setting/SettingContact.vue'
import SetService from '../views/setting/SettingService.vue'

import UserName from '../views/setting/user/UserNameChange.vue'
import UserID from '../views/setting/user/UserIDChange.vue'
import UserPhone from '../views/setting/user/PhoneNumberChange.vue'
import Passwd from '../views/setting/user/PasswdChange.vue'
import PasswdNew from '../views/setting/user/PasswdChangeNew.vue'

import Test from '../views/setting/TestComponents.vue'

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
      // テストコンポーネント
      path: '/testcomponents',
      name: 'testcomponents',
      component: Test,
      meta: { requiresAuth: true}
    },
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
    {
      // 設定ページ
      path: '/setting',
      name: 'setting',
      component: Setting,
      meta: { requiresAuth: true }
    },
    {
      // プレミアム登録ページ
      path: '/settingpremium',
      name: 'settingpremium',
      component: SetPremium,
      meta: { requiresAuth: true }
    },
    {
      // アカウントページ
      path: '/settingaccount',
      name: 'settingaccount',
      component: SetAccounts,
      meta: { requiresAuth: true }
    },
    {
      // ユーザ名前変更ページ
      path: '/usernamechange',
      name: 'usernamechange',
      component: UserName,
      meta: { requiresAuth: true }
    },
    {
      // ユーザネーム変更ページ
      path: '/useridchange',
      name: 'useridchange',
      component: UserID,
      meta: { requiresAuth: true }
    },
    {
      // 旧パスワード入力ページ
      path: '/passwdchange',
      name: 'passwdchange',
      component: Passwd,
      meta: { requiresAuth: true }
    },
    {
      // 新パスワード入力ページ
      path: '/passwdchangenew',
      name: 'passwdchangenew',
      component: PasswdNew,
      meta: { requiresAuth: true }
    },
    {
      // 通知設定ページ
      path: '/settingnotification',
      name: 'settingnotification',
      component: SetNot,
      meta: { requiresAuth: true }
    },
    {
      // お困りの方はこちらページ
      path: '/settinghelp',
      name: 'settinghelp',
      component: SetHelp,
      meta: { requiresAuth: true }
    },
    {
      // 個人情報ページ
      path: '/settingpersonal',
      name: 'settingpersonal',
      component: SetPersonal,
      meta: { requiresAuth: true }
    },
    {
      // 電話番号変更ページ
      path: '/phonenumberchange',
      name: 'phonenumberchange',
      component: UserPhone,
      meta: { requiresAuth: true }
    },
    {
      // お問い合わせページ
      path: '/settingcontact',
      name: 'settingcontact',
      component: SetContact,
      meta: { requiresAuth: true }
    },
    {
      // 利用規約ページ
      path: '/settingservice',
      name: 'settingservice',
      component: SetService,
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