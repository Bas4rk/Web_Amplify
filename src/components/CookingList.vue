<template>
  <div class="CookingList">
    <v-container
      class="py-8 px-6"
      fluid
    >
      <v-row justify="center">
        <v-col cols="5">
          <v-card>
            <v-subheader>投稿一覧</v-subheader>
            <v-list>
              <!-- ここから料理投稿表示、日付順ソートで筋トレ投稿とツイート投稿のごちゃまぜ表示は出来てない -->
              <v-col
                v-for="(item, i) in items2"
                :key="i"
                cols="12"
              >
                <v-card class="my-1" :to="{name:'cooking',params:{id:item.id,item: item}}">
                  <!-- [fix]v-menu押しても、リンク飛んでしまう。
                    v-menu外に出せば解決するけど、card内にmenu入れた方が見やすい気がする。 -->
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
                  <v-img
                    :src="require('../assets/料理/料理投稿.png')"
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
              </v-col>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <!-- tweetカードらへんをコンポーネントにする。一番上に飛ぶボタンつくる -->
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'

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

      }
    },
    props:['items2'],
    components: {
    },
    computed: {
      currentuser(){
        return this.$store.getters.getUserGraphql.items[0].emailAddress
      }
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
    },
  }
</script>

<style scoped>
  .right{
    text-align: right;
  }
</style>
