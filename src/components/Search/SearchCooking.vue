<template>
  <div class="searchCooking">
    <v-row>
        <v-text-field
          label="検索キーワードを入力してください。"
          type="text"
        >
        <template v-slot:append-outer>
          <v-btn color="primary">検索</v-btn>
        </template>
        </v-text-field>

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
          <!-- 横線です -->
        <v-divider></v-divider>
        </v-tab-item>
        <v-tab-item value="tab-2">
          <SearchTraining></SearchTraining>   
        </v-tab-item>
      </v-tabs-items>
      

  </div>
</template>

<script>

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
    tab: 'tab-1'
  }),
}
</script>