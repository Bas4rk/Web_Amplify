/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      iconImage
      headerImage
      profile
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
      trainingPosts {
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
      favoriteList {
        items {
          id
          userId
          tweetId
          favoDate
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      bookmarkList {
        items {
          id
          userId
          tweetId
          bmDate
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
        iconImage
        headerImage
        profile
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
        trainingPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        favoriteList {
          nextToken
        }
        bookmarkList {
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
      blockBool
      followee {
        id
        name
        iconImage
        headerImage
        profile
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
        trainingPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        favoriteList {
          nextToken
        }
        bookmarkList {
          nextToken
        }
        owner
      }
      follower {
        id
        name
        iconImage
        headerImage
        profile
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
        trainingPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        favoriteList {
          nextToken
        }
        bookmarkList {
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
        blockBool
        followee {
          id
          name
          iconImage
          headerImage
          profile
          emailAddress
          createdAt
          updatedAt
          premium
          owner
        }
        follower {
          id
          name
          iconImage
          headerImage
          profile
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
        iconImage
        headerImage
        profile
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
        trainingPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        favoriteList {
          nextToken
        }
        bookmarkList {
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
          iconImage
          headerImage
          profile
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
export const getTraining = /* GraphQL */ `
  query GetTraining($id: ID!) {
    getTraining(id: $id) {
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
        iconImage
        headerImage
        profile
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
        trainingPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        favoriteList {
          nextToken
        }
        bookmarkList {
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
export const listTrainings = /* GraphQL */ `
  query ListTrainings(
    $filter: ModelTrainingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrainings(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
          iconImage
          headerImage
          profile
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
        iconImage
        headerImage
        profile
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
        trainingPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        favoriteList {
          nextToken
        }
        bookmarkList {
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
          iconImage
          headerImage
          profile
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
        iconImage
        headerImage
        profile
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
        trainingPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        favoriteList {
          nextToken
        }
        bookmarkList {
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
          iconImage
          headerImage
          profile
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
      training {
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
          iconImage
          headerImage
          profile
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
          iconImage
          headerImage
          profile
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
          iconImage
          headerImage
          profile
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
        training {
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
export const getFavorite = /* GraphQL */ `
  query GetFavorite($id: ID!) {
    getFavorite(id: $id) {
      id
      userId
      tweetId
      favoDate
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listFavorites = /* GraphQL */ `
  query ListFavorites(
    $filter: ModelFavoriteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFavorites(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        tweetId
        favoDate
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getBookmark = /* GraphQL */ `
  query GetBookmark($id: ID!) {
    getBookmark(id: $id) {
      id
      userId
      tweetId
      bmDate
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listBookmarks = /* GraphQL */ `
  query ListBookmarks(
    $filter: ModelBookmarkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookmarks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        tweetId
        bmDate
        createdAt
        updatedAt
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
  query GetMemo($date: AWSDate!) {
    getMemo(date: $date) {
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
      trainingMemos {
        items {
          id
          owner
          memoDate
          title
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
    $date: AWSDate
    $filter: ModelMemoFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMemos(
      date: $date
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        owner
        date
        weight
        bfp
        foodMemos {
          nextToken
        }
        trainingMemos {
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
export const getTrainingMemo = /* GraphQL */ `
  query GetTrainingMemo($id: ID!) {
    getTrainingMemo(id: $id) {
      id
      owner
      memoDate
      title
      contentList {
        items {
          id
          trainingMemoId
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTrainingMemos = /* GraphQL */ `
  query ListTrainingMemos(
    $filter: ModelTrainingMemoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrainingMemos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        memoDate
        title
        contentList {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTrainingContent = /* GraphQL */ `
  query GetTrainingContent($id: ID!) {
    getTrainingContent(id: $id) {
      id
      trainingMemoId
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listTrainingContents = /* GraphQL */ `
  query ListTrainingContents(
    $filter: ModelTrainingContentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrainingContents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        trainingMemoId
        content
        createdAt
        updatedAt
        owner
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
        iconImage
        headerImage
        profile
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
        trainingPosts {
          nextToken
        }
        cookingPosts {
          nextToken
        }
        comments {
          nextToken
        }
        favoriteList {
          nextToken
        }
        bookmarkList {
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
        blockBool
        followee {
          id
          name
          iconImage
          headerImage
          profile
          emailAddress
          createdAt
          updatedAt
          premium
          owner
        }
        follower {
          id
          name
          iconImage
          headerImage
          profile
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
        blockBool
        followee {
          id
          name
          iconImage
          headerImage
          profile
          emailAddress
          createdAt
          updatedAt
          premium
          owner
        }
        follower {
          id
          name
          iconImage
          headerImage
          profile
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
