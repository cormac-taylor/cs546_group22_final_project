import { games } from "../config/mongoCollections.js";
import {
  validateBody,
  validateCondition,
  validateGeoJson,
  validateObjectID,
  validateTitle,
  validateURL,
} from "../utilities/validation.js";

export const createGame = async (
  ownerID,
  location,
  name,
  description,
  condition,
  imgURL
) => {
  // HERE ########################################################################################################
  ownerID = validateObjectID(ownerID);
  location = validateGeoJson(location);
  name = validateTitle(name);
  description = validateBody(description);
  condition = validateCondition(condition);
  const datePosted = new Date().toUTCString();
  imgURL = validateURL(imgURL);

  const newUser = {
    ownerID,
    location,
    name,
    description,
    condition,
    datePosted,
    imgURL,
  };

  const usersCollection = await users();

  // make sure email is unique
  const accountWithEmail = await usersCollection.findOne({
    email: email,
  });
  if (accountWithEmail) throw "email must be unique!";

  // add new user
  const insertInfo = await usersCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "could not add user.";

  const newId = insertInfo.insertedId.toString();
  return await getUserById(newId);
};

export const removeUser = async (id) => {
  id = validateObjectID(id);

  // ##################
  // MAKE TRANSACTION

  // delete user
  const usersCollection = await users();
  const deletionInfo = await usersCollection.findOneAndDelete({
    _id: id,
  });
  if (!deletionInfo) throw `could not delete user with id: ${id}.`;

  // delete all reviews about deleted user
  // https://reputationamerica.org/does-deleting-a-google-account-delete-your-reviews/
  const usersReviewsCollection = await userReviews();
  const deletionConfirmation = await usersReviewsCollection.deleteMany({
    reviewedUser: id,
  });
  if (!deletionConfirmation.acknowledged)
    throw `could not delete user reviews for deleted user: ${id}`;

  // ^^^^^^^^^^^^^^^^^^
  // ##################

  return deletionInfo;
};

export const getAllUsers = async () => {
  const usersCollection = await users();
  let userList = await usersCollection.find({}).toArray();
  if (!userList) throw "could not get all users.";

  return userList;
};

export const getUserById = async (id) => {
  id = validateObjectID(id);

  const usersCollection = await users();
  const user = await usersCollection.findOne({
    _id: id,
  });
  if (!user) throw `no user with id: ${id}.`;

  return user;
};

export const updateUser = async (id, updateFeilds) => {
  id = validateObjectID(id);
  updateFeilds = validateNonEmptyObject(updateFeilds);

  const patchedUser = {};
  if (updateFeilds.firstName) {
    patchedUser.firstName = validateName(updateFeilds.firstName);
  }

  if (updateFeilds.lastName) {
    patchedUser.lastName = validateName(updateFeilds.lastName);
  }

  if (updateFeilds.hashedPassword) {
    patchedUser.hashedPassword = validateString(updateFeilds.hashedPassword);
  }

  if (updateFeilds.location) {
    patchedUser.location = validateGeoJson(updateFeilds.location);
  }

  const usersCollection = await users();

  if (updateFeilds.email) {
    patchedUser.email = validateString(updateFeilds.email);

    // make sure the email isn't used by another user
    const accountWithEmail = await usersCollection.findOne({
      _id: { $ne: id },
      email: patchedUser.email,
    });
    if (accountWithEmail) throw "email must be unique!";
  }

  // update user
  const updateInfo = await usersCollection.findOneAndUpdate(
    { _id: id },
    { $set: patchedUser },
    { returnDocument: "after" }
  );
  if (!updateInfo) throw `could not patch user with id: ${id}.`;

  return updateInfo;
};