// [fix]ここのクエリーfilter使ってもう少しよくできないか
const getUser = `query GetUser($id: ID!) {
    getUser(id: $id) {
      tweetPosts {
        items {
          id
          content
          createdAt
          user {
            name
            emailAddress
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
          user {
            name
            emailAddress
          }
        }
      }
      traningPosts {
        items {
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
      followees {
        items {
          follower {
            tweetPosts {
              nextToken
              items {
                id
                content
                createdAt
                user {
                  name
                  emailAddress
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
                user {
                  name
                  emailAddress
                }
              }
            }
            traningPosts {
              nextToken
              items {
                id
                content
                createdAt
                title
                user {
                  name
                  emailAddress
                }
              }
            }
          }
        }
      }
    }
  }
  `;

  //[fix]これ、フォローしてない人の投稿もタイムラインに映るわ。。
  const onCreateTweet = /* GraphQL */ `
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
  
  const onCreateCooking = /* GraphQL */ `
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
  
  const onCreateTraning = /* GraphQL */ `
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
  
  
  const onDeleteTweet = /* GraphQL */ `
    subscription OnDeleteTweet {
      onDeleteTweet {
        id
      }
    }
  `;
  
  const onDeleteCooking = /* GraphQL */ `
    subscription OnDeleteCooking {
      onDeleteCooking {
        id
      }
    }
  `;
  
  const onDeleteTraning = /* GraphQL */ `
    subscription OnDeleteTraning {
      onDeleteTraning {
        id
      }
    }
  `;
  