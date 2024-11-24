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
