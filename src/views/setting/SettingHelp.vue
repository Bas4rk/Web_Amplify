<template>
  <div class="calendar">
    <Navigation></Navigation>
    <v-container
      class="py-8 px-6"
      fluid
    > 
    <v-layout justify-center>
      <div class="title">お困りの方はこちら</div>
    </v-layout>
      <v-row justify="center">
        <v-col cols="5">
          <v-list>
            <v-expansion-panels>
              <v-expansion-panel
                v-for="(item,i) in 1"
                :key="i"
              >
                <v-expansion-panel-header>
                  スポーツやトレーニング経験がないのですが、続けられるでしょうか？
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  トレー二ングが初めてでも大丈夫です
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

            <v-expansion-panels>
              <v-expansion-panel
                v-for="(item,i) in 1"
                :key="i"
              >
                <v-expansion-panel-header>
                  トレーニングが飽きやすい私に向いていますか？
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  OKです
                  そのような方をお待ちしておりました
                  全くの初心者でも本アプリはお使いいただけます
                  飽きやすい方にも使えるようSNSを搭載しております
                  存分にお使いください
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
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
  }

}
</script>