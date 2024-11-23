import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import {
  validateObjectID,
  validateEmail,
  validateGeoJson,
  validateNumber,
  validateString,
} from "../utilities/validation.js";

const createUser = async (
  firstName,
  lastName,
  email,
  hashedPassword,
  location,
  averageRating
) => {
  firstName = validateString(firstName);
  lastName = validateString(lastName);
  email = validateEmail(email);
  hashedPassword = validateString(hashedPassword);
  location = validateGeoJson(location);
  averageRating = validateNumber(averageRating);

  const newUser = {
    firstName,
    lastName,
    email,
    hashedPassword,
    location,
    averageRating,
  };

  const usersCollection = await users();
  const insertInfo = await usersCollection.insertOne(newUser);

  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "could not add user.";

  const newId = insertInfo.insertedId.toString();

  return await getUserById(newId);
};

const getAllUsers = async () => {
  const usersCollection = await users();
  let userList = await usersCollection.find({});
  if (!userList) throw "could not get all users.";
  return userList;
};

const getUserById = async (id) => {
  id = validateObjectID(id);

  const usersCollection = await users();
  const user = await usersCollection.findOne({
    _id: ObjectId.createFromHexString(id),
  });

  if (user === null) throw `no user with id: ${id}.`;

  return user;
};

const removeUser = async (id) => {
  id = validateObjectID(id);

  const usersCollection = await users();
  const deletionInfo = await usersCollection.findOneAndDelete({
    _id: ObjectId.createFromHexString(id),
  });

  if (!deletionInfo) throw `could not delete user with id: ${id}.`;

  return deletionInfo;
};

const updateUser = async (
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

export { createUser, getAllUsers, getUserById, removeUser, updateUser };
