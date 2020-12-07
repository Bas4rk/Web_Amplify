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
      <div class="title">アカウント管理</div>
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
            <v-btn block to="/UserNameChange">ユーザ名</v-btn><br>
            <v-btn block to="/UserIDChange">ユーザID</v-btn><br>
            <v-btn block to="/PasswdChange">パスワード</v-btn><br>
            <v-btn block to="/MailAdressChange">メールアドレス</v-btn><br>
            <v-btn block to="/PhoneNumberChange">電話番号</v-btn><br>
            <v-btn block to="Security">セキュリティ</v-btn><br>
            <v-dialog
              v-model="dialog"
              persistent
              max-width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  block
                  color="red"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  アカウント削除<!--ボタン名-->
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">アカウント削除</span> <!--ダイアログタイトル-->
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="削除する理由を教えてください"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          label="ユーザIDを入力してください"
                          hint="example of helper text only on focus"
                        ></v-text-field>
                      </v-col>
                      <v-col 
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          label="Password*"
                          type="password"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false"
                  >
                    Delete
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            
            

            <!-- 横線です -->
            <br><v-divider></v-divider>


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
  data: () => ({
    dialog: false,
  }),
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