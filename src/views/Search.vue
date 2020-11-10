<template>
  <div class="search">
    <v-row justify="center">
      <v-col cols="5">
        <v-card>
          <v-app-bar
            
            color="#6A76AB"
            dark
            :src="imgUrl"
          >
            <template v-slot:img="{ props }">
              <v-img
                v-bind="props"
                gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
              ></v-img>
            </template>
            <v-spacer></v-spacer>
            <template v-slot:extension>
              <v-tabs align-with-title>
                <v-spacer></v-spacer>
                <v-tab @click="imgUrl = require('../assets/料理.jpg')">料理</v-tab>
                <v-spacer></v-spacer>
                <v-tab @click="imgUrl = require('../assets/筋トレ.jpg')">筋トレ</v-tab>
                <v-spacer></v-spacer>
                <v-tab @click="imgUrl = require('../assets/つぶやき.jpg')">ユーザー</v-tab>
                <v-spacer></v-spacer>
              </v-tabs>
            </template>
          </v-app-bar>
        </v-card>

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

        <v-container fluid>
        <v-row dense>
          <v-col
            v-for="card in cards"
            :key="card.title"
            :cols="card.flex"
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
      </v-container>
      </v-col> 
    </v-row>

    <v-row justify="center">
      <v-col cols="3">
  
      </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
  data: () => ({
    imgUrl: require('../assets/料理.jpg'),
    items: [
      require('../assets/料理.jpg'),
      require('../assets/筋トレ.jpg'),
      require('../assets/つぶやき.jpg')
    ],
    slides: [
      '料理',
      '筋トレ',
      '何か'
    ],
    cards: [
      { title: '超簡単！！スパゲッティ作り方', src: require('../assets/料理.jpg'), flex: 12 },
      { title: '[初心者]筋トレ', src: require('../assets/筋トレ.jpg'), flex: 6 },
      { title: '何かの記事', src: require('../assets/つぶやき.jpg'), flex: 6 },
    ],
  })
}
</script>