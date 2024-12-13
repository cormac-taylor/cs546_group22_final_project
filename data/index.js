import {
  createUser,
  isUniqueUsername,
  isUniqueEmail,
  removeUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
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
  getRequestedGames,
  handleRequest,
  requestGame,
  returnRequest,
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

import locationDataFunctions from './location.js'

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
  getRequestedGames,
  handleRequest,
  requestGame,
  returnRequest,
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
  isUniqueUsername,
  isUniqueEmail,
  removeUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
};

export const locationData = locationDataFunctions;
