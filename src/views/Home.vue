<template>
  <div class="home">
      <amplify-connect :query="listTodosQuery"
          :subscription="createTodoSubscription"
          :onSubscriptionMsg="onCreateTodo">
        <template slot-scope="{loading, data, errors}">
          <div v-if="loading">Loading...</div>

          <div v-else-if="errors.length > 0"></div>

          <div v-else-if="data">
            <TweetList :items="data.listTodos.items"></TweetList>
          </div>
        </template>
      </amplify-connect>
  </div>
</template>

<script>
import { components } from 'aws-amplify-vue';
import TweetList from '@/components/TweetList.vue';

const ListTodosQuery = `query ListTodos {
    listTodos {
      items {
        id
        name
        description
        user_id
        createdAt
        updatedAt
      }
    }
  }`;

  const OnCreateTodoSubscription = `subscription OnCreateTodo {
      onCreateTodo {
        id
        name
        description
        user_id
        createdAt
        updatedAt
      }
    }`;

export default {
  name: 'home',
  components: {
    TweetList,
    ...components
  },
  computed: {
    listTodosQuery() {
      return this.$Amplify.graphqlOperation(ListTodosQuery);
    },
    createTodoSubscription() {
      return this.$Amplify.graphqlOperation(OnCreateTodoSubscription);
    }
  },
  methods: {
    onCreateTodo(prevData, newData) {
      console.log('New todo from subscription...');
      const newTodo = newData.onCreateTodo;
      prevData.data.listTodos.items.push(newTodo);
      return prevData.data;
    }
  }
}
</script>