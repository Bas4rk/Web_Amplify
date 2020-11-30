<template>
  <div class="home">
    <Navigation></Navigation>
    <!-- ボタンの位置とかアイコンのデザインとか要相談 -->
      <v-card id="create">
        <v-speed-dial
          v-model="fab"
          :top="top"
          :right="right"
          :left="left"
          :direction="direction"
          :open-on-hover="hover"
          :transition="transition"
        >
          <template v-slot:activator>
            <v-btn
              v-model="fab"
              color="blue darken-2"
              dark
              fab
            >
              <v-icon v-if="fab">mdi-close</v-icon>
              <v-icon v-else>mdi-plus</v-icon>
            </v-btn>
          </template>
            <v-btn
              fab
              dark
              small
              color="green"
              to="/createTweet"
            >
            <!-- https://materialdesignicons.com/「comment」で検索した
            comment-outlineもあり？
            comment-text
            comment-text-multiple
            comment-processing
            comment-account -->
              <v-icon>mdi-comment</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              small
              color="indigo"
              to="/createTraining"
            >
              <v-icon>mdi-dumbbell</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              small
              color="red"
              to="/createCooking"
            >
              <v-icon>mdi-silverware-fork-knife</v-icon>
            </v-btn>
          </v-speed-dial>
        </v-card>
    <!-- 上にあったほうが投稿しやすい？と思って上にしました -->
    <!-- <v-btn large color="primary"  to="/createTweet">ツイート</v-btn>
    <v-btn large color="primary"  to="/createTraining">筋トレ投稿</v-btn>
    <v-btn large color="primary"  to="/createCooking">料理投稿</v-btn> -->

 <!-- Tabとその中身入れ替えです、TweetListそのまま使いました、Profile.vueと同じです -->
      <v-tabs fixed-tabs v-model="tab">
        <v-tab href="#tab-1">つぶやき</v-tab>
        <v-tab href="#tab-2">料理</v-tab>
        <v-tab href="#tab-3">筋トレ</v-tab>
        <v-tab href="#tab-4">いいね</v-tab>
      </v-tabs>
        
      <!-- 中身 -->
      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-1">
          <v-divider></v-divider>
          <TweetList :items="this.wholeposts"></TweetList>
        </v-tab-item>
        <v-tab-item value="tab-2">
          <TweetList :items="this.wholeposts2"></TweetList>  
        </v-tab-item>
        <v-tab-item value="tab-3">
          <TweetList :items="this.wholeposts3"></TweetList>  
        </v-tab-item>
      </v-tabs-items>

    <!-- <TweetList :items="this.wholeposts" :items2="this.wholeposts2" :items3="this.wholeposts3"></TweetList> -->

    <!-- [fix]これ使えそう -->
    <!-- https://v2.vuetifyjs.com/ja/components/floating-action-buttons/ -->
    <!-- <v-btn large color="primary" @click="scrollTop">上にいく</v-btn> -->
    
    <!-- 上に行くボタン、↑のURLに書いてあったやつで作ってみた、アニメーション？とかはこれ見た -->
    <!-- https://qiita.com/TK-C/items/42b25ff4ec56528ad870 -->
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
    <!-- <div>
      全体
      {{user}}
    </div>
    <br>
    <div>
      自分のポスト
      {{myposts}}
    </div>
    <br>
    <div>
      フォローしてる人のポスト
      {{followeeposts}}
    </div>
    <br>
    <div>
      フォローしてる人のポスト2
      {{followeeposts2}}
    </div>
    <br>
    <div>
      全体のポスト
      {{wholeposts}}
    </div> -->

    <!-- <div>
      全体のポスト
      {{wholeposts}}
    </div>

    <div>
      テストポスト
      {{testposts}}
    </div> -->

    <div>
      全体のツイート
      {{wholeposts}}
    </div>
    <br>
    <div>
      全体の料理
      {{wholeposts2}}
    </div>
    <br>
    <div>
      全体の筋トレ
      {{wholeposts3}}
    </div>

  <div>
    {{relation}}
  </div>

  </div>
</template>

<script>
import TweetList from '@/components/TweetList.vue';
import Navigation from '@/components/Navigation.vue';

import { API, graphqlOperation } from 'aws-amplify'
// import * as gqlQueries from '../graphql/queries'
// import * as gqlMutations from '../graphql/mutations'


// const _query = `query GetUser($id: ID!) {
//   getUser(id: $id) {
//     name
//   }
// }
// `

// [fix]ここのクエリーfilter使ってもう少しよくできないか
const _query2 = `query GetUser($id: ID!) {
  getUser(id: $id) {
    tweetPosts {
      items {
        id
        content
        createdAt
        user {
          name
          emailAddress
        }
      }
    }
    cookingPosts {
      items {
        id
        title
        content
        calorie
        createdAt
        user {
          name
          emailAddress
        }
      }
    }
    traningPosts {
      items {
        id
        title
        content
        createdAt
        user {
          name
          emailAddress
        }
      }
    }
    followees {
      items {
        follower {
          tweetPosts {
            nextToken
            items {
              id
              content
              createdAt
              user {
                name
                emailAddress
              }
            }
          }
          cookingPosts {
            nextToken
            items {
              content
              calorie
              createdAt
              id
              title
              user {
                name
                emailAddress
              }
            }
          }
          traningPosts {
            nextToken
            items {
              id
              content
              createdAt
              title
              user {
                name
                emailAddress
              }
            }
          }
        }
      }
    }
  }
}
`


//[fix]これ、フォローしてない人の投稿もタイムラインに映るわ。。
const onCreateTweet = /* GraphQL */ `
  subscription OnCreateTweet {
    onCreateTweet {
      id
      content
      createdAt
      user {
        name
        emailAddress
      }
    }
  }
`;

const onCreateCooking = /* GraphQL */ `
  subscription OnCreateCooking {
    onCreateCooking {
      id
      title
      content
      calorie
      createdAt
      user {
        name
        emailAddress
      }
    }
  }
`;

const onCreateTraning = /* GraphQL */ `
  subscription OnCreateTraning {
    onCreateTraning {
      id
      title
      content
      createdAt
      user {
        name
        emailAddress
      }
    }
  }
`;


const onDeleteTweet = /* GraphQL */ `
  subscription OnDeleteTweet {
    onDeleteTweet {
      id
    }
  }
`;

const onDeleteCooking = /* GraphQL */ `
  subscription OnDeleteCooking {
    onDeleteCooking {
      id
    }
  }
`;

const onDeleteTraning = /* GraphQL */ `
  subscription OnDeleteTraning {
    onDeleteTraning {
      id
    }
  }
`;

export default {
  name: 'home',
  data() {
    return{
      // tab初期値
      tab: 'tab-1',
      // 上に行くボタン用
      buttonActive: false,
      scroll: 0,
      // ここ変えるとボタンの表示位置とか変わる
      direction: 'bottom',
      fab: false,
      fling: false,
      hover: true,
      tabs: null,
      top: true,
      right: false,
      bottom: false,
      left: false,
      transition: 'slide-y-transition',
      // 表示変わるところここまで
      user: null,
      createSubscription: {},
      // 料理用
      createSubscription2: {},
      // 筋トレ用
      createSubscription3: {},
      deleteSubscription: {},
      // 料理用
      deleteSubscription2: {},
      // 筋トレ用
      deleteSubscription3: {},
      myposts: null,
      // 料理用
      myposts2: null,
      // 筋トレ用
      myposts3: null,
      followeeposts: [],
      // 料理用
      followeeposts2: [],
      // 筋トレ用
      followeeposts3: [],
      testposts:[],
      //開発用
      dev: true,
      // followeeposts2: null,
      //ここルートなので、他の画面編集してる時もいらんクエリー飛ばすのでテストデータいれてます。
      // wholeposts: [ { "id": "64bc2dec-f6a0-4887-aca1-239ade116588", "content": "テストデータ", "createdAt": "2020-11-14T12:23:50.676Z", "user": { "name": "開発中" } }, { "id": "003f8891-0834-480e-8b3a-e693bff1561b", "content": "開発中", "createdAt": "2020-11-15T01:09:26.983Z", "user": { "name": "開発中" } }, { "id": "3f406308-c49b-4af2-bf85-d7914e918c7b", "content": "開発中", "createdAt": "2020-11-15T04:46:33.514Z", "user": { "name": "開発中" } }, { "id": "39ee2d99-870b-4639-baf4-f5fa1ac3d01f", "content": "開発中", "createdAt": "2020-11-14T12:57:01.263Z", "user": { "name": "開発中" } } ]
      wholeposts: null,
      // 料理用
      wholeposts2: null,
      // 筋トレ用
      wholeposts3: null,
      relation: null
    }
  },
  components: {
    TweetList,
    Navigation
  },
  computed: {
  },
  methods: {
    subscribe(){
      // TODO(3-1) GraphQLエンドポイントにsubscriptionを発行し、mutationを監視する
      this.createSubscription = API.graphql(graphqlOperation(onCreateTweet)).subscribe({
        next: (eventData) => {
          console.log("evenData:"+eventData)
          const tweet = eventData.value.data.onCreateTweet;
          this.wholeposts.push(tweet);
          this.relation = eventData
        }
      })

      // 料理
      this.createSubscription2 = API.graphql(graphqlOperation(onCreateCooking)).subscribe({
        next: (eventData) => {
          const cooking = eventData.value.data.onCreateCooking;
          this.wholeposts2.push(cooking);
        }
      })

      // 筋トレ
      this.createSubscription3 = API.graphql(graphqlOperation(onCreateTraning)).subscribe({
        next: (eventData) => {
          const traning = eventData.value.data.onCreateTraning;
          this.wholeposts3.push(traning);
        }
      })

      this.deleteSubscription = API.graphql(graphqlOperation(onDeleteTweet)).subscribe({
        next: (eventData) => {
          const tweet = eventData.value.data.onDeleteTweet;
          this.wholeposts = this.wholeposts.filter(post => post.id != tweet.id);
        }
      })

      // 料理
      this.deleteSubscription = API.graphql(graphqlOperation(onDeleteCooking)).subscribe({
        next: (eventData) => {
          const cooking = eventData.value.data.onDeleteCooking;
          this.wholeposts2 = this.wholeposts2.filter(post => post.id != cooking.id);
        }
      })

      // 筋トレ
      this.deleteSubscription = API.graphql(graphqlOperation(onDeleteTraning)).subscribe({
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

    //きたないのできれいにする。
    if(this.dev){
      const usersorce = this.$store.getters.getUserGraphql
      const query = await API.graphql(
        graphqlOperation(_query2, {id : usersorce.items[0].id})
      )
      console.log("タイムラインクエリー飛ばしました。")
      this.user = query.data.getUser
      this.myposts = this.user.tweetPosts.items//自分のツイート
      this.wholeposts = this.myposts//直接postsにプッシュするとおかしくなる?(pushは参照元まで変えてる?)
      for(let i = 0; i < this.user.followees.items.length; i++){
        if(this.user.followees.items[i].follower.tweetPosts.items.length > 0){
          this.followeeposts.push(this.user.followees.items[i].follower.tweetPosts.items[0])
        } 
      }
      this.wholeposts= this.myposts.concat(this.followeeposts)

      //料理
      this.myposts2 = this.user.cookingPosts.items//自分の料理投稿
      this.wholeposts2 = this.myposts2//直接postsにプッシュするとおかしくなる?(pushは参照元まで変えてる?)
      for(let i = 0; i < this.user.followees.items.length; i++){
        if(this.user.followees.items[i].follower.cookingPosts.items.length > 0){
          
          this.followeeposts2.push(this.user.followees.items[i].follower.cookingPosts.items[0])
        }
      }
      this.wholeposts2= this.myposts2.concat(this.followeeposts2)

      //筋トレ
      this.myposts3 = this.user.traningPosts.items//自分の筋トレ投稿
      this.wholeposts3 = this.myposts3//直接postsにプッシュするとおかしくなる?(pushは参照元まで変えてる?)
      for(let i = 0; i < this.user.followees.items.length; i++){
        if(this.user.followees.items[i].follower.traningPosts.items.length > 0){
          this.followeeposts3.push(this.user.followees.items[i].follower.traningPosts.items[0])
        }
      }
      
      this.wholeposts3= this.myposts3.concat(this.followeeposts3)
    }

    this.subscribe()

  }
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