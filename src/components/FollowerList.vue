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
            <!-- {{followees}} -->
      <v-row justify="center">
        <v-col cols="5">
          <v-card>
            <!-- <v-subheader>{{ card }}</v-subheader> -->
            <v-subheader>フォローしてるユーザー</v-subheader>

            <v-list>
              <template v-for="item in followees">
                <!-- <v-list-item :key="item.id" height="200" :to="{name:'tweet',params:{id:item.id}}"> -->
                  <v-list-item :key="item.follower.id" height="200">
                  <v-list-item-avatar color="grey darken-1">
                    <v-icon size="30">mdi-account</v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.follower.name}}</v-list-item-title>

                    <v-list-item-subtitle>
                      <!-- {{ item.description}} -->
                      <div>
                        <small>{{ item.follower.emailAddress }}</small>
                      </div>
                    </v-list-item-subtitle>
                    
                    <v-btn @click="deleteRelation(item.id)" color="error">フォロー解除</v-btn>
                  </v-list-item-content>
                </v-list-item>

                <v-divider
                  :key="`divider-${item.follower.id}`"
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

//[fix]follweeは「フォローされている人」という意味で、ここに書いてある内容は「フォローしている人」なので名前が逆です。
const followees_query = /* GraphQL */ `
  query FolloweeIndex(
    $followeeId: ID
  ) {
    followeeIndex(
      followeeId: $followeeId
    ) {
      items {
        id
        follower {
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
       followees: null, 
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
    
    const usersorce= this.$store.getters.getUserGraphql
    const query = await API.graphql(
      graphqlOperation(followees_query, {followeeId : usersorce.items[0].id})
    )
    console.log("followeesクエリー飛ばしました。")
    this.followees= query.data.followeeIndex.items
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