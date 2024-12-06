import {
  usersData,
  userReviewsData,
  gamesData,
  gameReviewsData,
} from "./data/index.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import {utils} from './utilities/utilityIndex.js'

//lets drop the database each time this is run
const db = await dbConnection();
await db.dropDatabase();

let u1;
let u2;
let u3;
let u4;
let u5;
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
let password = await utils.hashPassword('passw');
let notpass = await utils.hashPassword('notpass');

try {
  u1 = await usersData.createUser(
    "user",
    "one",
    "user1",
    "u1@acb.com",
    password,
    {
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [-74.033697, 40.717753]
        },
        properties: {
            Address: {
                StreetAddress: "30 Montgomery St",
                City: "Jersey City",
                State: "NJ",
                StateName: "New Jersey",
                Zip: "07302",
                County: "Hudson",
                Country: "US",
                CountryFullName: "United States",
                SPLC: null
            },
            Region: 4,
            POITypeID: 104,
            PersistentPOIID: -1,
            SiteID: -1,
            ResultType: 10,
            ShortString: "Bank, 30 Montgomery St, Jersey City, NJ, US, Hudson 07302",
            TimeZone: "GMT-5:00 EST"
        }
    }
  );
} catch (e) {
  console.log(e);
}

try {
  u2 = await usersData.createUser(
    "user",
    "two",
    "user2",
    "u2@acb.com",
    password,
    {
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [-74.036103, 40.769845]
        },
        properties: {
            Address: {
                StreetAddress: "2200 John F Kennedy Blvd",
                City: "Union City",
                State: "NJ",
                StateName: "New Jersey",
                Zip: "07087",
                County: "Hudson",
                Country: "US",
                CountryFullName: "United States",
                SPLC: null
            },
            Region: 4,
            POITypeID: 105,
            PersistentPOIID: -1,
            SiteID: -1,
            ResultType: 10,
            ShortString: "Mall, 2200 John F Kennedy Blvd, Union City, NJ, US, Hudson 07087",
            TimeZone: "GMT-5:00 EST"
        }
    }
  );
} catch (e) {
  console.log(e);
}

try {
  u3 = await usersData.createUser(
    "user",
    "three",
    "user3",
    "u3@acb.com",
    password,
    {
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [-74.172367, 40.735657]
        },
        properties: {
            Address: {
                StreetAddress: "3 Gateway Center",
                City: "Newark",
                State: "NJ",
                StateName: "New Jersey",
                Zip: "07102",
                County: "Essex",
                Country: "US",
                CountryFullName: "United States",
                SPLC: null
            },
            Region: 4,
            POITypeID: 106,
            PersistentPOIID: -1,
            SiteID: -1,
            ResultType: 10,
            ShortString: "Office, 3 Gateway Center, Newark, NJ, US, Essex 07102",
            TimeZone: "GMT-5:00 EST"
        }
    }
  );
} catch (e) {
  console.log(e);
}

try {
  u4 = await usersData.createUser(
    "user",
    "four",
    "user4",
    "u4@acb.com",
    password,
    {
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [-74.140876, 40.832381]
        },
        properties: {
            Address: {
                StreetAddress: "395 State Rt 3",
                City: "Clifton",
                State: "NJ",
                StateName: "New Jersey",
                Zip: "07014",
                County: "Passaic",
                Country: "US",
                CountryFullName: "United States",
                SPLC: null
            },
            Region: 4,
            POITypeID: 107,
            PersistentPOIID: -1,
            SiteID: -1,
            ResultType: 10,
            ShortString: "Restaurant, 395 State Rt 3, Clifton, NJ, US, Passaic 07014",
            TimeZone: "GMT-5:00 EST"
        }
    }
  );
} catch (e) {
  console.log(e);
}

try {
    u5 = await usersData.createUser(
      "user",
      "five",
      "user5",
      "lol@kek.com",
      notpass,
      {
        type: "Feature",
        geometry: {
            type: "Point", 
            coordinates: [-74.025923, 40.745684] 
        },
        properties: { 
            Address: {
                StreetAddress: "1 Castle Point Ter",
                LocalArea: "",
                City: "Hoboken",
                State: "NJ",
                StateName: "New Jersey",
                Zip: "07030-5906",
                County: "Hudson",
                Country: "US",
                CountryFullName: "United States",
                SPLC: null
            },
            Region: 4,
            POITypeID: 103,
            PersistentPOIID: -1,
            SiteID: -1,
            ResultType: 10,
            ShortString: "ATM, 1 Castle Point Ter, Hoboken, NJ, US, Hudson 07030-5906",
            TimeZone: "GMT-5:00 EST"
        }
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

/* Request Seeding */
let currGame;
let userRequest = (user) =>{
    let updateObj = {
        userRequest: {
            reqUserId: user._id.toString(),  // u1 is requesting
            message: `Im user ${user.username}. Id like to borrow this game.`
        }
    }
    return updateObj
}
try {
    currGame = await gamesData.updateGame(g3._id.toString(), userRequest(u1));
} catch(e){
    console.log(e);
}
try {
    currGame = await gamesData.updateGame(g3._id.toString(), userRequest(u3));
} catch(e){
    console.log(e);
}
await closeConnection();
