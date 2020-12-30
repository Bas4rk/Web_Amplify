<template>
  <div class="Navigation">
    <!-- <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar> -->

    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-sheet
        color="grey lighten-4"
        class="pa-4"
      >
        <v-avatar
          class="mb-4"
          color="grey darken-1"
          size="127"
        >
        <img
          :src="getAvatar"
        >
        <!-- <v-icon size="60">mdi-account</v-icon> -->
        <!-- <amplify-s3-image :imagePath="imagePath" /> -->
        </v-avatar>


        <div>{{getUserName}}</div>
        <div>{{getUserEmail}}</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="[icon, text ,link] in links"
          :key="text"
          :to="link"
        >
          <v-list-item-icon>
            <v-badge
              v-if="icon == 'mdi-bell'"
              :content="getCount"
              :value="getCount"
              color="green"
              overlap
            >
              <v-icon>{{ icon }}</v-icon>
            </v-badge>
            <v-icon v-else>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <!-- アプリケーションバー
      遷移つけた -->
      <v-app-bar-nav-icon @click="drawer = !drawer"/>
      <!-- <v-app-bar-nav-icon @click="drawer = !drawer; click=drawer2 = !drawer2"/> -->
      <v-icon>mdi-dumbbell</v-icon>
      <v-toolbar-title>筋トレアプリ</v-toolbar-title>
      <!-- <template v-if="drawer2">
        <v-spacer />
        <v-btn icon to="/">
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn icon to="/search">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon to="/profile">
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template> -->
    </v-app-bar>
    <!-- {{avatar}} -->
  </div>
</template>

<script>
import {Storage} from 'aws-amplify'
import store from '../store/index.js'

export default {
  data: () => ({
    // 左のハンバーガーメニュー表示用
    drawer: true,
    // 上のアプリケーションバー表示用
    // drawer2: true,
    // userEmail: 'null',
    links: [
      ['mdi-home', 'ホーム','/'],
      ['mdi-magnify', '検索','/search'],
      ['mdi-calendar', 'カレンダー','/calendar'],
      ['mdi-bell', '通知','/notice'],
      ['mdi-account', 'プロフィール','/profile'],
      ['mdi-cog', '設定','/setting'],
    ],
    imagePath: `test/avatar`,
    // avatar: null,
  }),
  computed: {
    getUserName(){
      return  this.$store.getters.getUserName
    },
    getUserEmail(){
      return  this.$store.getters.getUserEmail
    },
    getMessages(){
      return this.$store.getters.getMessages
    },
    getCount(){
      return this.$store.getters.getCount
    },
    getAvatar(){
      return this.$store.getters.getUserAvatar
    },
  },
  methods: {

  },
  async mounted(){
    let avatar = store.getters.getUserAvatar
    if(!avatar){
      // console.log("入った")
      avatar = await Storage.get(`${store.getters.getUserEmail}/avatar`)
      store.commit('setUserAvatar',avatar)
    }
  }
}
</script>