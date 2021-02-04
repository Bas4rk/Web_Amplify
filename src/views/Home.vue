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
            <TrainingList :items3="trainingPosts"></TrainingList>
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

import { API, graphqlOperation } from 'aws-amplify'
import * as graphql from '../graphql/graphql.js'
var caljudge="ghvgzvhgzhzkgvh"
// import * as subscriptions from '../graphql/subscriptions.js'

const onCreateTweet = /* GraphQL */ `
  # フォローしてない人も取ってきてしまうのでこうしたい
  # subscription onCreateTweet($followerId: ID!) {
  subscription onCreateTweet($followerId: ID!) {
    #  ここもこうしたい
    # onCreateTweet(followerId: $followerId){
    onCreateTweet(followerId: $followerId) {
      id
      createdAt
      content
    }
  }
`;

const onDeleteTweet = /* GraphQL */ `
  # subscription onDeleteTweet($followerId: ID!) {
  subscription onDeleteTweet($followerId: ID!) {
    # onDeleteTweet(followerId: $followerId) {
    onDeleteTweet(followerId: $followerId) {
      id
      createdAt
      content
    }
  }
`;

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
      trainingPosts: null,
      //直前のパス
      prevRoute: 'tweet',
      createSubscription: null,
      deleteSubscription: null,
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

      this.deleteSubscription = API.graphql(graphqlOperation(onDeleteTweet)).subscribe({
        next: (eventData) => {
          const tweet = eventData.value.data.onDeleteTweet;
          this.wholeposts = this.wholeposts.filter(post => post.id != tweet.id);
        }
      })
    },
  },
  mounted : async function(){
    // 上行くボタン
    window.addEventListener('scroll', this.scrollWindow)

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
      }
    }
    

    // //料理リスト
    this.cookingPosts = getUser.cookingPosts.items
    for(let i = 0; i < getUser.followees.items.length; i++){
      for(let j = 0; j < getUser.followees.items[i].follower.cookingPosts.items.length; j++){
        this.cookingPosts.push(getUser.followees.items[i].follower.cookingPosts.items[j])
        
      }
    }
    for(let i=0;i<this.cookingPosts.length;i++){
      if(this.cookingPosts[i].content[0].includes(caljudge)){
          this.cookingPosts.splice(i,1)
          i--
        }
    }
    //筋トレリスト
    this.trainingPosts = getUser.trainingPosts.items
    for(let i = 0; i < getUser.followees.items.length; i++){
      for(let j = 0; j < getUser.followees.items[i].follower.trainingPosts.items.length; j++){
        this.trainingPosts.push(getUser.followees.items[i].follower.trainingPosts.items[j])
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