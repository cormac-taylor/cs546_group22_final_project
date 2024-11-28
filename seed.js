import {
  usersData,
  userReviewsData,
  gamesData,
  gameReviewsData,
} from "./data/index.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";

//lets drop the database each time this is run
const db = await dbConnection();
await db.dropDatabase();

let u1;
let u2;
let u3;
let u4;
let ur1;
let ur2;
let ur3;
let ur4;
let g1;
let g2;
let g3;
let g4;
let gr1;
let gr2;
let gr3;
let gr4;

try {
  u1 = await usersData.createUser(
    "user",
    "one",
    "u1",
    "u1@acb.com",
    "password",
    {
      type: "Point",
      coordinates: [-73.856077, 40.848447],
    }
  );
} catch (e) {
  console.log(e);
}

try {
  u2 = await usersData.createUser(
    "user",
    "two",
    "u2",
    "u2@acb.com",
    "password",
    {
      type: "Point",
      coordinates: [-73.856077, 40.848447],
    }
  );
} catch (e) {
  console.log(e);
}

try {
  u3 = await usersData.createUser(
    "user",
    "three",
    "u3",
    "u3@acb.com",
    "password",
    {
      type: "Point",
      coordinates: [-73.856077, 40.848447],
    }
  );
} catch (e) {
  console.log(e);
}

try {
  u4 = await usersData.createUser(
    "user",
    "four",
    "u4",
    "u4@acb.com",
    "password",
    {
      type: "Point",
      coordinates: [-73.856077, 40.848447],
    }
  );
} catch (e) {
  console.log(e);
}

try {
  ur1 = await userReviewsData.createUserReview(
    u1._id.toString(),
    u2._id.toString(),
    "AWESOME",
    "Simply hilarious. Simply hilarious.",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  ur2 = await userReviewsData.createUserReview(
    u3._id.toString(),
    u2._id.toString(),
    "STINKS",
    "He counts cards! He counts cards!",
    0
  );
} catch (e) {
  console.log(e);
}

try {
  ur3 = await userReviewsData.createUserReview(
    u4._id.toString(),
    u2._id.toString(),
    "Solid",
    "Solid player. Solid player.",
    3
  );
} catch (e) {
  console.log(e);
}

try {
  ur4 = await userReviewsData.createUserReview(
    u1._id.toString(),
    u3._id.toString(),
    "Fake News",
    "Stright cap. Kids just bad.",
    0
  );
} catch (e) {
  console.log(e);
}

try {
  g1 = await gamesData.createGame(
    u2._id.toString(),
    u2.location,
    "Risk",
    "The ultimate game of strategy.",
    "new",
    "https://m.media-amazon.com/images/I/71GM6UFejTL._AC_SL1500_.jpg"
  );
} catch (e) {
  console.log(e);
}

try {
  g2 = await gamesData.createGame(
    u2._id.toString(),
    u2.location,
    "Risk",
    "The ultimate game of strategy.",
    "new",
    "https://m.media-amazon.com/images/I/71GM6UFejTL._AC_SL1500_.jpg"
  );
} catch (e) {
  console.log(e);
}

try {
  g3 = await gamesData.createGame(
    u2._id.toString(),
    u2.location,
    "Monopoly",
    "The ultimate game of greed.",
    "used",
    "https://m.media-amazon.com/images/I/71Tks9Tf7aL._AC_SL1000_.jpg"
  );
} catch (e) {
  console.log(e);
}

try {
  g4 = await gamesData.createGame(
    u1._id.toString(),
    u1.location,
    "Connect4",
    "Out play your opponent.",
    "well-used",
    "https://m.media-amazon.com/images/I/81fEiLrmZ8L._AC_SL1500_.jpg"
  );
} catch (e) {
  console.log(e);
}

try {
  gr1 = await gameReviewsData.createGameReview(
    u2._id.toString(),
    g4._id.toString(),
    "Fun",
    "Risk is fun. Risk is fun.",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  gr2 = await gameReviewsData.createGameReview(
    u3._id.toString(),
    g2._id.toString(),
    "Not fun",
    "This risk is not fun.",
    0
  );
} catch (e) {
  console.log(e);
}

try {
  gr3 = await gameReviewsData.createGameReview(
    u1._id.toString(),
    g3._id.toString(),
    "Riches",
    "I am rich now. I am rich now.",
    3
  );
} catch (e) {
  console.log(e);
}

try {
  gr4 = await gameReviewsData.createGameReview(
    u1._id.toString(),
    g1._id.toString(),
    "Sucks",
    "Missing peices. Missing peices.",
    0
  );
} catch (e) {
  console.log(e);
}

try {
  const res = await usersData.updateUser(u1._id.toString(), {
    firstName: "firstName",
    lastName: "lastName",
    username: "__username__",
  });
  console.log(res);
} catch (e) {
  console.log(e);
}

await closeConnection();
