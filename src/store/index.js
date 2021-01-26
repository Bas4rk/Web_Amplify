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
    UserAvatar: null,
    Wholeposts: null,
    Messages: [],
    Count: 0,
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
    //ユーザパスワードストア(保持用)
    getUserPassword(state) {
      return state.UserPassword
    },
    getUserId(state) {
      // return state.user.signInUserSession.idToken.payload.email
      return state.UserId
    },
    getUserAvatar(state) {
      // return state.user.signInUserSession.idToken.payload.email
      return state.UserAvatar
    },
    getMessages(state){
      return state.Messages
    },
    getCount(state) {
      return state.Count
    },
  },
  mutations: {
    setUserName(state, name) {
      state.UserName = name
    },
    setUserEmail(state, email) {
      state.UserEmail = email
    },
    setUserPassword(state, password) {
      state.UserPassword = password
    },
    setUserId(state, id) {
      state.UserId = id
    },
    setUserAvatar(state, avatar) {
      state.UserAvatar = avatar
    },
    setMessage(state, message) {
      state.Messages.push(message)
    },
    setCount(state, count) {
      state.Count = count
    },
  },
  actions: {
  },
  modules: {
  }
})