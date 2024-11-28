import { gameReviews, userReviews } from "../../config/mongoCollections.js";
import { getGameReviewsByPostingUserId } from "../gameReviews.js";
import { getUserReviewsByPostingUserId } from "../userReviews.js";

const NAME_TYPE = Object.freeze({
  FIRST_NAME: 0,
  LAST_NAME: 1,
  USERNAME: 2,
});

export const updateFirstName = async (id, firstName) => {
  await updateUserReviewName(NAME_TYPE.FIRST_NAME, id, firstName);
  await updateGameReviewName(NAME_TYPE.FIRST_NAME, id, firstName);
};

export const updateLastName = async (id, lastName) => {
  await updateUserReviewName(NAME_TYPE.LAST_NAME, id, lastName);
  await updateGameReviewName(NAME_TYPE.LAST_NAME, id, lastName);
};

export const updateUsername = async (id, username) => {
  await updateUserReviewName(NAME_TYPE.USERNAME, id, username);
  await updateGameReviewName(NAME_TYPE.USERNAME, id, username);
};

const updateUserReviewName = async (nameType, id, name) => {
  const relatedReviews = await getUserReviewsByPostingUserId(id.toString());
  const userReviewsCollection = await userReviews();
  if (nameType === NAME_TYPE.FIRST_NAME) {
    updateName(userReviewsCollection, relatedReviews, { firstName: name });
  } else if (nameType === NAME_TYPE.LAST_NAME) {
    updateName(userReviewsCollection, relatedReviews, { lastName: name });
  } else if (nameType === NAME_TYPE.USERNAME) {
    updateName(userReviewsCollection, relatedReviews, { username: name });
  }
};

const updateGameReviewName = async (nameType, id, name) => {
  const relatedReviews = await getGameReviewsByPostingUserId(id.toString());
  const gameReviewsCollection = await gameReviews();
  if (nameType === NAME_TYPE.FIRST_NAME) {
    updateName(gameReviewsCollection, relatedReviews, { firstName: name });
  } else if (nameType === NAME_TYPE.LAST_NAME) {
    updateName(gameReviewsCollection, relatedReviews, { lastName: name });
  } else if (nameType === NAME_TYPE.USERNAME) {
    updateName(gameReviewsCollection, relatedReviews, { username: name });
  }
};

const updateName = async (collection, relatedReviews, updateObj) => {
  for (const review of relatedReviews) {
    const updateInfo = await collection.findOneAndUpdate(
      { _id: review._id },
      { $set: updateObj },
      { returnDocument: "after" }
    );
    if (!updateInfo) throw `could not update item.`;
  }
};
