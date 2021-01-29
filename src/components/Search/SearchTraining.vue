<template>
  <div class="searchTraining">

    <v-text-field
      label="検索キーワードを入力してください。"
      type="text"
      v-model="word"
    >
      <template v-slot:append-outer>
        <v-btn @click="searchTrainingPosts" color="primary">検索</v-btn>
      </template>
    </v-text-field>
    <!-- 状態ごとの画面切り替え、レイアウト考える -->
    <div v-if ="this.trainingPostsList == null">
      <v-row class="py-5">
          <v-carousel
            cycle
            height="300"
            hide-delimiter-background
            show-arrows-on-hover
            class="rounded-card"
          >
            <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
              :src="item"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <!-- <v-sheet
                height="100%"
              > -->
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                >
                  <div class="display-3">{{ slides[i] }}</div>
                </v-row>
              <!-- </v-sheet> -->
            </v-carousel-item>
          </v-carousel>
      </v-row>

      <v-row>
        <v-subheader>今週のランキング</v-subheader>
        <v-divider></v-divider>
        
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
        >
          <v-subheader>{{card.ranking}}</v-subheader>
          <v-card>
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-tabs v-model="tab">
        <v-tab href="#tab-1">新着順</v-tab>
        <v-tab href="#tab-2">人気順</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-1">
          <v-col
            v-for="card in cards"
            :key="card.title"
            :cols="12"
          >
            
            <v-card>
              <v-img
                :src="card.src"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title v-text="card.title"></v-card-title>
              </v-img>
  
              <v-card-actions>
                <v-subheader>投稿者:こじろう</v-subheader>
                <v-spacer></v-spacer>
  
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
  
                <v-btn icon>
                  <v-icon>mdi-bookmark</v-icon>
                </v-btn>
  
                <v-btn icon>
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col> 
        </v-tab-item>
        <v-tab-item value="tab-2">
          <SearchTraining></SearchTraining>   
        </v-tab-item>
      </v-tabs-items>
    </div>
    
    <v-row v-else-if ="this.trainingPostsList.length > 0" justify="center" class="py-5">
      <v-col cols="12">
        <!-- ここもホーム画面に戻ってしまうので修正必要 -->
        <TrainingList :items3="this.trainingPostsList"></TrainingList>  
      </v-col>
    </v-row>

    <v-row v-else>
      「 {{this.searchWord}}」に一致するレシピは見つかりませんでした。
    </v-row>

  </div>
</template>

<script>
import TrainingList from '@/components/TrainingList.vue';

import { API, graphqlOperation } from 'aws-amplify'

const listTrainings = /* GraphQL */ `
  query ListTrainings(
    $filter: ModelTrainingFilterInput
  ) {
    listTrainings(filter: $filter) {
      items {
        id
        image
        title
        content
        createdAt
        user {
          name
          emailAddress
        }
      }
    }
  }
`;

export default {
  data: () => ({
    imgUrl: require('../../assets/筋トレ/筋トレ.png'),
    items: [
      require('../../assets/筋トレ/筋トレ.png'),
      require('../../assets/筋トレ/ヨガ.png'),
      require('../../assets/筋トレ/ストレッチ.png')
    ],
    slides: [
      '筋トレ',
      'ヨガ',
      'ストレッチ'
    ],
    cards: [
      { title: '初心者向け筋トレ', src: require('../../assets/筋トレ/腕.png'), flex: 12,ranking: '１位'},
      { title: '自宅でヨガを始めよう！', src: require('../../assets/筋トレ/ヨガ.png'), flex: 6,ranking: '２位' },
      { title: '初心者向けストレッチ', src: require('../../assets/筋トレ/ストレッチ.png'), flex: 6,ranking: '３位' },
    ],
    tab: 'tab-1',
    word: null,
    searchWord: null,
    trainingPostsList: null
  }),
  components: {
    TrainingList,
  },
  methods:{
    async searchTrainingPosts(){
      const TrainingPosts = await API.graphql(
        graphqlOperation(listTrainings, {
          filter: {title: {contains: this.word}}
        })
      ) 
      //きれいにする。
      this.searchWord = this.word 
      this.trainingPostsList = TrainingPosts.data.listTrainings.items
    }
  }
}
</script>