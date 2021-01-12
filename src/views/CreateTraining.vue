<template>
  <div class="CreateTraining">
    <Navigation></Navigation>

    <!-- v-layout justify-centerで中央に持ってくる -->
    <v-layout justify-center>

      <!-- class="title"で文字の大きさを変えてます、ここ"display-1"でもいいかも -->
      <div class="title">筋トレ投稿画面</div>

    </v-layout>

    <!-- 横線です -->
    <v-divider></v-divider>

    <v-container>

      <v-row>

        <!-- 戻るボタンです -->
        <v-col cols="12" sm="6" md="3" justify="left">
          <v-btn
            class="ma-2"
            color="primary"
            dark
            @click="back"
          >
          <v-icon
            dark
            left
          >
            mdi-arrow-left
          </v-icon>Back</v-btn>
        </v-col>

        <!-- これ下書きボタンの位置調整用に書いた -->
        <v-col cols="12" sm="6" md="3" justify="center">
        </v-col>

        <!-- 下書きボタンです、中身はまだない -->
        <v-col cols="12" sm="6" md="3" justify="right">
          <v-btn
            class="ma-2"
            color="primary"
            dark
          >
            下書き
          </v-btn>

          <!-- 投稿ボタン -->
          <v-btn
            class="ma-2"
            color="primary"
            dark
            @click="createTraining"
          >
            投稿
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-img
          v-if="uploadImageUrl"
          :src="uploadImageUrl"
          max-width="600"
          max-height="600">
        </v-img>
      </v-row>

      <v-row>
        <v-col cols="5">
        <v-file-input
          accept="image/*"
          label="筋トレの写真を載せる"
          @change="onImgPicked"
        ></v-file-input>
        </v-col>
      </v-row>
      <!-- {{this.uploadImageUrl}}
      {{this.image}} -->

      <v-row>
        <!-- タイトル入力 -->
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            placeholder="タイトル"
            v-model="title"
          >
          </v-text-field>
        </v-col>

        <!--タグ入力です、Prottにあったから作った、でもDynamoDBに？タグの項目ない -->
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            placeholder="#タグ（必須でない）"
          >
          </v-text-field>
        </v-col>

      </v-row>

      <!-- 作り方書くところ -->
      <v-row>

        <!-- clearableいらない？ -->
        <v-col cols="12" sm="6" md="3">
          <v-textarea
            label="メニュー"
            placeholder="1.これを３０秒行う。"
            clearable
            clear-icon="mdi-close-circle"
            v-model="content"
          >
          </v-textarea>
        </v-col>

        <!-- 写真投稿ボタンです、中身はまだない -->
        <v-col cols="12" sm="6" md="3" justify="left">
          <v-btn
            class="ma-2"
            color="primary"
            dark
          >
          <v-icon
            dark
            left
          >
            mdi-camera
          </v-icon>
            写真を載せる
          </v-btn>
        </v-col>

      </v-row>

      <v-row>

        <!-- メニュー追加 -->
        <v-col cols="12" sm="6" md="3">
          <v-btn
            block
            class="ma-2"
            color="primary"
            dark
          >
          <v-icon
            dark
            left
          >
            mdi-plus
          </v-icon>
          メニューを追加
          </v-btn>
        </v-col>

      </v-row>

    <!-- いい感じのデザインに変える -->
      <v-row justify="center">
      <v-dialog
        v-model="dialog"
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">投稿完了</v-card-title>

          <v-card-text>
            筋トレ記事を投稿しました。
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    </v-container>
  </div>
</template>


<script>
import Navigation from '@/components/Navigation.vue';
import { API, graphqlOperation } from 'aws-amplify'
import * as gqlMutations from '../graphql/mutations'
import store from '../store/index.js'
import {Storage} from 'aws-amplify'

export default {
  data() {
    return{
      // メニュー
      content: null,
      // タイトル
      title: null,
      dialog: false,
      uploadImageUrl: '',
      image: null,
    }
  },
  components: {
    Navigation,
  },
  computed: {

  },
  methods: {
    // 戻るボタンメソッドです
    back: function(){
      this.$router.push('/');
      // historyできてなくね？
    },

    // 投稿作成です、「タグ」の項目なかったからとりあえず無視してます
    async createTraining(){
      const training = await API.graphql(
        //[fix]あとでクエリー書き直す?
          graphqlOperation(gqlMutations.createTraining,{
            input: {userId: this.$store.getters.getUserId,
            title: this.title,
            content: this.content,
            image: `${store.getters.getUserEmail}/Training/${this.title}`
            }
          })
      )
      console.log(training.data.createTraining);

      await Storage.put(
        `${store.getters.getUserEmail}/Training/${this.title}`, // ファイル名
        this.image // アップロードするファイル
      )
      .then (result => console.log(result)) // {key: "test.txt"}
      .catch(err => console.log(err));
      // createTweetにそのまま書いてるけど、thenとかerrorで投稿成功、投稿失敗とか分けた方がいいと思った。
      this.dialog = true;
    },
    onImgPicked(file) {
      if (file !== undefined && file !== null) {
        if (file.name.lastIndexOf('.') <= 0) {
          return
        }
        var blob = new Blob([file], {type: "image/png"});
        this.image = blob
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.addEventListener('load', () => {
          this.uploadImageUrl = fr.result
        })
      } else {
        this.uploadImageUrl = ''
      }
    },
  },
}
</script>