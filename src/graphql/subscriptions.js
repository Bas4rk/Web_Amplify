/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      name
      emailAddress
      createdAt
      updatedAt
      premium
      followees {
        items {
          id
          followeeId
          followerId
          blockBool
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      followers {
        items {
          id
          followeeId
          followerId
          blockBool
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      tweetPosts {
        items {
          id
          userId
          image
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      traningPosts {
        items {
          id
          userId
          image
          title
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      cookingPosts {
        items {
          id
          userId
          image
          title
          content
          calorie
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      comments {
        items {
          id
          userId
          postId
          image
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      owner
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      name
      emailAddress
      createdAt
      updatedAt
      premium
      followees {
        items {
          id
          followeeId
          followerId
          blockBool
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      followers {
        items {
          id
          followeeId
          followerId
          blockBool
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      tweetPosts {
        items {
          id
          userId
          image
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      traningPosts {
        items {
          id
          userId
          image
          title
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      cookingPosts {
        items {
          id
          userId
          image
          title
          content
          calorie
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      comments {
        items {
          id
          userId
          postId
          image
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      owner
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      name
      emailAddress
      createdAt
      updatedAt
      premium
      followees {
        items {
          id
          followeeId
          followerId
          blockBool
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      followers {
        items {
          id
          followeeId
          followerId
          blockBool
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      tweetPosts {
        items {
          id
          userId
          image
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      traningPosts {
        items {
          id
          userId
          image
          title
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      cookingPosts {
        items {
          id
          userId
          image
          title
          content
          calorie
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      comments {
        items {
          id
          userId
          postId
          image
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      owner
    }
  }
`;
export const onCreateRelationship = /* GraphQL */ `
  subscription OnCreateRelationship {
    onCreateRelationship {
      id
      followeeId
      followerId
      blockBool
      followee {
        id
        name
        emailAddress
        createdAt
        updatedAt
        premium
        followees {
          nextToken
        }
        followers {
          nextToken
        }
        tweetPosts {
          nextToken
        }
        traningPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        owner
      }
      follower {
        id
        name
        emailAddress
        createdAt
        updatedAt
        premium
        followees {
          nextToken
        }
        followers {
          nextToken
        }
        tweetPosts {
          nextToken
        }
        traningPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateRelationship = /* GraphQL */ `
  subscription OnUpdateRelationship {
    onUpdateRelationship {
      id
      followeeId
      followerId
      blockBool
      followee {
        id
        name
        emailAddress
        createdAt
        updatedAt
        premium
        followees {
          nextToken
        }
        followers {
          nextToken
        }
        tweetPosts {
          nextToken
        }
        traningPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        owner
      }
      follower {
        id
        name
        emailAddress
        createdAt
        updatedAt
        premium
        followees {
          nextToken
        }
        followers {
          nextToken
        }
        tweetPosts {
          nextToken
        }
        traningPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteRelationship = /* GraphQL */ `
  subscription OnDeleteRelationship {
    onDeleteRelationship {
      id
      followeeId
      followerId
      blockBool
      followee {
        id
        name
        emailAddress
        createdAt
        updatedAt
        premium
        followees {
          nextToken
        }
        followers {
          nextToken
        }
        tweetPosts {
          nextToken
        }
        traningPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        owner
      }
      follower {
        id
        name
        emailAddress
        createdAt
        updatedAt
        premium
        followees {
          nextToken
        }
        followers {
          nextToken
        }
        tweetPosts {
          nextToken
        }
        traningPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateTweet = /* GraphQL */ `
  subscription OnCreateTweet {
    onCreateTweet {
      id
      userId
      image
      content
      createdAt
      updatedAt
      user {
        id
        name
        emailAddress
        createdAt
        updatedAt
        premium
        followees {
          nextToken
        }
        followers {
          nextToken
        }
        tweetPosts {
          nextToken
        }
        traningPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        owner
      }
      comments {
        items {
          id
          userId
          postId
          image
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      owner
    }
  }
`;
export const onUpdateTweet = /* GraphQL */ `
  subscription OnUpdateTweet {
    onUpdateTweet {
      id
      userId
      image
      content
      createdAt
      updatedAt
      user {
        id
        name
        emailAddress
        createdAt
        updatedAt
        premium
        followees {
          nextToken
        }
        followers {
          nextToken
        }
        tweetPosts {
          nextToken
        }
        traningPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        owner
      }
      comments {
        items {
          id
          userId
          postId
          image
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      owner
    }
  }
`;
export const onDeleteTweet = /* GraphQL */ `
  subscription OnDeleteTweet {
    onDeleteTweet {
      id
      userId
      image
      content
      createdAt
      updatedAt
      user {
        id
        name
        emailAddress
        createdAt
        updatedAt
        premium
        followees {
          nextToken
        }
        followers {
          nextToken
        }
        tweetPosts {
          nextToken
        }
        traningPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        owner
      }
      comments {
        items {
          id
          userId
          postId
          image
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      owner
    }
  }
`;
export const onCreateTraning = /* GraphQL */ `
  subscription OnCreateTraning {
    onCreateTraning {
      id
      userId
      image
      title
      content
      createdAt
      updatedAt
      user {
        id
        name
        emailAddress
        createdAt
        updatedAt
        premium
        followees {
          nextToken
        }
        followers {
          nextToken
        }
        tweetPosts {
          nextToken
        }
        traningPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        owner
      }
      comments {
        items {
          id
          userId
          postId
          image
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      owner
    }
  }
`;
export const onUpdateTraning = /* GraphQL */ `
  subscription OnUpdateTraning {
    onUpdateTraning {
      id
      userId
      image
      title
      content
      createdAt
      updatedAt
      user {
        id
        name
        emailAddress
        createdAt
        updatedAt
        premium
        followees {
          nextToken
        }
        followers {
          nextToken
        }
        tweetPosts {
          nextToken
        }
        traningPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        owner
      }
      comments {
        items {
          id
          userId
          postId
          image
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      owner
    }
  }
`;
export const onDeleteTraning = /* GraphQL */ `
  subscription OnDeleteTraning {
    onDeleteTraning {
      id
      userId
      image
      title
      content
      createdAt
      updatedAt
      user {
        id
        name
        emailAddress
        createdAt
        updatedAt
        premium
        followees {
          nextToken
        }
        followers {
          nextToken
        }
        tweetPosts {
          nextToken
        }
        traningPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        owner
      }
      comments {
        items {
          id
          userId
          postId
          image
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      owner
    }
  }
`;
export const onCreateCooking = /* GraphQL */ `
  subscription OnCreateCooking {
    onCreateCooking {
      id
      userId
      image
      title
      content
      calorie
      createdAt
      updatedAt
      user {
        id
        name
        emailAddress
        createdAt
        updatedAt
        premium
        followees {
          nextToken
        }
        followers {
          nextToken
        }
        tweetPosts {
          nextToken
        }
        traningPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        owner
      }
      comments {
        items {
          id
          userId
          postId
          image
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      owner
    }
  }
`;
export const onUpdateCooking = /* GraphQL */ `
  subscription OnUpdateCooking {
    onUpdateCooking {
      id
      userId
      image
      title
      content
      calorie
      createdAt
      updatedAt
      user {
        id
        name
        emailAddress
        createdAt
        updatedAt
        premium
        followees {
          nextToken
        }
        followers {
          nextToken
        }
        tweetPosts {
          nextToken
        }
        traningPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        owner
      }
      comments {
        items {
          id
          userId
          postId
          image
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      owner
    }
  }
`;
export const onDeleteCooking = /* GraphQL */ `
  subscription OnDeleteCooking {
    onDeleteCooking {
      id
      userId
      image
      title
      content
      calorie
      createdAt
      updatedAt
      user {
        id
        name
        emailAddress
        createdAt
        updatedAt
        premium
        followees {
          nextToken
        }
        followers {
          nextToken
        }
        tweetPosts {
          nextToken
        }
        traningPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        owner
      }
      comments {
        items {
          id
          userId
          postId
          image
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      owner
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      userId
      postId
      image
      content
      createdAt
      updatedAt
      user {
        id
        name
        emailAddress
        createdAt
        updatedAt
        premium
        followees {
          nextToken
        }
        followers {
          nextToken
        }
        tweetPosts {
          nextToken
        }
        traningPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        owner
      }
      tweet {
        id
        userId
        image
        content
        createdAt
        updatedAt
        user {
          id
          name
          emailAddress
          createdAt
          updatedAt
          premium
          owner
        }
        comments {
          nextToken
        }
        owner
      }
      traning {
        id
        userId
        image
        title
        content
        createdAt
        updatedAt
        user {
          id
          name
          emailAddress
          createdAt
          updatedAt
          premium
          owner
        }
        comments {
          nextToken
        }
        owner
      }
      cooking {
        id
        userId
        image
        title
        content
        calorie
        createdAt
        updatedAt
        user {
          id
          name
          emailAddress
          createdAt
          updatedAt
          premium
          owner
        }
        comments {
          nextToken
        }
        owner
      }
      owner
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      userId
      postId
      image
      content
      createdAt
      updatedAt
      user {
        id
        name
        emailAddress
        createdAt
        updatedAt
        premium
        followees {
          nextToken
        }
        followers {
          nextToken
        }
        tweetPosts {
          nextToken
        }
        traningPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        owner
      }
      tweet {
        id
        userId
        image
        content
        createdAt
        updatedAt
        user {
          id
          name
          emailAddress
          createdAt
          updatedAt
          premium
          owner
        }
        comments {
          nextToken
        }
        owner
      }
      traning {
        id
        userId
        image
        title
        content
        createdAt
        updatedAt
        user {
          id
          name
          emailAddress
          createdAt
          updatedAt
          premium
          owner
        }
        comments {
          nextToken
        }
        owner
      }
      cooking {
        id
        userId
        image
        title
        content
        calorie
        createdAt
        updatedAt
        user {
          id
          name
          emailAddress
          createdAt
          updatedAt
          premium
          owner
        }
        comments {
          nextToken
        }
        owner
      }
      owner
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      userId
      postId
      image
      content
      createdAt
      updatedAt
      user {
        id
        name
        emailAddress
        createdAt
        updatedAt
        premium
        followees {
          nextToken
        }
        followers {
          nextToken
        }
        tweetPosts {
          nextToken
        }
        traningPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        owner
      }
      tweet {
        id
        userId
        image
        content
        createdAt
        updatedAt
        user {
          id
          name
          emailAddress
          createdAt
          updatedAt
          premium
          owner
        }
        comments {
          nextToken
        }
        owner
      }
      traning {
        id
        userId
        image
        title
        content
        createdAt
        updatedAt
        user {
          id
          name
          emailAddress
          createdAt
          updatedAt
          premium
          owner
        }
        comments {
          nextToken
        }
        owner
      }
      cooking {
        id
        userId
        image
        title
        content
        calorie
        createdAt
        updatedAt
        user {
          id
          name
          emailAddress
          createdAt
          updatedAt
          premium
          owner
        }
        comments {
          nextToken
        }
        owner
      }
      owner
    }
  }
`;
