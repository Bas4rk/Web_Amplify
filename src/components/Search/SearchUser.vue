<template>
  <div class="searchUser">
    <v-row justify="center">
      
      <!-- {{judgment.items[0].id}}<br> -->
      <!-- {{user}}<br> -->
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


        <v-list v-if="this.user">
              <v-list-item height="200">
              <v-list-item-avatar color="grey darken-1">
                <v-icon size="30">mdi-account</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ this.user.data.listUsers.items[0].name}}</v-list-item-title>

                <v-list-item-subtitle>
                  <div>
                    <small>{{ this.user.data.listUsers.items[0].emailAddress }}</small>
                  </div>
                </v-list-item-subtitle>

                <v-btn v-if="this.judgment.items.length == 0 && this.currentuser != this.user.data.listUsers.items[0].id" @click="createRelation" color="primary">フォローする</v-btn>

                <v-btn v-if="this.judgment.items.length > 0" @click="deleteRelation" color="error">フォロー解除</v-btn>
<!-- {{judgment}} -->
              </v-list-item-content>
            </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    {{this.user}}

  </div>
</template>

<script>

import { API, graphqlOperation } from 'aws-amplify'
import * as gqlQueries from '../../graphql/queries'
import * as myGraphql from '../../graphql/graphql'


// const _query = /* GraphQL */ `
//   query FolloweeIndex(
//     $followeeId: ID
//     $filter: ModelRelationshipFilterInput
//   ) {
//   followeeIndex(
//     followeeId: $followeeId
//     filter: $filter
//   ) {
//     items{
//       id
//     }
//   }
// }
// `


const createRelationship = /* GraphQL */ `
  mutation CreateRelationship(
    $input: CreateRelationshipInput!
  ) {
    createRelationship(input: $input) {
      id
      blockBool
      followerId
      followee {
        id
        name
        emailAddress
      }
      follower {
        id
        name
        emailAddress
      }
      createdAt
      updatedAt
    }
  }
`


const deleteRelationship = /* GraphQL */ `
  mutation DeleteRelationship(
    $input: DeleteRelationshipInput!
  ) {
    deleteRelationship(input: $input) {
      id
      blockBool
      followee {
        id
        name
        emailAddress
      }
      follower {
        id
        name
        emailAddress
      }
      createdAt
      updatedAt
    }
  }
`


export default {
  data () {
    return {
      user: null,
      judgment: null,
      searchUserName: '',
      currentuser: null
    }
  },
  components: {

  },
  methods:{
    async searchUser(){
      // // [fix]必要な情報だけのクエリー作成する
      // const Graphqluser = await API.graphql(
      //   graphqlOperation(gqlQueries.emailIndex, {
      //     emailAddress: this.emailAddress
      //   })
      // )
      // console.log(Graphqluser.data.emailIndex);
      // this.user = Graphqluser.data.emailIndex
      // console.log("ユーザ検索でクエリー飛ばしてます");

      // this.currentuser= this.$store.getters.getUserId

      // const followJudg = await API.graphql(
      //   graphqlOperation(_query, {
      //     filter: {followerId: {eq: this.user.items[0].id}},
      //     followeeId: this.currentuser
      //   })
      // )
      // console.log(followJudg.data.followeeIndex);
      // this.judgment = followJudg.data.followeeIndex
      this.user = await API.graphql(
        graphqlOperation(myGraphql.MQSearchUser, {
          nameFilter: {name: {contains: this.searchUserName}},
          followFilter: {followeeId: {eq: this.$store.getters.getUserId}}

        })
      )

      console.log(this.user.data)

      const followJudg = await API.graphql(
        graphqlOperation(gqlQueries.followeeIndex, {
          filter: {followerId: {eq: this.user.data.listUsers.items[0].id}},
          followeeId: this.$store.getters.getUserId
        })
      )
      this.judgment = followJudg.data.followeeIndex

    },
    async followJudg(){
      return
    },
    async createRelation(){
      const createRelation = await API.graphql(
        graphqlOperation(createRelationship, {
          input: {
            blockBool: false,
            followeeId: this.currentuser,
            followerId: this.user.data.listUsers.items[0].id
          }
        })
      )
      console.log("フォローしました"+createRelation.data.createRelationship)
    },
    async deleteRelation(){
      const deleteRelation = await API.graphql(
        graphqlOperation(deleteRelationship, {
          input: {
            id: this.judgment.items[0].id
          }
        })
      )
      console.log("フォロー解除しました"+deleteRelation.data.deleteRelationship)
    }
  }
}
</script>