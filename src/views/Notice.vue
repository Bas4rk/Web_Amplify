<template>
  <div class="home">
    <Navigation></Navigation>
      [通知画面]これから書きます。
      <!-- バックエンド変更対応してないので、コメントアウトしてます。 -->
    

      <!-- <amplify-connect :query="listTodosQuery"
          :subscription="createTodoSubscription"
          :onSubscriptionMsg="onCreateTodo">
        <template slot-scope="{loading, data, errors}">
          <div v-if="loading">Loading...</div>

          <div v-else-if="errors.length > 0"></div>

          <div v-else-if="data">
            <NoticeList :items="data.listTodos.items"></NoticeList>
          </div>
        </template>
      </amplify-connect> -->
  </div>
</template>

<script>
// import { components } from 'aws-amplify-vue';
// import NoticeList from '@/components/NoticeList.vue';
import Navigation from '@/components/Navigation.vue';

// const ListTodosQuery = `query ListTodos {
//     listTodos {
//       items {
//         id
//         name
//         description
//         user_id
//         createdAt
//         updatedAt
//       }
//     }
//   }`;

//   const OnCreateTodoSubscription = `subscription OnCreateTodo {
//       onCreateTodo {
//         id
//         name
//         description
//         user_id
//         createdAt
//         updatedAt
//       }
//     }`;

export default {
  name: 'home',
  components: {
    Navigation,
    // NoticeList,
    // ...components
  },
  computed: {
    // listTodosQuery() {
    //   return this.$Amplify.graphqlOperation(ListTodosQuery);
    // },
    // createTodoSubscription() {
    //   return this.$Amplify.graphqlOperation(OnCreateTodoSubscription);
    // }
  },
  methods: {
    // onCreateTodo(prevData, newData) {
    //   console.log('New todo from subscription...');
    //   const newTodo = newData.onCreateTodo;
    //   prevData.data.listTodos.items.push(newTodo);
    //   return prevData.data;
    // }
  }
}
</script>