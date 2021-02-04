<template>
  <div class="settingpersonal">
    <Navigation></Navigation>
    <v-container
      class="py-8 px-6"
      fluid
    > 
    <v-layout justify-center>
      <div class="title">個人情報に関するお問い合わせはこちら</div>
    </v-layout>
      <v-row justify="center">

        <v-col cols="5">
          <br>
          <v-text-field
            label="email"
            outlined
          ></v-text-field>
          <v-text-field
            label="name"
            outlined
          ></v-text-field>
          <v-textarea
            outlined
            name="input-7-4"
            label="contents"
          ></v-textarea>

          <v-btn color="primary">送信</v-btn>

            
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import {signOut} from '@/utils/auth.js'

export default {
  components: {
    Navigation
  },
  data() {
    return {
      theme: false
    };
  },
  methods: {
    signOut() {
      signOut().then((data) => console.log('DONE', data)).catch((err) => console.log('SIGN OUT ERR', err));
    }
  },
  watch: {
    theme() {
      this.$vuetify.theme.dark = this.theme
    }
  }
}
</script>