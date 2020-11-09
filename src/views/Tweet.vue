<template>
  <div class="Tweet">
    <h1>Tweetページ</h1>
    {{ $route.params.id }}
    {{tweetData}}
  </div>
</template>

<script>

const GetTodoQuery = `query GetTodo($id: ID!) {
  getTodo(id: $id) {
    name
    description
    createdAt
    updatedAt
    user_id
  }
}
`;

export default {
    data() {
      return {
        tweetId: '05a66311-6dc8-4198-a1bb-2e10c4d1aef9',
        tweetData: null
      };
    },
    methods: {
      window:onload = async function() {  

        // this.tweetId=$route.params.id

        const tweet = this.$Amplify.graphqlOperation(GetTodoQuery, {id : '05a66311-6dc8-4198-a1bb-2e10c4d1aef9'})
        
        this.tweetData = tweet.data.getTodo // ユーザーのDB情報
      },
    }
}
</script>