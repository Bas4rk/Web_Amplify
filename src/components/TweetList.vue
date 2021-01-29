<template>
  <div class="TweetList">
    <!-- {{items}} -->
    <br>
    <!-- {{list}} -->
    <v-card>
      <!-- <v-subheader>{{ card }}</v-subheader> -->
      <v-subheader>投稿一覧</v-subheader>
      <v-list>
        <template v-for="item in items">
          <v-menu
              :close-on-click="true"
              :close-on-content-click="true"
              :key="`option-${item.id}`"
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
                  @click="deleteTweet(item.id)"
                > 
                  <v-list-item-icon>
                    <v-icon>mdi-trash-can</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>投稿削除</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          <!-- {{item}} -->
          <v-list-item :key="item.id" height="200" :to="{name:'tweet',params:{id:item.id,item: item}}">
            <v-list-item-avatar color="grey darken-1" size="80">
              <img
                :src="getAvatar(item.user.iconImage)"
              >
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ item.content }}</v-list-item-title>
              <v-list-item-subtitle>
                <!-- {{ item.description}} -->
                <div class="right">
                  <small>投稿者:{{ item.user.name }}</small>
                </div>
                <div class="right">
                  <small>{{ item.user.emailAddress }}</small>
                </div>
                <div class="right">
                  <small>{{ item.createdAt }}</small>
                </div>
              </v-list-item-subtitle>
              <!-- <v-btn v-if="item.user.emailAddress == currentuser" @click="deleteTweet(item.id)" color="error">投稿削除</v-btn> -->
            </v-list-item-content>
          </v-list-item>
          <v-divider
            :key="`divider-${item.id}`"
            inset
          ></v-divider>
        </template>
      </v-list>
    </v-card>
  </div>
  <!-- tweetカードらへんをコンポーネントにする。一番上に飛ぶボタンつくる -->
</template>

<script>
// import NewTodo from '@/components/NewTodo.vue';

import { API, graphqlOperation } from 'aws-amplify'
import {Storage} from 'aws-amplify'


const deleteTweet_query = /* GraphQL */`
  mutation DeleteTweet(
    $input: DeleteTweetInput!
  ) {
    deleteTweet(input: $input) {
      id
    }
  }
`;

  export default {
    data () {
      return {
        // currentuser: null
        list: ''
      }
    },
    props:['items'],
    components: {
    },
    computed: {
      currentuser(){
        return this.$store.getters.getUserEmail
      }
    },
    methods: {
      async deleteTweet(id){
        const deleteTweet = await API.graphql(
          graphqlOperation(deleteTweet_query, {
            input: {
              id: id
            }
          })
        )
        console.log("投稿を削除しました"+deleteTweet.data.deleteTweet)
      },
      getAvatar(user){
        return this.list[user]
      }
    },
    async mounted(){
      let image;
      let imageList = {};
      console.log("items"+this.items)
      //闇
      setTimeout(async () => {
      console.log("items2"+this.items)
        for(let i = 0; i < this.items.length; i++){
          console.log("imageList[this.items[i].user.iconImage] > 0"+imageList[this.items[i].user.iconImage] > 0)
          if(!(imageList[this.items[i].user.iconImage] > 0)){
            image = await Storage.get(this.items[i].user.iconImage)
            imageList[this.items[i].user.iconImage] = image
          }
        }
        this.list = imageList;
      }, 500);
      // this.list = imageList;
      console.log("items3"+this.items)

    }
  }
</script>

<style scoped>
  .right{
    text-align: right;
  }
</style>
