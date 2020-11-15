import { Auth } from 'aws-amplify'
import { AmplifyEventBus } from 'aws-amplify-vue'
import store from '../store/index.js'

import { API, graphqlOperation } from 'aws-amplify'
import * as gqlQueries from '../graphql/queries'
import * as gqlMutations from '../graphql/mutations'

function getUser() {
  return Auth.currentAuthenticatedUser().then( async (user) => {
    if (user && user.signInUserSession) {
      store.commit('setUserCognito', user)

      if(!store.getters.getUserGraphql){
        const Graphqluser = await API.graphql(
          graphqlOperation(gqlQueries.emailIndex, {
            emailAddress: user.signInUserSession.idToken.payload.email // userテーブルの取得したいデータのID
          })
        )
        console.log(Graphqluser.data.emailIndex);
        // [fix]ここなんか二回呼ばれる。
        console.log("emailIndexクエリー飛ばしてます");
        store.commit('setUserGraphql', Graphqluser.data.emailIndex)
      }

      return user
    } else {
      return null
    }
  }).catch(err => {
    console.log(err);
    store.commit('setUserCognito', null);
    return null;
  });
}

function signUp(email, password) {
  const username = email
  return Auth.signUp({
    username,
    password,
    attributes: {
      email: username,
    },
  })
    .then(data => {
      AmplifyEventBus.$emit('localUser', data.user);
      if (data.userConfirmed === false) {
        AmplifyEventBus.$emit('authState', 'confirmSignUp');
      } else {
        AmplifyEventBus.$emit('authState', 'signIn');
      }
      return data;
    })
    .catch(err => {
      console.log(err);
    });
}

function confirmSignUp(username, code, nickname) {
  return Auth.confirmSignUp(username, code).then(data => {
    AmplifyEventBus.$emit('authState', 'signIn')

    // [fix]ここ最優先
    const user = API.graphql(
      graphqlOperation(gqlMutations.createUser, {
        input: {
          name: nickname,
          emailAddress: username,
          premium: false
        }
      }))
      console.log(user.data.createUser);
      store.commit('setUser', user.data.createUser)

      // store.commit('setUserGraphql',username,nickname)
    
    // store.dispatch('setUserGraphql',username,nickname)
    
    return data // 'SUCCESS'
  })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

function resendSignUp(username) {
  return Auth.resendSignUp(username).then(() => {
    return 'SUCCESS';
  }).catch(err => {
    console.log(err);
    return err;
  });
}

async function signIn(username, password) {
  try {
    const user = await Auth.signIn(username, password);
    if (user) {
      AmplifyEventBus.$emit('authState', 'signedIn');
    }
  } catch (err) {
    if (err.code === 'UserNotConfirmedException') {
      // The error happens if the user didn't finish the confirmation step when signing up
      // In this case you need to resend the code and confirm the user
      // About how to resend the code and confirm the user, please check the signUp part
    } else if (err.code === 'PasswordResetRequiredException') {
      // The error happens when the password is reset in the Cognito console
      // In this case you need to call forgotPassword to reset the password
      // Please check the Forgot Password part.
    } else if (err.code === 'NotAuthorizedException') {
      // The error happens when the incorrect password is provided
    } else if (err.code === 'UserNotFoundException') {
      // The error happens when the supplied email/email does not exist in the Cognito user pool
    } else {
      console.log(err);
    }
  }
}

function signOut() {
  return Auth.signOut()
    .then(data => {
      AmplifyEventBus.$emit('authState', 'signedOut');

      store.commit('setUserGraphql', null);
      store.commit('setWholeposts', null)

      return data;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
}

export {getUser, signUp, confirmSignUp, resendSignUp, signIn, signOut};