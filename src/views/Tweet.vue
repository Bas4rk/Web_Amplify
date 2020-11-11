<template>
  <div class="Tweet">
    <Navigation></Navigation>
    <h1>Tweetページ</h1>
    <!-- {{tweetData}} -->
    <v-row justify="center">
      <v-col cols="5">
        <v-card>
          
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
          <v-divider></v-divider>
          <v-card>
            <v-card-title class="mt-8">
                <v-avatar size="56">
                  <img
                    alt="user"
                    src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
                  >
                </v-avatar>
                <p class="ml-3">
                  {{tweetData.name}}
                </p>
              </v-card-title>
            <!-- <v-card-subtitle class="headline">{{tweetData.description}}</v-card-subtitle> -->
            <v-divider class="mx-3"></v-divider>
            <v-card-text>
              <div class="body-1 mb-1 headline">{{tweetData.description}}</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon color="pink">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon color="green">
                <v-icon>mdi-cached</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <small>{{tweetData.user_id}}</small>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import * as gqlQueries from '../graphql/queries' // read
// import * as gqlMutations from '../graphql/mutations' // create, update, delete
// import * as gqlSubscriptions from '../graphql/subscriptions' // 監視
import Navigation from '@/components/Navigation.vue';

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
  components: {
    Navigation
  },
  data() {
    return {
      tweetId: this.$route.params.id,
      tweetData: 'null'
    };
  },
  methods:{
    back: function(){
      this.$router.push('/');
      // historyできてなくね？
    }
  },
  async mounted() {
    const tweet = await API.graphql(
      graphqlOperation(gqlQueries.getTodo, {
        id: this.$route.params.id
      })
    )
    this.tweetData= tweet.data.getTodo
  }
}
</script>