import { userReviews } from "../config/mongoCollections.js";
import {
  validateBody,
  validateNonEmptyObject,
  validateObjectID,
  validateRating,
  validateTitle,
} from "../utilities/validation.js";
import {
  removeReviewFromUserStats,
  addReviewToUserStats,
} from "./helpers/updateUserStats.js";
import { getUserById } from "./users.js";

export const createUserReview = async (
  postingUser,
  reviewedUser,
  title,
  body,
  rating
) => {
  postingUser = validateObjectID(postingUser);
  reviewedUser = validateObjectID(reviewedUser);
  title = validateTitle(title);
  const date = new Date().toUTCString();
  body = validateBody(body);
  rating = validateRating(rating);

  // make sure postingUser exits
  const postingUserData = await getUserById(postingUser.toString());

  const firstName = postingUserData.firstName;
  const lastName = postingUserData.lastName;
  const username = postingUserData.username;

  const newUserReview = {
    postingUser,
    reviewedUser,
    firstName,
    lastName,
    username,
    title,
    date,
    body,
    rating,
  };

  // make sure postingUser isn't reviewing themselves
  if (postingUser.toString() === reviewedUser.toString())
    throw "user cannot review themselves!";

  // make sure reviewedUser exits
  await getUserById(reviewedUser.toString());

  const userReviewsCollection = await userReviews();

  // make sure postingUser hasn't reviewed reviewedUser
  const userReview = await userReviewsCollection.findOne({
    postingUser: postingUser,
    reviewedUser: reviewedUser,
  });
  if (userReview) throw "user review already exists!";

  // ##################
  // MAKE TRANSACTION

  // update dependencies
  await addReviewToUserStats(reviewedUser, rating);

  // insert review
  const insertInfo = await userReviewsCollection.insertOne(newUserReview);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "could not add user review.";

  const newId = insertInfo.insertedId.toString();
  return await getUserReviewById(newId);

  // ^^^^^^^^^^^^^^^^^^
  // ##################
};

export const removeUserReviewsByReviewedId = async (id) => {
  id = validateObjectID(id);

  // make sure reviewedUser exits
  await getUserById(id.toString());

  // ##################
  // MAKE TRANSACTION

  const deletionInfo = [];
  const userReviewList = await getUserReviewsByReviewedUserId(id.toString());
  for (const review of userReviewList) {
    deletionInfo.push(await removeUserReviewById(review._id.toString()));
  }

  return deletionInfo;

  // ^^^^^^^^^^^^^^^^^^
  // ##################
};

export const removeUserReviewById = async (id) => {
  id = validateObjectID(id);

  // ##################
  // MAKE TRANSACTION

  // delete review
  const userReviewsCollection = await userReviews();
  const deletionInfo = await userReviewsCollection.findOneAndDelete({
    _id: id,
  });
  if (!deletionInfo) throw `could not delete user review with id: ${id}.`;

  // update dependencies
  await removeReviewFromUserStats(
    deletionInfo.reviewedUser,
    deletionInfo.rating
  );

  return deletionInfo;

  // ^^^^^^^^^^^^^^^^^^
  // ##################
};

export const getAllUserReviews = async () => {
  const userReviewsCollection = await userReviews();
  let userReviewList = await userReviewsCollection.find({}).toArray();
  if (!userReviewList) throw "could not get all user reviews.";

  return userReviewList;
};

export const getUserReviewsByReviewedUserId = async (id) => {
  id = validateObjectID(id);

  const userReviewsCollection = await userReviews();
  let userReviewList = await userReviewsCollection
    .find({
      reviewedUser: id,
    })
    .toArray();
  if (!userReviewList)
    throw `could not get game reviews for reviewedGame: ${id}.`;

  return userReviewList;
};

export const getUserReviewsByPostingUserId = async (id) => {
  id = validateObjectID(id);

  const userReviewsCollection = await userReviews();
  let userReviewList = await userReviewsCollection
    .find({
      postingUser: id,
    })
    .toArray();
  if (!userReviewList)
    throw `could not get game reviews for reviewedGame: ${id}.`;

  return userReviewList;
};

export const getUserReviewById = async (id) => {
  id = validateObjectID(id);

  const userReviewsCollection = await userReviews();
  const userReview = await userReviewsCollection.findOne({
    _id: id,
  });
  if (!userReview) throw `no user review with id: ${id}.`;

  return userReview;
};

export const updateUserReview = async (id, updateFeilds) => {
  id = validateObjectID(id);
  updateFeilds = validateNonEmptyObject(updateFeilds);

  const patchedUserReview = {};
  let updated = false;
  patchedUserReview.date = new Date().toUTCString();

  if (updateFeilds.reviewedUser !== undefined) {
    const reviewedUser = validateObjectID(updateFeilds.reviewedUser);

    // make sure reviewedUser exits
    await getUserById(reviewedUser.toString());

    patchedUserReview.reviewedUser = reviewedUser;
    updated = true;
  }

  if (updateFeilds.title !== undefined) {
    patchedUserReview.title = validateTitle(updateFeilds.title);
    updated = true;
  }

  if (updateFeilds.body !== undefined) {
    patchedUserReview.body = validateBody(updateFeilds.body);
    updated = true;
  }

  if (updateFeilds.rating !== undefined) {
    patchedUserReview.rating = validateRating(updateFeilds.rating);
    updated = true;
  }

  if (!updated) throw "must update a field";

  const oldReview = await getUserReviewById(id.toString());

  // user cannot review themselves
  if (
    patchedUserReview.reviewedUser !== undefined &&
    oldReview.postingUser.toString() ===
      patchedUserReview.reviewedUser.toString()
  )
    throw "user cannot review themselves!";

  // ##################
  // MAKE TRANSACTION

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
    patchedUserReview.reviewedUser !== undefined &&
    patchedUserReview.rating !== undefined
  ) {
    await removeReviewFromUserStats(oldReview.reviewedUser, oldReview.rating);
    await addReviewToUserStats(updateInfo.reviewedUser, updateInfo.rating);
  } else if (patchedUserReview.reviewedUser !== undefined) {
    await removeReviewFromUserStats(oldReview.reviewedUser, oldReview.rating);
    await addReviewToUserStats(updateInfo.reviewedUser, oldReview.rating);
  } else if (patchedUserReview.rating !== undefined) {
    await removeReviewFromUserStats(oldReview.reviewedUser, oldReview.rating);
    await addReviewToUserStats(oldReview.reviewedUser, updateInfo.rating);
  }

  return updateInfo;

  // ^^^^^^^^^^^^^^^^^^
  // ##################
};
