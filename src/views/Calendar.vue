<template>
  <div class="calendar">
    <Navigation></Navigation>
    <!-- <div>
      {{}}
    </div> -->
    
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
    <v-list-item></v-list-item><br><br>
    
    
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
    <v-text-field
            class="text"
            placeholder="タイトル"
            v-model="title"
          >
          </v-text-field>
    </v-list-item><br><br>
    <v-list-item>
    <v-col cols="3">
    <v-select
      :items="times"
      label="いつ食べた"
      v-model="foodenergy"
    />
    </v-col>
    <v-col cols="3">
    <v-text-field
      ref="count"
      label="カロリー"
      type="number"
      v-model="foodcalorie"
    />
    </v-col>
    <v-col cols="3">
    <v-text-field
      ref="count"
      label="炭水化物"
      type="number"
      v-model="carbohydrates"
    />
    </v-col></v-list-item><br><br>
    <v-list-item>
    <v-col cols="3">
    <v-text-field
      ref="count"
      label="タンパク質"
      type="number"
      v-model="foodproteins"
    />
    </v-col><br><br>
    <v-col cols="3">
    <v-text-field
      ref="count"
      label="脂質"
      type="number"
      v-model="foodlipid"
    />
    </v-col>
    </v-list-item><br><br>
    <v-list-item>
    <v-textarea
            id="tears"
            label="その他"
            clearable
            clear-icon="mdi-close-circle"
            v-model="athers"
          >
    </v-textarea>
    </v-list-item><br><br>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="AddCalendarCooking()">保存</v-btn>
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
      <v-col cols="4" align="right" size="">


       <button v-on:click="kin" class="bt"><b>+</b></button>
       <button v-on:click="kind" class="bt"><b>+</b></button>


        
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
        <v-subheader>{{card.energy}}</v-subheader>
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
              <v-list-item-title>炭水化物</v-list-item-title>
              <v-list-item-subtitle>{{currentCard.carbohydrates}}kcal</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>タンパク質</v-list-item-title>
              <v-list-item-subtitle>{{currentCard.proteins}}kcal</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>脂質</v-list-item-title>
              <v-list-item-subtitle>{{currentCard.lipid}}kcal</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>その他</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-subtitle>{{currentCard.athers}}</v-list-item-subtitle>
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
var c=0
const caljudge="ghvgzvhgzhzkgvh"
const jleng=caljudge.length-1
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
      title:"",
      foodenergy:"",
      carbohydrates:"",
      // 献立タンパク質
      foodproteins: '',
      // 献立脂質
      foodlipid: '',
      athers:"",
      foodathers:"",
      foodcalorie:"",

      dialog: false,
      currentCard: null,
      fooddialog: false,
      //dialog3: false,
      currentCard2: null,
      times:["朝食","昼食","夜食"],
      foodMemos: [
        /*{ memoDate: "2020-12-02",title: "牛丼",image: require('../assets/料理/牛丼.png'),subtitle: "朝食",calorele: 100 },
        { memoDate: "2020-12-02",title: "ハンバーガー",image: require('../assets/料理/ハンバーガー.png'),subtitle: "夜食",calorele: 200 },
        { memoDate: "2020-12-06",title: "牛丼",image: require('../assets/料理/牛丼.png'),subtitle: "朝食",calorele: 500 },
      */],
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
    AddCalendarCooking:function(){
      AddDate=this.picker
      //this.image=require('../assets/料理/牛丼.png')
      if(AddDate.includes("-")){
        //AddCalorie=parseInt(document.getElementById("col").value,10)
        //alert(this.title+GeneralPurpose+AddCalorie)
        if(this.title===""||isNaN(this.foodcalorie)){
          alert("食べたものかカロリーが入力されていません")
        }else if(this.foodcalorie<0){
          alert("正しいカロリーが入力されていません")
        }else{
        this.createCooking()
        this.fooddialog=false
        location.reload(true)
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

            //this.dialog3=false
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
      //var a=this.cookingPosts.length-1
       c=this.cookingPosts[0].content
      alert(c+"")
      alert(this.cookingPosts[0].content[0].length)
    },
    kind:function(){
      console.log(this.cookingPosts[2].image)
    },
    
    async createCooking(){
      const cooking =await API.graphql(
          graphqlOperation(gqlMutations.createCooking,{
            input: {userId: this.$store.getters.getUserId,
            title: this.title,
            calorie: this.foodcalorie,
            content: AddDate+this.foodenergy+"%$%"+this.carbohydrates+"!$!"+this.foodproteins+"#$#"+this.foodlipid+"?$?"+this.athers+caljudge,
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
    var count1=0
    var count2=0
    var count3=0
    var count4=0
    var count5=0
    //var jleng=caljudge.length

    //投稿されている料理の情報取得
    this.cookingPosts = getUser.cookingPosts.items
    for(let i=0;i<this.cookingPosts.length;i++){
      //投稿されている料理の画像取得
      if(this.cookingPosts[i].content[0].includes(caljudge)){
        count1=this.cookingPosts[i].content[0].indexOf("%$%")-1
        this.foodenergy=this.cookingPosts[i].content[0].substr( 10, count1-9 )
        count2=this.cookingPosts[i].content[0].indexOf("!$!",count1+3)-1
        this.carbohydrates=this.cookingPosts[i].content[0].substr( count1+4, count2-(count1+3) )
        count3=this.cookingPosts[i].content[0].indexOf("#$#",count2+3)-1
        this.foodproteins=this.cookingPosts[i].content[0].substr( count2+4, count3-(count2+3) )
        count4=this.cookingPosts[i].content[0].indexOf("?$?",count3+3)-1
        this.foodlipid=this.cookingPosts[i].content[0].substr( count3+4, count4-(count3+3) )
        count5=this.cookingPosts[i].content[0].length-1
        this.foodathers=this.cookingPosts[i].content[0].substr( count4+jleng+1, count5-(count4+jleng) )
        this.cookingPosts[i].image=await Storage.get(`${store.getters.getUserEmail}/calendarCooking/${this.cookingPosts[i].title+this.cookingPosts[i].id}`)
        this.foodMemos.push(...[
          {memoDate: this.cookingPosts[i].content[0].substr( 0, 10 ),
          title: this.cookingPosts[i].title,
          image: this.cookingPosts[i].image,
          subtitle: "",calorele: this.cookingPosts[i].calorie,
          energy:this.foodenergy,
          carbohydrates:this.carbohydrates,
          proteins:this.foodproteins,
          lipid:this.foodlipid,
          athers:this.foodathers
          }])
          console.log(this.foodMemos[i].lipid)
      }else{
        console.log("free")
        this.cookingPosts[i].image=await Storage.get(this.cookingPosts[i].image)
        this.foodMemos.push(...[
          {memoDate: this.cookingPosts[i].createdAt.substr( 0, 10 ),
          title: this.cookingPosts[i].title,
          image: this.cookingPosts[i].image,
          subtitle: "",calorele: this.cookingPosts[i].calorie,
          energy:"",
          carbohydrates:"",
          proteins:"",
          lipid:""}])
      }
      console.log(this.cookingPosts[i].content[0])
    }
    this.title=""
        this.foodenergy=this.times[0]
        this.foodcalorie=""
        this.carbohydrates=""
        this.foodproteins=""
        this.foodlipid=""
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
  background: #fff20a;
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
#lipid{
  padding: 10px 15px; /*ボックスを大きくする*/
  font-size: 16px;
  border-radius: 3px; /*ボックス角の丸み*/
  border: 2px solid #ddd; /*枠線*/
  box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}
#carbohydrates{
  padding: 10px 15px; /*ボックスを大きくする*/
  font-size: 16px;
  border-radius: 3px; /*ボックス角の丸み*/
  border: 2px solid #ddd; /*枠線*/
  box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}
#proteins{
  padding: 10px 15px; /*ボックスを大きくする*/
  font-size: 16px;
  border-radius: 3px; /*ボックス角の丸み*/
  border: 2px solid #ddd; /*枠線*/
  box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}
#space{
  margin-right : 60px;
}
#space1{
  margin-right : 40px;
}
#space2{
  margin-right : 59px;
}
#space3{
  margin-right : 95px;
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