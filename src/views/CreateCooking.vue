<template>
  <div class="CreateCooking">
    <Navigation></Navigation>

    <!-- v-layout justify-centerで中央に持ってくる -->
    <v-layout justify-center>

      <!-- class="title"で文字の大きさを変えてます、ここ"display-1"でもいいかも -->
      <div class="title">料理投稿画面</div>

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
          >
            投稿
          </v-btn>
        </v-col>

      </v-row>

      <!-- 載せた画像表示場所 -->
      <v-row>

        <!-- [fix]画像の元サイズ次第でばかでかくなる時ある、表示サイズ決めてどうにかしたい -->
        <v-col cols="12" sm="6" md="3" justify="left">
          <img src="@/assets/料理3.jpeg"/>
        </v-col>

      </v-row>

      <v-row>

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
            料理の写真を載せる
          </v-btn>
        </v-col>

      </v-row>
          
      <v-row>

        <!-- タイトル入力 -->
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            placeholder="タイトル"
            v-model="content"
          >
          </v-text-field> 
        </v-col>

        <!-- カロリー入力ボタンです、中身はまだない、どうやって入力させる？ -->
        <v-col cols="12" sm="6" md="3">
          <v-btn
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
          </v-btn>
        </v-col>

        <!-- 栄養素入力です -->
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            placeholder="たんぱく質"
            v-model="content"
          >
          </v-text-field>
          <v-text-field
            placeholder="脂質"
            v-model="content"
          >
          </v-text-field>
          <v-text-field
            placeholder="炭水化物"
            v-model="content"
          >
          </v-text-field>
          <v-text-field
            placeholder="食物繊維総量"
            v-model="content"
          >
          </v-text-field>
        </v-col>

        <!-- g表示、書き方ださい -->
        <v-col cols="12" sm="6" md="3">
          <br>
          g<br><br><br>
          g<br><br><br>
          g<br><br><br>
          g
        </v-col>

      </v-row>
          
      <!-- 作り方書くところ -->
      <v-row>

        <!-- clearableいらない？ -->
        <v-col cols="12" sm="6" md="3">
          <v-textarea
            label="料理の作り方！"
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
            料理の写真を載せる
          </v-btn>
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
          >
          <v-icon
            dark
            left
          >
            mdi-plus
          </v-icon>
            作り方を追加
          </v-btn>
        </v-col>

      </v-row>

    </v-container>
  </div>
</template>


<script>
import Navigation from '@/components/Navigation.vue';

export default {
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

  }
}
</script>