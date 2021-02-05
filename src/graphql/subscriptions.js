/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateTraining = /* GraphQL */ `
  subscription OnCreateTraining {
    onCreateTraining {
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
export const onUpdateTraining = /* GraphQL */ `
  subscription OnUpdateTraining {
    onUpdateTraining {
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
export const onDeleteTraining = /* GraphQL */ `
  subscription OnDeleteTraining {
    onDeleteTraining {
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
export const onCreateFavorite = /* GraphQL */ `
  subscription OnCreateFavorite {
    onCreateFavorite {
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
export const onUpdateFavorite = /* GraphQL */ `
  subscription OnUpdateFavorite {
    onUpdateFavorite {
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
export const onDeleteFavorite = /* GraphQL */ `
  subscription OnDeleteFavorite {
    onDeleteFavorite {
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
export const onCreateBookmark = /* GraphQL */ `
  subscription OnCreateBookmark {
    onCreateBookmark {
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
export const onUpdateBookmark = /* GraphQL */ `
  subscription OnUpdateBookmark {
    onUpdateBookmark {
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
export const onDeleteBookmark = /* GraphQL */ `
  subscription OnDeleteBookmark {
    onDeleteBookmark {
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
export const onCreateCalendar = /* GraphQL */ `
  subscription OnCreateCalendar($owner: String!) {
    onCreateCalendar(owner: $owner) {
      userId
      memo {
        items {
          userId
          date
          weight
          bfp
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateCalendar = /* GraphQL */ `
  subscription OnUpdateCalendar($owner: String!) {
    onUpdateCalendar(owner: $owner) {
      userId
      memo {
        items {
          userId
          date
          weight
          bfp
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteCalendar = /* GraphQL */ `
  subscription OnDeleteCalendar($owner: String!) {
    onDeleteCalendar(owner: $owner) {
      userId
      memo {
        items {
          userId
          date
          weight
          bfp
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateMemo = /* GraphQL */ `
  subscription OnCreateMemo($owner: String!) {
    onCreateMemo(owner: $owner) {
      userId
      date
      weight
      bfp
      foodMemos {
        items {
          id
          userId
          memoDate
          title
          image
          calorele
          lipid
          proteins
          carbohydrate
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      trainingMemos {
        items {
          id
          userId
          memoDate
          title
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateMemo = /* GraphQL */ `
  subscription OnUpdateMemo($owner: String!) {
    onUpdateMemo(owner: $owner) {
      userId
      date
      weight
      bfp
      foodMemos {
        items {
          id
          userId
          memoDate
          title
          image
          calorele
          lipid
          proteins
          carbohydrate
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      trainingMemos {
        items {
          id
          userId
          memoDate
          title
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteMemo = /* GraphQL */ `
  subscription OnDeleteMemo($owner: String!) {
    onDeleteMemo(owner: $owner) {
      userId
      date
      weight
      bfp
      foodMemos {
        items {
          id
          userId
          memoDate
          title
          image
          calorele
          lipid
          proteins
          carbohydrate
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      trainingMemos {
        items {
          id
          userId
          memoDate
          title
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateFoodMemo = /* GraphQL */ `
  subscription OnCreateFoodMemo($owner: String!) {
    onCreateFoodMemo(owner: $owner) {
      id
      userId
      memoDate
      title
      image
      calorele
      lipid
      proteins
      carbohydrate
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateFoodMemo = /* GraphQL */ `
  subscription OnUpdateFoodMemo($owner: String!) {
    onUpdateFoodMemo(owner: $owner) {
      id
      userId
      memoDate
      title
      image
      calorele
      lipid
      proteins
      carbohydrate
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteFoodMemo = /* GraphQL */ `
  subscription OnDeleteFoodMemo($owner: String!) {
    onDeleteFoodMemo(owner: $owner) {
      id
      userId
      memoDate
      title
      image
      calorele
      lipid
      proteins
      carbohydrate
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateTrainingMemo = /* GraphQL */ `
  subscription OnCreateTrainingMemo($owner: String!) {
    onCreateTrainingMemo(owner: $owner) {
      id
      userId
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
      owner
    }
  }
`;
export const onUpdateTrainingMemo = /* GraphQL */ `
  subscription OnUpdateTrainingMemo($owner: String!) {
    onUpdateTrainingMemo(owner: $owner) {
      id
      userId
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
      owner
    }
  }
`;
export const onDeleteTrainingMemo = /* GraphQL */ `
  subscription OnDeleteTrainingMemo($owner: String!) {
    onDeleteTrainingMemo(owner: $owner) {
      id
      userId
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
      owner
    }
  }
`;
export const onCreateTrainingContent = /* GraphQL */ `
  subscription OnCreateTrainingContent($owner: String!) {
    onCreateTrainingContent(owner: $owner) {
      id
      trainingMemoId
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateTrainingContent = /* GraphQL */ `
  subscription OnUpdateTrainingContent($owner: String!) {
    onUpdateTrainingContent(owner: $owner) {
      id
      trainingMemoId
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteTrainingContent = /* GraphQL */ `
  subscription OnDeleteTrainingContent($owner: String!) {
    onDeleteTrainingContent(owner: $owner) {
      id
      trainingMemoId
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
