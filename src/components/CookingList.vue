<template>
  <div class="CookingList">
    <v-card>
      <v-subheader>投稿一覧</v-subheader>
      <v-list>
        <!-- ここから料理投稿表示、日付順ソートで筋トレ投稿とツイート投稿のごちゃまぜ表示は出来てない -->
        <v-col
          v-for="(item, i) in items2"
          :key="i"
          cols="12"
        >
        <br>
          <v-card>
            <v-menu
              :close-on-click="true"
              :close-on-content-click="true"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-if="item.user.emailAddress == currentuser"
                  @click="deleteCooking(item.id)"
                >
                  <v-list-item-icon>
                    <v-icon>mdi-trash-can</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>投稿削除</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-card class="my-1" :to="{name:'cooking',params:{id:item.id,item: item}}">
              <!-- [fix]v-menu押しても、リンク飛んでしまう。
                v-menu外に出せば解決するけど、card内にmenu入れた方が見やすい気がする。 -->
              <v-img
                :src="getImage(i)"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title>{{ item.title}}</v-card-title>
              </v-img>
              <v-card-actions>
                <span>投稿者：{{ item.user.name }}</span>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-fire</v-icon>
                </v-btn>
                <span>{{ item.calorie }}kcal</span>
              </v-card-actions>
            </v-card>
          </v-card>
        </v-col>
      </v-list>
    </v-card>
    <!-- {{list}} -->
  </div>
  <!-- tweetカードらへんをコンポーネントにする。一番上に飛ぶボタンつくる -->
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import {Storage} from 'aws-amplify'


const deleteCooking_query = /* GraphQL */`
  mutation DeleteCooking(
    $input: DeleteCookingInput!
  ) {
    deleteCooking(input: $input) {
      id
    }
  }
`;

  export default {
    data () {
      return {
        list: ''
      }
    },
    props:['items2'],
    components: {
    },
    computed: {
      currentuser(){
        return this.$store.getters.getUserEmail
      },
    },
    methods: {
      async deleteCooking(id){
        const deleteCooking = await API.graphql(
          graphqlOperation(deleteCooking_query, {
            input: {
              id: id
            }
          })
        )
        console.log("投稿を削除しました"+deleteCooking.data.deleteCooking)
      },
      getImage(i){
        return  this.list[i]
      },
    },
    async mounted(){
      let image;
      let imageList = [];
      for(let i = 0; i < this.items2.length; i++){
        image = await Storage.get(this.items2[i].image)
        imageList.push(image)
      }
      this.list = imageList;
    }
  }
</script>

<style scoped>
  .right{
    text-align: right;
  }
</style>
