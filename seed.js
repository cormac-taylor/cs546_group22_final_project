import { usersData, userReviewsData } from "./data/index.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";

//lets drop the database each time this is run
const db = await dbConnection();
await db.dropDatabase();

let u1;
let u2;
let u3;
let u4;

try {
  u1 = await usersData.createUser("user", "one", "u1@acb.com", "password", {
    type: "Point",
    coordinates: [-73.856077, 40.848447],
  });
} catch (e) {
  console.log(e);
}

try {
  u2 = await usersData.createUser("user", "two", "u2@acb.com", "password", {
    type: "Point",
    coordinates: [-73.856077, 40.848447],
  });
} catch (e) {
  console.log(e);
}

try {
  u3 = await usersData.createUser("user", "three", "u3@acb.com", "password", {
    type: "Point",
    coordinates: [-73.856077, 40.848447],
  });
} catch (e) {
  console.log(e);
}

try {
  u4 = await usersData.createUser("user", "four", "u4@acb.com", "password", {
    type: "Point",
    coordinates: [-73.856077, 40.848447],
  });
} catch (e) {
  console.log(e);
}

try {
  const res = await userReviewsData.createUserReview(
    u1._id.toString(),
    u2._id.toString(),
    "AWESOME",
    "Simply hilarious.",
    5
  );
  console.log(res);
} catch (e) {
  console.log(e);
}

try {
  const res = await userReviewsData.createUserReview(
    u3._id.toString(),
    u2._id.toString(),
    "SINKS",
    "He counts cards!",
    0
  );
  console.log(res);
} catch (e) {
  console.log(e);
}

await closeConnection();
