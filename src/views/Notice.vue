<template>
  <div class="home">
    <Navigation></Navigation>
      <NoticeList :items="getMessages"></NoticeList>

      <!-- {{getMessages}} -->
    {{getCurrentUser}}
  </div>
</template>

<script>
import NoticeList from '@/components/NoticeList.vue';
import Navigation from '@/components/Navigation.vue';

import { API, graphqlOperation } from 'aws-amplify'
import store from '../store/index.js'


const onCreateRelationship = /* GraphQL */ `
  subscription OnCreateRelationship($followerId: ID!) {
    onCreateRelationship(followerId: $followerId) {
      id
      blockBool
      followerId
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

// const followJude_query=/* GraphQL */ `
//   query FolloweeIndex(
//     $followeeId: ID 
//     $filter: ModelRelationshipFilterInput
//   ) {
//   followeeIndex(
//     followeeId: $followeeId 
//     filter: $filter
//   ) {
//     items{
//       id
//     }
//   }
// }
// `

export default {
  name: 'home',
  data(){
    return{
      createSubscription: {},
      deleteSubscription: {},
      messages: null,
      // judgment: null,
    }
  },
  components: {
    Navigation,
    NoticeList,
    // ...components
  },
  computed: {
    getMessages(){
      return this.$store.getters.getMessages
    },
    getCurrentUser(){
      return this.$store.getters.getUserGraphql.items[0].id
    },
  },
  methods: {
    subscribe(){
      // TODO(3-1) GraphQLエンドポイントにsubscriptionを発行し、mutationを監視する
      // this.createSubscription = API.graphql(graphqlOperation(onCreateRelationship,{followerId: 'd1ec7583-511c-4980-95e4-5bb25eac5a6b'})).subscribe({
        this.createSubscription = API.graphql(graphqlOperation(onCreateRelationship,{followerId: this.$store.getters.getUserGraphql.items[0].id})).subscribe({
        next: (eventData) => {
          console.log("クリエイト入った")
          console.log(eventData.value.data.onCreateRelationship)
          // console.log("evenData:"+eventData)
          // this.relation = eventData
          this.$store.commit('setMessage', eventData.value.data.onCreateRelationship)
          this.$store.commit('setCount', this.$store.getters.getCount+1)
          this.createSubscription.unsubscribe();
          // followJude()

          // this.messages++
          // this.wholeposts.push(tweet);
        }
      })

      this.deleteSubscription = API.graphql(graphqlOperation(onDeleteRelationship)).subscribe({
        next: (eventData) => {
          // const cooking = eventData.value.data.onDeleteRelationship;
          console.log("デリーと入った")
          console.log(eventData.value.data.onDeleteRelationship)
          this.deleteSubscription.unsubscribe();

          
        }
      })
    },

    // 一人一人やったらクエリーやばいから、他の方法考える
    // async followJude(){
    //   const followJudg = await API.graphql(
    //     graphqlOperation(followJude_query, {
    //       filter: {followerId: {eq: this.user.items[0].id}},
    //       followeeId: this.currentuser
    //     })
    //   )
    //   console.log(followJudg.data.followeeIndex);
    //   this.judgment = followJudg.data.followeeIndex
    // }
  },
  beforeRouteEnter (to, from, next) { 
      console.log('component: beforeRouteEnter');
      store.commit('setCount', 0)
      next();
  },
  mounted(){
    this.subscribe()
  }
}
</script>