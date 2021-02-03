<template>
  <div class="searchUser">
    <v-row justify="center">
      <v-col cols="12">
        <v-text-field
          label="検索キーワードを入力してください。"
          type="text"
          v-model="searchUserName"
        >
        <!-- [fix]idで検索できるようにする。ユーザー作成時にidもユーザーに入力してもらう -->
        <template v-slot:append-outer>
          <v-btn @click="searchUser" color="primary">検索</v-btn>
        </template>
        </v-text-field>

        <v-card>
          <v-list v-if="searchResult">
            <template  v-for="user in searchResult.data.listUsers.items">
                
                <v-list-item :key="`first-${user.id}`" height="200">
                  <!-- icon -->
                  <v-list-item-avatar color="grey darken-1">
                    <img :src="user.iconImage">
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{user.name}}</v-list-item-title>

                    <v-list-item-subtitle>
                      <div>
                        <small>{{ user.emailAddress }}</small>
                      </div>
                    </v-list-item-subtitle>

                    <!-- ボタン -->
                    <div v-if="user.id != $store.getters.getUserId">
                      <v-btn v-if="0 == user.followers.items.length" @click="createRelation(user)" color="primary" class="right">フォローする</v-btn>
                      <v-btn v-if="1 == user.followers.items.length" @click="deleteRelation(user)" color="error">フォロー解除</v-btn>
                    </div>
                    
                  </v-list-item-content>
                </v-list-item>
                              <v-divider
                  :key="`divider-${user.id}`"
                  inset
                ></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    {{this.searchResult}}

  </div>
</template>

<script>

import { API, graphqlOperation } from 'aws-amplify'
// import * as gqlQueries from '../../graphql/queries'
import * as gqlMutations from '../../graphql/mutations'
import * as myGraphql from '../../graphql/graphql'
import {Storage} from 'aws-amplify'

export default {
  data () {
    return {
      searchResult: null,
      searchUserName: '',
      // currentuser: null
    }
  },
  components: {

  },
  methods:{
    async searchUser(){//ユーザー検索
      this.searchResult = await API.graphql(
        graphqlOperation(myGraphql.MQSearchUser, {
          nameFilter: {name: {contains: this.searchUserName}},
          followFilter: {followeeId: {eq: this.$store.getters.getUserId}}
        })
      )
      for(var item of this.searchResult.data.listUsers.items){
        console.log("check")
        if(item.iconImage != null){
          console.log(item.iconImage)
          item.iconImage = await Storage.get(item.iconImage)
        }
      }
      console.log(this.searchResult.data)
    },
    async createRelation(targetUser){ //フォロー
      const createRelation = await API.graphql(
        graphqlOperation(gqlMutations.createRelationship, {
          input: {
            blockBool: false,
            followeeId: this.$store.getters.getUserId,
            followerId: targetUser.id
          }
        })
      )

      targetUser.followers.items = [{id: createRelation.data.createRelationship.id}]
      console.log("フォローしました"+createRelation.data.createRelationship)
    },
    async deleteRelation(targetUser){//フォロー解除
      const deleteRelation = await API.graphql(
        graphqlOperation(gqlMutations.deleteRelationship, {
          input: {
            id: targetUser.followers.items[0].id
          }
        })
      )
      targetUser.followers.items = []
      console.log("フォロー解除しました"+deleteRelation.data.deleteRelationship)
    }
  }
}
</script>