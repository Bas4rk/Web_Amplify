<template>
  <div class="calendar">
    <h1>設定ページ</h1>
    <v-switch :label="`Dark Theme`" v-model="theme"></v-switch>
    <!-- <div>{{setTheme}}</div> -->

  </div>
</template>

<script>
export default {
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
    watch: {
    theme() {
      this.$vuetify.theme.dark = this.theme
    }
  }
}
</script>