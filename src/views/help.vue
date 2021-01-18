<template>
  <div>
 <Navigation></Navigation>
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
          <div class ="block faq_block">
            <h2 class="title_circle">
            よくあるお問い合わせ
            </h2>
            <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Dropdown
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
    </div>
  </div>
</template>
  <script>
import Navigation from '@/components/Navigation.vue';


export default {
     

  data() {
    return{
     
       items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
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
      this.$router.push('Setting');
      // historyできてなくね？
    },
    

  }
}

</script>