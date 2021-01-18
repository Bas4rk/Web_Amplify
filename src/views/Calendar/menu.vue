<template>
  <div class="calendar">
    <Navigation></Navigation>
    <v-container
      class="py-8 px-6"
      fluid
    > 
    <v-layout justify-center>
      <div class="title">トレーニング内容</div>
    </v-layout>
      <v-row justify="center">
        <v-col cols="5">
          <v-list>
            <v-row align-content="space-between">
              <v-col cols="12" xs="12" sm="12" md="12" align="center">
                <div class="display-1">ベンチプレス:10回</div>
              </v-col>
              <v-col cols="12" xs="12" sm="12" md="12" align="center">
                <div class="display-1">ベンチプレス:5回</div>
              </v-col>
            </v-row>
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
  computed: {
    getUserEmail(){
      return  this.$store.getters.getUserEmail
    }
  },
}
</script>

