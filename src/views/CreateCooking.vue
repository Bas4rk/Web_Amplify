<template>
  <div class="CreateCooking">
    <Navigation></Navigation>

    <!-- v-layout justify-centerで中央に持ってくる -->
    <v-layout justify-center>

      <!-- class="title"で文字の大きさを変えてます、ここ"display-1"でもいいかも -->
      <div class="title">料理投稿画面</div>
{{content}}
{{content.length}}
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
          

          <!-- 投稿ボタン -->
          <v-btn
            class="ma-2"
            color="primary"
            dark
            @click="createCooking"
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
          label="料理の写真を載せる"
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

        <!-- カロリー入力ボタンです、中身はまだない、どうやって入力させる？ -->
        <!-- ここ一旦ボタンやめて数値入力させるようにしました -->
        <v-col cols="12" sm="6" md="3">
          <!-- <v-btn
            class="ma-2"
            color="primary"
            dark
            style="text-transform: none"
          >
          <v-icon
            dark
            left
          >
            mdi-food
          </v-icon>
            ~kcal
          </v-btn> -->
          <v-text-field
            placeholder="カロリー"
            v-model="calorie"
          >
          </v-text-field>
        </v-col>

        <!-- 栄養素入力です -->
        <!-- <v-col cols="12" sm="6" md="3">
          <v-text-field
            placeholder="たんぱく質"
            suffix="g"
          >
          </v-text-field>
          <v-text-field
            placeholder="脂質"
            suffix="g"
          >
          </v-text-field>
          <v-text-field
            placeholder="炭水化物"
            suffix="g"
          >
          </v-text-field>
          <v-text-field
            placeholder="食物繊維総量"
            suffix="g"
          >
          </v-text-field>
        </v-col> -->

      </v-row>

      <!-- 作り方書くところ -->
      <v-row v-for="(item, index) in content"
          :key="index">

        <!-- clearableいらない？ -->
        <v-col cols="12" sm="6" md="3">
          <v-textarea
            label="作り方"
            clearable
            clear-icon="mdi-close-circle"
            v-model="content[index]"
          >
          </v-textarea>
        </v-col>

      </v-row>

      <v-row>

        <!-- 作り方追加 -->
        <v-col cols="12" sm="6" md="3">
          <v-btn
            block
            class="ma-2"
            color="primary"
            dark
            @click="addContent()"
          >
          <v-icon
            dark
            left
          >
            mdi-plus
          </v-icon>
            作り方を追加
          </v-btn>

          <!-- 作り方削除 -->
          <v-btn
            block
            class="ma-2"
            color="primary"
            dark
            @click="deleteContent()"
          >
          <v-icon
            dark
            left
          >
            mdi-minus
          </v-icon>
            作り方を削除
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
            料理記事を投稿しました。
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

// const createCooking_mutation = /* GraphQL */`
// mutation createCooking {
//   createCooking(input: {calorie: 10, content: "tukurikata", userId: "46ca50cb-d45e-4490-b707-d2e2ecb8e0be", title: "taitoru"}) {
//     id
//   }
// }
// `;
export default {
  data() {
    return{
      // 作り方
      content: [[]],
      newContent:null,
      // タイトル
      title: null,
      // カロリー
      calorie: null,
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

    // 投稿作成です、「栄養素」の項目なかったからとりあえず無視してます
    async createCooking(){
      const cooking =await API.graphql(
        //[fix]あとでクエリー書き直す?
          graphqlOperation(gqlMutations.createCooking,{
            input: {userId: this.$store.getters.getUserId,
            title: this.title,
            content: this.content,
            calorie: this.calorie,
            image: `${store.getters.getUserEmail}/Cooking/${this.title}`
            }
          })
      )
      console.log(cooking.data.createCooking);

      await Storage.put(
        `${store.getters.getUserEmail}/Cooking/${this.title}`, // ファイル名
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
    addContent(){
      this.content.push(this.newContent)
      console.log(this.content)
    },
    deleteContent(){
      console.log(this.content)
      if(this.content.length > 1){
        this.content.pop()
      }
    }
  },
}
</script>