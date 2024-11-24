import { userReviews, users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import {
  validateObjectID,
  validateRating,
  validateString,
} from "../utilities/validation.js";
import { getTimeStamp } from "../utilities/timeStamp.js";

export const createUserReview = async (
  postingUser,
  reviewedUser,
  title,
  body,
  rating
) => {
  postingUser = validateObjectID(postingUser);
  reviewedUser = validateObjectID(reviewedUser);
  title = validateString(title);
  date = getTimeStamp();
  body = validateString(body);
  rating = validateRating(rating);

  const newUserReview = {
    postingUser,
    reviewedUser,
    title,
    date,
    body,
    rating,
  };

  const usersCollection = await users();

  // make sure postingUser exits
  const postingUserData = await usersCollection.findOne({
    _id: ObjectId.createFromHexString(postingUser),
  });
  if (!postingUserData) throw "postingUser doesn't exist.";

  // make sure reviewedUser exits
  const reviewedUserData = await usersCollection.findOne({
    _id: ObjectId.createFromHexString(reviewedUser),
  });
  if (!reviewedUserData) throw "reviewedUser doesn't exist.";

  const userReviewsCollection = await userReviews();

  // make sure postingUser hasn't reviewed reviewedUser
  const userReview = await userReviewsCollection.findOne({
    postingUser: ObjectId.createFromHexString(postingUser),
    reviewedUser: ObjectId.createFromHexString(reviewedUser),
  });
  if (userReview) throw "user review already exists!";

  // ##################
  // MAKE TRANSACTION
  // ##################

  // insert review
  const insertInfo = await userReviewsCollection.insertOne(newUserReview);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "could not add user review.";

  // calculate new reviewedUser stats
  const newNumReviews = reviewedUserData.numReviews++;
  let newAverageRating;
  if (newNumReviews === 1) {
    newAverageRating = rating;
  } else {
    newAverageRating = (
      (Math.round(
        reviewedUserData.averageRating * reviewedUserData.numReviews
      ) +
        rating) /
      newNumReviews
    ).toFixed(2);
  }

  // update reviewedUser with stats
  const reviewedUserUpdated = await usersCollection.findOneAndUpdate(
    { _id: ObjectId.createFromHexString(reviewedUser) },
    { averageRating: newAverageRating, numReviews: newNumReviews },
    { returnDocument: "after" }
  );
  if (!reviewedUserUpdated) throw `could not update user with id: ${id}.`;

  const newId = insertInfo.insertedId.toString();
  return await getUserById(newId);
};

export const removeUserReview = async (id) => {
  id = validateObjectID(id);

  // ##################
  // MAKE TRANSACTION
  // ##################

  // delete review
  const userReviewsCollection = await userReviews();
  const deletionInfo = await userReviewsCollection.findOneAndDelete({
    _id: ObjectId.createFromHexString(id),
  });
  if (!deletionInfo) throw `could not delete user review with id: ${id}.`;

  const usersCollection = await users();

  // find reviewedUser
  const reviewedUserData = await usersCollection.findOne({
    _id: ObjectId.createFromHexString(deletionInfo.reviewedUser),
  });
  if (!reviewedUserData) throw "reviewedUser doesn't exist.";

  // calculate new reviewedUser stats
  const newNumReviews = reviewedUserData.numReviews--;
  let newAverageRating;
  if (newNumReviews === 0) {
    newAverageRating = undefined;
  } else {
    newAverageRating = (
      (Math.round(
        reviewedUserData.averageRating * reviewedUserData.numReviews
      ) -
        deletionInfo.rating) /
      newNumReviews
    ).toFixed(2);
  }

  // update reviewedUser with stats
  const reviewedUserUpdated = await usersCollection.findOneAndUpdate(
    { _id: ObjectId.createFromHexString(deletionInfo.reviewedUser) },
    { averageRating: newAverageRating, numReviews: newNumReviews },
    { returnDocument: "after" }
  );
  if (!reviewedUserUpdated) throw `could not update user with id: ${id}.`;

  return deletionInfo;
};

export const getAllUserReviews = async () => {
  const userReviewsCollection = await userReviews();
  let userReviewList = await userReviewsCollection.find({});
  if (!userReviewList) throw "could not get all user reviews.";
  return userReviewList;
};

export const getUserReviewById = async (id) => {
  id = validateObjectID(id);

  const userReviewsCollection = await userReviews();
  const userReview = await userReviewsCollection.findOne({
    _id: ObjectId.createFromHexString(id),
  });
  if (!userReview) throw `no user review with id: ${id}.`;

  return userReview;
};

export const updateUserReview = async (id, updateFeilds) => {
  id = validateObjectID(id);
  updateFeilds = validateNonEmptyObject(updateFeilds);

  const patchedUserReview = {};
  patchedUserReview.date = getTimeStamp();

  if (updateFeilds.reviewedUser)
    patchedUserReview.reviewedUser = validateString(updateFeilds.reviewedUser);

  if (updateFeilds.title)
    patchedUserReview.title = validateString(updateFeilds.title);

  if (updateFeilds.body)
    patchedUserReview.body = validateString(updateFeilds.body);

  if (updateFeilds.rating)
    patchedUserReview.rating = validateString(updateFeilds.rating);

  // ##################
  // MAKE TRANSACTION
  // ##################

  const userReviewsCollection = await userReviews();
  const updateInfo = await userReviewsCollection.findOneAndUpdate(
    { _id: ObjectId.createFromHexString(id) },
    patchedUserReview,
    { returnDocument: "after" }
  );
  if (!updateInfo) throw `could not patch user with id: ${id}.`;

  if (patchedUserReview.reviewedUser && patchedUserReview.rating) {
    // undo old reviewed user with old review
    // update new reviewed user with new review
  } else if (patchedUserReview.reviewedUser) {
    // undo old reviewed user with old review
    // update new reviewed user with old review
  } else if (patchedUserReview.rating) {
    // update reviewed user stats with new rating
  }

  return updateInfo;
};
