<template>
  <div class="FolloweeList">
    <Navigation></Navigation>
    <v-container
      class="py-8 px-6"
      fluid
    >
    <!-- <div>
      プロフィールへんしうがめｎ
    </div> -->
    <v-row>
      <v-col>
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
          </v-icon>Back
        </v-btn>
      </v-col>

      <!-- 保存ボタン、名前が変更されたら出てくる -->
      <transition name="button">
        <v-btn
          v-show="buttonActive"
          class="ma-2"
          color="primary"
          dark
          @click="save"
        >
          保存
        </v-btn>
      </transition>
    </v-row>
      
      <!-- アカウントアイコン -->
      <v-row justify="center">
        <v-list-item-avatar size="130" color="grey darken-1">
          <v-icon size="130">mdi-account</v-icon>
        </v-list-item-avatar>
      </v-row>

      <!-- 写真変更ボタン -->
      <v-row justify="center">
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
          写真を変更
        </v-btn>
      </v-row>

      <!-- 横線です -->
      <!-- <v-divider></v-divider> -->
      <v-row justify="center">
        <v-col cols="5">
          <v-text-field
            v-model="name"
            label="名前"
            clearable
          ></v-text-field>
          <!-- [fix]自己紹介文入力できるようになったらv-modelで変更できるようにする -->
          <v-textarea
            label="自己紹介"
            clearable
          ></v-textarea>
        </v-col>
      </v-row>
      <!-- {{name}}
      {{myid}} -->

      <!-- いい感じのデザインに変える -->
      <v-row justify="center">
      <v-dialog
        v-model="dialog"
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">保存完了</v-card-title>
          <v-card-text>
            プロフィールを変更しました。
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    </v-container>
  </div>
  <!-- tweetカードらへんをコンポーネントにする。一番上に飛ぶボタンつくる -->
</template>

<script>
import Navigation from '@/components/Navigation.vue';
// import NewTodo from '@/components/NewTodo.vue';
import { API, graphqlOperation } from 'aws-amplify'
import * as gqlMutations from '../graphql/mutations'


  export default {
    data() {
      return{
        // v-text-field（名前のとこ）の中身
        name: null,
        // 自分のID入れる用
        myid: null,
        // ダイアログ表示用
        dialog: false,
        // 名前に変更があったかどうかの比較用
        name2: null,
        // 保存ボタンの表示非表示用
        buttonActive: false,
      }
    },
    components: {
      Navigation,
    },
    // watchでnameを監視する
    watch: {
      name: function() {
        // 変更前の名前name2と監視中の名前nameが正しかった（変更がなかった）ら保存ボタン非表示
        if (this.name == this.name2) {
          this.buttonActive = false
        // 変更があったら保存ボタン表示
        } else {
          this.buttonActive = true
        }
      }
    },
    computed: {
    },
    methods: {
    back: function(){
      this.$router.push('/Profile');
      // historyできてなくね？
    },
    // 保存ボタン
    async save() {
      const updateName = await API.graphql(
        graphqlOperation(gqlMutations.updateUser,{
          input: {
            id: this.myid,
            name: this.name,
          }
        })
      )
      console.log("名前を変更しました" + updateName.data.updateUser)
      // ここもthenとかerrorで変更成功、変更失敗とか分けた方がいい？
      this.$store.commit('setUserName', this.name)
      this.dialog = true
    },
  },
  mounted : async function(){
    // 自分の情報取得
    // const user= this.$store.getters.getUserGraphql
    // 現在の自分の名前
    this.name = this.$store.getters.getUserName
    this.name2 = this.$store.getters.getUserName
    // 自分のID
    this.myid = this.$store.getters.getUserId
  }
}
</script>

<style scoped>
/* 上に行くボタンのアニメーション？を保存ボタンに使ってる */
.button-enter-active,
.button-leave-active {
  transition: opacity 0.5s;
}
.button-enter,
.button-leave-to {
  opacity: 0;
}
</style>