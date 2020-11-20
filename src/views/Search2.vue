<template>
  <div class="search">
    <Navigation></Navigation>
    <v-row justify="center">
      <v-col cols="5">
        <v-app-bar  
          color="#6A76AB"
          dark
          :src="imgUrl"
        >
          <template v-slot:img="{ props }">
            <v-img
              v-bind="props"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            ></v-img>
          </template>
          <v-spacer></v-spacer>
          <template v-slot:extension>
            <v-tabs align-with-title v-model="tab">
              <v-spacer></v-spacer>
              <v-tab href="#tab-1" @click="imgUrl = require('../assets/料理/料理.png')">料理</v-tab>
              <v-spacer></v-spacer>
              <v-tab href="#tab-2" @click="imgUrl = require('../assets/筋トレ/筋トレ.png')">筋トレ</v-tab>
              <v-spacer></v-spacer>
              <v-tab href="#tab-3" @click="imgUrl = require('../assets/つぶやき.jpg')">ユーザー</v-tab>
              <v-spacer></v-spacer>
            </v-tabs>
          </template>
        </v-app-bar>
      </v-col> 
    </v-row>
    <v-row justify="center">
      <v-col cols="5">
      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-1">
          <SearchCooking></SearchCooking>  
        </v-tab-item>
        <v-tab-item value="tab-2">
          <SearchTraining></SearchTraining>   
        </v-tab-item>
        <v-tab-item value="tab-3">
          <SearchUser></SearchUser>  
        </v-tab-item>
      </v-tabs-items>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import SearchCooking from '@/components/Search/SearchCooking.vue';
import SearchTraining from '@/components/Search/SearchTraining.vue';
import SearchUser from '@/components/Search/SearchUser.vue';


export default {
  data () {
    return {
      imgUrl: require('../assets/料理/料理.png'),
      tab: 'tab-1'
    }
  },
  components: {
    Navigation,
    SearchCooking,
    SearchTraining,
    SearchUser,
  },
}
</script>