import { games } from "../../config/mongoCollections";
import { getGameById } from "../games";

export const removeReviewFromGameStats = async (reviewedGameID, oldRating) => {
  const gamesCollection = new games();

  // find reviewedGame
  const reviewedGameData = await getGameById(reviewedGameID.toString())

  // TO DO #######################################################################################################################################
  // calculate new reviewedUser stats
  const newNumReviews = reviewedUserData.numReviews - 1;
  let newAverageRating;
  if (newNumReviews === 0) {
    newAverageRating = 0;
  } else {
    newAverageRating =
      (Math.round(
        reviewedUserData.averageRating * reviewedUserData.numReviews
      ) -
        oldRating) /
      newNumReviews;
  }
  newAverageRating = Number(newAverageRating.toFixed(2));

  // update reviewedUser with stats
  const reviewedUserUpdated = await usersCollection.findOneAndUpdate(
    { _id: reviewedUserID },
    { $set: { averageRating: newAverageRating, numReviews: newNumReviews } },
    { returnDocument: "after" }
  );
  if (!reviewedUserUpdated) throw `could not update user with id: ${id}.`;
};

export const addReviewToGameStats = async (reviewedUserID, newRating) => {
  const gamesCollection = new games();

  // find reviewedUser
  const reviewedUserData = await usersCollection.findOne({
    _id: reviewedUserID,
  });
  if (!reviewedUserData) throw "reviewedUser doesn't exist.";

  // calculate new reviewedUser stats
  const newNumReviews = reviewedUserData.numReviews + 1;
  let newAverageRating;
  if (newNumReviews === 1) {
    newAverageRating = newRating;
  } else {
    newAverageRating =
      (Math.round(
        reviewedUserData.averageRating * reviewedUserData.numReviews
      ) +
        newRating) /
      newNumReviews;
  }
  newAverageRating = Number(newAverageRating.toFixed(2));

  // update reviewedUser with stats
  const reviewedUserUpdated = await usersCollection.findOneAndUpdate(
    { _id: reviewedUserID },
    { $set: { averageRating: newAverageRating, numReviews: newNumReviews } },
    { returnDocument: "after" }
  );
  if (!reviewedUserUpdated) throw `could not update user with id: ${id}.`;
};
