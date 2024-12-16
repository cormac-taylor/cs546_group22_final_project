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

let r1, r2, r3, r4, r5, r6, r7, r8, r9;
let r10, r11, r12, r13, r14, r15, r16, r17, r18;

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
 * Games
 */

// TO DO
try {
  g1 = await gamesData.createGame(
    u1._id.toString(),
    u1.location,
    "Scrabble",
    "In this classic word game, players use their seven drawn letter-tiles to form words on the gameboard. Each word laid out earns points based on the commonality of the letters used, with certain board spaces giving bonuses.  But a word can only be played if it uses at least one already-played tile or adds to an already-played word.  This leads to slightly tactical play, as potential words are rejected because they would give an opponent too much access to the better bonus spaces.<br/><br/>Skip-a-cross was licensed by Selchow &amp; Righter and manufactured by Cadaco. Both games have identical rules but Skip-a-cross has tiles and racks made of cardboard instead of wood. The game was also published because not enough Scrabble games were manufactured to meet the demand.<br/><br/>",
    "new",
    "https://cf.geekdo-images.com/mVmmntn2oQd0PfFrWBvwIQ__original/img/11jrKPiOVTNl5NwX83KGtTZEq40=/0x0/filters:format(jpeg)/pic404651.jpg"
  );
} catch (e) {
  console.log(e);
}

try {
  g2 = await gamesData.createGame(
    u2._id.toString(),
    u2.location,
    "Monopoly",
    "Theme<br/>Players take the part of land owners, attempting to buy and then develop their land. Income is gained by other players visiting their properties and money is spent when they visit properties belonging to other players. When times get tough, players may have to mortgage their properties to raise cash for fines, taxes and other misfortunes.<br/><br/>Gameplay<br/>On his turn, a player rolls two dice and moves that number of spaces around the board. If the player lands on an as-yet-unowned property, he has the opportunity to buy it and add it to his portfolio or allow the bank to auction it to the highest bidder. If a player owns all the spaces within a color group, he may then build houses and hotels on these spaces, generating even more income from opponents who land there. If he lands on a property owned by another player, he must pay that player rent according to the value of the land and any buildings on it. There are other places on the board which can not be bought, but instead require the player to draw a card and perform the action on the card, pay taxes, collect income, or even go to jail.<br/><br/>Goal<br/>The goal of the game is to be the last player remaining with any money.<br/><br/>Cultural impact on rules<br/>Monopoly is unusual in that the game has official, printed rules, but most players learn how to play from others, never actually learning the correct way to play. This has led to the canonization of a number of house rules that make the game more palatable to children (and sore losers) but harm the gameplay by preventing players from going bankrupt or slowing down the rate of property acquisition. One common house rule has players put any money paid to the bank in the center of the board, which jackpot a player may earn by landing on Free Parking. This prevents the game from removing money from play, and since players collect $200 each time they pass Go, this results in ever-increasing bankrolls and players surviving rents that should have bankrupted them. Another house rule allows players to take &quot;loans&quot; from the bank instead of going bankrupt, which means the game will never end. Some house rules arise out of ignorance rather than attempts to improve the game. For instance, many players don't know that properties landed on but left unbought go up for auction, and even some that know to auction don't know that the bidding starts at $1, meaning a player may pay well below the listed price for an auctioned property.<br/><br/>",
    "like-new",
    "https://cf.geekdo-images.com/9nGoBZ0MRbi6rdH47sj2Qg__original/img/bA8irydTCNlE38QSzM9EhcUIuNU=/0x0/filters:format(jpeg)/pic5786795.jpg"
  );
} catch (e) {
  console.log(e);
}

try {
  g3 = await gamesData.createGame(
    u3._id.toString(),
    u3.location,
    "Risk",
    "Possibly the most popular, mass market war game.  The goal is conquest of the world.<br/><br/>Each player's turn consists of:<br/>- gaining reinforcements through number of territories held, control of every territory on each continent, and turning sets of bonus cards.<br/>-  Attacking other players using a simple combat rule of comparing the highest dice rolled for each side.  Players may attack as often as desired.  If one enemy territory is successfully taken, the player is awarded with a  bonus card.<br/>-  Moving a group of armies to another adjacent territory.<br/><br/>",
    "used",
    "https://cf.geekdo-images.com/Oem1TTtSgxOghRFCoyWRPw__original/img/Nu3eXPyOkhtnR3hhpUrtgqRMAfs=/0x0/filters:format(jpeg)/pic4916782.jpg"
  );
} catch (e) {
  console.log(e);
}

try {
  g4 = await gamesData.createGame(
    u4._id.toString(),
    u4.location,
    "The Settlers of Catan",
    "This entry is for editions of CATAN that include the Catan: 5-6 Player Extension.<br/><br/><br/>Publisher's description of the 15th Anniversary Edition:<br/><br/>Embark on a quest to settle the fair isle of Catan! Guide your brave settlers to victory by using clever trading and development. Use resources (grain, wool, ore, brick, and lumber) to build roads, settlements, and cities, and buy development cards. Acquire your resources through trades or the role of the dice. But beware! You never know when someone might cut off your road or if the robber will appear and steal your precious gains. Are you the best trader, builder, or settler? Will you master Catan?<br/><br/>Designed for 3-6 players, this special, limited 15th Anniversary Wood Edition of The Settlers of Catan features a strong, compartmentalized box that contains: 52 thick, beautifully illustrated map hexagons, 144 specially designed playing pieces, six hexagonal building costs summaries, two special victory point markers, one vile robber, two dice, and 28 random number chits, all crafted from sturdy wood. The 154 cards, like the hexes, bear fine artwork from Michael Menzel.<br/><br/>",
    "well-used",
    "https://cf.geekdo-images.com/_1_jHYKYe93u3sCG-2gonA__original/img/Dr6DM43iigyG9uUI_XHqmfmOeX4=/0x0/filters:format(jpeg)/pic747314.jpg"
  );
} catch (e) {
  console.log(e);
}

try {
  g5 = await gamesData.createGame(
    u5._id.toString(),
    u5.location,
    "Carcassonne",
    "Carcassonne is a tile placement game in which the players draw and place a tile with a piece of southern French landscape represented on it. The tile might feature a city, a road, a cloister, grassland or some combination thereof, and it must be placed adjacent to tiles that have already been played, in such a way that cities are connected to cities, roads to roads, et cetera. Having placed a tile, the player can then decide to place one of his/her meeples in one of the areas on it: in the city as a knight, on the road as a robber, in the cloister as a monk, or in the field as a farmer. When that area is complete that meeple scores points for its owner.<br/><br/>During a game of Carcassonne, players are faced with decisions like: &quot;Is it really worth putting my last meeple there?&quot; or &quot;Should I use this tile to expand my city, or should I place it near my opponent instead, giving him/her a hard time to complete his/her project and score points?&quot; Since players place only one tile and have the option to place one meeple on it, turns proceed quickly even if it is a game full of options and possibilities.<br/><br/>First game in the Carcassonne series.<br/><br/>",
    "new",
    "https://cf.geekdo-images.com/okM0dq_bEXnbyQTOvHfwRA__original/img/aVZEXAI-cUtuunNfPhjeHlS4fwQ=/0x0/filters:format(png)/pic6544250.png"
  );
} catch (e) {
  console.log(e);
}

try {
  g6 = await gamesData.createGame(
    u6._id.toString(),
    u6.location,
    "UNO",
    "Players race to empty their hands and catch opposing players with cards left in theirs, which score points. In turns, players attempt to play a card by matching its color, number, or word to the topmost card on the discard pile. If unable to play, players draw a card from the draw pile, and if still unable to play, they pass their turn. Wild and special cards spice things up a bit.<br/><br/>UNO is a commercial version of Crazy Eights, a public domain card game played with a standard deck of playing cards.<br/><br/>This entry includes all themed versions of UNO that do not include new cards.<br/><br/>",
    "like-new",
    "https://cf.geekdo-images.com/-DHiHBBSnvaLu0Do8CIykQ__original/img/fRfoyWezpQsumExNKVxf1cwtJfg=/0x0/filters:format(jpeg)/pic8204165.jpg"
  );
} catch (e) {
  console.log(e);
}

try {
  g7 = await gamesData.createGame(
    u7._id.toString(),
    u7.location,
    "Sorry!",
    "Slide Pursuit Game<br/><br/>Race your four game pieces from Start around the board to your Home in this Pachisi type game. By turning over a card from the draw deck and following its instructions, players move their pieces around the game board, switch places with players, and knock opponents' pieces off the track and back to their Start position.<br/><br/>Slides are located at various places around the game board. When a player's piece lands at the beginning of one of these slides not of its own color, it automatically advances to the end, removing any piece on the slide and sending it back to Start.<br/><br/>Game moves are directed exclusively by cards from the play-action deck.  If one plays the normal version in which one card is drawn from the deck each turn, the outcome has a huge element of luck.  Sorry can be made more of a strategic game (and more appealing to adults) by dealing five cards to each player at the start of the game and allowing the player to choose which card he/she will play each turn.  In this version, at the end of each turn, a new card is drawn from the deck to replace the card that was played, so that each player is always working from five cards.<br/><br/>A player's fortunes can change dramatically in one or two rounds of play through the use of Sorry cards, the &quot;11&quot; cards (which give the player the option of trading places with an opponent's piece on the track), and the fact that it is possible to move from Start to Home without circumnavigating the full board by making judicious use of the &quot;backward 4&quot; cards.<br/><br/>",
    "used",
    "https://cf.geekdo-images.com/zV33y_kLzvOuGz1_r1DWNA__original/img/JnvWT9eND5TInSUeYovoDUG6Gto=/0x0/filters:format(jpeg)/pic8204421.jpg"
  );
} catch (e) {
  console.log(e);
}

try {
  g8 = await gamesData.createGame(
    u8._id.toString(),
    u8.location,
    "Pandemic",
    "In Pandemic, several virulent diseases have broken out simultaneously all over the world! The players are disease-fighting specialists whose mission is to treat disease hotspots while researching cures for each of four plagues before they get out of hand.<br/><br/>The game board depicts several major population centers on Earth. On each turn, a player can use up to four actions to travel between cities, treat infected populaces, discover a cure, or build a research station. A deck of cards provides the players with these abilities, but sprinkled throughout this deck are Epidemic! cards that accelerate and intensify the diseases' activity. A second, separate deck of cards controls the &quot;normal&quot; spread of the infections.<br/><br/>Taking a unique role within the team, players must plan their strategy to mesh with their specialists' strengths in order to conquer the diseases. For example, the Operations Expert can build research stations which are needed to find cures for the diseases and which allow for greater mobility between cities; the Scientist needs only four cards of a particular disease to cure it instead of the normal five&mdash;but the diseases are spreading quickly and time is running out. If one or more diseases spreads beyond recovery or if too much time elapses, the players all lose. If they cure the four diseases, they all win!<br/><br/>The 2013 edition of Pandemic includes two new characters&mdash;the Contingency Planner and the Quarantine Specialist&mdash;not available in earlier editions of the game.<br/><br/>Pandemic is the first game in the Pandemic series.<br/><br/>",
    "well-used",
    "https://cf.geekdo-images.com/S3ybV1LAp-8SnHIXLLjVqA__original/img/IsrvRLpUV1TEyZsO5rC-btXaPz0=/0x0/filters:format(jpeg)/pic1534148.jpg"
  );
} catch (e) {
  console.log(e);
}

try {
  g9 = await gamesData.createGame(
    u9._id.toString(),
    u9.location,
    "Terraforming Mars",
    "In the 2400s, mankind begins to terraform the planet Mars. Giant corporations, sponsored by the World Government on Earth, initiate huge projects to raise the temperature, the oxygen level, and the ocean coverage until the environment is habitable. In Terraforming Mars, you play one of those corporations and work together in the terraforming process, but compete for getting victory points that are awarded not only for your contribution to the terraforming, but also for advancing human infrastructure throughout the solar system, and doing other commendable things.<br/><br/>As a player, you acquire unique project cards (from over two hundred different ones) by buying them to your hand. The cards can give you immediate bonuses, as well as increasing your production of different resources. Many cards also have requirements and they become playable when the temperature, oxygen, or ocean coverage increases enough. Buying cards is costly, so there is a balance between buying cards and actually playing them. Standard Projects are always available to complement your hand of cards. Your basic income, as well as your basic score, are based on your Terraform Rating. However, your income is boosted by your production, and VPs are also gained from many other sources.<br/><br/>You keep track of your production and resources on your player board.  The game uses six types of resources: MegaCredits, Steel, Titanium, Plants, Energy, and Heat. On the game board, you compete for the best places for your city tiles, ocean tiles, and greenery tiles. You also compete for different Milestones and Awards worth many VPs. Each round is called a generation and consists of the following phases:<br/><br/>1) Player order shifts clockwise.<br/>2) Research phase: All players buy cards from four privately drawn.<br/>3) Action phase: Players take turns doing 1-2 actions from these options: Playing a card, claiming a Milestone, funding an Award, using a Standard project, converting plant into greenery tiles (and raising oxygen), converting heat into a temperature raise, and using the action of a card in play. The turn continues around the table (sometimes several laps) until all players have passed.<br/>4) Production phase: Players get resources according to their terraform rating and production parameters.<br/><br/>When the three global parameters (temperature, oxygen, ocean) have all reached their required levels, the terraforming is complete, and the game ends after that generation. Combine your Terraform Rating and other VPs to determine the winning corporation!<br/><br/>",
    "new",
    "https://cf.geekdo-images.com/wg9oOLcsKvDesSUdZQ4rxw__original/img/thIqWDnH9utKuoKVEUqveDixprI=/0x0/filters:format(jpeg)/pic3536616.jpg"
  );
} catch (e) {
  console.log(e);
}

try {
  g10 = await gamesData.createGame(
    u10._id.toString(),
    u10.location,
    "Pictionary",
    "Playing Pictionary may remind you of Charades, but with drawing on paper instead of acting out the answers.  In Pictionary, though, both teams' (or even all three teams') clue givers may be drawing at the same time as players strive to be the first to guess the correct answer.  When the answer is not designated &quot;All Play,&quot; one team simply tries to come up with the answer before the timer runs out, which is usually but not always possible thanks to the varying difficulty levels of the answers.  No great drawing talent is required; instead, players gain an edge if they have a good imagination when guessing, empathy for their team mates, and/or a general ability to communicate in restricted circumstances.  A board is provided, just to keep score on, which focuses the competition.  Pictionary was a big hit when it first appeared and has been a classic on the party game scene ever since.<br/><br/>",
    "like-new",
    "https://cf.geekdo-images.com/YfUxodD7JSqYitxvjXB69Q__original/img/YRJAlLzkxMuJHVPsdnBLNFpoODA=/0x0/filters:format(png)/pic5147022.png"
  );
} catch (e) {
  console.log(e);
}

try {
  g11 = await gamesData.createGame(
    u1._id.toString(),
    u1.location,
    "Taboo",
    "In the party game Taboo, you're trying to give clues to your teammates so that they'll guess a particular word, but you can't say just anything you like. Some clues are off limits!<br/><br/>When you're the active player, hold the deck of cards so that you and the opposing team can see the top card. At the top of the card is the word your teammate must say to score the card, and you can anything you want to help them figure out what to guess other than the word itself (duh!) or the five words/phrases listed on the bottom of the card.<br/><br/>For example, can you get your teammates to say &quot;bacon&quot; without saying &quot;pig&quot;, &quot;eggs&quot;, &quot;breakfast&quot;, &quot;sausage&quot;, or &quot;eat&quot;? If you do, you score the card, then move on to the next card, trying to guess as many cards as possible before time runs out. However, if you say a taboo word (or make gestures), the opposing team will buzz a buzzer and score the card themselves.<br/><br/>How well can you describe things without breaking the taboo?<br/><br/>",
    "used",
    "https://cf.geekdo-images.com/TdOB9V-wTf0LenXk8QWo-A__original/img/mhYaJYFxGrVZaP7ZL08ZuFJj5Ak=/0x0/filters:format(jpeg)/pic8377520.jpg"
  );
} catch (e) {
  console.log(e);
}

try {
  g12 = await gamesData.createGame(
    u2._id.toString(),
    u2.location,
    "Cards Against Humanity",
    "&quot;A party game for horrible people.&quot;<br/><br/>Play begins with a judge, known as the &quot;Card Czar&quot;, choosing a black question or fill-in-the-blank card from the top of the deck and showing it to all players.  Each player holds a hand of ten white answer cards at the beginning of each round, and passes a card (sometimes two) to the Card Czar, face-down, representing their answer to the question on the card. The card czar determines which answer card(s) are funniest in the context of the question or fill-in-the-blank card. The player who submitted the chosen card(s) is given the question card to represent an &quot;Awesome Point&quot;, and then the player to the left of the new Card Czar becomes the new Czar for the next round. Play continues until the players agree to stop, at which point the player with the most Awesome Points is the winner.<br/><br/>This, so far, sounds like the popular and fairly inoffensive Apples to Apples. While the games are similar, the sense of humor required is very different. The game encourages players to poke fun at practically every awkward or taboo subject including race, religion, gender, poverty, torture, alcoholism, drugs, sex (oh yes), abortion, child abuse, celebrities, and those everyday little annoyances like &quot;Expecting a burp and vomiting on the floor&quot;.<br/><br/>In addition, there are a few extra rules.  First, some question cards are &quot;Pick 2&quot; or cards, which require each participant to submit two cards in sequence to complete their answer. Second, a gambling component also exists.  If a question is played which a player believes they have two possible winning answers for, they may bet an Awesome Point to play a single second answer.  If the player who gambled wins, they retain the wagered point, but if they lose, the player who contributed the winning answer takes both points.<br/><br/>From the website:<br/><br/>&quot;Cards Against Humanity is distributed under a Creative Commons Attribution-Noncommercial-Share Alike license - that means you can use and remix the game for free, but you can't sell it. Feel free to contact us at cardsagainsthumanity@gmail.com.&quot;<br/><br/>",
    "well-used",
    "https://cf.geekdo-images.com/nYLrPiI9gnvlrwOrKQ4_CA__original/img/EgMpdhoG38LUTApk0kyFFsmoQPk=/0x0/filters:format(jpeg)/pic2909692.jpg"
  );
} catch (e) {
  console.log(e);
}

try {
  g13 = await gamesData.createGame(
    u7._id.toString(),
    u7.location,
    "Candy Land",
    "Created by Eleanor Abbott in the early 1940's to entertain children recovering from polio and first published by Milton Bradley (now Hasbro) in 1949, Candy Land encourages young players to socialize, exercise patience, recognize colors, learn rules, and follow directions.<br/><br/>Players race down a rainbow-colored track to be the first to find the lost King Kandy at Candy Castle, but watch out for obstacles like the sticky Molasses Swamp!  Start by placing your plastic Gingerbread Man (or other character marker) at the beginning of the track.  Each turn, players draw a simple card and move by matching the color on the card to the next color on the track.  Some cards show a named location on the board; players who draw these cards move forward or backward on the track to the named location.  The game ends when the first player arrives at Candy Castle by reaching or moving beyond the last square on the track.<br/><br/>In the 2004 version, younger players are not required to remove backward on the track if they draw a named card, and the last square of the track was changed from a Violet Square to a Rainbow Square, resolving a 55-year dispute over whether a player needs to land on the Violet Square or move beyond the Violet Square to win.<br/><br/>Prior to the 2006 version, three colored spaces on the track (one in Molasses Swamp and two &quot;Cherry Pitfalls&quot;) were marked with a dot.  Players who landed on a dot were &quot;stuck,&quot; and were unable to move from the spot until they drew a card that matched the color of the square they were on.  The 2006 version replaced gum drops with licorice spaces; players who land on a licorice space only lose their next turn.<br/><br/>&ldquo;The Legend of the Lost Candy Castle&rdquo; is printed inside the box and can be read out loud. The game parts can be stored below it. The game board is colorful and has lots of yummy candy references.<br/><br/>",
    "new",
    "https://cf.geekdo-images.com/N0yxlpaVJKXJi6pLev6YoA__original/img/Upur6-c_Av-Upj02F5k1P0NB7gc=/0x0/filters:format(jpeg)/pic8203388.jpg"
  );
} catch (e) {
  console.log(e);
}

try {
  g14 = await gamesData.createGame(
    u7._id.toString(),
    u7.location,
    "Clue",
    "For versions of Clue that feature the new character Dr. Orchid, please use this Clue page.<br/><br/>The classic detective game!  In Clue, players move from room to room in a mansion to solve the mystery of: who done it, with what, and where?  Players are dealt character, weapon, and location cards after the top card from each card type is secretly placed in the confidential file in the middle of the board.  Players must move to a room and then make a suggestion against a character saying they did it in that room with a specific weapon.  The player to the left must show one of any cards mentioned if in that player's hand.  Through deductive reasoning each player must figure out which character, weapon, and location are in the secret file.  To do this, each player must uncover what cards are in other players hands by making more and more suggestions.  Once a player knows what cards the other players are holding, they will know what cards are in the secret file, and then make an accusation. If correct, the player wins, but if incorrect, the player must return the cards to the file without revealing them and may no longer make suggestions or accusations. A great game for those who enjoy reasoning and thinking things out.<br/><br/>Note: There are some early versions of Clue which are labeled as 2-6 players. Recent and current issues of the game state 3-6 players.<br/><br/>",
    "like-new",
    "https://cf.geekdo-images.com/wNcbhLJGGjakYjjm1gV_kQ__original/img/Ji1MKh8gogtczoDecOi5D5yo9hQ=/0x0/filters:format(png)/pic7563466.png"
  );
} catch (e) {
  console.log(e);
}

try {
  g15 = await gamesData.createGame(
    u7._id.toString(),
    u7.location,
    "Advanced Dungeons & Dragons Battlesystem",
    "Create fantasy armies with counters or miniatures and fight battles. Can be played on its own or with first edition AD&amp;D RPG game.<br/><br/>[from the back of the box]<br/><br/>An exciting new direction for AD&amp;D and D&amp;D games!<br/><br/>Create fantastic armies with miniature figures or die-cut counters and fight incredible battles against the forces of evil!<br/><br/>The Battlesystem game is fully compatible with any official AD&amp;D or D&amp;D game spell, monster, or plane of existence-- no matter how obscure!<br/><br/>You can create your own battles or play the exciting scenarios-- including an epic Dragonlance adventure battle!<br/><br/>The Battlesystem game uses an innovative mass combat system and allows use of field artillery, flying, magic, invisibility, and illusions!<br/><br/>AD&amp;D and D&amp;D characters can earn experience points by commanding armies or fight as individual heroes!<br/><br/>Lead your armies into the ultimate fantasy war with the Battle System Fantasy Combat Supplement!<br/><br/>",
    "used",
    "https://cf.geekdo-images.com/knELdpTBFSUcl_bWtcZvjQ__original/img/OPtT0d_qeEbc_QhXuGDzyNKAntY=/0x0/filters:format(jpeg)/pic167244.jpg"
  );
} catch (e) {
  console.log(e);
}

/*
 * Game Reviews
 */
try {
  gr1 = await gameReviewsData.createGameReview(
    u2._id.toString(),
    g14._id.toString(),
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
    g13._id.toString(),
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
    g7._id.toString(),
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
    g12._id.toString(),
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
    g13._id.toString(),
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
    g9._id.toString(),
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
    g2._id.toString(),
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
    g5._id.toString(),
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
    g8._id.toString(),
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
    g1._id.toString(),
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
    g12._id.toString(),
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
    g9._id.toString(),
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
    g1._id.toString(),
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
    g10._id.toString(),
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
    g3._id.toString(),
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
    g8._id.toString(),
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
    u8._id.toString(),
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
    g3._id.toString(),
    "Enjoyable",
    "A solid game with lots to do.",
    4
  );
} catch (e) {
  console.log(e);
}

/* Request Seeding */
let currGame;
let userRequest = (user) => {
  const messages = [
    `I'm ${user.firstName}. I'd love to borrow this game!`,
    "Could I borrow your this game for the weekend? I’ll take great care of it and return it promptly.",
    "I just noticed you have this game listed. Would it be possible to borrow it sometime this week? Let me know what works for you!",
    "Is your copy of this game available for a quick borrow? I’d really appreciate it and can return it whenever you need.",
  ];
  let updateObj = {
    userRequest: {
      reqUserId: user._id.toString(),
      message: messages[Math.floor(Math.random() * messages.length)],
    },
  };
  return updateObj;
};

try {
  r1 = await gamesData.updateGame(g1._id.toString(), userRequest(u5));
} catch (e) {
  console.log(e);
}

try {
  r2 = await gamesData.updateGame(g1._id.toString(), userRequest(u9));
} catch (e) {
  console.log(e);
}

try {
  r3 = await gamesData.updateGame(g2._id.toString(), userRequest(u1));
} catch (e) {
  console.log(e);
}

try {
  r4 = await gamesData.updateGame(g3._id.toString(), userRequest(u7));
} catch (e) {
  console.log(e);
}

try {
  r5 = await gamesData.updateGame(g4._id.toString(), userRequest(u9));
} catch (e) {
  console.log(e);
}

try {
  r6 = await gamesData.updateGame(g5._id.toString(), userRequest(u3));
} catch (e) {
  console.log(e);
}

try {
  r7 = await gamesData.updateGame(g5._id.toString(), userRequest(u1));
} catch (e) {
  console.log(e);
}

try {
  r8 = await gamesData.updateGame(g6._id.toString(), userRequest(u4));
} catch (e) {
  console.log(e);
}

try {
  r9 = await gamesData.updateGame(g7._id.toString(), userRequest(u6));
} catch (e) {
  console.log(e);
}

try {
  r10 = await gamesData.updateGame(g8._id.toString(), userRequest(u10));
} catch (e) {
  console.log(e);
}

try {
  r11 = await gamesData.updateGame(g9._id.toString(), userRequest(u2));
} catch (e) {
  console.log(e);
}

try {
  r12 = await gamesData.updateGame(g10._id.toString(), userRequest(u8));
} catch (e) {
  console.log(e);
}

try {
  r13 = await gamesData.updateGame(g11._id.toString(), userRequest(u4));
} catch (e) {
  console.log(e);
}

try {
  r14 = await gamesData.updateGame(g11._id.toString(), userRequest(u6));
} catch (e) {
  console.log(e);
}

try {
  r15 = await gamesData.updateGame(g12._id.toString(), userRequest(u9));
} catch (e) {
  console.log(e);
}

try {
  r16 = await gamesData.updateGame(g13._id.toString(), userRequest(u8));
} catch (e) {
  console.log(e);
}

try {
  r17 = await gamesData.updateGame(g14._id.toString(), userRequest(u3));
} catch (e) {
  console.log(e);
}

try {
  r18 = await gamesData.updateGame(g15._id.toString(), userRequest(u10));
} catch (e) {
  console.log(e);
}

/*
 * Borrowed games
 */
try {
  const borrowedGame = await gamesData.handleRequest(
    g1._id.toString(),
    u5._id.toString(),
    true
  );
} catch (e) {
  console.log(e);
}

try {
  const borrowedGame = await gamesData.handleRequest(
    g2._id.toString(),
    u1._id.toString(),
    true
  );
} catch (e) {
  console.log(e);
}

try {
  const borrowedGame = await gamesData.handleRequest(
    g4._id.toString(),
    u9._id.toString(),
    true
  );
} catch (e) {
  console.log(e);
}

try {
  const borrowedGame = await gamesData.handleRequest(
    g12._id.toString(),
    u9._id.toString(),
    true
  );
} catch (e) {
  console.log(e);
}

try {
  const borrowedGame = await gamesData.handleRequest(
    g8._id.toString(),
    u10._id.toString(),
    true
  );
} catch (e) {
  console.log(e);
}

try {
  const borrowedGame = await gamesData.handleRequest(
    g14._id.toString(),
    u3._id.toString(),
    true
  );
} catch (e) {
  console.log(e);
}

await closeConnection();
