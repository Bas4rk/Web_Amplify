<template>
  <div class="home">
    <Navigation></Navigation>
      <NoticeList :items="getMessages"></NoticeList>
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



export default {
  name: 'home',
  data(){
    return{
      createSubscription: null,
      messages: null,
    }
  },
  components: {
    Navigation,
    NoticeList,
  },
  computed: {
    getMessages(){
      return this.$store.getters.getMessages
    },
    getUserId(){
      return this.$store.getters.getUserId
    }
  },
  methods: {
    subscribe(){
        this.createSubscription = API.graphql(graphqlOperation(onCreateRelationship,{followerId: this.$store.getters.getUserId})).subscribe({
        next: (eventData) => {
          console.log("create")
          console.log(eventData.value.data.onCreateRelationship)
          this.$store.commit('setMessage', eventData.value.data.onCreateRelationship)
          this.$store.commit('setCount', this.$store.getters.getCount+1)
        }
      })
    },
  },
  beforeRouteEnter (to, from, next) {
      console.log('component: beforeRouteEnter');
      store.commit('setCount', 0)
      next();
  },
  beforeRouteLeave (to, from, next) {
    console.log('component: beforeRouteLeave');
    store.commit('setCount', 0)
    this.createSubscription.unsubscribe();
    next();
  },
  mounted(){
    this.subscribe()
  }
}
</script>