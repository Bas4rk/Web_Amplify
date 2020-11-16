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
    <FolloweeList :followees="this.followees"></FolloweeList>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import FolloweeList from '@/components/FolloweeList.vue';

import { API, graphqlOperation } from 'aws-amplify'
// import * as gqlQueries from '../graphql/queries'
// import * as gqlMutations from '../graphql/mutations'


// import store from '../store/index.js'


//[fix]これでフォローとフォロワーとってくる。フォロワーのフォロー判定はとってきた配列を一つずつチェックする？もっといい方法ありそう。
// const followees_query = /* GraphQL */`
//   query GetUser(
//     $id: ID!
//     ) {
//     getUser(
//     id: $id
//     ) {
//         followees {
//           items {
//             follower {
//               id
//               name
//               emailAddress
//             }
//           }
//         }
//         followers {
//           items {
//             followee {
//               id
//               name
//               emailAddress
//             }
//           }
//         }
//       }
//     }
//   }
// `

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
      followees: null
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
  }
}
</script>