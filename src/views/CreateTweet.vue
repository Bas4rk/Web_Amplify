<template>
  <div>
    <Navigation></Navigation>
   
    <template>
      <!-- <input v-model="name" placeholder="item name" />
      <input v-model="description" placeholder="item description" /> -->
      <!-- <button :disabled="loading" @click="mutate">Create Todo</button> -->
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
                <!-- <v-col>
                  <v-text-field
                    label="description"
                    placeholder="説明"
                    v-model="description"
                  ></v-text-field>
                </v-col> -->
          </v-row>
        </v-container>
      </v-form>
    </template>

    <!-- いい感じのデザインに変える -->
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">投稿完了</v-card-title>
  
          <v-card-text>
            ツイートを投稿しました。
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import { API, graphqlOperation } from 'aws-amplify'
import * as gqlMutations from '../graphql/mutations'
// const CreateTodoMutation = `mutation CreateTodo($name: String!, $description: String, $user_id: String!) {
//     createTodo(input: { name: $name, description: $description, user_id: $user_id }) {
//       id
//       name
//       description
//       user_id
//       createdAt
//       updatedAt
//     }
//   }`;
export default {
  data () {
    return {
      content: '',
      dialog: false
    }
  },
  components: {
    Navigation,
  },
  computed: {
  },
  methods: {
    // 戻るボタンメソッドです
    back: function(){
      this.$router.push('/');
      // historyできてなくね？
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
      this.dialog = true;
    }
  }
}
</script>