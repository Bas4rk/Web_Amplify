<template>
  <div class="settingpremium">
    <Navigation></Navigation>

    <!-- fluidで左右いっぱいにコンテナを広げる、らしい、py-8 px-6は余白の設定（公式見たらある） -->
    <v-container
      class="py-8 px-6"
      fluid
    > 

    <!-- v-layout justify-centerで中央に持ってくる -->
    <v-layout justify-center>

      <!-- class="title"で文字の大きさを変えてます、ここ"display-1"でもいいかも -->
      <div class="display-1">PREMIUM</div>

    </v-layout>

    <!-- v-rowにjustify="center"すると左右中央、上下中央はalign-content="center" -->
      <v-row justify="center">
            <v-col cols="4"><br>
            <p>プレミアムプラン特典です</p>
            <p>すべての機能が使用可能になります</p>
            </v-col>
      </v-row>
      <v-row justify="center">
        <!-- v-colはv-rowの子である、cols="5"はグリッドが～とかで、cols2つ並べて割合で表示させられる
        cols="8"とcols="4"で8対4で表示とか（2対1）最大は12 -->
        
        <v-col cols="5">
          <!-- リストです -->
          <v-list>
            <!-- ↓後できれいにする -->
            <!-- v-btn、ボタンです、blockは横幅最大に表示するやつです、<br>はいい感じの空白が欲しくてつけました -->
            <!-- 横線です -->
            <v-divider></v-divider>
            <br><div class="indigo--text">今後実装予定です</div><br>
            
            <!-- <v-col><v-btn color="accent" block>PREMIUMに登録する(月額￥280)</v-btn><br></v-col> -->

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