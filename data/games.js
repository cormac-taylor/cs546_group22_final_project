import { games } from "../config/mongoCollections.js";
import * as turf from '@turf/turf'

import {
  validateBody,
  validateCondition,
  validateFloat,
  validateGeoJson,
  validateNonEmptyObject,
  validateObjectID,
  validateString,
  validateTitle,
  validateURL,
} from "../utilities/validation.js";
import { removeGameReviewsByReviewedGameId } from "./gameReviews.js";
import { getUserById } from "./users.js";
import { ObjectId } from "mongodb";

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
  let requests = [];

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
    requests,
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
    userReq.reqUserId = validateObjectID(userRequest.reqUserId.toString());
    userReq.message = userRequest.message;
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
  if (updateFeilds.userRequest !== undefined){
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

    //Iterate through list of games owned by user
    let reqList = [];
    for (let game of gameList){ 
        let reqArray = game.requests
        if (reqArray) {
            reqList = reqList.concat(reqArray);   //Push active requests into reqList
        }
    }
    return reqList;
};

/* Marks game object as borrowed by borrower. Removes request from gameObj*/
export const handleRequest = async (gameId, reqUserId, approval) =>{
    gameId = validateObjectID(gameId);
    reqUserId = validateObjectID(reqUserId);
    let game = await getGameById(gameId.toString());
    if(game.borrowed && approval) {
      throw 'Error: Game is already borrowed'
    }
    const gamesCollection = await games();
    let borrowed = false;
    /* If borrowed, enter the requesting userId. If not, leave field false */
    if (approval) borrowed = reqUserId;

    const updatedGame = await gamesCollection.findOneAndUpdate(
        {_id: gameId},
        {$set: {'borrowed': borrowed}, $pull: {requests: {'reqUserId': reqUserId}}},
        {returnDocument: 'after'}
    );
    if (!updatedGame) throw `Error: Could not remove request successfully.`;
    return updatedGame;
};

/* Adds a request object {reqUserId, msg} to the identified game*/
export const requestGame = async (gameId, reqUserId, message) => {
    gameId = validateObjectID(gameId);
    reqUserId = validateObjectID(reqUserId);

    let updateObj = {
        userRequest: {
            reqUserId: reqUserId,   // User making Request
            message: message
        }
    };

    const updatedGame = await updateGame(gameId.toString(), updateObj);
    if (!updatedGame) throw `Error: Could not successfully request game.`
    return updatedGame;
};

/* Returns the request object in the game from the requesting user */
export const returnRequest = async (gameId, reqUserId) => {
    gameId = validateObjectID(gameId);
    reqUserId = validateObjectID(reqUserId);
    const gamesCollection = await games();

    const reqBody = await gamesCollection.findOne(
        {_id: gameId, 'requests.reqUserId': reqUserId},
        {projection: {'requests.$': 1}}
    );

    if (!reqBody) throw `Error: Could not return request successfully.`;
    return reqBody;
};

export const getBorrowedGames = async (userId) => {
  userId = validateObjectID(userId);
  const gamesCollection = await games();

  const borrowed = gamesCollection.find(
    { borrowed: new ObjectId(userId) }
  ).toArray();

  return borrowed
}

export const returnGame = async (gameId) => {
  gameId = validateObjectID(gameId);
  const gamesCollection = await games();

  const res = gamesCollection.updateOne(
    { _id: new ObjectId(gameId) },
    { $set: {borrowed: false } }
  )
  if(!res){
    throw 'Could not return game'
  }

  return res
}

export const sortByClosestLocation = async (userLoc, userId, gameList) => {
  userLoc = validateGeoJson(userLoc);
  validateObjectID(userId);
  if(!gameList) {gameList = await getAllGames()}
  // let gameList = await getAllGames();
  gameList = gameList.filter((game) => game.ownerID.toString() !== userId);
  gameList.sort((a,b) => turf.distance(a.location.geometry, userLoc, {units: 'miles'}) - turf.distance(b.location.geometry, userLoc, {units: 'miles'}));
  return gameList;
}

export const sortByRating = async (userLoc, userId, gameList) => {
  userLoc = validateGeoJson(userLoc);
  validateObjectID(userId);
  if(!gameList) {gameList = await getAllGames()}
  // let gameList = await getAllGames();
  gameList = gameList.filter((game) => game.ownerID.toString() !== userId);
  gameList.sort((a,b) => b.averageRating - a.averageRating);
  return gameList;
}

export const filterByDistance = async (userLoc, userId, sortDist, gameList) => {
  sortDist = validateFloat(sortDist);
  sortDist = parseFloat(sortDist);
  if(sortDist <= 0) {
    throw 'sortDist must be greater than 0'
  }
  userLoc = validateGeoJson(userLoc);
  validateObjectID(userId);
  if(!gameList) {gameList = await getAllGames()}
  // let gameList = await getAllGames();
  gameList = gameList.filter((game) => game.ownerID.toString() !== userId);
  gameList = gameList.filter((game) => turf.distance(game.location.geometry, userLoc, {units: 'miles'}) <= sortDist);
  return gameList;
}