import { gameReviews, userReviews } from "../../config/mongoCollections.js";
import { getGameReviewsByPostingUserId } from "../gameReviews.js";
import { getUserReviewsByPostingUserId } from "../userReviews.js";

const FIRST_NAME = true;
const LAST_NAME = false;

export const updateFirstName = async (id, firstName) => {
  await updateUserReviewName(FIRST_NAME, id, firstName);
  await updateGameReviewName(FIRST_NAME, id, firstName);
};

export const updateLastName = async (id, lastName) => {
  await updateUserReviewName(LAST_NAME, id, lastName);
  await updateGameReviewName(LAST_NAME, id, lastName);
};

const updateUserReviewName = async (isFirstName, id, name) => {
  const relatedReviews = await getUserReviewsByPostingUserId(id.toString());
  const userReviewsCollection = await userReviews();
  if (isFirstName) {
    for (const review of relatedReviews) {
      const updateInfo = await userReviewsCollection.findOneAndUpdate(
        { _id: review._id },
        { $set: { firstName: name } },
        { returnDocument: "after" }
      );
      if (!updateInfo) throw `could not update firstName for id: ${id}.`;
    }
  } else {
    for (const review of relatedReviews) {
      const updateInfo = await userReviewsCollection.findOneAndUpdate(
        { _id: review._id },
        { $set: { lastName: name } },
        { returnDocument: "after" }
      );
      if (!updateInfo) throw `could not update lastName for id: ${id}.`;
    }
  }
};

const updateGameReviewName = async (isFirstName, id, name) => {
  const relatedReviews = await getGameReviewsByPostingUserId(id.toString());
  const gameReviewsCollection = await gameReviews();
  if (isFirstName) {
    for (const review of relatedReviews) {
      const updateInfo = await gameReviewsCollection.findOneAndUpdate(
        { _id: review._id },
        { $set: { firstName: name } },
        { returnDocument: "after" }
      );
      if (!updateInfo) throw `could not update firstName for id: ${id}.`;
    }
  } else {
    for (const review of relatedReviews) {
      const updateInfo = await gameReviewsCollection.findOneAndUpdate(
        { _id: review._id },
        { $set: { lastName: name } },
        { returnDocument: "after" }
      );
      if (!updateInfo) throw `could not update lastName for id: ${id}.`;
    }
  }
};
