<template>
  <div class="searchCooking">

    <v-text-field
      label="検索キーワードを入力してください。"
      type="text"
      v-model="word"
    >
      <template v-slot:append-outer>
        <v-btn @click="searchCookingPosts" color="primary">検索</v-btn>
      </template>
    </v-text-field>
    <!-- 状態ごとの画面切り替え、レイアウト考える -->
    <div v-if ="this.cookingPostsList == null">
      

     
    </div>

    <v-row v-else-if ="this.cookingPostsList.length > 0" justify="center" class="py-5">
      <v-col cols="12">
        <!-- ここもホーム画面に戻ってしまうので修正必要 -->
        <CookingList :items2="this.cookingPostsList"></CookingList>  
      </v-col>
    </v-row>

    <v-row v-else>
      「 {{this.searchWord}}」に一致するレシピは見つかりませんでした。
    </v-row>
  </div>
</template>

<script>
import CookingList from '@/components/CookingList.vue';

import { API, graphqlOperation } from 'aws-amplify'
// import SearchVue from '../../views/Search.vue';

const listCookings = /* GraphQL */ `
  query ListCookings(
    $filter: ModelCookingFilterInput
  ) {
    listCookings(filter: $filter) {
      items {
        id
        image
        title
        content
        calorie
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
    imgUrl: require('../../assets/料理/料理.png'),
    items: [
      require('../../assets/料理/料理.png'),
      require('../../assets/料理/パンケーキ.png'),
      require('../../assets/料理/ラーメン.png')
    ],
    slides: [
      'スパゲッティ',
      'パンケーキ',
      'ラーメン'
    ],
    cards: [
      { title: '超簡単！！スパゲッティ作り方', src: require('../../assets/料理/料理.png'), flex: 12,ranking: '１位'},
      { title: '本格的なハンバーガーを作る!', src: require('../../assets/料理/ハンバーガー.png'), flex: 6,ranking: '２位' },
      { title: '最強の牛丼', src: require('../../assets/料理/牛丼.png'), flex: 6,ranking: '３位' },
    ],
    tab: 'tab-1',
    word: null,
    searchWord: null,
    cookingPostsList: null
  }),
  components: {
    CookingList,
  },
  methods:{
    async searchCookingPosts(){
      const cookingPosts = await API.graphql(
        graphqlOperation(listCookings, {
          filter: {title: {contains: this.word}}
        })
      ) 
      //きれいにする。
      this.searchWord = this.word 
      this.cookingPostsList = cookingPosts.data.listCookings.items
    }
  }
}
</script>