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

    <!-- <div>
      全体のポスト
      {{wholeposts}}
    </div>

    <div>
      テストポスト
      {{testposts}}
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
        }
      }
    }
  }
}
`



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


const onDeleteTweet = /* GraphQL */ `
  subscription OnDeleteTweet {
    onDeleteTweet {
      id
    }
  }
`;


export default {
  name: 'home2',
  data() {
    return{
      user: null,
      createSubscription: {},
      deleteSubscription: {},
      myposts: null,
      followeeposts: [],
      testposts:[],
      //開発用
      dev: true,
      // followeeposts2: null,
      //ここルートなので、他の画面編集してる時もいらんクエリー飛ばすのでテストデータいれてます。
      // wholeposts: [ { "id": "64bc2dec-f6a0-4887-aca1-239ade116588", "content": "テストデータ", "createdAt": "2020-11-14T12:23:50.676Z", "user": { "name": "開発中" } }, { "id": "003f8891-0834-480e-8b3a-e693bff1561b", "content": "開発中", "createdAt": "2020-11-15T01:09:26.983Z", "user": { "name": "開発中" } }, { "id": "3f406308-c49b-4af2-bf85-d7914e918c7b", "content": "開発中", "createdAt": "2020-11-15T04:46:33.514Z", "user": { "name": "開発中" } }, { "id": "39ee2d99-870b-4639-baf4-f5fa1ac3d01f", "content": "開発中", "createdAt": "2020-11-14T12:57:01.263Z", "user": { "name": "開発中" } } ]
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
    subscribe(){
      // TODO(3-1) GraphQLエンドポイントにsubscriptionを発行し、mutationを監視する
      this.createSubscription = API.graphql(graphqlOperation(onCreateTweet)).subscribe({
        next: (eventData) => {
          const tweet = eventData.value.data.onCreateTweet;
          this.wholeposts.push(tweet);
        }
      })

      this.deleteSubscription = API.graphql(graphqlOperation(onDeleteTweet)).subscribe({
        next: (eventData) => {
          const tweet = eventData.value.data.onDeleteTweet;
          this.wholeposts = this.wholeposts.filter(post => post.id != tweet.id);
        }
      })
    },
    //[fix]下のよく分からない
    // beforeDestroy() {
    //   // TODO(3-2) チャット画面から離れる際に、UnSubscribeする
    //   this.subscription.unsubscribe();
    // },
  },
  mounted : async function(){

    //きたないのできれいにする。
    if(this.dev){
      const usersorce= this.$store.getters.getUserGraphql
      const query = await API.graphql(
        graphqlOperation(_query2, {id : usersorce.items[0].id})
      )
      console.log("タイムラインクエリー飛ばしました。")
      this.user = query.data.getUser
      this.myposts= this.user.tweetPosts.items//自分のツイート
      this.wholeposts= this.myposts//直接postsにプッシュするとおかしくなる?(pushは参照元まで変えてる?)
      for(let i = 0; i < this.user.followees.items.length; i++){
        if(this.user.followees.items[i].follower.tweetPosts.items.length > 0){
          this.followeeposts.push(this.user.followees.items[i].follower.tweetPosts.items[0])
        } 
      }
      this.wholeposts= this.myposts.concat(this.followeeposts)
    }

    this.subscribe()










    
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