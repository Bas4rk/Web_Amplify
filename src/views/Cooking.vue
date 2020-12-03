<template>
  <div class="Cooking">
    <Navigation></Navigation>

    <!-- v-layout justify-centerで中央に持ってくる -->
    <v-layout justify-center>

      <!-- class="title"で文字の大きさを変えてます、ここ"display-1"でもいいかも -->
      <div class="title">料理詳細画面</div>

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
      </v-row>

      <!-- 載せた画像表示場所 -->
      <v-row>
        <v-col cols="12" sm="6" md="3" justify="left">
          <v-img
            src="../assets/料理/料理投稿.png" 
            max-width="600"
            max-height="600"
          ></v-img>
        </v-col>
      </v-row>
          
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <span>料理名：{{item.title}}</span><br>
          <span>投稿者：{{item.user.name}}</span><br>
        </v-col>

        <v-col cols="12" sm="6" md="3">
           <span>カロリー：{{item.calorie}}</span><br>
        </v-col>

        <v-col cols="12" sm="6" md="3">
          <span>タンパク質 10g</span><br>
          <span>炭水化物 10g</span><br>
          <span>脂質 10g</span><br>
        </v-col>
      </v-row>
          
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <div>料理の作り方</div>
          <span>{{item.content}}</span><br>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import Navigation from '@/components/Navigation.vue';

export default {
  data() {
    return{
      item: this.$route.params.item
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
  },
}
</script>