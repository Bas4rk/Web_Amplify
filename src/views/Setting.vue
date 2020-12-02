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
      <div class="title">設定・その他</div>
    </v-layout>

    <!-- v-rowにjustify="center"すると左右中央、上下中央はalign-content="center" -->
      <v-row justify="center">

        <!-- v-colはv-rowの子である、cols="5"はグリッドが～とかで、cols2つ並べて割合で表示させられる
        cols="8"とcols="4"で8対4で表示とか（2対1）最大は12 -->
        <v-col cols="5">

          <!-- リストです -->
          <v-list>
            <!-- ↓後できれいにする -->
            <!-- v-btn、ボタンです、blockは横幅最大に表示するやつです、<br>はいい感じの空白が欲しくてつけました -->
            <!-- 遷移はまだない -->
            <v-btn block to="/setting-premium">プレミアムサービスを登録する</v-btn><br>
            <v-btn block>アカウント管理</v-btn><br>
            <v-btn block>通知の設定</v-btn><br>
            <v-btn block>お困りの方はこちら</v-btn><br>
            <v-btn block>個人情報に関するお問い合わせ</v-btn><br>
            <v-btn block>お問い合わせ履歴</v-btn><br>
            <v-btn block  to='/Terms'>利用規約</v-btn><br>

            <!-- 横線です -->
            <v-divider></v-divider>

            <!-- スイッチボタン -->
            <v-switch :label="`Dark Theme`" v-model="theme" ></v-switch>
            <!-- <div>{{setTheme}}</div> -->

            <!-- サインアウトボタン -->
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