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

  // make sure postingUser exits
  const usersCollection = await users();
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

  // insert review
  const insertInfo = await userReviewsCollection.insertOne(newUserReview);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "could not add user review.";

  const newId = insertInfo.insertedId.toString();

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

  return await getUserById(newId);
};

export const removeUserReview = async (id) => {
  id = validateObjectID(id);

  // delete review
  const userReviewsCollection = await userReviews();
  const deletionInfo = await userReviewsCollection.findOneAndDelete({
    _id: ObjectId.createFromHexString(id),
  });
  if (!deletionInfo) throw `could not delete user review with id: ${id}.`;

  // find reviewedUser
  const usersCollection = await users();
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

export const replaceUserReview = async (
  id,
  reviewedUser,
  title,
  body,
  rating
) => {
  id = validateObjectID(id);
  reviewedUser = validateObjectID(reviewedUser);
  title = validateString(title);
  date = getTimeStamp();
  body = validateString(body);
  rating = validateRating(rating);

  const updatedUserReview = {
    reviewedUser,
    title,
    date,
    body,
    rating,
  };

  // update review
  const userReviewsCollection = await userReviews();
  const updateInfo = await userReviewsCollection.findOneAndUpdate(
    { _id: ObjectId.createFromHexString(id) },
    updatedUserReview,
    { returnDocument: "after" }
  );
  if (!updateInfo) throw `could not update user review with id: ${id}.`;

  // TO DO: update user stats

  return updateInfo;
};

export const patchUserReview = async (id, updateFeilds) => {
  id = validateObjectID(id);
  updateFeilds = validateNonEmptyObject(updateFeilds);

  const patchedUserReview = {};
  patchedUserReview.date = getTimeStamp();

  if (updateFeilds.reviewedUser) {
    patchedUserReview.reviewedUser = validateString(updateFeilds.reviewedUser);
    // TO DO: update user stats
  }

  if (updateFeilds.title) {
    patchedUserReview.title = validateString(updateFeilds.title);
  }

  if (updateFeilds.body) {
    patchedUserReview.body = validateString(updateFeilds.body);
  }

  if (updateFeilds.rating) {
    patchedUserReview.rating = validateString(updateFeilds.rating);
    // TO DO: update user stats
  }

  const userReviewsCollection = await userReviews();
  const updateInfo = await userReviewsCollection.findOneAndUpdate(
    { _id: ObjectId.createFromHexString(id) },
    patchedUserReview,
    { returnDocument: "after" }
  );

  if (!updateInfo) throw `could not patch user with id: ${id}.`;

  return updateInfo;
};
