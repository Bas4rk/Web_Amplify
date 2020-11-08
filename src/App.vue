<template>
  <div id="app">
    <v-app>
      <Navigation></Navigation>
      <v-main>
          <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
          </div>
          <router-view/>
      </v-main>

      <v-footer app>

      </v-footer>
    </v-app>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';

export default {
  components: {
    Navigation
  }
}
</script>
