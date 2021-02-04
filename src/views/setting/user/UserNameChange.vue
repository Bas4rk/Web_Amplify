<template>
  <div class="usernamechange">
    <Navigation></Navigation>

    <v-container
      class="py-8 px-6"
      fluid
    > 
    <v-layout justify-center>

      <div class="title">ユーザ名変更</div>
    </v-layout>

      <v-row justify="center">
        <v-col cols="5">

          <v-list>
            <p>現在</p>
            <p>{{getUserName}}</p>

            新規
            <v-text-field
              v-model="message"
              label="name"
              type="text"
            >
            <template v-slot:append-outer>
              <v-btn color="primary">完了</v-btn>
            </template>
            </v-text-field>
          </v-list>
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
  },
  computed:{
    getUserName(){
      return  this.$store.getters.getUserName
    },
  }
}
</script>