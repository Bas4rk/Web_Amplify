<template>
  <div class="calendar">
    <Navigation></Navigation>
    <h1>設定ページ</h1>
    <v-container
      class="py-8 px-6"
      fluid
    >
      <v-row justify="center">
        <v-col cols="5">
          <v-switch :label="`Dark Theme`" v-model="theme"></v-switch>
          <!-- <div>{{setTheme}}</div> -->
          <v-list>
            <!-- ↓後できれいにする -->
            <v-list-item @click="signOut">
              <v-list-item-icon>
                <v-icon> mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>サインアウト</v-list-item-title>
              </v-list-item-content>
              <!-- <amplify-sign-out /> -->
            </v-list-item>
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
    // computed: {
    //   setTheme() {
    //       if (this.goDark == true) {
    //         this.$vuetify.theme.dark = true
    //           return ("ダークテーマ");
    //       } else {
    //         this.$vuetify.theme.dark = false
    //           return ("ノーマルテーマ");
    //       }
    //   }
    // },
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