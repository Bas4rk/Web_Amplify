<template>
  <div class="settingservice">
    <Navigation></Navigation>

    <v-container
      class="py-8 px-6"
      fluid
    > 

    <v-layout justify-center>

      <div class="title">利用規約</div>
    </v-layout>

      <v-row justify="center">
        <v-col cols="5">

          <br>
          サービス提供者
          <v-divider></v-divider>
          <br>
          本規約第一条

         
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