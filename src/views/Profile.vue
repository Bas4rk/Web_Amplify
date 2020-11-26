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
    <!-- {{followees}} -->

    <v-container>

      <!-- アカウントアイコン、なんか位置ずれてる？ -->
      <v-row justify="center">
        <v-list-item-avatar size="130" color="grey darken-1">
          <v-icon size="130">mdi-account</v-icon>
        </v-list-item-avatar>
      </v-row>

      <!-- アカウント名 -->
      <v-row justify="center">
        てすと
      </v-row>

      <!-- アカウントID -->
      <v-row justify="center">
          @test
      </v-row>

      <!-- プロフィール文、位置はここか左にあるボタンとTabの間？ -->
      <v-row justify="center">
        ここにプロフィール紹介文
      </v-row>

      <v-row>
        <v-btn large color="primary"  to="/followerlist">フォロー中</v-btn>
        <v-btn large color="primary"  to="/followeelist">フォロワー</v-btn>
        <v-btn large color="primary"  to="">プロフィール編集</v-btn>
        <!-- ブックマークボタン、Prottにあったのでとりあえずつけた -->
        <v-btn
          icon
          to="">
          <v-icon>mdi-bookmark-outline</v-icon>
        </v-btn>
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
import Navigation from '@/components/Navigation.vue';
import { API, graphqlOperation } from 'aws-amplify'

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
`;


export default {
  name: 'profile',
  data() {
    return{
      tab: 'tab-1',
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
    }
  },
  components: {
    TweetList,
    Navigation
  },
  computed: {
    // getUserGraphql(){
    //   return this.$store.getters.getUserGraphql
    // }
  },
  methods: {
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
    if(this.dev){
      const usersorce = this.$store.getters.getUserGraphql
      const query = await API.graphql(
        graphqlOperation(_query2, {id : usersorce.items[0].id})
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
      this.myposts3 = this.user.traningPosts.items//自分の筋トレ投稿
      this.wholeposts3 = this.myposts3//直接postsにプッシュするとおかしくなる?(pushは参照元まで変えてる?)
      // プロフィールページなのでフォローしてる人の投稿入れてません
      // for(let i = 0; i < this.user.followees.items.length; i++){
      //   if(this.user.followees.items[i].follower.traningPosts.items.length > 0){
      //     this.followeeposts3.push(this.user.followees.items[i].follower.traningPosts.items[0])
      //   }
      // }
      
      this.wholeposts3= this.myposts3.concat(this.followeeposts3)
    }
  },
}
</script>