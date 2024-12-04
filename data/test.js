import {gamesData, locationData, usersData} from './index.js';

let address = '1 Castle Point Terrace, Hoboken'
// try{
//     const result = await locationData.geocodeAddress(address)
//     console.log(result);
// } catch(e){
//     console.log(e);
// }

let Hoboken = {
    Address: {
      StreetAddress: '1 Castle Point Ter',
      LocalArea: '',
      City: 'Hoboken',
      State: 'NJ',
      StateName: 'New Jersey',
      Zip: '07030-5906',
      County: 'Hudson',
      Country: 'US',
      CountryFullName: 'United States',
      SPLC: null
    },
    Coords: { Lat: '40.745684', Lon: '-74.025923' },
    Region: 4,
    POITypeID: 103,
    PersistentPOIID: -1,
    SiteID: -1,
    ResultType: 10,
    ShortString: 'ATM, 1 Castle Point Ter, Hoboken, NJ, US, Hudson 07030-5906',
    TimeZone: 'GMT-5:00 EST'
  };

let JerseyCity = {
    Address: {
        StreetAddress: '30 Montgomery St',
        LocalArea: '',
        City: 'Jersey City',
        State: 'NJ',
        StateName: 'New Jersey',
        Zip: '07302',
        County: 'Hudson',
        Country: 'US',
        CountryFullName: 'United States',
        SPLC: null
    },
    Coords: { Lat: '40.717753', Lon: '-74.033697' },
    Region: 4,
    POITypeID: 103,
    PersistentPOIID: -1,
    SiteID: -1,
    ResultType: 10,
    ShortString: 'Bank, 30 Montgomery St, Jersey City, NJ, US, Hudson 07302',
    TimeZone: 'GMT-5:00 EST'
};
let location = {};
let result;

// try{
//     result = await locationData.makeGeoJSON(Hoboken)
//     // let info = await locationData.updateLocation('6749fff90a8d264b706ea28e', result)
//     console.log(result);
// } catch(e){
//     console.log(e);
// }

// try{
//     const nearbyUsers = await locationData.nearbyUsers('674a770368fd3a4cf77fe182', 1.8)
//     console.log(nearbyUsers);
// } catch(e){
//     console.log(e);
// }

// let userOneId = '674b592aeb565b1db2edbaca'; //username: u1
// let updateObject = {
//     firstName: 'First',
//     lastName: 'Lastname',
//     username: 'Primero'
// };
// try{
//     currUser = await usersData.updateUser(userOneId, updateObject)
//     console.log(currUser);
// } catch(e){
//     console.log(e);
// }

let monopolyId = '6750a1ccc7337dddc62cbe3d';    // Monopoly owned by u2
let connect4Id = '6750a1ccc7337dddc62cbe3e';    // Connect 4 owned by u1
let u1id = '6750a1ccc7337dddc62cbe32'   // u1 user one
let u2id = '6750a1ccc7337dddc62cbe33'   // u2 user two
let u3id = '6750a1ccc7337dddc62cbe34'   // u3 user three
let u4id = '6750a1ccc7337dddc62cbe35'   // u4 user four

let userRequest = (userId) =>{
    let updateObj = {
        userRequest: {
            reqUserId: userId,  // u1 is requesting
            message: 'Im a user. Id like to borrow this game.'
        }
    }
    return updateObj
}
let currGame;
try {
    currGame = await gamesData.updateGame(monopolyId, userRequest(u1id));
    console.log(currGame);
} catch(e){
    console.log(e);
}
try {
    currGame = await gamesData.updateGame(monopolyId, userRequest(u3id));
    console.log(currGame);
} catch(e){
    console.log(e);
}
try {
    currGame = await gamesData.updateGame(monopolyId, userRequest(u1id));
    console.log(currGame);
} catch(e){
    console.log(e); // Should error, already made a request
}
try {
    currGame = await gamesData.updateGame(monopolyId, userRequest(u2id));
    console.log(currGame);
} catch(e){
    console.log(e); // Should error, user cannot request their own game
}
let currReqs;
try {
    currReqs = await gamesData.getRequestedGames(u1id);
    console.log(currReqs)
} catch(e){
    console.log(e);
}