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
      <v-card class="mx-auto">
        <v-row>
          <v-col cols="12" sm="6" md="3" justify="center">
            <v-img
            class="white--text align-end"
              :src="image"
            >
            </v-img>
          </v-col>
        </v-row>

        <v-list-item>
          <span class="display-1 text--primary">料理名：{{item.title}}</span><br>
        </v-list-item>
        
        <v-list-item>
          <span class="text--primary">投稿者：{{item.user.name}}</span>
        </v-list-item>

        <v-list-item>
          <span class="text--primary">カロリー：{{item.calorie}}</span>
        </v-list-item>

        <v-list-item></v-list-item>

        <v-list-item class="font-weight-bold">
          作り方
        </v-list-item>
        <v-row>
          <v-col v-for="(item2, index) in item.content" :key=item2.content cols="3">
            <v-list-item class="font-weight-bold">
              {{index+1}}．
            </v-list-item>

            <v-list-item>
            <span class="text--primary">
              {{item2}}
            </span>
            </v-list-item>
          </v-col>
        </v-row>
      </v-card>

    </v-container>
    <!-- prevRoute{{prevRoute}} -->
    <!-- prevRoute1{{prevRoute1}} -->
  </div>
</template>


<script>
import Navigation from '@/components/Navigation.vue';
import {Storage} from 'aws-amplify'

export default {
  data() {
    return{
      item: this.$route.params.item,
      prevRoute: null,
      image: null
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
      this.$router.push(this.prevRoute);
      // historyできてなくね？
    },
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.prevRoute = from.path;
    });
  },
  async mounted(){
    this.image = await Storage.get(this.item.image)
  }
}
</script>