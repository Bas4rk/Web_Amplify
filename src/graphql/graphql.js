//////////////////////////////////////////////////
//////////////////////////////////////////////////
//Home

// [fix]ここのクエリーfilter使ってもう少しよくできないか
export const _query2 = /* GraphQL */`
query GetUser($id: ID!) {
  getUser(id: $id) {
    tweetPosts {
      items {
        id
        content
        createdAt
        image
        comments {
          items {
            content
            image
            id
            createdAt
            user {
              name
              emailAddress
              iconImage
            }
          }
        }
        user {
          name
          emailAddress
          iconImage
        }
      }
    }
    cookingPosts {
      items {
        id
        title
        content
        calorie
        createdAt
        image
        user {
          name
          emailAddress
          iconImage
        }
      }
    }
    trainingPosts {
      items {
        id
        title
        content
        createdAt
        image
        user {
          name
          emailAddress
          iconImage
        }
      }
    }
    followees {
      items {
        follower {
          tweetPosts {
            nextToken
            items {
              id
              content
              createdAt
              image
              user {
                name
                emailAddress
                iconImage
              }
            }
          }
          cookingPosts {
            nextToken
            items {
              content
              calorie
              createdAt
              id
              title
              image
              user {
                name
                emailAddress
                iconImage
              }
            }
          }
          trainingPosts {
            nextToken
            items {
              id
              content
              createdAt
              title
              image
              user {
                name
                emailAddress
                iconImage
              }
            }
          }
        }
      }
    }
  }
}
`
//[fix]これ、フォローしてない人の投稿もタイムラインに映るわ。。
export const onCreateTweet = /* GraphQL */ `
  subscription OnCreateTweet {
    onCreateTweet {
      id
      content
      createdAt
      user {
        name
        emailAddress
      }
    }
  }
`;

export const onCreateCooking = /* GraphQL */ `
  subscription OnCreateCooking {
    onCreateCooking {
      id
      title
      content
      calorie
      createdAt
      user {
        name
        emailAddress
      }
    }
  }
`;

export const onCreateTraning = /* GraphQL */ `
  subscription OnCreateTraning {
    onCreateTraning {
      id
      title
      content
      createdAt
      user {
        name
        emailAddress
      }
    }
  }
`;

export const onDeleteTweet = /* GraphQL */ `
  subscription OnDeleteTweet {
    onDeleteTweet {
      id
    }
  }
`;

export const onDeleteCooking = /* GraphQL */ `
  subscription OnDeleteCooking {
    onDeleteCooking {
      id
    }
  }
`;

export const onDeleteTraning = /* GraphQL */ `
  subscription OnDeleteTraning {
    onDeleteTraning {
      id
    }
  }
`;

// export const MQSearchUser = /* GraphQL */ `
//   query MQSearchUser($filter: ModelUserFilterInput!) {
//     listUsers(filter: $filter) {
//       items {
//         name
//         id
//         iconImage
//         emailAddress
//         followees {
//           items {
//             id
//           }
//         }
//       }
//     }
//   }
// `;
export const MQSearchUser = /* GraphQL */ `
  query MQSearchUser($nameFilter: ModelUserFilterInput!, $followFilter: ModelRelationshipFilterInput!) {
    listUsers(filter: $nameFilter) {
      items {
        name
        id
        iconImage
        emailAddress
        followers(filter: $followFilter) {
          items {
            id
          }
        }
      }
    }
  }
`;

// subscribe(){
//   // TODO(3-1) GraphQLエンドポイントにsubscriptionを発行し、mutationを監視する
//   this.createSubscription = API.graphql(graphqlOperation(graphql.onCreateTweet)).subscribe({
//     next: (eventData) => {
//       console.log("evenData:" + eventData)
//       const tweet = eventData.value.data.onCreateTweet;
//       this.wholeposts.push(tweet);
//       this.relation = eventData
//     }
//   })

//   // 料理
//   this.createSubscription2 = API.graphql(graphqlOperation(graphql.onCreateCooking)).subscribe({
//     next: (eventData) => {
//       const cooking = eventData.value.data.onCreateCooking;
//       this.wholeposts2.push(cooking);
//     }
//   })

//   // 筋トレ
//   this.createSubscription3 = API.graphql(graphqlOperation(graphql.onCreateTraning)).subscribe({
//     next: (eventData) => {
//       const traning = eventData.value.data.onCreateTraning;
//       this.wholeposts3.push(traning);
//     }
//   })

//   this.deleteSubscription = API.graphql(graphqlOperation(graphql.onDeleteTweet)).subscribe({
//     next: (eventData) => {
//       const tweet = eventData.value.data.onDeleteTweet;
//       this.wholeposts = this.wholeposts.filter(post => post.id != tweet.id);
//     }
//   })

//   // 料理
//   this.deleteSubscription = API.graphql(graphqlOperation(graphql.onDeleteCooking)).subscribe({
//     next: (eventData) => {
//       const cooking = eventData.value.data.onDeleteCooking;
//       this.wholeposts2 = this.wholeposts2.filter(post => post.id != cooking.id);
//     }
//   })

//   // 筋トレ
//   this.deleteSubscription = API.graphql(graphqlOperation(graphql.onDeleteTraning)).subscribe({
//     next: (eventData) => {
//       const traning = eventData.value.data.onDeleteTraning;
//       this.wholeposts3 = this.wholeposts3.filter(post => post.id != traning.id);
//     }
//   })
// },

//[fix]下のよく分からない
    // beforeDestroy() {
    //   // TODO(3-2) チャット画面から離れる際に、UnSubscribeする
    //   this.subscription.unsubscribe();
    // },