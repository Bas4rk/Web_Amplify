<template>
  <div>
    <amplify-connect :mutation="createTodoMutation" @done="onCreateFinished">
      <template slot-scope="{ loading, mutate, }">
        <input v-model="name" placeholder="item name" />
        <input v-model="description" placeholder="item description" />
        <button :disabled="loading" @click="mutate">Create Todo</button>
        <div>{{ getUserEmail }}</div>
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
        { name: this.name, description: this.description, user_id:  this.$store.getters.getUserEmail});
    },
    getUserEmail (){
      return  this.$store.getters.getUserEmail
    }
  },
  methods: {
    onCreateFinished () {
      console.log('Todo created!');
    }
  }
}
</script>