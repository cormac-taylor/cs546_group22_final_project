import { gameReviews, games } from "../config/mongoCollections.js";
import {
  validateBody,
  validateObjectID,
  validateRating,
  validateTitle,
} from "../utilities/validation.js";
import { getGameById } from "./games.js";
import {
  addReviewToGameStats,
  removeReviewFromGameStats,
} from "./helpers/updateGameStats.js";
import { getUserById } from "./users.js";

export const createGameReview = async (
  postingUser,
  reviewedGame,
  title,
  body,
  rating
) => {
  postingUser = validateObjectID(postingUser);
  reviewedGame = validateObjectID(reviewedGame);
  title = validateTitle(title);
  const date = new Date().toUTCString();
  body = validateBody(body);
  rating = validateRating(rating);

  const newGameReview = {
    postingUser,
    reviewedGame,
    title,
    date,
    body,
    rating,
  };

  // make sure postingUser exits
  const postingUserData = await getUserById(postingUser.toString());

  // make sure reviewedGame exits
  const reviewedGameData = await getGameById(reviewedGame.toString());

  const gameReviewsCollection = await gameReviews();

  // make sure postingUser hasn't reviewed reviewedGame
  const gameReview = await gameReviewsCollection.findOne({
    postingUser: postingUser,
    reviewedGame: reviewedGame,
  });
  if (gameReview) throw "game review already exists!";

  // ##################
  // MAKE TRANSACTION

  // insert review
  const insertInfo = await gameReviewsCollection.insertOne(newGameReview);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "could not add game review.";

  await addReviewToGameStats(reviewedGame, rating);

  const newId = insertInfo.insertedId.toString();
  return await getGameById(newId);

  // ^^^^^^^^^^^^^^^^^^
  // ##################
};

export const removeGameReview = async (id) => {
  id = validateObjectID(id);

  // ##################
  // MAKE TRANSACTION

  // delete review
  const gameReviewsCollection = await gameReviews();
  const deletionInfo = await gameReviewsCollection.findOneAndDelete({
    _id: id,
  });
  if (!deletionInfo) throw `could not delete game review with id: ${id}.`;

  await removeReviewFromGameStats(
    deletionInfo.reviewedUser,
    deletionInfo.rating
  );

  return deletionInfo;

  // ^^^^^^^^^^^^^^^^^^
  // ##################
};

export const getAllGameReviews = async () => {
  const gameReviewsCollection = await gameReviews();
  let gameReviewList = await gameReviewsCollection.find({}).toArray();
  if (!gameReviewList) throw "could not get all game reviews.";
  return gameReviewList;
};

export const getGameReviewById = async (id) => {
  id = validateObjectID(id);

  const gameReviewsCollection = await gameReviews();
  const gameReview = await gameReviewsCollection.findOne({
    _id: id,
  });
  if (!gameReview) throw `no game review with id: ${id}.`;

  return gameReview;
};

// TO DO ######################################################################################################################################
export const updateUserReview = async (id, updateFeilds) => {
  id = validateObjectID(id);
  updateFeilds = validateNonEmptyObject(updateFeilds);

  const patchedUserReview = {};
  patchedUserReview.date = new Date().toUTCString();

  if (updateFeilds.reviewedUser)
    patchedUserReview.reviewedUser = validateObjectID(
      updateFeilds.reviewedUser
    );

  if (updateFeilds.title)
    patchedUserReview.title = validateTitle(updateFeilds.title);

  if (updateFeilds.body)
    patchedUserReview.body = validateBody(updateFeilds.body);

  if (updateFeilds.rating || updateFeilds.rating === 0)
    patchedUserReview.rating = validateRating(updateFeilds.rating);

  // ##################
  // MAKE TRANSACTION

  const oldReview = await getUserReviewById(id.toString());

  // user cannot review themselves
  if (
    patchedUserReview.reviewedUser &&
    oldReview.postingUser.toString() ===
      patchedUserReview.reviewedUser.toString()
  )
    throw "user cannot review themselves!";

  // update review
  const userReviewsCollection = await userReviews();
  const updateInfo = await userReviewsCollection.findOneAndUpdate(
    { _id: id },
    { $set: patchedUserReview },
    { returnDocument: "after" }
  );
  if (!updateInfo) throw `could not patch user with id: ${id}.`;

  // update user stats
  if (
    patchedUserReview.reviewedUser &&
    (patchedUserReview.rating || patchedUserReview.rating === 0)
  ) {
    const usersCollection = await users();
    await removeReviewFromUserStats(
      usersCollection,
      oldReview.reviewedUser,
      oldReview.rating
    );
    await addReviewToUserStats(
      usersCollection,
      updateInfo.reviewedUser,
      updateInfo.rating
    );
  } else if (patchedUserReview.reviewedUser) {
    const usersCollection = await users();
    await removeReviewFromUserStats(
      usersCollection,
      oldReview.reviewedUser,
      oldReview.rating
    );
    await addReviewToUserStats(
      usersCollection,
      updateInfo.reviewedUser,
      oldReview.rating
    );
  } else if (patchedUserReview.rating || patchedUserReview.rating === 0) {
    const usersCollection = await users();
    await removeReviewFromUserStats(
      usersCollection,
      oldReview.reviewedUser,
      oldReview.rating
    );
    await addReviewToUserStats(
      usersCollection,
      oldReview.reviewedUser,
      updateInfo.rating
    );
  }

  // ^^^^^^^^^^^^^^^^^^
  // ##################

  return updateInfo;
};
