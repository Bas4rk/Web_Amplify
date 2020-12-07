<template>
  <div class="calendar">
    <Navigation></Navigation>

    <!-- fluidで左右いっぱいにコンテナを広げる、らしい、py-8 px-6は余白の設定（公式見たらある） -->
    <v-container
      class="py-8 px-6"
      fluid
    > 

    <!-- v-layout justify-centerで中央に持ってくる -->
    <v-layout justify-center>

      <!-- class="title"で文字の大きさを変えてます、ここ"display-1"でもいいかも -->
      <div class="title">通知の設定</div>
    </v-layout>

    <!-- v-rowにjustify="center"すると左右中央、上下中央はalign-content="center" -->
      <v-row justify="center">

        <!-- v-colはv-rowの子である、cols="5"はグリッドが～とかで、cols2つ並べて割合で表示させられる
        cols="8"とcols="4"で8対4で表示とか（2対1）最大は12 -->

        <v-col cols="3">
          <v-list>
            <br><br><p>通知</p>
            <br><p>いいね</p>
            <br><p>コメント</p>
            <br><p>新着フォロワー</p>
            <br><p>ダイレクトメッセージ</p>
          </v-list>
        </v-col>

        <v-col cols="1">
          <br><v-switch label="Switch"></v-switch>
          <v-switch></v-switch>
          <v-switch></v-switch>
          <v-switch></v-switch>
          <v-switch></v-switch>
        
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