<template>
  <div class="FolloweeList">
    <Navigation></Navigation>
    <v-container
      class="py-8 px-6"
      fluid
    >
      <v-btn
        class="ma-2"
        color="primary"
        dark
        @click="back"
      >
        <v-icon
          dark
          left
        >
          mdi-arrow-left
        </v-icon>Back
      </v-btn>
        
      <v-row justify="center">
        <v-col cols="5">
          <v-card>
            <!-- <v-subheader>{{ card }}</v-subheader> -->
            <v-subheader>フォローされているユーザー</v-subheader>

            <v-list>
                <!-- v-forでfollowsの数だけ回します -->
              <template v-for="item in follows">
                <!-- <v-list-item :key="item.id" height="200" :to="{name:'tweet',params:{id:item.id}}"> -->
                  <v-list-item :key="item.id" height="200">
                  <v-list-item-avatar color="grey darken-1">
                    <v-icon size="30">mdi-account</v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                      <!-- ここから下のitem.followee.~はProfile.vueにクエリ？が書いてあります -->
                    <v-list-item-title>{{ item.followee.name}}</v-list-item-title>

                    <v-list-item-subtitle>
                      <!-- {{ item.description}} -->
                      <div>
                        <small>{{ item.followee.emailAddress }}</small>
                      </div>
                    </v-list-item-subtitle>
                    
                    <v-btn @click="deleteRelation(item.id)" color="error">フォロー解除</v-btn>
                  </v-list-item-content>
                </v-list-item>

                <v-divider
                  :key="`divider-${item.followee.id}`"
                  inset
                ></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      <transition name="button">
        <v-btn
          v-show="buttonActive"
          @click="scrollTop"
          fixed
          color="primary"
          dark
          bottom
          right
          fab
        >
        <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </transition>
    </v-container>
  </div>
  <!-- tweetカードらへんをコンポーネントにする。一番上に飛ぶボタンつくる -->
</template>

<script>
import Navigation from '@/components/Navigation.vue';
// import NewTodo from '@/components/NewTodo.vue';
import { API, graphqlOperation } from 'aws-amplify'
// import * as gqlQueries from '../graphql/queries'


//[add]ここgetUserだったけどFollowerIndexで取ってこれた、mock?でテストして取ってこれたのでそのままコピペしてます
const follows_query = /* GraphQL */`
  query followerIndex(
    $followerId: ID
  ) {
    followerIndex(
      followerId: $followerId
    ) {
      items {
        id
        followee {
          id
          name
          emailAddress
        }
      }
    }
  }
`;

const deleteRelationship_query = /* GraphQL */ `
  mutation DeleteRelationship(
    $input: DeleteRelationshipInput!
  ) {
    deleteRelationship(input: $input) {
      id
    }
  }
`

  export default {
    data() {
      return{
        follows: null,
        // 上に行くボタン用、ここの画面ではスクロールがないので今はtrueにしてます
        buttonActive: true,
        scroll: 0,
      }
    },
    // props:['followees', 'follows'],
    components: {
      Navigation,
    },
    methods: {
    scrollTop: function(){
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    },
    // buttonActiveにtrueとfalse渡して表示非表示してる、上行くボタンのv-show="buttonActiveてとこのやつ
    scrollWindow() {
      const top = 100 // ボタンを表示させたい位置
      this.scroll = window.scrollY
      if (top <= this.scroll) {
        this.buttonActive = true
      } else {
        this.buttonActive = false
      }
    },
    async deleteRelation(id){
      const deleteRelation = await API.graphql(
        graphqlOperation(deleteRelationship_query, {
          input: {
            id: id
          }
        })
      )
      console.log("フォロー解除しました"+deleteRelation.data.deleteRelationship)
    },
    back: function(){
      this.$router.push('/Profile');
      // historyできてなくね？
    },
  },
  mounted : async function(){
    // 上行くボタン
    window.addEventListener('scroll', this.scrollWindow)

    //フォローされてる人リスト取得、変数名がクソ
    const usersource2 = this.$store.getters.getUserGraphql
    //クエリ飛ばし、変数名がクソ
    const query2 = await API.graphql(
      graphqlOperation(follows_query, {followerId : usersource2.items[0].id})
    )
    console.log("followsクエリー飛ばしました。")
    //80行目のfollowsに受け取ったクエリデータ？入れる
    this.follows= query2.data.followerIndex.items
  }
  }
</script>

<style scoped>
/* 上に行くボタン */
.button-enter-active,
.button-leave-active {
  transition: opacity 0.5s;
}
.button-enter,
.button-leave-to {
  opacity: 0;
}
</style>