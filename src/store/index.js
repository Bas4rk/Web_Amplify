import Vue from 'vue'
import Vuex from 'vuex'

// import { API, graphqlOperation } from 'aws-amplify'
// import * as gqlMutations from '../graphql/mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    CognitoUser: null,
    GraphqlUser: null,
    Wholeposts: null,
    Messages: [],
    Count: 0
  },
  getters: {
    // getUserCognito(state) {
    //   return state.CognitoUser.signInUserSession.idToken.payload.email
    //   // return state.user
    // },
    getUserGraphql(state) {
      // return state.user.signInUserSession.idToken.payload.email
      return state.GraphqlUser
    },
    getMessages(state){
      return state.Messages
    },
    getCount(state) {
      return state.Count
    },
  },
  mutations: {
    // ユーザー情報保存
    // setUserCognito(state, user) {
    //   state.CognitoUser = user
    // },
    setUserGraphql(state, user) {
      state.GraphqlUser = user
    },
    setMessage(state, message) {
      state.Messages.push(message)
    },
    setCount(state, count) {
      state.Count = count
    },

    // async setUserGraphql(state,username,nickname) {
      
    //   const user = await API.graphql(
    //   graphqlOperation(gqlMutations.createUser, {
    //     input: {
    //       name: nickname,
    //       emailAddress: username,
    //       premium: false
    //     }
    //   }))
    //   console.log(user.data.createUser);

    //   state.user = user.data.createUser

    // },

  },
  actions: {
    // setUserGraphql: async function(context,username, nickname){
    //   console.log("入ってます");
    //   const user = await API.graphql(
    //     graphqlOperation(gqlMutations.createUser, {
    //       input: {
    //         name: nickname,
    //         emailAddress: username,
    //         premium: false
    //       }
    //     }))
    //     console.log(user.data.createUser);
      // context.commit('setUser', user.data.createUser)
    // }
  },
  modules: {
  }
})