<template>
  <div class="calendar">
    <Navigation></Navigation>
    <div hidden>
      todayMemo
      {{todayMemo}}
    </div>
      <v-dialog v-model="fooddialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="red"
            dark
            fab
            v-bind="attrs"
            v-on="on"
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
                  <v-text-field label="炭水化物" v-model="foodcarbohydrate" required></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field label="たんぱく質" v-model="foodproteins" required></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field label="脂質" v-model="foodlipid" required></v-text-field>
                </v-col>
                
                <v-col cols="12">
                  <v-file-input
                    accept="image/"
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
 
      <v-dialog v-model="trainingdialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="indigo"
            dark
            fab
            v-bind="attrs"
            v-on="on"
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
                  <v-text-field label="種目*" v-model="trainingtitle" required></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field label="回数*" v-model="trainingcontent" required></v-text-field>
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

    <v-row>
      <v-col  cols="8">
        <v-row align-content="space-between">
          <v-col cols="12" align="center">
          <div class="display-4 ">{{picker}}日</div>
          </v-col>
          <v-col cols="12" align="center">
          <div class="display-3">体重:{{weight}}kg</div>
          </v-col>
          <v-col cols="12" align="center">
          <div class="display-3">体脂肪率:{{bfp}}%</div>
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

    <v-row v-if="foodMemos.length > 0" id="clmenu" align="center" class="my-5">
      <v-col
        v-for="(card,index) in foodMemos"
        :key="index"
        :cols=3
        @click.stop="onClickBtn(card)"
      >
        <v-card>
          <v-img
            :src="getImage(card.image)"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title v-text="card.title"></v-card-title>
          </v-img>
          <!-- {{getImage(card.image)}} -->

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
              <v-list-item-title>炭水化物</v-list-item-title>
              <v-list-item-subtitle>{{currentCard.carbohydrate}}kcal</v-list-item-subtitle>
            </v-list-item>
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

    <v-row v-if="trainingMemos.length > 0" id="clmenu" align="center">
      <v-col
        v-for="(training,index) in trainingMemos"
        :key="index"
        :cols=12
        class="title"
      >
      {{training.title}}
      <br>
        <v-col
          v-for="(trainingContent,index2) in training.contentList.items"
          :key="index2"
          :cols=12
        >
        {{trainingContent.content}}
        </v-col>
      </v-col>
    </v-row>
    <v-row v-else justify="center" class="my-5">
      <div class="display-2">
        トレーニングしていません。
      </div>
    </v-row>


    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
           color="error"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import { API, graphqlOperation } from 'aws-amplify'
import * as gqlQueries from '../graphql/queries'
import * as gqlMutations from '../graphql/mutations'
import {Storage} from 'aws-amplify'
import store from '../store/index.js'
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
      calendar: "",
      memos: "",
      memo: "",
      bfp: "",
      weight: "",
      foodList: "",
      foodListImage: {},
      foodMemoDay: [],
      trainingList: "",
      trainingMemoDay:[],
      snackbar: false,
      text: '必須項目が入力されていません',
      timeout: 4000,
      
      fooddialog: false,
      trainingdialog: false,
      //献立カロリー
      foodcalorele: '',
      // 献立タイトル
      foodtitle: '',
      // 献立脂質
      foodlipid: '',
      // 献立タンパク質
      foodproteins: '',
      //献立炭水化物
      foodcarbohydrate: '',
      //筋トレ内容
      trainingcontent: '',
      // 筋トレタイトル
      trainingtitle: '',
      foodMemos: [],
      trainingMemos: '',
    }
  },
  computed: {
    functionEvents () {
      return this.month ? this.monthFunctionEvents : this.dateFunctionEvents
    },
    todayMemo(){
      for (const item of this.memos) {
        if(item.date == this.picker){
          this.memoItems(item.bfp,item.weight,item.foodMemos.items,item.trainingMemos.items)
          return item
        }
      }
      this.memoItems(null,null,[],[])
      return null
    },
    getUserId(state) {
      // return state.user.signInUserSession.idToken.payload.email
      return state.UserId
    },
  },
  methods: {
    dateFunctionEvents (date) {
      if (this.foodMemoDay.includes(String(date)) && this.trainingMemoDay.includes(String(date))){
        return ['blue', 'red']
      } else if(this.foodMemoDay.includes(String(date))){
        return 'blue'
      } else if(this.trainingMemoDay.includes(String(date))){
        return 'red'
      }
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
    },
    memoItems(bfp,weight,foodMemos,trainingMemos){
      this.bfp = bfp
      this.weight = weight
      this.foodMemos = foodMemos
      this.trainingMemos = trainingMemos
    },
    async createFoodMemo(){
      if(this.foodtitle == '' || this.foodcalorele == ''){
        this.snackbar = true
        return
      }
      this.fooddialog = false
      this.createCooking();
      //メモを作る前にすでにメモがあるかどうか判定する
      this.createMemo()
      //料理メモを作る
      const foodmemo = await API.graphql(
        graphqlOperation(gqlMutations.createFoodMemo, {
          input: {
            userId: this.$store.getters.getUserId,
            title: this.foodtitle,
            memoDate: this.picker,
            calorele: this.foodcalorele,
            proteins: this.foodproteins,
            lipid: this.foodlipid,
            carbohydrate: this.foodcarbohydrate,
            image: `${store.getters.getUserEmail}/Calendar/food/${this.foodtitle}`
          }
        })
      )
      console.log(foodmemo.data.createFoodMemo);
      location.reload();
    },
    async createCooking(){
      await Storage.put(
        `${store.getters.getUserEmail}/Calendar/food/${this.foodtitle}`, // ファイル名
        this.image // アップロードするファイル
      )
      .then (result => console.log(result)) // {key: "test.txt"}
      .catch(err => console.log(err));
      // createTweetにそのまま書いてるけど、thenとかerrorで投稿成功、投稿失敗とか分けた方がいいと思った。
      // this.dialog = true;
    },
    async createTrainingMemo(){
      
      if(this.trainingtitle == '' || this.trainingcontent == ''){
        this.snackbar = true
        return
      }
      this.trainingdialog = false
      this.createMemo()
      for(var training of this.trainingMemos){
        if(this.trainingtitle == training.title){ 
          await API.graphql(
            graphqlOperation(gqlMutations.createTrainingContent, {
              input: {
                trainingMemoId: training.id,
                content: this.trainingcontent
              }
            })
          )
          location.reload();
          return
        }
      }
      const trainingmemo = await API.graphql(
        graphqlOperation(gqlMutations.createTrainingMemo, {
          input: {
            userId: this.$store.getters.getUserId,
            title: this.trainingtitle,
            memoDate: this.picker,
          }
        })
      )
      console.log("trainingmemo :"+trainingmemo)
      
      await API.graphql(
        graphqlOperation(gqlMutations.createTrainingContent, {
          input: {
            trainingMemoId: trainingmemo.data.createTrainingMemo.id,
            content: this.trainingcontent
          }
        })
      )
      location.reload();
    },
    async createMemo(){
      if(this.todayMemo == null){
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
    getImage(image){
      return this.foodListImage[image]
    },
  },
  mounted : async function(){
    this.calendar = await API.graphql(
      graphqlOperation(gqlQueries.getCalendar, {
        userId: store.getters.getUserId
      })
    )
    this.memos = this.calendar.data.getCalendar.memo.items
    this.foodList = await API.graphql(
      graphqlOperation(gqlQueries.listFoodMemos, {
        filter: {userId: {eq: store.getters.getUserId}}
      })
    ) 
    for(var food of this.foodList.data.listFoodMemos.items){
      if(food.image != null){
        var image = await Storage.get(food.image)
        this.foodListImage[food.image] = image
      }
      this.foodMemoDay.push(food.memoDate)
    }
    this.trainingList = await API.graphql(
      graphqlOperation(gqlQueries.listTrainingMemos, {
        filter: {userId: {eq: store.getters.getUserId}}
      })
    ) 
    for(var training of this.trainingList.data.listTrainingMemos.items){
      this.trainingMemoDay.push(training.memoDate)
    }
  }
};
</script>