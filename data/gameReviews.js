import { gameReviews } from "../config/mongoCollections.js";
import {
  validateBody,
  validateNonEmptyObject,
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
  await getUserById(postingUser.toString());

  // make sure reviewedGame exits
  await getGameById(reviewedGame.toString());

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
  return await getGameReviewById(newId);

  // ^^^^^^^^^^^^^^^^^^
  // ##################
};

export const removeGameReviewByReviewedGameId = async (reviewedGameId) => {
  reviewedGameId = validateObjectID(reviewedGameId);

  // ##################
  // MAKE TRANSACTION

  const deletionInfo = [];
  const gameReviews = await getGameReviewsByReviewedGameId(
    reviewedGameId.toString()
  );
  for (const review of gameReviews) {
    deletionInfo.push(await removeGameReviewById(review._id.toString()));
  }

  return deletionInfo;

  // ^^^^^^^^^^^^^^^^^^
  // ##################
};

export const removeGameReviewById = async (id) => {
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
    deletionInfo.reviewedGame,
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

export const getGameReviewsByReviewedGameId = async (id) => {
  id = validateObjectID(id);

  const gameReviewsCollection = await gameReviews();
  let gameReviewList = await gameReviewsCollection
    .find({
      reviewedGame: id,
    })
    .toArray();
  if (!gameReviewList)
    throw `could not get game reviews for reviewedGame: ${id}.`;
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

export const updateGameReview = async (id, updateFeilds) => {
  id = validateObjectID(id);
  updateFeilds = validateNonEmptyObject(updateFeilds);

  const patchedGameReview = {};
  patchedGameReview.date = new Date().toUTCString();

  if (updateFeilds.reviewedGame !== undefined)
    patchedGameReview.reviewedGame = validateObjectID(
      updateFeilds.reviewedGame
    );

  if (updateFeilds.title !== undefined)
    patchedGameReview.title = validateTitle(updateFeilds.title);

  if (updateFeilds.body !== undefined)
    patchedGameReview.body = validateBody(updateFeilds.body);

  if (updateFeilds.rating !== undefined)
    patchedGameReview.rating = validateRating(updateFeilds.rating);

  // ##################
  // MAKE TRANSACTION

  const oldReview = await getGameReviewById(id.toString());

  // update review
  const gameReviewsCollection = await gameReviews();
  const updateInfo = await gameReviewsCollection.findOneAndUpdate(
    { _id: id },
    { $set: patchedGameReview },
    { returnDocument: "after" }
  );
  if (!updateInfo) throw `could not patch user with id: ${id}.`;

  // update user stats
  if (
    patchedGameReview.reviewedGame &&
    (patchedGameReview.rating || patchedGameReview.rating === 0)
  ) {
    await removeReviewFromGameStats(oldReview.reviewedGame, oldReview.rating);
    await addReviewToGameStats(updateInfo.reviewedGame, updateInfo.rating);
  } else if (patchedGameReview.reviewedGame) {
    await removeReviewFromGameStats(oldReview.reviewedGame, oldReview.rating);
    await addReviewToGameStats(updateInfo.reviewedGame, oldReview.rating);
  } else if (patchedGameReview.rating || patchedGameReview.rating === 0) {
    await removeReviewFromGameStats(oldReview.reviewedGame, oldReview.rating);
    await addReviewToGameStats(oldReview.reviewedGame, updateInfo.rating);
  }

  return updateInfo;

  // ^^^^^^^^^^^^^^^^^^
  // ##################
};
