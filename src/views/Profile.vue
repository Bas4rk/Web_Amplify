<template>
  <div class="profile">
    <Navigation></Navigation>
    <!-- <h1>プロフィールページ</h1> -->
    <!-- v-layout justify-centerで中央に持ってくる -->
    <!-- <v-layout justify-center> -->

      <!-- class="title"で文字の大きさを変えてます、ここ"display-1"でもいいかも -->
      <!-- <div class="title">プロフィールページ</div>

    </v-layout> -->
    <!-- 横線です -->
    <!-- <v-divider></v-divider> -->
    <!-- <v-btn dark @click="signUp">疑似ユーザー登録</v-btn> -->
    <!-- <v-btn dark @click="signIn">疑似ユーザーサインイン</v-btn> -->
    <!-- <v-btn dark @click="sample5">sample2</v-btn> -->
    <!-- {{getUserGraphql}}
    {{this.$store.getters.getUserCognito}} -->
    <v-container>

      <!-- アカウントアイコン、なんか位置ずれてる？ -->
      <!-- <v-row justify="center">
        <v-list-item-avatar size="130" color="grey darken-1">
          <v-icon size="130">mdi-account</v-icon>
        </v-list-item-avatar>
      </v-row> -->

      <v-row justify="center">
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
      </v-row>

      <!-- アカウント名 -->
      <v-row justify="center">
        {{getUserName}}
      </v-row>

      <!-- アカウントID -->
      <v-row justify="center">
        {{getUserEmail}}
      </v-row>

      <!-- プロフィール文、位置はここか左にあるボタンとTabの間？ -->
      <!-- <v-row justify="center">
        ここにプロフィール紹介文
      </v-row> -->

      <!-- スペースの有無どうする？ -->
       <!-- class="d-flex justify-space-around mb-6" -->
      <v-row justify="center">
        <!-- <v-spacer></v-spacer> -->
        <v-btn large color="primary"  to="/followerlist">フォロー中</v-btn>
        <!-- <v-spacer></v-spacer> -->
        <v-btn large color="primary"  to="/followeelist">フォロワー</v-btn>
        <!-- <v-spacer></v-spacer> -->
        <v-btn large color="primary"  to="/profileedit">プロフィール編集</v-btn>
        <!-- <v-spacer></v-spacer> -->
        <!-- ブックマークボタン、Prottにあったのでとりあえずつけた -->
        <!-- <v-btn
          icon
          to="">
          <v-icon>mdi-bookmark-outline</v-icon>
        </v-btn> -->
        <!-- <v-col>
        </v-col> -->
          <!-- <v-btn large color="primary"  to="/">フォロー</v-btn>
          <v-btn large color="primary"  to="/">フォロワー</v-btn> -->
          <!-- <v-btn large color="primary">いいね</v-btn> -->
      </v-row>

      <!-- 横線です -->
      <v-divider></v-divider>

      <!-- Tabとその中身入れ替えです、TweetListそのまま使いました -->
      <v-tabs fixed-tabs v-model="tab">
        <v-tab href="#tweet">つぶやき</v-tab>
        <v-tab href="#cooking">料理</v-tab>
        <v-tab href="#training">筋トレ</v-tab>
        <!-- <v-tab href="#tab-4">いいね</v-tab> -->
      </v-tabs>

      <!-- 中身 -->
      <v-tabs-items v-model="tab">
        <v-tab-item value="tweet">
          <!-- <v-divider></v-divider> -->
          <!-- [fix]タブ事にコンポーネント作った方がいいかも -->
          <v-row justify="center">
            <v-col cols="5">
              <TweetList :items="this.wholeposts"></TweetList>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item value="cooking">
          <v-row justify="center">
            <v-col cols="5">
              <CookingList :items2="this.wholeposts2"></CookingList>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item value="training">
          <v-row justify="center">
            <v-col cols="5">
              <TrainingList :items3="this.wholeposts3"></TrainingList>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>

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
        自分の投稿
        {{myposts}}
      </div>
      <br>
      <div>
        自分の料理投稿
        {{myposts2}}
      </div>
      <br>
      <div>
        自分の筋トレ投稿
        {{myposts3}}
      </div> -->

    </v-container>
  </div>
</template>

<script>
import TweetList from '@/components/TweetList.vue';
import CookingList from '@/components/CookingList.vue';
import TrainingList from '@/components/TrainingList.vue';
import Navigation from '@/components/Navigation.vue';
import { API, graphqlOperation } from 'aws-amplify';
import store from '../store/index.js';

// import * as gqlQueries from '../graphql/queries'
// import * as gqlMutations from '../graphql/mutations'
// import store from '../store/index.js'

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
          iconImage
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
        image
        user {
          name
          emailAddress
        }
      }
    }
    trainingPosts {
      items {
        id
        title
        content
        createdAt
        image
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
              image
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
              image
              user {
                name
                emailAddress
              }
            }
          }
          trainingPosts {
            nextToken
            items {
              id
              content
              createdAt
              title
              image
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
`;


export default {
  name: 'profile',
  data() {
    return{
      tab: 'tweet',
      // 上に行くボタン用
      buttonActive: false,
      scroll: 0,
      user: null,
      followees: null,
      //ここに入れてFollowerList.vueに渡す？
      follows: null,
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
      wholeposts: [],
      // 料理用
      wholeposts2: null,
      // 筋トレ用
      wholeposts3: null,
      //開発用
      dev: true,
      prevRoute: null,
    }
  },
  components: {
    TweetList,
    Navigation,
    CookingList,
    TrainingList,
  },
  computed: {
    // プロフィール表示、Navigation.vueのやつ貰った
    getUserName(){
      return  this.$store.getters.getUserName
    },
    getUserEmail(){
      return  this.$store.getters.getUserEmail
    },
    getAvatar(){
      return this.$store.getters.getUserAvatar
    },
  },
  methods: {
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
    // async signUp(){
      // const user = await API.graphql(
      //   graphqlOperation(gqlMutations.createUser, {
      //     input: {
      //       name: this.nickname,
      //       emailAddress: this.$store.getters.getUserCognito,
      //       premium: false
      //     }
      //   }))
      //   console.log(user.data.createUser);
      //   this.$store.commit('setUserGraphql', user.data.createUser)
    // },
    // async signIn(){
    //   const user = await API.graphql(
    //     graphqlOperation(gqlQueries.emailIndex, {
    //       emailAddress: this.$store.getters.getUserCognito // userテーブルの取得したいデータのID
    //     })
    //   )
    //   console.log(user.data.emailIndex);
    //   this.$store.commit('setUserGraphql', user.data.emailIndex)
    // },
    // sample5(){
    //   store.commit('setUserGraphql',"this.username","this.nickname")
    // }
  },
  mounted : async function(){
    // 上行くボタン
    window.addEventListener('scroll', this.scrollWindow)

    if(this.dev){
      // const usersorce = this.$store.getters.getUserGraphql
      const query = await API.graphql(
        graphqlOperation(_query2, {id : this.$store.getters.getUserId})
      )
      console.log("タイムラインクエリー飛ばしました。")
      this.user = query.data.getUser
      this.myposts = this.user.tweetPosts.items//自分のツイート
      this.wholeposts = this.myposts//直接postsにプッシュするとおかしくなる?(pushは参照元まで変えてる?)
      // プロフィールページなのでフォローしてる人の投稿入れてません
      // for(let i = 0; i < this.user.followees.items.length; i++){
      //   if(this.user.followees.items[i].follower.tweetPosts.items.length > 0){
      //     this.followeeposts.push(this.user.followees.items[i].follower.tweetPosts.items[0])
      //   }
      // }
      this.wholeposts= this.myposts.concat(this.followeeposts)

      //料理
      this.myposts2 = this.user.cookingPosts.items//自分の料理投稿
      this.wholeposts2 = this.myposts2//直接postsにプッシュするとおかしくなる?(pushは参照元まで変えてる?)
      // プロフィールページなのでフォローしてる人の投稿入れてません
      // for(let i = 0; i < this.user.followees.items.length; i++){
      //   if(this.user.followees.items[i].follower.cookingPosts.items.length > 0){

      //     this.followeeposts2.push(this.user.followees.items[i].follower.cookingPosts.items[0])
      //   }
      // }
      this.wholeposts2= this.myposts2.concat(this.followeeposts2)

      //筋トレ
      this.myposts3 = this.user.trainingPosts.items//自分の筋トレ投稿
      this.wholeposts3 = this.myposts3//直接postsにプッシュするとおかしくなる?(pushは参照元まで変えてる?)
      // プロフィールページなのでフォローしてる人の投稿入れてません
      // for(let i = 0; i < this.user.followees.items.length; i++){
      //   if(this.user.followees.items[i].follower.trainingPosts.items.length > 0){
      //     this.followeeposts3.push(this.user.followees.items[i].follower.trainingPosts.items[0])
      //   }
      // }

      this.wholeposts3= this.myposts3.concat(this.followeeposts3)

      //アイコン画像判定
      let avatar = store.getters.getUserAvatar
      if(!avatar){
        avatar = await Storage.get(`${store.getters.getUserEmail}/avatar`)
        store.commit('setUserAvatar',avatar)
      }
    }

    // 直前に見ていたタブに戻る
    //[fix]mounted後で整理する。
    //直前に見ていたタブには戻れるけど、スクロールの位置とかまでは出来てない
    let route = this.prevRoute
    console.log("route"+route)
    let array = ['tweet','cooking','training'];
    if(!array.includes(route)){route = 'tweet'}
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