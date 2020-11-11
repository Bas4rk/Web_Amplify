<template>
  <div id="app">
    <v-app>
      <!-- <Navigation></Navigation> -->
      <v-main>
        <router-view/>
      </v-main>
      <v-footer app>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
// import Navigation from '@/components/Navigation.vue';

export default {
  components: {
    // Navigation
  }
}
</script>
