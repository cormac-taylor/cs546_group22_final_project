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
  getGameReviewsByReviewedGameId,
  getGameReviewById,
  updateGameReview,
} from "./gameReviews.js";

export const gameReviewsData = {
  createGameReview,
  removeGameReviewsByReviewedGameId,
  removeGameReviewById,
  getAllGameReviews,
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
