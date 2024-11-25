import { gameReviews, games } from "../config/mongoCollections.js";
import {
  validateBody,
  validateCondition,
  validateGeoJson,
  validateNonEmptyObject,
  validateObjectID,
  validateString,
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
    throw "could not add game.";

  const newId = insertInfo.insertedId.toString();
  return await getGameById(newId);
};

export const removeGamesByOwnerId = async (ownerID) => {
  ownerID = validateString(ownerID);

  // ##################
  // MAKE TRANSACTION

  const deletionInfo = [];
  const games = await getGamesByOwnerID(ownerID);
  for (const game of games) {
    deletionInfo.push(await removeGameById(game._id.toString()));
  }

  // ^^^^^^^^^^^^^^^^^^
  // ##################

  return deletionInfo;
};

export const removeGameById = async (id) => {
  id = validateObjectID(id);

  // ##################
  // MAKE TRANSACTION

  // delete game
  const gamesCollection = await games();
  const deletionInfo = await gamesCollection.findOneAndDelete({
    _id: id,
  });
  if (!deletionInfo) throw `could not delete game with id: ${id}.`;

  // delete all reviews about deleted game
  const gameReviewsCollection = await gameReviews();
  const deletionConfirmation = await gameReviewsCollection.deleteMany({
    reviewedGame: id,
  });
  if (!deletionConfirmation.acknowledged)
    throw `could not delete game reviews for deleted game: ${id}`;

  // ^^^^^^^^^^^^^^^^^^
  // ##################

  return deletionInfo;
};

export const getAllGames = async () => {
  const gamesCollection = await games();
  let gameList = await gamesCollection.find({}).toArray();
  if (!gameList) throw "could not get all games.";

  return gameList;
};

export const getGamesByOwnerID = async (ownerID) => {
  ownerID = validateObjectID(ownerID);

  const gamesCollection = await games();
  const gameList = await gamesCollection
    .find({
      ownerID: ownerID,
    })
    .toArray();
  if (!gameList) throw `no game with ownerID: ${ownerID}.`;

  return gameList;
};

export const getGameById = async (id) => {
  id = validateObjectID(id);

  const gamesCollection = await games();
  const game = await gamesCollection.findOne({
    _id: id,
  });
  if (!game) throw `no game with id: ${id}.`;

  return game;
};

export const updateGame = async (id, updateFeilds) => {
  id = validateObjectID(id);
  updateFeilds = validateNonEmptyObject(updateFeilds);

  const patchedGame = {};
  patchedGame.datePosted = new Date().toUTCString();

  if (updateFeilds.location) {
    patchedGame.location = validateGeoJson(updateFeilds.location);
  }

  if (updateFeilds.gameTitle) {
    patchedGame.gameTitle = validateTitle(updateFeilds.gameTitle);
  }

  if (updateFeilds.description) {
    patchedGame.description = validateBody(updateFeilds.description);
  }

  if (updateFeilds.condition) {
    patchedGame.condition = validateCondition(updateFeilds.condition);
  }

  if (updateFeilds.imgURL) {
    patchedGame.imgURL = validateURL(updateFeilds.imgURL);
  }

  // update game
  const gamesCollection = await games();
  const updateInfo = await gamesCollection.findOneAndUpdate(
    { _id: id },
    { $set: patchedGame },
    { returnDocument: "after" }
  );
  if (!updateInfo) throw `could not patch game with id: ${id}.`;

  return updateInfo;
};
