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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createTraining = /* GraphQL */ `
  mutation CreateTraining(
    $input: CreateTrainingInput!
    $condition: ModelTrainingConditionInput
  ) {
    createTraining(input: $input, condition: $condition) {
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
export const updateTraining = /* GraphQL */ `
  mutation UpdateTraining(
    $input: UpdateTrainingInput!
    $condition: ModelTrainingConditionInput
  ) {
    updateTraining(input: $input, condition: $condition) {
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
export const deleteTraining = /* GraphQL */ `
  mutation DeleteTraining(
    $input: DeleteTrainingInput!
    $condition: ModelTrainingConditionInput
  ) {
    deleteTraining(input: $input, condition: $condition) {
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
export const createFavorite = /* GraphQL */ `
  mutation CreateFavorite(
    $input: CreateFavoriteInput!
    $condition: ModelFavoriteConditionInput
  ) {
    createFavorite(input: $input, condition: $condition) {
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
export const updateFavorite = /* GraphQL */ `
  mutation UpdateFavorite(
    $input: UpdateFavoriteInput!
    $condition: ModelFavoriteConditionInput
  ) {
    updateFavorite(input: $input, condition: $condition) {
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
export const deleteFavorite = /* GraphQL */ `
  mutation DeleteFavorite(
    $input: DeleteFavoriteInput!
    $condition: ModelFavoriteConditionInput
  ) {
    deleteFavorite(input: $input, condition: $condition) {
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
export const createBookmark = /* GraphQL */ `
  mutation CreateBookmark(
    $input: CreateBookmarkInput!
    $condition: ModelBookmarkConditionInput
  ) {
    createBookmark(input: $input, condition: $condition) {
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
export const updateBookmark = /* GraphQL */ `
  mutation UpdateBookmark(
    $input: UpdateBookmarkInput!
    $condition: ModelBookmarkConditionInput
  ) {
    updateBookmark(input: $input, condition: $condition) {
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
export const deleteBookmark = /* GraphQL */ `
  mutation DeleteBookmark(
    $input: DeleteBookmarkInput!
    $condition: ModelBookmarkConditionInput
  ) {
    deleteBookmark(input: $input, condition: $condition) {
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
export const createCalendar = /* GraphQL */ `
  mutation CreateCalendar(
    $input: CreateCalendarInput!
    $condition: ModelCalendarConditionInput
  ) {
    createCalendar(input: $input, condition: $condition) {
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
export const updateCalendar = /* GraphQL */ `
  mutation UpdateCalendar(
    $input: UpdateCalendarInput!
    $condition: ModelCalendarConditionInput
  ) {
    updateCalendar(input: $input, condition: $condition) {
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
export const deleteCalendar = /* GraphQL */ `
  mutation DeleteCalendar(
    $input: DeleteCalendarInput!
    $condition: ModelCalendarConditionInput
  ) {
    deleteCalendar(input: $input, condition: $condition) {
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
export const createMemo = /* GraphQL */ `
  mutation CreateMemo(
    $input: CreateMemoInput!
    $condition: ModelMemoConditionInput
  ) {
    createMemo(input: $input, condition: $condition) {
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
export const updateMemo = /* GraphQL */ `
  mutation UpdateMemo(
    $input: UpdateMemoInput!
    $condition: ModelMemoConditionInput
  ) {
    updateMemo(input: $input, condition: $condition) {
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
export const deleteMemo = /* GraphQL */ `
  mutation DeleteMemo(
    $input: DeleteMemoInput!
    $condition: ModelMemoConditionInput
  ) {
    deleteMemo(input: $input, condition: $condition) {
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
export const createFoodMemo = /* GraphQL */ `
  mutation CreateFoodMemo(
    $input: CreateFoodMemoInput!
    $condition: ModelFoodMemoConditionInput
  ) {
    createFoodMemo(input: $input, condition: $condition) {
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
export const updateFoodMemo = /* GraphQL */ `
  mutation UpdateFoodMemo(
    $input: UpdateFoodMemoInput!
    $condition: ModelFoodMemoConditionInput
  ) {
    updateFoodMemo(input: $input, condition: $condition) {
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
export const deleteFoodMemo = /* GraphQL */ `
  mutation DeleteFoodMemo(
    $input: DeleteFoodMemoInput!
    $condition: ModelFoodMemoConditionInput
  ) {
    deleteFoodMemo(input: $input, condition: $condition) {
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
export const createTrainingMemo = /* GraphQL */ `
  mutation CreateTrainingMemo(
    $input: CreateTrainingMemoInput!
    $condition: ModelTrainingMemoConditionInput
  ) {
    createTrainingMemo(input: $input, condition: $condition) {
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
export const updateTrainingMemo = /* GraphQL */ `
  mutation UpdateTrainingMemo(
    $input: UpdateTrainingMemoInput!
    $condition: ModelTrainingMemoConditionInput
  ) {
    updateTrainingMemo(input: $input, condition: $condition) {
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
export const deleteTrainingMemo = /* GraphQL */ `
  mutation DeleteTrainingMemo(
    $input: DeleteTrainingMemoInput!
    $condition: ModelTrainingMemoConditionInput
  ) {
    deleteTrainingMemo(input: $input, condition: $condition) {
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
export const createTrainingContent = /* GraphQL */ `
  mutation CreateTrainingContent(
    $input: CreateTrainingContentInput!
    $condition: ModelTrainingContentConditionInput
  ) {
    createTrainingContent(input: $input, condition: $condition) {
      id
      trainingMemoId
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateTrainingContent = /* GraphQL */ `
  mutation UpdateTrainingContent(
    $input: UpdateTrainingContentInput!
    $condition: ModelTrainingContentConditionInput
  ) {
    updateTrainingContent(input: $input, condition: $condition) {
      id
      trainingMemoId
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteTrainingContent = /* GraphQL */ `
  mutation DeleteTrainingContent(
    $input: DeleteTrainingContentInput!
    $condition: ModelTrainingContentConditionInput
  ) {
    deleteTrainingContent(input: $input, condition: $condition) {
      id
      trainingMemoId
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
