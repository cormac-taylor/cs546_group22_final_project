import { games } from "../config/mongoCollections.js";
import * as turf from '@turf/turf'

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
import { removeGameReviewsByReviewedGameId } from "./gameReviews.js";
import { getUserById } from "./users.js";

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
  const averageRating = 0;
  const numReviews = 0;

  const newGame = {
    ownerID,
    location,
    gameTitle,
    description,
    condition,
    datePosted,
    imgURL,
    averageRating,
    numReviews,
  };

  // make sure postingUser exits
  await getUserById(ownerID.toString());

  // add new game
  const gamesCollection = await games();
  const insertInfo = await gamesCollection.insertOne(newGame);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "could not add game.";

  const newId = insertInfo.insertedId.toString();
  return await getGameById(newId);
};

export const removeGamesByOwnerId = async (id) => {
  id = validateString(ownerID);

  await getUserById(id.toString());

  // ##################
  // MAKE TRANSACTION

  const deletionInfo = [];
  const games = await getGamesByOwnerID(id);
  for (const game of games) {
    deletionInfo.push(await removeGameById(game._id.toString()));
  }

  return deletionInfo;

  // ^^^^^^^^^^^^^^^^^^
  // ##################
};

export const removeGameById = async (id) => {
  id = validateObjectID(id);

  // ##################
  // MAKE TRANSACTION

  // delete all reviews about deleted game
  await removeGameReviewsByReviewedGameId(id.toString());

  // delete game
  const gamesCollection = await games();
  const deletionInfo = await gamesCollection.findOneAndDelete({
    _id: id,
  });
  if (!deletionInfo) throw `could not delete game with id: ${id}.`;

  return deletionInfo;

  // ^^^^^^^^^^^^^^^^^^
  // ##################
};

export const getAllGames = async () => {
  const gamesCollection = await games();
  let gameList = await gamesCollection.find({}).toArray();
  if (!gameList) throw "could not get all games.";

  return gameList;
};

export const getGamesByOwnerID = async (id) => {
  id = validateObjectID(id);

  const gamesCollection = await games();
  const gameList = await gamesCollection
    .find({
      ownerID: id,
    })
    .toArray();
  if (!gameList) throw `no game with ownerID: ${id}.`;

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

/* Patches game update. Takes in gameId and an object with fields to update */
export const updateGame = async (id, updateFeilds) => {
  id = validateObjectID(id);
  updateFeilds = validateNonEmptyObject(updateFeilds);

  const patchedGame = {};
  let updated = false;
  let userReq = {}; 
  patchedGame.datePosted = new Date().toUTCString();

  if (updateFeilds.location !== undefined) {
    patchedGame.location = validateGeoJson(updateFeilds.location);
    updated = true;
  }

  if (updateFeilds.gameTitle !== undefined) {
    patchedGame.gameTitle = validateTitle(updateFeilds.gameTitle);
    updated = true;
  }

  if (updateFeilds.description !== undefined) {
    patchedGame.description = validateBody(updateFeilds.description);
    updated = true;
  }

  if (updateFeilds.condition !== undefined) {
    patchedGame.condition = validateCondition(updateFeilds.condition);
    updated = true;
  }

  if (updateFeilds.imgURL !== undefined) {
    patchedGame.imgURL = validateURL(updateFeilds.imgURL);
    updated = true;
  }
  /* Adds request to this game's request field */
  /* Throws error on self request and multiple request */
  if (updateFeilds.userRequest !== undefined){
    const userRequest = updateFeilds.userRequest
    userReq.reqUserId = validateObjectID(userRequest.reqUserId);
    userReq.message = validateString(userRequest.message);
    const currGame = await getGameById(id.toString()); // Here id refers to the gameId
    if (userReq.reqUserId.toString() === currGame.ownerID.toString()) throw `Error: You cannot request your own games.`
    if (currGame.requests){
        for (let req of currGame.requests){ // for each request in the requests array 
            if (req.reqUserId.toString() === userReq.reqUserId.toString()) throw `Error: You've already requested this game.`
        }
    }
    updated = true;
  }

  if (!updated) throw "must update a field";

  const gamesCollection = await games();

  /* Define the update operations. Conditional push into the requests array if a request for this game was made: */
  const updateOps = {$set: patchedGame};
  if (userReq !== undefined){
    updateOps.$push = {requests: userReq};
  }

  /* Update the games collection */
  const updateInfo = await gamesCollection.findOneAndUpdate(
    { _id: id },
    updateOps,
    { returnDocument: "after" }
  );
  if (!updateInfo) throw `could not patch game with id: ${id}.`;

  return updateInfo;
};

/* Returns the list of active requests for games owned by user.
    If no requests, returns empty list */
export const getRequestedGames = async (userId) =>{
    let gameList;
    try{
        /* getGamesByOwnerId throws error if there are no games */
        gameList = await getGamesByOwnerID(userId)
    } catch (e){
        return [];
    }
    let reqList = [];
    for (let game of gameList){ //Iterate through list of games owned by user
        let reqArray = game.requests
        if (reqArray) {
            reqList = reqList.concat(reqArray);   //Push active requests into reqList
        }
    }
    return reqList;
};

export const sortByClosestLocation = async (userLoc) => {
  userLoc = validateGeoJson(userLoc);
  let gameList = await getAllGames();
  gameList.sort((a,b) => turf.distance(a.location.geometry, userLoc, {units: 'miles'}) - turf.distance(b.location.geometry, userLoc, {units: 'miles'}));
  return gameList;
}