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
      <v-col cols="4" align="right" size="">


       <button v-on:click="kin" class="bt"><b>+</b></button>
       <button v-on:click="kind" class="bt"><b>+</b></button>


        <v-speed-dial
          v-model="fab"
          :top="top"
          :right="right"
          :left="left"
          :direction="direction"
          :open-on-hover="hover"
          :transition="transition"
        >
          <template v-slot:activator>
            <v-btn
              v-model="fab"
              color="blue darken-2"
              dark
              fab
            >
              <v-icon v-if="fab">mdi-close</v-icon>
              <v-icon v-else>mdi-plus</v-icon>
            </v-btn>
          </template>
           <v-btn
              fab
              dark
              small
              color="indigo"
              @click="teskin"
            >
              <v-icon>mdi-dumbbell</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              small
              color="red"
              @click="test"
            >
              <v-icon>mdi-silverware-fork-knife</v-icon>
            </v-btn>
          </v-speed-dial>	
      </v-col>
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
      <v-treeview
        open-all
        :items="todayTrainingMenus.items"
      ></v-treeview>
    </v-row>
    <v-row v-else justify="center" class="my-5">
      <div class="display-2">
        トレーニングしていません。
      </div>
    </v-row>
    <br><br>


    <v-dialog
        v-model="dialog2"
        max-width="900"
      >
      <v-card>
    <div id="add" align="center">
    <v-list-item>
    <h1 align="center"><span id="space">カレンダーから日付を選択</span></h1>
    <v-col cols="6" align="right">
        <v-date-picker
          v-model="picker2"
          locale="jp-ja"
          @click:date="addtest"
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
      </v-col></v-list-item><br><br>
    
    
    <v-file-input
          accept="image/*"
          label="料理の写真を載せる"
          @change="onImgPicked"
        ></v-file-input><br><br>
        <v-row>
        <v-img
          v-if="uploadImageUrl"
          :src="uploadImageUrl"
          max-width="600"
          max-height="600">
        </v-img>
      </v-row><br><br>
      <v-list-item>
    <h3><span id="space">食べたもの</span></h3>
    <v-text-field
            class="text"
            placeholder="タイトル"
            v-model="title"
          >
          </v-text-field>
    </v-list-item><br><br>
    <v-list-item>
    <h3><span id="space">いつ食べた</span></h3>
    <select id="time" class="time">
    <option value="朝食">朝食</option>
    <option value="昼食">昼食</option>
    <option value="夜食">夜食</option>
    </select>
    </v-list-item><br><br>
    <v-list-item>
    <h3><span id="space1">カロリー</span></h3>
    <input id="col" type="number" class="num">
    </v-list-item><br><br>
    <br><button v-on:click="add" class="addm">add</button><br><br>
    
    </div>
    </v-card>
    </v-dialog>
    


    <v-dialog
        v-model="dialog3"
        max-width="900"
      >
      <v-card>
    <div id="add" align="center">
    <v-list-item>
    <h1 align="center"><span id="space">カレンダーから日付を選択</span></h1>
    <v-col cols="6" align="right">
        <v-date-picker
          v-model="picker2"
          locale="jp-ja"
          @click:date="addtest"
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
      </v-col></v-list-item><br><br>
    
    <v-list-item>
    <h3><span id="space1">トレーニング内容</span></h3>
    <input type="text" id="menutt" class="text">
    </v-list-item><br><br>
    <v-list-item>
    <h3><span id="space">トレーニングの種類</span></h3>
    <input type="text" id="tra" class="text">
    </v-list-item><br><br>
    <br><button v-on:click="addd" class="addm">add</button><br><br>
    
    </div>
    </v-card>
    </v-dialog>

  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import { API, graphqlOperation } from 'aws-amplify'
import * as gqlMutations from '../graphql/mutations'
import store from '../store/index.js'
import {Storage} from 'aws-amplify'
//import NewTodo from '@/components/NewTodo.vue';
import * as graphql from '../graphql/graphql.js'


// var tet
// var hide=true
var AddDate=""
var GeneralPurpose
var AddCalorie=""
var c=0
const caljudge="ghvgzvhgzhzkgvh"
//var now= new Date()
export default {
  components: {
    Navigation
  },
   data () {
    return {
      picker: new Date().toISOString().substr(0, 10),
      picker2: AddDate,
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
      direction: 'right',
      fab: false,
      fling: false,
      hover: true,
      tabs: null,
      top: false,
      right: true,
      bottom: false,
      left: false,
      transition: 'slide-this.title-transition',
      image:null,
      uploadImageUrl: '',
      cookingPosts:null,
      trainingPosts:null,
      title:null,

      dialog: false,
      currentCard: null,
      dialog2: false,
      dialog3: false,
      currentCard2: null,
      foodMemos: [
        { memoDate: "2020-12-02",title: "牛丼",image: require('../assets/料理/牛丼.png'),subtitle: "朝食",calorele: 100 },
        { memoDate: "2020-12-02",title: "ハンバーガー",image: require('../assets/料理/ハンバーガー.png'),subtitle: "夜食",calorele: 200 },
        { memoDate: "2020-12-06",title: "牛丼",image: require('../assets/料理/牛丼.png'),subtitle: "朝食",calorele: 500 },
      ],
      // trainingMemosのフィールドどうするか
      trainingMemos: [
        {memoDate: "2021-01-02",
          items: [
                  {
                    id: 1,
                    name: '有酸素：',
                    children: [
                      { id: 2, name: 'ランニング 10km 20分' },
                    ],
                  },
                  {
                    id: 3,
                    name: '胸：',
                    children: [
                      { id: 4, name: 'ベンチプレス 100kg 10回' },
                      { id: 5, name: 'ベンチプレス 120kg 5回' },
                    ],
                  },
                ] 
        },
        {memoDate: "2021-01-05",
          items: [
                  {
                    id: 1,
                    name: '有酸素：',
                    children: [
                      { id: 2, name: 'ランニング 10km 20分' },
                    ],
                  },
                ] 
        },
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
      let menus = null
      const today = this.picker
      this.trainingMemos.forEach(function (value) {
        // console.log(index + '番目 : ' + value);
        if(value.memoDate == today){ menus= value}
      });
      return menus
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
    onClickBtn(card) {
      this.currentCard = card
      this.dialog = true
    },
    test:function(){
      this.dialog2=true
    },
    teskin:function(){
          this.dialog3=true
    },
    addtest:function(value){
      AddDate=value
    },
    add:function(){
      //this.image=require('../assets/料理/牛丼.png')
      AddDate+=caljudge
      if(AddDate.includes("-")){
        GeneralPurpose=document.getElementById("time").value
        AddCalorie=parseInt(document.getElementById("col").value,10)
        //alert(this.title+GeneralPurpose+AddCalorie)
        if(this.title===""||isNaN(AddCalorie)){
          alert("食べたものかカロリーが入力されていません")
        }else if(AddCalorie<0){
          alert("正しいカロリーが入力されていません")
        }else{
        this.createCooking()
        this.dialog2=false
        }
      }else{
        alert("日付を選択してください")
      }
    },
    addd:function(){
      c=this.trainingMemos.length
      if(AddDate.includes("-")){
        this.title=document.getElementById("menutt").value
        GeneralPurpose=document.getElementById("tra").value
          if(this.title===""||GeneralPurpose===""){
            alert("トレーニング内容かトレーニングの種類が入力されていません")
          }else{
            //ここにデータ送信のコード

            this.dialog3=false
            //追加するトレーニング項目入力ダイアログを閉じる
            location.reload(true)
          }
        //}
      }else{
        alert("日付を選択してください")
      }
    },

    //テスト用のボタン
    kin:function(){
       c=this.cookingPosts[3].createdAt.substr( 4, 1 )
      alert(c+":")
    },
    kind:function(){
      console.log(this.cookingPosts[2].image)
    },
    
    async createCooking(){
      const cooking =await API.graphql(
          graphqlOperation(gqlMutations.createCooking,{
            input: {userId: this.$store.getters.getUserId,
            title: this.title,
            calorie: AddCalorie,
            content: AddDate,
            image: `${store.getters.getUserEmail}/calendarCooking/${this.title}`
            }
          })
      )
      console.log(cooking.data.createCooking);

      await Storage.put(
        `${store.getters.getUserEmail}/calendarCooking/${this.title+cooking.data.createCooking.id}`, // ファイル名
        this.image // アップロードするファイル
      )
      .then (result => console.log(result))
      .catch(err => console.log(err));
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
  mounted : async function(){
    //ポストリスト処理
    const query = await API.graphql(
      graphqlOperation(graphql._query2, {id : this.$store.getters.getUserId})
    )
    let getUser = query.data.getUser

    //投稿されている料理の情報取得
    this.cookingPosts = getUser.cookingPosts.items
    for(let i=0;i<this.cookingPosts.length;i++){
      //投稿されている料理の画像取得
      if(this.cookingPosts[i].content.includes(caljudge)){
        this.cookingPosts[i].image=await Storage.get(`${store.getters.getUserEmail}/calendarCooking/${this.cookingPosts[i].title+this.cookingPosts[i].id}`)
        this.foodMemos.push(...[
          {memoDate: this.cookingPosts[i].content.substr( 0, 10 ),
          title: this.cookingPosts[i].title,
          image: this.cookingPosts[i].image,
          subtitle: "",calorele: this.cookingPosts[i].calorie}])
      }else{
        this.cookingPosts[i].image=await Storage.get(this.cookingPosts[i].image)
        this.foodMemos.push(...[
          {memoDate: this.cookingPosts[i].createdAt.substr( 0, 10 ),
          title: this.cookingPosts[i].title,
          image: this.cookingPosts[i].image,
          subtitle: "",calorele: this.cookingPosts[i].calorie}])
      }
      
    }
    //筋トレデータ取得 
    //以下のような形で配列に突っ込むと追加されずに上書きされます
    /*for(var tete=0;tete<this.trainingMemos.length;tete++){
        if(this.trainingMemos[tete].memoDate==x){
          this.trainingMemos[tete].items.push(...[
            {id: x,
             name: z,
             children: [
              { id: 2, name: y },
             ],
            },
          ])
        }else{
          this.trainingMemos.push(...[
            {memoDate: x,
              items: [
                {
                  id: x,
                  name: z,
                  children: [
                  { id: 2, name: y },
                  ],
                },
              ] 
            }
          ])
        }
      }*/
  }
};
</script>
<style>
button.bt{
  border-radius: 50%;
  line-height: 100px;
  width: 100px;
  height: 100px;
  padding: 0;
  font-size: 100px;
  background-color: #06a600;
  color: #fff;
  -webkit-box-shadow: 0 5px 0 #e6d900;
  box-shadow: 0 5px 0 #e6d900;
}
button.bt:hover{
  -webkit-transform: translate(0, 3px);
  transform: translate(0, 3px);
  -webkit-box-shadow: 0 2px 0 #e6d900;
  box-shadow: 0 2px 0 #e6d900;
}
#menut{
  padding: 10px 15px; /*ボックスを大きくする*/
  font-size: 16px;
  border-radius: 3px; /*ボックス角の丸み*/
  border: 2px solid #ddd; /*枠線*/
  box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}
button.addm {
  font-size: 30px;
  width: 100px;
  height: 60px;
  color: #000;
  background-color: #fff100;
  border-bottom: 5px solid #ccc100;
}

button.addm:hover {
  margin-top: 3px;
  color: #000;
  background: # fff20a;
  border-bottom: 2px solid #ccc100;
}

select.time{
  border-radius: 3px; /*ボックス角の丸み*/
  border: 2px solid #333; /*枠線*/
  box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
  background-color:#cccccc;
}

#col{
  padding: 10px 15px; /*ボックスを大きくする*/
  font-size: 16px;
  border-radius: 3px; /*ボックス角の丸み*/
  border: 2px solid #ddd; /*枠線*/
  box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}
#space{
  margin-right : 20px;
}
#space1{
  margin-right : 40px;
}

#menutt{
  padding: 10px 15px; /*ボックスを大きくする*/
  font-size: 16px;
  border-radius: 3px; /*ボックス角の丸み*/
  border: 2px solid #ddd; /*枠線*/
  box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}
#tra{
  padding: 10px 15px; /*ボックスを大きくする*/
  font-size: 16px;
  border-radius: 3px; /*ボックス角の丸み*/
  border: 2px solid #ddd; /*枠線*/
  box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}
</style>