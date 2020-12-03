  
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
      されてるほう
      <!-- <div>{{user}}</div> -->
      <br>
      <!-- <div>{{currentuser}}</div>
      <br>
      <div>{{judgment}}</div> -->
      <br>
      しているほう
      <!-- <div>{{followees}}</div> -->
      {{kotae}}
      <!-- <div>{{i}}</div> -->
        
      <v-row justify="center">
        <v-col cols="5">
          <!-- <v-card> -->
            <!-- <v-subheader>{{ card }}</v-subheader> -->
            <v-subheader>フォローされているユーザー</v-subheader>
            
            <v-list>
                <!-- v-forでfollowsの数だけ回します -->
              <template v-for="(item) in follows">
                <!-- <v-list-item :key="item.id" height="200" :to="{name:'tweet',params:{id:item.id}}"> -->
                  <v-list-item :key="`first-${item.id}`" height="200">
                  <v-list-item-avatar color="grey darken-1">
                    <v-icon size="30">mdi-account</v-icon>
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
          <v-col v-for="(item2, index) in kotae" :key="index">
              <v-btn v-if="item2 == false" @click="createRelation" color="primary">フォローする</v-btn>
              <v-btn v-if="item2 == true" @click="deleteRelation" color="error">フォロー解除</v-btn>
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
//[add]ここgetUserだったけどFollowerIndexで取ってこれた、mock?でテストして取ってこれたのでそのままコピペしてます
const follows_query =`
  query followerIndex(
    $followerId: ID
  ) {
  followerIndex(
    followerId: $followerId ,
  ) {
    items {
      id
      followee {
        id
        name
        emailAddress
      }
    }
  }
}
`;
const followees_query = `
  query FolloweeIndex(
    $followeeId: ID
  ) {
    followeeIndex(
      followeeId: $followeeId
    ) {
      items {
        id
        follower {
          id
          name
          emailAddress
        }
      }
    }
  }
`;
// const a = `
//   query MyQuery {
//     listRelationships {
//       items {
//         followerId
//         followeeId
//         id
//       }
//     }
//   }
// `;
// const follows_query =`
//   query followerIndex(
//     $followerId: ID
//     $filter: ModelRelationshipFilterInput
//   ) {
//     followerIndex(
//       followerId: $followerId
//       filter: $filter
//     ) {
//       items {
//         id
//         followee {
//           id
//           name
//           emailAddress
//         }
//       }
//     }
//   }
// `;
// const _query = `
//   query FolloweeIndex(
//     $followeeId: ID 
//     $filter: ModelRelationshipFilterInput
//   ) {
//   followeeIndex(
//     followeeId: $followeeId 
//     filter: $filter
//   ) {
//     items{
//       id
//     }
//   }
// }
// `
const createRelation_query = `
  mutation CreateRelationship(
    $input: CreateRelationshipInput!
  ) {
    createRelationship(input: $input) {
      id
      blockBool
      followee {
        id
        name
        emailAddress
      }
      follower {
        id
        name
        emailAddress
      }
      createdAt
      updatedAt
    }
  }
`
const deleteRelationship_query = `
  mutation DeleteRelationship(
    $input: DeleteRelationshipInput!
  ) {
    deleteRelationship(input: $input) {
      id
      blockBool
      followee {
        id
        name
        emailAddress
      }
      follower {
        id
        name
        emailAddress
      }
      createdAt
      updatedAt
    }
  }
`
// const deleteRelationship_query = /* GraphQL */ `
//   mutation DeleteRelationship(
//     $input: DeleteRelationshipInput!
//   ) {
//     deleteRelationship(input: $input) {
//       id
//     }
//   }
// `
  export default {
    data() {
      return{
        i: null,
        follows: null,
        // 上に行くボタン用、ここの画面ではスクロールがないので今はtrueにしてます
        buttonActive: true,
        scroll: 0,
        // 判定用
        user: null,
        judgment: null,
        emailAddress: '',
        currentuser: null,
        // 判定入れる配列
        kotae: [],
        // k: null,
        // t: null,
        // true,falseでいる、いない
        tei: null,
        // toriaezu
        bool: false,
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
    async createRelation(){
      // [fix]押したボタンによって関係が変わるようになってない、要修正
      const createRelation = await API.graphql(
        graphqlOperation(createRelation_query, {
          // input: {
          //   blockBool: false, 
          //   followeeId: this.currentuser, 
          //   followerId: "a903aa7a-fa56-4285-b4cd-db68bffa3c8f"
          // }
        })
      )
      console.log("フォローしました"+createRelation.data.createRelationship)
    },
    // フォロー解除するところ
    async deleteRelation(){
      // [fix]押したボタンによって関係が変わるようになってない、要修正
      const deleteRelation = await API.graphql(
        graphqlOperation(deleteRelationship_query, {
      //     input: {
      //       id: this.judgment.items[0].id
      //     }
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
    const usersorce= this.$store.getters.getUserGraphql
    const query = await API.graphql(
      graphqlOperation(followees_query, {followeeId : usersorce.items[0].id})
    )
    console.log("followeesクエリー飛ばしました。")
    this.followees= query.data.followeeIndex.items
    
    //フォローされてる人リスト取得、変数名がクソ
    const usersource2 = this.$store.getters.getUserGraphql
    // const w = await API.graphql(
    //   graphqlOperation(a, {
    //   })
    // )
    // this.i = w.data.listRelationships
    //クエリ飛ばし、変数名がクソ
    const query2 = await API.graphql(
      graphqlOperation(follows_query, {
        followerId : usersource2.items[0].id
      })
    )
    // this.user = query2.data.emailIndex
    console.log("followsクエリー飛ばしました。")
    //80行目のfollowsに受け取ったクエリデータ？入れる
    this.follows= query2.data.followerIndex.items
    this.user= query2.data.followerIndex.items
    // this.follows= this.$store.getters.getUserGraphql.items[0].id
    // じぶんのID
    this.currentuser = usersource2.items[0].id
    // nagasadousuru
    console.log("はじめます")
    for(var k = 0; k< this.user.length; k++){
      for(var t = 0; t < this.followees.length; t++){
        if(this.followees[k].follower.id == this.user[t].followee.id){
          console.log("いた")
          this.tei = true
          this.kotae[k] = this.tei
          break;
        }else{
          console.log("いない")
          this.tei = false
          this.kotae[k] = this.tei
        }
      }
    }
    // this.follows = this.follows.concat(this.kotae)
    // 判定
    // const followJudg = await API.graphql(
    //     graphqlOperation(follows_query, {
    //       filter: {followeeId: {eq: this.user.items[0].followee.id}},
    //       followeeId: this.currentuser
    //     })
    //   )
    //   // console.log(followJudg.data.followeeIndex);
    //   this.judgment = followJudg.data.followerIndex
  },
    // 上行くボタン
    // window.addEventListener('scroll', this.scrollWindow)
    // //フォローされてる人リスト取得、変数名がクソ
    // const usersource2 = this.$store.getters.getUserGraphql
    // //クエリ飛ばし、変数名がクソ
    // const query2 = await API.graphql(
    //   graphqlOperation(follows_query, {
    //     followerId : usersource2.items[0].id
    //   })
    // )
    // // this.user = query2.data.emailIndex
    // console.log("followsクエリー飛ばしました。")
    // //80行目のfollowsに受け取ったクエリデータ？入れる
    // this.follows= query2.data.followerIndex
    // this.user= query2.data.followerIndex
    // // this.follows= this.$store.getters.getUserGraphql.items[0].id
    // // じぶんのID
    // this.currentuser = usersource2.items[0].id
    // // 判定
    // const followJudg = await API.graphql(
    //     graphqlOperation(follows_query, {
    //       filter: {followerId: {eq: this.user.items[0].id}},
    //       followeeId: this.currentuser
    //     })
    //   )
    //   // console.log(followJudg.data.followeeIndex);
    //   this.judgment = followJudg.data.followerIndex
    // //フォローされてる人リスト取得、変数名がクソ
    // const usersource2 = this.$store.getters.getUserGraphql
    // //クエリ飛ばし、変数名がクソ
    // const query2 = await API.graphql(
    //   graphqlOperation(follows_query, {followerId : usersource2.items[0].id})
    // )
    // console.log("followsクエリー飛ばしました。")
    // //80行目のfollowsに受け取ったクエリデータ？入れる
    // this.follows= query2.data.followerIndex.items
  
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