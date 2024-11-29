import {
  createUser,
  removeUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "./users.js";

import {
  createUserReview,
  removeUserReviewsByReviewedId,
  removeUserReviewById,
  getAllUserReviews,
  getUserReviewsByPostingUserId,
  getUserReviewsByReviewedUserId,
  getUserReviewById,
  updateUserReview,
} from "./userReviews.js";

import {
  createGame,
  removeGamesByOwnerId,
  removeGameById,
  getAllGames,
  getGamesByOwnerID,
  getGameById,
  updateGame,
} from "./games.js";

import {
  createGameReview,
  removeGameReviewsByReviewedGameId,
  removeGameReviewById,
  getAllGameReviews,
  getGameReviewsByPostingUserId,
  getGameReviewsByReviewedGameId,
  getGameReviewById,
  updateGameReview,
} from "./gameReviews.js";

import {
    validateBoolean,
    validateFloat,
    validateInteger,
    validateString,
    validateStrOfLen,
    validateArray,
    validateNonEmptyArray,
    validateObject,
    validateNonEmptyObject,
    validateFunction,
    validateObjectID,
    validateName,
    validateUsername,
    validateEmail,
    validateGeoJson,
    validateTitle,
    validateBody,
    validateRating,  
    validateURL,
    validateCondition,
} from '../utilities/validation.js'


export const gameReviewsData = {
  createGameReview,
  removeGameReviewsByReviewedGameId,
  removeGameReviewById,
  getAllGameReviews,
  getGameReviewsByPostingUserId,
  getGameReviewsByReviewedGameId,
  getGameReviewById,
  updateGameReview,
};

export const gamesData = {
  createGame,
  removeGamesByOwnerId,
  removeGameById,
  getAllGames,
  getGamesByOwnerID,
  getGameById,
  updateGame,
};

export const userReviewsData = {
  createUserReview,
  removeUserReviewsByReviewedId,
  removeUserReviewById,
  getAllUserReviews,
  getUserReviewsByPostingUserId,
  getUserReviewsByReviewedUserId,
  getUserReviewById,
  updateUserReview,
};

export const usersData = {
  createUser,
  removeUser,
  getAllUsers,
  getUserById,
  updateUser,
};

export const validation ={
    validateBoolean,
    validateFloat,
    validateInteger,
    validateString,
    validateStrOfLen,
    validateArray,
    validateNonEmptyArray,
    validateObject,
    validateNonEmptyObject,
    validateFunction,
    validateObjectID,
    validateName,
    validateUsername,
    validateEmail,
    validateGeoJson,
    validateTitle,
    validateBody,
    validateRating,  
    validateURL,
    validateCondition,
}

