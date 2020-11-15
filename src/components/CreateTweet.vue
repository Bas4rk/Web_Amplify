<template>
  <div>
   
    <template>
      <!-- <input v-model="name" placeholder="item name" />
      <input v-model="description" placeholder="item description" /> -->
      <!-- <button :disabled="loading" @click="mutate">Create Todo</button> -->
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="content"
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
                <v-col>
                  <v-btn @click="createTweet" large color="primary">投稿</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>

    </template>
   
  </div>
</template>

<script>
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
      content: ''
    }
  },
  computed: {
  },
  methods: {
    async createTweet(){
      const tweet = await API.graphql(
        graphqlOperation(gqlMutations.createTweet, {
          input: {
            content: this.content,
            userId: this.$store.getters.getUserGraphql.items[0].id
          }
        })
      )
      console.log(tweet.data.createTweet);
    }
  }
}
</script>