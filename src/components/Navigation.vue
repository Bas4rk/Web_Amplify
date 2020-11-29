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
          size="64"
        >
        <v-icon size="60">mdi-account</v-icon>
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
      <!-- アプリケーションバー -->
      <!-- あとでここも遷移とかつける。 -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-icon>mdi-dumbbell</v-icon>
      <v-toolbar-title>筋トレアプリ</v-toolbar-title>
      <template v-if="!drawer">
        <v-spacer />
        <v-btn icon>
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
    </v-app-bar>
  </div>
</template>

<script>

export default {
  data: () => ({
    drawer: null,
    links: [
      ['mdi-home', 'ホーム','/'],
      ['mdi-magnify', '検索','/search'],
      ['mdi-calendar', 'カレンダー','/calendar'],
      ['mdi-calendar', 'カレンダー2','/calendar2'],
      ['mdi-bell', '通知','/notice'],
      ['mdi-account', 'プロフィール','/profile'],
      ['mdi-cog', '設定','/setting']
    ],
  }),
  computed: {
    getUserEmail(){
      const user= this.$store.getters.getUserGraphql
      return  user.items[0].emailAddress
    },
    getUserName(){
      const user= this.$store.getters.getUserGraphql
      return  user.items[0].name
    },
    getMessages(){
      return this.$store.getters.getMessages
    },
    getCount(){
      return this.$store.getters.getCount
    }
  },
  methods: {

  },
  mounted(){
  }
}
</script>