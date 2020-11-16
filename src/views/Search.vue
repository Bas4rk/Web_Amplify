<template>
  <div class="search">
    <Navigation></Navigation>
    <v-row justify="center">
      <v-col cols="5">
        

        <v-text-field
          label="検索キーワードを入力してください。"
          type="text"
          v-model="emailAddress"
        >
        <template v-slot:append-outer>
          <v-btn @click="searchUser" color="primary">検索</v-btn>
        </template>
        </v-text-field>

        <!-- <div>
          {{user}}
        </div> -->

        <!-- <div>
          {{judgment}}
        </div> -->


        <v-list v-if="this.user">
              <v-list-item height="200">
              <v-list-item-avatar color="grey darken-1">
                <v-icon size="30">mdi-account</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ this.user.items[0].name}}</v-list-item-title>

                <v-list-item-subtitle>
                  <div>
                    <small>{{ this.user.items[0].emailAddress }}</small>
                  </div>
                </v-list-item-subtitle>

                <v-btn v-if="this.judgment.items.length == 0 && this.currentuser != this.user.items[0].id" @click="createRelation" color="primary">フォローする</v-btn>

                <v-btn v-if="this.judgment.items.length > 0" @click="deleteRelation" color="error">フォロー解除</v-btn>

              </v-list-item-content>
            </v-list-item>
        </v-list>



        <!-- <v-card>
          <v-app-bar
            
            color="#6A76AB"
            dark
            :src="imgUrl"
          >
            <template v-slot:img="{ props }">
              <v-img
                v-bind="props"
                gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
              ></v-img>
            </template>
            <v-spacer></v-spacer>
            <template v-slot:extension>
              <v-tabs align-with-title>
                <v-spacer></v-spacer>
                <v-tab @click="imgUrl = require('../assets/料理.jpg')">料理</v-tab>
                <v-spacer></v-spacer>
                <v-tab @click="imgUrl = require('../assets/筋トレ.jpg')">筋トレ</v-tab>
                <v-spacer></v-spacer>
                <v-tab @click="imgUrl = require('../assets/つぶやき.jpg')">ユーザー</v-tab>
                <v-spacer></v-spacer>
              </v-tabs>
            </template>
          </v-app-bar>
        </v-card>

        <v-text-field
          label="検索キーワードを入力してください。"
          type="text"
        >
        <template v-slot:append-outer>
          <v-btn color="primary">検索</v-btn>
        </template>
        </v-text-field>

        <v-carousel
          cycle
          height="300"
          hide-delimiter-background
          show-arrows-on-hover
          class="rounded-card"
        >
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item"
          >

              <v-row
                class="fill-height"
                align="center"
                justify="center"
              >
                <div class="display-3">{{ slides[i] }}</div>
              </v-row>
 
          </v-carousel-item>
        </v-carousel>

        <v-container fluid>
        <v-row dense>
          <v-col
            v-for="card in cards"
            :key="card.title"
            :cols="card.flex"
          >
            <v-card>
              <v-img
                :src="card.src"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title v-text="card.title"></v-card-title>
              </v-img>
  
              <v-card-actions>
                <v-spacer></v-spacer>
  
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
  
                <v-btn icon>
                  <v-icon>mdi-bookmark</v-icon>
                </v-btn>
  
                <v-btn icon>
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      </v-col> 
    </v-row>

    <v-row justify="center">
      <v-col cols="3">
   -->
      </v-col>
    </v-row>

  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';

import { API, graphqlOperation } from 'aws-amplify'
import * as gqlQueries from '../graphql/queries'


const _query = `
  query FolloweeIndex(
    $followeeId: ID 
    $filter: ModelRelationshipFilterInput
  ) {
  followeeIndex(
    followeeId: $followeeId 
    filter: $filter
  ) {
    items{
      id
    }
  }
}
`


const createRelation_query = `
  mutation CreateRelationship(
    $input: CreateRelationshipInput!
  ) {
    createRelationship(input: $input) {
      id
    }
  }
`


const deleteRelationship_query = `
  mutation DeleteRelationship(
    $input: DeleteRelationshipInput!
  ) {
    deleteRelationship(input: $input) {
      id
    }
  }
`





export default {
  data () {
    return {
      user: null,
      judgment: null,
      emailAddress: '',
      currentuser: null
    }
  },
  components: {
    Navigation
  },
  methods:{
    async searchUser(){
      // [fix]必要な情報だけのクエリー作成する
      const Graphqluser = await API.graphql(
        graphqlOperation(gqlQueries.emailIndex, {
          emailAddress: this.emailAddress
        })
      )
      console.log(Graphqluser.data.emailIndex);
      this.user = Graphqluser.data.emailIndex
      console.log("ユーザ検索でクエリー飛ばしてます");

      this.currentuser= this.$store.getters.getUserGraphql.items[0].id

      // const followJudg = await API.graphql(
      //   graphqlOperation(gqlQueries.followeeIndex, {
      //     filter: {followerId: {eq: this.user.items[0].id}},
      //     followeeId: usersorce.items[0].id
      //   })
      // )

      const followJudg = await API.graphql(
        graphqlOperation(_query, {
          filter: {followerId: {eq: this.user.items[0].id}},
          followeeId: this.currentuser
        })
      )
      console.log(followJudg.data.followeeIndex);
      this.judgment = followJudg.data.followeeIndex

    },
    async createRelation(){
      const createRelation = await API.graphql(
        graphqlOperation(createRelation_query, {
          input: {
            blockBool: false, 
            followeeId: this.currentuser, 
            followerId: this.user.items[0].id
          }
        })
      )
      console.log("フォローしました"+createRelation.data.createRelationship)
    },
    async deleteRelation(){
      const deleteRelation = await API.graphql(
        graphqlOperation(deleteRelationship_query, {
          input: {
            id: this.judgment.items[0].id
          }
        })
      )
      console.log("フォロー解除しました"+deleteRelation.data.deleteRelationship)
    }
  }
  // data: () => ({
  //   imgUrl: require('../assets/料理.jpg'),
  //   items: [
  //     require('../assets/料理.jpg'),
  //     require('../assets/筋トレ.jpg'),
  //     require('../assets/つぶやき.jpg')
  //   ],
  //   slides: [
  //     '料理',
  //     '筋トレ',
  //     '何か'
  //   ],
  //   cards: [
  //     { title: '超簡単！！スパゲッティ作り方', src: require('../assets/料理.jpg'), flex: 12 },
  //     { title: '[初心者]筋トレ', src: require('../assets/筋トレ.jpg'), flex: 6 },
  //     { title: '何かの記事', src: require('../assets/つぶやき.jpg'), flex: 6 },
  //   ],
  // })
}
</script>