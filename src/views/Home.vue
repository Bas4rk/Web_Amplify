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


    <!-- ◆◆◆ツイートのダイアログ開始◆◆◆ -->
     <v-dialog
        v-model="dialog"
        max-width="290"
      >
        <v-form>
          <v-container>
            <v-row>

              <!-- 戻るボタンです -->
              <v-col cols="12" sm="6" md="3" justify="left">
                <v-btn
                  class="ma-2"
                  color="primary"
                  dark
                  @click="back"
                >
                <v-icon
                  dark
                  left
                >
                  mdi-arrow-left
                </v-icon>Back</v-btn>
              </v-col>

              <!-- 下書きボタンです、中身はまだない -->
              <v-col cols="12" sm="6" md="3" justify="right">
                <v-btn
                  class="ma-2"
                  color="primary"
                  dark
                >
                  下書き
                </v-btn>

                <!-- 投稿ボタン -->
                <v-btn
                  class="ma-2"
                  color="primary"
                  dark
                  @click="createTweet"
                >
                  投稿
                </v-btn>
              </v-col>

            </v-row>

            <v-row>

              <!-- 投稿記述場所 -->
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  placeholder="内容"
                  v-model="content"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-dialog>
      <!-- ◆◆◆ツイートのダイアログ終了◆◆◆ -->
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
import * as gqlMutations from '../graphql/mutations'

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
        { color: 'green', dialog: true, icon: 'mdi-comment' },
        { color: 'red', to: '/createCooking', icon: 'mdi-silverware-fork-knife' },
        { color: 'indigo', to: '/createTraining', icon: 'mdi-dumbbell' },
      ],
      //ポストリスト
      tweetPosts: null,
      cookingPosts: null,
      trainingPosts: null,
      //直前のパス
      prevRoute: 'tweet',
      //ツイート管理用
      content: '',
      dialog: false,
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

    //料理リスト
    this.cookingPosts = getUser.cookingPosts.items
    for(let i = 0; i < getUser.followees.items.length; i++){
      for(let j = 0; j < getUser.followees.items[i].follower.cookingPosts.items.length; j++){
        this.cookingPosts.push(getUser.followees.items[i].follower.cookingPosts.items[j])
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
  async createTweet(){
    const tweet = await API.graphql(
      //[fix]あとでクエリー書き直す?
      graphqlOperation(gqlMutations.createTweet, {
        input: {
          content: this.content,
          userId: this.$store.getters.getUserId
        }
      })
    )
    console.log(tweet.data.createTweet);
    // createTweetにそのまま書いてるけど、thenとかerrorで投稿成功、投稿失敗とか分けた方がいいと思った。
    this.dialog = false;
    this.content = '';
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