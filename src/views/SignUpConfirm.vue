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
            <div>{{getUserEmail}}</div>
            <div>{{getUserPassword}}</div>
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
            <v-text-field v-model="code" :rules="codeRules" label="Code" required/>
            <v-text-field v-model="nickname" label="ニックネーム" required/>
            <v-btn :disabled="!valid" @click="submit">Submit</v-btn>
          </v-form>
          <v-btn @click="resend">Resend Code</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {confirmSignUp, resendSignUp, signIn} from '@/utils/auth.js'
export default {
  name: "SignUpConfirm",
  data() {
    return {
      valid: false,
      username: '',
      password: '',
      passwordVisible: false,
      code: '',
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
    codeRules() {
      return [
        v => !!v || 'Code is required',
        v => (v && v.length === 6) || 'Code must be 6 digits'
      ]
    },
    getUserEmail(){
      return  this.$store.getters.getUserEmail
    },
    getUserPassword(){
      return  this.$store.getters.getUserPassword
    },
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        console.log(`CONFIRM email: ${this.username}, code: ${this.code}`);
        confirmSignUp(this.username, this.password, this.code, this.nickname);
        signIn(this.username, this.password);
      }
    },
    resend() {
      console.log(`RESEND email: ${this.username}`);
      resendSignUp(this.username);
    }
  },
}
</script>