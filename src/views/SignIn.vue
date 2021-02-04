<template>
  <div class="sign-in">
    <v-container
      class="py-8 px-6"
      fluid
    >
      <v-row justify="center">
        <v-col cols="5">
          <h1>Sign In</h1>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field v-model="username" :rules="emailRules" label="Email Address" required/>
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
            <v-btn :disabled="!valid" @click="submit">Login</v-btn>
          </v-form>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="5">
          Do you have an account?
          <v-btn  @click="signUp">To registration screen</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {signIn} from '@/utils/auth.js'
export default {
  name: "SignIn",
  data() {
    return {
      valid: false,
      username: '',
      password: '',
      passwordVisible: false,
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
      if (this.$refs.form.validate()) {
        console.log(`SIGN IN email: ${this.username}, password: ${this.password}`);
        signIn(this.username, this.password);
      }
    },
    signUp(){
      this.$router.push('/signUp')
    },
    mounted : async function(){
      console.log("Sign In Page")
    }
  },
}
</script>