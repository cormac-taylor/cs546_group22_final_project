import { gameReviews, games } from "../config/mongoCollections.js";
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
  gameTitle,
  description,
  condition,
  imgURL
) => {
  ownerID = validateObjectID(ownerID);
  location = validateGeoJson(location);
  gameTitle = validateTitle(gameTitle);
  description = validateBody(description);
  condition = validateCondition(condition);
  const datePosted = new Date().toUTCString();
  imgURL = validateURL(imgURL);

  const newGame = {
    ownerID,
    location,
    gameTitle,
    description,
    condition,
    datePosted,
    imgURL,
  };

  // add new game
  const gamesCollection = await games();
  const insertInfo = await gamesCollection.insertOne(newGame);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "could not add user.";

  const newId = insertInfo.insertedId.toString();
  return await getUserById(newId);
};

export const removeGame = async (id) => {
  id = validateObjectID(id);

  // ##################
  // MAKE TRANSACTION

  // delete game
  const gamesCollection = await games();
  const deletionInfo = await gamesCollection.findOneAndDelete({
    _id: id,
  });
  if (!deletionInfo) throw `could not delete user with id: ${id}.`;

  // delete all reviews about deleted game
  const gameReviewsCollection = await gameReviews();
  const deletionConfirmation = await gameReviewsCollection.deleteMany({
    reviewedGame: id,
  });
  if (!deletionConfirmation.acknowledged)
    throw `could not delete user reviews for deleted user: ${id}`;

  // ^^^^^^^^^^^^^^^^^^
  // ##################

  return deletionInfo;
};

export const getAllGames = async () => {
  const gamesCollection = await games();
  let gameList = await gamesCollection.find({}).toArray();
  if (!gameList) throw "could not get all users.";

  return gameList;
};

export const getGameById = async (id) => {
  id = validateObjectID(id);

  const gamesCollection = await games();
  const game = await gamesCollection.findOne({
    _id: id,
  });
  if (!game) throw `no user with id: ${id}.`;

  return game;
};

// TO DO ########################################################################################################################
// Also helpers for user functions
export const updateGame = async (id, updateFeilds) => {
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
