  
<template>
  <div class="FolloweeList">
    <Navigation></Navigation>
    <v-container
      class="py-8 px-6"
      fluid
    >
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
        </v-icon>Back
      </v-btn>
      <!-- されてるほう -->
      <!-- <div>{{follows}}</div>
      <br><br>
      {{followees}} -->
      <!-- <br> -->
      <!-- <div>{{currentuser}}</div>
      <br>
      <div>{{judgment}}</div> -->
      <!-- <br> -->
      <!-- しているほう -->
      <!-- <div>{{followees}}</div> -->
      <!-- {{kotae}} -->
      <!-- <div>{{i}}</div> -->
        
      <v-row justify="center">
        <v-col cols="5">
          <!-- <v-card> -->
            <!-- <v-subheader>{{ card }}</v-subheader> -->
            <v-subheader>フォローされているユーザー</v-subheader>
            
            <v-list>
              <!-- {{followees[0].follower.followers.items[0].id}} -->
                <!-- v-forでfollowsの数だけ回します -->
              <template v-for="(item) in follows">
                <!-- <v-list-item :key="item.id" height="200" :to="{name:'tweet',params:{id:item.id}}"> -->
                  <v-list-item :key="`first-${item.id}`" height="200">
                  <v-list-item-avatar color="grey darken-1">
                    <!-- <v-icon size="30">mdi-account</v-icon> -->
                    <img :src="item.followee.iconImage">
                  </v-list-item-avatar>
            
                  <v-list-item-content>
                      <!-- ここから下のitem.followee.~はProfile.vueにクエリ？が書いてあります -->
                    <v-list-item-title>{{ item.followee.name}}</v-list-item-title>

                    <v-list-item-subtitle>
                      <!-- {{ item.description}} -->
                      <div>
                        <small>{{ item.followee.emailAddress }}</small>
                      </div>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider
                  :key="`divider-${item.followee.id}`"
                  inset
                ></v-divider>
              </template>
            </v-list>
          <!-- </v-card> -->
        </v-col>
        <v-list>
          <!-- [fix]位置調整のためのv-subheader、v-list-item-contentをいい感じに書き直す -->
          <v-subheader></v-subheader>
          <v-list-item-content></v-list-item-content>
          <!-- v-forで配列kotaeの長さ分回してる、keyの指定はしないとエラーで怒られるので:key="item2"て書いてる
          v-for="item2 in kotae"はitem2にkotaeを入れて、v-forの中でkotaeを認識させてる。これがないと'kotae'undefinedで定義されてないって怒られる、
          ここでDuplicate keys detected: 'true'. This may cause an update error.出たので:key="item2.trueで消した、これが正しいかどうかはわからない -->
          <v-col v-for="(item2, index) in kotae" :key="index">
            <!-- item2（配列kotae）の中身がfalse（フォローしてない人）の時 -->
            <v-btn v-if="item2 == false" @click="createRelation(index)" color="primary">フォローする</v-btn>
            <!-- item2（配列kotae）の中身がtrue（フォローしてる人）の時 -->
            <v-btn v-if="item2 == true" @click="deleteRelation(index)" color="error">フォロー解除</v-btn>
          </v-col>
        </v-list>
        
      </v-row>
     

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
    </v-container>
  </div>
  
  <!-- tweetカードらへんをコンポーネントにする。一番上に飛ぶボタンつくる -->
</template>

<script>
import Navigation from '@/components/Navigation.vue';
// import NewTodo from '@/components/NewTodo.vue';
import { API, graphqlOperation } from 'aws-amplify'
// import * as gqlQueries from '../graphql/queries'
import * as myGraphql from '../graphql/graphql'
import * as gqlMutations from '../graphql/mutations'
import {Storage} from 'aws-amplify'

  export default {
    data() {
      return{
        follows: null,
        // 上に行くボタン用、ここの画面ではスクロールがないので今はtrueにしてます
        buttonActive: true,
        scroll: 0,
        // 判定用
        judgment: null,
        emailAddress: '',
        // フォローしてるかしてないかの判定入れる配列、true,falseが入る
        kotae: [],
      }
    },
    // props:['followees', 'follows'],
    components: {
      Navigation,
    },
    methods: {
    // 上に行くボタン
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
    // フォローするところ
    async createRelation(index){
      // [fix]押したボタンによって関係が変わるようになってない、要修正
      const createRelation = await API.graphql(
        graphqlOperation(gqlMutations.createRelationship, {
          input: {
          // よくわかんないけど全部falseだった
            blockBool: false, 

          // フォローする人のid
            followeeId: this.$store.getters.getUserId,
          
          // 自分がフォローされる人の
            followerId: this.follows[index].followee.id
          }
        })
      )
      console.log("フォローしました"+createRelation.data.createRelationship)
    },
    // フォロー解除するところ
    async deleteRelation(index){
      // [fix]押したボタンによって関係が変わるようになってない、要修正
      const deleteRelation = await API.graphql(
        graphqlOperation(gqlMutations.deleteRelationship, {
          input: {
            id: this.followees[index].follower.followers.items[0].id
          }
        })
      )
      console.log("フォロー解除しました"+deleteRelation.data.deleteRelationship)
    },
    // 戻るボタン
    back: function(){
      this.$router.push('/Profile');
      // historyできてなくね？
    },
  },
  mounted: async function(){
    const query = await API.graphql(
      graphqlOperation(myGraphql.followees_query, {
        followeeId : this.$store.getters.getUserId,
        followFilter: {followeeId: {eq: this.$store.getters.getUserId}}
      })
    )
    console.log("followeesクエリー飛ばしました。")
    this.followees= query.data.followeeIndex.items
    
    //フォローされてる人リスト取得、変数名がクソ
    const query2 = await API.graphql(
      graphqlOperation(myGraphql.follows_query, {
        followerId : this.$store.getters.getUserId
      })
    )
    console.log("followsクエリー飛ばしました。")
    // followsは自分のことをフォローしてる人（自分がフォローされてる人）リスト
    this.follows= query2.data.followerIndex.items
    // フォローしてるかしてないかの判定
    // 自分のことをフォローしてる人（自分がフォローされてる人）の人数分forする
    for(var k = 0; k< this.follows.length; k++){
      // followeesは自分がフォローしてる人のリスト
      for(var t = 0; t < this.followees.length; t++){
        // フォローしてる人の中にフォローされてる人がいたらkotaeにtrueを入れてbreakする
        if(this.followees[t].follower.id == this.follows[k].followee.id){
          this.kotae[k] = true
          break;
        }else{
          // フォローしてる人の中にフォローされてる人がいなかったらfalse入れる
          this.kotae[k] = false
        }
      }
    }

    for(var i = 0; i < this.follows.length; i++){
      if(this.follows[i].followee.iconImage != null){
        this.follows[i].followee.iconImage = await Storage.get(this.follows[i].followee.iconImage)
      }
    }

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