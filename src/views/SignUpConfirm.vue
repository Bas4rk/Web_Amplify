<template>
  <div class="confirm">
    <v-container
      class="py-8 px-6"
      fluid
    >
      <v-row justify="center">
        <v-col cols="5">
          <h1>Confirm</h1>
          <v-form v-model="valid" ref="form" lazy-validation>
            <!--<v-text-field v-model="username" :rules="emailRules" label="Email Address" required/>
            <v-text-field
              v-model="password"
              :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[passwordRules.required, passwordRules.min]"
              :type="passwordVisible ? 'text' : 'password'"
              name="password"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="passwordVisible = !passwordVisible"
              required/>

              <v-text-field
              v-model="passwordconfirm"
              :append-icon="passwordconfirmVisible ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[passwordRules.required, passwordRules.min]"
              :type="passwordconfirmVisible ? 'text' : 'password'"
              name="password comfirm"
              label="Password confirm"
              hint="At least 8 characters"
              counter
              @click:append="passwordconfirmVisible = !passwordconfirmVisible"
              required/>-->
            <v-text-field v-model="code" :rules="codeRules" label="Code" required/>
            <!--<v-text-field v-model="nickname" label="ニックネーム" required/>-->
            <br><v-btn :disabled="!valid" @click="submit">Submit</v-btn>
          </v-form>
          <v-btn @click="resend">Resend Code</v-btn>
          <!--<br>We have sent a security code to the email address you entered. 
          Please note that if you do not enter it, the email address you entered will be invalid.
          <div><br>In that case, please contact us from <a href="contactUs">here</a></div>
          -->

          <br>We have sent a security code to the email address you entered. 
          Please note that if you do not enter it, the email address you entered will be invalid.
          In that case, please contact us at the number below.
          <br>TEL:XXXX-YY-ZZZZ
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {confirmSignUp, resendSignUp, signIn} from '@/utils/auth.js'
import store from '../store/index.js'
export default {
  name: "SignUpConfirm",
  data() {
    return {
      valid: false,
      /*username: this.$store.getters.getUserEmail,
      password: this.$store.getters.getUserPassword,
      password2: '',
      passwordVisible: false,*/
      code: '',
      //nickname: ''
    }
  },
  computed: {
    emailRules() {
      return [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    },
    passwordRules() {
      return {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match'),
      }
    },
    codeRules() {
      return [
        v => !!v || 'Code is required',
        v => (v && v.length === 6) || 'Code must be 6 digits'
      ]
    },
  },
  methods: {
    submit() {
      let username = store.getters.getUserEmail
      let password = store.getters.getUserPassword
      let nickname = store.getters.getUserNickname
      //if(this.password === this.password2confirm){
      if (this.$refs.form.validate()) {
        console.log(`CONFIRM email: ${username}, code: ${this.code}`);
        confirmSignUp(username, password, this.code, nickname);
        signIn(username, password);
      }
      //}
    },
    resend() {
      console.log(`RESEND email: ${this.username}`);
      resendSignUp(this.username);
    }
  },
}
</script>