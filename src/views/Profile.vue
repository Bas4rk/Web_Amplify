<template>
  <div class="profile">
    <Navigation></Navigation>
    <h1>プロフィールページ</h1>
    <!-- <v-btn dark @click="signUp">疑似ユーザー登録</v-btn> -->
    <!-- <v-btn dark @click="signIn">疑似ユーザーサインイン</v-btn> -->
    <!-- <v-btn dark @click="sample5">sample2</v-btn> -->
    <!-- {{getUserGraphql}}
    {{this.$store.getters.getUserCognito}} -->
    <!-- {{followees}} -->
    <!-- followeesとfollowsを渡しています。this.いらない？ -->
    <FolloweeList :followees="this.followees" :follows="follows"></FolloweeList>
   
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import FolloweeList from '@/components/FolloweeList.vue';

import { API, graphqlOperation } from 'aws-amplify'
// import * as gqlQueries from '../graphql/queries'
// import * as gqlMutations from '../graphql/mutations'


// import store from '../store/index.js'


//[add]ここgetUserだったけどFollowerIndexで取ってこれた、mock?でテストして取ってこれたのでそのままコピペしてます
const follows_query = /* GraphQL */`
  query followerIndex(
    $followerId: ID
  ) {
    followerIndex(
      followerId: $followerId
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

//[fix]follweeは「フォローされている人」という意味で、ここに書いてある内容は「フォローしている人」なので名前が逆です。
const followees_query = /* GraphQL */ `

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





export default {
  data() {
    return{
      followees: null,
      //ここに入れてFollowerList.vueに渡す？
      follows: null
    }
  },
  components: {
    Navigation,
    FolloweeList
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
    const usersorce= this.$store.getters.getUserGraphql
    const query = await API.graphql(
      graphqlOperation(followees_query, {followeeId : usersorce.items[0].id})
    )
    console.log("followeesクエリー飛ばしました。")
    this.followees= query.data.followeeIndex.items

    //フォローされてる人リスト取得、変数名がクソ
    const usersource2 = this.$store.getters.getUserGraphql
    //クエリ飛ばし、変数名がクソ
    const query2 = await API.graphql(
      graphqlOperation(follows_query, {followerId : usersource2.items[0].id})
    )
    console.log("followsクエリー飛ばしました。")
    //80行目のfollowsに受け取ったクエリデータ？入れる
    this.follows= query2.data.followerIndex.items
  }
}
</script>