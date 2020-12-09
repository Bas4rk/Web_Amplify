import Vue from 'vue'
import Vuex from 'vuex'

// import { API, graphqlOperation } from 'aws-amplify'
// import * as gqlMutations from '../graphql/mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UserName: null,
    UserEmail: null,
    UserId: null,
    Wholeposts: null,
  },
  getters: {
    getUserName(state) {
      // return state.user.signInUserSession.idToken.payload.email
      return state.UserName
    },
    getUserEmail(state) {
      // return state.user.signInUserSession.idToken.payload.email
      return state.UserEmail
    },
    getUserId(state) {
      // return state.user.signInUserSession.idToken.payload.email
      return state.UserId
    },
  },
  mutations: {
    setUserName(state, name) {
      state.UserName = name
    },
    setUserEmail(state, email) {
      state.UserEmail = email
    },
    setUserId(state, id) {
      state.UserId = id
    },
  },
  actions: {
  },
  modules: {
  }
})