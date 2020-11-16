<template>
  <div class="TweetList">
    <v-container
      class="py-8 px-6"
      fluid
    >
      <v-row justify="center">
          <!-- 日ごとに表示させる -->
        <!-- <v-col
          v-for="card in cards"
          :key="card"
          cols="12"
        > -->
        <v-col cols="5">
          <v-card>
            <!-- <v-subheader>{{ card }}</v-subheader> -->
            <v-subheader>投稿一覧</v-subheader>

            <v-list>
              <template v-for="item in items">
                <v-list-item :key="item.id" height="200" :to="{name:'tweet',params:{id:item.id,item: item}}">
                  <!-- <v-list-item :key="item.id" height="200"> -->
                  <v-list-item-avatar color="grey darken-1">
                    <v-icon size="30">mdi-account</v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.content }}</v-list-item-title>

                    <v-list-item-subtitle>
                      <!-- {{ item.description}} -->
                      <div class="right">
                        <small>投稿者:{{ item.user.name }}</small>
                      </div>
                      <div class="right">
                        <small>{{ item.user.emailAddress }}</small>
                      </div>
                      <div class="right">
                        <small>{{ item.createdAt }}</small>
                      </div>
                    </v-list-item-subtitle>
                    <!-- [fix]メアド見てやってるけどidのほうがいい？メアドもプライマリーぽいからいい気がした。idのクエリーとらなくてすむし -->
                    <v-btn v-if="item.user.emailAddress == currentuser" @click="deleteTweet(item.id)" color="error">投稿削除</v-btn>
                  </v-list-item-content>
                </v-list-item>

                <v-divider
                  :key="`divider-${item.id}`"
                  inset
                ></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-col>
      </v-row>


      <v-btn large color="primary" @click="scrollTop">上にいく</v-btn>
      

      <v-row>
        <v-col>
          <v-card >
            <v-subheader>ツイート投稿</v-subheader>
            <!-- <NewTodo></NewTodo> -->
            <CreateTweet></CreateTweet>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <!-- tweetカードらへんをコンポーネントにする。一番上に飛ぶボタンつくる -->
</template>

<script>
// import NewTodo from '@/components/NewTodo.vue';
import CreateTweet from '@/components/CreateTweet.vue';

import { API, graphqlOperation } from 'aws-amplify'

const deleteTweet_query = /* GraphQL */`
  mutation DeleteTweet(
    $input: DeleteTweetInput!
  ) {
    deleteTweet(input: $input) {
      id
    }
  }
`

  export default {
    data () {
      return {
        // currentuser: null
      }
    },
    props:['items'],
    components: {
      CreateTweet
    },
    computed: {
      currentuser(){
        return this.$store.getters.getUserGraphql.items[0].emailAddress
      }
    },
    methods: {
      scrollTop: function(){
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      },
      async deleteTweet(id){
        const deleteTweet = await API.graphql(
          graphqlOperation(deleteTweet_query, {
            input: {
              id: id
            }
          })
        )
        console.log("投稿を削除しました"+deleteTweet.data.deleteTweet)
      }
    },
  }
</script>

<style scoped>
  .right{
    text-align: right;
  }
</style>
