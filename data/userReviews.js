import { userReviews } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import {
  validateDate,
  validateInteger,
  validateObjectID,
  validateString,
} from "../utilities/validation.js";

export const createUserReview = async (
  postingUser,
  reviewedUser,
  title,
  date,
  body,
  rating
) => {
  postingUser = validateObjectID(postingUser);
  reviewedUser = validateObjectID(reviewedUser);
  title = validateString(title);
  date = validateDate(date);
  body = validateString(body);
  rating = validateInteger(rating);

  const newUserReview = {
    postingUser,
    reviewedUser,
    title,
    date,
    body,
    rating,
  };

  const userReviewsCollection = await userReviews();
  const insertInfo = await userReviewsCollection.insertOne(newUserReview);

  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "could not add user review.";

  const newId = insertInfo.insertedId.toString();

  return await getUserById(newId);
};

// TO DO
export const removeUser = async (id) => {
  id = validateObjectID(id);

  const usersCollection = await users();
  const deletionInfo = await usersCollection.findOneAndDelete({
    _id: ObjectId.createFromHexString(id),
  });

  if (!deletionInfo) throw `could not delete user with id: ${id}.`;

  return deletionInfo;
};

export const getAllUsers = async () => {
  const usersCollection = await users();
  let userList = await usersCollection.find({});
  if (!userList) throw "could not get all users.";
  return userList;
};

export const getUserById = async (id) => {
  id = validateObjectID(id);

  const usersCollection = await users();
  const user = await usersCollection.findOne({
    _id: ObjectId.createFromHexString(id),
  });

  if (user === null) throw `no user with id: ${id}.`;

  return user;
};

export const replaceUser = async (
  id,
  firstName,
  lastName,
  email,
  hashedPassword,
  location,
  averageRating
) => {
  id = validateObjectID(id);
  firstName = validateString(firstName);
  lastName = validateString(lastName);
  email = validateEmail(email);
  hashedPassword = validateString(hashedPassword);
  location = validateGeoJson(location);
  averageRating = validateNumber(averageRating);

  const updatedUser = {
    firstName,
    lastName,
    email,
    hashedPassword,
    location,
    averageRating,
  };

  const usersCollection = await users();
  const updateInfo = await usersCollection.findOneAndReplace(
    { _id: ObjectId.createFromHexString(id) },
    updatedUser,
    { returnDocument: "after" }
  );

  if (!updateInfo) throw `could not update user with id: ${id}.`;

  return updateInfo;
};

export const patchUser = async (id, updateFeilds) => {
  id = validateObjectID(id);
  updateFeilds = validateNonEmptyObject(updateFeilds);

  const patchedUser = {};
  if (updateFeilds.firstName) {
    patchedUser.firstName = validateString(updateFeilds.firstName);
  }

  if (updateFeilds.lastName) {
    patchedUser.lastName = validateString(updateFeilds.lastName);
  }

  if (updateFeilds.email) {
    patchedUser.email = validateString(updateFeilds.email);
  }

  if (updateFeilds.hashedPassword) {
    patchedUser.hashedPassword = validateString(updateFeilds.hashedPassword);
  }

  if (updateFeilds.location) {
    patchedUser.location = validateString(updateFeilds.location);
  }

  if (updateFeilds.averageRating) {
    patchedUser.averageRating = validateString(updateFeilds.averageRating);
  }

  const usersCollection = await users();
  const updateInfo = await usersCollection.findOneAndUpdate(
    { _id: ObjectId.createFromHexString(id) },
    patchedUser,
    { returnDocument: "after" }
  );

  if (!updateInfo) throw `could not patch user with id: ${id}.`;

  return updateInfo;
};
