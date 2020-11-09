import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Search from '../views/Search.vue'
import Calendar from '../views/Calendar.vue'
import Notice from '../views/Notice.vue'
import Profile from '../views/Profile.vue'
import Setting from '../views/Setting.vue'
import Tweet from '../views/Tweet.vue'

import store from '../store/index.js'

Vue.use(Router)


// Amplify読み込み
// import { components, AmplifyEventBus } from 'aws-amplify-vue'
// import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyEventBus } from 'aws-amplify-vue'
import * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'

Vue.use(Router)
Vue.use(AmplifyPlugin, AmplifyModules)

let user;

// ユーザー管理
getUser().then((user) => {
    if (user) {
        router.push({path: '/'});
    }
});

function getUser() {
    return Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then((data) => {
        if (data && data.signInUserSession) {
            store.commit('setUser', data);

            return data;
        }
    }).catch(() => {
        store.commit('setUser', null);
        return null;
    });
}

// ログイン状態管理
AmplifyEventBus.$on('authState', async (state) => {
    if (state === 'signedOut'){
        user = null;
        store.commit('setUser', null);
        router.push({path: '/login'});
    } else if (state === 'signedIn') {
        user = await getUser();
        router.push({path: '/'});

    }
});

// ルーティング設定
const router = new Router({
    mode: 'history',
    routes: [
        {
            // トップページ
            path: '/',
            name: 'home',
            component: Home,
            meta: { requiresAuth: true}
        },
        {
            // ログインページ
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            // 検索ページ
            path: '/search',
            name: 'search',
            component: Search
        },
        {
            // カレンダーページ
            path: '/calendar',
            name: 'calendar',
            component: Calendar
        },
        {
            // 通知ページ
            path: '/notice',
            name: 'notice',
            component: Notice
        },
        {
            // プロフィールページ
            path: '/profile',
            name: 'profile',
            component: Profile
        },
        {
            // 設定ページ
            path: '/setting',
            name: 'setting',
            component: Setting
        },
        {
            // 設定ページ
            path: '/tweet/:id',
            name: 'tweet',
            component: Tweet
        }
    ]
});

// リダイレクト設定
router.beforeResolve(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        user = await getUser();
        if (!user) {
            return next({
                path: '/login'
            });
        }
        return next()
    }
    return next()
});

export default router