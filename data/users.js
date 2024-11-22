import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import { isValidObjectID } from "../utilities/validation.js";

const createUser = async (
  firstName,
  lastName,
  email,
  hashedPassword,
  location,
  averageRating,
) => {

// arg validation

  const newUser = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
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
  let userList = await usersCollection
    .find({});

  if (!userList) throw "could not get all users.";
  return userList;
};

const getUserById = async (id) => {
  if (!isValidObjectID(id))
    throw "id must be a valid object ID.";

  id = id.trim();

  const usersCollection = await users();
  const user = await usersCollection.findOne({
    _id: ObjectId.createFromHexString(id),
  });

  if (user === null) throw `no user with id: ${id}.`;

  return user;
};

const removeUser = async (id) => {
    if (!isValidObjectID(id))
        throw "id must be a valid object ID.";
    
  id = id.trim();

  const usersCollection = await users();
  const deletionInfo = await usersCollection.findOneAndDelete({
    _id: ObjectId.createFromHexString(id),
  });

  if (!deletionInfo) throw `could not delete team with id: ${id}.`;

  return `account associated with ${deletionInfo.email} has been removed.`;
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
  if (!isValidObjectID(id))
    throw "id must be a valid object ID.";

// validate args

  id = id.trim();

  const updatedUser = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
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

  if (!updateInfo) throw "could not update user.";

  return updateInfo;
};

export { createUser, getAllUsers, getUserById, removeUser, updateUser };
