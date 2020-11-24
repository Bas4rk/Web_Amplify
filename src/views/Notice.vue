<template>
  <div class="home">
    <Navigation></Navigation>
      [通知画面]これから書きます。
      <!-- バックエンド変更対応してないので、コメントアウトしてます。 -->
      {{relation}}

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

import { API, graphqlOperation } from 'aws-amplify'


const onCreateRelationship = /* GraphQL */ `
  subscription OnCreateRelationship {
    onCreateRelationship {
      id
      blockBool
      followee {
        id
        name
        emailAddress
      }
      follower {
        id
        name
        emailAddress
      }
      createdAt
      updatedAt
    }
  }
`;


const onDeleteRelationship = /* GraphQL */ `
  subscription OnDeleteRelationship {
    onDeleteRelationship {
      id
    }
  }
`;

export default {
  name: 'home',
  data(){
    return{
      createSubscription: {},
      deleteSubscription: {},
      relation: []
    }
  },
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
    subscribe(){
      // TODO(3-1) GraphQLエンドポイントにsubscriptionを発行し、mutationを監視する
      this.createSubscription = API.graphql(graphqlOperation(onCreateRelationship)).subscribe({
        next: (eventData) => {
          console.log("入った")
          console.log(eventData.value.data.onCreateRelationship)
          this.relation = eventData.value.data.onCreateRelationship;
          // this.messages++
          // this.wholeposts.push(tweet);
        }
      })

      this.deleteSubscription = API.graphql(graphqlOperation(onDeleteRelationship)).subscribe({
        next: (eventData) => {
          // const cooking = eventData.value.data.onDeleteRelationship;
          console.log(eventData.value.data.onDeleteRelationship)
          
        }
      })
    }
  },
  mounted(){
    this.subscribe()
  }
}
</script>