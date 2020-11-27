/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getRelationship = /* GraphQL */ `
  query GetRelationship($id: ID!) {
    getRelationship(id: $id) {
      id
      followeeId
      followerId
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
export const listRelationships = /* GraphQL */ `
  query ListRelationships(
    $filter: ModelRelationshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRelationships(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        followeeId
        followerId
        followee {
          id
          name
          emailAddress
          createdAt
          updatedAt
          premium
          owner
        }
        follower {
          id
          name
          emailAddress
          createdAt
          updatedAt
          premium
          owner
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getBlock = /* GraphQL */ `
  query GetBlock($owner: ID!) {
    getBlock(owner: $owner) {
      owner
      blockId
      createdAt
      updatedAt
    }
  }
`;
export const listBlocks = /* GraphQL */ `
  query ListBlocks(
    $owner: ID
    $filter: ModelBlockFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listBlocks(
      owner: $owner
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        owner
        blockId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTweet = /* GraphQL */ `
  query GetTweet($id: ID!) {
    getTweet(id: $id) {
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
export const listTweets = /* GraphQL */ `
  query ListTweets(
    $filter: ModelTweetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTweets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getTraning = /* GraphQL */ `
  query GetTraning($id: ID!) {
    getTraning(id: $id) {
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
export const listTranings = /* GraphQL */ `
  query ListTranings(
    $filter: ModelTraningFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTranings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getCooking = /* GraphQL */ `
  query GetCooking($id: ID!) {
    getCooking(id: $id) {
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
export const listCookings = /* GraphQL */ `
  query ListCookings(
    $filter: ModelCookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCookings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          owner
        }
        tweet {
          id
          userId
          image
          content
          createdAt
          updatedAt
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
          owner
        }
        owner
      }
      nextToken
    }
  }
`;
export const getCalendar = /* GraphQL */ `
  query GetCalendar($owner: ID!) {
    getCalendar(owner: $owner) {
      owner
      memo {
        items {
          id
          owner
          date
          weight
          bfp
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listCalendars = /* GraphQL */ `
  query ListCalendars(
    $owner: ID
    $filter: ModelCalendarFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCalendars(
      owner: $owner
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        owner
        memo {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMemo = /* GraphQL */ `
  query GetMemo($id: ID!) {
    getMemo(id: $id) {
      id
      owner
      date
      weight
      bfp
      foodMemos {
        items {
          id
          owner
          memoDate
          title
          image
          calorele
          lipid
          proteins
          createdAt
          updatedAt
        }
        nextToken
      }
      traningMemos {
        items {
          id
          owner
          memoDate
          image
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listMemos = /* GraphQL */ `
  query ListMemos(
    $filter: ModelMemoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMemos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        date
        weight
        bfp
        foodMemos {
          nextToken
        }
        traningMemos {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFoodMemo = /* GraphQL */ `
  query GetFoodMemo($id: ID!) {
    getFoodMemo(id: $id) {
      id
      owner
      memoDate
      title
      image
      calorele
      lipid
      proteins
      createdAt
      updatedAt
    }
  }
`;
export const listFoodMemos = /* GraphQL */ `
  query ListFoodMemos(
    $filter: ModelFoodMemoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFoodMemos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        memoDate
        title
        image
        calorele
        lipid
        proteins
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTraningMemo = /* GraphQL */ `
  query GetTraningMemo($id: ID!) {
    getTraningMemo(id: $id) {
      id
      owner
      memoDate
      image
      content
      createdAt
      updatedAt
    }
  }
`;
export const listTraningMemos = /* GraphQL */ `
  query ListTraningMemos(
    $filter: ModelTraningMemoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTraningMemos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        memoDate
        image
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const emailIndex = /* GraphQL */ `
  query EmailIndex(
    $emailAddress: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    emailIndex(
      emailAddress: $emailAddress
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const followeeIndex = /* GraphQL */ `
  query FolloweeIndex(
    $followeeId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelRelationshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    followeeIndex(
      followeeId: $followeeId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        followeeId
        followerId
        followee {
          id
          name
          emailAddress
          createdAt
          updatedAt
          premium
          owner
        }
        follower {
          id
          name
          emailAddress
          createdAt
          updatedAt
          premium
          owner
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const followerIndex = /* GraphQL */ `
  query FollowerIndex(
    $followerId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelRelationshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    followerIndex(
      followerId: $followerId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        followeeId
        followerId
        followee {
          id
          name
          emailAddress
          createdAt
          updatedAt
          premium
          owner
        }
        follower {
          id
          name
          emailAddress
          createdAt
          updatedAt
          premium
          owner
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
