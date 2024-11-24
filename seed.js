import { usersData, userReviewsData } from "./data/index.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";

//lets drop the database each time this is run
const db = await dbConnection();
await db.dropDatabase();

let cormac;
let vraj;
let yash;
let marcel;


try {
  cormac = await usersData.createUser(
    "Cormac   ",
    "   Taylor",
    "CORMAC@GMAIL.COM   ",
    "    goodpassword",
    {
      type: "Point",
      coordinates: [-73.856077, 40.848447],
    }
  );
  console.log(cormac);
} catch (e) {
  console.log(e);
}

try {
  vraj = await usersData.createUser(
    "  Vraj  ",
    "  Patel  ",
    "vpatel@abc123.cc   ",
    "   password ",
    {
      type: "Point",
      coordinates: [-73.856077, 40.848447],
    }
  );
  console.log(vraj);
} catch (e) {
  console.log(e);
}

try {
  yash = await usersData.createUser(
    "  Yash  ",
    "  Yagnik  ",
    "noin@GMAIL.COM   ",
    "   password ",
    {
      type: "Point",
      coordinates: [-73.856077, 40.848447],
    }
  );
  console.log(yash);
} catch (e) {
  console.log(e);
}

try {
  marcel = await usersData.createUser(
    "  Marcel  ",
    "  Castillo  ",
    "ionoinn@GMAIL.COM   ",
    "   password ",
    {
      type: "Point",
      coordinates: [-73.856077, 40.848447],
    }
  );
  console.log(marcel);
} catch (e) {
  console.log(e);
}

await closeConnection();
