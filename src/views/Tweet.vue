<template>
  <div class="Tweet">
    <Navigation></Navigation>
    <!-- <h1>Tweetページ</h1> -->
    <!-- {{tweetData}} -->
    <v-row justify="center">
      <v-col cols="5">
        <v-dialog
          v-model="dialog"
          max-width="1000"
        >
          <v-card>  <!-- TweetComment -->
            <v-form>
              <v-container>
                <v-row>
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
                      @click="createComment"
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
          </v-card>
        </v-dialog>
        <v-card> 
          <v-btn class="ma-2" color="primary" dark @click="back"> <!-- 戻るボタン -->
            <v-icon dark left>
              mdi-arrow-left
            </v-icon>Back
          </v-btn>

          <v-divider></v-divider>
          <!-- [fix]v-cardの中にv-cardあるけどいいんだっけ？ -->
          <v-card>
            <!-- <small>{{tweetData.createdAt}}</small> -->
            <v-card-title class="mt-8">
                <v-avatar size="56">
                  <img
                    alt="user"
                    src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
                  >
                </v-avatar>
                <p class="ml-3">
                  {{tweetContent}}
                </p>

                <!-- <v-menu
                  :close-on-click="true"
                  :close-on-content-click="true"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-if="tweetData.user.emailAddress == currentuser"
                      @click="deleteTweet(tweetData.id)"
                    > 
                      <v-list-item-icon>
                        <v-icon>mdi-trash-can</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>投稿削除</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu> -->

              </v-card-title>
            <!-- <v-card-subtitle class="headline">{{tweetData.description}}</v-card-subtitle> -->
            <v-divider class="mx-3"></v-divider>
            <!-- <v-card-text>
              <div class="body-1 mb-1 headline">{{tweetData.description}}</div>
            </v-card-text> -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
              icon color="pink"
              @click="commentDialogOn">
                <v-icon>mdi-comment</v-icon>
              </v-btn>

              <v-spacer></v-spacer>
              <v-btn icon color="green">
                <v-icon>mdi-cached</v-icon>
              </v-btn>

              <v-spacer></v-spacer>
              <v-btn 
              icon color="pink"
              @click="createFavorite">
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-spacer></v-spacer>
              <small>{{tweetUserName}}</small>
            </v-card-actions>
          </v-card>

          <!-- commentList開始 -->
            <v-list>
              <template v-for="item in commentList">
                
                <v-menu
                    :close-on-click="true"
                    :close-on-content-click="true"
                    :key="`option-${item.id}`"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>mdi-dots-horizontal</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item
                        v-if="item.user.emailAddress == currentuser"
                        @click="deleteTweet(item.id)"
                      > 
                        <v-list-item-icon>
                          <v-icon>mdi-trash-can</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>投稿削除</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>

                <v-list-item :key="item.id" height="200" :to="{name:'tweet',params:{item: item}}">
                  <v-list-item-avatar color="grey darken-1">
                    <v-icon size="30">mdi-account</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.content }}</v-list-item-title>
                    <v-list-item-subtitle>
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
                  </v-list-item-content>
                </v-list-item>
                <v-divider
                  :key="`divider-${item.postId}`"
                  inset
                ></v-divider>
              </template>
            </v-list>
            <!-- commentList開始 -->
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import { API, graphqlOperation } from 'aws-amplify'
// import * as gqlQueries from '../graphql/queries' // read
// import * as gqlMutations from '../graphql/mutations' // create, update, delete
// import * as gqlSubscriptions from '../graphql/subscriptions' // 監視
import Navigation from '@/components/Navigation.vue';

import { API, graphqlOperation } from 'aws-amplify'
import * as gqlMutations from '../graphql/mutations'
import * as gqlQueries from '../graphql/queries'

const deleteTweet_query = /* GraphQL */`
  mutation DeleteTweet(
    $input: DeleteTweetInput!
  ) {
    deleteTweet(input: $input) {
      id
    }
  }
`

// const GetTodoQuery = `query GetTodo($id: ID!) {
//   getTodo(id: $id) {
//     name
//     description
//     createdAt
//     updatedAt
//     user_id
//   }
// }
// `;

export default {
  //[fix]componetsとかデータとかの順番全ファイルでそろえる。
  //あと正しい使い方出来てるかいろいろ整理する。
  components: {
    Navigation
  },
  computed: {
    currentuser(){
      return this.$store.getters.getUserEmail
    }
  },
  data() {
    return {

      tweetData:      this.$route.params.item,
      tweetId:        this.$route.params.item.id,
      tweetContent:   this.$route.params.item.content,
      tweetUserName:  this.$route.params.item.user.name,
      commentList:    this.$route.params.item.comments.items,
      prevRoute:      null,
      dialog:         false
    };
  },
  methods:{
    back: function(){
      this.$router.push(this.prevRoute);
      // historyできてなくね？
    },
    async createFavorite(){
      const favorite = await API.graphql(
        graphqlOperation(gqlMutations.createFavorite, {
          input: {
            userId:   this.$store.getters.getUserId,
            tweetId:  this.tweetId,
            // この日付スキーマ変更
            favoDate: "2021-01-08"
          }
        })
      )
      console.log(favorite.data.createFavorite);
    },
    async createComment(){
      const comment = await API.graphql(
        graphqlOperation(gqlMutations.createComment,{
          input: {
            userId:   this.$store.getters.getUserId,
            postId:   this.tweetId,
            content:  this.content
          }
        })
      )
      console.log(comment.data.createComment);
      this.dialog = false;
    },
    commentDialogOn(){
      this.dialog = true;
    },
    async deleteTweet(id){
      const deleteTweet = await API.graphql(
        graphqlOperation(
          deleteTweet_query, {
            input: {
              id: id
            }
          },
          
        )
      )
      console.log("投稿を削除しました"+deleteTweet.data.deleteTweet)
      this.$router.push(this.prevRoute);
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.prevRoute = from.path;
    });
  },
  async mounted() {
    if (this.$route.params.items === undefined || this.$route.params.items === null) {
      console.log(this.$route.params);
      const tweet = await API.graphql(
        graphqlOperation(gqlQueries.getTweet, {
          id: this.$route.params
        })
      )
      console.log(tweet);
      this.$route.params = tweet;
    }   

  }
}
</script>