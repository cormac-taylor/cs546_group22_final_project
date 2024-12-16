import { dbConnection } from "./mongoConnection.js";

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

export const users = getCollectionFn("users");
export const userReviews = getCollectionFn("userReviews");
export const games = getCollectionFn("games");
export const gameReviews = getCollectionFn("gameReviews");
export const events = getCollectionFn("events");
export const chatroomMessages = getCollectionFn("chatroomMessages");
