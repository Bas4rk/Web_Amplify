import { Auth } from 'aws-amplify'
import { AmplifyEventBus } from 'aws-amplify-vue'
import store from '../store/index.js'

import { API, graphqlOperation } from 'aws-amplify'
import * as gqlQueries from '../graphql/queries'
import * as gqlMutations from '../graphql/mutations'

function getUser() {
  return Auth.currentAuthenticatedUser().then( async (user) => {
    if (user && user.signInUserSession) {
      // store.commit('setUserCognito', user)
      // console.log("なんかはいってるか"+store.getters.getUserGraphql)

      if(!store.getters.getUserGraphql){
        const Graphqluser = await API.graphql(
          graphqlOperation(gqlQueries.emailIndex, {
            emailAddress: user.signInUserSession.idToken.payload.email // cognitoでとったuserのemailを使ってクエリー飛ばしてる。
          })
        )
        // console.log("Graphqluser.data.emailIndexの長さ"+Graphqluser.data.emailIndex.items.length);

        if(Graphqluser.data.emailIndex.items.length > 0){
          store.commit('setUserName', Graphqluser.data.emailIndex.items[0].name)
          store.commit('setUserEmail', Graphqluser.data.emailIndex.items[0].emailAddress)
          store.commit('setUserId', Graphqluser.data.emailIndex.items[0].id)
          // console.log("getuser入った")
        }else if(Graphqluser.data.emailIndex.items.length == 0){
          console.log("新規作成する")
        }
        // [fix1]ここなんか二回呼ばれる。
        // console.log("emailIndexクエリー飛ばしてます");
        // store.commit('setUserGraphql', Graphqluser.data.emailIndex)
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

//パスワード入力欄を削除したい
function signUp(email/*, password*/) {
  const username = email
  return Auth.signUp({
    username,
    //password,
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

function confirmSignUp(username, password, code, nickname) {
  return Auth.confirmSignUp(username, code).then(async data => {
    AmplifyEventBus.$emit('authState', 'signIn')


    //cognitoSignInしないとcreateUser飛ばすときのownerがnullでエラーになる。
    // const user = await getUser()
    const user = await Auth.signIn(username, password);
    console.log("userは"+user)
    if(user){
      const mutation = API.graphql(
        graphqlOperation(gqlMutations.createUser, {
          input: {
            name: nickname,
            emailAddress: username,
            premium: false
          }
        })
      )
      console.log("mutation.data.createUserは"+mutation.data.createUser);
    }else{
      console.log("だめでした。")
    }

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

      store.commit('setUserName', null);
      store.commit('setUserEmail', null);
      store.commit('setUserId', null);
      // store.commit('setMessage', null);
      // store.commit('setCount', null);

      return data;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
}

export {getUser, signUp, confirmSignUp, resendSignUp, signIn, signOut};