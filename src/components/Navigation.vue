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
              :content="messages"
              :value="messages"
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
        {{relation}}
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
  </div>
</template>

<script>

// import { API, graphqlOperation } from 'aws-amplify'

// const onCreateRelationship = /* GraphQL */ `
//   subscription OnCreateRelationship {
//     onCreateRelationship {
//       id
//       blockBool
//       followee {
//         id
//         name
//         emailAddress
//       }
//       follower {
//         id
//         name
//         emailAddress
//       }
//       createdAt
//       updatedAt
//     }
//   }
// `;


export default {
  data: () => ({
    // 左のハンバーガーメニュー表示用
    drawer: false,
    // 上のアプリケーションバー表示用
    // drawer2: true,
    // userEmail: 'null',
    links: [
      ['mdi-home', 'ホーム','/'],
      ['mdi-magnify', '検索','/search'],
      ['mdi-calendar', 'カレンダー','/calendar'],
      ['mdi-bell', '通知','/notice'],
      ['mdi-account', 'プロフィール','/profile'],
      ['mdi-cog', '設定','/setting']
    ],
    // createSubscription: {},
    messages: 0,
    relation: []
  }),
  computed: {
    getUserEmail(){
      const user= this.$store.getters.getUserGraphql
      return  user.items[0].emailAddress
    },
    getUserName(){
      const user= this.$store.getters.getUserGraphql
      return  user.items[0].name
    }
  },
  methods: {
    // subscribe(){
    //   // TODO(3-1) GraphQLエンドポイントにsubscriptionを発行し、mutationを監視する
    //   this.createSubscription = API.graphql(graphqlOperation(onCreateRelationship)).subscribe({
    //     next: (eventData) => {
    //       console.log("入った")
    //       console.log(eventData)
    //       this.relation = eventData.value.data.onCreateRelationship;
    //       this.messages++
    //       // this.wholeposts.push(tweet);
    //     }
    //   })
    // }
  },
  mounted(){
    // this.subscribe()
  }
  // mounted() {
  //   this.$store.subscribe((mutation, state) => {
  //     if (mutation.type === 'setUser') {
  //       console.log('update prefecture! %s', state.user);
  //       this.userEmail = state.user.signInUserSession.idToken.payload.email
  //       //ここもっといい方法ある気がする。
  //     }
  //   })
  // }
}
</script>