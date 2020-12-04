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
            value=name
            label="名前"
            clearable
          ></v-text-field>
          <!-- [fix]自己紹介文入力できるようになったらvalueで入れる -->
          <v-textarea
            label="自己紹介"
            clearable
          ></v-textarea>
        </v-col>
      </v-row>


      <transition name="button">
        <v-btn
          v-show="buttonActive"
          @click="scrollTop"
          fixed
          color="primary"
          dark
          bottom
          right
          fab
        >
        <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </transition>
    </v-container>
  </div>
  <!-- tweetカードらへんをコンポーネントにする。一番上に飛ぶボタンつくる -->
</template>

<script>
import Navigation from '@/components/Navigation.vue';
// import NewTodo from '@/components/NewTodo.vue';

const updateName = `
mutation UpdateUser {
  updateUser(
    input: $id
    name: "わたなべ"
    }) 
    {
    id
    name
  }
}
`


  export default {
    data() {
      return{
        // 上に行くボタン用、ここの画面ではスクロールがないので今はtrueにしてます
        buttonActive: true,
        scroll: 0,
        name: null,
      }
    },
    // props:['followees', 'follows'],
    components: {
      Navigation,
    },
    computed: {
    },
    methods: {
    scrollTop: function(){
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    },
    // buttonActiveにtrueとfalse渡して表示非表示してる、上行くボタンのv-show="buttonActiveてとこのやつ
    scrollWindow() {
      const top = 100 // ボタンを表示させたい位置
      this.scroll = window.scrollY
      if (top <= this.scroll) {
        this.buttonActive = true
      } else {
        this.buttonActive = false
      }
    },
    back: function(){
      this.$router.push('/Profile');
      // historyできてなくね？
    },
  },
  mounted : async function(){
    // 上行くボタン
    window.addEventListener('scroll', this.scrollWindow)
    const user= this.$store.getters.getUserGraphql
    this.name = user.items[0].name
  }
  }
</script>

<style scoped>
/* 上に行くボタン */
.button-enter-active,
.button-leave-active {
  transition: opacity 0.5s;
}
.button-enter,
.button-leave-to {
  opacity: 0;
}
</style>