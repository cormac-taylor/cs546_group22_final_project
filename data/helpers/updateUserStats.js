export const removeReviewFromUserStats = async (
  usersCollection,
  reviewedUserID,
  oldRating
) => {
  // find reviewedUser
  const reviewedUserData = await usersCollection.findOne({
    _id: ObjectId.createFromHexString(reviewedUserID),
  });
  if (!reviewedUserData) throw "reviewedUser doesn't exist.";

  // calculate new reviewedUser stats
  const newNumReviews = reviewedUserData.numReviews--;
  let newAverageRating;
  if (newNumReviews === 0) {
    newAverageRating = 0;
  } else {
    newAverageRating = (
      (Math.round(
        reviewedUserData.averageRating * reviewedUserData.numReviews
      ) -
        oldRating) /
      newNumReviews
    ).toFixed(2);
  }

  // update reviewedUser with stats
  const reviewedUserUpdated = await usersCollection.findOneAndUpdate(
    { _id: ObjectId.createFromHexString(reviewedUserID) },
    { averageRating: newAverageRating, numReviews: newNumReviews },
    { returnDocument: "after" }
  );
  if (!reviewedUserUpdated) throw `could not update user with id: ${id}.`;
};

export const addReviewToUserStats = async (
  usersCollection,
  reviewedUserID,
  newRating
) => {
  // find reviewedUser
  const reviewedUserData = await usersCollection.findOne({
    _id: ObjectId.createFromHexString(reviewedUserID),
  });
  if (!reviewedUserData) throw "reviewedUser doesn't exist.";

  // calculate new reviewedUser stats
  const newNumReviews = reviewedUserData.numReviews++;
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
  newAverageRating.toFixed(2);

  // update reviewedUser with stats
  const reviewedUserUpdated = await usersCollection.findOneAndUpdate(
    { _id: ObjectId.createFromHexString(reviewedUserID) },
    { averageRating: newAverageRating, numReviews: newNumReviews },
    { returnDocument: "after" }
  );
  if (!reviewedUserUpdated) throw `could not update user with id: ${id}.`;
};
