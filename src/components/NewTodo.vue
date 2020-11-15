<template>
  <div>
    <amplify-connect :mutation="createTodoMutation" @done="onCreateFinished">
      <template slot-scope="{ loading, mutate, }">
        <!-- <input v-model="name" placeholder="item name" />
        <input v-model="description" placeholder="item description" /> -->
        <!-- <button :disabled="loading" @click="mutate">Create Todo</button> -->
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      label="name"
                      placeholder="タイトル"
                      v-model="name"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="description"
                      placeholder="説明"
                      v-model="description"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-btn :disabled="loading" @click="mutate" large color="primary">投稿</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>

      </template>
    </amplify-connect>
  </div>
</template>

<script>
import { components } from 'aws-amplify-vue';

const CreateTodoMutation = `mutation CreateTodo($name: String!, $description: String, $user_id: String!) {
    createTodo(input: { name: $name, description: $description, user_id: $user_id }) {
      id
      name
      description
      user_id
      createdAt
      updatedAt
    }
  }`;

export default {
  name: 'NewTodo',
  components: {
    ...components
  },
  data () {
    return {
      name: '',
      description: ''
    }
  },
  computed: {
    createTodoMutation () {
      return this.$Amplify.graphqlOperation(CreateTodoMutation,
        { name: this.name, description: this.description, user_id:  "this.$store.getters.getUserEmail"});
    },
    getUserEmail (){
      return  "this.$store.getters.getUserEmail"
    }
  },
  methods: {
    onCreateFinished () {
      console.log('Todo created!');
    }
  }
}
</script>