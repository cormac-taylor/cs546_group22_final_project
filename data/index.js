import {
  createUser,
  removeUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "./users.js";

import {
  createUserReview,
  removeUserReview,
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
  removeUserReview,
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
