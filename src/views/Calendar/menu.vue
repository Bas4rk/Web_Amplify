<template>
  <div class="calendar">
    <Navigation></Navigation>
    <!-- <div>
      {{}}
    </div> -->
    <v-row>
      <v-col  cols="8">
        <v-row align-content="space-between">
          <v-col cols="12" align="center">
          <div class="display-4 ">{{picker}}</div>
          </v-col>
          <v-col cols="12" align="center">
          <div class="display-3">体重:60kg</div>
          </v-col>
          <v-col cols="12" align="center">
          <div class="display-3">体脂肪率:20%</div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4" align="right">
        <v-date-picker
          v-model="picker"
          locale="jp-ja"
          :day-format="date => new Date(date).getDate()"
          :landscape="landscape"
          :reactive="reactive"
          :flat="flat"
          :full-width="fullWidth"
          :show-current="showCurrent"
          :type="month ? 'month' : 'date'"
          :multiple="multiple"
          :readonly="readonly"
          :disabled="disabled"
          :events="enableEvents ? functionEvents : null"
        ></v-date-picker>
      </v-col>
    </v-row>

    <!-- [fix]ごはんと筋トレ、コンポーネント化する -->
    <v-row justify="center">
      <div class="display-2">今日のごはん</div>
    </v-row>
    <v-divider></v-divider>

    <v-row v-if="todayFoodMenus.length > 0" id="clmenu" align="center" class="my-5">
      <v-col
        v-for="(card,index) in todayFoodMenus"
        :key="index"
        :cols=3
        @click.stop="onClickBtn(card)"
      >
        <v-subheader>{{card.subtitle}}</v-subheader>
        <v-card>
          <v-img
            :src="card.image"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title v-text="card.title"></v-card-title>
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>mdi-fire</v-icon>
            </v-btn>
            <span>{{card.calorele}}kcal</span>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-dialog
        v-model="dialog"
        v-if="currentCard"
        max-width="600"
      >
        <v-card>
          <v-img
            :src= "currentCard.image"
            class="white--text align-end"
          >
          </v-img>
          <v-card-title>{{currentCard.title}}</v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-card-title>栄養成分</v-card-title>
          <v-list class="transparent">
            <v-list-item>
              <v-list-item-title>エネルギー</v-list-item-title>
              <v-list-item-subtitle>400kcal</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>炭水化物</v-list-item-title>
              <v-list-item-subtitle>400kcal</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>タンパク質</v-list-item-title>
              <v-list-item-subtitle>400kcal</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>脂質</v-list-item-title>
              <v-list-item-subtitle>400kcal</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>なんか</v-list-item-title>
              <v-list-item-subtitle>400kcal</v-list-item-subtitle>
            </v-list-item>
          </v-list>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-fire</v-icon>
            </v-btn>
            <span>{{currentCard.calorele}}cal</span>
          </v-card-actions>
        </v-card>
      </v-dialog>  
    </v-row>
    <v-row v-else justify="center" class="my-5">
      <div class="display-2">
        何も食べてません
      </div>
    </v-row>




    <!-- 筋トレ -->
    <!-- 後でコンポーネント化する -->
    <v-row justify="center" class="my-5">
      <div class="display-2">今日の筋トレ</div>
    </v-row>
    <v-divider></v-divider>

    <v-row v-if="todayTrainingMenus" id="clmenu" align="center">
      <v-treeview
        open-all
        :items="todayTrainingMenus.items"
      ></v-treeview>
    </v-row>
    <v-row v-else justify="center" class="my-5">
      <div class="display-2">
        トレーニングしていません
      </div>
    </v-row>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
export default {
  components: {
    Navigation
  },
   data () {
    return {
      picker: new Date().toISOString().substr(0, 10),
      landscape: false,
      reactive: true,
      fullWidth: true,
      flat: false,
      showCurrent: true,
      month: false,
      multiple: false,
      readonly: false,
      disabled: false,
      enableEvents: true,
      dialog: false,
      currentCard: null,
      foodMemos: [
        { memoDate: "2020-12-02",title: "牛丼",image: require('../../assets/料理/牛丼.png'),subtitle: "朝食",calorele: 100 },
        { memoDate: "2020-12-02",title: "ハンバーガー",image: require('../../assets/料理/ハンバーガー.png'),subtitle: "夜食",calorele: 200 },
        { memoDate: "2020-12-06",title: "牛丼",image: require('../../assets/料理/牛丼.png'),subtitle: "朝食",calorele: 500 },
      ],
      // trainingMemosのフィールドどうするか
      trainingMemos: [
        {memoDate: "2020-12-02",
          items: [
                  {
                    id: 1,
                    name: '有酸素 :',
                    children: [
                      { id: 2, name: 'ランニング 10km 20分' },
                    ],
                  },
                  {
                    id: 3,
                    name: '胸 :',
                    children: [
                      { id: 4, name: 'ベンチプレス 100kg 10回' },
                      { id: 5, name: 'ベンチプレス 120kg 5回' },
                    ],
                  },
                ] 
        },
        {memoDate: "2020-12-05",
          items: [
                  {
                    id: 1,
                    name: '有酸素 :',
                    children: [
                      { id: 2, name: 'ランニング 10km 20分' },
                    ],
                  },
                ] 
        },
        // { memoDate: "2020-12-02",title: "胸",subtitle: "ベンチプレス",value1: "100kg",value2: "10回" },
        // { memoDate: "2020-12-02",title: "胸",subtitle: "ベンチプレス",value1: "120kg",value2: "5回" },
      ]
    }
  },
  computed: {
    functionEvents () {
      return this.month ? this.monthFunctionEvents : this.dateFunctionEvents
    },
    todayFoodMenus(){
      const menu = []
      const today = this.picker
      this.foodMemos.forEach(function (value) {
        // console.log(index + '番目 : ' + value);
        if(value.memoDate == today){menu.push(value)}
      });
      return menu
    },
    todayTrainingMenus(){
      let menu = null
      const today = this.picker
      this.trainingMemos.forEach(function (value) {
        // console.log(index + '番目 : ' + value);
        if(value.memoDate == today){ menu= value}
      });
      return menu
    }
  },
  methods: {
    dateFunctionEvents (date) {
      // console.log("date:"+date)
      // console.log("parseInt(day, 10):"+parseInt(day, 10))
      const [,, day] = date.split('-')
      const foodMemoDay = []
      this.foodMemos.forEach(function (value) {
        // console.log(index + '番目 : ' + value);
        const [,, memo] = value.memoDate.split('-')
        foodMemoDay.push(Number(memo))
      });
      // if (foodMemoDay.includes(parseInt(day, 10))) return true
      const trainingMemoDay = []
      this.trainingMemos.forEach(function (value) {
        // console.log(index + '番目 : ' + value);
        const [,, memo] = value.memoDate.split('-')
        trainingMemoDay.push(Number(memo))
      });
      
      if (foodMemoDay.includes(parseInt(day, 10)) && trainingMemoDay.includes(parseInt(day, 10))){
        return ['blue', 'red']
      } else if(foodMemoDay.includes(parseInt(day, 10))){
        return 'blue'
      } else if(trainingMemoDay.includes(parseInt(day, 10))){
        return 'red'
      }
      //[fix]ここら辺めっちゃ呼び出されてるけど、どうにかならないか？
      return false
    },
    monthFunctionEvents (date) {
      const month = parseInt(date.split('-')[1], 10)
      if ([1, 3, 7].includes(month)) return true
      if ([2, 5, 12].includes(month)) return ['error', 'purple', 'rgba(0, 128, 0, 0.5)']
      return false
    },
    onClickBtn(card) {
      this.currentCard = card
      this.dialog = true
    }
  },
};
</script>