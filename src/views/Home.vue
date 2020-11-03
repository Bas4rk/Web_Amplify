<template>
  <div class="home">
      <amplify-connect :query="listTodosQuery"
          :subscription="createTodoSubscription"
          :onSubscriptionMsg="onCreateTodo">
        <template slot-scope="{loading, data, errors}">
          <div v-if="loading">Loading...</div>

          <div v-else-if="errors.length > 0"></div>

          <div v-else-if="data">
            <!-- <TodoList :items="data.listTodos.items"></TodoList> -->
            <List :items="data.listTodos.items"></List>
          </div>
        </template>
      </amplify-connect>
  </div>
</template>

<script>
import { components } from 'aws-amplify-vue';
//import TodoList from '@/components/TodoList.vue';
//import NewTodo from '@/components/NewTodo.vue';
import List from '@/components/List.vue';

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
    List,
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