<template>
  <div class="home2">
    <Navigation></Navigation>
      
    <TweetList :items="this.wholeposts"></TweetList>
    
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

const _query2 = `query GetUser($id: ID!) {
  getUser(id: $id) {
    tweetPosts {
      items {
        id
        content
        createdAt
        user {
          name
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
              }
            }
          }
        }
      }
    }
  }
}
`


export default {
  name: 'home2',
  data() {
    return{
      user: null,
      myposts: null,
      followeeposts: [],
      // followeeposts2: null,
      wholeposts: null

    }
  },
  components: {
    TweetList,
    Navigation
  },
  computed: {
  },
  methods: {
  },
  mounted : async function(){
    console.log('mounted')
    const usersorce= this.$store.getters.getUserGraphql

    // const user1 = await API.graphql(
    //   graphqlOperation(gqlQueries.getUser, {
    //     id: usersorce.items[0].id // userテーブルの取得したいデータのID
    //   })
    // )

    if(!this.$store.getters.getWholeposts){
      //開発時にクエリーとびまくるので、データ保存してます。
      //テストデータ作ればクエリー一切飛ばさずにすみますが、だるいのでやってないです
      const query = await API.graphql(
        graphqlOperation(_query2, {id : usersorce.items[0].id})
      )
      console.log("タイムラインクエリー飛ばしました。")
      this.$store.commit('setWholeposts', query)
    }


    //きたないのできれいにする。
    this.user= this.$store.getters.getWholeposts.data.getUser
    this.myposts= this.user.tweetPosts.items//自分のツイート
    this.wholeposts= this.myposts//直接postsにプッシュするとおかしくなる?(pushは参照元まで変えてる?)
    for(let i = 0; i < this.user.followees.items.length; i++){
      if(this.user.followees.items[i].follower.tweetPosts.items.length > 0){
        this.followeeposts.push(this.user.followees.items[i].follower.tweetPosts.items[0])
      } 
    }
    this.wholeposts= this.myposts.concat(this.followeeposts)
    
    // this.user= this.$store.getters.getWholeposts.data.getUser

    // const query = await API.graphql(
    //   graphqlOperation(_query2, {id : usersorce.items[0].id})
    // )
    // console.log("タイムラインクエリー飛ばしました。")

    // this.user= query.data.getUser

    // this.posts= this.user.tweetPosts.items//自分のツイート

    // this.followeeposts= this.user.followees.items[1].follower.tweetPosts.items

    // this.followeeposts2= this.user.followees.items.length

    // for(let i = 0; i < this.user.followees.items.length; i++){
    //   if(this.user.followees.items[i].follower.tweetPosts.items.length > 0){
    //     this.posts.push(this.user.followees.items[i].follower.tweetPosts.items[0])//フォローしてる人のツイートを入れてる
    //   } 
    // }

    // this.wholeposts= this.myposts.concat(this.followeeposts)

  }
}
</script>