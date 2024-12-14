import {
  usersData,
  userReviewsData,
  gamesData,
  gameReviewsData,
} from "./data/index.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import { utils } from "./utilities/utilityIndex.js";

//lets drop the database each time this is run
const db = await dbConnection();
await db.dropDatabase();

let u1, u2, u3, u4, u5, u6, u7, u8, u9, u10;

let ur1, ur2, ur3, ur4, ur5, ur6, ur7, ur8, ur9, ur10, ur11, ur12, ur13;
let ur14, ur15, ur16, ur17, ur18, ur19, ur20, ur21, ur22, ur23, ur24, ur25;

let g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15;

let gr1, gr2, gr3, gr4, gr5, gr6, gr7, gr8, gr9, gr10, gr11, gr12, gr13, gr14;
let gr15, gr16, gr17, gr18, gr19, gr20, gr21, gr22, gr23, gr24, gr25, gr26;
let gr27, gr28, gr29, gr30, gr31, gr32, gr33, gr34, gr35, gr36, gr37, gr38;
let gr39, gr40;

let password = await utils.hashPassword("Password1@");

/*
 * Fake users
 */
try {
  u1 = await usersData.createUser(
    "John",
    "Doe",
    "j_doe",
    "john.doe@example.com",
    password,
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.4194, 37.7749],
      },
      properties: {
        Address: {
          StreetAddress: "1 Market St",
          City: "San Francisco",
          State: "CA",
          StateName: "California",
          Zip: "94105",
          County: "San Francisco",
          Country: "US",
          CountryFullName: "United States",
          SPLC: null,
        },
        Region: 6,
        POITypeID: 104,
        PersistentPOIID: -1,
        SiteID: -1,
        ResultType: 10,
        ShortString:
          "Office, 1 Market St, San Francisco, CA, US, San Francisco 94105",
        TimeZone: "GMT-8:00 PST",
      },
    }
  );

  u2 = await usersData.createUser(
    "Jane",
    "Smith",
    "j_smith",
    "jane.smith@example.com",
    password,
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.4013, 37.7952],
      },
      properties: {
        Address: {
          StreetAddress: "101 California St",
          City: "San Francisco",
          State: "CA",
          StateName: "California",
          Zip: "94111",
          County: "San Francisco",
          Country: "US",
          CountryFullName: "United States",
          SPLC: null,
        },
        Region: 6,
        POITypeID: 104,
        PersistentPOIID: -1,
        SiteID: -1,
        ResultType: 10,
        ShortString:
          "Office, 101 California St, San Francisco, CA, US, San Francisco 94111",
        TimeZone: "GMT-8:00 PST",
      },
    }
  );

  u3 = await usersData.createUser(
    "Alice",
    "Johnson",
    "alice_j",
    "alice.j@example.com",
    password,
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.3975, 37.7917],
      },
      properties: {
        Address: {
          StreetAddress: "555 Mission St",
          City: "San Francisco",
          State: "CA",
          StateName: "California",
          Zip: "94105",
          County: "San Francisco",
          Country: "US",
          CountryFullName: "United States",
          SPLC: null,
        },
        Region: 6,
        POITypeID: 104,
        PersistentPOIID: -1,
        SiteID: -1,
        ResultType: 10,
        ShortString:
          "Office, 555 Mission St, San Francisco, CA, US, San Francisco 94105",
        TimeZone: "GMT-8:00 PST",
      },
    }
  );

  u4 = await usersData.createUser(
    "Bob",
    "Brown",
    "bob_b",
    "bob.brown@example.com",
    password,
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-74.0337, 40.7178],
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
          SPLC: null,
        },
        Region: 4,
        POITypeID: 104,
        PersistentPOIID: -1,
        SiteID: -1,
        ResultType: 10,
        ShortString:
          "Office, 30 Montgomery St, Jersey City, NJ, US, Hudson 07302",
        TimeZone: "GMT-5:00 EST",
      },
    }
  );

  u5 = await usersData.createUser(
    "Charlie",
    "Williams",
    "charlie_w",
    "charlie.w@example.com",
    password,
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-74.0358, 40.7465],
      },
      properties: {
        Address: {
          StreetAddress: "1 Hudson Pl",
          City: "Hoboken",
          State: "NJ",
          StateName: "New Jersey",
          Zip: "07030",
          County: "Hudson",
          Country: "US",
          CountryFullName: "United States",
          SPLC: null,
        },
        Region: 4,
        POITypeID: 104,
        PersistentPOIID: -1,
        SiteID: -1,
        ResultType: 10,
        ShortString: "Station, 1 Hudson Pl, Hoboken, NJ, US, Hudson 07030",
        TimeZone: "GMT-5:00 EST",
      },
    }
  );

  u6 = await usersData.createUser(
    "Diana",
    "Taylor",
    "d_taylor",
    "diana.taylor@example.com",
    password,
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-74.0447, 40.7114],
      },
      properties: {
        Address: {
          StreetAddress: "1 Path Plaza",
          City: "Jersey City",
          State: "NJ",
          StateName: "New Jersey",
          Zip: "07306",
          County: "Hudson",
          Country: "US",
          CountryFullName: "United States",
          SPLC: null,
        },
        Region: 4,
        POITypeID: 104,
        PersistentPOIID: -1,
        SiteID: -1,
        ResultType: 10,
        ShortString: "Station, 1 Path Plaza, Jersey City, NJ, US, Hudson 07306",
        TimeZone: "GMT-5:00 EST",
      },
    }
  );

  u7 = await usersData.createUser(
    "Edward",
    "Martinez",
    "edward_m",
    "edward.m@example.com",
    password,
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-74.006, 40.7128],
      },
      properties: {
        Address: {
          StreetAddress: "285 Fulton St",
          City: "New York",
          State: "NY",
          StateName: "New York",
          Zip: "10007",
          County: "New York",
          Country: "US",
          CountryFullName: "United States",
          SPLC: null,
        },
        Region: 2,
        POITypeID: 104,
        PersistentPOIID: -1,
        SiteID: -1,
        ResultType: 10,
        ShortString:
          "Landmark, 285 Fulton St, New York, NY, US, New York 10007",
        TimeZone: "GMT-5:00 EST",
      },
    }
  );

  u8 = await usersData.createUser(
    "Fiona",
    "Garcia",
    "fio_gar",
    "fiona.garcia@example.com",
    password,
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-74.0351, 40.7366],
      },
      properties: {
        Address: {
          StreetAddress: "123 Washington St",
          City: "Hoboken",
          State: "NJ",
          StateName: "New Jersey",
          Zip: "07030",
          County: "Hudson",
          Country: "US",
          CountryFullName: "United States",
          SPLC: null,
        },
        Region: 4,
        POITypeID: 104,
        PersistentPOIID: -1,
        SiteID: -1,
        ResultType: 10,
        ShortString: "Shop, 123 Washington St, Hoboken, NJ, US, Hudson 07030",
        TimeZone: "GMT-5:00 EST",
      },
    }
  );

  u9 = await usersData.createUser(
    "George",
    "Wilson",
    "george",
    "george.wilson@example.com",
    password,
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-73.994, 40.7527],
      },
      properties: {
        Address: {
          StreetAddress: "4 Pennsylvania Plaza",
          City: "New York",
          State: "NY",
          StateName: "New York",
          Zip: "10121",
          County: "New York",
          Country: "US",
          CountryFullName: "United States",
          SPLC: null,
        },
        Region: 2,
        POITypeID: 104,
        PersistentPOIID: -1,
        SiteID: -1,
        ResultType: 10,
        ShortString:
          "Arena, 4 Pennsylvania Plaza, New York, NY, US, New York 10121",
        TimeZone: "GMT-5:00 EST",
      },
    }
  );

  u10 = await usersData.createUser(
    "Hannah",
    "Lee",
    "h_lee",
    "hannah.lee@example.com",
    password,
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-74.0341, 40.7175],
      },
      properties: {
        Address: {
          StreetAddress: "150 Warren St",
          City: "Jersey City",
          State: "NJ",
          StateName: "New Jersey",
          Zip: "07302",
          County: "Hudson",
          Country: "US",
          CountryFullName: "United States",
          SPLC: null,
        },
        Region: 4,
        POITypeID: 104,
        PersistentPOIID: -1,
        SiteID: -1,
        ResultType: 10,
        ShortString: "Park, 150 Warren St, Jersey City, NJ, US, Hudson 07302",
        TimeZone: "GMT-5:00 EST",
      },
    }
  );
} catch (e) {
  console.log(e);
}

/*
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
 */

/*
 * Fake users reviews
 */

try {
  ur1 = await userReviewsData.createUserReview(
    u1._id.toString(),
    u2._id.toString(),
    "AWESOME",
    "Simply hilarious. Still can't get over some of the jokes!",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  ur2 = await userReviewsData.createUserReview(
    u1._id.toString(),
    u3._id.toString(),
    "Helpful",
    "Always there when needed. Fantastic listener!",
    4
  );
} catch (e) {
  console.log(e);
}

try {
  ur3 = await userReviewsData.createUserReview(
    u1._id.toString(),
    u4._id.toString(),
    "Talented",
    "Their creativity is unmatched. Highly recommend!",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  ur4 = await userReviewsData.createUserReview(
    u2._id.toString(),
    u1._id.toString(),
    "Great Energy",
    "Always so positive and uplifting. Really great vibe.",
    4
  );
} catch (e) {
  console.log(e);
}

try {
  ur5 = await userReviewsData.createUserReview(
    u2._id.toString(),
    u3._id.toString(),
    "Amazing",
    "Super insightful and kind. Makes every interaction memorable.",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  ur6 = await userReviewsData.createUserReview(
    u2._id.toString(),
    u4._id.toString(),
    "Helpful",
    "Great at solving problems. A go-to person for advice.",
    4
  );
} catch (e) {
  console.log(e);
}

try {
  ur7 = await userReviewsData.createUserReview(
    u3._id.toString(),
    u1._id.toString(),
    "Fantastic",
    "Always ready to lend a hand. A real team player.",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  ur8 = await userReviewsData.createUserReview(
    u3._id.toString(),
    u2._id.toString(),
    "Supportive",
    "Goes out of their way to make people feel included.",
    4
  );
} catch (e) {
  console.log(e);
}

try {
  ur9 = await userReviewsData.createUserReview(
    u3._id.toString(),
    u5._id.toString(),
    "Friendly",
    "Always greets you with a smile. A wonderful person to be around.",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  ur10 = await userReviewsData.createUserReview(
    u4._id.toString(),
    u1._id.toString(),
    "Genuine",
    "Always speaks their mind honestly. A pleasure to work with.",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  ur11 = await userReviewsData.createUserReview(
    u4._id.toString(),
    u2._id.toString(),
    "Great Communicator",
    "Clear and concise in their messaging. Really helpful.",
    4
  );
} catch (e) {
  console.log(e);
}

try {
  ur12 = await userReviewsData.createUserReview(
    u4._id.toString(),
    u3._id.toString(),
    "Dependable",
    "Someone you can always count on. Highly reliable!",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  ur13 = await userReviewsData.createUserReview(
    u5._id.toString(),
    u1._id.toString(),
    "Creative",
    "Always has fresh ideas and unique perspectives.",
    4
  );
} catch (e) {
  console.log(e);
}

try {
  ur14 = await userReviewsData.createUserReview(
    u5._id.toString(),
    u4._id.toString(),
    "Kind",
    "Never fails to show kindness and compassion to everyone.",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  ur15 = await userReviewsData.createUserReview(
    u5._id.toString(),
    u6._id.toString(),
    "Professional",
    "Very detail-oriented and professional. Always a pleasure to work with.",
    4
  );
} catch (e) {
  console.log(e);
}

try {
  ur16 = await userReviewsData.createUserReview(
    u6._id.toString(),
    u1._id.toString(),
    "Innovative",
    "Always thinking outside the box. Impressive creativity.",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  ur17 = await userReviewsData.createUserReview(
    u6._id.toString(),
    u3._id.toString(),
    "Motivating",
    "Always keeps the team motivated. A great leader.",
    4
  );
} catch (e) {
  console.log(e);
}

try {
  ur18 = await userReviewsData.createUserReview(
    u6._id.toString(),
    u5._id.toString(),
    "Energetic",
    "Full of life and energy. Makes everything seem exciting.",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  ur19 = await userReviewsData.createUserReview(
    u7._id.toString(),
    u2._id.toString(),
    "Thoughtful",
    "Really pays attention to details. Always considerate.",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  ur20 = await userReviewsData.createUserReview(
    u7._id.toString(),
    u4._id.toString(),
    "Efficient",
    "Handles tasks with incredible efficiency and skill.",
    4
  );
} catch (e) {
  console.log(e);
}

try {
  ur21 = await userReviewsData.createUserReview(
    u7._id.toString(),
    u6._id.toString(),
    "Focused",
    "Always keeps the team on track. A true asset to any project.",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  ur22 = await userReviewsData.createUserReview(
    u8._id.toString(),
    u1._id.toString(),
    "Bright",
    "Lights up every room they enter. Truly inspiring!",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  ur23 = await userReviewsData.createUserReview(
    u8._id.toString(),
    u5._id.toString(),
    "Hardworking",
    "Always puts in the extra effort to get things done.",
    4
  );
} catch (e) {
  console.log(e);
}

try {
  ur24 = await userReviewsData.createUserReview(
    u8._id.toString(),
    u7._id.toString(),
    "Inspiring",
    "A role model in every sense of the word. Highly motivating.",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  ur25 = await userReviewsData.createUserReview(
    u9._id.toString(),
    u3._id.toString(),
    "Optimistic",
    "Always sees the bright side of every situation. Great energy!",
    4
  );
} catch (e) {
  console.log(e);
}

/*
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
*/

/*
 * Games
 */

// TO DO
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


/*
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
*/

/*
 * Game Reviews
 */
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
    g1._id.toString(),
    "Boring",
    "The game dragged on way too long. Would not recommend.",
    2
  );
} catch (e) {
  console.log(e);
}

try {
  gr3 = await gameReviewsData.createGameReview(
    u1._id.toString(),
    g5._id.toString(),
    "Engaging",
    "A strategic masterpiece! The depth is incredible.",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  gr4 = await gameReviewsData.createGameReview(
    u4._id.toString(),
    g3._id.toString(),
    "Confusing",
    "The rules were overly complicated and hard to follow.",
    1
  );
} catch (e) {
  console.log(e);
}

try {
  gr5 = await gameReviewsData.createGameReview(
    u5._id.toString(),
    g2._id.toString(),
    "Fantastic",
    "A truly entertaining game for the whole family.",
    4
  );
} catch (e) {
  console.log(e);
}

try {
  gr6 = await gameReviewsData.createGameReview(
    u6._id.toString(),
    g6._id.toString(),
    "Mediocre",
    "The mechanics are outdated. It could use a refresh.",
    3
  );
} catch (e) {
  console.log(e);
}

try {
  gr7 = await gameReviewsData.createGameReview(
    u7._id.toString(),
    g7._id.toString(),
    "Exciting",
    "An adrenaline-packed experience. Highly recommend.",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  gr8 = await gameReviewsData.createGameReview(
    u8._id.toString(),
    g8._id.toString(),
    "Dull",
    "I couldn’t wait for the game to end. Very repetitive.",
    1
  );
} catch (e) {
  console.log(e);
}

try {
  gr9 = await gameReviewsData.createGameReview(
    u9._id.toString(),
    g9._id.toString(),
    "Creative",
    "Unique and thought-provoking gameplay. A gem.",
    4
  );
} catch (e) {
  console.log(e);
}

try {
  gr10 = await gameReviewsData.createGameReview(
    u10._id.toString(),
    g10._id.toString(),
    "Amazing",
    "A new favorite! I can’t wait to play again.",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  gr11 = await gameReviewsData.createGameReview(
    u3._id.toString(),
    g11._id.toString(),
    "Unbalanced",
    "Certain strategies dominate the game, ruining the fun.",
    2
  );
} catch (e) {
  console.log(e);
}

try {
  gr12 = await gameReviewsData.createGameReview(
    u4._id.toString(),
    g12._id.toString(),
    "Intriguing",
    "Loved the twists and turns. Keeps you on your toes.",
    4
  );
} catch (e) {
  console.log(e);
}

try {
  gr13 = await gameReviewsData.createGameReview(
    u5._id.toString(),
    g13._id.toString(),
    "Average",
    "Not bad, but nothing special. It’s okay.",
    3
  );
} catch (e) {
  console.log(e);
}

try {
  gr14 = await gameReviewsData.createGameReview(
    u6._id.toString(),
    g14._id.toString(),
    "Complex",
    "Took a while to understand, but rewarding in the end.",
    4
  );
} catch (e) {
  console.log(e);
}

try {
  gr15 = await gameReviewsData.createGameReview(
    u7._id.toString(),
    g15._id.toString(),
    "Tedious",
    "Way too long for the payoff. Not worth the effort.",
    2
  );
} catch (e) {
  console.log(e);
}

try {
  gr16 = await gameReviewsData.createGameReview(
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
  gr17 = await gameReviewsData.createGameReview(
    u5._id.toString(),
    g7._id.toString(),
    "Exciting",
    "This game keeps me on the edge of my seat!",
    4
  );
} catch (e) {
  console.log(e);
}

try {
  gr18 = await gameReviewsData.createGameReview(
    u1._id.toString(),
    g2._id.toString(),
    "Challenging",
    "Tough but rewarding gameplay. Highly recommended!",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  gr19 = await gameReviewsData.createGameReview(
    u3._id.toString(),
    g5._id.toString(),
    "Average",
    "Not bad, but could use more variety.",
    3
  );
} catch (e) {
  console.log(e);
}

try {
  gr20 = await gameReviewsData.createGameReview(
    u4._id.toString(),
    g1._id.toString(),
    "Addictive",
    "Once you start, you can’t stop playing!",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  gr21 = await gameReviewsData.createGameReview(
    u7._id.toString(),
    g8._id.toString(),
    "Disappointing",
    "Expected more content for the price.",
    2
  );
} catch (e) {
  console.log(e);
}

try {
  gr22 = await gameReviewsData.createGameReview(
    u6._id.toString(),
    g6._id.toString(),
    "Immersive",
    "Amazing world-building and storytelling.",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  gr23 = await gameReviewsData.createGameReview(
    u8._id.toString(),
    g3._id.toString(),
    "Frustrating",
    "The controls are a bit clunky, but gameplay is okay.",
    2
  );
} catch (e) {
  console.log(e);
}

try {
  gr24 = await gameReviewsData.createGameReview(
    u10._id.toString(),
    g9._id.toString(),
    "Solid",
    "Good graphics and smooth mechanics.",
    4
  );
} catch (e) {
  console.log(e);
}

try {
  gr25 = await gameReviewsData.createGameReview(
    u9._id.toString(),
    g10._id.toString(),
    "Entertaining",
    "Great for passing time with friends.",
    4
  );
} catch (e) {
  console.log(e);
}

try {
  gr26 = await gameReviewsData.createGameReview(
    u3._id.toString(),
    g12._id.toString(),
    "Repetitive",
    "The gameplay loop gets stale after a while.",
    3
  );
} catch (e) {
  console.log(e);
}

try {
  gr27 = await gameReviewsData.createGameReview(
    u5._id.toString(),
    g11._id.toString(),
    "Thrilling",
    "Fast-paced action and great music!",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  gr28 = await gameReviewsData.createGameReview(
    u7._id.toString(),
    g13._id.toString(),
    "Chill",
    "Relaxing gameplay and soothing visuals.",
    4
  );
} catch (e) {
  console.log(e);
}

try {
  gr29 = await gameReviewsData.createGameReview(
    u2._id.toString(),
    g14._id.toString(),
    "Boring",
    "Lacks excitement and feels unfinished.",
    1
  );
} catch (e) {
  console.log(e);
}

try {
  gr30 = await gameReviewsData.createGameReview(
    u6._id.toString(),
    g15._id.toString(),
    "Innovative",
    "A fresh take on a classic genre.",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  gr31 = await gameReviewsData.createGameReview(
    u8._id.toString(),
    g4._id.toString(),
    "Satisfying",
    "Great progression system that keeps you engaged.",
    4
  );
} catch (e) {
  console.log(e);
}

try {
  gr32 = await gameReviewsData.createGameReview(
    u4._id.toString(),
    g8._id.toString(),
    "Too Short",
    "Fun but doesn’t last very long.",
    3
  );
} catch (e) {
  console.log(e);
}

try {
  gr33 = await gameReviewsData.createGameReview(
    u1._id.toString(),
    g1._id.toString(),
    "Epic",
    "An unforgettable adventure from start to finish!",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  gr34 = await gameReviewsData.createGameReview(
    u10._id.toString(),
    g7._id.toString(),
    "Laggy",
    "Multiplayer experience is marred by server issues.",
    2
  );
} catch (e) {
  console.log(e);
}

try {
  gr35 = await gameReviewsData.createGameReview(
    u9._id.toString(),
    g5._id.toString(),
    "Nostalgic",
    "Reminds me of the classics, in a good way!",
    4
  );
} catch (e) {
  console.log(e);
}

try {
  gr36 = await gameReviewsData.createGameReview(
    u6._id.toString(),
    g11._id.toString(),
    "Overrated",
    "Didn’t live up to the hype for me.",
    2
  );
} catch (e) {
  console.log(e);
}

try {
  gr37 = await gameReviewsData.createGameReview(
    u3._id.toString(),
    g15._id.toString(),
    "Balanced",
    "Perfect balance of challenge and fun.",
    5
  );
} catch (e) {
  console.log(e);
}

try {
  gr38 = await gameReviewsData.createGameReview(
    u8._id.toString(),
    g13._id.toString(),
    "Relaxing",
    "A great way to unwind after a long day.",
    4
  );
} catch (e) {
  console.log(e);
}

try {
  gr39 = await gameReviewsData.createGameReview(
    u5._id.toString(),
    g3._id.toString(),
    "Clunky",
    "The mechanics feel outdated and rough.",
    2
  );
} catch (e) {
  console.log(e);
}

try {
  gr40 = await gameReviewsData.createGameReview(
    u7._id.toString(),
    g9._id.toString(),
    "Enjoyable",
    "A solid game with lots to do.",
    4
  );
} catch (e) {
  console.log(e);
}

/*
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
*/

/* Request Seeding */
let currGame;
let userRequest = (user) => {
  let updateObj = {
    userRequest: {
      reqUserId: user._id.toString(), // u1 is requesting
      message: `Im user ${user.username}. Id like to borrow this game.`,
    },
  };
  return updateObj;
};
try {
  currGame = await gamesData.updateGame(g3._id.toString(), userRequest(u1));
} catch (e) {
  console.log(e);
}
try {
  currGame = await gamesData.updateGame(g3._id.toString(), userRequest(u3));
} catch (e) {
  console.log(e);
}
await closeConnection();
