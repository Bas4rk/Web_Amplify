/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createRelationship = /* GraphQL */ `
  mutation CreateRelationship(
    $input: CreateRelationshipInput!
    $condition: ModelRelationshipConditionInput
  ) {
    createRelationship(input: $input, condition: $condition) {
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
export const updateRelationship = /* GraphQL */ `
  mutation UpdateRelationship(
    $input: UpdateRelationshipInput!
    $condition: ModelRelationshipConditionInput
  ) {
    updateRelationship(input: $input, condition: $condition) {
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
export const deleteRelationship = /* GraphQL */ `
  mutation DeleteRelationship(
    $input: DeleteRelationshipInput!
    $condition: ModelRelationshipConditionInput
  ) {
    deleteRelationship(input: $input, condition: $condition) {
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
export const createTweet = /* GraphQL */ `
  mutation CreateTweet(
    $input: CreateTweetInput!
    $condition: ModelTweetConditionInput
  ) {
    createTweet(input: $input, condition: $condition) {
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
export const updateTweet = /* GraphQL */ `
  mutation UpdateTweet(
    $input: UpdateTweetInput!
    $condition: ModelTweetConditionInput
  ) {
    updateTweet(input: $input, condition: $condition) {
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
export const deleteTweet = /* GraphQL */ `
  mutation DeleteTweet(
    $input: DeleteTweetInput!
    $condition: ModelTweetConditionInput
  ) {
    deleteTweet(input: $input, condition: $condition) {
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
export const createTraning = /* GraphQL */ `
  mutation CreateTraning(
    $input: CreateTraningInput!
    $condition: ModelTraningConditionInput
  ) {
    createTraning(input: $input, condition: $condition) {
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
export const updateTraning = /* GraphQL */ `
  mutation UpdateTraning(
    $input: UpdateTraningInput!
    $condition: ModelTraningConditionInput
  ) {
    updateTraning(input: $input, condition: $condition) {
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
export const deleteTraning = /* GraphQL */ `
  mutation DeleteTraning(
    $input: DeleteTraningInput!
    $condition: ModelTraningConditionInput
  ) {
    deleteTraning(input: $input, condition: $condition) {
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
export const createCooking = /* GraphQL */ `
  mutation CreateCooking(
    $input: CreateCookingInput!
    $condition: ModelCookingConditionInput
  ) {
    createCooking(input: $input, condition: $condition) {
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
export const updateCooking = /* GraphQL */ `
  mutation UpdateCooking(
    $input: UpdateCookingInput!
    $condition: ModelCookingConditionInput
  ) {
    updateCooking(input: $input, condition: $condition) {
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
export const deleteCooking = /* GraphQL */ `
  mutation DeleteCooking(
    $input: DeleteCookingInput!
    $condition: ModelCookingConditionInput
  ) {
    deleteCooking(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
