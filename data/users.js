import { ObjectId } from "mongodb";
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
import bcrypt from 'bcrypt';

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
  console.log(`${hashedPassword}`);
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
  if (accountWithUsername) throw "Sorry, that username is already taken.";

  // make sure email is unique
  const accountWithEmail = await usersCollection.findOne({
    email: email,
  });
  if (accountWithEmail) throw "Sorry, that email is already taken.";

  // add new user
  const insertInfo = await usersCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "Account could not be created.";

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

/**
 * Finds the entry in the database by username
 * @param username The user entered username.
 */
export const getUserByUsername = async (username) => {
    username = validateUsername(username);
  
    const usersCollection = await users();
    const user = await usersCollection.findOne({
      username: username,
    });
    if (!user) throw `no user with username: ${username}.`;
    
    return user;
};

/* Patch format update. Takes an updateObj and only updates what's provided */
export const updateUser = async (id, updateObj) => {
    const usersCollection = await users();
    if (Object.keys(updateObj).length === 0) throw `Error: No fields to update.`;

    //Build the update query
    const updatedUser = {};
    if (updateObj.firstName) updatedUser.firstName = validateName(updateObj.firstName);
    if (updateObj.lastName) updatedUser.lastName = validateName(updateObj.lastName);
    if (updateObj.username){
        const existingUsername = await usersCollection.findOne({username: updateObj.username});
        if (existingUsername) throw `Error: ${updateObj.username} is taken.`;
        updatedUser.username = validateUsername(updateObj.username);
    };
    if (updateObj.email){
        const existingEmail = await usersCollection.findOne({email: updateObj.email});
        if (existingEmail) throw `Error: ${updateObj.email} is taken.`;
        updatedUser.email = validateEmail(updateObj.email);
    };
    if (updateObj.password){
        const saltRounds = 10;
        const hash = await bcrypt.hash(plainTextPass, saltRounds);
        updatedUser.password = hash;
    };
    if (updateObj.location) updatedUser.location = validateGeoJson(updateObj.location);

    const patchedUser = await usersCollection.findOneAndUpdate(
        {_id: new ObjectId(id)},
        {$set: {...updatedUser}},
        {returnDocument: 'after'}
    );
    console.log('Here');
    if (!patchedUser) throw `Error: Could not update profile successfully`;

    return patchedUser;
};
