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

  const newUserReview = {
    postingUser,
    reviewedUser,
    title,
    date,
    body,
    rating,
  };

  // make sure postingUser isn't reviewing themselves
  if (postingUser.toString() === reviewedUser.toString())
    throw "user cannot review themselves!";

  // make sure postingUser exits
  await getUserById(postingUser.toString());

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

  // insert review
  const insertInfo = await userReviewsCollection.insertOne(newUserReview);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "could not add user review.";

  await addReviewToUserStats(reviewedUser, rating);

  const newId = insertInfo.insertedId.toString();
  return await getUserReviewById(newId);

  // ^^^^^^^^^^^^^^^^^^
  // ##################
};
export const removeUserReviewsByReviewedId = async (id) => {
  id = validateObjectID(id);

  const userReviewsCollection = await userReviews();
  const deletionConfirmation = await userReviewsCollection.deleteMany({
    reviewedUser: id,
  });
  if (!deletionConfirmation.acknowledged)
    throw `could not delete user reviews for deleted user: ${id}`;
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
    await removeReviewFromUserStats(oldReview.reviewedUser, oldReview.rating);
    await addReviewToUserStats(updateInfo.reviewedUser, updateInfo.rating);
  } else if (patchedUserReview.reviewedUser) {
    await removeReviewFromUserStats(oldReview.reviewedUser, oldReview.rating);
    await addReviewToUserStats(updateInfo.reviewedUser, oldReview.rating);
  } else if (patchedUserReview.rating || patchedUserReview.rating === 0) {
    await removeReviewFromUserStats(oldReview.reviewedUser, oldReview.rating);
    await addReviewToUserStats(oldReview.reviewedUser, updateInfo.rating);
  }

  return updateInfo;

  // ^^^^^^^^^^^^^^^^^^
  // ##################
};
