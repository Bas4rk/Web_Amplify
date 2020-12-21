<template>
  <div class="home">
    <Navigation></Navigation>

    <!-- 投稿ボタン -->
    <v-card id="create">
      <v-speed-dial
        v-model="SpeedDial"
        :top="top"
        :right="right"
        :left="left"
        :direction="direction"
        :open-on-hover="hover"
        :transition="transition"
      >
        <template v-slot:activator>
          <v-btn
            v-model="SpeedDial"
            color="blue darken-2"
            dark
            fab
          >
            <v-icon v-if="SpeedDial">mdi-close</v-icon>
            <v-icon v-else>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-btn
          v-for="(item, index) of items"
          :key="index"
          fab
          dark
          small
          :color="item.color"
          :to="item.to"
        >
          <v-icon>{{item.icon}}</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-card>

    <!-- タブ -->
    <v-tabs fixed-tabs v-model="tab">
      <v-tab href="#tweet">つぶやき</v-tab>
      <v-tab href="#cooking">料理</v-tab>
      <v-tab href="#training">筋トレ</v-tab>
    </v-tabs>

    <!-- タブの中身 -->
    <v-tabs-items v-model="tab">
      <v-tab-item value="tweet">
        <v-row justify="center">
          <v-col cols="5">
            <TweetList :items="tweetPosts"></TweetList>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item value="cooking">
        <v-row justify="center">
          <v-col cols="5">
            <CookingList :items2="cookingPosts"></CookingList>  
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item value="training">
        <v-row justify="center">
          <v-col cols="5">
            <TrainingList :items3="traningPosts"></TrainingList>  
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>

    <!-- 上に行くボタン -->
    <transition name="button">
      <v-btn
        v-show="buttonActive"
        @click="scrollTop"
        fixed
        color="primary"
        dark
        bottom
        right
        fab
      >
      <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </transition>

  </div>
</template>

<script>
//リストも一つにまとめる。
import TweetList from '@/components/TweetList.vue';
import CookingList from '@/components/CookingList.vue';
import TrainingList from '@/components/TrainingList.vue';
import Navigation from '@/components/Navigation.vue';

<<<<<<< HEAD:src/views/Home.vue
import { API, graphqlOperation } from 'aws-amplify'
import * as graphql from '../graphql/graphql.js'
=======
import { API, graphqlOperation } from 'aws-amplify';
// import * as gqlQueries from '../graphql/queries'
// import * as gqlMutations from '../graphql/mutations'

import homeQuery from '/HomeQuery.js'

// const _query = `query GetUser($id: ID!) {
//   getUser(id: $id) {
//     name
//   }
// }
// `

// // [fix]ここのクエリーfilter使ってもう少しよくできないか
// const _query2 = `query GetUser($id: ID!) {
//   getUser(id: $id) {
//     tweetPosts {
//       items {
//         id
//         content
//         createdAt
//         user {
//           name
//           emailAddress
//         }
//       }
//     }
//     cookingPosts {
//       items {
//         id
//         title
//         content
//         calorie
//         createdAt
//         user {
//           name
//           emailAddress
//         }
//       }
//     }
//     traningPosts {
//       items {
//         id
//         title
//         content
//         createdAt
//         user {
//           name
//           emailAddress
//         }
//       }
//     }
//     followees {
//       items {
//         follower {
//           tweetPosts {
//             nextToken
//             items {
//               id
//               content
//               createdAt
//               user {
//                 name
//                 emailAddress
//               }
//             }
//           }
//           cookingPosts {
//             nextToken
//             items {
//               content
//               calorie
//               createdAt
//               id
//               title
//               user {
//                 name
//                 emailAddress
//               }
//             }
//           }
//           traningPosts {
//             nextToken
//             items {
//               id
//               content
//               createdAt
//               title
//               user {
//                 name
//                 emailAddress
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
// `


// //[fix]これ、フォローしてない人の投稿もタイムラインに映るわ。。
// const onCreateTweet = /* GraphQL */ `
//   subscription OnCreateTweet {
//     onCreateTweet {
//       id
//       content
//       createdAt
//       user {
//         name
//         emailAddress
//       }
//     }
//   }
// `;

// const onCreateCooking = /* GraphQL */ `
//   subscription OnCreateCooking {
//     onCreateCooking {
//       id
//       title
//       content
//       calorie
//       createdAt
//       user {
//         name
//         emailAddress
//       }
//     }
//   }
// `;

// const onCreateTraning = /* GraphQL */ `
//   subscription OnCreateTraning {
//     onCreateTraning {
//       id
//       title
//       content
//       createdAt
//       user {
//         name
//         emailAddress
//       }
//     }
//   }
// `;


// const onDeleteTweet = /* GraphQL */ `
//   subscription OnDeleteTweet {
//     onDeleteTweet {
//       id
//     }
//   }
// `;

// const onDeleteCooking = /* GraphQL */ `
//   subscription OnDeleteCooking {
//     onDeleteCooking {
//       id
//     }
//   }
// `;

// const onDeleteTraning = /* GraphQL */ `
//   subscription OnDeleteTraning {
//     onDeleteTraning {
//       id
//     }
//   }
// `;
>>>>>>> a47fe27770e51d5df1141cf2321871a5ef67ebba:src/views/Home/Home.vue

export default {
  name: 'home',
  data() {
    return{
      // tab
      tab: 'tweet',
      // 上に行くボタン
      buttonActive: false,
      scroll: 0,
      // 左上の投稿ボタン
      direction: 'bottom',
      SpeedDial: false,
      fling: false,
      hover: true,
      top: true,
      right: false,
      bottom: false,
      left: false,
      transition: 'slide-y-transition',
      items: [
        { color: 'green', to: '/createTweet', icon: 'mdi-comment' },
        { color: 'red', to: '/createCooking', icon: 'mdi-silverware-fork-knife' },
        { color: 'indigo', to: '/createTraining', icon: 'mdi-dumbbell' },
      ],
      //ポストリスト
      tweetPosts: null,
      cookingPosts: null,
      traningPosts: null,
      //直前のパス
      prevRoute: null,
    }
  },
  components: {
    TweetList,
    CookingList,
    TrainingList,
    Navigation
  },
  computed: {
  },
  methods: {
<<<<<<< HEAD:src/views/Home.vue
=======
    subscribe(){
      // TODO(3-1) GraphQLエンドポイントにsubscriptionを発行し、mutationを監視する
      this.createSubscription = API.graphql(graphqlOperation(homeQuery.onCreateTweet)).subscribe({
        next: (eventData) => {
          console.log("evenData:"+eventData)
          const tweet = eventData.value.data.onCreateTweet;
          this.wholeposts.push(tweet);
          this.relation = eventData
        }
      })

      // 料理
      this.createSubscription2 = API.graphql(graphqlOperation(homeQuery.onCreateCooking)).subscribe({
        next: (eventData) => {
          const cooking = eventData.value.data.onCreateCooking;
          this.wholeposts2.push(cooking);
        }
      })

      // 筋トレ
      this.createSubscription3 = API.graphql(graphqlOperation(homeQuery.onCreateTraning)).subscribe({
        next: (eventData) => {
          const traning = eventData.value.data.onCreateTraning;
          this.wholeposts3.push(traning);
        }
      })

      this.deleteSubscription = API.graphql(graphqlOperation(homeQuery.onDeleteTweet)).subscribe({
        next: (eventData) => {
          const tweet = eventData.value.data.onDeleteTweet;
          this.wholeposts = this.wholeposts.filter(post => post.id != tweet.id);
        }
      })

      // 料理
      this.deleteSubscription = API.graphql(graphqlOperation(homeQuery.onDeleteCooking)).subscribe({
        next: (eventData) => {
          const cooking = eventData.value.data.onDeleteCooking;
          this.wholeposts2 = this.wholeposts2.filter(post => post.id != cooking.id);
        }
      })

      // 筋トレ
      this.deleteSubscription = API.graphql(graphqlOperation(homeQuery.onDeleteTraning)).subscribe({
        next: (eventData) => {
          const traning = eventData.value.data.onDeleteTraning;
          this.wholeposts3 = this.wholeposts3.filter(post => post.id != traning.id);
        }
      })

    },
    //[fix]下のよく分からない
    // beforeDestroy() {
    //   // TODO(3-2) チャット画面から離れる際に、UnSubscribeする
    //   this.subscription.unsubscribe();
    // },
>>>>>>> a47fe27770e51d5df1141cf2321871a5ef67ebba:src/views/Home/Home.vue
    // behavior: autoだと瞬間移動になる
    scrollTop: function(){
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    },
    // buttonActiveにtrueとfalse渡して表示非表示してる、上行くボタンのv-show="buttonActiveてとこのやつ
    scrollWindow() {
      const top = 100 // ボタンを表示させたい位置
      this.scroll = window.scrollY
      if (top <= this.scroll) {
        this.buttonActive = true
      } else {
        this.buttonActive = false
      }
    },
  },
  mounted : async function(){
    // 上行くボタン
    window.addEventListener('scroll', this.scrollWindow)

<<<<<<< HEAD:src/views/Home.vue
    //ポストリスト処理
    const query = await API.graphql(
      graphqlOperation(graphql._query2, {id : this.$store.getters.getUserId})
    )
    let getUser = query.data.getUser

    //ツイートリスト
    this.tweetPosts = getUser.tweetPosts.items
    for(let i = 0; i < getUser.followees.items.length; i++){
      for(let j = 0; j < getUser.followees.items[i].follower.tweetPosts.items.length; j++){
        this.tweetPosts.push(getUser.followees.items[i].follower.tweetPosts.items[j])
=======
    //きたないのできれいにする。
    if(this.dev){
      // const usersorce = this.$store.getters.getUserGraphql
      const query = await API.graphql(
        graphqlOperation(homeQuery._query2, {id : this.$store.getters.getUserId})
      )
      console.log("タイムラインクエリー飛ばしました。")
      this.user = query.data.getUser
      this.a = query.data.getUser.followees.items[0].follower.traningPosts.items
      this.myposts = this.user.tweetPosts.items//自分のツイート
      this.wholeposts = this.myposts//直接postsにプッシュするとおかしくなる?(pushは参照元まで変えてる?)
      if(this.user.followees.items[0].follower.tweetPosts.items.length > 0){
        for(let i = 0; i < this.user.followees.items[0].follower.tweetPosts.items.length; i++){
          // this.a = this.user.followees.items.length
          this.followeeposts.push(this.user.followees.items[0].follower.tweetPosts.items[i])
        }
>>>>>>> a47fe27770e51d5df1141cf2321871a5ef67ebba:src/views/Home/Home.vue
      }
    }

    //料理リスト
    this.cookingPosts = getUser.cookingPosts.items
    for(let i = 0; i < getUser.followees.items.length; i++){
      for(let j = 0; j < getUser.followees.items[i].follower.cookingPosts.items.length; j++){
        this.cookingPosts.push(getUser.followees.items[i].follower.cookingPosts.items[j])
      }
    }
    
    //筋トレリスト
    this.traningPosts = getUser.traningPosts.items
    for(let i = 0; i < getUser.followees.items.length; i++){
      for(let j = 0; j < getUser.followees.items[i].follower.traningPosts.items.length; j++){
        this.traningPosts.push(getUser.followees.items[i].follower.traningPosts.items[j])
      }
    }

    // 直前に見ていたタブに戻る
    let route = 'tweet';
    let array = ['cooking','training'];
    for(let i =0;i<array.length;i++){
      if(this.prevRoute.toLowerCase().includes(array[i])){
        route = array[i]
      }
    }
    this.tab = route
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.prevRoute = from.name;
    });
  },
}
</script>

<style scoped>
/* 投稿ボタン */
  #create .v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }
/* 上に行くボタン */
.button-enter-active,
.button-leave-active {
  transition: opacity 0.5s;
}
.button-enter,
.button-leave-to {
  opacity: 0;
}
</style>