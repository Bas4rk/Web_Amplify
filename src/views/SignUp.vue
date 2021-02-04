<template>
  <div class="sign-up">
    <v-container
      class="py-8 px-6"
      fluid
    >
      <v-row justify="center">
        <v-col cols="5">
          <h1>Sign Up</h1>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field v-model="email" :rules="emailRules" label="Email Address" required/>
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
            name="password confirm"
            label="Password confirm"
            hint="At least 8 characters"
            counter
            @click:append="passwordconfirmVisible = !passwordconfirmVisible"
            required/>
            
            <v-text-field v-model="nickname" label="Nickname" required/>
            
            <v-btn :disabled="!valid" @click="submit">next</v-btn>
          </v-form>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="5">
        Do you have an account?
          <v-btn  @click="signIn">To login screen</v-btn>
            <!--<br>※If you do not enter the code on the next page, this email address will be invalid.
            please note.
            <div>In that case, please contact us from <a @click="contactus">here</a>.</div>-->
            <br>If you do not enter the code on the next page, the email address you entered will be invalid.
            In that case, please contact us.
            <br>phone number:XXXX-YY=ZZZZ
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {signUp} from '@/utils/auth.js'
import store from '../store/index.js'
export default {
  name: "SignUp",
  data() {
    return {
      valid: false,
      email: '',
      password: '',
      passwordconfirm: '',
      passwordVisible: false,
      passwordconfirmVisible: false,
      nickname: ''
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
  },
  methods: {
    submit() {
      if(this.password === this.passwordconfirm){
        if (this.$refs.form.validate()) {
          console.log(`SIGN UP email: ${this.email}, password: ${this.password}, email: ${this.email}`);
          store.commit('setUserEmail',this.email)
          store.commit('setUserPassword',this.password)
          store.commit('setUserNickname',this.nickname)
          signUp(this.email, this.password);
        }
      }
    },
    signIn(){
      this.$router.push('/signIn')
    },
    // contactus(){
    //   this.$router.push('/contactUs')
    // }
  },
}
</script>