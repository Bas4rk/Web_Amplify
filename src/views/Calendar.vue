<template>
  <div class="calendar">
    <Navigation></Navigation>
    <!-- <div>
      {{}}
    </div> -->
      
      
          <!-- <v-row> -->
            
          <!-- </v-row> -->
    <v-row>
      <v-col cols="2">
        <v-dialog v-model="fooddialog" max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="red"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  fab
                >
                <v-icon>mdi-silverware-fork-knife</v-icon>

                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">料理メモ</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field label="タイトル*" v-model="foodtitle" required></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field label="カロリー*" v-model="foodcalorele" required></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field label="脂質*" v-model="foodlipid" required></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field label="たんぱく質*" v-model="foodproteins" required></v-text-field>
                      </v-col>
                      <v-col cols="5">
                        <v-file-input
                          accept="image/*"
                          label="料理の写真を載せる"
                          @change="onImgPicked"
                        ></v-file-input>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*必須項目</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="createFoodMemo()">保存</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          <!-- </v-row> -->

          <!-- <br> -->

          <!-- <v-row> -->
            <v-dialog v-model="trainingdialog" max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="indigo"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  fab
                >
                <v-icon>mdi-dumbbell</v-icon>

                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">筋トレメモ</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field label="タイトル*" v-model="trainingtitle" required></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field label="内容*" v-model="trainingcontent" required></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*必須項目</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="createTrainingMemo()">保存</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
      </v-col>
      <v-col  cols="6">
        <v-row align-content="space-between">
          <v-col cols="12" align="center">
          <div class="display-4 ">{{picker}}日</div>
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
        <v-subheader>{{card.title}}</v-subheader>
        <v-card>
          <v-img
            :src="getImage"
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
              <v-list-item-title>タンパク質</v-list-item-title>
              <v-list-item-subtitle>{{currentCard.proteins}}kcal</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>脂質</v-list-item-title>
              <v-list-item-subtitle>{{currentCard.lipid}}kcal</v-list-item-subtitle>
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
        何も食べてません。
      </div>
    </v-row>




    <!-- 筋トレ -->
    <!-- 後でコンポーネント化する -->
    <v-row justify="center" class="my-5">
      <div class="display-2">今日の筋トレ</div>
    </v-row>
    <v-divider></v-divider>
    <v-row v-if="todayTrainingMenus" id="clmenu" align="center">
      <v-col
        v-for="(card,index) in todayTrainingMenus"
        :key="index"
        :cols=3
      >
      {{card.items[0].name}}
      <br>
      {{card.items[0].children[0].name}}
      </v-col>
      <!-- <v-treeview
        open-all
        :items="todayTrainingMenus.items"
      ></v-treeview> -->
    </v-row>
    <v-row v-else justify="center" class="my-5">
      <div class="display-2">
        トレーニングしていません。
      </div>
    </v-row>
  </div>
</template>

<script>
const query1 = /* GraphQL */ `
query MyQuery {
  listMemos {
    items {
      createdAt
      date
      bfp
      weight
      userId
      updatedAt
      foodMemos {
        items {
          id
          calorele
          createdAt
          owner
          lipid
          memoDate
          title
          proteins
          userId
        }
      }
      trainingMemos {
        items {
          id
          memoDate
          title
          userId
          contentList {
            items {
              id
              createdAt
              content
            }
          }
        }
      }
    }
  }
}
`;
import Navigation from '@/components/Navigation.vue';
import { API, graphqlOperation } from 'aws-amplify'
import * as gqlMutations from '../graphql/mutations'
import store from '../store/index.js'
import {Storage} from 'aws-amplify'


// import * as graphql from '../graphql/queries.js'
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
      fooddialog: false,
      trainingdialog: false,
      foodMemos: [
        { memoDate: "2020-12-02",title: "牛丼",image: require('../assets/料理/牛丼.png'),subtitle: "朝食",calorele: 100 },
        { memoDate: "2020-12-02",title: "ハンバーガー",image: require('../assets/料理/ハンバーガー.png'),subtitle: "夜食",calorele: 200 },
        { memoDate: "2020-12-06",title: "牛丼",image: require('../assets/料理/牛丼.png'),subtitle: "朝食",calorele: 500 },
      ],
      trainingMemos2: [],
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
      ],
      //献立カロリー
      foodcalorele: '',
      // 献立タイトル
      foodtitle: '',
      // 献立脂質
      foodlipid: '',
      // 献立タンパク質
      foodproteins: '',
      //筋トレ内容
      trainingcontent: '',
      // 筋トレタイトル
      trainingtitle: '',
      // memoDate: '2020-12-02'
      //クエリのBeginsWithで使う「2021-01」まで
      querypicker: new Date().toISOString().substr(0, 7),
      //１か月分のデータ入る
      memoPosts: [],
      // 内容記録時のid保存用
      tId: null,
      // 内容記録時のid保存用
      fId: null,
      memoPosts2: [],
      memoPosts3: [],
      image: null,
      getimage: null,
    }
  },
  computed: {
    functionEvents () {
      return this.month ? this.monthFunctionEvents : this.dateFunctionEvents
    },
    todayFoodMenus(){
      const menu = []
      const today = this.picker
      // FoodMenusの長さ分For回してデータを入れる
      for(let i = 0; i < this.memoPosts.length; i++){
        console.log("this.memoPosts.length:",this.memoPosts.length)
        // {{memoPosts[0]}}とかで確認しつつやったので階層ぐちゃぐちゃです
        if(this.memoPosts[i][0].memoDate == today){
          for(let k = 0; k < this.memoPosts[i].length; k++){
            menu.push(this.memoPosts[i][k])
            console.log("faegaegsageag");
          }
        }
      }
      return menu
    },
// v-treeviewをあきらめた
    todayTrainingMenus(){
      let menu = []
      const today = this.picker
      for(let i = 0; i < this.memoPosts2.length; i++){
        if(this.memoPosts2[i][0].memoDate == today){
          for(let k = 0; k < this.memoPosts2[i].length; k++){
            menu.push( 
              {memoDate: this.memoPosts2[i][k].memoDate,
                items: [
                        {
                          name: this.memoPosts2[i][k].title,
                          children: [
                            {name: this.memoPosts2[i][k].contentList.items[0].content },
                          ],
                        },
                        // {
                        //   name: this.memoPosts2[i][k].title,
                        //   children: [
                        //     { name: t  his.memoPosts2[i][k].contentList.items[0].content },
                        //     // { name: 'ベンチプレス 120kg 5回' },
                        //   ],
                        // },
                      ] 
                },
              )
          }
        }
      }
      return menu
    },
    getImage(){
      return this.getimage
    }
  },
  mounted : async function(){
    //ポストリスト処理
    const query = await API.graphql(
      graphqlOperation(query1)
    )
    let getMemo = query.data.listMemos
    //let getMemo2 = query.data.listMemos
    console.log(query.data)

    this.getimage = await Storage.get(`${store.getters.getUserEmail}/Calendar`)

    //ここに1月分のデータとってくる
    this.memoPosts3 = getMemo
    for(let i = 0; i < this.memoPosts3.items.length; i++){
      // console.log("aaaa", getMemo.items[i])
      if(getMemo.items[i].foodMemos.items.length > 0){
        this.memoPosts.push(getMemo.items[i].foodMemos.items)
      }
      if(getMemo.items[i].trainingMemos.items.length > 0){
        this.memoPosts2.push(getMemo.items[i].trainingMemos.items)
      }
    }
  },
  
  methods: {
    async createFoodMemo(){
      this.fooddialog = false
      this.createCooking();
      //メモを作る前にすでにメモがあるかどうか判定する
      if(this.memoPosts3.items.date != this.picker){
        //メモがないならメモを作る
        const creatememo = await API.graphql(
          graphqlOperation(gqlMutations.createMemo, {
            input: {
              userId: this.$store.getters.getUserId,
              date: this.picker
            }
          })
        )
        console.log(creatememo.data.createMemo);
      }
      //料理メモを作る
      const foodmemo = await API.graphql(
        graphqlOperation(gqlMutations.createFoodMemo, {
          input: {
            userId: this.$store.getters.getUserId,
            title: this.foodtitle,
            memoDate: this.picker,
            calorele: this.foodcalorele,
            proteins: this.foodproteins,
            lipid: this.foodlipid
          }
        })
      )
      console.log(foodmemo.data.createFoodMemo);
    },
    async createTrainingMemo(){
      this.tainingdialog = false
      //メモを作る前にすでにメモがあるかどうか判定する
      if(this.memoPosts3.items.date != this.picker){
        //メモがないならメモを作る
        const creatememo = await API.graphql(
          graphqlOperation(gqlMutations.createMemo, {
            input: {
              userId: this.$store.getters.getUserId,
              date: this.picker
            }
          })
        )
        console.log(creatememo.data.createMemo);
      }
      //トレーニングメモを作る
      const trainingmemo = await API.graphql(
        graphqlOperation(gqlMutations.createTrainingMemo, {
          input: {
            userId: this.$store.getters.getUserId,
            title: this.trainingtitle,
            memoDate: this.picker,
          }
        }
        )
      )
      // 内容記録時にidほしいのでtIdにいれる、trainingmemo.data.createTrainingMemo.idだとだめだったから別の変数に入れてる
      this.tId = trainingmemo;
      console.log(this.tId.data.createTrainingMemo);
      console.log(trainingmemo.data.createTrainingMemo);
      //トレーニング内容記録
      const trainingcontent = await API.graphql(
        graphqlOperation(gqlMutations.createTrainingContent, {
          input: {
            trainingMemoId: this.tId.data.createTrainingMemo.id,
            content: this.trainingcontent
          }
        })
      )
      console.log(trainingcontent.data.createTrainingContent);
    },
    dateFunctionEvents (date) {
     // console.log("date:"+date)
      //console.log("parseInt(day, 10):"+parseInt(day, 10))
      const [,, day] = date.split('-')
      const foodMemoDay = []
      for(let i = 0; i < this.memoPosts.length; i++){
      // this.memoPosts.forEach(function (value) {
        // console.log(index + '番目 : ' + value);
        const [,, memo] = this.memoPosts[i][0].memoDate.split('-')
        foodMemoDay.push(Number(memo))
      // });
      }
      // if (foodMemoDay.includes(parseInt(day, 10))) return true
      const trainingMemoDay = []
      for(let i = 0; i < this.memoPosts2.length; i++){
      // this.trainingMemos.forEach(function (value) {
        // console.log(index + '番目 : ' + value);
        const [,, memo] = this.memoPosts2[i][0].memoDate.split('-')
        trainingMemoDay.push(Number(memo))
      // });
      }
      //console.log(day)
      //console.log(parseInt(day, 10))
      if (foodMemoDay.includes(parseInt(day, 10)) && trainingMemoDay.includes(parseInt(day, 10))){
        return ['blue', 'red']
      } else if(foodMemoDay.includes(parseInt(day, 10))){
        return 'blue'
      } else if(trainingMemoDay.includes(parseInt(day, 10))){
        return 'red'
      }
      // console.log(day)
      //[fix]ここら辺めっちゃ呼び出されてるけど、どうにかならないか？
      return false
    },
    monthFunctionEvents (date) {
      //console.log("month")
      const month = parseInt(date.split('-')[1], 10)
      if ([1, 3, 7].includes(month)) return true
      if ([2, 5, 12].includes(month)) return ['error', 'purple', 'rgba(0, 128, 0, 0.5)']
      return false
    },
    onClickBtn(card) {
      this.currentCard = card
      this.dialog = true
    },
    async createCooking(){

      await Storage.put(
        `${store.getters.getUserEmail}/Calendar`, // ファイル名
        this.image // アップロードするファイル
      )
      .then (result => console.log(result)) // {key: "test.txt"}
      .catch(err => console.log(err));
      // createTweetにそのまま書いてるけど、thenとかerrorで投稿成功、投稿失敗とか分けた方がいいと思った。
      // this.dialog = true;
    },
    onImgPicked(file) {
      if (file !== undefined && file !== null) {
        if (file.name.lastIndexOf('.') <= 0) {
          return
        }
        var blob = new Blob([file], {type: "image/png"});
        this.image = blob
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.addEventListener('load', () => {
          this.uploadImageUrl = fr.result
        })
      } else {
        this.uploadImageUrl = ''
      }
    },
  },
};
</script>