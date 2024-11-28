import { users } from "../config/mongoCollections.js";
import {
  validateObjectID,
  validateEmail,
  validateGeoJson,
  validateString,
  validateNonEmptyObject,
  validateName,
  validateUsername,
} from "../utilities/validation.js";
import { removeGamesByOwnerId } from "./games.js";
import {
  updateFirstName,
  updateLastName,
  updateUsername,
} from "./helpers/updatePostingUserName.js";
import { removeUserReviewsByReviewedId } from "./userReviews.js";

export const createUser = async (
  firstName,
  lastName,
  username,
  email,
  hashedPassword,
  location
) => {
  firstName = validateName(firstName);
  lastName = validateName(lastName);
  username = validateUsername(username);
  email = validateEmail(email);
  hashedPassword = validateString(hashedPassword);
  location = validateGeoJson(location);
  const date = new Date().toUTCString();
  const averageRating = 0;
  const numReviews = 0;

  const newUser = {
    firstName,
    lastName,
    username,
    email,
    hashedPassword,
    location,
    date,
    averageRating,
    numReviews,
  };

  const usersCollection = await users();

  // make sure username is unique
  const accountWithUsername = await usersCollection.findOne({
    username: username,
  });
  if (accountWithUsername) throw "username must be unique!";

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

  // delete all reviews about deleted user
  // https://reputationamerica.org/does-deleting-a-google-account-delete-your-reviews/
  await removeUserReviewsByReviewedId(id.toString());

  // delete all games owned by deleted user
  await removeGamesByOwnerId(id.toString());

  // delete user
  const usersCollection = await users();
  const deletionInfo = await usersCollection.findOneAndDelete({
    _id: id,
  });
  if (!deletionInfo) throw `could not delete user with id: ${id}.`;

  return deletionInfo;

  // ^^^^^^^^^^^^^^^^^^
  // ##################
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
  let updated = false;
  patchedUser.date = new Date().toUTCString();

  if (updateFeilds.firstName !== undefined) {
    patchedUser.firstName = validateName(updateFeilds.firstName);
    updated = true;
  }

  if (updateFeilds.lastName !== undefined) {
    patchedUser.lastName = validateName(updateFeilds.lastName);
    updated = true;
  }

  if (updateFeilds.hashedPassword !== undefined) {
    patchedUser.hashedPassword = validateString(updateFeilds.hashedPassword);
    updated = true;
  }

  if (updateFeilds.location !== undefined) {
    patchedUser.location = validateGeoJson(updateFeilds.location);
    updated = true;
  }

  const usersCollection = await users();

  if (updateFeilds.username !== undefined) {
    patchedUser.username = validateUsername(updateFeilds.username);

    // make sure the email isn't used by another user
    const accountWithUsername = await usersCollection.findOne({
      _id: { $ne: id },
      username: patchedUser.username,
    });
    if (accountWithUsername) throw "username must be unique!";
    updated = true;
  }

  if (updateFeilds.email !== undefined) {
    patchedUser.email = validateString(updateFeilds.email);

    // make sure the email isn't used by another user
    const accountWithEmail = await usersCollection.findOne({
      _id: { $ne: id },
      email: patchedUser.email,
    });
    if (accountWithEmail) throw "email must be unique!";
    updated = true;
  }

  if (!updated) throw "must update a field";

  // ##################
  // MAKE TRANSACTION

  // update dependencies
  if (patchedUser.firstName !== undefined) {
    await updateFirstName(id, patchedUser.firstName);
  }

  if (patchedUser.lastName !== undefined) {
    await updateLastName(id, patchedUser.lastName);
  }

  if (patchedUser.username !== undefined) {
    await updateUsername(id, patchedUser.username);
  }

  // update user
  const updateInfo = await usersCollection.findOneAndUpdate(
    { _id: id },
    { $set: patchedUser },
    { returnDocument: "after" }
  );
  if (!updateInfo) throw `could not patch user with id: ${id}.`;

  return updateInfo;

  // ^^^^^^^^^^^^^^^^^^
  // ##################
};
