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