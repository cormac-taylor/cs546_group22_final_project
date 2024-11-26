import { games } from "../../config/mongoCollections";
import { getGameById } from "../games";

export const removeReviewFromGameStats = async (reviewedGameID, oldRating) => {
  // find reviewedGame
  const reviewedGameData = await getGameById(reviewedGameID.toString());

  // calculate new reviewedGame stats
  const newNumReviews = reviewedGameData.numReviews - 1;
  let newAverageRating;
  if (newNumReviews === 0) {
    newAverageRating = 0;
  } else {
    newAverageRating =
      (Math.round(
        reviewedGameData.averageRating * reviewedGameData.numReviews
      ) -
        oldRating) /
      newNumReviews;
  }
  newAverageRating = Number(newAverageRating.toFixed(2));

  // update reviewedGame with stats
  const gamesCollection = new games();
  const reviewedGameUpdated = await gamesCollection.findOneAndUpdate(
    { _id: reviewedGameID },
    { $set: { averageRating: newAverageRating, numReviews: newNumReviews } },
    { returnDocument: "after" }
  );
  if (!reviewedGameUpdated) throw `could not update game with id: ${id}.`;
};

export const addReviewToGameStats = async (reviewedGameID, newRating) => {
  // find reviewedGame
  const reviewedGameData = await getGameById(reviewedGameID.toString());

  // calculate new reviewedGame stats
  const newNumReviews = reviewedGameData.numReviews + 1;
  let newAverageRating;
  if (newNumReviews === 1) {
    newAverageRating = newRating;
  } else {
    newAverageRating =
      (Math.round(
        reviewedGameData.averageRating * reviewedGameData.numReviews
      ) +
        newRating) /
      newNumReviews;
  }
  newAverageRating = Number(newAverageRating.toFixed(2));

  // update reviewedGame with stats
  const gamesCollection = new games();
  const reviewedGameUpdated = await gamesCollection.findOneAndUpdate(
    { _id: reviewedGameID },
    { $set: { averageRating: newAverageRating, numReviews: newNumReviews } },
    { returnDocument: "after" }
  );
  if (!reviewedGameUpdated) throw `could not update game with id: ${id}.`;
};
